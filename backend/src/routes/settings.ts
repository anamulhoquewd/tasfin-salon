import { Hono } from 'hono';
import Settings from '../models/Settings.js';
import { settingsSchema } from '../schemas/index.js';
import { authMiddleware } from '../middleware/auth.js';

const settings = new Hono();

settings.get('/', async (c) => {
  let doc = await Settings.findOne();
  if (!doc) doc = await Settings.create({});
  return c.json(doc);
});

settings.put('/', authMiddleware, async (c) => {
  const body = await c.req.json();
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
  let doc = await Settings.findOne();
  if (!doc) {
    doc = await Settings.create(parsed.data);
  } else {
    Object.assign(doc, parsed.data);
    await doc.save();
  }
  return c.json(doc);
});

export default settings;
