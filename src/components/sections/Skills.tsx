import { resume } from '@/data/resume';
import { Section } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';
import { SkillChip } from '@/components/ui/SkillIcon';

export function Skills() {
  return (
    <Section copy={resume.sections.skills}>
      <div className="grid gap-4 md:grid-cols-2">
        {resume.skills.map((group, index) => (
          <section
            key={group.id}
            aria-labelledby={`skills-${group.id}`}
            data-reveal
            style={{ '--i': index } as React.CSSProperties}
            className="card spotlight group p-6 transition-all duration-500 hover:shadow-glow sm:p-8"
          >
            <div className="flex items-start gap-4">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-glow transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                style={{ backgroundImage: 'var(--grad-cta)' }}
              >
                <Icon name={group.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 id={`skills-${group.id}`} className="text-h3 font-semibold">
                  {group.label}
                </h3>
                <p className="mt-1 text-sm text-muted">{group.blurb}</p>
              </div>
              <span aria-hidden="true" className="ml-auto font-mono text-xs text-muted">
                {String(group.items.length).padStart(2, '0')}
              </span>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item}>
                  <SkillChip name={item} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}
