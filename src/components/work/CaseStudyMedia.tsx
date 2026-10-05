import Image from 'next/image';
import clsx from 'clsx';
import type { CaseStudyMedia as Media } from '@/data/resume';

/** Landscape shots (wider than 1.5:1) span both columns; portrait phone shots sit side by side. */
const isWide = (item: Media) => item.width / item.height > 1.5;

/** Screenshots via next/image; recordings as muted, user-controlled video (no autoplay). */
export function CaseStudyMedia({ items }: { items: Media[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <figure
          key={item.src}
          className={clsx(
            'group overflow-hidden rounded-2xl border border-border bg-elevated transition-colors duration-300 hover:border-accent',
            isWide(item) && 'md:col-span-2',
          )}
        >
          <div className="bg-surface p-4 sm:p-6">
            {item.kind === 'image' ? (
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes={isWide(item) ? '(min-width: 1100px) 860px, 100vw' : '(min-width: 768px) 420px, 100vw'}
                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
              />
            ) : (
              <video
                controls
                muted
                playsInline
                preload="none"
                poster={item.poster}
                width={item.width}
                height={item.height}
                aria-label={item.alt}
                className="h-auto w-full"
              >
                <source src={item.src} type={item.src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
              </video>
            )}
          </div>
          {item.caption && (
            <figcaption className="border-t border-border p-4 text-sm leading-relaxed text-muted">
              {item.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
