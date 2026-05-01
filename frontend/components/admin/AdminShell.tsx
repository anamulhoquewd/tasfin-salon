'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import AdminIcon from './AdminIcon';
import { getUser, clearAuth } from '@/lib/auth';
import type { User } from '@/lib/types';

const sections = [
  { group: 'Overview', items: [
    { href: '/admin', icon: 'home', label: 'Dashboard' },
    { href: '/admin/inbox', icon: 'inbox', label: 'Booking inbox', badge: true },
    { href: '/admin/calendar', icon: 'calendar', label: 'Calendar' },
  ]},
  { group: 'Content', items: [
    { href: '/admin/frontpage', icon: 'fileText', label: 'Frontpage' },
    { href: '/admin/services', icon: 'layers', label: 'Services' },
    { href: '/admin/portfolio', icon: 'image', label: 'Portfolio' },
    { href: '/admin/testimonials', icon: 'star', label: 'Testimonials' },
    { href: '/admin/faq', icon: 'help', label: 'FAQ' },
    { href: '/admin/contact', icon: 'phone', label: 'Contact info' },
  ]},
  { group: 'Media', items: [
    { href: '/admin/media', icon: 'image', label: 'Media library' },
    { href: '/admin/reel', icon: 'video', label: 'Reel settings' },
  ]},
  { group: 'System', items: [
    { href: '/admin/users', icon: 'users', label: 'Users', superAdminOnly: true },
    { href: '/admin/settings', icon: 'settings', label: 'Settings' },
  ]},
];

interface AdminShellProps {
  children: React.ReactNode;
  title: string;
  pendingCount?: number;
}

export default function AdminShell({ children, title, pendingCount = 0 }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push('/admin/login'); return; }
    setUser(u);
  }, [router]);

  const handleLogout = () => {
    clearAuth();
    router.push('/admin/login');
  };

  if (!user) return null;

  return (
    <div className="ad-shell">
      <aside className="ad-sidebar">
        <div className="ad-sidebar-logo">
          <Image src="/assets/logo/tasfin-wordmark-black.png" alt="TASFIN" width={120} height={24} style={{ height: 24, width: 'auto' }}/>
        </div>
        {sections.map(s => (
          <div key={s.group}>
            <div className="ad-sidebar-section">{s.group}</div>
            {s.items
              .filter(it => !('superAdminOnly' in it) || !it.superAdminOnly || user.role === 'super_admin')
              .map(it => {
                const isActive = it.href === '/admin' ? pathname === '/admin' : pathname.startsWith(it.href);
                return (
                  <Link key={it.href} href={it.href}
                    className={'ad-sidebar-link' + (isActive ? ' active' : '')}>
                    <AdminIcon name={it.icon} size={18}/>
                    <span style={{ flex: 1 }}>{it.label}</span>
                    {'badge' in it && it.badge && pendingCount > 0 && (
                      <span className="ad-sidebar-badge">{pendingCount}</span>
                    )}
                  </Link>
                );
              })}
          </div>
        ))}
        <div className="ad-sidebar-foot">
          <div className="ad-avatar"/>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{user.name}</div>
            <div style={{ fontSize: 11, color: 'var(--taupe)' }}>{user.role === 'super_admin' ? 'Super Admin' : 'Admin'}</div>
          </div>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--taupe)' }}>
            <AdminIcon name="logOut" size={16}/>
          </button>
        </div>
      </aside>
      <div style={{ background: 'var(--cream-soft)', minHeight: '100vh' }}>
        <div className="ad-topbar">
          <h1>{title}</h1>
          <div className="ad-topbar-actions">
            <input className="ad-search" placeholder="Search..."/>
            <Link href="/" target="_blank" className="ad-btn ad-btn-primary">View site →</Link>
          </div>
        </div>
        <div className="ad-content">{children}</div>
      </div>
    </div>
  );
}
