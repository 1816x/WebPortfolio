import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { IntroBlock } from '@/components/sections/IntroBlock';
import { Ticker } from '@/components/motion/Ticker';
import { WorkPreview } from '@/components/sections/WorkPreview';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { CapabilitiesGrid } from '@/components/sections/CapabilitiesGrid';
import { ContactPanel } from '@/components/sections/ContactPanel';
import { site } from '@/content/site';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as 'en' | 'es';
  const tickerItems = [...site.services.map((s) => s.title[loc].toUpperCase()), 'DIRECTA.MX'];

  return (
    <>
      <Hero />
      <IntroBlock />
      <Ticker items={tickerItems} />
      <WorkPreview />
      <ServicesGrid />
      <CapabilitiesGrid />
      <ContactPanel />
    </>
  );
}
