import type { IconType } from 'react-icons';
import {
  SiAnthropic,
  SiAntdesign,
  SiClaude,
  SiCss,
  SiExpress,
  SiGit,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiReactquery,
  SiRedux,
  SiShadcnui,
  SiTailwindcss,
  SiTurborepo,
  SiTypescript,
  SiVite,
  SiWebpack,
} from 'react-icons/si';
import { TbApi, TbBrandOpenai } from 'react-icons/tb';
import {
  Accessibility,
  Atom,
  Boxes,
  CodeXml,
  KeyRound,
  MessageSquareText,
  Radio,
  Rows3,
  Share2,
  ShieldCheck,
  Sparkles,
  Split,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react';

interface Entry {
  icon: IconType | LucideIcon;
  /** Brand colour; omitted for monochrome marks, which follow the text colour. */
  color?: string;
}

const react: Entry = { icon: SiReact, color: '#149ECA' };
const claude: Entry = { icon: SiClaude, color: '#D97757' };
const openai: Entry = { icon: TbBrandOpenai };
const express: Entry = { icon: SiExpress };
const prisma: Entry = { icon: SiPrisma };

/** Skill label (as written in resume.ts) → icon. Unknown labels fall back to a code glyph. */
const registry: Record<string, Entry> = {
  'React.js': react,
  'React 18': react,
  'React Hooks': { icon: Atom, color: '#149ECA' },
  'Next.js': { icon: SiNextdotjs },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  'JavaScript (ES6+)': { icon: SiJavascript, color: '#E5B800' },
  JavaScript: { icon: SiJavascript, color: '#E5B800' },
  HTML5: { icon: SiHtml5, color: '#E34F26' },
  CSS3: { icon: SiCss, color: '#1572B6' },
  Redux: { icon: SiRedux, color: '#764ABC' },
  Zustand: { icon: Boxes, color: '#8B5E3C' },
  'Context API': { icon: Share2, color: '#149ECA' },
  useReducer: { icon: Atom, color: '#149ECA' },
  'React Query': { icon: SiReactquery, color: '#FF4154' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'shadcn/ui': { icon: SiShadcnui },
  'Material UI': { icon: SiMui, color: '#007FFF' },
  'Ant Design': { icon: SiAntdesign, color: '#1677FF' },
  Vite: { icon: SiVite, color: '#646CFF' },
  Webpack: { icon: SiWebpack, color: '#1C78C0' },
  'Nx / Turborepo': { icon: SiTurborepo, color: '#EF4444' },
  'Accessibility (axe-core)': { icon: Accessibility, color: '#2563EB' },
  Virtualisation: { icon: Rows3, color: '#E8590C' },
  'Code-splitting': { icon: Split, color: '#E8590C' },
  'Node.js': { icon: SiNodedotjs, color: '#5FA04E' },
  'Express.js': express,
  Express: express,
  'REST APIs': { icon: TbApi },
  'GraphQL (basic)': { icon: SiGraphql, color: '#E10098' },
  OAuth: { icon: KeyRound, color: '#EB5424' },
  JWT: { icon: SiJsonwebtokens, color: '#D63AFF' },
  RBAC: { icon: ShieldCheck, color: '#16A34A' },
  'Server-Sent Events': { icon: Radio, color: '#E8590C' },
  PostgreSQL: { icon: SiPostgresql, color: '#336791' },
  MySQL: { icon: SiMysql, color: '#00758F' },
  MongoDB: { icon: SiMongodb, color: '#47A248' },
  'Prisma ORM': prisma,
  Prisma: prisma,
  'Anthropic Claude API': claude,
  'Claude API': claude,
  'OpenAI API (GPT-4)': openai,
  'OpenAI GPT-4 API': openai,
  'OpenAI API': openai,
  'Claude Code': { icon: SiAnthropic },
  'Prompt engineering': { icon: MessageSquareText, color: '#9333EA' },
  'Streaming AI UI': { icon: Sparkles, color: '#DB2777' },
  'Recommendation engines': { icon: WandSparkles, color: '#9333EA' },
  'Git (GitFlow)': { icon: SiGit, color: '#F05032' },
};

export function SkillIcon({ name, className = 'h-4 w-4' }: { name: string; className?: string }) {
  const entry = registry[name] ?? { icon: CodeXml };
  const Component = entry.icon;

  return <Component aria-hidden="true" focusable="false" className={className} style={{ color: entry.color }} />;
}

/** Skill chip: brand icon + label. */
export function SkillChip({ name }: { name: string }) {
  return (
    <span className="group/chip inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-control hover:shadow-card">
      <SkillIcon name={name} className="h-4 w-4 transition-transform duration-300 group-hover/chip:scale-110" />
      {name}
    </span>
  );
}
