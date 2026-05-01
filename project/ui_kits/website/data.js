// Shared salon data — replace via admin panel
window.SALON = {
  name: "TASFIN",
  slogan: "Bridal artistry, considered skincare, and the kind of haircut you actually wanted.",
  intro: "A small studio in Gulshan, run by senior stylists who take their time. Slow, careful, and always on time — walk in tired, walk out yourself.",
  established: "Est. 2024 · Dhaka",
  whatsapp: "+8801711234567",
  whatsappDisplay: "+880 1711 234 567",
  phone: "+880 9678 555 200",
  email: "hello@tasfin.com.bd",
  address: "House 42, Road 11, Gulshan 2, Dhaka 1212",
  hours: [
    { day: "Sun – Thu", time: "10:00 — 20:00" },
    { day: "Friday", time: "14:00 — 21:00" },
    { day: "Saturday", time: "10:00 — 20:00" },
  ],
  facebook: "https://facebook.com/tasfin.dhaka",
  instagram: "https://instagram.com/tasfin.dhaka",

  services: [
    { id: "bridal", category: "Bridal", icon: "sparkles", name: "Bridal Makeup",  duration: "2 hr 30 min", price: "৳ 18,500", desc: "A two-pass HD finish for your wedding day, with skin prep, lashes, and a hair set tailored to your saree or lehenga." },
    { id: "engagement", category: "Bridal", icon: "heart",     name: "Engagement Look", duration: "1 hr 45 min", price: "৳ 8,500",  desc: "Softer, brighter, photo-ready. Includes a complimentary skin consult before the day." },
    { id: "haircut", category: "Hair", icon: "scissors",   name: "Haircut & Style", duration: "1 hr",        price: "৳ 2,500",  desc: "A real consultation, a real cut. Wash, cut, and finish with a senior stylist." },
    { id: "color", category: "Hair", icon: "palette",    name: "Hair Color",      duration: "2 hr – 4 hr",  price: "৳ 6,500 – 14,500", desc: "Single tone, balayage, or correction. We patch-test and book a follow-up gloss four weeks out." },
    { id: "facial", category: "Facial", icon: "leaf",       name: "Signature Facial", duration: "1 hr 15 min", price: "৳ 4,800",  desc: "Cleanse, exfoliate, mask, and massage with cosmeceutical-grade products. Calming, not aggressive." },
    { id: "hydra", category: "Facial", icon: "droplet",    name: "Hydra-glow",      duration: "1 hr",        price: "৳ 6,200",  desc: "Hydradermabrasion for clear, dewy skin before an event or shoot. Zero downtime." },
    { id: "wax", category: "Wax", icon: "flame",      name: "Full-body Wax",   duration: "1 hr 30 min", price: "৳ 3,800",  desc: "Warm wax, fast and gentle. Includes underarm and bikini line." },
    { id: "mani", category: "Nail", icon: "hand",       name: "Mani-pedi",       duration: "1 hr 15 min", price: "৳ 2,800",  desc: "Soak, shape, cuticle care, and a long-wear gel finish in your choice of palette." },
    { id: "nailart", category: "Nail", icon: "sparkles",   name: "Nail Art",        duration: "45 min",      price: "৳ 1,800",  desc: "Hand-painted designs, French tips, or chrome — added on to any mani." },
    { id: "threading", category: "Wax", icon: "minus",      name: "Threading",       duration: "20 min",      price: "৳ 600",    desc: "Brow shaping, upper lip, or full face." },
  ],

  portfolio: [
    { id: 1, category: "Bridal", tone: "blush" },
    { id: 2, category: "Bridal", tone: "champagne" },
    { id: 3, category: "Hair",   tone: "espresso" },
    { id: 4, category: "Hair",   tone: "blush" },
    { id: 5, category: "Facial", tone: "cream" },
    { id: 6, category: "Nail",   tone: "blush" },
    { id: 7, category: "Bridal", tone: "champagne" },
    { id: 8, category: "Nail",   tone: "espresso" },
    { id: 9, category: "Hair",   tone: "cream" },
    { id: 10, category: "Bridal", tone: "blush" },
    { id: 11, category: "Facial", tone: "champagne" },
    { id: 12, category: "Hair",   tone: "blush" },
  ],

  testimonials: [
    { id: 1, name: "Naima R.", role: "Bride · Dec 2025", quote: "I've never had makeup last twelve hours like this. The trial alone was worth it — they actually listened and didn't redo my face into someone else's." },
    { id: 2, name: "Tahsin A.", role: "Regular client",   quote: "First salon in Dhaka where the haircut booking was on time, the wash was unhurried, and the cut looked the same a month later." },
    { id: 3, name: "Sumaiya K.", role: "Bride · Sept 2025", quote: "Brought my mother and aunt for the engagement and they're both still talking about it. Calm, well-run, and not at all rushed." },
  ],

  faq: [
    { q: "Do I need to book in advance?", a: "Bridal services book out 3–6 months ahead. For everything else, WhatsApp us — we usually have weekday afternoon slots within the week." },
    { q: "Do you take walk-ins?", a: "Yes, for haircuts, threading, and basic mani/pedi on weekday afternoons. Larger services need a booking." },
    { q: "What products do you use?", a: "Skin services use Cosmedix, IS Clinical, and Image Skincare. Hair color is Wella Koleston Perfect and Davines." },
    { q: "Is there parking?", a: "Two spots in front of the building, plus on-street on Road 11 after 6 PM. The Gulshan 2 circle is a 4-minute walk." },
  ],

  reel: {
    src: "", // placeholder — admin uploads MP4
    autoplay: true,
    maxLoops: 2,
  },
};
