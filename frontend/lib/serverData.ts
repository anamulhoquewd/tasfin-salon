const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchJSON(path: string) {
  try {
    const res = await fetch(`${API}/api${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getSettings() {
  return fetchJSON('/settings');
}

export async function getServices() {
  return fetchJSON('/services');
}

export async function getTestimonials() {
  return fetchJSON('/testimonials');
}

export async function getPortfolio() {
  return fetchJSON('/portfolio');
}

export async function getFaq() {
  return fetchJSON('/faq');
}

export async function getReelSettings() {
  return fetchJSON('/reel');
}
