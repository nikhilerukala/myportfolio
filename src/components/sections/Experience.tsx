import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Building2, CalendarDays, CircleCheck, MapPin, Plus } from 'lucide-react';
import { resume } from '@/data/resume';
import { Section } from '@/components/ui/Section';
import { SkillIcon } from '@/components/ui/SkillIcon';

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <CircleCheck aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent-ink" />
      <span>{children}</span>
    </li>
  );
}

/** Timeline with ≤3 bullets visible; the rest sit behind a native <details> (no JS needed). */
export function Experience() {
  return (
    <Section copy={resume.sections.experience}>
      <ol className="relative grid gap-8 before:absolute before:bottom-0 before:left-6 before:top-0 before:w-px before:bg-gradient-to-b before:from-accent before:via-border before:to-transparent">
        {resume.experience.map((job, index) => (
          <li
            key={job.id}
            data-reveal
            style={{ '--i': index } as React.CSSProperties}
            className="relative pl-16 sm:pl-20"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-6 flex h-12 w-12 items-center justify-center rounded-2xl font-mono text-sm font-bold text-white shadow-glow ring-4 ring-bg"
              style={{ backgroundImage: 'var(--grad-cta)' }}
            >
              {job.initials}
            </span>

            <article className="card spotlight p-6 transition-all duration-500 hover:border-accent hover:shadow-glow sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-h3 font-semibold">{job.role}</h3>
                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 aria-hidden="true" className="h-4 w-4" />
                      {job.company}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin aria-hidden="true" className="h-4 w-4" />
                      {job.location}
                    </span>
                  </p>
                </div>
                <p className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border bg-elevated px-3 py-1 font-mono text-xs text-muted">
                  <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
                  <time dateTime={job.startISO}>{job.start}</time>
                  <span aria-hidden="true">—</span>
                  <span className="sr-only">to</span>
                  <time dateTime={job.endISO}>{job.end}</time>
                </p>
              </div>

              <ul className="mt-6 grid max-w-prose gap-3 leading-relaxed">
                {job.highlights.map((point) => (
                  <Bullet key={point}>{point}</Bullet>
                ))}
              </ul>

              {(() => {
                const study = resume.caseStudies.find((item) => item.company === job.company && item.media.length > 0);
                if (!study) return null;
                return (
                  <div className="mt-6">
                    <ul className="grid grid-cols-3 gap-3" aria-label={`${study.title.split(' — ')[0]} screens`}>
                      {study.media.slice(0, 3).map((shot) => (
                        <li
                          key={shot.src}
                          className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-elevated transition-colors duration-300 hover:border-accent"
                        >
                          <Image
                            src={shot.src}
                            alt={shot.alt}
                            fill
                            sizes="(min-width: 768px) 260px, 30vw"
                            className={
                              shot.width / shot.height > 1.5
                                ? 'object-cover object-top'
                                : 'object-contain p-2 mix-blend-multiply'
                            }
                          />
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/work/${study.slug}`}
                      className="group mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-accent-ink"
                    >
                      View all {study.media.length} screens in the case study
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                );
              })()}

              {job.more.length > 0 && (
                <details className="group mt-4 max-w-prose">
                  <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center gap-2 rounded-full text-sm font-semibold text-accent-ink [&::-webkit-details-marker]:hidden">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current transition-transform duration-300 group-open:rotate-45">
                      <Plus aria-hidden="true" className="h-3.5 w-3.5" />
                    </span>
                    <span className="group-open:hidden">Show {job.more.length} more</span>
                    <span className="hidden group-open:inline">Show less</span>
                  </summary>
                  <ul className="mt-3 grid animate-fade-up gap-3 leading-relaxed [animation-duration:400ms]">
                    {job.more.map((point) => (
                      <Bullet key={point}>{point}</Bullet>
                    ))}
                  </ul>
                </details>
              )}

              <ul aria-label="Technologies used" className="mt-6 flex flex-wrap gap-2 border-t border-border pt-6">
                {job.stack.map((tech) => (
                  <li key={tech} className="tag">
                    <SkillIcon name={tech} className="h-3.5 w-3.5" />
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
