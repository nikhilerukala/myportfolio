import Link from 'next/link';
import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';
import { resume } from '@/data/resume';
import { Section } from '@/components/ui/Section';
import { SkillIcon } from '@/components/ui/SkillIcon';
import { ProjectVisual, themeStyles } from '@/components/work/ProjectVisual';
import { ProjectIcon } from '@/components/work/ProjectIcon';

export function SelectedWork() {
  return (
    <Section copy={resume.sections.work}>
      <ul className="grid gap-6 lg:grid-cols-2">
        {resume.caseStudies.map((study, index) => {
          const featured = index === 0;
          const theme = themeStyles[study.theme];

          return (
            <li
              key={study.slug}
              data-reveal
              style={{ '--i': index } as React.CSSProperties}
              className={clsx(featured && 'lg:col-span-2')}
            >
              {/* Whole card is clickable through the title link's ::after. */}
              <article
                className={clsx(
                  'card spotlight group grid h-full gap-6 overflow-hidden p-4 transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-glow sm:p-6',
                  featured && 'lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-10 lg:p-8',
                  'has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent',
                )}
              >
                <ProjectVisual study={study} className={clsx(featured && 'lg:order-last')} />

                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className="icon-tile h-10 w-10" style={{ color: theme.solid, background: theme.soft }}>
                      <ProjectIcon name={study.icon} />
                    </span>
                    <p className="font-mono text-xs text-muted">
                      {study.company.split(' (')[0]}
                      <br />
                      {study.period}
                    </p>
                  </div>

                  <h3
                    className={clsx(
                      'mt-6 font-semibold',
                      featured
                        ? 'text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-[1.1] tracking-[-0.03em]'
                        : 'text-h3',
                    )}
                  >
                    <Link
                      href={`/work/${study.slug}`}
                      className="after:absolute after:inset-0 after:z-10 after:rounded-2xl focus-visible:outline-none"
                    >
                      {study.title}
                    </Link>
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">{study.summary}</p>

                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-border pt-6">
                    <p>
                      <span className="text-gradient block font-mono text-3xl font-semibold tracking-tight">
                        {study.keyMetric.value}
                      </span>
                      <span className="mt-1 block text-sm text-muted">{study.keyMetric.label}</span>
                    </p>
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-elevated transition-all duration-500 group-hover:rotate-45 group-hover:border-fg group-hover:bg-fg group-hover:text-bg"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>

                  <ul aria-label="Key technologies" className="mt-6 flex flex-wrap gap-2">
                    {study.stack.slice(0, featured ? 6 : 4).map((tech) => (
                      <li key={tech} className="tag">
                        <SkillIcon name={tech} className="h-3.5 w-3.5" />
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
