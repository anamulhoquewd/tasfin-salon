// deprecated — replaced by frontend/app/api/ and frontend/models/
import { Hono } from 'hono';
import Faq from '../models/Faq.js';
import { faqSchema } from '../schemas/index.js';
import { authMiddleware } from '../middleware/auth.js';

const faq = new Hono();

faq.get('/', async (c) => {
  const list = await Faq.find({ active: true }).sort({ order: 1, createdAt: 1 });
  return c.json(list);
});

faq.post('/', authMiddleware, async (c) => {
  const body = await c.req.json();
  const parsed = faqSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
  const item = await Faq.create(parsed.data);
  return c.json(item, 201);
});

faq.put('/:id', authMiddleware, async (c) => {
  const body = await c.req.json();
  const parsed = faqSchema.partial().safeParse(body);
  if (!parsed.success) return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
  const item = await Faq.findByIdAndUpdate(c.req.param('id'), parsed.data, { new: true });
  if (!item) return c.json({ error: 'Not found' }, 404);
  return c.json(item);
});

faq.delete('/:id', authMiddleware, async (c) => {
  const deleted = await Faq.findByIdAndDelete(c.req.param('id'));
  if (!deleted) return c.json({ error: 'Not found' }, 404);
  return c.json({ success: true });
});

export default faq;
