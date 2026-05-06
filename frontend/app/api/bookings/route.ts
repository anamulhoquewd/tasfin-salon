import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import { bookingSchema } from '@/lib/schemas';
import { requireAuth } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  if (!await requireAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const { searchParams } = new URL(request.url);
  const filter: Record<string, unknown> = {};
  const status = searchParams.get('status');
  const channel = searchParams.get('channel');
  if (status) filter.status = status;
  if (channel) filter.channel = channel;
  const limit = parseInt(searchParams.get('limit') || '50');
  const skip = parseInt(searchParams.get('skip') || '0');
  const [list, total] = await Promise.all([
    Booking.find(filter).sort({ createdAt: -1 }).limit(limit).skip(skip),
    Booking.countDocuments(filter),
  ]);
  return NextResponse.json({ bookings: list, total });
}

export async function POST(request: NextRequest) {
  if (!await requireAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  await connectDB();
  const booking = await Booking.create(parsed.data);
  return NextResponse.json(booking, { status: 201 });
}
