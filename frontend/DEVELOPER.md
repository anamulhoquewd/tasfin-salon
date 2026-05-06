# TASFIN Salon — Developer Guide

## Overview

Single Next.js 16 application. Frontend (React) and backend (API routes + MongoDB) live together in this one folder. No separate backend server.

```
frontend/
├── app/
│   ├── (website pages)     ← public site
│   ├── admin/              ← CMS dashboard (protected)
│   └── api/                ← REST API (replaces old Hono server)
├── components/
│   ├── ui/                 ← shadcn/ui base components
│   ├── admin/              ← admin-specific UI
│   └── website/            ← public site UI
├── lib/
│   ├── api.ts              ← axios client (all API calls)
│   ├── auth.ts             ← localStorage token helpers
│   ├── db.ts               ← MongoDB singleton connection
│   ├── jwt.ts              ← sign / verify / requireAuth helpers
│   ├── schemas.ts          ← Zod validation schemas (shared)
│   ├── serverData.ts       ← Server Component data fetchers
│   ├── types.ts            ← shared TypeScript types
│   ├── defaults.ts         ← fallback data for offline/empty DB
│   └── utils.ts            ← cn() utility
├── models/                 ← Mongoose models (server-only)
│   ├── Booking.ts
│   ├── Faq.ts
│   ├── Portfolio.ts
│   ├── ReelSettings.ts
│   ├── Service.ts
│   ├── Settings.ts
│   ├── Testimonial.ts
│   └── User.ts
└── middleware.ts            ← protects /admin/* routes
```

---

## Getting Started

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
```

Copy `.env` (already present) — the key variables are:

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret for signing JWTs (set this!) |
| `NEXT_PUBLIC_DOMAIN` | Full origin URL (e.g. `http://localhost:3000`) |

> **Important:** Add `JWT_SECRET` to `.env` — the fallback `'fallback-secret'` is only for local dev.

---

## API Routes

All routes live under `app/api/`. They map 1-to-1 with the old Hono server.

| Route | Methods | Auth |
|---|---|---|
| `/api/auth` | `POST` (login), `GET` (me) | — |
| `/api/bookings` | `GET`, `POST` | required |
| `/api/bookings/[id]` | `GET`, `PUT`, `DELETE` | required |
| `/api/services` | `GET` (public), `POST` | POST requires auth |
| `/api/services/[id]` | `PUT`, `DELETE` | required |
| `/api/testimonials` | `GET` (public), `POST` | POST requires auth |
| `/api/testimonials/[id]` | `PUT`, `DELETE` | required |
| `/api/settings` | `GET` (public), `PUT` | PUT requires auth |
| `/api/portfolio` | `GET` (public), `POST` | POST requires auth |
| `/api/portfolio/[id]` | `PUT`, `DELETE` | required |
| `/api/reel` | `GET` (public), `PUT` | PUT requires auth |
| `/api/faq` | `GET` (public), `POST` | POST requires auth |
| `/api/faq/[id]` | `PUT`, `DELETE` | required |
| `/api/users` | `GET`, `POST` | super_admin only |
| `/api/users/[id]` | `DELETE` | super_admin only |
| `/api/dashboard/stats` | `GET` | required |
| `/api/dashboard/chart` | `GET` | required |

### Auth Pattern

Send a `Bearer` token in the `Authorization` header. The `lib/api.ts` axios instance does this automatically from `localStorage`.

```
Authorization: Bearer <jwt>
```

Protected route handlers call `requireAuth(request)` from `lib/jwt.ts`:

```ts
import { requireAuth } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  if (!requireAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // ...
}
```

Super-admin-only routes use `requireSuperAdmin(request)` instead.

---

## Database

Mongoose connects once and caches the connection across hot-reloads (`lib/db.ts`).

Every API route calls `await connectDB()` before any model access.

Models are in `models/` — do **not** import them in client components (`'use client'`). They are server-only.

---

## Adding a New API Resource

1. Add a Mongoose model to `models/MyThing.ts`
2. Add a Zod schema to `lib/schemas.ts`
3. Add a TypeScript interface to `lib/types.ts`
4. Create `app/api/my-thing/route.ts` (collection) and `app/api/my-thing/[id]/route.ts` (item)
5. Add methods to `lib/api.ts` for client-side calls

---

## Frontend API Calls

All client-side API calls go through the axios instance in `lib/api.ts`.

```ts
import { servicesApi } from '@/lib/api';

// in a client component
const { data } = await servicesApi.list();
```

Server Components use `lib/serverData.ts` for public data (settings, services, etc.) via `fetch()` with `next: { revalidate: 60 }`.

---

## Admin Auth Flow

1. User POSTs credentials to `/api/auth`
2. On success, `token` + `user` are saved to `localStorage` via `lib/auth.ts`
3. `middleware.ts` checks for the token cookie on every `/admin/*` request and redirects to `/admin/login` if missing

> The middleware reads from a `tasfin_token` cookie OR `Authorization` header. The login page should also set the token as a cookie (`document.cookie`) in addition to `localStorage` for middleware to pick it up.

---

## UI Components

This project uses **shadcn/ui** (Radix + Tailwind v4). Components live in `components/ui/`.

Add new shadcn components with:

```bash
npx shadcn@latest add <component-name>
```

Available installed components: `button`, `card`, `input`, `label`, `select`, `dialog`, `tabs`, `table`, `badge`, `separator`, `switch`, `sonner`, `dropdown-menu`, `sheet`, `avatar`, `skeleton`, `textarea`.

---

## Old Backend (deprecated)

The `backend/` folder at the repo root is **deprecated**. All files there have a `// deprecated` comment at the top. Do not add new code there. It exists only as reference. The old Hono server (`backend/src/index.ts`) no longer needs to run.

---

## Seed Script

To seed the database (admin user + sample data), run:

```bash
cd backend
npm run seed
```

> A seed script for the new unified project is a future task — for now use the old one once, or insert directly via MongoDB Atlas.
