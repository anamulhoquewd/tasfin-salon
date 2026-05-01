'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import SalonIcon from './SalonIcon';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="lm-nav">
      <div className="lm-nav-inner">
        <Link href="/" className="lm-nav-logo">
          <Image src="/assets/logo/tasfin-wordmark-black.png" alt="TASFIN" width={120} height={28} style={{ height: 28, width: 'auto' }}/>
        </Link>
        <div className="lm-nav-links">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className={'lm-nav-link' + (pathname === l.href ? ' active' : '')}>
              {l.label}
            </Link>
          ))}
          <Link href="/about" className="lm-btn lm-btn-primary" style={{ padding: '10px 20px' }}>
            <SalonIcon name="calendar" size={16}/> Book now
          </Link>
        </div>
      </div>
    </nav>
  );
}
