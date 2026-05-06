'use client';

import type { User } from './types';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days — matches JWT expiry

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('tasfin_token');
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('tasfin_user');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function setAuth(token: string, user: User) {
  localStorage.setItem('tasfin_token', token);
  localStorage.setItem('tasfin_user', JSON.stringify(user));
  // Cookie is readable by Next.js middleware (server-side) for route protection
  document.cookie = `tasfin_token=${token}; path=/; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`;
}

export function clearAuth() {
  localStorage.removeItem('tasfin_token');
  localStorage.removeItem('tasfin_user');
  document.cookie = 'tasfin_token=; path=/; SameSite=Lax; Max-Age=0';
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
