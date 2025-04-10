import express from 'express';
import asynchandler from 'express-async-handler';
import { logger } from '../logger.mjs';
import AuthService from '../services/AuthService.mjs';
export const auth = express.Router();
const authService = new AuthService();

auth.post('/login', asynchandler(async (req, res) => {
    const obj = req.body;
    logger.info(`${obj ? '[LOGIN: user obj has been received]': '[LOGIN: empty user obj data]'}`)
    const loginRes = await authService.loginUser(obj);
    res.send(loginRes);
}));

auth.post('/signup', asynchandler(async (req, res) => {
    const obj = req.body;
    logger.info(`${obj ? '[SIGNUP: user obj has been received]': '[SIGNUP: empty user obj data]'}`)
    const signupRes = await authService.signupUser(obj);
    res.send(signupRes);
}));