import { Gauge, Radio, Zap } from 'lucide-react';
import { resume } from '@/data/resume';

const chipIcons = [Zap, Gauge, Radio];

const tokenPattern =
  /(\/\/.*$)|('[^']*')|\b(import|from|export|function|const|return)\b|(<\/?[A-Z]\w*|\/>)|\b(\d[\d,]*)\b|\b(useVirtualizer|JobBoard)\b/g;

/** Minimal syntax colouring for the decorative snippet. */
function highlight(line: string) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of Array.from(line.matchAll(tokenPattern))) {
    const index = match.index ?? 0;
    if (index > last) parts.push(line.slice(last, index));
    const [text, comment, str, keyword, tag, num] = match;
    const color = comment
      ? '#a8a29e'
      : str
        ? '#fca5a5'
        : keyword
          ? '#f87171'
          : tag
            ? '#fb7185'
            : num
              ? '#fecaca'
              : '#e7e5e4';
    parts.push(
      <span key={index} style={{ color }}>
        {text}
      </span>,
    );
    last = index + text.length;
  }
  if (last < line.length) parts.push(line.slice(last));
  return parts;
}

/** Decorative editor window with floating metric chips. Hidden from assistive tech (all facts appear elsewhere). */
export function HeroCode() {
  const { code, chips } = resume.hero;

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[520px] select-none">
      {/* glow */}
      <div
        className="absolute -inset-6 rounded-[2rem] opacity-60 blur-2xl"
        style={{ backgroundImage: 'var(--grad-cta)' }}
      />

      <div
        className="relative animate-float-slow overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
        style={{ background: 'var(--code-bg)' }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 rounded-md bg-white/5 px-2 py-0.5 font-mono text-xs text-stone-400">
            {code.fileName}
          </span>
        </div>
        <pre className="overflow-hidden px-4 py-5 font-mono text-[12.5px] leading-6 text-stone-300 sm:text-[13px]">
          {code.lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-4 w-5 shrink-0 text-right text-[#8f8984]">{i + 1}</span>
              <code className="whitespace-pre">{highlight(line)}</code>
            </div>
          ))}
          <div className="flex">
            <span className="mr-4 w-5 shrink-0 text-right text-[#8f8984]">{code.lines.length + 1}</span>
            <span className="inline-block h-5 w-2 animate-blink bg-red-500" />
          </div>
        </pre>
      </div>

      {chips.map((chip, i) => {
        const ChipIcon = chipIcons[i % chipIcons.length];
        const position = [
          '-right-2 -top-5 sm:-right-8',
          '-left-3 -bottom-8 sm:-left-10',
          '-bottom-6 right-6 sm:right-10',
        ][i % 3];
        return (
          <div
            key={chip.label}
            className={`absolute ${position} flex animate-float items-center gap-3 rounded-2xl border border-border bg-surface/90 px-3 py-2 shadow-card backdrop-blur-xl`}
            style={{ animationDelay: `${i * -2}s` }}
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-xl text-white"
              style={{ backgroundImage: 'var(--grad-cta)' }}
            >
              <ChipIcon className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block font-mono text-sm font-semibold text-fg">{chip.value}</span>
              <span className="block text-xs text-muted">{chip.label}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
