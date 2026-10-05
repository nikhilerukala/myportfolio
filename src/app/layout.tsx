import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import { resume, siteUrl } from '@/data/resume';
import { SkipLink } from '@/components/layout/SkipLink';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { Interactions } from '@/components/ui/Interactions';
import { BackgroundDecor } from '@/components/layout/BackgroundDecor';
import { PersonJsonLd } from '@/components/seo/PersonJsonLd';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
});

const { site, person } = resume;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.title, template: `%s — ${person.name}` },
  description: site.description,
  applicationName: `${person.name} Portfolio`,
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  keywords: ['React.js Developer', 'Next.js', 'TypeScript', 'Frontend Developer', person.name, person.location],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: person.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  colorScheme: 'light',
};

// Flags JS before first paint so scroll-reveal styles never hide content when JS is off.
const jsFlag = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <BackgroundDecor />
        <SkipLink />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 pt-24 outline-none">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
        <Interactions />
        <PersonJsonLd />
        <Analytics />
      </body>
    </html>
  );
}
