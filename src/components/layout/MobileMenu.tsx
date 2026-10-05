'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Download, Menu, X } from 'lucide-react';
import type { Link as NavItem } from '@/data/resume';
import { ResumeDownloadLink } from '@/components/ui/ResumeDownloadLink';
import { NavLinks } from './NavLinks';

/** Disclosure menu for small screens: Escape and outside clicks close it, focus returns to the button. */
export function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="icon-btn"
      >
        {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        <span className="sr-only">Menu</span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="absolute inset-x-4 top-[calc(100%+0.5rem)] animate-fade-up rounded-3xl border border-border bg-surface/95 p-3 shadow-card backdrop-blur-xl [animation-duration:300ms] sm:inset-x-6"
      >
        <nav aria-label="Mobile">
          <NavLinks items={items} stacked onNavigate={() => setOpen(false)} />
        </nav>
        <ResumeDownloadLink placement="navbar" className="btn-primary mt-3 w-full">
          <Download aria-hidden="true" className="h-4 w-4" />
          Download Resume
          <span className="sr-only">(PDF)</span>
        </ResumeDownloadLink>
      </div>
    </div>
  );
}
