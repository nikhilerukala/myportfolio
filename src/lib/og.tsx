import { ImageResponse } from 'next/og';
import { resume } from '@/data/resume';

export const ogSize = { width: 1200, height: 630 };

interface OgProps {
  eyebrow: string;
  title: string;
  footer: string;
}

/** Shared Open Graph layout: light palette, one accent bar, no gradients. */
export function renderOg({ eyebrow, title, footer }: OgProps) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: '#FFFFFF',
        color: '#3F3A36',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28, color: '#6B6560' }}>
        <div style={{ width: 16, height: 16, background: '#DA291C' }} />
        {eyebrow}
      </div>
      <div
        style={{ display: 'flex', fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}
      >
        {title}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '2px solid #E7E5E4',
          paddingTop: 24,
          fontSize: 26,
          color: '#6B6560',
        }}
      >
        <span>{footer}</span>
        <span>{resume.site.url.replace(/^https?:\/\//, '')}</span>
      </div>
    </div>,
    ogSize,
  );
}
