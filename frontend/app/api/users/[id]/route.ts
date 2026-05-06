import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { requireSuperAdmin } from '@/lib/jwt';

type Params = { params: Promise<{ id: string }> };

export async function DELETE(request: NextRequest, { params }: Params) {
  const caller = requireSuperAdmin(request);
  if (!caller) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { id } = await params;
  if (caller.userId === id) return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 });
  await connectDB();
  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
