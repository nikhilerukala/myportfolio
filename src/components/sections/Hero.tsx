import Link from 'next/link';
import { ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { hasGithub, resume } from '@/data/resume';
import { Container } from '@/components/ui/Container';
import { ResumeDownloadLink } from '@/components/ui/ResumeDownloadLink';
import { HeroCode } from './HeroCode';

/** Splits the headline so the highlighted phrase can carry the gradient. */
function Headline({ text, highlight }: { text: string; highlight: string }) {
  const index = text.indexOf(highlight);
  if (index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <span className="text-gradient animate-gradient-pan">{highlight}</span>
      {text.slice(index + highlight.length)}
    </>
  );
}

export function Hero() {
  const { person, hero } = resume;
  const socials = [
    { label: 'LinkedIn', href: person.links.linkedin.href, icon: FaLinkedinIn, external: true },
    ...(hasGithub ? [{ label: 'GitHub', href: person.links.github.href, icon: FaGithub, external: true }] : []),
    { label: `Email ${person.email}`, href: `mailto:${person.email}`, icon: Mail, external: false },
  ];

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16 lg:pt-20">
      <Container className="grid grid-cols-[minmax(0,1fr)] items-center gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <p className="inline-flex animate-fade-up flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-border bg-surface/70 py-1.5 pl-2 pr-4 text-sm text-muted shadow-card backdrop-blur">
            {person.available && (
              <span className="relative ml-1 flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
              </span>
            )}
            <span className="font-medium text-fg">{person.availability}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
              {person.location}
            </span>
          </p>

          <h1 id="hero-heading" className="mt-8">
            <span className="block animate-fade-up text-lg font-medium text-muted [animation-delay:80ms] sm:text-xl">
              {hero.greeting}
            </span>
            <span className="mt-4 block max-w-[16ch] animate-fade-up text-display font-semibold [animation-delay:160ms]">
              <Headline text={person.headline} highlight={hero.highlight} />
            </span>
          </h1>

          <p className="mt-8 max-w-prose animate-fade-up text-lg leading-relaxed text-muted [animation-delay:240ms]">
            {person.intro}
          </p>

          <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:320ms]">
            <ResumeDownloadLink placement="hero" className="btn-primary group h-12 px-6">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
              <Download aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              {hero.primaryCta}
              <span className="sr-only">(PDF)</span>
            </ResumeDownloadLink>
            <Link href={hero.secondaryCta.href} className="btn-secondary group h-12 px-6">
              {hero.secondaryCta.label}
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <ul className="flex items-center gap-2 sm:ml-2" aria-label="Profiles">
              {socials.map(({ label, href, icon: SocialIcon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="icon-btn"
                    {...(external ? { target: '_blank', rel: 'me noopener noreferrer' } : {})}
                  >
                    <SocialIcon aria-hidden="true" className="h-4 w-4" />
                    <span className="sr-only">
                      {label}
                      {external && ' (opens in a new tab)'}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <dl className="mt-12 grid max-w-lg animate-fade-up grid-cols-3 gap-4 border-t border-border pt-8 [animation-delay:400ms]">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="text-xs leading-snug text-muted sm:text-sm">{stat.label}</dt>
                <dd className="order-first font-mono text-2xl font-semibold tracking-tight sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-up px-4 [animation-delay:300ms] sm:px-8 lg:px-0">
          <HeroCode />
        </div>
      </Container>
    </section>
  );
}
