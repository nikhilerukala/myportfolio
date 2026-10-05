import { resume } from '@/data/resume';
import { Section } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';

export function ImpactStrip() {
  return (
    <Section copy={resume.sections.impact} centered>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resume.impact.map((metric, index) => (
          <li
            key={metric.label}
            data-reveal
            style={{ '--i': index } as React.CSSProperties}
            className="card spotlight group flex flex-col p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow"
          >
            {metric.icon && (
              <span className="icon-tile mb-6 h-11 w-11 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Icon name={metric.icon} />
              </span>
            )}
            <p className="text-gradient font-mono text-3xl font-semibold tracking-tight">{metric.value}</p>
            <p className="mt-2 font-medium">{metric.label}</p>
            <p className="mt-1 text-sm text-muted">{metric.context}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
