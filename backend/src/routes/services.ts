// deprecated — replaced by frontend/app/api/ and frontend/models/
import { Hono } from 'hono';
import Service from '../models/Service.js';
import { serviceSchema } from '../schemas/index.js';
import { authMiddleware } from '../middleware/auth.js';

const services = new Hono();

// Public GET
services.get('/', async (c) => {
  const list = await Service.find({ active: true }).sort({ order: 1, createdAt: 1 });
  return c.json(list);
});

services.get('/:id', async (c) => {
  const item = await Service.findById(c.req.param('id'));
  if (!item) return c.json({ error: 'Not found' }, 404);
  return c.json(item);
});

// Protected mutations
services.post('/', authMiddleware, async (c) => {
  const body = await c.req.json();
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
  const item = await Service.create(parsed.data);
  return c.json(item, 201);
});

services.put('/:id', authMiddleware, async (c) => {
  const body = await c.req.json();
  const parsed = serviceSchema.partial().safeParse(body);
  if (!parsed.success) return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
  const item = await Service.findByIdAndUpdate(c.req.param('id'), parsed.data, { new: true });
  if (!item) return c.json({ error: 'Not found' }, 404);
  return c.json(item);
});

services.delete('/:id', authMiddleware, async (c) => {
  const deleted = await Service.findByIdAndDelete(c.req.param('id'));
  if (!deleted) return c.json({ error: 'Not found' }, 404);
  return c.json({ success: true });
});

export default services;
