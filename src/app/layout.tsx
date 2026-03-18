import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import GlobalBackground from '@/components/GlobalBackground';
import Navbar from '@/components/Navbar';
import ToasterProvider from '@/components/ToasterProvider';
import { resumeData } from '@/data/resume';

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });

export const metadata: Metadata = {
  title: `${resumeData.personal.name} | ${resumeData.personal.title}`,
  description: `Portfolio of ${resumeData.personal.name}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${plusJakarta.className} bg-[#09090b] text-zinc-100 antialiased`}>
        <ToasterProvider />
        <GlobalBackground>
          <Navbar />
          {children}
        </GlobalBackground>
      </body>
    </html>
  );
}
