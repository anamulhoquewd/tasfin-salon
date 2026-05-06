import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import { requireAuth } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  if (!await requireAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const [bookings7d, bookingsPrev7d, whatsappBookings7d, pendingCount, recentBookings] =
    await Promise.all([
      Booking.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      Booking.countDocuments({ createdAt: { $gte: fourteenDaysAgo, $lt: sevenDaysAgo } }),
      Booking.countDocuments({ channel: 'WhatsApp', createdAt: { $gte: sevenDaysAgo } }),
      Booking.countDocuments({ status: 'pending' }),
      Booking.find().sort({ createdAt: -1 }).limit(5),
    ]);

  const bookingsDelta =
    bookingsPrev7d > 0 ? Math.round(((bookings7d - bookingsPrev7d) / bookingsPrev7d) * 100) : 0;

  return NextResponse.json({ bookings7d, bookingsDelta, whatsappClicks: whatsappBookings7d, pendingCount, recentBookings });
}
