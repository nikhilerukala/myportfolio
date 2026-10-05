import { ArrowUpRight, Mail, MapPin, Plane } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { hasGithub, resume } from '@/data/resume';
import { Section } from '@/components/ui/Section';
import { ContactForm } from './ContactForm';

export function Contact() {
  const { person } = resume;
  const strip = (href: string) => href.replace(/^https?:\/\/(www\.)?/, '');

  const channels = [
    { label: 'Email', value: person.email, href: `mailto:${person.email}`, icon: Mail, external: false },
    {
      label: person.links.linkedin.label,
      value: strip(person.links.linkedin.href),
      href: person.links.linkedin.href,
      icon: FaLinkedinIn,
      external: true,
    },
    ...(hasGithub
      ? [
          {
            label: person.links.github.label,
            value: strip(person.links.github.href),
            href: person.links.github.href,
            icon: FaGithub,
            external: true,
          },
        ]
      : []),
  ];

  return (
    <Section copy={resume.sections.contact}>
      <div className="card relative overflow-hidden p-2 sm:p-3">
        {/* soft brand glow behind the panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full opacity-30 blur-3xl"
          style={{ backgroundImage: 'var(--grad-cta)' }}
        />

        <div className="relative grid grid-cols-[minmax(0,1fr)] gap-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div className="flex flex-col gap-3 rounded-xl bg-elevated p-6 sm:p-8" data-reveal>
            <ul className="grid grid-cols-[minmax(0,1fr)] gap-3">
              {channels.map(({ label, value, href, icon: ChannelIcon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-control hover:shadow-card"
                    {...(external ? { target: '_blank', rel: 'me noopener noreferrer' } : {})}
                  >
                    <span className="icon-tile h-11 w-11 transition-transform duration-300 group-hover:scale-110">
                      <ChannelIcon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="eyebrow block">{label}</span>
                      <span className="mt-0.5 block truncate font-medium">{value}</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                    />
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto grid gap-3 rounded-xl border border-dashed border-border p-4 text-sm">
              <p className="flex items-center gap-3">
                <MapPin aria-hidden="true" className="h-4 w-4 text-accent-ink" />
                {person.location}
              </p>
              <p className="flex items-center gap-3">
                <Plane aria-hidden="true" className="h-4 w-4 text-accent-ink" />
                {person.availability}
              </p>
            </div>
          </div>

          <div className="rounded-xl p-6 sm:p-8" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
            <ContactForm fallbackEmail={person.email} />
          </div>
        </div>
      </div>
    </Section>
  );
}
