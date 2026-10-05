import clsx from 'clsx';
import { resume } from '@/data/resume';
import { Container } from '@/components/ui/Container';
import { SkillIcon } from '@/components/ui/SkillIcon';

/** One continuously moving row. The duplicate copy makes the loop seamless and is hidden from assistive tech. */
function Row({ tools, reverse = false }: { tools: string[]; reverse?: boolean }) {
  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-4 pr-4">
      {tools.map((tool) => (
        <li
          key={tool}
          className="flex items-center gap-3 whitespace-nowrap rounded-2xl border border-border bg-surface px-5 py-3 text-base font-medium text-fg shadow-card transition-colors duration-300 hover:border-accent"
        >
          <SkillIcon name={tool} className="h-6 w-6" />
          {tool}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee-mask flex overflow-hidden">
      <div className={clsx('flex', reverse ? 'animate-marquee-reverse' : 'animate-marquee')}>
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}

/** Boxed tool showcase: every skill, split across two rows moving in opposite directions. */
export function TechMarquee() {
  const tools = Array.from(new Set(resume.skills.flatMap((group) => group.items)));
  const half = Math.ceil(tools.length / 2);

  return (
    <section aria-labelledby="tools-heading" className="py-8">
      <Container>
        <div className="card overflow-hidden bg-elevated py-8">
          <h2 id="tools-heading" className="eyebrow mb-6 text-center">
            {resume.hero.marqueeLabel}
          </h2>
          <div className="grid gap-4">
            <Row tools={tools.slice(0, half)} />
            <Row tools={tools.slice(half)} reverse />
          </div>
        </div>
      </Container>
    </section>
  );
}
