// Run with: npm run seed
import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tasfin';

// ── inline model imports (tsx can't resolve @/ aliases outside Next.js) ──────

import UserModel from './models/User';
import SettingsModel from './models/Settings';
import ReelSettingsModel from './models/ReelSettings';
import ServiceModel from './models/Service';
import TestimonialModel from './models/Testimonial';
import PortfolioModel from './models/Portfolio';
import FaqModel from './models/Faq';
import BookingModel from './models/Booking';

async function seed() {
  await mongoose.connect(MONGODB_URI);

  // ── Super admin ─────────────────────────────────────────────────────────────
  const existing = await UserModel.findOne({ email: 'anam@tasfin.com' });
  if (!existing) {
    const hashed = await bcrypt.hash('tasfin2026', 10);
    await UserModel.create({
      email: 'anam@tasfin.com',
      password: hashed,
      name: 'Anamul Hoque',
      role: 'super_admin',
    });
    console.log('✓ Super admin created  →  anam@tasfin.com / tasfin2026');
  } else {
    console.log('  Super admin already exists');
  }

  // ── Site settings ────────────────────────────────────────────────────────────
  if (!(await SettingsModel.countDocuments())) {
    await SettingsModel.create({
      hero: {
        salonName: 'TASFIN',
        eyebrow: 'Dhaka · Est. 2024',
        slogan: 'Bridal artistry, considered skincare, and the kind of haircut you actually wanted.',
        primaryCta: 'Book appointment',
        secondaryCta: 'WhatsApp now',
      },
      intro: {
        title: 'Slow, careful, and always on time.',
        body: 'A small studio in Gulshan, run by senior stylists who take their time. Slow, careful, and always on time — walk in tired, walk out yourself.',
      },
      whatsapp: '+8801975024262',
      phone: '+880 1975 024 262',
      email: 'hello@tasfin.com',
      address: 'House 41, Road 10/2, Block F, South Banasree, Dhaka 1212',
      facebook: 'https://facebook.com/',
      instagram: 'https://instagram.com/',
      established: 'Est. 2024 · Dhaka',
      hours: [
        { day: 'Sun - Thu', time: '10:00 — 20:00' },
        { day: 'Friday', time: '14:00 — 21:00' },
        { day: 'Saturday', time: '10:00 — 20:00' },
      ],
    });
    console.log('✓ Settings created');
  }

  // ── Reel settings ─────────────────────────────────────────────────────────────
  if (!(await ReelSettingsModel.countDocuments())) {
    await ReelSettingsModel.create({ src: '', autoplay: true, maxLoops: 2 });
    console.log('✓ Reel settings created');
  }

  // ── Services ──────────────────────────────────────────────────────────────────
  if (!(await ServiceModel.countDocuments())) {
    await ServiceModel.insertMany([
      { name: 'Bridal Makeup',    category: 'Bridal', icon: 'sparkles', duration: '2 hr 30 min',    price: '৳ 18,500',        desc: 'A two-pass HD finish for your wedding day, with skin prep, lashes, and a hair set tailored to your saree or lehenga.', order: 1 },
      { name: 'Engagement Look',  category: 'Bridal', icon: 'heart',    duration: '1 hr 45 min',    price: '৳ 8,500',         desc: 'Softer, brighter, photo-ready. Includes a complimentary skin consult before the day.', order: 2 },
      { name: 'Haircut & Style',  category: 'Hair',   icon: 'scissors', duration: '1 hr',           price: '৳ 2,500',         desc: 'A real consultation, a real cut. Wash, cut, and finish with a senior stylist.', order: 3 },
      { name: 'Hair Color',       category: 'Hair',   icon: 'palette',  duration: '2 hr – 4 hr',    price: '৳ 6,500 – 14,500',desc: 'Single tone, balayage, or correction.', order: 4 },
      { name: 'Signature Facial', category: 'Facial', icon: 'leaf',     duration: '1 hr 15 min',    price: '৳ 4,800',         desc: 'Cleanse, exfoliate, mask, and massage.', order: 5 },
      { name: 'Hydra-glow',       category: 'Facial', icon: 'droplet',  duration: '1 hr',           price: '৳ 6,200',         desc: 'Hydradermabrasion for clear, dewy skin. Zero downtime.', order: 6 },
      { name: 'Full-body Wax',    category: 'Wax',    icon: 'flame',    duration: '1 hr 30 min',    price: '৳ 3,800',         desc: 'Warm wax, fast and gentle.', order: 7 },
      { name: 'Mani-pedi',        category: 'Nail',   icon: 'hand',     duration: '1 hr 15 min',    price: '৳ 2,800',         desc: 'Soak, shape, cuticle care, and a long-wear gel finish.', order: 8 },
      { name: 'Nail Art',         category: 'Nail',   icon: 'sparkles', duration: '45 min',         price: '৳ 1,800',         desc: 'Hand-painted designs, French tips, or chrome.', order: 9 },
      { name: 'Threading',        category: 'Wax',    icon: 'minus',    duration: '20 min',         price: '৳ 600',           desc: 'Brow shaping, upper lip, or full face.', order: 10 },
    ]);
    console.log('✓ 10 services created');
  }

  // ── Testimonials ──────────────────────────────────────────────────────────────
  if (!(await TestimonialModel.countDocuments())) {
    await TestimonialModel.insertMany([
      { name: 'Naima R.',   role: 'Bride · Dec 2025',   quote: "I've never had makeup last twelve hours like this. The trial alone was worth it — they actually listened.", order: 1 },
      { name: 'Tahsin A.',  role: 'Regular client',     quote: 'First salon in Dhaka where the haircut booking was on time and the cut looked the same a month later.', order: 2 },
      { name: 'Sumaiya K.', role: 'Bride · Sept 2025',  quote: "Brought my mother and aunt for the engagement and they're both still talking about it.", order: 3 },
    ]);
    console.log('✓ 3 testimonials created');
  }

  // ── Portfolio placeholders ────────────────────────────────────────────────────
  if (!(await PortfolioModel.countDocuments())) {
    await PortfolioModel.insertMany([
      { category: 'Bridal',  tone: 'blush',     order: 1 },
      { category: 'Bridal',  tone: 'champagne', order: 2 },
      { category: 'Hair',    tone: 'espresso',  order: 3 },
      { category: 'Hair',    tone: 'blush',     order: 4 },
      { category: 'Facial',  tone: 'cream',     order: 5 },
      { category: 'Nail',    tone: 'blush',     order: 6 },
    ]);
    console.log('✓ 6 portfolio placeholders created');
  }

  // ── FAQs ─────────────────────────────────────────────────────────────────────
  if (!(await FaqModel.countDocuments())) {
    await FaqModel.insertMany([
      { question: 'Do I need to book in advance?', answer: 'Bridal services book out 3–6 months ahead. For everything else, WhatsApp us — we usually have slots within the week.', order: 1 },
      { question: 'Do you take walk-ins?',         answer: 'Yes, for haircuts, threading, and basic mani/pedi on weekday afternoons. Larger services need a booking.', order: 2 },
      { question: 'What products do you use?',     answer: 'Skin services use Cosmedix, IS Clinical, and Image Skincare. Hair color is Wella Koleston Perfect and Davines.', order: 3 },
      { question: 'Is there parking?',             answer: 'Two spots in front of the building plus on-street parking after 6 PM.', order: 4 },
    ]);
    console.log('✓ 4 FAQs created');
  }

  // ── Sample bookings ───────────────────────────────────────────────────────────
  if (!(await BookingModel.countDocuments())) {
    const channels = ['WhatsApp', 'WhatsApp', 'WhatsApp', 'Form', 'Walk-in'] as const;
    const statuses = ['confirmed', 'confirmed', 'pending'] as const;
    const services = ['Bridal Makeup', 'Hair Color', 'Signature Facial', 'Mani-pedi', 'Threading', 'Haircut & Style'];
    const clients  = ['Naima Rahman', 'Tahsin Akter', 'Sumaiya Khan', 'Farzana B.', 'Nadia H.', 'Ayesha M.', 'Reema K.'];

    const docs = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      return {
        clientName: clients[i % clients.length],
        service:    services[i % services.length],
        date:       date.toISOString().split('T')[0],
        time:       `${10 + (i % 9)}:00`,
        duration:   '1h',
        status:     statuses[i % statuses.length],
        channel:    channels[i % channels.length],
        price:      `৳ ${2000 + (i * 1500) % 18000}`,
        createdAt:  date,
      };
    });
    await BookingModel.insertMany(docs);
    console.log('✓ 30 sample bookings created');
  }

  console.log('\nSeed complete!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
