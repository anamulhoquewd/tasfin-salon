// deprecated — replaced by frontend/app/api/ and frontend/models/
import { Hono } from 'hono';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { loginSchema } from '../schemas/index.js';

const auth = new Hono();

auth.post('/login', async (c) => {
  const body = await c.req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
  }
  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) return c.json({ error: 'Invalid credentials' }, 401);

  const match = await bcrypt.compare(password, user.password);
  if (!match) return c.json({ error: 'Invalid credentials' }, 401);

  const secret = process.env.JWT_SECRET || 'fallback-secret';
  const token = jwt.sign(
    { userId: user._id.toString(), email: user.email, role: user.role },
    secret,
    { expiresIn: '7d' }
  );
  return c.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
});

auth.get('/me', async (c) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401);
  const token = authHeader.slice(7);
  try {
    const secret = process.env.JWT_SECRET || 'fallback-secret';
    const payload = jwt.verify(token, secret) as { userId: string; email: string; role: string };
    const user = await User.findById(payload.userId).select('-password');
    if (!user) return c.json({ error: 'User not found' }, 404);
    return c.json({ user: { id: user._id, email: user.email, name: user.name, role: user.role } });
  } catch {
    return c.json({ error: 'Invalid token' }, 401);
  }
});

export default auth;
