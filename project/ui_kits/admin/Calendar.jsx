// Calendar / Bookings management — week view with bookings overlay

const Calendar = () => {
  const [view, setView] = useStateAd('week'); // week | day | list
  const [weekOffset, setWeekOffset] = useStateAd(0);
  const [selected, setSelected] = useStateAd(null);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [3, 4, 5, 6, 7, 8, 9].map(d => d + weekOffset * 7);

  const hours = Array.from({ length: 11 }, (_, i) => i + 9); // 9 AM – 7 PM

  // bookings: dayIdx (0-6), startHour (decimal), durationHours, name, service, status, channel
  const bookings = [
    { dayIdx: 0, start: 11.0, dur: 3.0, name: 'Naima Rahman', service: 'Bridal Makeup', status: 'confirmed', channel: 'WhatsApp', phone: '+880 1711 234 567', price: '৳ 18,500' },
    { dayIdx: 1, start: 10.0, dur: 1.5, name: 'Tahsin Akter', service: 'Hair Color', status: 'pending', channel: 'WhatsApp', phone: '+880 1722 555 401', price: '৳ 6,500' },
    { dayIdx: 1, start: 14.5, dur: 1.0, name: 'Walk-in slot', service: 'Reserved', status: 'block', channel: '—' },
    { dayIdx: 2, start: 12.0, dur: 2.0, name: 'Sumaiya Khan', service: 'Bridal Trial', status: 'confirmed', channel: 'WhatsApp', phone: '+880 1733 901 122', price: '৳ 5,000' },
    { dayIdx: 2, start: 16.0, dur: 1.0, name: 'Farzana B.', service: 'Signature Facial', status: 'confirmed', channel: 'Form', phone: '+880 1955 660 813', price: '৳ 4,800' },
    { dayIdx: 3, start: 11.5, dur: 0.75, name: 'Nadia H.', service: 'Manicure', status: 'confirmed', channel: 'WhatsApp', phone: '+880 1715 224 091', price: '৳ 1,500' },
    { dayIdx: 3, start: 13.0, dur: 1.5, name: 'Ayesha M.', service: 'Hair Cut + Blow Dry', status: 'confirmed', channel: 'WhatsApp', phone: '+880 1611 887 220', price: '৳ 3,200' },
    { dayIdx: 3, start: 17.0, dur: 1.0, name: 'Reema K.', service: 'Pedicure', status: 'pending', channel: 'WhatsApp', phone: '+880 1812 304 776', price: '৳ 1,800' },
    { dayIdx: 4, start: 10.5, dur: 2.0, name: 'Nusrat J.', service: 'Hair Color + Treatment', status: 'confirmed', channel: 'WhatsApp', phone: '+880 1717 990 555', price: '৳ 8,500' },
    { dayIdx: 4, start: 15.0, dur: 1.0, name: 'Lubna R.', service: 'Wax (Full Body)', status: 'confirmed', channel: 'Form', phone: '+880 1813 446 902', price: '৳ 3,000' },
    { dayIdx: 5, start: 9.5,  dur: 0.5, name: 'Rina A.',  service: 'Threading', status: 'confirmed', channel: 'WhatsApp', phone: '+880 1611 220 044', price: '৳ 600' },
    { dayIdx: 5, start: 11.0, dur: 4.0, name: 'Subarna I.', service: 'Bridal Makeup (Trial+Day)', status: 'confirmed', channel: 'WhatsApp', phone: '+880 1737 882 109', price: '৳ 22,000' },
    { dayIdx: 6, start: 10.0, dur: 1.5, name: 'Zarin T.', service: 'Hair Cut + Color', status: 'confirmed', channel: 'WhatsApp', phone: '+880 1611 552 087', price: '৳ 6,800' },
    { dayIdx: 6, start: 13.0, dur: 1.0, name: 'Mehnaz K.', service: 'Signature Facial', status: 'pending', channel: 'Form', phone: '+880 1719 220 800', price: '৳ 4,800' },
    { dayIdx: 6, start: 16.5, dur: 1.5, name: 'Anika F.', service: 'Mani-pedi', status: 'confirmed', channel: 'WhatsApp', phone: '+880 1722 010 559', price: '৳ 3,000' },
  ];

  const HOUR_PX = 56;
  const top = (hour) => (hour - 9) * HOUR_PX;

  return (
    <>
      <div className="ad-cal-toolbar">
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => setWeekOffset(weekOffset - 1)}>‹</button>
          <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => setWeekOffset(0)}>This week</button>
          <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => setWeekOffset(weekOffset + 1)}>›</button>
          <div className="ad-cal-range">May {dates[0]} — {dates[6]}, 2026</div>
        </div>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <div className="ad-seg">
            {['day','week','list'].map(v => (
              <button key={v} className={view === v ? 'active' : ''} onClick={() => setView(v)}>{v}</button>
            ))}
          </div>
          <button className="ad-btn ad-btn-primary"><AIcon name="plus" size={14}/> New booking</button>
        </div>
      </div>

      <div className="ad-cal-stats">
        <div className="ad-cal-stat"><div className="ad-stat-label">Confirmed</div><div className="ad-stat-value">11</div></div>
        <div className="ad-cal-stat"><div className="ad-stat-label">Pending</div><div className="ad-stat-value">3</div></div>
        <div className="ad-cal-stat"><div className="ad-stat-label">Bridal</div><div className="ad-stat-value">3</div></div>
        <div className="ad-cal-stat"><div className="ad-stat-label">Revenue · est.</div><div className="ad-stat-value">৳ 86k</div></div>
      </div>

      {view === 'week' && (
        <div className="ad-cal-card">
          <div className="ad-cal-grid">
            <div className="ad-cal-gutter">
              <div className="ad-cal-day-header"></div>
              {hours.map(h => (
                <div key={h} className="ad-cal-hour-label" style={{height:HOUR_PX}}>
                  {h > 12 ? `${h-12} PM` : h === 12 ? '12 PM' : `${h} AM`}
                </div>
              ))}
            </div>
            {days.map((d, i) => (
              <div key={d} className={'ad-cal-col' + (i === 2 ? ' today' : '')}>
                <div className="ad-cal-day-header">
                  <div className="ad-cal-day-name">{d}</div>
                  <div className="ad-cal-day-num">{dates[i]}</div>
                </div>
                <div className="ad-cal-col-body" style={{height: hours.length * HOUR_PX}}>
                  {hours.map(h => <div key={h} className="ad-cal-hour-line" style={{top:top(h)}}></div>)}
                  {bookings.filter(b => b.dayIdx === i).map((b, k) => (
                    <div key={k}
                      className={'ad-cal-event status-' + b.status}
                      style={{top:top(b.start), height:b.dur * HOUR_PX - 2}}
                      onClick={() => setSelected(b)}>
                      <div className="ad-cal-event-time">{fmtTime(b.start)} — {fmtTime(b.start + b.dur)}</div>
                      <div className="ad-cal-event-name">{b.name}</div>
                      <div className="ad-cal-event-svc">{b.service}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'day' && (
        <div className="ad-cal-card">
          <div className="ad-cal-day-view">
            <div className="ad-cal-gutter">
              <div className="ad-cal-day-header"></div>
              {hours.map(h => <div key={h} className="ad-cal-hour-label" style={{height:HOUR_PX}}>{h > 12 ? `${h-12} PM` : h === 12 ? '12 PM' : `${h} AM`}</div>)}
            </div>
            <div className="ad-cal-col today" style={{flex:1}}>
              <div className="ad-cal-day-header"><div className="ad-cal-day-name">Today · Tue</div><div className="ad-cal-day-num">{dates[2]} May</div></div>
              <div className="ad-cal-col-body" style={{height: hours.length * HOUR_PX}}>
                {hours.map(h => <div key={h} className="ad-cal-hour-line" style={{top:top(h)}}></div>)}
                {bookings.filter(b => b.dayIdx === 2).map((b, k) => (
                  <div key={k} className={'ad-cal-event status-' + b.status + ' wide'}
                    style={{top:top(b.start), height:b.dur * HOUR_PX - 2}}
                    onClick={() => setSelected(b)}>
                    <div className="ad-cal-event-time">{fmtTime(b.start)} — {fmtTime(b.start + b.dur)}</div>
                    <div className="ad-cal-event-name">{b.name}</div>
                    <div className="ad-cal-event-svc">{b.service} · {b.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'list' && (
        <div className="ad-card">
          <table className="ad-table">
            <thead><tr><th>When</th><th>Client</th><th>Service</th><th>Price</th><th>Channel</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {bookings.map((b, k) => (
                <tr key={k} onClick={() => setSelected(b)} style={{cursor:'pointer'}}>
                  <td><div style={{fontWeight:600}}>{days[b.dayIdx]} {dates[b.dayIdx]}</div><div style={{fontSize:12,color:'var(--taupe)'}}>{fmtTime(b.start)}</div></td>
                  <td>{b.name}</td>
                  <td>{b.service}</td>
                  <td style={{fontFamily:'var(--font-display)'}}>{b.price || '—'}</td>
                  <td>{b.channel}</td>
                  <td><span className={'ad-pill ' + (b.status === 'confirmed' ? 'success' : b.status === 'pending' ? 'warn' : 'muted')}>{b.status}</span></td>
                  <td className="ad-td-actions"><button className="ad-btn ad-btn-ghost ad-btn-sm">Open</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="ad-cal-drawer-bg" onClick={() => setSelected(null)}>
          <div className="ad-cal-drawer" onClick={e => e.stopPropagation()}>
            <div className="ad-cal-drawer-head">
              <div>
                <div className="ad-eyebrow">Booking</div>
                <h2>{selected.name}</h2>
              </div>
              <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="ad-cal-drawer-body">
              <div className="ad-cal-drawer-row"><div className="ad-cal-drawer-key">Service</div><div>{selected.service}</div></div>
              <div className="ad-cal-drawer-row"><div className="ad-cal-drawer-key">When</div><div>{days[selected.dayIdx]} {dates[selected.dayIdx]} May · {fmtTime(selected.start)} — {fmtTime(selected.start + selected.dur)}</div></div>
              {selected.price && <div className="ad-cal-drawer-row"><div className="ad-cal-drawer-key">Price</div><div style={{fontFamily:'var(--font-display)', fontSize:16}}>{selected.price}</div></div>}
              {selected.phone && <div className="ad-cal-drawer-row"><div className="ad-cal-drawer-key">Phone</div><div>{selected.phone}</div></div>}
              <div className="ad-cal-drawer-row"><div className="ad-cal-drawer-key">Channel</div><div>{selected.channel}</div></div>
              <div className="ad-cal-drawer-row"><div className="ad-cal-drawer-key">Status</div><div><span className={'ad-pill ' + (selected.status === 'confirmed' ? 'success' : selected.status === 'pending' ? 'warn' : 'muted')}>{selected.status}</span></div></div>
            </div>
            <div className="ad-cal-drawer-foot">
              <button className="ad-btn ad-btn-ghost"><AIcon name="phone" size={14}/> WhatsApp</button>
              <button className="ad-btn ad-btn-ghost"><AIcon name="edit" size={14}/> Edit</button>
              <div style={{flex:1}}></div>
              <button className="ad-btn ad-btn-primary">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const fmtTime = (h) => {
  const hour = Math.floor(h);
  const min = Math.round((h - hour) * 60);
  const am = hour < 12;
  const display = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${display}:${String(min).padStart(2,'0')} ${am ? 'AM' : 'PM'}`;
};

Object.assign(window, { Calendar });
