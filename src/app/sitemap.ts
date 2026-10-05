import type { MetadataRoute } from 'next';
import { resume, siteUrl } from '@/data/resume';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/resume`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    ...resume.caseStudies.map((study) => ({
      url: `${siteUrl}/work/${study.slug}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
