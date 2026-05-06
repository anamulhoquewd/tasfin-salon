import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import { requireAuth } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  if (!await requireAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const days = parseInt(new URL(request.url).searchParams.get('days') || '30');
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const bookings = await Booking.find({ createdAt: { $gte: startDate } })
    .select('createdAt status')
    .lean();

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

  return NextResponse.json(Object.values(grouped));
}
