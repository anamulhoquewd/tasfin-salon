import { Hono } from 'hono';
import Booking from '../models/Booking.js';
import { bookingSchema } from '../schemas/index.js';
import { authMiddleware } from '../middleware/auth.js';

const bookings = new Hono();

bookings.use('*', authMiddleware);

bookings.get('/', async (c) => {
  const { status, channel, limit = '50', skip = '0' } = c.req.query();
  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (channel) filter.channel = channel;
  const list = await Booking.find(filter)
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip(parseInt(skip));
  const total = await Booking.countDocuments(filter);
  return c.json({ bookings: list, total });
});

bookings.get('/:id', async (c) => {
  const booking = await Booking.findById(c.req.param('id'));
  if (!booking) return c.json({ error: 'Not found' }, 404);
  return c.json(booking);
});

bookings.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
  }
  const booking = await Booking.create(parsed.data);
  return c.json(booking, 201);
});

bookings.put('/:id', async (c) => {
  const body = await c.req.json();
  const parsed = bookingSchema.partial().safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
  }
  const booking = await Booking.findByIdAndUpdate(c.req.param('id'), parsed.data, { new: true });
  if (!booking) return c.json({ error: 'Not found' }, 404);
  return c.json(booking);
});

bookings.delete('/:id', async (c) => {
  const deleted = await Booking.findByIdAndDelete(c.req.param('id'));
  if (!deleted) return c.json({ error: 'Not found' }, 404);
  return c.json({ success: true });
});

export default bookings;
