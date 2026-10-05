'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import type { Link as NavItem } from '@/data/resume';

interface NavLinksProps {
  items: NavItem[];
  /** Vertical list for the mobile menu. */
  stacked?: boolean;
  onNavigate?: () => void;
}

export function NavLinks({ items, stacked = false, onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={clsx('flex', stacked ? 'flex-col gap-1' : 'items-center gap-1')}>
      {items.map((item) => {
        const isRoute = !item.href.includes('#');
        const active = isRoute && (pathname === item.href || pathname.startsWith(`${item.href}/`));

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={clsx(
                'relative inline-flex min-h-[40px] items-center rounded-full px-4 text-sm font-medium transition-colors',
                stacked && 'w-full min-h-[48px] text-base',
                active ? 'bg-fg text-bg' : 'text-muted hover:bg-elevated hover:text-fg',
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
