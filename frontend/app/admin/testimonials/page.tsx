'use client';

import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import AdminIcon from '@/components/admin/AdminIcon';
import { testimonialsApi } from '@/lib/api';
import type { Testimonial } from '@/lib/types';

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => testimonialsApi.list().then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if ('_id' in editing && editing._id) {
        await testimonialsApi.update(editing._id, editing as Record<string, unknown>);
      } else {
        await testimonialsApi.create(editing as Record<string, unknown>);
      }
      setEditing(null);
      load();
    } catch {} finally { setSaving(false); }
  };

  return (
    <AdminShell title="Testimonials">
      {editing && (
        <div className="ad-cal-drawer-bg" onClick={() => setEditing(null)}>
          <div className="ad-cal-drawer" onClick={e => e.stopPropagation()} style={{ width: 480 }}>
            <div className="ad-cal-drawer-head">
              <div><div className="ad-eyebrow">Testimonial</div><h2>{'_id' in editing ? 'Edit' : 'Add'}</h2></div>
              <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => setEditing(null)}>✕</button>
            </div>
            <div className="ad-cal-drawer-body">
              <div className="ad-row-2">
                <div className="ad-field"><label>Name</label><input className="ad-input" value={editing.name || ''} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))}/></div>
                <div className="ad-field"><label>Role</label><input className="ad-input" placeholder="Bride · Dec 2025" value={editing.role || ''} onChange={e => setEditing(p => ({ ...p, role: e.target.value }))}/></div>
              </div>
              <div className="ad-field"><label>Quote</label><textarea className="ad-textarea" rows={4} value={editing.quote || ''} onChange={e => setEditing(p => ({ ...p, quote: e.target.value }))}/></div>
            </div>
            <div className="ad-cal-drawer-foot">
              <button className="ad-btn ad-btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
              <div style={{ flex: 1 }}/>
              <button className="ad-btn ad-btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
      <div className="ad-card">
        <div className="ad-card-head">
          <div><h2>Testimonials</h2><div className="ad-card-desc">Client quotes shown on the homepage.</div></div>
          <button className="ad-btn ad-btn-primary" onClick={() => setEditing({ active: true, order: items.length + 1 })}>
            <AdminIcon name="plus" size={14}/> Add
          </button>
        </div>
        {items.map(t => (
          <div key={t._id} style={{ padding: '16px 0', borderBottom: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between', gap: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ fontWeight: 600 }}>{t.name}</div>
                <span className="ad-pill muted">{t.role}</span>
              </div>
              <p style={{ margin: 0, fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 15, color: 'var(--taupe)' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => setEditing(t)}>
                <AdminIcon name="edit" size={12}/>
              </button>
              <button className="ad-btn ad-btn-danger ad-btn-sm" onClick={async () => { await testimonialsApi.delete(t._id); load(); }}>
                <AdminIcon name="trash" size={12}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
