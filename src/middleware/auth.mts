import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.status(403).json({ error: 'Token required' });
    return;
  }
 const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
 
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    (req as any).user = payload;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};