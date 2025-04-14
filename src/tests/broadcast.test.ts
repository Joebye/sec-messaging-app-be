import { describe, it, expect } from 'vitest';

const mockClients: any = {};

function addClient(userId: string, callback: any) {
  if (!mockClients[userId]) mockClients[userId] = [];
  mockClients[userId].push(callback);
}

function broadcastMessage(message: any) {
  Object.values(mockClients).forEach((callbacks:any) => {
    callbacks.forEach((cb:any) => cb(message));
  });
}

describe('Broadcasting', () => {
  it('sends message to all connected mock clients', () => {
    const received: string[] = [];

    addClient('u1', (msg: any) => received.push(msg.text));
    addClient('u2', (msg: any) => received.push(msg.text));

    broadcastMessage({ text: 'hello' });

    expect(received).toEqual(['hello', 'hello']);
  });
});