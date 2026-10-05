import Image from 'next/image';
import clsx from 'clsx';
import { Search } from 'lucide-react';
import type { CaseStudy, ProjectTheme } from '@/data/resume';
import { ProjectIcon } from './ProjectIcon';

export const themeStyles: Record<ProjectTheme, { tint: string; solid: string; soft: string }> = {
  red: { tint: 'from-[#da291c]/[0.07] to-[#da291c]/[0.07]', solid: '#da291c', soft: 'rgb(218 41 28 / 0.1)' },
  crimson: { tint: 'from-[#da291c]/[0.07] to-[#da291c]/[0.07]', solid: '#da291c', soft: 'rgb(218 41 28 / 0.1)' },
  ash: { tint: 'from-stone-100 to-stone-100', solid: '#78716c', soft: 'rgb(120 113 108 / 0.12)' },
};

function Bar({ w, className }: { w: string; className?: string }) {
  return <span className={clsx('block h-2 rounded-full bg-fg/10', className)} style={{ width: w }} />;
}

function ListMock({ solid }: { solid: string }) {
  return (
    <div className="grid gap-2">
      <div className="mb-1 flex items-center gap-2 rounded-lg border border-border bg-bg/60 px-3 py-2">
        <Search className="h-3.5 w-3.5 text-muted" />
        <Bar w="40%" />
      </div>
      {[92, 87, 81, 76].map((score, i) => (
        <div
          key={score}
          className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2 transition-transform duration-500 group-hover:translate-x-1"
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <span className="h-7 w-7 shrink-0 rounded-full" style={{ background: solid, opacity: 1 - i * 0.18 }} />
          <span className="grid flex-1 gap-1.5">
            <Bar w={`${70 - i * 8}%`} className="bg-fg/20" />
            <Bar w={`${45 - i * 5}%`} />
          </span>
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold text-white"
            style={{ background: solid }}
          >
            {score}%
          </span>
        </div>
      ))}
    </div>
  );
}

function KanbanMock({ solid }: { solid: string }) {
  const columns = [3, 2, 2];
  return (
    <div className="grid grid-cols-3 gap-2">
      {columns.map((count, col) => (
        <div key={col} className="grid content-start gap-2 rounded-lg border border-border bg-bg/60 p-2">
          <Bar w="55%" className="bg-fg/20" />
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className={clsx(
                'grid gap-1.5 rounded-md border border-border bg-surface p-2 transition-transform duration-500',
                col === 1 &&
                  i === 0 &&
                  'rotate-[-4deg] shadow-card group-hover:rotate-0 group-hover:translate-x-[-6px]',
              )}
            >
              <span className="h-1.5 w-6 rounded-full" style={{ background: solid, opacity: 1 - col * 0.25 }} />
              <Bar w="85%" />
              <Bar w="60%" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function DashboardMock({ solid }: { solid: string }) {
  const bars = [40, 65, 50, 80, 60, 92, 74];
  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="grid gap-1.5 rounded-lg border border-border bg-surface p-2">
            <Bar w="50%" />
            <span className="h-3 w-3/4 rounded" style={{ background: solid, opacity: 0.85 - i * 0.2 }} />
          </div>
        ))}
      </div>
      <div className="flex h-24 items-end gap-2 rounded-lg border border-border bg-surface p-3">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 origin-bottom rounded-t transition-transform duration-700 group-hover:scale-y-110"
            style={{
              height: `${h}%`,
              background: solid,
              opacity: 0.35 + (h / 100) * 0.65,
              transitionDelay: `${i * 40}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Illustrated UI preview — or the first real screenshot once one is added to `media`. */
export function ProjectVisual({ study, className }: { study: CaseStudy; className?: string }) {
  const theme = themeStyles[study.theme];
  const shot = study.media.find((item) => item.kind === 'image');

  return (
    <div
      aria-hidden="true"
      className={clsx(
        'relative overflow-hidden rounded-xl border border-border bg-gradient-to-br p-4 sm:p-6',
        theme.tint,
        className,
      )}
    >
      {shot ? (
        <div className="relative aspect-[16/10]">
          <Image
            src={shot.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className={clsx(
              'transition-transform duration-700 group-hover:scale-[1.03]',
              // Full-screen UI shots get a framed look; phone mockups on white blend into the tint.
              shot.width / shot.height > 1.5
                ? 'rounded-lg object-cover object-top shadow-card ring-1 ring-border'
                : 'object-contain mix-blend-multiply',
            )}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-bg/70 p-3 shadow-card backdrop-blur transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-[1.02]">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-md text-white"
                style={{ background: theme.solid }}
              >
                <ProjectIcon name={study.icon} className="h-3.5 w-3.5" />
              </span>
              <span className="font-mono text-[11px] text-muted">{study.previewLabel}</span>
            </span>
            <span className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-fg/15" />
              <span className="h-2 w-2 rounded-full bg-fg/15" />
              <span className="h-2 w-2 rounded-full bg-fg/15" />
            </span>
          </div>
          {study.visual === 'list' && <ListMock solid={theme.solid} />}
          {study.visual === 'kanban' && <KanbanMock solid={theme.solid} />}
          {study.visual === 'dashboard' && <DashboardMock solid={theme.solid} />}
        </div>
      )}
    </div>
  );
}
