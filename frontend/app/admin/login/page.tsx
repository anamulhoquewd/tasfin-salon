'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { authApi } from '@/lib/api';
import { setAuth } from '@/lib/auth';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError('');
    try {
      const res = await authApi.login(data.email, data.password);
      setAuth(res.data.token, res.data.user);
      router.push('/admin');
    } catch {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: 'white', border: '1px solid var(--hairline)', borderRadius: 12, padding: 48, width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Image src="/assets/logo/tasfin-wordmark-black.png" alt="TASFIN" width={140} height={32} style={{ height: 32, width: 'auto', margin: '0 auto 20px' }}/>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, margin: 0 }}>Admin panel</h1>
          <p style={{ fontSize: 14, color: 'var(--taupe)', margin: '8px 0 0' }}>Sign in to manage the salon</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="ad-field">
            <label>Email</label>
            <input className="ad-input" type="email" placeholder="admin@tasfin.com.bd" {...register('email')}/>
            {errors.email && <span style={{ fontSize: 12, color: 'var(--danger)' }}>{errors.email.message}</span>}
          </div>
          <div className="ad-field">
            <label>Password</label>
            <input className="ad-input" type="password" placeholder="••••••••" {...register('password')}/>
            {errors.password && <span style={{ fontSize: 12, color: 'var(--danger)' }}>{errors.password.message}</span>}
          </div>
          {error && (
            <div style={{ background: 'rgba(181,80,60,0.08)', border: '1px solid rgba(181,80,60,0.2)', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: 'var(--danger)', marginBottom: 16 }}>
              {error}
            </div>
          )}
          <button type="submit" className="ad-btn ad-btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 13, fontSize: 14 }} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
