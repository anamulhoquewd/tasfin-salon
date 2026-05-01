import { getSettings, getServices, getTestimonials, getPortfolio, getReelSettings } from '@/lib/serverData';
import { defaultSettings, defaultReel, defaultServices, defaultTestimonials, defaultPortfolio } from '@/lib/defaults';
import Nav from '@/components/website/Nav';
import Hero from '@/components/website/Hero';
import Intro from '@/components/website/Intro';
import ServicesPreview from '@/components/website/ServicesPreview';
import PortfolioGrid from '@/components/website/PortfolioGrid';
import Testimonials from '@/components/website/Testimonials';
import ContactCTA from '@/components/website/ContactCTA';
import Footer from '@/components/website/Footer';
import WhatsAppFAB from '@/components/website/WhatsAppFAB';

export default async function HomePage() {
  const [settings, services, testimonials, portfolio, reel] = await Promise.all([
    getSettings(), getServices(), getTestimonials(), getPortfolio(), getReelSettings(),
  ]);

  const s = settings || defaultSettings;
  const sv = services || defaultServices;
  const t = testimonials || defaultTestimonials;
  const p = portfolio || defaultPortfolio;
  const r = reel || defaultReel;

  return (
    <>
      <Nav/>
      <main>
        <Hero settings={s} reel={r}/>
        <Intro settings={s}/>
        <ServicesPreview services={sv}/>
        <PortfolioGrid items={p} teaser={true}/>
        <Testimonials testimonials={t}/>
        <ContactCTA settings={s}/>
      </main>
      <Footer settings={s}/>
      <WhatsAppFAB settings={s}/>
    </>
  );
}
