'use client';

import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import AdminIcon from '@/components/admin/AdminIcon';
import { portfolioApi } from '@/lib/api';
import type { PortfolioItem } from '@/lib/types';

const TONES = ['blush', 'champagne', 'espresso', 'cream'];
const CATS = ['Bridal', 'Hair', 'Facial', 'Nail', 'Wax'];

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [tab, setTab] = useState('images');

  const load = () => portfolioApi.list().then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const add = async () => {
    await portfolioApi.create({ category: 'Bridal', tone: 'blush', active: true, order: items.length + 1 });
    load();
  };

  return (
    <AdminShell title="Portfolio">
      <div className="ad-tabs">
        {['images', 'videos'].map(t => (
          <div key={t} className={'ad-tab' + (tab === t ? ' active' : '')} onClick={() => setTab(t)}>
            {t === 'images' ? 'Images' : 'Reels & videos'}
          </div>
        ))}
      </div>
      <div className="ad-card">
        <div className="ad-card-head">
          <div><h2>Portfolio media</h2><div className="ad-card-desc">Drag in or click to upload. JPG / PNG up to 8 MB · MP4 up to 30 MB.</div></div>
          <button className="ad-btn ad-btn-primary" onClick={add}><AdminIcon name="upload" size={14}/> Add item</button>
        </div>
        <div className="ad-media-grid">
          <div className="ad-media-upload"><AdminIcon name="upload" size={24}/><div style={{ fontSize: 12 }}>Upload</div></div>
          {items.map(p => (
            <div key={p._id} className="ad-media-item">
              <div className={`ad-media-bg tone-${p.tone}`}/>
              <div className="ad-media-tag">{p.category}</div>
              <button
                onClick={async () => { await portfolioApi.delete(p._id); load(); }}
                style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(43,31,26,0.7)', border: 'none', borderRadius: 4, color: 'white', cursor: 'pointer', padding: '2px 6px', fontSize: 10 }}>
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

export { TONES, CATS };
