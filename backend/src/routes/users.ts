// deprecated — replaced by frontend/app/api/ and frontend/models/
import { Hono } from 'hono';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { createUserSchema } from '../schemas/index.js';
import { authMiddleware, requireSuperAdmin } from '../middleware/auth.js';

const users = new Hono();

users.use('*', authMiddleware);
users.use('*', requireSuperAdmin);

users.get('/', async (c) => {
  const list = await User.find().select('-password').sort({ createdAt: -1 });
  return c.json(list);
});

users.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
  }
  const existing = await User.findOne({ email: parsed.data.email });
  if (existing) return c.json({ error: 'Email already in use' }, 409);

  const hashed = await bcrypt.hash(parsed.data.password, 10);
  const user = await User.create({ ...parsed.data, password: hashed });
  return c.json({ id: user._id, email: user.email, name: user.name, role: user.role }, 201);
});

users.delete('/:id', async (c) => {
  const id = c.req.param('id');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const caller = (c as any).get('user') as { userId: string };
  if (caller.userId === id) return c.json({ error: 'Cannot delete yourself' }, 400);
  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) return c.json({ error: 'User not found' }, 404);
  return c.json({ success: true });
});

export default users;
