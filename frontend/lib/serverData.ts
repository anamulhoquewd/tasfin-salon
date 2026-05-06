// Server-side data fetching for RSC pages (uses internal API routes directly)

async function fetchJSON(path: string) {
  try {
    const base = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';
    const res = await fetch(`${base}/api${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getSettings() { return fetchJSON('/settings'); }
export async function getServices() { return fetchJSON('/services'); }
export async function getTestimonials() { return fetchJSON('/testimonials'); }
export async function getPortfolio() { return fetchJSON('/portfolio'); }
export async function getFaq() { return fetchJSON('/faq'); }
export async function getReelSettings() { return fetchJSON('/reel'); }
