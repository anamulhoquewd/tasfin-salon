// deprecated — replaced by frontend/app/api/ and frontend/models/
import { Hono } from 'hono';
import ReelSettings from '../models/ReelSettings.js';
import { reelSettingsSchema } from '../schemas/index.js';
import { authMiddleware } from '../middleware/auth.js';

const reel = new Hono();

reel.get('/', async (c) => {
  let doc = await ReelSettings.findOne();
  if (!doc) doc = await ReelSettings.create({});
  return c.json(doc);
});

reel.put('/', authMiddleware, async (c) => {
  const body = await c.req.json();
  const parsed = reelSettingsSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
  let doc = await ReelSettings.findOne();
  if (!doc) {
    doc = await ReelSettings.create(parsed.data);
  } else {
    Object.assign(doc, parsed.data);
    await doc.save();
  }
  return c.json(doc);
});

export default reel;
