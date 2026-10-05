import { GraduationCap, Stethoscope, Warehouse, type LucideIcon } from 'lucide-react';
import type { ProjectIcon as ProjectIconName } from '@/data/resume';

const icons: Record<ProjectIconName, LucideIcon> = {
  stethoscope: Stethoscope,
  warehouse: Warehouse,
  graduation: GraduationCap,
};

export function ProjectIcon({ name, className = 'h-5 w-5' }: { name: ProjectIconName; className?: string }) {
  const Component = icons[name];
  return <Component aria-hidden="true" className={className} strokeWidth={1.75} />;
}
