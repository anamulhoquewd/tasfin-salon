# TASFIN — Admin Panel UI Kit

CMS for managing the salon site. Vertical sidebar nav, content editors, calendar, media library, reel settings.

## Sections
- **Dashboard** — overview stats (bookings, WhatsApp clicks, page views, reel plays) + recent bookings table
- **Calendar** — week / day / list views; bookings shown as colored events with status (confirmed = gold solid, pending = warning dashed, blocked = striped). Click any event to open a side drawer with client details, phone, price, and confirm/edit actions.
- **Content** — frontpage text, services, portfolio, testimonials, FAQ, contact info
- **Media library** — image and video upload + management
- **Reel settings** — autoplay toggle, max loop count (1–3), preview

## Components
- `AdminPages.jsx` — `AdminShell` (sidebar + topbar), `Dashboard`, `Frontpage`, `ServicesEditor`, `MediaLibrary`, `ReelSettings`, `ContactInfo`, `TestimonialsEditor`
- `Calendar.jsx` — `Calendar` (week/day/list views + booking drawer)
- `admin.css` — sidebar, cards, forms, tables, calendar grid + drawer

## Run
Open `index.html` directly. Uses React + Babel from CDN.
