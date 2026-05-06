import bcrypt from "bcryptjs";
import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./db.js";
import Booking from "./models/Booking.js";
import Faq from "./models/Faq.js";
import Portfolio from "./models/Portfolio.js";
import ReelSettings from "./models/ReelSettings.js";
import Service from "./models/Service.js";
import Settings from "./models/Settings.js";
import Testimonial from "./models/Testimonial.js";
import User from "./models/User.js";

async function seed() {
  await connectDB();
  console.log("Seeding database...");

  // Super admin
  const existing = await User.findOne({ email: "anam@tasfin.com" });
  if (!existing) {
    const hashed = await bcrypt.hash("tasfin2026", 10);
    await User.create({
      email: "anam@tasfin.com",
      password: hashed,
      name: "Naima R.",
      role: "super_admin",
    });
    console.log("Created super admin: anam@tasfin.com / tasfin2026");
  } else {
    console.log("Super admin already exists");
  }

  // Settings
  const settingsCount = await Settings.countDocuments();
  if (settingsCount === 0) {
    await Settings.create({
      hero: {
        salonName: "TASFIN",
        eyebrow: "Dhaka · Est. 2024",
        slogan:
          "Bridal artistry, considered skincare, and the kind of haircut you actually wanted.",
        primaryCta: "Book appointment",
        secondaryCta: "WhatsApp now",
      },
      intro: {
        title: "Slow, careful, and always on time.",
        body: "A small studio in Gulshan, run by senior stylists who take their time. Slow, careful, and always on time — walk in tired, walk out yourself.",
      },
      whatsapp: "+8801975024262",
      phone: "+880 1975 024 262",
      email: "hello@tasfin.com",
      address: "House 41, Road 10/2, Block F, South Banasree, Dhaka 1212",
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      established: "Est. 2024 · Dhaka",
      hours: [
        { day: "Sun - Thu", time: "10:00 — 20:00" },
        { day: "Friday", time: "14:00 — 21:00" },
        { day: "Saturday", time: "10:00 — 20:00" },
      ],
    });
    console.log("Created settings");
  }

  // Reel settings
  const reelCount = await ReelSettings.countDocuments();
  if (reelCount === 0) {
    await ReelSettings.create({
      src: "https://www.youtube.com/shorts/JKW8pnu2CZg?feature=share",
      autoplay: true,
      maxLoops: 2,
    });
    console.log("Created reel settings");
  }

  // Services
  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany([
      {
        name: "Bridal Makeup",
        category: "Bridal",
        icon: "sparkles",
        duration: "2 hr 30 min",
        price: "৳ 18,500",
        desc: "A two-pass HD finish for your wedding day, with skin prep, lashes, and a hair set tailored to your saree or lehenga.",
        order: 1,
      },
      {
        name: "Engagement Look",
        category: "Bridal",
        icon: "heart",
        duration: "1 hr 45 min",
        price: "৳ 8,500",
        desc: "Softer, brighter, photo-ready. Includes a complimentary skin consult before the day.",
        order: 2,
      },
      {
        name: "Haircut & Style",
        category: "Hair",
        icon: "scissors",
        duration: "1 hr",
        price: "৳ 2,500",
        desc: "A real consultation, a real cut. Wash, cut, and finish with a senior stylist.",
        order: 3,
      },
      {
        name: "Hair Color",
        category: "Hair",
        icon: "palette",
        duration: "2 hr – 4 hr",
        price: "৳ 6,500 – 14,500",
        desc: "Single tone, balayage, or correction. We patch-test and book a follow-up gloss four weeks out.",
        order: 4,
      },
      {
        name: "Signature Facial",
        category: "Facial",
        icon: "leaf",
        duration: "1 hr 15 min",
        price: "৳ 4,800",
        desc: "Cleanse, exfoliate, mask, and massage with cosmeceutical-grade products. Calming, not aggressive.",
        order: 5,
      },
      {
        name: "Hydra-glow",
        category: "Facial",
        icon: "droplet",
        duration: "1 hr",
        price: "৳ 6,200",
        desc: "Hydradermabrasion for clear, dewy skin before an event or shoot. Zero downtime.",
        order: 6,
      },
      {
        name: "Full-body Wax",
        category: "Wax",
        icon: "flame",
        duration: "1 hr 30 min",
        price: "৳ 3,800",
        desc: "Warm wax, fast and gentle. Includes underarm and bikini line.",
        order: 7,
      },
      {
        name: "Mani-pedi",
        category: "Nail",
        icon: "hand",
        duration: "1 hr 15 min",
        price: "৳ 2,800",
        desc: "Soak, shape, cuticle care, and a long-wear gel finish in your choice of palette.",
        order: 8,
      },
      {
        name: "Nail Art",
        category: "Nail",
        icon: "sparkles",
        duration: "45 min",
        price: "৳ 1,800",
        desc: "Hand-painted designs, French tips, or chrome — added on to any mani.",
        order: 9,
      },
      {
        name: "Threading",
        category: "Wax",
        icon: "minus",
        duration: "20 min",
        price: "৳ 600",
        desc: "Brow shaping, upper lip, or full face.",
        order: 10,
      },
    ]);
    console.log("Created 10 services");
  }

  // Testimonials
  const testCount = await Testimonial.countDocuments();
  if (testCount === 0) {
    await Testimonial.insertMany([
      {
        name: "Naima R.",
        role: "Bride · Dec 2025",
        quote:
          "I've never had makeup last twelve hours like this. The trial alone was worth it — they actually listened and didn't redo my face into someone else's.",
        order: 1,
      },
      {
        name: "Tahsin A.",
        role: "Regular client",
        quote:
          "First salon in Dhaka where the haircut booking was on time, the wash was unhurried, and the cut looked the same a month later.",
        order: 2,
      },
      {
        name: "Sumaiya K.",
        role: "Bride · Sept 2025",
        quote:
          "Brought my mother and aunt for the engagement and they're both still talking about it. Calm, well-run, and not at all rushed.",
        order: 3,
      },
    ]);
    console.log("Created 3 testimonials");
  }

  // Portfolio
  const portCount = await Portfolio.countDocuments();
  if (portCount === 0) {
    await Portfolio.insertMany([
      { category: "Bridal", tone: "blush", order: 1 },
      { category: "Bridal", tone: "champagne", order: 2 },
      { category: "Hair", tone: "espresso", order: 3 },
      { category: "Hair", tone: "blush", order: 4 },
      { category: "Facial", tone: "cream", order: 5 },
      { category: "Nail", tone: "blush", order: 6 },
      { category: "Bridal", tone: "champagne", order: 7 },
      { category: "Nail", tone: "espresso", order: 8 },
      { category: "Hair", tone: "cream", order: 9 },
      { category: "Bridal", tone: "blush", order: 10 },
      { category: "Facial", tone: "champagne", order: 11 },
      { category: "Hair", tone: "blush", order: 12 },
    ]);
    console.log("Created 12 portfolio items");
  }

  // FAQs
  const faqCount = await Faq.countDocuments();
  if (faqCount === 0) {
    await Faq.insertMany([
      {
        question: "Do I need to book in advance?",
        answer:
          "Bridal services book out 3–6 months ahead. For everything else, WhatsApp us — we usually have weekday afternoon slots within the week.",
        order: 1,
      },
      {
        question: "Do you take walk-ins?",
        answer:
          "Yes, for haircuts, threading, and basic mani/pedi on weekday afternoons. Larger services need a booking.",
        order: 2,
      },
      {
        question: "What products do you use?",
        answer:
          "Skin services use Cosmedix, IS Clinical, and Image Skincare. Hair color is Wella Koleston Perfect and Davines.",
        order: 3,
      },
      {
        question: "Is there parking?",
        answer:
          "Two spots in front of the building, plus on-street on Road 11 after 6 PM. The Gulshan 2 circle is a 4-minute walk.",
        order: 4,
      },
    ]);
    console.log("Created 4 FAQs");
  }

  // Sample bookings with dates spread over last 30 days
  const bookingCount = await Booking.countDocuments();
  if (bookingCount === 0) {
    const sampleBookings = [];
    const channels: Array<"WhatsApp" | "Form" | "Walk-in"> = [
      "WhatsApp",
      "WhatsApp",
      "WhatsApp",
      "Form",
      "Walk-in",
    ];
    const statuses: Array<"confirmed" | "pending"> = [
      "confirmed",
      "confirmed",
      "confirmed",
      "pending",
    ];
    const serviceNames = [
      "Bridal Makeup",
      "Hair Color",
      "Signature Facial",
      "Mani-pedi",
      "Threading",
      "Haircut & Style",
      "Engagement Look",
    ];
    const clientNames = [
      "Naima Rahman",
      "Tahsin Akter",
      "Sumaiya Khan",
      "Farzana B.",
      "Nadia H.",
      "Ayesha M.",
      "Reema K.",
      "Nusrat J.",
      "Lubna R.",
    ];

    for (let i = 0; i < 45; i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      sampleBookings.push({
        clientName: clientNames[i % clientNames.length],
        phone: `+880 17${Math.floor(10000000 + Math.random() * 89999999)}`,
        service: serviceNames[i % serviceNames.length],
        date: date.toISOString().split("T")[0],
        time: `${10 + (i % 9)}:00`,
        duration: "1h",
        status: statuses[i % statuses.length],
        channel: channels[i % channels.length],
        price: `৳ ${(2000 + i * 1500) % 20000}`,
        createdAt: date,
      });
    }
    // Add 3 recent pending inbox entries
    const now = new Date();
    sampleBookings.push({
      clientName: "Naima Rahman",
      phone: "+880 1711 234 567",
      service: "Bridal Makeup",
      date: "2026-05-09",
      time: "11:00",
      duration: "3h",
      status: "pending",
      channel: "WhatsApp",
      price: "৳ 18,500",
      rawMessage:
        "Assalamu alaikum! Ami May 9 e bridal makeup korate chai. Time 11 AM. Dhonnobad.",
      parseConfidence: 0.94,
      autoReply:
        "Walaikum assalam Naima Apu! 9 May, 11 AM e Bridal Makeup confirm korte parchi.",
      createdAt: new Date(now.getTime() - 2 * 60000),
    });
    sampleBookings.push({
      clientName: "Tahsin Akter",
      phone: "+880 1722 555 401",
      service: "Hair Color · Balayage",
      date: "2026-05-06",
      time: "16:30",
      duration: "1h 30m",
      status: "pending",
      channel: "WhatsApp",
      price: "৳ 6,500",
      rawMessage:
        "Hi, hair color appointment chai Wednesday afternoon. Around 4-5 pm hole valo. Balayage, medium length.",
      parseConfidence: 0.88,
      autoReply:
        "Hi Tahsin! 6 May Wednesday 4:30 PM e Balayage er jonno slot ache. Confirm korbo?",
      createdAt: new Date(now.getTime() - 14 * 60000),
    });
    sampleBookings.push({
      clientName: "Sumaiya Khan",
      phone: "+880 1733 901 122",
      service: "Bridal Trial",
      date: "2026-05-05",
      time: "12:00",
      duration: "2h",
      status: "pending",
      channel: "Form",
      price: "৳ 5,000",
      rawMessage:
        "Form submission · service: Bridal Trial · preferred: Tue 5 May, 12:00 PM",
      parseConfidence: 1.0,
      autoReply: "Hi Sumaiya! Bridal Trial confirmed for Tue 5 May, 12 PM.",
      createdAt: new Date(now.getTime() - 32 * 60000),
    });

    await Booking.insertMany(sampleBookings);
    console.log(`Created ${sampleBookings.length} sample bookings`);
  }

  console.log("Seed complete!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
