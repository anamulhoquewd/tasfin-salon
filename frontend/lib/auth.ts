'use client';

import type { User } from './types';

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
}

export function clearAuth() {
  localStorage.removeItem('tasfin_token');
  localStorage.removeItem('tasfin_user');
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
