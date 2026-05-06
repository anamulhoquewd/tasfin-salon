import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Service from '@/models/Service';
import { serviceSchema } from '@/lib/schemas';
import { requireAuth } from '@/lib/jwt';

export async function GET() {
  await connectDB();
  const list = await Service.find({ active: true }).sort({ order: 1, createdAt: 1 });
  return NextResponse.json(list);
}

export async function POST(request: NextRequest) {
  if (!await requireAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  await connectDB();
  const item = await Service.create(parsed.data);
  return NextResponse.json(item, { status: 201 });
}
