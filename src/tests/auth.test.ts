import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';

const mockRegister = vi.fn((req, res) => {
  res.status(200).json({ message: 'User registered' });
});
const mockLogin = vi.fn((req, res) => {
  res.status(200).json({ token: 'fake-jwt-token' });
});

const app = express();
app.use(bodyParser.json());
app.post('/auth/signup', mockRegister);
app.post('/auth/login', mockLogin);

describe('Auth API (Mocked)', () => {
  beforeEach(() => {
    mockRegister.mockClear();
    mockLogin.mockClear();
  });

  it('should register user', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({ username: 'testuser', password: 'testpass' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User registered');
    expect(mockRegister).toHaveBeenCalledOnce();
  });

  it('should login user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testpass' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBe('fake-jwt-token');
    expect(mockLogin).toHaveBeenCalledOnce();
  });
});