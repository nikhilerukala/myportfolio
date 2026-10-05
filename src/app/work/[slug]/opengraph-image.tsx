import { getCaseStudy, resume } from '@/data/resume';
import { ogSize, renderOg } from '@/lib/og';

export const alt = 'Case study';
export const size = ogSize;
export const contentType = 'image/png';
export const runtime = 'edge';

export default function OpengraphImage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  const { person } = resume;

  return renderOg({
    eyebrow: `Case study · ${person.name}`,
    title: study?.title ?? person.headline,
    footer: study ? `${study.keyMetric.value} ${study.keyMetric.label.toLowerCase()}` : person.title,
  });
}
