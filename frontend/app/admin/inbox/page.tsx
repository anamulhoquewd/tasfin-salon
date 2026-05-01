'use client';

import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import AdminIcon from '@/components/admin/AdminIcon';
import { bookingsApi } from '@/lib/api';
import type { Booking } from '@/lib/types';

export default function InboxPage() {
  const [tab, setTab] = useState<'pending' | 'confirmed'>('pending');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await bookingsApi.list({ status: tab });
      setBookings(res.data.bookings);
      if (res.data.bookings.length > 0 && !selected) {
        setSelected(res.data.bookings[0]);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setSelected(null);
    fetchBookings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const handleConfirm = async () => {
    if (!selected) return;
    try {
      await bookingsApi.update(selected._id, { status: 'confirmed' });
      setSelected(prev => prev ? { ...prev, status: 'confirmed' } : null);
      fetchBookings();
    } catch {}
  };

  const withRawMsg = bookings.filter(b => b.rawMessage);
  const pending = bookings.filter(b => b.status === 'pending');
  const confirmed = bookings.filter(b => b.status === 'confirmed');

  return (
    <AdminShell title="Booking inbox" pendingCount={pending.length}>
      <div className="ad-inbox-stats">
        <div className="ad-inbox-stat-card">
          <div className="ad-stat-label">New · awaiting confirm</div>
          <div className="ad-stat-value" style={{ color: 'var(--gold-deep)' }}>{pending.length}</div>
          <div style={{ fontSize: 12, color: 'var(--taupe)' }}>Parsed from WhatsApp / form</div>
        </div>
        <div className="ad-inbox-stat-card">
          <div className="ad-stat-label">With WhatsApp message</div>
          <div className="ad-stat-value">{withRawMsg.length}</div>
          <div style={{ fontSize: 12, color: 'var(--taupe)' }}>Auto-parsed bookings</div>
        </div>
        <div className="ad-inbox-stat-card">
          <div className="ad-stat-label">Confirmed today</div>
          <div className="ad-stat-value">{confirmed.length}</div>
          <div style={{ fontSize: 12, color: 'var(--success)' }}>↑ on Calendar instantly</div>
        </div>
      </div>

      <div className="ad-inbox-flow">
        {[
          { num: '1', name: 'Customer', desc: 'Sends WhatsApp / submits form', active: false },
          { num: '2', name: 'Auto-parse', desc: 'Service · date · time extracted', active: false },
          { num: '3', name: 'You confirm', desc: 'One click — review & confirm', active: true },
          { num: '4', name: 'On Calendar', desc: '+ auto-reply sent to customer', active: false },
        ].map((step, i) => (
          <div key={step.num} style={{ display: 'contents' }}>
            {i > 0 && <div className="ad-flow-arrow">→</div>}
            <div className={'ad-flow-step' + (step.active ? ' active' : '')}>
              <div className="ad-flow-num">{step.num}</div>
              <div>
                <div className="ad-flow-name">{step.name}</div>
                <div className="ad-flow-desc">{step.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ad-inbox-shell">
        <div className="ad-inbox-list">
          <div className="ad-inbox-tabs">
            {[
              { key: 'pending', label: 'New', count: pending.length },
              { key: 'confirmed', label: 'Confirmed', count: confirmed.length },
            ].map(t => (
              <div key={t.key} className={'ad-inbox-tab' + (tab === t.key ? ' active' : '')}
                onClick={() => setTab(t.key as 'pending' | 'confirmed')}>
                {t.label} <span className="ad-inbox-tab-count">{t.count}</span>
              </div>
            ))}
          </div>
          {loading ? (
            <div style={{ padding: 32, textAlign: 'center', color: 'var(--taupe)' }}>Loading…</div>
          ) : bookings.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', color: 'var(--taupe)' }}>No bookings in this tab.</div>
          ) : (
            bookings.map(b => (
              <div key={b._id} className={'ad-inbox-item' + (selected?._id === b._id ? ' active' : '')}
                onClick={() => setSelected(b)}>
                <div className="ad-avatar"/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{b.clientName}</div>
                    <div style={{ fontSize: 11, color: 'var(--taupe-soft)', whiteSpace: 'nowrap' }}>
                      {new Date(b.createdAt).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  <div className="ad-inbox-item-snippet">
                    {b.rawMessage || `${b.service} · ${b.date} ${b.time}`}
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                    <span className={'ad-pill ' + (b.channel === 'WhatsApp' ? 'wa' : 'muted')}>{b.channel}</span>
                    {b.parseConfidence && b.parseConfidence < 0.85 && (
                      <span className="ad-pill warn">Low confidence</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="ad-inbox-detail">
          {selected ? (
            <>
              <div className="ad-inbox-detail-head">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="ad-avatar" style={{ width: 44, height: 44 }}/>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>
                      {selected.clientName}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--taupe)' }}>
                      {selected.phone && `${selected.phone} · `}via {selected.channel}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="ad-btn ad-btn-ghost ad-btn-sm">Open chat</button>
                </div>
              </div>

              {selected.rawMessage && (
                <div className="ad-msg-bubble">
                  <div className="ad-msg-meta">{selected.channel} · incoming</div>
                  <div className="ad-msg-body">&ldquo;{selected.rawMessage}&rdquo;</div>
                </div>
              )}

              <div className="ad-parsed-card">
                <div className="ad-parsed-head">
                  <div>
                    <div className="ad-eyebrow">Booking details</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500 }}>
                      Review &amp; edit before confirming
                    </div>
                  </div>
                  {selected.parseConfidence && (
                    <div className="ad-confidence">
                      <div className="ad-confidence-bar">
                        <div className="ad-confidence-fill" style={{ width: (selected.parseConfidence * 100) + '%' }}/>
                      </div>
                      <div className="ad-confidence-num">{Math.round(selected.parseConfidence * 100)}% match</div>
                    </div>
                  )}
                </div>
                <div className="ad-parsed-grid">
                  <div className="ad-field"><label>Service</label><input className="ad-input" defaultValue={selected.service}/></div>
                  <div className="ad-field"><label>Duration</label><input className="ad-input" defaultValue={selected.duration}/></div>
                  <div className="ad-field"><label>Date</label><input className="ad-input" defaultValue={selected.date}/></div>
                  <div className="ad-field"><label>Time</label><input className="ad-input" defaultValue={selected.time}/></div>
                </div>
                <div className="ad-slot-suggest">
                  <AdminIcon name="calendar" size={14}/> Slot available · check calendar before confirming
                </div>
              </div>

              {selected.autoReply && (
                <div className="ad-reply-card">
                  <div className="ad-eyebrow">Auto-reply (sent on confirm)</div>
                  <textarea className="ad-textarea" defaultValue={selected.autoReply} rows={3}/>
                  <div style={{ fontSize: 12, color: 'var(--taupe)' }}>Templated · edit before send.</div>
                </div>
              )}

              <div className="ad-inbox-actions">
                <button className="ad-btn ad-btn-ghost"><AdminIcon name="edit" size={14}/> Edit details</button>
                <button className="ad-btn ad-btn-ghost">Decline</button>
                <div style={{ flex: 1 }}/>
                {selected.status === 'pending' ? (
                  <button className="ad-btn ad-btn-primary" style={{ padding: '12px 22px' }} onClick={handleConfirm}>
                    <AdminIcon name="check" size={14}/> Confirm &amp; add to Calendar →
                  </button>
                ) : (
                  <span className="ad-pill success" style={{ padding: '10px 16px' }}>
                    <AdminIcon name="check" size={14}/> Confirmed
                  </span>
                )}
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--taupe)', fontSize: 14 }}>
              Select a booking to review
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
