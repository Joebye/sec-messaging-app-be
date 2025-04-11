import Message from '../models/Message.mjs';
import { addClient, broadcastMessage } from '../services/pollingManager.mjs';

export const sendMessage = async (req:any, res:any) => {
  const { encryptedMessage, aesKeyIv } = req.body;

  const message = new Message({
    userId: req.user.userId,
    encryptedMessage,
    aesKeyIv,
    timestamp: new Date()
  });

  await message.save();
  broadcastMessage({ from: req.user.userId, encryptedMessage });
  res.json({ status: 'Message received and broadcasted' });
};

export const pollMessages = async (req:any, res:any) => {
    console.log(req.user);
    
  const userId = req.user.userId;
  addClient(userId, res); 
};