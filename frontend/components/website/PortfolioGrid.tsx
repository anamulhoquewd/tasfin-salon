'use client';

import { useState } from 'react';
import Link from 'next/link';
import SalonIcon from './SalonIcon';
import type { PortfolioItem } from '@/lib/types';

interface PortfolioGridProps {
  items: PortfolioItem[];
  teaser?: boolean;
}

export default function PortfolioGrid({ items, teaser = false }: PortfolioGridProps) {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);
  const cats = ['All', 'Bridal', 'Hair', 'Facial', 'Nail'];

  const displayed = teaser ? items.slice(0, 6)
    : (filter === 'All' ? items : items.filter(p => p.category === filter));

  return (
    <section className="lm-section">
      <div className="lm-container">
        <span className="lm-eyebrow">Portfolio</span>
        <h2 className="lm-section-title">{teaser ? 'Recent work' : 'Every face is its own brief.'}</h2>
        {!teaser && (
          <>
            <p className="lm-section-lead">A selection of work from the last twelve months.</p>
            <div className="lm-portfolio-filters">
              {cats.map(c => (
                <button key={c} className={'lm-chip' + (filter === c ? ' active' : '')} onClick={() => setFilter(c)}>{c}</button>
              ))}
            </div>
          </>
        )}
        <div className="lm-portfolio-grid" style={teaser ? { gridTemplateColumns: 'repeat(6, 1fr)' } : {}}>
          {displayed.map(p => (
            <div key={p._id} className="lm-portfolio-item" onClick={() => setLightbox(p)}>
              <div className={`lm-portfolio-bg tone-${p.tone}`}/>
              {!teaser && <div className="lm-portfolio-label">{p.category}</div>}
            </div>
          ))}
        </div>
        {teaser && (
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <Link href="/portfolio" className="lm-btn lm-btn-ghost">
              See full portfolio <SalonIcon name="arrowRight" size={16}/>
            </Link>
          </div>
        )}
      </div>
      {lightbox && (
        <div className="lm-lightbox" onClick={() => setLightbox(null)}>
          <div className="lm-lightbox-frame" onClick={e => e.stopPropagation()}>
            <div className={`lm-portfolio-bg tone-${lightbox.tone}`} style={{ position: 'absolute', inset: 0, borderRadius: 12 }}/>
            <button className="lm-lightbox-close" onClick={() => setLightbox(null)}>
              <SalonIcon name="x" size={20}/>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
