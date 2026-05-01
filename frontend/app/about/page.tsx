'use client';

import { useEffect, useState } from 'react';
import Nav from '@/components/website/Nav';
import Footer from '@/components/website/Footer';
import WhatsAppFAB from '@/components/website/WhatsAppFAB';
import SalonIcon from '@/components/website/SalonIcon';
import FAQ from '@/components/website/FAQ';
import { defaultSettings, defaultFaq } from '@/lib/defaults';
import { api } from '@/lib/api';
import type { Settings, FaqItem } from '@/lib/types';

export default function AboutPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [faq, setFaq] = useState<FaqItem[]>(defaultFaq);

  useEffect(() => {
    api.get('/settings').then(r => setSettings(r.data)).catch(() => {});
    api.get('/faq').then(r => setFaq(r.data)).catch(() => {});
  }, []);

  const whatsappNum = settings.whatsapp.replace(/\D/g, '');

  return (
    <>
      <Nav/>
      <main>
        <section className="lm-about-hero">
          <span className="lm-eyebrow">About {settings.hero.salonName}</span>
          <h1>A small studio in Gulshan,<br/>run by senior stylists who take their time.</h1>
          <p>&ldquo;Walk in tired, walk out yourself.&rdquo;</p>
        </section>

        <div className="lm-about-grid">
          <div className="lm-about-image"/>
          <div className="lm-about-body">
            <p>TASFIN opened in 2024 as a quiet alternative to the rush of high-street beauty in Dhaka. The chairs are full but never overbooked. The bridal trials are unhurried. The skincare consultations are honest about what your skin can do in two weeks versus two months.</p>
            <p>Our team is six full-time artists with backgrounds in hair, skin, and bridal — most of us have trained in Mumbai, London, or Bangkok. We use cosmeceutical-grade skincare and professional-grade hair color, and we tell you exactly what we&apos;re putting on your face.</p>
            <p>We&apos;re open Sunday through Saturday. Bridal slots are limited; the rest of the menu is a WhatsApp message away.</p>
          </div>
        </div>

        <section style={{ padding: '80px 24px', background: 'var(--cream-soft)' }}>
          <div className="lm-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
              <div>
                <span className="lm-eyebrow">Find us</span>
                <h2 className="lm-section-title" style={{ marginTop: 12 }}>Gulshan 2, Dhaka.</h2>
                <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <SalonIcon name="mapPin" size={22} stroke={1.5}/>
                    <div><div style={{ fontSize: 14, fontWeight: 600 }}>Address</div><div style={{ fontSize: 14, color: 'var(--taupe)' }}>{settings.address}</div></div>
                  </div>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <SalonIcon name="phone" size={22} stroke={1.5}/>
                    <div><div style={{ fontSize: 14, fontWeight: 600 }}>Phone</div><div style={{ fontSize: 14, color: 'var(--taupe)' }}>{settings.phone}</div></div>
                  </div>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <SalonIcon name="mail" size={22} stroke={1.5}/>
                    <div><div style={{ fontSize: 14, fontWeight: 600 }}>Email</div><div style={{ fontSize: 14, color: 'var(--taupe)' }}>{settings.email}</div></div>
                  </div>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <SalonIcon name="clock" size={22} stroke={1.5}/>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>Hours</div>
                      {settings.hours.map(h => (
                        <div key={h.day} style={{ fontSize: 14, color: 'var(--taupe)' }}>{h.day} · {h.time}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a className="lm-btn lm-btn-wa" href={`https://wa.me/${whatsappNum}`} target="_blank" rel="noopener noreferrer">
                    <SalonIcon name="whatsapp" size={16}/> Message us
                  </a>
                  <a className="lm-btn lm-btn-ghost" href={`tel:${settings.phone}`}>
                    <SalonIcon name="phone" size={16}/> Call
                  </a>
                </div>
              </div>
              <div className="lm-map">
                <div style={{ color: 'var(--gold-deep)' }}><SalonIcon name="mapPin" size={40} stroke={2}/></div>
              </div>
            </div>
          </div>
        </section>

        <section className="lm-section">
          <div className="lm-narrow">
            <span className="lm-eyebrow">FAQ</span>
            <h2 className="lm-section-title" style={{ marginBottom: 32 }}>Common questions.</h2>
            <FAQ items={faq}/>
          </div>
        </section>
      </main>
      <Footer settings={settings}/>
      <WhatsAppFAB settings={settings}/>
    </>
  );
}
