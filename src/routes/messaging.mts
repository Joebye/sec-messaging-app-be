import express from 'express';
import asynchandler from 'express-async-handler';
import { logger } from '../logger.mjs';
import AuthService from '../services/AuthService.mjs';
import { log } from 'node:console';
import { pollMessages, sendMessage } from '../controllers/messageController.mjs';
import { verifyToken } from '../middleware/auth.mjs';
export const messaging = express.Router();

messaging.post('/send', verifyToken, sendMessage);         
messaging.get('/poll', verifyToken, pollMessages);   