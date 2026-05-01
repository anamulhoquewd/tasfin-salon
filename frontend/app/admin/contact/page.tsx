'use client';

import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { settingsApi } from '@/lib/api';
import type { Settings } from '@/lib/types';
import { defaultSettings } from '@/lib/defaults';

export default function ContactPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { settingsApi.get().then(r => setSettings(r.data)).catch(() => {}); }, []);

  const save = async () => {
    setSaving(true);
    try {
      await settingsApi.update(settings as unknown as Record<string, unknown>);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {} finally { setSaving(false); }
  };

  const updateHour = (idx: number, field: 'day' | 'time', val: string) => {
    setSettings(prev => {
      const hours = [...prev.hours];
      hours[idx] = { ...hours[idx], [field]: val };
      return { ...prev, hours };
    });
  };

  return (
    <AdminShell title="Contact information">
      <div className="ad-card">
        <div className="ad-card-head">
          <div><h2>Contact information</h2><div className="ad-card-desc">Shown in the footer, contact CTA, and about page.</div></div>
          <button className="ad-btn ad-btn-primary" onClick={save} disabled={saving}>
            {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
        <div className="ad-row-2">
          <div className="ad-field"><label>Phone</label><input className="ad-input" value={settings.phone} onChange={e => setSettings(p => ({ ...p, phone: e.target.value }))}/></div>
          <div className="ad-field"><label>WhatsApp</label><input className="ad-input" value={settings.whatsapp} onChange={e => setSettings(p => ({ ...p, whatsapp: e.target.value }))}/></div>
          <div className="ad-field"><label>Email</label><input className="ad-input" value={settings.email} onChange={e => setSettings(p => ({ ...p, email: e.target.value }))}/></div>
          <div className="ad-field"><label>Facebook URL</label><input className="ad-input" value={settings.facebook} onChange={e => setSettings(p => ({ ...p, facebook: e.target.value }))}/></div>
        </div>
        <div className="ad-field"><label>Address</label><input className="ad-input" value={settings.address} onChange={e => setSettings(p => ({ ...p, address: e.target.value }))}/></div>
        <div className="ad-field"><label>Instagram URL</label><input className="ad-input" value={settings.instagram} onChange={e => setSettings(p => ({ ...p, instagram: e.target.value }))}/></div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, margin: '24px 0 8px' }}>Opening hours</h3>
        {settings.hours.map((h, i) => (
          <div key={i} className="ad-row-2" style={{ marginBottom: 12 }}>
            <div className="ad-field" style={{ margin: 0 }}><input className="ad-input" value={h.day} onChange={e => updateHour(i, 'day', e.target.value)}/></div>
            <div className="ad-field" style={{ margin: 0 }}><input className="ad-input" value={h.time} onChange={e => updateHour(i, 'time', e.target.value)}/></div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
