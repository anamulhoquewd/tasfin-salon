'use client';

import AdminShell from '@/components/admin/AdminShell';

export default function SettingsPage() {
  return (
    <AdminShell title="Settings">
      <div className="ad-card">
        <h2>Settings</h2>
        <div className="ad-card-desc">System settings — same patterns as the other editors.</div>
        <div style={{ padding: '32px 0', color: 'var(--taupe)', fontSize: 14 }}>
          Advanced system settings will appear here. Use the sidebar pages for content, contact info, and other configuration.
        </div>
      </div>
    </AdminShell>
  );
}
