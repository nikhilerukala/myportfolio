import Link from 'next/link';
import { ArrowUp, Download, Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { hasGithub, resume } from '@/data/resume';
import { Container } from '@/components/ui/Container';
import { ResumeDownloadLink } from '@/components/ui/ResumeDownloadLink';

export function SiteFooter() {
  const { person, nav } = resume;
  const year = new Date().getFullYear();
  const socials = [
    { label: 'LinkedIn', href: person.links.linkedin.href, icon: FaLinkedinIn },
    ...(hasGithub ? [{ label: 'GitHub', href: person.links.github.href, icon: FaGithub }] : []),
  ];

  return (
    <footer className="no-print relative mt-12 border-t border-border bg-surface/50 backdrop-blur">
      <Container className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="flex items-center gap-3 font-semibold">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full font-mono text-sm font-bold text-white"
                style={{ backgroundImage: 'var(--grad-cta)' }}
              >
                NE
              </span>
              {person.name}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {person.title} · {person.location}. {person.availability}.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={`mailto:${person.email}`} className="icon-btn">
                <Mail aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">Email {person.email}</span>
              </a>
              {socials.map(({ label, href, icon: SocialIcon }) => (
                <a key={label} href={href} target="_blank" rel="me noopener noreferrer" className="icon-btn">
                  <SocialIcon aria-hidden="true" className="h-4 w-4" />
                  <span className="sr-only">{label} (opens in a new tab)</span>
                </a>
              ))}
              <ResumeDownloadLink placement="footer" className="btn-secondary h-11">
                <Download aria-hidden="true" className="h-4 w-4" />
                Resume <span className="sr-only">(PDF download)</span>
              </ResumeDownloadLink>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow">Navigate</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
              {[...nav, { label: 'Resume', href: '/resume' }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {person.name}. Built with Next.js, TypeScript & Tailwind CSS.
          </p>
          <a href="#main" className="group inline-flex items-center gap-2 transition-colors hover:text-fg">
            Back to top
            <ArrowUp aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
