'use client';

import { useEffect, useState, useCallback } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import AdminIcon from '@/components/admin/AdminIcon';
import { bookingsApi } from '@/lib/api';
import type { Booking } from '@/lib/types';

const HOUR_PX = 56;
const HOURS = Array.from({ length: 11 }, (_, i) => i + 9);
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function fmtTime(h: number) {
  const hour = Math.floor(h);
  const min = Math.round((h - hour) * 60);
  const am = hour < 12;
  const display = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${display}:${String(min).padStart(2, '0')} ${am ? 'AM' : 'PM'}`;
}

function parseHour(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h + (m || 0) / 60;
}

function getWeekDates(offset: number) {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - dayOfWeek + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    return d;
  });
}

export default function CalendarPage() {
  const [view, setView] = useState<'week' | 'day' | 'list'>('week');
  const [weekOffset, setWeekOffset] = useState(0);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const weekDates = getWeekDates(weekOffset);
  const todayIdx = new Date().getDay();

  const fetchBookings = useCallback(async () => {
    try {
      const res = await bookingsApi.list({ limit: '200' });
      setBookings(res.data.bookings);
    } catch {}
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const getBookingsForDay = (dayDate: Date) =>
    bookings.filter(b => b.date === dayDate.toISOString().split('T')[0]);

  const confirmed = bookings.filter(b => b.status === 'confirmed').length;
  const pending = bookings.filter(b => b.status === 'pending').length;
  const bridal = bookings.filter(b => b.service.toLowerCase().includes('bridal')).length;

  return (
    <AdminShell title="Calendar" pendingCount={pending}>
      <div className="ad-cal-toolbar">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => setWeekOffset(w => w - 1)}>‹</button>
          <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => setWeekOffset(0)}>This week</button>
          <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => setWeekOffset(w => w + 1)}>›</button>
          <div className="ad-cal-range">
            {weekDates[0].toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })} —{' '}
            {weekDates[6].toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div className="ad-seg">
            {(['day', 'week', 'list'] as const).map(v => (
              <button key={v} className={view === v ? 'active' : ''} onClick={() => setView(v)}>{v}</button>
            ))}
          </div>
          <button className="ad-btn ad-btn-primary" onClick={() => setShowNewForm(true)}>
            <AdminIcon name="plus" size={14}/> New booking
          </button>
        </div>
      </div>

      <div className="ad-cal-stats">
        <div className="ad-cal-stat"><div className="ad-stat-label">Confirmed</div><div className="ad-stat-value">{confirmed}</div></div>
        <div className="ad-cal-stat"><div className="ad-stat-label">Pending</div><div className="ad-stat-value">{pending}</div></div>
        <div className="ad-cal-stat"><div className="ad-stat-label">Bridal</div><div className="ad-stat-value">{bridal}</div></div>
        <div className="ad-cal-stat"><div className="ad-stat-label">Total loaded</div><div className="ad-stat-value">{bookings.length}</div></div>
      </div>

      {view === 'week' && (
        <div className="ad-cal-card">
          <div className="ad-cal-grid">
            <div className="ad-cal-gutter">
              <div className="ad-cal-day-header"/>
              {HOURS.map(h => (
                <div key={h} className="ad-cal-hour-label" style={{ height: HOUR_PX }}>
                  {h > 12 ? `${h - 12} PM` : h === 12 ? '12 PM' : `${h} AM`}
                </div>
              ))}
            </div>
            {weekDates.map((d, i) => {
              const dayBookings = getBookingsForDay(d);
              return (
                <div key={i} className={'ad-cal-col' + (i === todayIdx ? ' today' : '')}>
                  <div className="ad-cal-day-header">
                    <div className="ad-cal-day-name">{DAYS[i]}</div>
                    <div className="ad-cal-day-num">{d.getDate()}</div>
                  </div>
                  <div className="ad-cal-col-body" style={{ height: HOURS.length * HOUR_PX }}>
                    {HOURS.map(h => (
                      <div key={h} className="ad-cal-hour-line" style={{ top: (h - 9) * HOUR_PX }}/>
                    ))}
                    {dayBookings.map((b, k) => {
                      const startH = parseHour(b.time);
                      const durH = parseFloat(b.duration) || 1;
                      return (
                        <div key={k}
                          className={'ad-cal-event status-' + b.status}
                          style={{ top: (startH - 9) * HOUR_PX, height: durH * HOUR_PX - 2 }}
                          onClick={() => setSelected(b)}>
                          <div className="ad-cal-event-time">{b.time}</div>
                          <div className="ad-cal-event-name">{b.clientName}</div>
                          <div className="ad-cal-event-svc">{b.service}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === 'day' && (
        <div className="ad-cal-card">
          <div className="ad-cal-day-view">
            <div className="ad-cal-gutter">
              <div className="ad-cal-day-header"/>
              {HOURS.map(h => (
                <div key={h} className="ad-cal-hour-label" style={{ height: HOUR_PX }}>
                  {h > 12 ? `${h - 12} PM` : h === 12 ? '12 PM' : `${h} AM`}
                </div>
              ))}
            </div>
            <div className="ad-cal-col today" style={{ flex: 1 }}>
              <div className="ad-cal-day-header">
                <div className="ad-cal-day-name">Today · {DAYS[todayIdx]}</div>
                <div className="ad-cal-day-num">{weekDates[todayIdx]?.getDate()} {weekDates[todayIdx]?.toLocaleString('default', { month: 'short' })}</div>
              </div>
              <div className="ad-cal-col-body" style={{ height: HOURS.length * HOUR_PX }}>
                {HOURS.map(h => <div key={h} className="ad-cal-hour-line" style={{ top: (h - 9) * HOUR_PX }}/>)}
                {getBookingsForDay(weekDates[todayIdx]).map((b, k) => {
                  const startH = parseHour(b.time);
                  const durH = parseFloat(b.duration) || 1;
                  return (
                    <div key={k} className={'ad-cal-event wide status-' + b.status}
                      style={{ top: (startH - 9) * HOUR_PX, height: durH * HOUR_PX - 2 }}
                      onClick={() => setSelected(b)}>
                      <div className="ad-cal-event-time">{b.time} — {fmtTime(startH + durH)}</div>
                      <div className="ad-cal-event-name">{b.clientName}</div>
                      <div className="ad-cal-event-svc">{b.service} · {b.price}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'list' && (
        <div className="ad-card">
          <table className="ad-table">
            <thead><tr><th>When</th><th>Client</th><th>Service</th><th>Price</th><th>Channel</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {bookings.map((b, k) => (
                <tr key={k} onClick={() => setSelected(b)} style={{ cursor: 'pointer' }}>
                  <td><div style={{ fontWeight: 600 }}>{b.date}</div><div style={{ fontSize: 12, color: 'var(--taupe)' }}>{b.time}</div></td>
                  <td>{b.clientName}</td>
                  <td>{b.service}</td>
                  <td style={{ fontFamily: 'var(--font-display)' }}>{b.price || '—'}</td>
                  <td><span className={'ad-pill ' + (b.channel === 'WhatsApp' ? 'wa' : 'muted')}>{b.channel}</span></td>
                  <td><span className={'ad-pill ' + (b.status === 'confirmed' ? 'success' : b.status === 'pending' ? 'warn' : 'muted')}>{b.status}</span></td>
                  <td className="ad-td-actions"><button className="ad-btn ad-btn-ghost ad-btn-sm">Open</button></td>
                </tr>
              ))}
              {bookings.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', padding: '32px 0', color: 'var(--taupe)' }}>No bookings found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="ad-cal-drawer-bg" onClick={() => setSelected(null)}>
          <div className="ad-cal-drawer" onClick={e => e.stopPropagation()}>
            <div className="ad-cal-drawer-head">
              <div>
                <div className="ad-eyebrow">Booking</div>
                <h2>{selected.clientName}</h2>
              </div>
              <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="ad-cal-drawer-body">
              {[
                ['Service', selected.service],
                ['When', `${selected.date} · ${selected.time}`],
                ['Duration', selected.duration],
                ['Price', selected.price],
                ['Phone', selected.phone],
                ['Channel', selected.channel],
                ['Status', selected.status],
                ['Notes', selected.notes],
              ].filter(([, v]) => v).map(([k, v]) => (
                <div key={k as string} className="ad-cal-drawer-row">
                  <div className="ad-cal-drawer-key">{k}</div>
                  <div>{k === 'Status'
                    ? <span className={'ad-pill ' + (v === 'confirmed' ? 'success' : v === 'pending' ? 'warn' : 'muted')}>{v}</span>
                    : v}
                  </div>
                </div>
              ))}
            </div>
            <div className="ad-cal-drawer-foot">
              {selected.phone && (
                <a className="ad-btn ad-btn-ghost"
                  href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`}
                  target="_blank" rel="noopener noreferrer">
                  <AdminIcon name="phone" size={14}/> WhatsApp
                </a>
              )}
              <button className="ad-btn ad-btn-ghost"><AdminIcon name="edit" size={14}/> Edit</button>
              <div style={{ flex: 1 }}/>
              {selected.status === 'pending' && (
                <button className="ad-btn ad-btn-primary" onClick={async () => {
                  await bookingsApi.update(selected._id, { status: 'confirmed' });
                  setSelected(prev => prev ? { ...prev, status: 'confirmed' } : null);
                  fetchBookings();
                }}>Confirm</button>
              )}
            </div>
          </div>
        </div>
      )}

      {showNewForm && (
        <div className="ad-cal-drawer-bg" onClick={() => setShowNewForm(false)}>
          <div className="ad-cal-drawer" onClick={e => e.stopPropagation()} style={{ width: 480 }}>
            <div className="ad-cal-drawer-head">
              <div><div className="ad-eyebrow">Manual entry</div><h2>New booking</h2></div>
              <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => setShowNewForm(false)}>✕</button>
            </div>
            <NewBookingForm onClose={() => setShowNewForm(false)} onSaved={() => { setShowNewForm(false); fetchBookings(); }}/>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function NewBookingForm({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ clientName: '', phone: '', service: '', date: '', time: '', channel: 'Walk-in', notes: '' });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await bookingsApi.create({ ...form, duration: '1h', status: 'confirmed' });
      onSaved();
    } catch {} finally { setSaving(false); }
  };

  return (
    <>
      <div className="ad-cal-drawer-body">
        <div className="ad-row-2">
          <div className="ad-field"><label>Client name</label><input className="ad-input" placeholder="Naima Rahman" value={form.clientName} onChange={e => setForm(p => ({ ...p, clientName: e.target.value }))}/></div>
          <div className="ad-field"><label>Phone</label><input className="ad-input" placeholder="+880 17" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}/></div>
        </div>
        <div className="ad-field"><label>Service</label>
          <select className="ad-select" value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))}>
            <option value="">Select service…</option>
            {['Bridal Makeup', 'Hair Color', 'Signature Facial', 'Mani-pedi', 'Threading', 'Haircut & Style'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="ad-row-2">
          <div className="ad-field"><label>Date</label><input className="ad-input" type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}/></div>
          <div className="ad-field"><label>Start time</label><input className="ad-input" type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))}/></div>
        </div>
        <div className="ad-field"><label>Channel</label>
          <div className="ad-seg" style={{ width: '100%' }}>
            {(['Walk-in', 'Phone call', 'WhatsApp', 'Form'] as const).map(ch => (
              <button key={ch} className={form.channel === ch ? 'active' : ''} style={{ flex: 1 }} onClick={() => setForm(p => ({ ...p, channel: ch }))}>{ch}</button>
            ))}
          </div>
        </div>
        <div className="ad-field"><label>Notes</label><textarea className="ad-textarea" rows={3} placeholder="Allergy notes, prior services…" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}/></div>
      </div>
      <div className="ad-cal-drawer-foot">
        <button className="ad-btn ad-btn-ghost" onClick={onClose}>Cancel</button>
        <div style={{ flex: 1 }}/>
        <button className="ad-btn ad-btn-primary" onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save booking'}
        </button>
      </div>
    </>
  );
}
