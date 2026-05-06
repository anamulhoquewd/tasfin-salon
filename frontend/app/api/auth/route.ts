import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { signToken, verifyToken } from '@/lib/jwt';
import { loginSchema } from '@/lib/schemas';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  await connectDB();
  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const token = await signToken({ userId: user._id.toString(), email: user.email, role: user.role });
  return NextResponse.json({
    token,
    user: { id: user._id, email: user.email, name: user.name, role: user.role },
  });
}

export async function GET(request: NextRequest) {
  const header = request.headers.get('Authorization');
  if (!header?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const payload = await verifyToken(header.slice(7));
    await connectDB();
    const user = await User.findById(payload.userId).select('-password');
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ user: { id: user._id, email: user.email, name: user.name, role: user.role } });
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
