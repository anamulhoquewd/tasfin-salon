const { useState: useStateP } = React;

// ───────── Services page
const ServicesPage = () => {
  const [filter, setFilter] = useStateP('All');
  const cats = ['All', ...new Set(SALON.services.map(s => s.category))];
  const items = filter === 'All' ? SALON.services : SALON.services.filter(s => s.category === filter);
  return (
    <main data-screen-label="Services Page">
      <section className="lm-section-tight" style={{paddingBottom:24}}>
        <div className="lm-narrow" style={{textAlign:'center'}}>
          <span className="lm-eyebrow">All Services</span>
          <h1 style={{fontFamily:'var(--font-display)', fontSize:64, fontWeight:500, letterSpacing:'-0.02em', lineHeight:1.05, margin:'12px 0 20px'}}>
            What we do every day.
          </h1>
          <p className="lm-section-lead" style={{margin:'0 auto'}}>
            Pricing is final, no service charges. Bridal and color services include a complimentary follow-up.
          </p>
        </div>
      </section>
      <section style={{padding:'0 24px 120px'}}>
        <div className="lm-container">
          <div className="lm-portfolio-filters" style={{justifyContent:'center', marginBottom:16}}>
            {cats.map(c => (
              <button key={c} className={'lm-chip' + (filter === c ? ' active' : '')} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>
          <div className="lm-services-list">
            {items.map(s => (
              <div key={s.id} className="lm-service-row">
                <div className="lm-service-row-icon"><Icon name={s.icon} size={24}/></div>
                <div className="lm-service-row-content">
                  <h3 className="lm-service-row-name">{s.name}</h3>
                  <div className="lm-service-row-meta">{s.category} · {s.duration}</div>
                  <p className="lm-service-row-desc">{s.desc}</p>
                </div>
                <div className="lm-service-row-aside">
                  <div className="lm-service-row-price">{s.price}</div>
                  <a className="lm-btn lm-btn-wa" style={{padding:'10px 18px', fontSize:13}} href={`https://wa.me/${SALON.whatsapp.replace(/\D/g,'')}?text=Hi%2C%20I'd%20like%20to%20book%20${encodeURIComponent(s.name)}`}>
                    <Icon name="whatsapp" size={14}/> Book
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

// ───────── About + contact page
const AboutPage = () => (
  <main data-screen-label="About & Contact Page">
    <section className="lm-about-hero">
      <span className="lm-eyebrow">About TASFIN</span>
      <h1>A small studio in Gulshan,<br/>run by senior stylists who take their time.</h1>
      <p>"Walk in tired, walk out yourself."</p>
    </section>
    <div className="lm-about-grid">
      <div className="lm-about-image"></div>
      <div className="lm-about-body">
        <p>TASFIN opened in 2024 as a quiet alternative to the rush of high-street beauty in Dhaka. The chairs are full but never overbooked. The bridal trials are unhurried. The skincare consultations are honest about what your skin can do in two weeks versus two months.</p>
        <p>Our team is six full-time artists with backgrounds in hair, skin, and bridal — most of us have trained in Mumbai, London, or Bangkok. We use cosmeceutical-grade skincare and professional-grade hair color, and we tell you exactly what we're putting on your face.</p>
        <p>We're open Sunday through Saturday. Bridal slots are limited; the rest of the menu is a WhatsApp message away.</p>
      </div>
    </div>
    <section style={{padding:'80px 24px', background:'var(--cream-soft)'}}>
      <div className="lm-container">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64}}>
          <div>
            <span className="lm-eyebrow">Find us</span>
            <h2 className="lm-section-title" style={{marginTop:12}}>Gulshan 2, Dhaka.</h2>
            <div style={{display:'grid', gap:16, marginTop:24}}>
              <div style={{display:'flex', gap:16, alignItems:'flex-start'}}>
                <Icon name="mapPin" size={22} stroke={1.5}/>
                <div><div style={{fontSize:14, fontWeight:600}}>Address</div><div style={{fontSize:14, color:'var(--taupe)'}}>{SALON.address}</div></div>
              </div>
              <div style={{display:'flex', gap:16, alignItems:'flex-start'}}>
                <Icon name="phone" size={22} stroke={1.5}/>
                <div><div style={{fontSize:14, fontWeight:600}}>Phone</div><div style={{fontSize:14, color:'var(--taupe)'}}>{SALON.phone}</div></div>
              </div>
              <div style={{display:'flex', gap:16, alignItems:'flex-start'}}>
                <Icon name="mail" size={22} stroke={1.5}/>
                <div><div style={{fontSize:14, fontWeight:600}}>Email</div><div style={{fontSize:14, color:'var(--taupe)'}}>{SALON.email}</div></div>
              </div>
              <div style={{display:'flex', gap:16, alignItems:'flex-start'}}>
                <Icon name="clock" size={22} stroke={1.5}/>
                <div>
                  <div style={{fontSize:14, fontWeight:600}}>Hours</div>
                  {SALON.hours.map(h => <div key={h.day} style={{fontSize:14, color:'var(--taupe)'}}>{h.day} · {h.time}</div>)}
                </div>
              </div>
            </div>
            <div style={{marginTop:32, display:'flex', gap:12, flexWrap:'wrap'}}>
              <a className="lm-btn lm-btn-wa" href={`https://wa.me/${SALON.whatsapp.replace(/\D/g,'')}`}><Icon name="whatsapp" size={16}/> Message us</a>
              <a className="lm-btn lm-btn-ghost" href={`tel:${SALON.phone}`}><Icon name="phone" size={16}/> Call</a>
            </div>
          </div>
          <div className="lm-map">
            <div className="lm-map-pin"><Icon name="mapPin" size={40} stroke={2}/></div>
          </div>
        </div>
      </div>
    </section>
    <section className="lm-section">
      <div className="lm-narrow">
        <span className="lm-eyebrow">FAQ</span>
        <h2 className="lm-section-title" style={{marginBottom:32}}>Common questions.</h2>
        <FAQ/>
      </div>
    </section>
  </main>
);

const FAQ = () => {
  const [open, setOpen] = useStateP(0);
  return (
    <div className="lm-faq">
      {SALON.faq.map((f, i) => (
        <div key={i} className="lm-faq-item">
          <div className="lm-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
            {f.q}
            <Icon name="chevronDown" size={20} stroke={1.5}/>
          </div>
          {open === i && <div className="lm-faq-a">{f.a}</div>}
        </div>
      ))}
    </div>
  );
};

Object.assign(window, { ServicesPage, AboutPage });
