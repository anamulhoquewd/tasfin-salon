import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Settings from '@/models/Settings';
import { settingsSchema } from '@/lib/schemas';
import { requireAuth } from '@/lib/jwt';

export async function GET() {
  await connectDB();
  let doc = await Settings.findOne();
  if (!doc) doc = await Settings.create({});
  return NextResponse.json(doc);
}

export async function PUT(request: NextRequest) {
  if (!await requireAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  await connectDB();
  let doc = await Settings.findOne();
  if (!doc) {
    doc = await Settings.create(parsed.data);
  } else {
    Object.assign(doc, parsed.data);
    await doc.save();
  }
  return NextResponse.json(doc);
}
