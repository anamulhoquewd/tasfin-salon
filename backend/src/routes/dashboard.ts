import { Hono } from 'hono';
import Booking from '../models/Booking.js';
import { authMiddleware } from '../middleware/auth.js';

const dashboard = new Hono();

dashboard.use('*', authMiddleware);

dashboard.get('/stats', async (c) => {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const [
    bookings7d,
    bookingsPrev7d,
    whatsappBookings7d,
    pendingCount,
    recentBookings,
  ] = await Promise.all([
    Booking.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
    Booking.countDocuments({ createdAt: { $gte: fourteenDaysAgo, $lt: sevenDaysAgo } }),
    Booking.countDocuments({ channel: 'WhatsApp', createdAt: { $gte: sevenDaysAgo } }),
    Booking.countDocuments({ status: 'pending' }),
    Booking.find().sort({ createdAt: -1 }).limit(5),
  ]);

  const bookingsDelta = bookingsPrev7d > 0
    ? Math.round(((bookings7d - bookingsPrev7d) / bookingsPrev7d) * 100)
    : 0;

  return c.json({
    bookings7d,
    bookingsDelta,
    whatsappClicks: whatsappBookings7d,
    pendingCount,
    recentBookings,
  });
});

dashboard.get('/chart', async (c) => {
  const days = parseInt(c.req.query('days') || '30');
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const bookings = await Booking.find({
    createdAt: { $gte: startDate },
  }).select('createdAt status').lean();

  const grouped: Record<string, { date: string; confirmed: number; pending: number; total: number }> = {};

  for (let i = 0; i < days; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().split('T')[0];
    grouped[key] = { date: key, confirmed: 0, pending: 0, total: 0 };
  }

  for (const b of bookings) {
    const key = (b.createdAt as Date).toISOString().split('T')[0];
    if (grouped[key]) {
      grouped[key].total++;
      if (b.status === 'confirmed') grouped[key].confirmed++;
      else if (b.status === 'pending') grouped[key].pending++;
    }
  }

  return c.json(Object.values(grouped));
});

export default dashboard;
