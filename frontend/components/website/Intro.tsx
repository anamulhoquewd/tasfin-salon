import type { Settings } from '@/lib/types';

export default function Intro({ settings }: { settings: Settings }) {
  return (
    <section className="lm-section lm-intro">
      <div className="lm-container">
        <div className="lm-intro-grid">
          <div className="lm-intro-image">portrait of the studio</div>
          <div className="lm-intro-body">
            <span className="lm-eyebrow">Why {settings.hero.salonName}</span>
            <h2 className="lm-section-title">{settings.intro.title}</h2>
            <p>{settings.intro.body}</p>
            <p>Senior stylists with at least five years on the chair. Skin services with cosmeceutical-grade products. Bridal trials that don&apos;t get rushed.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
