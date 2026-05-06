import { SignJWT, jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import type { UserRole } from '@/lib/types';

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

function getSecret() {
  return new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
}

export async function signToken(payload: JwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, getSecret());
  return payload as unknown as JwtPayload;
}

export async function requireAuth(request: NextRequest): Promise<JwtPayload | null> {
  const header = request.headers.get('Authorization');
  if (!header?.startsWith('Bearer ')) return null;
  try {
    return await verifyToken(header.slice(7));
  } catch {
    return null;
  }
}

export async function requireSuperAdmin(request: NextRequest): Promise<JwtPayload | null> {
  const user = await requireAuth(request);
  if (user?.role !== 'super_admin') return null;
  return user;
}
