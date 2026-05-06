import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  role: z.enum(['super_admin', 'admin']).default('admin'),
});

export const bookingSchema = z.object({
  clientName: z.string().min(1),
  phone: z.string().optional(),
  service: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  duration: z.string().default('1h'),
  status: z.enum(['pending', 'confirmed', 'declined', 'block']).default('pending'),
  channel: z.enum(['WhatsApp', 'Form', 'Walk-in', 'Phone call']).default('WhatsApp'),
  price: z.string().optional(),
  notes: z.string().optional(),
  rawMessage: z.string().optional(),
  parseConfidence: z.number().min(0).max(1).optional(),
  autoReply: z.string().optional(),
});

export const serviceSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  icon: z.string().default('sparkles'),
  duration: z.string().min(1),
  price: z.string().min(1),
  desc: z.string().min(1),
  order: z.number().default(0),
  active: z.boolean().default(true),
});

export const testimonialSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  quote: z.string().min(1),
  order: z.number().default(0),
  active: z.boolean().default(true),
});

export const settingsSchema = z.object({
  hero: z.object({
    salonName: z.string(),
    eyebrow: z.string(),
    slogan: z.string(),
    primaryCta: z.string(),
    secondaryCta: z.string(),
  }).optional(),
  intro: z.object({
    title: z.string(),
    body: z.string(),
  }).optional(),
  whatsapp: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  established: z.string().optional(),
  hours: z.array(z.object({ day: z.string(), time: z.string() })).optional(),
});

export const portfolioSchema = z.object({
  category: z.string().min(1),
  tone: z.string().default('blush'),
  imageUrl: z.string().optional(),
  order: z.number().default(0),
  active: z.boolean().default(true),
});

export const reelSettingsSchema = z.object({
  src: z.string().optional(),
  autoplay: z.boolean().optional(),
  maxLoops: z.number().min(1).max(3).optional(),
  filename: z.string().optional(),
});

export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  order: z.number().default(0),
  active: z.boolean().default(true),
});
