import Link from 'next/link';
import SalonIcon from './SalonIcon';
import type { Service } from '@/lib/types';

export default function ServicesPreview({ services }: { services: Service[] }) {
  const featured = services.slice(0, 4);
  return (
    <section className="lm-section">
      <div className="lm-container">
        <span className="lm-eyebrow">Our Services</span>
        <h2 className="lm-section-title">Considered care, top to toe.</h2>
        <p className="lm-section-lead">A short list of what we do every day. Full menu and pricing on the services page.</p>
        <div className="lm-services-grid">
          {featured.map(s => (
            <div key={s._id} className="lm-service-card">
              <div className="lm-service-icon"><SalonIcon name={s.icon} size={22}/></div>
              <h3 className="lm-service-name">{s.name}</h3>
              <div className="lm-service-meta">{s.duration.toUpperCase()}</div>
              <p className="lm-service-desc">{s.desc.slice(0, 90)}…</p>
              <div className="lm-service-price">{s.price}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <Link href="/services" className="lm-btn lm-btn-ghost">
            View full menu <SalonIcon name="arrowRight" size={16}/>
          </Link>
        </div>
      </div>
    </section>
  );
}
