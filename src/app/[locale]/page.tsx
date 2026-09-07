import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { IntroBlock } from '@/components/sections/IntroBlock';
import { WorkPreview } from '@/components/sections/WorkPreview';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { CapabilitiesGrid } from '@/components/sections/CapabilitiesGrid';
import { ContactPanel } from '@/components/sections/ContactPanel';
import { HomeExperience } from '@/components/sections/HomeExperience';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <IntroBlock />
      <WorkPreview />
      <HomeExperience />
      <ServicesGrid />
      <CapabilitiesGrid />
      <ContactPanel />
    </>
  );
}
