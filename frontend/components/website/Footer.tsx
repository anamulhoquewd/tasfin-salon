import Link from 'next/link';
import Image from 'next/image';
import type { Settings } from '@/lib/types';

export default function Footer({ settings }: { settings: Settings }) {
  return (
    <footer className="lm-footer">
      <div className="lm-footer-inner">
        <div>
          <Image src="/assets/logo/tasfin-wordmark-white.png" alt="TASFIN" width={120} height={28} style={{ height: 28, width: 'auto', marginBottom: 16 }}/>
          <p style={{ fontSize: 14, color: 'var(--taupe)', maxWidth: 300, lineHeight: 1.6 }}>
            {settings.intro.body.slice(0, 120)}…
          </p>
        </div>
        <div>
          <h4>Visit</h4>
          <ul>
            <li>{settings.address}</li>
            <li>{settings.phone}</li>
            <li>{settings.email}</li>
          </ul>
        </div>
        <div>
          <h4>Pages</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/about">About &amp; Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Follow</h4>
          <ul>
            <li><a href={settings.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href={settings.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href={`https://wa.me/${settings.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="lm-footer-meta">
        <div>© 2026 TASFIN. All rights reserved.</div>
        <div>Made in Dhaka.</div>
      </div>
    </footer>
  );
}
