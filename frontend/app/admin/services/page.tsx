'use client';

import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import AdminIcon from '@/components/admin/AdminIcon';
import { servicesApi } from '@/lib/api';
import type { Service } from '@/lib/types';

export default function ServicesEditorPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => servicesApi.list().then(r => setServices(r.data)).catch(() => {});

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if ('_id' in editing && editing._id) {
        await servicesApi.update(editing._id, editing as Record<string, unknown>);
      } else {
        await servicesApi.create(editing as Record<string, unknown>);
      }
      setEditing(null);
      load();
    } catch {} finally { setSaving(false); }
  };

  const del = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    await servicesApi.delete(id);
    load();
  };

  return (
    <AdminShell title="Services">
      {editing && (
        <div className="ad-cal-drawer-bg" onClick={() => setEditing(null)}>
          <div className="ad-cal-drawer" onClick={e => e.stopPropagation()} style={{ width: 520 }}>
            <div className="ad-cal-drawer-head">
              <div><div className="ad-eyebrow">Service</div><h2>{'_id' in editing ? 'Edit' : 'Add'} service</h2></div>
              <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => setEditing(null)}>✕</button>
            </div>
            <div className="ad-cal-drawer-body">
              <div className="ad-row-2">
                <div className="ad-field"><label>Name</label><input className="ad-input" value={editing.name || ''} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))}/></div>
                <div className="ad-field"><label>Category</label><input className="ad-input" value={editing.category || ''} onChange={e => setEditing(p => ({ ...p, category: e.target.value }))}/></div>
              </div>
              <div className="ad-row-2">
                <div className="ad-field"><label>Duration</label><input className="ad-input" value={editing.duration || ''} onChange={e => setEditing(p => ({ ...p, duration: e.target.value }))}/></div>
                <div className="ad-field"><label>Price</label><input className="ad-input" value={editing.price || ''} onChange={e => setEditing(p => ({ ...p, price: e.target.value }))}/></div>
              </div>
              <div className="ad-field"><label>Description</label><textarea className="ad-textarea" rows={3} value={editing.desc || ''} onChange={e => setEditing(p => ({ ...p, desc: e.target.value }))}/></div>
            </div>
            <div className="ad-cal-drawer-foot">
              <button className="ad-btn ad-btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
              <div style={{ flex: 1 }}/>
              <button className="ad-btn ad-btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save service'}</button>
            </div>
          </div>
        </div>
      )}
      <div className="ad-card">
        <div className="ad-card-head">
          <div><h2>Services</h2><div className="ad-card-desc">Add, edit, and reorder.</div></div>
          <button className="ad-btn ad-btn-primary" onClick={() => setEditing({ active: true, order: services.length + 1 })}>
            <AdminIcon name="plus" size={14}/> Add service
          </button>
        </div>
        <table className="ad-table">
          <thead><tr><th>Service</th><th>Category</th><th>Duration</th><th>Price</th><th></th></tr></thead>
          <tbody>
            {services.map(s => (
              <tr key={s._id}>
                <td>
                  <div style={{ fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--taupe)' }}>{s.desc.slice(0, 60)}…</div>
                </td>
                <td><span className="ad-pill gold">{s.category}</span></td>
                <td>{s.duration}</td>
                <td style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>{s.price}</td>
                <td className="ad-td-actions">
                  <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => setEditing(s)}>
                    <AdminIcon name="edit" size={12}/> Edit
                  </button>
                  <button className="ad-btn ad-btn-danger ad-btn-sm" onClick={() => del(s._id)}>
                    <AdminIcon name="trash" size={12}/>
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', padding: '24px 0', color: 'var(--taupe)' }}>No services yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
