import  express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from 'config';
import { logger } from './logger.mjs';
import helmet from 'helmet';
import fs from 'fs';
import https from 'https';
import mongoose from 'mongoose';
import { auth } from './routes/auth.mjs';
import errorHandler from './middleware/errorHandler.mjs';


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use('/auth', auth);
app.use(errorHandler);
const privateKey = fs.readFileSync('./certs/key.pem', 'utf8');
const certificate = fs.readFileSync('./certs/cert.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const port = config.get('General.server.port');
const httpsServer = https.createServer(credentials, app);
const nodeEnv = process.env.NODE_ENV;


mongoose.set('debug', nodeEnv === 'development');
mongoose.connect(config.get('DB.mongodb.env_uri'), {
    dbName: config.get('DB.mongodb.dbName'),
})
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('MongoDB connection error:', err));

httpsServer.listen(port, () => {
    logger.info(`[SERVER is running on port: ${port}]`);
});


httpsServer.on('error', (error) => {
    logger.error('An error occurred on the server:', error);
});

const shutdown = (signal: any) => {
    logger.info(`${signal} received. Shutting down the server...`);
    httpsServer.close(() => {
        logger.info('Server closed successfully.');
        process.exit(0);
});

setTimeout(() => {
        logger.error('Server did not shut down in time. Forcing shutdown.');
        process.exit(1);
}, 10000);

}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));