import Link from 'next/link';
import { Download } from 'lucide-react';
import { resume } from '@/data/resume';
import { ResumeDownloadLink } from '@/components/ui/ResumeDownloadLink';
import { NavLinks } from './NavLinks';
import { MobileMenu } from './MobileMenu';

export function SiteHeader() {
  const { person, nav } = resume;
  const items = [...nav, { label: 'Resume', href: '/resume' }];

  return (
    <header className="no-print fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-content items-center gap-4 rounded-full border border-border bg-surface/70 py-2 pl-2 pr-2 shadow-card backdrop-blur-xl sm:pl-3">
        <Link href="/" className="group mr-auto flex items-center gap-3 rounded-full pr-2">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full font-mono text-sm font-bold text-white shadow-glow transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-105"
            style={{ backgroundImage: 'var(--grad-cta)' }}
          >
            NE
          </span>
          <span className="font-semibold tracking-tight">
            {person.name}
            <span className="sr-only">, home</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <NavLinks items={items} />
        </nav>

        <div className="flex items-center gap-2">
          <ResumeDownloadLink placement="navbar" className="btn-primary hidden min-h-[40px] px-4 sm:inline-flex">
            <Download aria-hidden="true" className="h-4 w-4" />
            Resume
            <span className="sr-only">(PDF download)</span>
          </ResumeDownloadLink>
          <MobileMenu items={items} />
        </div>
      </div>
    </header>
  );
}
