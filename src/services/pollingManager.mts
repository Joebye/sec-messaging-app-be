import { Response } from 'express';
const clients: { [userId: string]: any[] } = {};

export const addClient = (userId: string, res: Response) => {
    if (!clients[userId]) clients[userId] = [];
    clients[userId].push(res);
    setTimeout(() => {
      const idx = clients[userId].indexOf(res);
      if (idx !== -1) clients[userId].splice(idx, 1);
      try {
        res.end(); 
      } catch (e) {
        console.error('Long poll response end failed', e);
      }
    }, 30000);
  };

export const broadcastMessage = (message: any) => {
  Object.values(clients).forEach(clientList => {
    clientList.forEach(res => res.json(message));
  });
  for (const key in clients) clients[key] = [];
};