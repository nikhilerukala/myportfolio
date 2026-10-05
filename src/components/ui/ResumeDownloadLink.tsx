'use client';

import { track } from '@vercel/analytics';
import { resume } from '@/data/resume';

export type DownloadPlacement = 'navbar' | 'hero' | 'footer' | 'resume-page';

interface ResumeDownloadLinkProps {
  placement: DownloadPlacement;
  className?: string;
  children: React.ReactNode;
}

/** Same-origin PDF link with the download attribute; each click is a Vercel Analytics custom event. */
export function ResumeDownloadLink({ placement, className, children }: ResumeDownloadLinkProps) {
  const { href, fileName } = resume.site.resumePdf;

  return (
    <a
      href={href}
      download={fileName}
      type="application/pdf"
      className={className}
      onClick={() => track('resume_download', { placement })}
    >
      {children}
    </a>
  );
}
