import { Hero } from '@/components/sections/Hero';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { ImpactStrip } from '@/components/sections/ImpactStrip';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <ImpactStrip />
      <SelectedWork />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}
