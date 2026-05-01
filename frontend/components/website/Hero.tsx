'use client';

import { useState } from 'react';
import Link from 'next/link';
import SalonIcon from './SalonIcon';
import type { Settings, ReelSettings } from '@/lib/types';

interface HeroProps {
  settings: Settings;
  reel: ReelSettings;
}

export default function Hero({ settings, reel }: HeroProps) {
  const [loops, setLoops] = useState(0);
  const whatsappNum = settings.whatsapp.replace(/\D/g, '');
  return (
    <section className="lm-hero">
      <div className="lm-hero-bg"/>
      <div className="lm-hero-content">
        <div>
          <div className="lm-hero-eyebrow">{settings.established}</div>
          <h1 className="lm-hero-title">{settings.hero.salonName}</h1>
          <p className="lm-hero-slogan">{settings.hero.slogan}</p>
          <div className="lm-hero-ctas">
            <Link href="/about" className="lm-btn lm-btn-gold">
              <SalonIcon name="calendar" size={16}/> {settings.hero.primaryCta}
            </Link>
            <a className="lm-btn lm-btn-wa" href={`https://wa.me/${whatsappNum}`} target="_blank" rel="noopener noreferrer">
              <SalonIcon name="whatsapp" size={16}/> {settings.hero.secondaryCta}
            </a>
          </div>
        </div>
        <div className="lm-hero-reel">
          <div className="lm-hero-reel-placeholder">
            <SalonIcon name="play" size={36}/>
            <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13, opacity: 0.7 }}>
              Reel · {loops}/{reel.maxLoops} loops
            </div>
            <button className="lm-btn-text" style={{ color: 'var(--champagne)', fontSize: 11 }}
              onClick={() => setLoops(l => Math.min(l + 1, reel.maxLoops))}>
              Replay
            </button>
          </div>
          <div className="lm-hero-reel-loops">{loops}/{reel.maxLoops} ▸ admin set</div>
        </div>
      </div>
    </section>
  );
}
