# Nikhil E — Portfolio

Next.js 14 (App Router) · TypeScript · Tailwind CSS · deployed on Vercel.

## Editing content

Every word on the site comes from [`src/data/resume.ts`](src/data/resume.ts) — components never hardcode copy.

- **Case-study screenshots / recordings:** drop files in `public/work/<slug>/` and add entries to that study's `media` array (`kind: 'image'` uses `next/image`; `kind: 'video'` renders a muted, user-controlled `<video>`).
- **GitHub:** set `person.links.github.href`; GitHub links stay hidden while it is empty.
- **Resume PDF:** replace `public/Nikhil_E_React_Developer_Resume.pdf` (keep the filename).

## Structure

```
src/
  app/
    layout.tsx               fonts (Geist via next/font), metadata, theme, analytics, JSON-LD
    page.tsx                 home: Hero → Impact → Work → Experience → Skills → Contact
    work/[slug]/             static case-study pages + per-study OG image
    resume/page.tsx          accessible HTML resume with "Download PDF"
    api/contact/route.ts     contact form → Resend
    opengraph-image.tsx      next/og share image
    sitemap.ts, robots.ts, not-found.tsx
  components/
    layout/                  header, nav, footer, theme toggle, skip link
    sections/                home-page sections (ContactForm is the only interactive one)
    work/                    architecture diagram, case-study media
    ui/                      Container, Section, MetricList, TagList, ResumeDownloadLink, RevealObserver
    seo/PersonJsonLd.tsx
  data/resume.ts             all content + TypeScript interfaces
  lib/                       contact validation (shared client/server), OG layout
```

Client components are limited to: theme provider/toggle, nav (active route), resume download link (analytics event), reveal observer, and contact form.

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Environment variables (Vercel → Settings → Environment Variables)

| Name | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend API key for the contact form |
| `CONTACT_TO_EMAIL` | yes | Inbox that receives messages |
| `CONTACT_FROM_EMAIL` | no | Sender on a Resend-verified domain (defaults to `onboarding@resend.dev`) |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical URL; defaults to `site.url` in `resume.ts` |

Enable **Analytics** in the Vercel project to receive the `resume_download` custom event (property `placement`: `navbar` / `hero` / `footer` / `resume-page`).

## Quality checks

```bash
npm run typecheck && npm run lint && npm run build
```

- Accessibility: axe-core (WCAG 2.1 A/AA + best-practice) reports 0 violations on every route in light and dark themes.
- Colour: `#E8590C` is 3.3:1 on `#F7F6F2`, so in light mode it is used for fills (CTA, focus ring, active marker) and link text uses `--color-accent-ink` `#C2410C` (4.8:1). Dark mode uses `#FF7A33` for both (7.3:1).
- Motion: scroll reveal is 250 ms, CSS-only after a single IntersectionObserver, disabled under `prefers-reduced-motion` and when JS is off.
