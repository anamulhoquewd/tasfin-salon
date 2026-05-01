'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import AdminShell from '@/components/admin/AdminShell';
import { dashboardApi } from '@/lib/api';
import type { DashboardStats, ChartDataPoint, Booking } from '@/lib/types';

const statusPill = (status: string) => {
  const cls = status === 'confirmed' ? 'success' : status === 'pending' ? 'warn' : 'muted';
  return <span className={'ad-pill ' + cls}>{status}</span>;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chart, setChart] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([dashboardApi.stats(), dashboardApi.chart(30)])
      .then(([s, c]) => {
        setStats(s.data);
        setChart(c.data.map((d: ChartDataPoint) => ({
          ...d,
          date: new Date(d.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
        })));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const delta = stats?.bookingsDelta ?? 0;

  return (
    <AdminShell title="Dashboard" pendingCount={stats?.pendingCount ?? 0}>
      <div className="ad-stats">
        <div className="ad-stat">
          <div className="ad-stat-label">Bookings · 7d</div>
          <div className="ad-stat-value">{loading ? '–' : stats?.bookings7d ?? 0}</div>
          <div className={'ad-stat-delta' + (delta < 0 ? ' down' : '')}>
            {delta >= 0 ? '↑' : '↓'} {Math.abs(delta)}% vs prev week
          </div>
        </div>
        <div className="ad-stat">
          <div className="ad-stat-label">WhatsApp bookings · 7d</div>
          <div className="ad-stat-value">{loading ? '–' : stats?.whatsappClicks ?? 0}</div>
          <div className="ad-stat-delta">via WhatsApp channel</div>
        </div>
        <div className="ad-stat">
          <div className="ad-stat-label">Pending confirm</div>
          <div className="ad-stat-value">{loading ? '–' : stats?.pendingCount ?? 0}</div>
          <div className="ad-stat-delta" style={{ color: 'var(--warning)' }}>awaiting your action</div>
        </div>
        <div className="ad-stat">
          <div className="ad-stat-label">Total bookings · 30d</div>
          <div className="ad-stat-value">{loading ? '–' : chart.reduce((a, d) => a + d.total, 0)}</div>
          <div className="ad-stat-delta">all channels</div>
        </div>
      </div>

      <div className="ad-card" style={{ marginBottom: 24 }}>
        <div className="ad-card-head">
          <div>
            <h2>Bookings over time</h2>
            <div className="ad-card-desc">Daily confirmed and pending bookings for the past 30 days.</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chart} margin={{ top: 5, right: 24, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(43,31,26,0.06)"/>
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#A89A91' }} tickLine={false} axisLine={false}
              interval={Math.floor(chart.length / 8)}/>
            <YAxis tick={{ fontSize: 11, fill: '#A89A91' }} tickLine={false} axisLine={false}/>
            <Tooltip
              contentStyle={{ background: 'white', border: '1px solid rgba(43,31,26,0.1)', borderRadius: 8, fontSize: 13 }}
              labelStyle={{ fontWeight: 600, color: '#2B1F1A', marginBottom: 4 }}/>
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }}/>
            <Line type="monotone" dataKey="confirmed" stroke="#B89668" strokeWidth={2} dot={false} name="Confirmed"/>
            <Line type="monotone" dataKey="pending" stroke="#C68A3B" strokeWidth={2} dot={false} strokeDasharray="4 4" name="Pending"/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="ad-card">
        <div className="ad-card-head">
          <div><h2>Recent bookings</h2><div className="ad-card-desc">Pulled in via WhatsApp + form submissions.</div></div>
        </div>
        <table className="ad-table">
          <thead>
            <tr><th>Client</th><th>Service</th><th>When</th><th>Channel</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {(stats?.recentBookings ?? []).map((b: Booking) => (
              <tr key={b._id}>
                <td>{b.clientName}</td>
                <td>{b.service}</td>
                <td>
                  <div style={{ fontWeight: 600 }}>{b.date}</div>
                  <div style={{ fontSize: 12, color: 'var(--taupe)' }}>{b.time}</div>
                </td>
                <td>
                  <span className={'ad-pill ' + (b.channel === 'WhatsApp' ? 'wa' : 'muted')}>{b.channel}</span>
                </td>
                <td>{statusPill(b.status)}</td>
                <td className="ad-td-actions">
                  <a href="/admin/inbox" className="ad-btn ad-btn-ghost ad-btn-sm">Open</a>
                </td>
              </tr>
            ))}
            {!loading && (stats?.recentBookings?.length ?? 0) === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--taupe)', padding: '32px 0' }}>No bookings yet. Run the seed script to add sample data.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
