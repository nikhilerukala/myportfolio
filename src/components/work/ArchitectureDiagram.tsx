import { ArrowDown, Cpu, Database, Monitor, Server, ShieldCheck, type LucideIcon } from 'lucide-react';
import type { CaseStudy } from '@/data/resume';

/** Picks a layer icon from its label so the data stays plain strings. */
function layerIcon(label: string): LucideIcon {
  const key = label.toLowerCase();
  if (key.includes('client')) return Monitor;
  if (key.includes('auth')) return ShieldCheck;
  if (key.includes('data')) return Database;
  if (key.includes('ai')) return Cpu;
  return Server;
}

/**
 * Layered architecture diagram built from data, not an image — crisp, themeable,
 * and read by screen readers as nested lists.
 */
export function ArchitectureDiagram({ architecture }: { architecture: CaseStudy['architecture'] }) {
  return (
    <figure className="card overflow-hidden p-4 sm:p-6">
      <ol aria-label="Architecture layers, top to bottom" className="grid">
        {architecture.layers.map((layer, index) => {
          const LayerIcon = layerIcon(layer.label);
          return (
            <li key={layer.label}>
              {index > 0 && (
                <div aria-hidden="true" className="flex justify-center py-2 text-accent-ink">
                  <ArrowDown className="h-5 w-5 animate-bounce motion-reduce:animate-none" />
                </div>
              )}
              <div className="grid gap-4 rounded-xl border border-border bg-elevated p-4 sm:grid-cols-[140px_1fr] sm:items-center">
                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                    style={{ backgroundImage: 'var(--grad-cta)' }}
                  >
                    <LayerIcon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  {layer.label}
                </p>
                <ul className="grid gap-2 sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                  {layer.nodes.map((node) => (
                    <li
                      key={node.name}
                      className="rounded-lg border border-border bg-surface px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-control hover:shadow-card"
                    >
                      <span className="block font-mono text-sm font-semibold">{node.name}</span>
                      <span className="mt-1 block text-sm text-muted">{node.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-4 text-sm leading-relaxed text-muted">{architecture.caption}</figcaption>
    </figure>
  );
}
