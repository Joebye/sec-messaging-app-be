const clients: { [userId: string]: any[] } = {};

export const addClient = (userId: string, res:any) => {
  if (!clients[userId]) clients[userId] = [];
  clients[userId].push(res);

  setTimeout(() => {
    clients[userId] = clients[userId].filter(r => r !== res);
    res.end();
  }, 30000);
};

export const broadcastMessage = (message: any) => {
  Object.values(clients).forEach(clientList => {
    clientList.forEach(res => res.json(message));
  });

  for (const key in clients) clients[key] = [];
};