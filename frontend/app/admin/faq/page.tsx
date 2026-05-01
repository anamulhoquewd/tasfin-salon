'use client';

import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import AdminIcon from '@/components/admin/AdminIcon';
import { faqApi } from '@/lib/api';
import type { FaqItem } from '@/lib/types';

export default function FaqAdminPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [editing, setEditing] = useState<Partial<FaqItem> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => faqApi.list().then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if ('_id' in editing && editing._id) {
        await faqApi.update(editing._id, editing as Record<string, unknown>);
      } else {
        await faqApi.create(editing as Record<string, unknown>);
      }
      setEditing(null);
      load();
    } catch {} finally { setSaving(false); }
  };

  return (
    <AdminShell title="FAQ">
      {editing && (
        <div className="ad-cal-drawer-bg" onClick={() => setEditing(null)}>
          <div className="ad-cal-drawer" onClick={e => e.stopPropagation()} style={{ width: 480 }}>
            <div className="ad-cal-drawer-head">
              <div><div className="ad-eyebrow">FAQ</div><h2>{'_id' in editing ? 'Edit' : 'Add'} question</h2></div>
              <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => setEditing(null)}>✕</button>
            </div>
            <div className="ad-cal-drawer-body">
              <div className="ad-field"><label>Question</label><input className="ad-input" value={editing.question || ''} onChange={e => setEditing(p => ({ ...p, question: e.target.value }))}/></div>
              <div className="ad-field"><label>Answer</label><textarea className="ad-textarea" rows={5} value={editing.answer || ''} onChange={e => setEditing(p => ({ ...p, answer: e.target.value }))}/></div>
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
          <div><h2>FAQ</h2><div className="ad-card-desc">Common questions shown on the About page.</div></div>
          <button className="ad-btn ad-btn-primary" onClick={() => setEditing({ active: true, order: items.length + 1 })}>
            <AdminIcon name="plus" size={14}/> Add question
          </button>
        </div>
        {items.map(f => (
          <div key={f._id} style={{ padding: '16px 0', borderBottom: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between', gap: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{f.question}</div>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--taupe)', lineHeight: 1.55 }}>{f.answer}</p>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => setEditing(f)}>
                <AdminIcon name="edit" size={12}/>
              </button>
              <button className="ad-btn ad-btn-danger ad-btn-sm" onClick={async () => { await faqApi.delete(f._id); load(); }}>
                <AdminIcon name="trash" size={12}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
