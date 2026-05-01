import Image from 'next/image';
import type { Testimonial } from '@/lib/types';

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="lm-section lm-testimonials">
      <div className="lm-container">
        <span className="lm-eyebrow">Reviews</span>
        <h2 className="lm-section-title">In their own words.</h2>
        <div className="lm-divider-row">
          <Image src="/assets/icons/divider.svg" alt="" width={200} height={20}/>
        </div>
        <div className="lm-testimonials-grid">
          {testimonials.map(t => (
            <div key={t._id} className="lm-testimonial">
              <div className="lm-testimonial-stars">★ ★ ★ ★ ★</div>
              <p className="lm-testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="lm-testimonial-author">
                <div className="lm-testimonial-avatar"/>
                <div>
                  <div className="lm-testimonial-name">{t.name}</div>
                  <div className="lm-testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
