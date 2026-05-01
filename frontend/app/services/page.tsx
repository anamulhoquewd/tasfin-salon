'use client';

import { useState, useEffect } from 'react';
import Nav from '@/components/website/Nav';
import Footer from '@/components/website/Footer';
import WhatsAppFAB from '@/components/website/WhatsAppFAB';
import SalonIcon from '@/components/website/SalonIcon';
import { defaultSettings, defaultServices } from '@/lib/defaults';
import { api } from '@/lib/api';
import type { Service, Settings } from '@/lib/types';

export default function ServicesPage() {
  const [filter, setFilter] = useState('All');
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    api.get('/services').then(r => setServices(r.data)).catch(() => {});
    api.get('/settings').then(r => setSettings(r.data)).catch(() => {});
  }, []);

  const cats = ['All', ...Array.from(new Set(services.map(s => s.category)))];
  const items = filter === 'All' ? services : services.filter(s => s.category === filter);
  const whatsappNum = settings.whatsapp.replace(/\D/g, '');

  return (
    <>
      <Nav/>
      <main>
        <section className="lm-section-tight" style={{ paddingBottom: 24 }}>
          <div className="lm-narrow" style={{ textAlign: 'center' }}>
            <span className="lm-eyebrow">All Services</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 64, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, margin: '12px 0 20px' }}>
              What we do every day.
            </h1>
            <p className="lm-section-lead" style={{ margin: '0 auto' }}>
              Pricing is final, no service charges. Bridal and color services include a complimentary follow-up.
            </p>
          </div>
        </section>
        <section style={{ padding: '0 24px 120px' }}>
          <div className="lm-container">
            <div className="lm-portfolio-filters" style={{ justifyContent: 'center', marginBottom: 16 }}>
              {cats.map(c => (
                <button key={c} className={'lm-chip' + (filter === c ? ' active' : '')} onClick={() => setFilter(c)}>{c}</button>
              ))}
            </div>
            <div className="lm-services-list">
              {items.map(s => (
                <div key={s._id} className="lm-service-row">
                  <div className="lm-service-row-icon"><SalonIcon name={s.icon} size={24}/></div>
                  <div className="lm-service-row-content">
                    <h3 className="lm-service-row-name">{s.name}</h3>
                    <div className="lm-service-row-meta">{s.category} · {s.duration}</div>
                    <p className="lm-service-row-desc">{s.desc}</p>
                  </div>
                  <div className="lm-service-row-aside">
                    <div className="lm-service-row-price">{s.price}</div>
                    <a className="lm-btn lm-btn-wa" style={{ padding: '10px 18px', fontSize: 13 }}
                      href={`https://wa.me/${whatsappNum}?text=Hi%2C%20I'd%20like%20to%20book%20${encodeURIComponent(s.name)}`}
                      target="_blank" rel="noopener noreferrer">
                      <SalonIcon name="whatsapp" size={14}/> Book
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings}/>
      <WhatsAppFAB settings={settings}/>
    </>
  );
}
