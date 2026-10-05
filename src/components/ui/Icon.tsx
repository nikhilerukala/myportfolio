import {
  Boxes,
  CodeXml,
  Database,
  Gauge,
  GraduationCap,
  Layers,
  PackageMinus,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Timer,
  TrendingUp,
  Users,
  Warehouse,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { IconName } from '@/data/resume';

const icons: Record<IconName, LucideIcon> = {
  gauge: Gauge,
  package: PackageMinus,
  stethoscope: Stethoscope,
  timer: Timer,
  zap: Zap,
  shield: ShieldCheck,
  layers: Layers,
  sparkles: Sparkles,
  users: Users,
  database: Database,
  code: CodeXml,
  trending: TrendingUp,
  boxes: Boxes,
  server: Server,
  rocket: Rocket,
  graduation: GraduationCap,
  warehouse: Warehouse,
};

/** Decorative icon resolved from a data key. */
export function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  const Component = icons[name];
  return <Component aria-hidden="true" className={className} strokeWidth={1.75} />;
}
