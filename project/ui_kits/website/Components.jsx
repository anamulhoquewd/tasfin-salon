const { useState, useEffect, useRef } = React;

// ───────── Nav
const Nav = ({ page, setPage }) => {
  const links = [
    { id: 'home',     label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio',label: 'Portfolio' },
    { id: 'about',    label: 'About' },
  ];
  return (
    <nav className="lm-nav">
      <div className="lm-nav-inner">
        <a className="lm-nav-logo" onClick={() => setPage('home')} style={{cursor:'pointer'}}>
          <img src="../../assets/logo/tasfin-wordmark-black.png" alt="TASFIN"/>
        </a>
        <div className="lm-nav-links">
          {links.map(l => (
            <a key={l.id} onClick={() => setPage(l.id)}
               className={'lm-nav-link' + (page === l.id ? ' active' : '')}
               style={{cursor:'pointer'}}>
              {l.label}
            </a>
          ))}
          <a className="lm-btn lm-btn-primary" style={{padding:'10px 20px'}} onClick={() => setPage('about')}>
            <Icon name="calendar" size={16}/> Book now
          </a>
        </div>
      </div>
    </nav>
  );
};

// ───────── Hero
const Hero = ({ setPage }) => {
  const [loops, setLoops] = useState(0);
  const maxLoops = SALON.reel.maxLoops;
  return (
    <section className="lm-hero" data-screen-label="Home Hero">
      <div className="lm-hero-bg"></div>
      <div className="lm-hero-content">
        <div>
          <div className="lm-hero-eyebrow">Dhaka · Est. 2024</div>
          <h1 className="lm-hero-title">{SALON.name}</h1>
          <p className="lm-hero-slogan">{SALON.slogan}</p>
          <div className="lm-hero-ctas">
            <a className="lm-btn lm-btn-gold" onClick={() => setPage('about')}>
              <Icon name="calendar" size={16}/> Book appointment
            </a>
            <a className="lm-btn lm-btn-wa" href={`https://wa.me/${SALON.whatsapp.replace(/\D/g,'')}`}>
              <Icon name="whatsapp" size={16}/> WhatsApp now
            </a>
          </div>
        </div>
        <div className="lm-hero-reel">
          <div className="lm-hero-reel-placeholder">
            <Icon name="play" size={36}/>
            <div style={{fontFamily:'var(--font-serif)', fontStyle:'italic', fontSize:13, opacity:0.7}}>Reel · {loops}/{maxLoops} loops</div>
            <button className="lm-btn-text" style={{color:'var(--champagne)', fontSize:11, letterSpacing:'0.16em', textTransform:'uppercase', borderColor:'var(--champagne)'}}
                    onClick={() => setLoops(Math.min(loops + 1, maxLoops))}>
              Replay
            </button>
          </div>
          <div className="lm-hero-reel-loops">{loops}/{maxLoops} ▸ admin set</div>
        </div>
      </div>
    </section>
  );
};

// ───────── Intro
const Intro = () => (
  <section className="lm-section lm-intro" data-screen-label="Intro">
    <div className="lm-container">
      <div className="lm-intro-grid">
        <div className="lm-intro-image">portrait of the studio</div>
        <div className="lm-intro-body">
          <span className="lm-eyebrow">Why TASFIN</span>
          <h2 className="lm-section-title">Slow, careful, and always on time.</h2>
          <p>{SALON.intro}</p>
          <p>Senior stylists with at least five years on the chair. Skin services with cosmeceutical-grade products. Bridal trials that don't get rushed.</p>
        </div>
      </div>
    </div>
  </section>
);

// ───────── Services preview
const ServicesPreview = ({ setPage }) => {
  const featured = SALON.services.slice(0, 4);
  return (
    <section className="lm-section" data-screen-label="Services Preview">
      <div className="lm-container">
        <span className="lm-eyebrow">Our Services</span>
        <h2 className="lm-section-title">Considered care, top to toe.</h2>
        <p className="lm-section-lead">A short list of what we do every day. Full menu and pricing on the services page.</p>
        <div className="lm-services-grid">
          {featured.map(s => (
            <div key={s.id} className="lm-service-card">
              <div className="lm-service-icon"><Icon name={s.icon} size={22}/></div>
              <h3 className="lm-service-name">{s.name}</h3>
              <div className="lm-service-meta">{s.duration.toUpperCase()}</div>
              <p className="lm-service-desc">{s.desc.slice(0, 90)}…</p>
              <div className="lm-service-price">{s.price}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:48, textAlign:'center'}}>
          <a className="lm-btn lm-btn-ghost" onClick={() => setPage('services')}>
            View full menu <Icon name="arrowRight" size={16}/>
          </a>
        </div>
      </div>
    </section>
  );
};

// ───────── Portfolio
const PortfolioGrid = ({ teaser = false, setPage }) => {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const cats = ['All', 'Bridal', 'Hair', 'Facial', 'Nail'];
  const items = teaser ? SALON.portfolio.slice(0, 6) :
    (filter === 'All' ? SALON.portfolio : SALON.portfolio.filter(p => p.category === filter));

  return (
    <section className="lm-section" data-screen-label={teaser ? "Portfolio Teaser" : "Portfolio"}>
      <div className="lm-container">
        <span className="lm-eyebrow">Portfolio</span>
        <h2 className="lm-section-title">{teaser ? "Recent work" : "Every face is its own brief."}</h2>
        {!teaser && (
          <p className="lm-section-lead">A selection of bridal, hair, skin, and nail work from the last twelve months. Tap any image to see it larger.</p>
        )}
        {!teaser && (
          <div className="lm-portfolio-filters">
            {cats.map(c => (
              <button key={c} className={'lm-chip' + (filter === c ? ' active' : '')} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>
        )}
        <div className="lm-portfolio-grid" style={teaser ? {gridTemplateColumns:'repeat(6, 1fr)'} : {}}>
          {items.map(p => (
            <div key={p.id} className="lm-portfolio-item" onClick={() => setLightbox(p)}>
              <div className={`lm-portfolio-bg tone-${p.tone}`}></div>
              {!teaser && <div className="lm-portfolio-label">{p.category}</div>}
            </div>
          ))}
        </div>
        {teaser && (
          <div style={{marginTop:32, textAlign:'center'}}>
            <a className="lm-btn lm-btn-ghost" onClick={() => setPage('portfolio')}>See full portfolio <Icon name="arrowRight" size={16}/></a>
          </div>
        )}
      </div>
      {lightbox && (
        <div className="lm-lightbox" onClick={() => setLightbox(null)}>
          <div className="lm-lightbox-frame" style={{}}>
            <div className={`lm-portfolio-bg tone-${lightbox.tone}`} style={{position:'absolute',inset:0,borderRadius:12}}></div>
            <button className="lm-lightbox-close" onClick={() => setLightbox(null)}><Icon name="x" size={24}/></button>
          </div>
        </div>
      )}
    </section>
  );
};

// ───────── Testimonials
const Testimonials = () => (
  <section className="lm-section lm-testimonials" data-screen-label="Testimonials">
    <div className="lm-container">
      <span className="lm-eyebrow">Reviews</span>
      <h2 className="lm-section-title">In their own words.</h2>
      <div className="lm-divider-row"><img src="../../assets/icons/divider.svg" alt="" width="200"/></div>
      <div className="lm-testimonials-grid">
        {SALON.testimonials.map(t => (
          <div key={t.id} className="lm-testimonial">
            <div className="lm-testimonial-stars">★ ★ ★ ★ ★</div>
            <p className="lm-testimonial-quote">"{t.quote}"</p>
            <div className="lm-testimonial-author">
              <div className="lm-testimonial-avatar"></div>
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

// ───────── Contact CTA
const ContactCTA = () => (
  <section className="lm-section lm-contact-cta" data-screen-label="Contact CTA">
    <div className="lm-container">
      <div className="lm-contact-cta-grid">
        <div>
          <span className="lm-eyebrow" style={{color:'var(--champagne)'}}>Visit us</span>
          <h2>Booking is a message away.</h2>
          <p style={{fontFamily:'var(--font-serif)', fontStyle:'italic', fontSize:20, lineHeight:1.5, color:'rgba(250,246,241,0.75)', maxWidth:480}}>
            We usually reply within an hour. For bridal enquiries, attach a photo of the saree or lehenga and we'll prepare a tailored quote.
          </p>
          <div style={{display:'flex', gap:12, marginTop:32, flexWrap:'wrap'}}>
            <a className="lm-btn lm-btn-wa" href={`https://wa.me/${SALON.whatsapp.replace(/\D/g,'')}`}>
              <Icon name="whatsapp" size={16}/> WhatsApp us
            </a>
            <a className="lm-btn lm-btn-ghost" style={{color:'var(--cream)', borderColor:'var(--champagne)'}} href={`tel:${SALON.phone}`}>
              <Icon name="phone" size={16}/> {SALON.phone}
            </a>
          </div>
        </div>
        <div className="lm-contact-cta-info">
          <div className="lm-contact-row">
            <div className="lm-contact-icon"><Icon name="mapPin" size={18}/></div>
            <div><div className="lm-contact-label">Studio</div><div className="lm-contact-value">{SALON.address}</div></div>
          </div>
          <div className="lm-contact-row">
            <div className="lm-contact-icon"><Icon name="clock" size={18}/></div>
            <div>
              <div className="lm-contact-label">Hours</div>
              {SALON.hours.map(h => (
                <div key={h.day} className="lm-contact-value" style={{fontSize:14}}>{h.day} — {h.time}</div>
              ))}
            </div>
          </div>
          <div className="lm-contact-row">
            <div className="lm-contact-icon"><Icon name="mail" size={18}/></div>
            <div><div className="lm-contact-label">Email</div><div className="lm-contact-value">{SALON.email}</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ───────── Footer
const Footer = ({ setPage }) => (
  <footer className="lm-footer">
    <div className="lm-footer-inner">
      <div>
        <img src="../../assets/logo/tasfin-wordmark-white.png" alt="TASFIN" style={{height:28, marginBottom:16}}/>
        <p style={{fontSize:14, color:'var(--taupe)', maxWidth:300, lineHeight:1.6}}>{SALON.intro.slice(0, 120)}…</p>
      </div>
      <div>
        <h4>Visit</h4>
        <ul>
          <li>{SALON.address}</li>
          <li>{SALON.phone}</li>
          <li>{SALON.email}</li>
        </ul>
      </div>
      <div>
        <h4>Pages</h4>
        <ul>
          <li><a onClick={()=>setPage('home')} style={{cursor:'pointer'}}>Home</a></li>
          <li><a onClick={()=>setPage('services')} style={{cursor:'pointer'}}>Services</a></li>
          <li><a onClick={()=>setPage('portfolio')} style={{cursor:'pointer'}}>Portfolio</a></li>
          <li><a onClick={()=>setPage('about')} style={{cursor:'pointer'}}>About & Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Follow</h4>
        <ul>
          <li><a href={SALON.facebook}>Facebook</a></li>
          <li><a href={SALON.instagram}>Instagram</a></li>
          <li><a href={`https://wa.me/${SALON.whatsapp.replace(/\D/g,'')}`}>WhatsApp</a></li>
        </ul>
      </div>
    </div>
    <div className="lm-footer-meta">
      <div>© 2026 TASFIN. All rights reserved.</div>
      <div>Made in Dhaka.</div>
    </div>
  </footer>
);

// ───────── WhatsApp FAB
const WhatsAppFAB = () => (
  <a className="lm-fab" href={`https://wa.me/${SALON.whatsapp.replace(/\D/g,'')}`}>
    <Icon name="whatsapp" size={20}/> Chat on WhatsApp
  </a>
);

Object.assign(window, { Nav, Hero, Intro, ServicesPreview, PortfolioGrid, Testimonials, ContactCTA, Footer, WhatsAppFAB });
