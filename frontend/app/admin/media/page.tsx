'use client';

import { useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import AdminIcon from '@/components/admin/AdminIcon';

const placeholders = [
  { id: 1, category: 'Bridal', tone: 'blush' },
  { id: 2, category: 'Hair', tone: 'espresso' },
  { id: 3, category: 'Facial', tone: 'cream' },
  { id: 4, category: 'Nail', tone: 'champagne' },
  { id: 5, category: 'Bridal', tone: 'blush' },
  { id: 6, category: 'Hair', tone: 'cream' },
];

export default function MediaPage() {
  const [tab, setTab] = useState('images');

  return (
    <AdminShell title="Media library">
      <div className="ad-tabs">
        {['images', 'videos'].map(t => (
          <div key={t} className={'ad-tab' + (tab === t ? ' active' : '')} onClick={() => setTab(t)}>
            {t === 'images' ? 'Images' : 'Reels & videos'}
          </div>
        ))}
      </div>
      <div className="ad-card">
        <div className="ad-card-head">
          <div><h2>Media library</h2><div className="ad-card-desc">Drag in or click to upload. JPG / PNG up to 8 MB · MP4 up to 30 MB.</div></div>
          <button className="ad-btn ad-btn-primary"><AdminIcon name="upload" size={14}/> Upload</button>
        </div>
        <div className="ad-media-grid">
          <div className="ad-media-upload"><AdminIcon name="upload" size={24}/><div style={{ fontSize: 12 }}>Upload</div></div>
          {placeholders.map(p => (
            <div key={p.id} className="ad-media-item">
              <div className={`ad-media-bg tone-${p.tone}`}/>
              <div className="ad-media-tag">{p.category}</div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
