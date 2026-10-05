import { resume } from '@/data/resume';
import { ogSize, renderOg } from '@/lib/og';

export const alt = resume.site.title;
export const size = ogSize;
export const contentType = 'image/png';
export const runtime = 'edge';

export default function OpengraphImage() {
  const { person } = resume;
  return renderOg({
    eyebrow: `${person.name} — ${person.title}`,
    title: person.headline,
    footer: `${person.location} · ${person.availability}`,
  });
}
