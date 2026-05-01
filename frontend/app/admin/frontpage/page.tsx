'use client';

import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { settingsApi } from '@/lib/api';
import type { Settings } from '@/lib/types';
import { defaultSettings } from '@/lib/defaults';

export default function FrontpagePage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    settingsApi.get().then(r => setSettings(r.data)).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await settingsApi.update(settings as unknown as Record<string, unknown>);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {} finally { setSaving(false); }
  };

  const set = (path: string[], val: string) => {
    setSettings(prev => {
      const next = structuredClone(prev);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = next;
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
      obj[path[path.length - 1]] = val;
      return next;
    });
  };

  return (
    <AdminShell title="Frontpage content">
      <div className="ad-card">
        <div className="ad-card-head">
          <div><h2>Hero section</h2><div className="ad-card-desc">The first thing visitors see.</div></div>
          <button className="ad-btn ad-btn-primary" onClick={save} disabled={saving}>
            {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
        <div className="ad-row-2">
          <div className="ad-field"><label>Salon name</label><input className="ad-input" value={settings.hero.salonName} onChange={e => set(['hero', 'salonName'], e.target.value)}/></div>
          <div className="ad-field"><label>Eyebrow</label><input className="ad-input" value={settings.hero.eyebrow} onChange={e => set(['hero', 'eyebrow'], e.target.value)}/></div>
        </div>
        <div className="ad-field"><label>Slogan</label><textarea className="ad-textarea" value={settings.hero.slogan} onChange={e => set(['hero', 'slogan'], e.target.value)}/></div>
        <div className="ad-row-2">
          <div className="ad-field"><label>Primary CTA</label><input className="ad-input" value={settings.hero.primaryCta} onChange={e => set(['hero', 'primaryCta'], e.target.value)}/></div>
          <div className="ad-field"><label>Secondary CTA</label><input className="ad-input" value={settings.hero.secondaryCta} onChange={e => set(['hero', 'secondaryCta'], e.target.value)}/></div>
        </div>
      </div>
      <div className="ad-card">
        <div className="ad-card-head"><div><h2>Intro section</h2><div className="ad-card-desc">&ldquo;Why us&rdquo; copy below the hero.</div></div></div>
        <div className="ad-field"><label>Title</label><input className="ad-input" value={settings.intro.title} onChange={e => set(['intro', 'title'], e.target.value)}/></div>
        <div className="ad-field"><label>Body</label><textarea className="ad-textarea" rows={3} value={settings.intro.body} onChange={e => set(['intro', 'body'], e.target.value)}/></div>
      </div>
    </AdminShell>
  );
}
