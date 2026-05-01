# TASFIN Salon — Setup Guide

## Requirements
- Node.js 18+
- MongoDB running locally on port 27017

## 1. Backend setup

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` (already done) and adjust if needed.

### Seed the database (first time only)
```bash
npm run seed
```
This creates:
- Super admin: `admin@tasfin.com.bd` / `tasfin2026`
- Sample salon data (services, testimonials, portfolio, FAQ, settings)
- 48 sample bookings including 3 WhatsApp-style inbox entries

### Start the backend
```bash
npm run dev
```
API runs at `http://localhost:3001`

## 2. Frontend setup

```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:3000`

## URLs
- **Website**: http://localhost:3000
- **Admin login**: http://localhost:3000/admin/login
- **API health**: http://localhost:3001/health

## Admin credentials (after seeding)
- Email: `admin@tasfin.com.bd`
- Password: `tasfin2026`
- Role: Super Admin

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/auth/login | — | Login |
| GET | /api/auth/me | Bearer | Current user |
| GET | /api/bookings | Bearer | List bookings |
| POST | /api/bookings | Bearer | Create booking |
| PUT | /api/bookings/:id | Bearer | Update booking |
| DELETE | /api/bookings/:id | Bearer | Delete booking |
| GET | /api/services | — | List services (public) |
| POST | /api/services | Bearer | Create service |
| PUT | /api/services/:id | Bearer | Update service |
| DELETE | /api/services/:id | Bearer | Delete service |
| GET | /api/settings | — | Get salon settings (public) |
| PUT | /api/settings | Bearer | Update settings |
| GET | /api/testimonials | — | List testimonials (public) |
| GET | /api/portfolio | — | List portfolio (public) |
| GET | /api/faq | — | List FAQ (public) |
| GET | /api/reel | — | Reel settings (public) |
| PUT | /api/reel | Bearer | Update reel settings |
| GET | /api/dashboard/stats | Bearer | Dashboard stats |
| GET | /api/dashboard/chart | Bearer | Bookings chart data |
| GET | /api/users | Super Admin | List users |
| POST | /api/users | Super Admin | Create admin user |
| DELETE | /api/users/:id | Super Admin | Delete user |
