import { hasGithub, resume, siteUrl } from '@/data/resume';

export function PersonJsonLd() {
  const { person, skills, education } = resume;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: person.name,
    givenName: person.givenName,
    familyName: person.familyName,
    jobTitle: person.title,
    description: resume.site.description,
    url: siteUrl,
    email: `mailto:${person.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: person.location.split(',')[0]?.trim(),
      addressCountry: person.location.split(',').pop()?.trim(),
    },
    sameAs: [person.links.linkedin.href, ...(hasGithub ? [person.links.github.href] : [])],
    knowsAbout: skills.flatMap((group) => group.items),
    alumniOf: education.map((item) => ({ '@type': 'EducationalOrganization', name: item.institution })),
  };

  // Escape "<" so content can never close the script tag.
  const json = JSON.stringify(schema).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
