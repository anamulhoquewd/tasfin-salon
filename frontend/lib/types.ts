export type UserRole = 'super_admin' | 'admin';
export type BookingStatus = 'pending' | 'confirmed' | 'declined' | 'block';
export type BookingChannel = 'WhatsApp' | 'Form' | 'Walk-in' | 'Phone call';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Booking {
  _id: string;
  clientName: string;
  phone?: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  status: BookingStatus;
  channel: BookingChannel;
  price?: string;
  notes?: string;
  rawMessage?: string;
  parseConfidence?: number;
  autoReply?: string;
  createdAt: string;
}

export interface Service {
  _id: string;
  name: string;
  category: string;
  icon: string;
  duration: string;
  price: string;
  desc: string;
  order: number;
  active: boolean;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  quote: string;
  order: number;
  active: boolean;
}

export interface PortfolioItem {
  _id: string;
  category: string;
  tone: string;
  imageUrl?: string;
  order: number;
  active: boolean;
}

export interface Settings {
  hero: {
    salonName: string;
    eyebrow: string;
    slogan: string;
    primaryCta: string;
    secondaryCta: string;
  };
  intro: {
    title: string;
    body: string;
  };
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  established: string;
  hours: Array<{ day: string; time: string }>;
}

export interface ReelSettings {
  src: string;
  autoplay: boolean;
  maxLoops: number;
  filename?: string;
}

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
}

export interface DashboardStats {
  bookings7d: number;
  bookingsDelta: number;
  whatsappClicks: number;
  pendingCount: number;
  recentBookings: Booking[];
}

export interface ChartDataPoint {
  date: string;
  confirmed: number;
  pending: number;
  total: number;
}
