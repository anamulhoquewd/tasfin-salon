const { useState: useStateAd } = React;

// Reuse Icon set — small admin variant (subset)
const AIcon = ({ name, size = 18, stroke = 1.5 }) => {
  const paths = {
    home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    fileText: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>,
    video: <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>,
    help: <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></>,
    upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>,
    play: <polygon points="6 4 20 12 6 20 6 4"/>,
    chevronRight: <polyline points="9 18 15 12 9 6"/>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    inbox: <><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></>,
  };
  const fillIcons = ['play', 'star'];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill={fillIcons.includes(name) ? 'currentColor' : 'none'}
      stroke={fillIcons.includes(name) ? 'none' : 'currentColor'}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

const AdminShell = ({ page, setPage, children, title }) => {
  const sections = [
    { group: 'Overview', items: [
      { id: 'dashboard', icon: 'home', label: 'Dashboard' },
      { id: 'inbox',     icon: 'inbox', label: 'Booking inbox', badge: 3 },
      { id: 'calendar',  icon: 'calendar', label: 'Calendar' },
    ]},
    { group: 'Content', items: [
      { id: 'frontpage',   icon: 'fileText', label: 'Frontpage' },
      { id: 'services',    icon: 'layers',   label: 'Services' },
      { id: 'portfolio',   icon: 'image',    label: 'Portfolio' },
      { id: 'testimonials',icon: 'star',     label: 'Testimonials' },
      { id: 'faq',         icon: 'help',     label: 'FAQ' },
      { id: 'contact',     icon: 'phone',    label: 'Contact info' },
    ]},
    { group: 'Media', items: [
      { id: 'media',  icon: 'image', label: 'Media library' },
      { id: 'reel',   icon: 'video', label: 'Reel settings' },
    ]},
    { group: 'System', items: [
      { id: 'settings', icon: 'settings', label: 'Settings' },
    ]},
  ];
  return (
    <div className="ad-shell">
      <aside className="ad-sidebar">
        <div className="ad-sidebar-logo"><img src="../../assets/logo/tasfin-wordmark-black.png" alt="TASFIN"/></div>
        {sections.map(s => (
          <React.Fragment key={s.group}>
            <div className="ad-sidebar-section">{s.group}</div>
            {s.items.map(it => (
              <div key={it.id} className={'ad-sidebar-link' + (page === it.id ? ' active' : '')} onClick={() => setPage(it.id)}>
                <AIcon name={it.icon} size={18}/>
                <span style={{flex:1}}>{it.label}</span>
                {it.badge && <span className="ad-sidebar-badge">{it.badge}</span>}
              </div>
            ))}
          </React.Fragment>
        ))}
        <div className="ad-sidebar-foot"><div className="ad-avatar"></div><div><div style={{fontWeight:600}}>Naima R.</div><div style={{fontSize:11, color:'var(--taupe)'}}>Owner</div></div></div>
      </aside>
      <div>
        <div className="ad-topbar">
          <h1>{title}</h1>
          <div className="ad-topbar-actions">
            <input className="ad-search" placeholder="Search..."/>
            <button className="ad-btn ad-btn-ghost"><AIcon name="bell" size={16}/></button>
            <button className="ad-btn ad-btn-primary">View site →</button>
          </div>
        </div>
        <div className="ad-content">{children}</div>
      </div>
    </div>
  );
};

const Dashboard = () => (
  <>
    <div className="ad-stats">
      <div className="ad-stat"><div className="ad-stat-label">Bookings · 7d</div><div className="ad-stat-value">42</div><div className="ad-stat-delta">↑ 12% vs prev</div></div>
      <div className="ad-stat"><div className="ad-stat-label">WhatsApp clicks</div><div className="ad-stat-value">186</div><div className="ad-stat-delta">↑ 8%</div></div>
      <div className="ad-stat"><div className="ad-stat-label">Page views · 7d</div><div className="ad-stat-value">2,418</div><div className="ad-stat-delta down">↓ 3%</div></div>
      <div className="ad-stat"><div className="ad-stat-label">Reel plays</div><div className="ad-stat-value">1,210</div><div className="ad-stat-delta">↑ 22%</div></div>
    </div>
    <div className="ad-card">
      <div className="ad-card-head">
        <div><h2>Recent bookings</h2><div className="ad-card-desc">Pulled in via WhatsApp + form submissions.</div></div>
        <button className="ad-btn ad-btn-ghost">Export CSV</button>
      </div>
      <table className="ad-table">
        <thead><tr><th>Client</th><th>Service</th><th>When</th><th>Channel</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <tr><td>Naima Rahman</td><td>Bridal Makeup</td><td>Sat, 9 May · 11:00</td><td>WhatsApp</td><td><span className="ad-pill success">Confirmed</span></td><td className="ad-td-actions"><button className="ad-btn ad-btn-ghost ad-btn-sm">Open</button></td></tr>
          <tr><td>Tahsin Akter</td><td>Hair Color</td><td>Wed, 6 May · 16:30</td><td>WhatsApp</td><td><span className="ad-pill warn">Pending trial</span></td><td className="ad-td-actions"><button className="ad-btn ad-btn-ghost ad-btn-sm">Open</button></td></tr>
          <tr><td>Sumaiya Khan</td><td>Mani-pedi</td><td>Tue, 5 May · 14:00</td><td>Form</td><td><span className="ad-pill success">Confirmed</span></td><td className="ad-td-actions"><button className="ad-btn ad-btn-ghost ad-btn-sm">Open</button></td></tr>
          <tr><td>Farzana B.</td><td>Signature Facial</td><td>Mon, 4 May · 18:00</td><td>WhatsApp</td><td><span className="ad-pill muted">Walk-in</span></td><td className="ad-td-actions"><button className="ad-btn ad-btn-ghost ad-btn-sm">Open</button></td></tr>
        </tbody>
      </table>
    </div>
  </>
);

const Frontpage = () => (
  <>
    <div className="ad-card">
      <div className="ad-card-head"><div><h2>Hero section</h2><div className="ad-card-desc">The first thing visitors see. Keep it short.</div></div><button className="ad-btn ad-btn-primary">Save changes</button></div>
      <div className="ad-row-2">
        <div className="ad-field"><label>Salon name</label><input className="ad-input" defaultValue="TASFIN"/></div>
        <div className="ad-field"><label>Eyebrow</label><input className="ad-input" defaultValue="Dhaka · Est. 2024"/></div>
      </div>
      <div className="ad-field"><label>Slogan</label><textarea className="ad-textarea" defaultValue="Bridal artistry, considered skincare, and the kind of haircut you actually wanted."/></div>
      <div className="ad-row-2">
        <div className="ad-field"><label>Primary CTA</label><input className="ad-input" defaultValue="Book appointment"/></div>
        <div className="ad-field"><label>Secondary CTA</label><input className="ad-input" defaultValue="WhatsApp now"/></div>
      </div>
    </div>
    <div className="ad-card">
      <div className="ad-card-head"><div><h2>Intro section</h2><div className="ad-card-desc">"Why us" copy below the hero.</div></div></div>
      <div className="ad-field"><label>Title</label><input className="ad-input" defaultValue="Slow, careful, and always on time."/></div>
      <div className="ad-field"><label>Body</label><textarea className="ad-textarea" rows="3" defaultValue="A small studio in Gulshan, run by senior stylists who take their time."/></div>
    </div>
  </>
);

const ServicesEditor = () => (
  <div className="ad-card">
    <div className="ad-card-head"><div><h2>Services</h2><div className="ad-card-desc">Add, edit, and reorder. Visible on the services page.</div></div><button className="ad-btn ad-btn-primary"><AIcon name="plus" size={14}/> Add service</button></div>
    <table className="ad-table">
      <thead><tr><th>Service</th><th>Category</th><th>Duration</th><th>Price</th><th></th></tr></thead>
      <tbody>
        {SALON.services.slice(0, 6).map(s => (
          <tr key={s.id}>
            <td><div style={{fontWeight:600}}>{s.name}</div><div style={{fontSize:12, color:'var(--taupe)'}}>{s.desc.slice(0, 60)}…</div></td>
            <td><span className="ad-pill gold">{s.category}</span></td>
            <td>{s.duration}</td>
            <td style={{fontFamily:'var(--font-display)', fontSize:16}}>{s.price}</td>
            <td className="ad-td-actions"><button className="ad-btn ad-btn-ghost ad-btn-sm"><AIcon name="edit" size={12}/> Edit</button><button className="ad-btn ad-btn-danger ad-btn-sm"><AIcon name="trash" size={12}/></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const MediaLibrary = () => {
  const [tab, setTab] = useStateAd('images');
  return (
    <>
      <div className="ad-tabs">
        <div className={'ad-tab' + (tab === 'images' ? ' active' : '')} onClick={() => setTab('images')}>Images</div>
        <div className={'ad-tab' + (tab === 'videos' ? ' active' : '')} onClick={() => setTab('videos')}>Reels & videos</div>
      </div>
      <div className="ad-card">
        <div className="ad-card-head"><div><h2>Media library</h2><div className="ad-card-desc">Drag in or click to upload. JPG / PNG up to 8 MB · MP4 up to 30 MB.</div></div><button className="ad-btn ad-btn-primary"><AIcon name="upload" size={14}/> Upload</button></div>
        <div className="ad-media-grid">
          <div className="ad-media-upload"><AIcon name="upload" size={24}/><div style={{fontSize:12}}>Upload</div></div>
          {SALON.portfolio.map(p => (
            <div key={p.id} className="ad-media-item">
              <div className={`ad-media-bg tone-${p.tone}`}></div>
              <div className="ad-media-tag">{p.category}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const ReelSettings = () => {
  const [autoplay, setAuto] = useStateAd(true);
  const [loops, setLoops] = useStateAd(2);
  return (
    <div style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:24}}>
      <div className="ad-card">
        <div className="ad-card-head"><div><h2>Homepage reel</h2><div className="ad-card-desc">Controls the auto-playing video on the home hero.</div></div></div>
        <div className="ad-toggle-row">
          <div><div className="ad-toggle-row-label">Auto-play on page load</div><div className="ad-toggle-row-desc">Visitors see the reel start automatically. Always muted.</div></div>
          <div className={'ad-toggle' + (autoplay ? ' on' : '')} onClick={() => setAuto(!autoplay)}></div>
        </div>
        <div className="ad-toggle-row">
          <div><div className="ad-toggle-row-label">Maximum loops</div><div className="ad-toggle-row-desc">Reel stops after this many plays — visitor can manually replay.</div></div>
          <div className="ad-seg">
            {[1, 2, 3].map(n => <button key={n} className={loops === n ? 'active' : ''} onClick={() => setLoops(n)}>{n}×</button>)}
          </div>
        </div>
        <div className="ad-toggle-row">
          <div><div className="ad-toggle-row-label">Reel source</div><div className="ad-toggle-row-desc">salon-reel-v3.mp4 · 14 MB · 18 sec</div></div>
          <button className="ad-btn ad-btn-ghost ad-btn-sm"><AIcon name="upload" size={12}/> Replace</button>
        </div>
      </div>
      <div className="ad-card">
        <div className="ad-card-head"><div><h2>Preview</h2><div className="ad-card-desc">As visitors will see it.</div></div></div>
        <div className="ad-reel-preview">
          <AIcon name="play" size={36}/>
          <div className="ad-reel-loops">0/{loops} loops · {autoplay ? 'auto' : 'manual'}</div>
        </div>
      </div>
    </div>
  );
};

const ContactInfo = () => (
  <div className="ad-card">
    <div className="ad-card-head"><div><h2>Contact information</h2><div className="ad-card-desc">Shown in the footer, contact CTA, and about page.</div></div><button className="ad-btn ad-btn-primary">Save changes</button></div>
    <div className="ad-row-2">
      <div className="ad-field"><label>Phone</label><input className="ad-input" defaultValue="+880 9678 555 200"/></div>
      <div className="ad-field"><label>WhatsApp number</label><input className="ad-input" defaultValue="+880 1711 234 567"/></div>
      <div className="ad-field"><label>Email</label><input className="ad-input" defaultValue="hello@tasfin.com.bd"/></div>
      <div className="ad-field"><label>Facebook URL</label><input className="ad-input" defaultValue="https://facebook.com/tasfin.dhaka"/></div>
    </div>
    <div className="ad-field"><label>Address</label><input className="ad-input" defaultValue="House 42, Road 11, Gulshan 2, Dhaka 1212"/></div>
    <div className="ad-field"><label>Google Maps embed URL</label><input className="ad-input" defaultValue="https://www.google.com/maps/embed?pb=..."/></div>
    <h3 style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:500, margin:'24px 0 8px'}}>Opening hours</h3>
    {SALON.hours.map(h => (
      <div key={h.day} className="ad-row-2" style={{marginBottom:12}}>
        <div className="ad-field" style={{margin:0}}><input className="ad-input" defaultValue={h.day}/></div>
        <div className="ad-field" style={{margin:0}}><input className="ad-input" defaultValue={h.time}/></div>
      </div>
    ))}
  </div>
);

const TestimonialsEditor = () => (
  <div className="ad-card">
    <div className="ad-card-head"><div><h2>Testimonials</h2><div className="ad-card-desc">Client quotes shown on the homepage.</div></div><button className="ad-btn ad-btn-primary"><AIcon name="plus" size={14}/> Add</button></div>
    {SALON.testimonials.map(t => (
      <div key={t.id} style={{padding:'16px 0', borderBottom:'1px solid var(--hairline)', display:'flex', justifyContent:'space-between', gap:24}}>
        <div style={{flex:1}}>
          <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:6}}>
            <div style={{fontWeight:600}}>{t.name}</div>
            <span className="ad-pill muted">{t.role}</span>
          </div>
          <p style={{margin:0, fontFamily:'var(--font-serif)', fontStyle:'italic', fontSize:15, color:'var(--taupe)'}}>"{t.quote}"</p>
        </div>
        <div style={{display:'flex', gap:6, alignItems:'flex-start'}}>
          <button className="ad-btn ad-btn-ghost ad-btn-sm"><AIcon name="edit" size={12}/></button>
          <button className="ad-btn ad-btn-danger ad-btn-sm"><AIcon name="trash" size={12}/></button>
        </div>
      </div>
    ))}
  </div>
);

Object.assign(window, { AdminShell, Dashboard, Frontpage, ServicesEditor, MediaLibrary, ReelSettings, ContactInfo, TestimonialsEditor, AIcon });
