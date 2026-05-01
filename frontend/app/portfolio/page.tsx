'use client';

import { useEffect, useState } from 'react';
import Nav from '@/components/website/Nav';
import Footer from '@/components/website/Footer';
import WhatsAppFAB from '@/components/website/WhatsAppFAB';
import PortfolioGrid from '@/components/website/PortfolioGrid';
import { defaultSettings, defaultPortfolio } from '@/lib/defaults';
import { api } from '@/lib/api';
import type { PortfolioItem, Settings } from '@/lib/types';

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(defaultPortfolio);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    api.get('/portfolio').then(r => setPortfolio(r.data)).catch(() => {});
    api.get('/settings').then(r => setSettings(r.data)).catch(() => {});
  }, []);

  return (
    <>
      <Nav/>
      <main>
        <PortfolioGrid items={portfolio}/>
      </main>
      <Footer settings={settings}/>
      <WhatsAppFAB settings={settings}/>
    </>
  );
}
