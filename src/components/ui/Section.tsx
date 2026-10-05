import type { SectionCopy } from '@/data/resume';
import { Container } from './Container';

interface SectionProps {
  copy: SectionCopy;
  children: React.ReactNode;
  /** Centre the heading block (used for shorter sections). */
  centered?: boolean;
}

export function Section({ copy, children, centered = false }: SectionProps) {
  const headingId = `${copy.id}-heading`;

  return (
    <section id={copy.id} aria-labelledby={headingId} className="relative py-20 sm:py-28">
      <Container>
        <header
          data-reveal
          className={
            centered
              ? 'mx-auto mb-12 flex max-w-2xl flex-col items-center text-center sm:mb-16'
              : 'mb-12 grid gap-6 sm:mb-16 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12'
          }
        >
          <div className={centered ? 'flex flex-col items-center' : undefined}>
            <p className="kicker">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              {copy.eyebrow}
            </p>
            <h2 id={headingId} className="mt-4 text-h2 font-semibold">
              {copy.title}
            </h2>
          </div>
          {copy.intro && (
            <p className={`max-w-prose text-lg leading-relaxed text-muted ${centered ? 'mt-4' : ''}`}>{copy.intro}</p>
          )}
        </header>
        {children}
      </Container>
    </section>
  );
}
