import mongoose, { Document, Schema } from 'mongoose';

interface OpeningHour {
  day: string;
  time: string;
}

interface HeroContent {
  salonName: string;
  eyebrow: string;
  slogan: string;
  primaryCta: string;
  secondaryCta: string;
}

interface IntroContent {
  title: string;
  body: string;
}

export interface ISettings extends Document {
  hero: HeroContent;
  intro: IntroContent;
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  hours: OpeningHour[];
  established: string;
}

const SettingsSchema = new Schema<ISettings>(
  {
    hero: {
      salonName: { type: String, default: 'TASFIN' },
      eyebrow: { type: String, default: 'Dhaka · Est. 2024' },
      slogan: { type: String, default: 'Bridal artistry, considered skincare, and the kind of haircut you actually wanted.' },
      primaryCta: { type: String, default: 'Book appointment' },
      secondaryCta: { type: String, default: 'WhatsApp now' },
    },
    intro: {
      title: { type: String, default: 'Slow, careful, and always on time.' },
      body: { type: String, default: 'A small studio in Gulshan, run by senior stylists who take their time.' },
    },
    whatsapp: { type: String, default: '+8801711234567' },
    phone: { type: String, default: '+880 9678 555 200' },
    email: { type: String, default: 'hello@tasfin.com.bd' },
    address: { type: String, default: 'House 42, Road 11, Gulshan 2, Dhaka 1212' },
    facebook: { type: String, default: 'https://facebook.com/tasfin.dhaka' },
    instagram: { type: String, default: 'https://instagram.com/tasfin.dhaka' },
    established: { type: String, default: 'Est. 2024 · Dhaka' },
    hours: {
      type: [{ day: String, time: String }],
      default: [
        { day: 'Sun – Thu', time: '10:00 — 20:00' },
        { day: 'Friday', time: '14:00 — 21:00' },
        { day: 'Saturday', time: '10:00 — 20:00' },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISettings>('Settings', SettingsSchema);
