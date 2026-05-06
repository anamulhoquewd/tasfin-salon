// deprecated — replaced by frontend/app/api/ and frontend/models/
import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';
import type { UserRole } from '../models/User.js';

interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  const token = authHeader.slice(7);
  try {
    const secret = process.env.JWT_SECRET || 'fallback-secret';
    const payload = jwt.verify(token, secret) as JwtPayload;
    c.set('user', payload);
    await next();
  } catch {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }
};

export const requireSuperAdmin = async (c: Context, next: Next) => {
  const user = c.get('user') as JwtPayload;
  if (user?.role !== 'super_admin') {
    return c.json({ error: 'Forbidden: super admin only' }, 403);
  }
  await next();
};
