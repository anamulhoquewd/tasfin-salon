import type { Settings, ReelSettings, Service, Testimonial, PortfolioItem, FaqItem } from './types';

export const defaultSettings: Settings = {
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
  whatsapp: '+8801711234567',
  phone: '+880 9678 555 200',
  email: 'hello@tasfin.com.bd',
  address: 'House 42, Road 11, Gulshan 2, Dhaka 1212',
  facebook: 'https://facebook.com/tasfin.dhaka',
  instagram: 'https://instagram.com/tasfin.dhaka',
  established: 'Est. 2024 · Dhaka',
  hours: [
    { day: 'Sun – Thu', time: '10:00 — 20:00' },
    { day: 'Friday', time: '14:00 — 21:00' },
    { day: 'Saturday', time: '10:00 — 20:00' },
  ],
};

export const defaultReel: ReelSettings = { src: '', autoplay: true, maxLoops: 2 };

export const defaultServices: Service[] = [
  { _id: '1', name: 'Bridal Makeup', category: 'Bridal', icon: 'sparkles', duration: '2 hr 30 min', price: '৳ 18,500', desc: 'A two-pass HD finish for your wedding day, with skin prep, lashes, and a hair set tailored to your saree or lehenga.', order: 1, active: true },
  { _id: '2', name: 'Engagement Look', category: 'Bridal', icon: 'heart', duration: '1 hr 45 min', price: '৳ 8,500', desc: 'Softer, brighter, photo-ready. Includes a complimentary skin consult before the day.', order: 2, active: true },
  { _id: '3', name: 'Haircut & Style', category: 'Hair', icon: 'scissors', duration: '1 hr', price: '৳ 2,500', desc: 'A real consultation, a real cut. Wash, cut, and finish with a senior stylist.', order: 3, active: true },
  { _id: '4', name: 'Hair Color', category: 'Hair', icon: 'palette', duration: '2 hr – 4 hr', price: '৳ 6,500 – 14,500', desc: 'Single tone, balayage, or correction.', order: 4, active: true },
  { _id: '5', name: 'Signature Facial', category: 'Facial', icon: 'leaf', duration: '1 hr 15 min', price: '৳ 4,800', desc: 'Cleanse, exfoliate, mask, and massage.', order: 5, active: true },
  { _id: '6', name: 'Hydra-glow', category: 'Facial', icon: 'droplet', duration: '1 hr', price: '৳ 6,200', desc: 'Hydradermabrasion for clear, dewy skin.', order: 6, active: true },
  { _id: '7', name: 'Full-body Wax', category: 'Wax', icon: 'flame', duration: '1 hr 30 min', price: '৳ 3,800', desc: 'Warm wax, fast and gentle.', order: 7, active: true },
  { _id: '8', name: 'Mani-pedi', category: 'Nail', icon: 'hand', duration: '1 hr 15 min', price: '৳ 2,800', desc: 'Soak, shape, cuticle care, and a long-wear gel finish.', order: 8, active: true },
  { _id: '9', name: 'Nail Art', category: 'Nail', icon: 'sparkles', duration: '45 min', price: '৳ 1,800', desc: 'Hand-painted designs, French tips, or chrome.', order: 9, active: true },
  { _id: '10', name: 'Threading', category: 'Wax', icon: 'minus', duration: '20 min', price: '৳ 600', desc: 'Brow shaping, upper lip, or full face.', order: 10, active: true },
];

export const defaultTestimonials: Testimonial[] = [
  { _id: '1', name: 'Naima R.', role: 'Bride · Dec 2025', quote: "I've never had makeup last twelve hours like this. The trial alone was worth it — they actually listened and didn't redo my face into someone else's.", order: 1, active: true },
  { _id: '2', name: 'Tahsin A.', role: 'Regular client', quote: 'First salon in Dhaka where the haircut booking was on time, the wash was unhurried, and the cut looked the same a month later.', order: 2, active: true },
  { _id: '3', name: 'Sumaiya K.', role: 'Bride · Sept 2025', quote: "Brought my mother and aunt for the engagement and they're both still talking about it. Calm, well-run, and not at all rushed.", order: 3, active: true },
];

export const defaultPortfolio: PortfolioItem[] = [
  { _id: '1', category: 'Bridal', tone: 'blush', order: 1, active: true },
  { _id: '2', category: 'Bridal', tone: 'champagne', order: 2, active: true },
  { _id: '3', category: 'Hair', tone: 'espresso', order: 3, active: true },
  { _id: '4', category: 'Hair', tone: 'blush', order: 4, active: true },
  { _id: '5', category: 'Facial', tone: 'cream', order: 5, active: true },
  { _id: '6', category: 'Nail', tone: 'blush', order: 6, active: true },
  { _id: '7', category: 'Bridal', tone: 'champagne', order: 7, active: true },
  { _id: '8', category: 'Nail', tone: 'espresso', order: 8, active: true },
  { _id: '9', category: 'Hair', tone: 'cream', order: 9, active: true },
  { _id: '10', category: 'Bridal', tone: 'blush', order: 10, active: true },
  { _id: '11', category: 'Facial', tone: 'champagne', order: 11, active: true },
  { _id: '12', category: 'Hair', tone: 'blush', order: 12, active: true },
];

export const defaultFaq: FaqItem[] = [
  { _id: '1', question: 'Do I need to book in advance?', answer: 'Bridal services book out 3–6 months ahead. For everything else, WhatsApp us — we usually have weekday afternoon slots within the week.', order: 1, active: true },
  { _id: '2', question: 'Do you take walk-ins?', answer: 'Yes, for haircuts, threading, and basic mani/pedi on weekday afternoons. Larger services need a booking.', order: 2, active: true },
  { _id: '3', question: 'What products do you use?', answer: 'Skin services use Cosmedix, IS Clinical, and Image Skincare. Hair color is Wella Koleston Perfect and Davines.', order: 3, active: true },
  { _id: '4', question: 'Is there parking?', answer: 'Two spots in front of the building, plus on-street on Road 11 after 6 PM. The Gulshan 2 circle is a 4-minute walk.', order: 4, active: true },
];
