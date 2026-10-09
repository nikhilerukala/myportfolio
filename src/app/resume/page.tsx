import type { Metadata } from 'next';
import { hasGithub, resume, siteUrl } from '@/data/resume';
import { Container } from '@/components/ui/Container';
import { ResumeDownloadLink } from '@/components/ui/ResumeDownloadLink';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resume',
  description: `Resume of ${resume.person.name}, ${resume.person.title}. ${resume.site.description}`,
  alternates: { canonical: '/resume' },
};

function ResumeSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-border pt-8">
      <h2 id={id} className="eyebrow">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  const { person, experience, resumeSkills, education, certifications } = resume;
  const contacts = [
    { label: person.email, href: `mailto:${person.email}` },
    { label: person.phone, href: `tel:${person.phone.replace(/\s/g, '')}` },
    { label: person.links.linkedin.label, href: person.links.linkedin.href },
    ...(hasGithub ? [{ label: person.links.github.label, href: person.links.github.href }] : []),
    { label: 'Portfolio', href: siteUrl },
  ];

  return (
    <Container>
      <div className="card mx-auto my-8 max-w-[900px] animate-fade-up p-6 sm:my-12 sm:p-12">
        <header className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-h2 font-semibold">{person.name}</h1>
            <p className="mt-2 text-lg">{person.tagline}</p>
            <p className="mt-1 text-muted">
              {person.location} · {person.availability}
            </p>
          </div>
          <ResumeDownloadLink placement="resume-page" className="btn-primary no-print self-start px-6 sm:self-auto">
            <Download aria-hidden="true" className="h-4 w-4" />
            Download PDF
          </ResumeDownloadLink>
        </header>

        <ul aria-label="Contact details" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {contacts.map((contact) => (
            <li key={contact.href}>
              <a className="link" href={contact.href}>
                {contact.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-12">
          <ResumeSection id="summary" title="Professional summary">
            <p className="leading-relaxed">{person.summary}</p>
          </ResumeSection>

          <ResumeSection id="skills" title="Technical skills">
            <dl className="grid gap-4">
              {resumeSkills.map((group) => (
                <div key={group.label} className="grid gap-1 sm:grid-cols-[180px_1fr] sm:gap-4">
                  <dt className="font-medium">{group.label}</dt>
                  <dd className="text-muted">{group.items}</dd>
                </div>
              ))}
            </dl>
          </ResumeSection>

          <ResumeSection id="experience" title="Professional experience">
            <ol className="grid gap-12">
              {experience.map((job) => (
                <li key={job.id}>
                  <article aria-labelledby={`job-${job.id}`}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <h3 id={`job-${job.id}`} className="text-lg font-semibold">
                        {job.role}
                      </h3>
                      <p className="shrink-0 font-mono text-sm text-muted">
                        <time dateTime={job.startISO}>{job.start}</time>
                        <span aria-hidden="true"> — </span>
                        <span className="sr-only"> to </span>
                        <time dateTime={job.endISO}>{job.end}</time>
                      </p>
                    </div>
                    <p className="mt-1 text-muted">
                      {job.company} · {job.location}
                    </p>
                    <ul className="mt-4 list-disc space-y-2 pl-4 leading-relaxed marker:text-muted">
                      {[...job.highlights, ...job.more].map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                </li>
              ))}
            </ol>
          </ResumeSection>

          <ResumeSection id="education" title="Education">
            <ul className="grid gap-6">
              {education.map((item) => (
                <li key={item.institution} className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                  <div>
                    <h3 className="font-semibold">{item.institution}</h3>
                    <p className="text-muted">
                      {item.credential} · {item.location}
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-sm text-muted">{item.period}</p>
                </li>
              ))}
            </ul>
          </ResumeSection>

          <ResumeSection id="certifications" title="Certifications">
            <ul className="grid gap-4">
              {certifications.map((cert) => (
                <li key={cert.name} className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                  <p>
                    <span className="font-semibold">{cert.name}</span>
                    <span className="text-muted"> — {cert.issuer}</span>
                  </p>
                  {cert.date && <p className="shrink-0 font-mono text-sm text-muted">{cert.date}</p>}
                </li>
              ))}
            </ul>
          </ResumeSection>
        </div>
      </div>
    </Container>
  );
}
