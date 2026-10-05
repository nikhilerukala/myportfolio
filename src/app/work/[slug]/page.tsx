import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  Layers,
  ListOrdered,
  Lock,
  Network,
  Target,
  TrendingUp,
  UserRound,
  Image as ImageIcon,
  type LucideIcon,
} from 'lucide-react';
import { getCaseStudy, resume } from '@/data/resume';
import { Container } from '@/components/ui/Container';
import { SkillChip } from '@/components/ui/SkillIcon';
import { ArchitectureDiagram } from '@/components/work/ArchitectureDiagram';
import { CaseStudyMedia } from '@/components/work/CaseStudyMedia';
import { ProjectVisual, themeStyles } from '@/components/work/ProjectVisual';
import { ProjectIcon } from '@/components/work/ProjectIcon';

interface Params {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return resume.caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { type: 'article', url: `/work/${study.slug}`, title: study.title, description: study.summary },
  };
}

function Block({
  id,
  title,
  icon: BlockIcon,
  children,
}: {
  id: string;
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-6 border-t border-border py-12 md:grid-cols-[220px_1fr] md:gap-10"
      data-reveal
    >
      <div className="flex items-center gap-3 self-start md:sticky md:top-28">
        <span className="icon-tile h-10 w-10">
          <BlockIcon aria-hidden="true" className="h-5 w-5" />
        </span>
        <h2 id={id} className="text-lg font-semibold">
          {title}
        </h2>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid max-w-prose gap-3 leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <ChevronRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent-ink" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CaseStudyPage({ params }: Params) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const index = resume.caseStudies.indexOf(study);
  const next = resume.caseStudies[(index + 1) % resume.caseStudies.length];
  const theme = themeStyles[study.theme];

  return (
    <article>
      <Container className="pb-12 pt-8 sm:pt-12">
        <nav aria-label="Breadcrumb" className="animate-fade-up">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <li>
              <Link href="/#work" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                Work
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-fg">
              {study.title.split(' — ')[0]}
            </li>
          </ol>
        </nav>

        <header className="mt-10 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="animate-fade-up [animation-delay:100ms]">
            <div className="flex items-center gap-3">
              <span className="icon-tile h-12 w-12" style={{ color: theme.solid, background: theme.soft }}>
                <ProjectIcon name={study.icon} className="h-6 w-6" />
              </span>
              <p className="font-mono text-xs leading-relaxed text-muted">
                {study.company}
                <br />
                {study.period} · {study.role}
              </p>
            </div>
            <h1 className="mt-8 text-[clamp(2.25rem,1.5rem+3.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              {study.title}
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">{study.summary}</p>
          </div>
          <ProjectVisual study={study} className="animate-fade-up shadow-glow [animation-delay:200ms]" />
        </header>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {study.results.slice(0, 4).map((metric, i) => (
            <li
              key={metric.label}
              data-reveal
              style={{ '--i': i } as React.CSSProperties}
              className="card spotlight p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow"
            >
              <p className="text-gradient font-mono text-3xl font-semibold tracking-tight">{metric.value}</p>
              <p className="mt-2 font-medium">{metric.label}</p>
              <p className="mt-1 text-sm text-muted">{metric.context}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          {/* The first image is already the header visual, so the gallery starts from the second. */}
          {study.media.length > 1 && (
            <Block id="screens" title="Screens" icon={ImageIcon}>
              <CaseStudyMedia items={study.media.slice(1)} />
            </Block>
          )}
          <Block id="problem" title="Problem" icon={Target}>
            <p className="max-w-prose text-xl leading-relaxed">{study.problem}</p>
          </Block>

          <Block id="role" title="My role" icon={UserRound}>
            <p className="tag mb-6">{study.role}</p>
            <BulletList items={study.myRole} />
          </Block>

          <Block id="constraints" title="Constraints" icon={Lock}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {study.constraints.map((item) => (
                <li key={item} className="card p-5 text-sm leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </Block>

          <Block id="approach" title="Approach" icon={ListOrdered}>
            <ol className="relative grid max-w-prose gap-6 before:absolute before:bottom-2 before:left-[15px] before:top-2 before:w-px before:bg-border">
              {study.approach.map((step, i) => (
                <li key={step} className="relative grid grid-cols-[32px_1fr] gap-4 leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="z-10 flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs font-semibold text-white"
                    style={{ backgroundImage: 'var(--grad-cta)' }}
                  >
                    {i + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </Block>

          <Block id="architecture" title="Architecture" icon={Network}>
            <ArchitectureDiagram architecture={study.architecture} />
          </Block>

          <Block id="result" title="Result" icon={TrendingUp}>
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {study.results.map((metric) => (
                <li key={metric.label} className="bg-surface p-6">
                  <p className="text-gradient font-mono text-2xl font-semibold tracking-tight">{metric.value}</p>
                  <p className="mt-2 font-medium">{metric.label}</p>
                  <p className="mt-1 text-sm text-muted">{metric.context}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="stack" title="Stack" icon={Layers}>
            <ul className="flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <li key={tech}>
                  <SkillChip name={tech} />
                </li>
              ))}
            </ul>
          </Block>
        </div>

        <nav aria-label="Next case study" className="mt-8">
          <Link
            href={`/work/${next.slug}`}
            className="card spotlight group flex items-center justify-between gap-6 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow sm:p-8"
          >
            <span>
              <span className="eyebrow block">Next case study</span>
              <span className="mt-2 block text-h3 font-semibold">{next.title}</span>
            </span>
            <span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-500 group-hover:rotate-45 group-hover:border-fg group-hover:bg-fg group-hover:text-bg"
            >
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </Link>
        </nav>
      </Container>
    </article>
  );
}
