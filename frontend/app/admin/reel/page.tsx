'use client';

import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import AdminIcon from '@/components/admin/AdminIcon';
import { reelApi } from '@/lib/api';
import type { ReelSettings } from '@/lib/types';

export default function ReelPage() {
  const [reel, setReel] = useState<ReelSettings>({ src: '', autoplay: true, maxLoops: 2 });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { reelApi.get().then(r => setReel(r.data)).catch(() => {}); }, []);

  const save = async () => {
    setSaving(true);
    try {
      await reelApi.update(reel as unknown as Record<string, unknown>);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {} finally { setSaving(false); }
  };

  return (
    <AdminShell title="Reel settings">
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
        <div className="ad-card">
          <div className="ad-card-head">
            <div><h2>Homepage reel</h2><div className="ad-card-desc">Controls the auto-playing video on the home hero.</div></div>
            <button className="ad-btn ad-btn-primary" onClick={save} disabled={saving}>
              {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save'}
            </button>
          </div>
          <div className="ad-toggle-row">
            <div>
              <div className="ad-toggle-row-label">Auto-play on page load</div>
              <div className="ad-toggle-row-desc">Visitors see the reel start automatically. Always muted.</div>
            </div>
            <div className={'ad-toggle' + (reel.autoplay ? ' on' : '')} onClick={() => setReel(p => ({ ...p, autoplay: !p.autoplay }))}/>
          </div>
          <div className="ad-toggle-row">
            <div>
              <div className="ad-toggle-row-label">Maximum loops</div>
              <div className="ad-toggle-row-desc">Reel stops after this many plays — visitor can manually replay.</div>
            </div>
            <div className="ad-seg">
              {[1, 2, 3].map(n => (
                <button key={n} className={reel.maxLoops === n ? 'active' : ''} onClick={() => setReel(p => ({ ...p, maxLoops: n }))}>{n}×</button>
              ))}
            </div>
          </div>
          <div className="ad-toggle-row">
            <div>
              <div className="ad-toggle-row-label">Reel source</div>
              <div className="ad-toggle-row-desc">{reel.filename || 'No reel uploaded'}</div>
            </div>
            <button className="ad-btn ad-btn-ghost ad-btn-sm"><AdminIcon name="upload" size={12}/> Replace</button>
          </div>
        </div>
        <div className="ad-card">
          <div className="ad-card-head"><div><h2>Preview</h2><div className="ad-card-desc">As visitors will see it.</div></div></div>
          <div className="ad-reel-preview">
            <AdminIcon name="play" size={36}/>
            <div className="ad-reel-loops">0/{reel.maxLoops} loops · {reel.autoplay ? 'auto' : 'manual'}</div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
