import { Hono } from 'hono';
import Testimonial from '../models/Testimonial.js';
import { testimonialSchema } from '../schemas/index.js';
import { authMiddleware } from '../middleware/auth.js';

const testimonials = new Hono();

testimonials.get('/', async (c) => {
  const list = await Testimonial.find({ active: true }).sort({ order: 1, createdAt: 1 });
  return c.json(list);
});

testimonials.post('/', authMiddleware, async (c) => {
  const body = await c.req.json();
  const parsed = testimonialSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
  const item = await Testimonial.create(parsed.data);
  return c.json(item, 201);
});

testimonials.put('/:id', authMiddleware, async (c) => {
  const body = await c.req.json();
  const parsed = testimonialSchema.partial().safeParse(body);
  if (!parsed.success) return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
  const item = await Testimonial.findByIdAndUpdate(c.req.param('id'), parsed.data, { new: true });
  if (!item) return c.json({ error: 'Not found' }, 404);
  return c.json(item);
});

testimonials.delete('/:id', authMiddleware, async (c) => {
  const deleted = await Testimonial.findByIdAndDelete(c.req.param('id'));
  if (!deleted) return c.json({ error: 'Not found' }, 404);
  return c.json({ success: true });
});

export default testimonials;
