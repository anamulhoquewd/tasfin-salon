import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { createUserSchema } from '@/lib/schemas';
import { requireSuperAdmin } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  if (!await requireSuperAdmin(request)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  await connectDB();
  const list = await User.find().select('-password').sort({ createdAt: -1 });
  return NextResponse.json(list);
}

export async function POST(request: NextRequest) {
  if (!await requireSuperAdmin(request)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const body = await request.json();
  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  await connectDB();
  const existing = await User.findOne({ email: parsed.data.email });
  if (existing) return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
  const hashed = await bcrypt.hash(parsed.data.password, 10);
  const user = await User.create({ ...parsed.data, password: hashed });
  return NextResponse.json({ id: user._id, email: user.email, name: user.name, role: user.role }, { status: 201 });
}
