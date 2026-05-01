// Inbox — incoming bookings from WhatsApp + Form, parsed and ready to confirm

const Inbox = () => {
  const [tab, setTab] = useStateAd('new'); // new | parsed | confirmed
  const [selected, setSelected] = useStateAd(0);

  // Each item is a raw incoming message + the parsed structured fields
  const incoming = [
    {
      id: 1, channel: 'WhatsApp', when: '2 min ago', status: 'new',
      from: 'Naima Rahman', phone: '+880 1711 234 567', avatarTone: 'blush',
      raw: "Assalamu alaikum! Ami May 9 e bridal makeup korate chai. Time 11 AM. Dhonnobad.",
      parsed: { service: 'Bridal Makeup', date: 'Sat, 9 May', time: '11:00 AM', duration: '3h', confidence: 0.94 },
      suggested: { reply: 'Walaikum assalam Naima Apu! 9 May, 11 AM e Bridal Makeup confirm korte parchi. Trial date er jonno preference ache?' },
    },
    {
      id: 2, channel: 'WhatsApp', when: '14 min ago', status: 'new',
      from: 'Tahsin Akter', phone: '+880 1722 555 401', avatarTone: 'champagne',
      raw: "Hi, hair color appointment chai Wednesday afternoon. Around 4-5 pm hole valo. Balayage, medium length.",
      parsed: { service: 'Hair Color · Balayage', date: 'Wed, 6 May', time: '4:30 PM', duration: '1h 30m', confidence: 0.88 },
      suggested: { reply: 'Hi Tahsin! 6 May Wednesday 4:30 PM e Balayage er jonno slot ache. Confirm korbo?' },
    },
    {
      id: 3, channel: 'Form', when: '32 min ago', status: 'new',
      from: 'Sumaiya Khan', phone: '+880 1733 901 122', avatarTone: 'cream',
      raw: "Form submission · service: Bridal Trial · preferred: Tue 5 May, 12:00 PM · notes: trial before May wedding",
      parsed: { service: 'Bridal Trial', date: 'Tue, 5 May', time: '12:00 PM', duration: '2h', confidence: 1.00 },
      suggested: { reply: 'Hi Sumaiya! Bridal Trial confirmed for Tue 5 May, 12 PM. Apnar wedding date jodi share koren, full day plan kore felbo.' },
    },
    {
      id: 4, channel: 'WhatsApp', when: '1 hr ago', status: 'parsed',
      from: 'Reema K.', phone: '+880 1812 304 776', avatarTone: 'espresso',
      raw: "pedicure korate chai. tomorrow 5pm e free?",
      parsed: { service: 'Pedicure', date: 'Wed, 6 May', time: '5:00 PM', duration: '1h', confidence: 0.79 },
      suggested: { reply: 'Hi Reema Apu! Tomorrow (6 May) 5 PM e pedicure er jonno slot open. Confirm korle hold kore rakhi.' },
    },
    {
      id: 5, channel: 'WhatsApp', when: '3 hr ago', status: 'confirmed',
      from: 'Farzana B.', phone: '+880 1955 660 813', avatarTone: 'blush',
      raw: "signature facial Tuesday 4 pm.",
      parsed: { service: 'Signature Facial', date: 'Tue, 5 May', time: '4:00 PM', duration: '1h', confidence: 0.96 },
      suggested: { reply: '' },
    },
  ];

  const filtered = incoming.filter(i => tab === 'new' ? i.status === 'new' : i.status === tab);
  const item = filtered[selected] || filtered[0];

  return (
    <>
      <div className="ad-inbox-stats">
        <div className="ad-inbox-stat-card">
          <div className="ad-stat-label">New · awaiting confirm</div>
          <div className="ad-stat-value" style={{color:'var(--gold-deep)'}}>{incoming.filter(i => i.status === 'new').length}</div>
          <div style={{fontSize:12, color:'var(--taupe)'}}>Auto-parsed by WhatsApp Business webhook</div>
        </div>
        <div className="ad-inbox-stat-card">
          <div className="ad-stat-label">Parse confidence · avg</div>
          <div className="ad-stat-value">91%</div>
          <div style={{fontSize:12, color:'var(--taupe)'}}>Below 75% goes to manual queue</div>
        </div>
        <div className="ad-inbox-stat-card">
          <div className="ad-stat-label">Today · confirmed</div>
          <div className="ad-stat-value">8</div>
          <div style={{fontSize:12, color:'var(--success)'}}>↑ on Calendar instantly</div>
        </div>
      </div>

      <div className="ad-inbox-flow">
        <div className="ad-flow-step">
          <div className="ad-flow-num">1</div>
          <div><div className="ad-flow-name">Customer</div><div className="ad-flow-desc">Sends WhatsApp / submits form</div></div>
        </div>
        <div className="ad-flow-arrow">→</div>
        <div className="ad-flow-step">
          <div className="ad-flow-num">2</div>
          <div><div className="ad-flow-name">Auto-parse</div><div className="ad-flow-desc">Service · date · time extracted</div></div>
        </div>
        <div className="ad-flow-arrow">→</div>
        <div className="ad-flow-step active">
          <div className="ad-flow-num">3</div>
          <div><div className="ad-flow-name">You confirm</div><div className="ad-flow-desc">One click — review &amp; confirm</div></div>
        </div>
        <div className="ad-flow-arrow">→</div>
        <div className="ad-flow-step">
          <div className="ad-flow-num">4</div>
          <div><div className="ad-flow-name">On Calendar</div><div className="ad-flow-desc">+ auto-reply sent to customer</div></div>
        </div>
      </div>

      <div className="ad-inbox-shell">
        <div className="ad-inbox-list">
          <div className="ad-inbox-tabs">
            {[['new', 'New', incoming.filter(i => i.status === 'new').length], ['parsed', 'Needs review', incoming.filter(i => i.status === 'parsed').length], ['confirmed', 'Confirmed today', incoming.filter(i => i.status === 'confirmed').length]].map(([k, label, count]) => (
              <div key={k} className={'ad-inbox-tab' + (tab === k ? ' active' : '')} onClick={() => { setTab(k); setSelected(0); }}>
                {label} <span className="ad-inbox-tab-count">{count}</span>
              </div>
            ))}
          </div>
          {filtered.map((i, idx) => (
            <div key={i.id} className={'ad-inbox-item' + (idx === selected ? ' active' : '')} onClick={() => setSelected(idx)}>
              <div className={`ad-avatar tone-${i.avatarTone}`}></div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{display:'flex', justifyContent:'space-between', gap:8}}>
                  <div style={{fontWeight:600, fontSize:14}}>{i.from}</div>
                  <div style={{fontSize:11, color:'var(--taupe-soft)', whiteSpace:'nowrap'}}>{i.when}</div>
                </div>
                <div className="ad-inbox-item-snippet">{i.raw}</div>
                <div style={{display:'flex', gap:6, marginTop:6}}>
                  <span className={'ad-pill ' + (i.channel === 'WhatsApp' ? 'wa' : 'muted')}>{i.channel}</span>
                  {i.parsed.confidence < 0.85 && <span className="ad-pill warn">Low confidence</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="ad-inbox-detail">
          {item && <>
            <div className="ad-inbox-detail-head">
              <div style={{display:'flex', alignItems:'center', gap:12}}>
                <div className={`ad-avatar tone-${item.avatarTone}`} style={{width:44, height:44}}></div>
                <div>
                  <div style={{fontFamily:'var(--font-display)', fontSize:22, fontWeight:500, letterSpacing:'-0.01em'}}>{item.from}</div>
                  <div style={{fontSize:13, color:'var(--taupe)'}}>{item.phone} · via {item.channel}</div>
                </div>
              </div>
              <div style={{display:'flex', gap:6}}>
                <button className="ad-btn ad-btn-ghost ad-btn-sm">Open chat</button>
                <button className="ad-btn ad-btn-ghost ad-btn-sm">Flag</button>
              </div>
            </div>

            <div className="ad-msg-bubble">
              <div className="ad-msg-meta">{item.channel} · {item.when}</div>
              <div className="ad-msg-body">"{item.raw}"</div>
            </div>

            <div className="ad-parsed-card">
              <div className="ad-parsed-head">
                <div>
                  <div className="ad-eyebrow">Auto-parsed booking</div>
                  <div style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:500}}>Review &amp; edit before confirming</div>
                </div>
                <div className="ad-confidence">
                  <div className="ad-confidence-bar"><div className="ad-confidence-fill" style={{width:(item.parsed.confidence*100)+'%'}}></div></div>
                  <div className="ad-confidence-num">{Math.round(item.parsed.confidence*100)}% match</div>
                </div>
              </div>
              <div className="ad-parsed-grid">
                <div className="ad-field"><label>Service</label><select className="ad-select" defaultValue={item.parsed.service}><option>{item.parsed.service}</option></select></div>
                <div className="ad-field"><label>Duration</label><input className="ad-input" defaultValue={item.parsed.duration}/></div>
                <div className="ad-field"><label>Date</label><input className="ad-input" defaultValue={item.parsed.date}/></div>
                <div className="ad-field"><label>Time</label><input className="ad-input" defaultValue={item.parsed.time}/></div>
              </div>
              <div className="ad-slot-suggest">
                <AIcon name="calendar" size={14}/> Slot is open · no conflict on Calendar
              </div>
            </div>

            <div className="ad-reply-card">
              <div className="ad-eyebrow">Auto-reply (sent on confirm)</div>
              <textarea className="ad-textarea" defaultValue={item.suggested.reply} rows="3"/>
              <div style={{fontSize:12, color:'var(--taupe)'}}>Templated · personalized with parsed fields. Edit before send.</div>
            </div>

            <div className="ad-inbox-actions">
              <button className="ad-btn ad-btn-ghost"><AIcon name="edit" size={14}/> Edit details</button>
              <button className="ad-btn ad-btn-ghost">Decline · suggest other slot</button>
              <div style={{flex:1}}></div>
              <button className="ad-btn ad-btn-primary" style={{padding:'12px 22px'}}>
                Confirm &amp; add to Calendar →
              </button>
            </div>
          </>}
        </div>
      </div>
    </>
  );
};

// New booking form (manual entry from Calendar)
const NewBookingForm = ({ onClose }) => (
  <div className="ad-cal-drawer-bg" onClick={onClose}>
    <div className="ad-cal-drawer" onClick={e => e.stopPropagation()} style={{width:480}}>
      <div className="ad-cal-drawer-head">
        <div>
          <div className="ad-eyebrow">Manual entry</div>
          <h2>New booking</h2>
        </div>
        <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={onClose}>✕</button>
      </div>
      <div className="ad-cal-drawer-body">
        <div className="ad-row-2">
          <div className="ad-field"><label>Client name</label><input className="ad-input" placeholder="e.g. Naima Rahman"/></div>
          <div className="ad-field"><label>Phone</label><input className="ad-input" placeholder="+880 17"/></div>
        </div>
        <div className="ad-field"><label>Service</label>
          <select className="ad-select"><option>Bridal Makeup — ৳ 18,500 · 3h</option><option>Hair Color — ৳ 6,500 · 1h 30m</option><option>Signature Facial — ৳ 4,800 · 1h</option><option>Mani-pedi — ৳ 3,000 · 1h 30m</option></select>
        </div>
        <div className="ad-row-2">
          <div className="ad-field"><label>Date</label><input className="ad-input" type="date" defaultValue="2026-05-05"/></div>
          <div className="ad-field"><label>Start time</label><input className="ad-input" type="time" defaultValue="11:00"/></div>
        </div>
        <div className="ad-field"><label>Channel</label>
          <div className="ad-seg" style={{width:'100%'}}>
            <button className="active" style={{flex:1}}>Walk-in</button>
            <button style={{flex:1}}>Phone call</button>
            <button style={{flex:1}}>WhatsApp</button>
            <button style={{flex:1}}>Form</button>
          </div>
        </div>
        <div className="ad-field"><label>Notes</label><textarea className="ad-textarea" rows="3" placeholder="Allergy notes, prior services, references…"/></div>
        <div className="ad-toggle-row" style={{borderTop:'1px solid var(--hairline)', marginTop:8}}>
          <div><div className="ad-toggle-row-label">Send WhatsApp confirmation</div><div className="ad-toggle-row-desc">Includes time, address, and 24h reminder.</div></div>
          <div className="ad-toggle on"></div>
        </div>
      </div>
      <div className="ad-cal-drawer-foot">
        <button className="ad-btn ad-btn-ghost" onClick={onClose}>Cancel</button>
        <div style={{flex:1}}></div>
        <button className="ad-btn ad-btn-primary">Save booking</button>
      </div>
    </div>
  </div>
);

Object.assign(window, { Inbox, NewBookingForm });
