// deprecated — replaced by frontend/app/api/ and frontend/models/
import { Hono } from 'hono';
import Portfolio from '../models/Portfolio.js';
import { portfolioSchema } from '../schemas/index.js';
import { authMiddleware } from '../middleware/auth.js';

const portfolio = new Hono();

portfolio.get('/', async (c) => {
  const list = await Portfolio.find({ active: true }).sort({ order: 1, createdAt: 1 });
  return c.json(list);
});

portfolio.post('/', authMiddleware, async (c) => {
  const body = await c.req.json();
  const parsed = portfolioSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
  const item = await Portfolio.create(parsed.data);
  return c.json(item, 201);
});

portfolio.put('/:id', authMiddleware, async (c) => {
  const body = await c.req.json();
  const parsed = portfolioSchema.partial().safeParse(body);
  if (!parsed.success) return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
  const item = await Portfolio.findByIdAndUpdate(c.req.param('id'), parsed.data, { new: true });
  if (!item) return c.json({ error: 'Not found' }, 404);
  return c.json(item);
});

portfolio.delete('/:id', authMiddleware, async (c) => {
  const deleted = await Portfolio.findByIdAndDelete(c.req.param('id'));
  if (!deleted) return c.json({ error: 'Not found' }, 404);
  return c.json({ success: true });
});

export default portfolio;
