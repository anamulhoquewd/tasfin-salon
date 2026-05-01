'use client';

import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import AdminIcon from '@/components/admin/AdminIcon';
import { usersApi } from '@/lib/api';
import { getUser } from '@/lib/auth';
import type { User } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Min 6 characters'),
  role: z.enum(['admin', 'super_admin']),
});

type FormValues = z.infer<typeof schema>;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const me = getUser();

  const load = () => usersApi.list().then(r => setUsers(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'admin' },
  });

  const onSubmit = async (data: FormValues) => {
    setSaving(true);
    setError('');
    try {
      await usersApi.create(data as Record<string, unknown>);
      reset();
      setShowForm(false);
      load();
    } catch (e: unknown) {
      setError((e as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Failed to create user');
    } finally { setSaving(false); }
  };

  return (
    <AdminShell title="Users">
      {showForm && (
        <div className="ad-cal-drawer-bg" onClick={() => setShowForm(false)}>
          <div className="ad-cal-drawer" onClick={e => e.stopPropagation()} style={{ width: 460 }}>
            <div className="ad-cal-drawer-head">
              <div><div className="ad-eyebrow">User management</div><h2>Add admin</h2></div>
              <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="ad-cal-drawer-body">
                <div className="ad-field">
                  <label>Name</label>
                  <input className="ad-input" {...register('name')}/>
                  {errors.name && <span style={{ fontSize: 12, color: 'var(--danger)' }}>{errors.name.message}</span>}
                </div>
                <div className="ad-field">
                  <label>Email</label>
                  <input className="ad-input" type="email" {...register('email')}/>
                  {errors.email && <span style={{ fontSize: 12, color: 'var(--danger)' }}>{errors.email.message}</span>}
                </div>
                <div className="ad-field">
                  <label>Password</label>
                  <input className="ad-input" type="password" {...register('password')}/>
                  {errors.password && <span style={{ fontSize: 12, color: 'var(--danger)' }}>{errors.password.message}</span>}
                </div>
                <div className="ad-field">
                  <label>Role</label>
                  <select className="ad-select" {...register('role')}>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
                {error && <div style={{ fontSize: 13, color: 'var(--danger)', background: 'rgba(181,80,60,0.08)', padding: '10px 14px', borderRadius: 6 }}>{error}</div>}
              </div>
              <div className="ad-cal-drawer-foot">
                <button type="button" className="ad-btn ad-btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                <div style={{ flex: 1 }}/>
                <button type="submit" className="ad-btn ad-btn-primary" disabled={saving}>{saving ? 'Creating…' : 'Create user'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="ad-card">
        <div className="ad-card-head">
          <div>
            <h2>Admin users</h2>
            <div className="ad-card-desc">Only super admins can add or remove users.</div>
          </div>
          <button className="ad-btn ad-btn-primary" onClick={() => setShowForm(true)}>
            <AdminIcon name="plus" size={14}/> Add admin
          </button>
        </div>
        <table className="ad-table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td style={{ fontWeight: 600 }}>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={'ad-pill ' + (u.role === 'super_admin' ? 'gold' : 'muted')}>
                    {u.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                  </span>
                </td>
                <td className="ad-td-actions">
                  {u.id !== me?.id && (
                    <button className="ad-btn ad-btn-danger ad-btn-sm"
                      onClick={async () => { if (confirm('Delete user?')) { await usersApi.delete(u.id); load(); } }}>
                      <AdminIcon name="trash" size={12}/>
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center', padding: '24px 0', color: 'var(--taupe)' }}>No users found.</td></tr>}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
