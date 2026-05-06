// deprecated — backend logic has moved into frontend/app/api/ (Next.js route handlers)
import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { connectDB } from './db.js';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import bookingsRoutes from './routes/bookings.js';
import servicesRoutes from './routes/services.js';
import testimonialsRoutes from './routes/testimonials.js';
import settingsRoutes from './routes/settings.js';
import portfolioRoutes from './routes/portfolio.js';
import reelRoutes from './routes/reelSettings.js';
import faqRoutes from './routes/faq.js';
import dashboardRoutes from './routes/dashboard.js';

const app = new Hono();

app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));
app.use('*', logger());

app.route('/api/auth', authRoutes);
app.route('/api/users', usersRoutes);
app.route('/api/bookings', bookingsRoutes);
app.route('/api/services', servicesRoutes);
app.route('/api/testimonials', testimonialsRoutes);
app.route('/api/settings', settingsRoutes);
app.route('/api/portfolio', portfolioRoutes);
app.route('/api/reel', reelRoutes);
app.route('/api/faq', faqRoutes);
app.route('/api/dashboard', dashboardRoutes);

app.get('/health', (c) => c.json({ ok: true }));

connectDB().then(() => {
  const port = parseInt(process.env.PORT || '3001');
  serve({ fetch: app.fetch, port }, () => {
    console.log(`TASFIN API running on http://localhost:${port}`);
  });
}).catch(console.error);
