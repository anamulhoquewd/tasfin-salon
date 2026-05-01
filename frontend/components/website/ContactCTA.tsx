import SalonIcon from './SalonIcon';
import type { Settings } from '@/lib/types';

export default function ContactCTA({ settings }: { settings: Settings }) {
  const whatsappNum = settings.whatsapp.replace(/\D/g, '');
  return (
    <section className="lm-section lm-contact-cta">
      <div className="lm-container">
        <div className="lm-contact-cta-grid">
          <div>
            <span className="lm-eyebrow" style={{ color: 'var(--champagne)' }}>Visit us</span>
            <h2>Booking is a message away.</h2>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 20, lineHeight: 1.5, color: 'rgba(250,246,241,0.75)', maxWidth: 480 }}>
              We usually reply within an hour. For bridal enquiries, attach a photo of the saree or lehenga and we&apos;ll prepare a tailored quote.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              <a className="lm-btn lm-btn-wa" href={`https://wa.me/${whatsappNum}`} target="_blank" rel="noopener noreferrer">
                <SalonIcon name="whatsapp" size={16}/> WhatsApp us
              </a>
              <a className="lm-btn lm-btn-ghost" style={{ color: 'var(--cream)', borderColor: 'var(--champagne)' }} href={`tel:${settings.phone}`}>
                <SalonIcon name="phone" size={16}/> {settings.phone}
              </a>
            </div>
          </div>
          <div className="lm-contact-cta-info">
            <div className="lm-contact-row">
              <div className="lm-contact-icon"><SalonIcon name="mapPin" size={18}/></div>
              <div>
                <div className="lm-contact-label">Studio</div>
                <div className="lm-contact-value">{settings.address}</div>
              </div>
            </div>
            <div className="lm-contact-row">
              <div className="lm-contact-icon"><SalonIcon name="clock" size={18}/></div>
              <div>
                <div className="lm-contact-label">Hours</div>
                {settings.hours.map(h => (
                  <div key={h.day} className="lm-contact-value" style={{ fontSize: 14 }}>{h.day} — {h.time}</div>
                ))}
              </div>
            </div>
            <div className="lm-contact-row">
              <div className="lm-contact-icon"><SalonIcon name="mail" size={18}/></div>
              <div>
                <div className="lm-contact-label">Email</div>
                <div className="lm-contact-value">{settings.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
