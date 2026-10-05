/**
 * Single source of truth for every piece of content on the site.
 * Components only read from here — edit this file to change copy.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** At most three bullets are shown before the "more" disclosure. */
export type Highlights = [string] | [string, string] | [string, string, string];

export interface Link {
  label: string;
  href: string;
}

export interface Person {
  name: string;
  /** Given + family name used in JSON-LD. */
  givenName: string;
  familyName: string;
  title: string;
  location: string;
  /** e.g. "Open to roles · Willing to relocate anywhere" */
  availability: string;
  available: boolean;
  email: string;
  phone: string;
  headline: string;
  intro: string;
  summary: string;
  links: {
    linkedin: Link;
    /** Leave href empty to hide GitHub everywhere until the URL is known. */
    github: Link;
  };
}

export interface SiteMeta {
  /** Canonical production URL, no trailing slash. NEXT_PUBLIC_SITE_URL overrides it. */
  url: string;
  title: string;
  description: string;
  locale: string;
  resumePdf: {
    href: string;
    fileName: string;
  };
}

/** UI icon keys — mapped to icon components in components/ui/Icon.tsx. */
export type IconName =
  | 'gauge'
  | 'package'
  | 'stethoscope'
  | 'timer'
  | 'zap'
  | 'shield'
  | 'layers'
  | 'sparkles'
  | 'users'
  | 'database'
  | 'code'
  | 'trending'
  | 'boxes'
  | 'server'
  | 'rocket'
  | 'graduation'
  | 'warehouse';

export interface Metric {
  icon?: IconName;
  value: string;
  label: string;
  context: string;
}

export interface Experience {
  id: string;
  /** Short monogram shown in the timeline node. */
  initials: string;
  stack: string[];
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  /** Machine-readable dates (YYYY-MM) for <time dateTime>. */
  startISO: string;
  endISO: string;
  highlights: Highlights;
  more: string[];
}

export interface ArchitectureNode {
  name: string;
  detail: string;
}

export interface ArchitectureLayer {
  label: string;
  nodes: ArchitectureNode[];
}

export interface CaseStudyMedia {
  /** Image under /public, or a video (.mp4/.webm) under /public. */
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: 'image' | 'video';
  /** Poster frame for videos. */
  poster?: string;
  caption?: string;
}

/** Illustrated preview used until real screenshots are added to `media`. */
export type ProjectVisual = 'list' | 'kanban' | 'dashboard';
export type ProjectTheme = 'red' | 'crimson' | 'ash';
export type ProjectIcon = 'stethoscope' | 'warehouse' | 'graduation';

export interface CaseStudy {
  slug: string;
  visual: ProjectVisual;
  theme: ProjectTheme;
  icon: ProjectIcon;
  /** Label shown on the illustrated preview, e.g. "Job board · 10K rows". */
  previewLabel: string;
  title: string;
  company: string;
  period: string;
  role: string;
  summary: string;
  /** The one number shown on the card. */
  keyMetric: Metric;
  problem: string;
  myRole: string[];
  constraints: string[];
  approach: string[];
  architecture: {
    caption: string;
    layers: ArchitectureLayer[];
  };
  results: Metric[];
  stack: string[];
  media: CaseStudyMedia[];
}

export interface SkillGroup {
  id: string;
  label: string;
  icon: IconName;
  blurb: string;
  items: string[];
}

export interface Education {
  institution: string;
  credential: string;
  location: string;
  period: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
}

export interface SectionCopy {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
}

export interface Resume {
  site: SiteMeta;
  person: Person;
  nav: Link[];
  hero: {
    greeting: string;
    /** Part of person.headline rendered with the gradient. */
    highlight: string;
    primaryCta: string;
    secondaryCta: Link;
    stats: { value: string; label: string }[];
    /** Decorative code window in the hero. */
    code: { fileName: string; lines: string[] };
    chips: { value: string; label: string }[];
    marqueeLabel: string;
  };
  sections: {
    impact: SectionCopy;
    work: SectionCopy;
    experience: SectionCopy;
    skills: SectionCopy;
    contact: SectionCopy;
  };
  impact: Metric[];
  caseStudies: CaseStudy[];
  experience: Experience[];
  skills: SkillGroup[];
  /** Full skills breakdown, mirrors the PDF — used on /resume. */
  resumeSkills: { label: string; items: string }[];
  education: Education[];
  certifications: Certification[];
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export const resume: Resume = {
  site: {
    url: 'https://nikhilerukala.dev',
    title: 'Nikhil E — React.js Developer',
    description:
      'React.js Developer with 4+ years building fast, accessible React and Next.js applications for healthcare, BFSI and enterprise teams.',
    locale: 'en_IN',
    resumePdf: {
      href: '/Nikhil_E_React_Developer_Resume.pdf',
      fileName: 'Nikhil_E_React_Developer_Resume.pdf',
    },
  },

  person: {
    name: 'Nikhil E',
    givenName: 'Nikhil',
    familyName: 'Erukala',
    title: 'React.js Developer',
    location: 'Hyderabad, India',
    availability: 'Available now · Open to relocate anywhere',
    available: true,
    email: 'nikhilerukala99@gmail.com',
    phone: '+91 93813 78437',
    headline: 'I build React products that feel instant — for thousands of real users.',
    intro:
      '4+ years shipping React and Next.js products across healthcare, BFSI and enterprise — performance work, accessible component systems, and AI features that stream instead of spin.',
    summary:
      'React.js Developer with 4+ years of experience building scalable, high-performing web applications across healthcare, BFSI, and enterprise domains. Proven expertise in React component architecture, performance optimisation, and cross-functional team collaboration. Experienced in Next.js (SSR/SSG), Node.js, TypeScript, and modern UI frameworks. Hands-on with AI integration in UI (chatbots, recommendation engines), prompt engineering for LLMs, and secure application development (CORS, JWT-based authentication, RBAC). Adept at code reviews, mentoring junior developers, and delivering production-grade solutions in Agile environments.',
    links: {
      linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikhilerukala' },
      // TODO: add your GitHub profile URL — GitHub links stay hidden while this is empty.
      github: { label: 'GitHub', href: '' },
    },
  },

  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Contact', href: '/#contact' },
  ],

  hero: {
    greeting: 'Hi, I’m Nikhil — React.js Developer',
    highlight: 'feel instant',
    primaryCta: 'Download Resume',
    secondaryCta: { label: 'View Work', href: '/#work' },
    stats: [
      { value: '4+', label: 'Years shipping React' },
      { value: '40+', label: 'Reusable components built' },
      { value: '5,000+', label: 'Doctors on my UI' },
    ],
    code: {
      fileName: 'JobBoard.tsx',
      lines: [
        "import { useVirtualizer } from '@tanstack/react-virtual';",
        '',
        'export function JobBoard({ jobs }: Props) {',
        '  const rows = useVirtualizer({',
        '    count: jobs.length, // 10,000+',
        '    estimateSize: () => 72,',
        '    overscan: 8,',
        '  });',
        '',
        '  return <JobList rows={rows} jobs={jobs} />;',
        '}',
      ],
    },
    chips: [
      { value: '3.2s → 800ms', label: 'Initial render' },
      { value: '92+', label: 'Lighthouse' },
      { value: 'SSE', label: 'Streaming AI' },
    ],
    marqueeLabel: 'Tools I ship with',
  },

  sections: {
    impact: {
      id: 'impact',
      eyebrow: 'By the numbers',
      title: 'Impact you can measure',
      intro: 'Performance and product wins from production apps — not side projects.',
    },
    work: {
      id: 'work',
      eyebrow: 'Case studies',
      title: 'Selected work',
      intro: 'Three production systems, written up as case studies — the problem, the constraints, and the numbers.',
    },
    experience: {
      id: 'experience',
      eyebrow: 'Career',
      title: 'Where I’ve shipped',
      intro: 'Healthcare, logistics and education products across India and Malaysia.',
    },
    skills: {
      id: 'skills',
      eyebrow: 'Toolkit',
      title: 'Skills & stack',
      intro: 'What I reach for, grouped by where it sits in the stack.',
    },
    contact: {
      id: 'contact',
      eyebrow: 'Contact',
      title: 'Let’s build something fast',
      intro: 'Hiring for a React or Next.js role, anywhere in the world? I’m available now and open to relocation.',
    },
  },

  impact: [
    { icon: 'zap', value: '3.2s → 800ms', label: 'Initial render', context: '10K+ job listings, Nextenti' },
    { icon: 'package', value: '−40%', label: 'Bundle size', context: 'School Management System, Kwikkoder' },
    { icon: 'stethoscope', value: '5,000+', label: 'Doctors served', context: 'and 200+ hospitals, Nextenti' },
    { icon: 'timer', value: '−35%', label: 'Time-to-hire', context: 'GPT-4 job matching, Nextenti' },
  ],

  caseStudies: [
    {
      slug: 'nextenti-healthcare-recruitment',
      visual: 'list',
      theme: 'red',
      icon: 'stethoscope',
      previewLabel: 'Job board · 10K+ rows',
      title: 'Nextenti — Healthcare Recruitment Platform',
      company: 'Nextenti Tech Private Limited',
      period: 'May 2024 – June 2025',
      role: 'Frontend lead',
      summary:
        'A recruitment SaaS matching doctors to hospital roles. I led the frontend and took the job board from a 3.2s initial render to 800ms.',
      keyMetric: { value: '3.2s → 800ms', label: 'Initial render', context: '10K+ job listings' },
      problem:
        'Doctors and hospitals were meeting on a job board that had to list 10,000+ openings across four user roles. As listings grew, the initial render crept to 3.2 seconds, and matching candidates to roles was largely manual — which kept time-to-hire long.',
      myRole: [
        'Led frontend development of the platform in React.js and TypeScript.',
        'Owned the component architecture and the shared component library.',
        'Built the GPT-4 job-matching recommendation engine integration.',
        'Mentored junior developers through code reviews and pair programming.',
      ],
      constraints: [
        'Four user roles with OAuth sign-in and granular RBAC, all sharing one app shell.',
        '10K+ job listings that had to stay scrollable and filterable without jank.',
        '15,000+ monthly active sessions — performance regressions were visible immediately.',
        'Agile/Scrum delivery: features had to ship inside sprint cycles.',
      ],
      approach: [
        'Virtualised the listings so only visible rows render, then memoised list items and derived data with useMemo and useCallback.',
        'Code-split routes and lazy-loaded heavy views so the first paint only ships what the landing view needs.',
        'Modelled role-specific state with Hooks and Context API, keeping OAuth session and permissions in one place.',
        'Built 40+ reusable components following atomic design, each with TypeScript interfaces and unit tests.',
        'Integrated REST APIs for matching, profiles and application tracking with explicit loading, error and optimistic-update states.',
        'Connected the OpenAI GPT-4 API to rank candidate–job fit automatically.',
      ],
      architecture: {
        caption:
          'React client with role-scoped context talks to REST services; matching requests are enriched by GPT-4 before results return to the virtualised list.',
        layers: [
          {
            label: 'Client',
            nodes: [
              { name: 'React + TypeScript', detail: 'Atomic component library, 40+ components' },
              { name: 'Context API', detail: 'Session, role and permission state for 4 roles' },
              { name: 'Virtualised job list', detail: 'Memoised rows, code-split routes' },
            ],
          },
          {
            label: 'Auth',
            nodes: [{ name: 'OAuth + RBAC', detail: 'Granular permissions per role' }],
          },
          {
            label: 'Services',
            nodes: [
              { name: 'REST APIs', detail: 'Job matching, profiles, application tracking' },
              { name: 'Recommendation engine', detail: 'OpenAI GPT-4 candidate–job matching' },
            ],
          },
        ],
      },
      results: [
        { value: '3.2s → 800ms', label: 'Initial render', context: 'on 10K+ listings' },
        { value: '92+', label: 'Lighthouse score', context: 'after the performance pass' },
        { value: '−35%', label: 'Time-to-hire', context: 'via automated matching' },
        { value: '−50%', label: 'Feature dev time', context: 'from the component library' },
        { value: '5,000+', label: 'Doctors', context: 'and 200+ hospitals served' },
        { value: '15,000+', label: 'Monthly sessions', context: 'active' },
      ],
      stack: [
        'React.js',
        'TypeScript',
        'JavaScript (ES6+)',
        'Context API',
        'OAuth',
        'RBAC',
        'REST APIs',
        'OpenAI GPT-4 API',
      ],
      media: [
        {
          src: '/work/nextenti-healthcare-recruitment/cover.webp',
          kind: 'image',
          width: 1160,
          height: 1380,
          alt: 'Nextenti mobile app: splash screen and candidate home screen',
          caption: 'The candidate app — home screen with upcoming shift and AI job matches.',
        },
        {
          src: '/work/nextenti-healthcare-recruitment/home.webp',
          kind: 'image',
          width: 2000,
          height: 1223,
          alt: 'Nextenti home screen annotated: upcoming shift card, top AI matches based on availability, and a weekly availability overview',
          caption:
            'Home screen: upcoming shift, availability-based AI matches, and this week’s availability at a glance.',
        },
        {
          src: '/work/nextenti-healthcare-recruitment/jobs.webp',
          kind: 'image',
          width: 1640,
          height: 1360,
          alt: 'Explore Jobs screens showing recommended and all jobs with match percentages, search and location filters',
          caption:
            'Explore Jobs: recommended vs. all listings with match scores — the list I virtualised for 10K+ jobs.',
        },
        {
          src: '/work/nextenti-healthcare-recruitment/availability.webp',
          kind: 'image',
          width: 1660,
          height: 1450,
          alt: 'Add availability form with job type, location, date range, daily or weekly schedule, and the saved availability view',
          caption: 'Availability is the primary matching signal — daily, weekly or custom schedules.',
        },
        {
          src: '/work/nextenti-healthcare-recruitment/onboarding.webp',
          kind: 'image',
          width: 2000,
          height: 914,
          alt: 'Onboarding flow: sign up with Google, mobile OTP verification, account type selection, and experience details',
          caption: 'Onboarding: Google sign-up, OTP verification and progressive profile details.',
        },
        {
          src: '/work/nextenti-healthcare-recruitment/timesheets.webp',
          kind: 'image',
          width: 2000,
          height: 773,
          alt: 'Timesheet screens for a hospital shift showing check-in, pending, and approved days',
          caption: 'Timesheets: check-in, approval states and attendance tracking per shift.',
        },
      ],
    },
    {
      slug: 'smartstock-warehouse-management',
      visual: 'kanban',
      theme: 'crimson',
      icon: 'warehouse',
      previewLabel: 'Order board · live stock',
      title: 'SmartStock — Warehouse Management System',
      company: 'Creative Mobile Multimedia Broadcasting (CMMB) Sdn. Bhd.',
      period: 'July 2025 – June 2026',
      role: 'Frontend developer, full-stack build',
      summary:
        'A full-stack WMS with real-time inventory, a drag-and-drop order board, and Claude-powered restock recommendations streamed over SSE.',
      keyMetric: { value: '~40%', label: 'Lower query latency', context: 'composite indexes + batching' },
      problem:
        'Warehouse teams needed one place to track stock in real time and move orders through fulfilment, and managers needed restock decisions grounded in actual stock movement rather than guesswork.',
      myRole: [
        'Built the React 18 frontend and its shared component library.',
        'Implemented JWT authentication and middleware-level RBAC on the Express API.',
        'Designed the Prisma/PostgreSQL schemas for SKUs, stock movements and orders.',
        'Built the AI demand-forecast feature on the Anthropic Claude API.',
        'Ran code reviews and maintained team coding standards.',
      ],
      constraints: [
        'Three roles — Staff, Manager, Admin — with different permissions across 12+ protected API routes.',
        'Large inventory tables had to stay responsive, so pagination had to happen on the server.',
        'LLM responses take seconds; users shouldn’t stare at a spinner while a forecast generates.',
        'Accessibility standards enforced across every shared component.',
      ],
      approach: [
        'Built a component library with shadcn/ui and Tailwind CSS — server-side paginated data tables, a drag-and-drop Kanban order board, live inventory widgets — reused across 5+ pages.',
        'Enforced auth at the middleware layer: JWT verification plus role checks before any protected handler runs, with CORS locked down.',
        'Normalised 8+ relational schemas in Prisma and added composite indexes and query batching on the hot paths.',
        'Fed 90 days of stock-movement data to Claude and streamed plain-English restock recommendations to the UI over Server-Sent Events.',
        'Used Claude Code for Prisma schema scaffolding and Express route boilerplate to cut repetitive work.',
      ],
      architecture: {
        caption:
          'The React client calls an Express API guarded by JWT + RBAC middleware; Prisma talks to PostgreSQL, and the forecast endpoint streams Claude output back over SSE.',
        layers: [
          {
            label: 'Client',
            nodes: [
              { name: 'React 18', detail: 'shadcn/ui + Tailwind component library' },
              { name: 'Kanban order board', detail: 'Drag-and-drop fulfilment pipeline' },
              { name: 'Forecast panel', detail: 'Renders SSE stream token by token' },
            ],
          },
          {
            label: 'API',
            nodes: [
              { name: 'Express middleware', detail: 'JWT verify → role check → CORS' },
              { name: '12+ protected routes', detail: 'Staff / Manager / Admin' },
              { name: 'SSE endpoint', detail: 'Streams forecast responses' },
            ],
          },
          {
            label: 'Data & AI',
            nodes: [
              { name: 'PostgreSQL + Prisma', detail: '8+ schemas, composite indexes' },
              { name: 'Anthropic Claude API', detail: '90-day movement → restock advice' },
              { name: 'OpenAI GPT-4 API', detail: 'Demand forecasting' },
            ],
          },
        ],
      },
      results: [
        { value: '~40%', label: 'Lower query latency', context: 'indexes + batching' },
        { value: '12+', label: 'Protected API routes', context: 'RBAC at middleware level' },
        { value: '5+', label: 'Pages on the library', context: 'shared components' },
        { value: '~30%', label: 'Less repetitive work', context: 'Claude Code scaffolding (est.)' },
      ],
      stack: [
        'React 18',
        'Tailwind CSS',
        'shadcn/ui',
        'Node.js',
        'Express',
        'PostgreSQL',
        'Prisma ORM',
        'JWT',
        'RBAC',
        'Server-Sent Events',
        'Anthropic Claude API',
        'OpenAI GPT-4 API',
      ],
      media: [
        {
          src: '/work/smartstock-warehouse-management/dashboard.webp',
          kind: 'image',
          width: 2000,
          height: 1250,
          alt: 'SmartStock inventory dashboard: KPI cards, 30-day stock movement chart, live zone capacity and a server-side paginated stock table',
          caption:
            'UI recreation · Inventory overview — live KPIs, stock movement, zone capacity and the server-paginated stock table.',
        },
        {
          src: '/work/smartstock-warehouse-management/orders.webp',
          kind: 'image',
          width: 2000,
          height: 1250,
          alt: 'SmartStock order fulfilment Kanban board with Pending, Picking, Packing, Ready to ship and Shipped columns, one order being dragged',
          caption: 'UI recreation · Drag-and-drop order board moving orders through the fulfilment pipeline.',
        },
        {
          src: '/work/smartstock-warehouse-management/forecast.webp',
          kind: 'image',
          width: 2000,
          height: 1250,
          alt: 'SmartStock demand forecast: 60-day history with 30-day forecast band, and a Claude restock recommendation streaming over SSE',
          caption: 'UI recreation · AI demand forecast — Claude restock advice streamed over Server-Sent Events.',
        },
      ],
    },
    {
      slug: 'school-management-system',
      visual: 'dashboard',
      theme: 'ash',
      icon: 'graduation',
      previewLabel: 'Admin dashboard · 2,500+ students',
      title: 'School Management System',
      company: 'Kwikkoder-IT Solutions',
      period: 'June 2022 – April 2024',
      role: 'React.js developer, full-stack build',
      summary:
        'One Next.js system for attendance, admissions, fees and staff across 2,500+ student records — with page load cut from 4.2s to 1.8s.',
      keyMetric: { value: '4.2s → 1.8s', label: 'Page load', context: '40% smaller bundle' },
      problem:
        'Attendance, admissions, fee tracking and staff records lived in separate places. The school needed one system for 2,500+ student records — and the first version loaded slowly at 4.2 seconds.',
      myRole: [
        'Built the application in React.js, Next.js and TypeScript on a PostgreSQL backend.',
        'Set the React architecture: custom Hooks, HOCs, Context API + useReducer.',
        'Ran peer code reviews in a cross-functional team of five.',
      ],
      constraints: [
        'Four modules — attendance, admissions, fees, staff — sharing the same student data.',
        'A five-developer team on two-week Agile sprints, using GitFlow.',
        'Page weight had grown with each module; load time was 4.2s.',
      ],
      approach: [
        'Used Next.js SSR/SSG per page and API routes for the data layer.',
        'Centralised cross-module state with Context API + useReducer; extracted shared logic into custom Hooks and HOCs.',
        'Code-split modules, lazy-loaded secondary views, and applied React.memo, useMemo and useCallback on hot components.',
      ],
      architecture: {
        caption:
          'Next.js renders each module with SSR or SSG and reads/writes through its own API routes to PostgreSQL.',
        layers: [
          {
            label: 'Client',
            nodes: [
              { name: 'Next.js pages', detail: 'SSR / SSG per module' },
              { name: 'Context + useReducer', detail: 'Shared student state' },
            ],
          },
          {
            label: 'Server',
            nodes: [{ name: 'Next.js API routes', detail: 'Attendance, admissions, fees, staff' }],
          },
          {
            label: 'Data',
            nodes: [{ name: 'PostgreSQL', detail: '2,500+ student records' }],
          },
        ],
      },
      results: [
        { value: '4.2s → 1.8s', label: 'Page load', context: 'after optimisation' },
        { value: '−40%', label: 'Bundle size', context: 'code-splitting + lazy loading' },
        { value: '+60%', label: 'Code reusability', context: 'Hooks + HOCs' },
        { value: '2,500+', label: 'Student records', context: 'across 4 modules' },
      ],
      stack: ['React.js', 'Next.js', 'TypeScript', 'Context API', 'useReducer', 'PostgreSQL', 'Git (GitFlow)'],
      media: [
        {
          src: '/work/school-management-system/dashboard.webp',
          kind: 'image',
          width: 2000,
          height: 1250,
          alt: 'School admin dashboard: student count, daily attendance, fee collection donut, attendance by grade and recent admissions',
          caption: 'UI recreation · Admin dashboard across attendance, admissions and fees for 2,548 students.',
        },
        {
          src: '/work/school-management-system/attendance.webp',
          kind: 'image',
          width: 2000,
          height: 1250,
          alt: 'Daily attendance marking for Grade VIII Section B with present, absent and late states and a monthly attendance calendar',
          caption: 'UI recreation · Daily attendance with per-student status, term percentage and at-risk flags.',
        },
        {
          src: '/work/school-management-system/fees.webp',
          kind: 'image',
          width: 2000,
          height: 1250,
          alt: 'Fee collection screen with term totals, status filters and an invoice table with reminder and receipt actions',
          caption: 'UI recreation · Fee tracking — collected, pending and overdue invoices with reminders.',
        },
      ],
    },
  ],

  experience: [
    {
      id: 'cmmb',
      initials: 'CM',
      stack: ['React 18', 'Node.js', 'PostgreSQL', 'Prisma', 'Claude API', 'Tailwind CSS'],
      company: 'Creative Mobile Multimedia Broadcasting (CMMB) Sdn. Bhd.',
      role: 'Frontend Developer',
      location: 'Kuala Lumpur, Malaysia',
      start: 'Jul 2025',
      end: 'Jun 2026',
      startISO: '2025-07',
      endISO: '2026-06',
      highlights: [
        'Built SmartStock, a full-stack warehouse management system (React 18, Node.js, Express, PostgreSQL) with real-time inventory tracking and AI-powered demand forecasting.',
        'Integrated the Anthropic Claude API to turn 90 days of stock movement into plain-English restock recommendations, streamed to the UI over Server-Sent Events.',
        'Secured 12+ API routes with JWT authentication and middleware-level RBAC across Staff, Manager and Admin roles.',
      ],
      more: [
        'Developed a reusable component library with shadcn/ui and Tailwind CSS — paginated data tables, a drag-and-drop Kanban order board, live inventory widgets — used across 5+ pages, with accessibility enforced throughout.',
        'Designed 8+ relational schemas with Prisma ORM and reduced query latency by ~40% through composite indexes and query batching.',
        'Ran code reviews and used Claude Code for schema and route scaffolding, cutting repetitive work by an estimated 30%.',
      ],
    },
    {
      id: 'nextenti',
      initials: 'NT',
      stack: ['React.js', 'TypeScript', 'Context API', 'OAuth', 'OpenAI API'],
      company: 'Nextenti Tech Private Limited',
      role: 'React.js Developer',
      location: 'Hyderabad, India',
      start: 'May 2024',
      end: 'Jun 2025',
      startISO: '2024-05',
      endISO: '2025-06',
      highlights: [
        'Led frontend development of a healthcare recruitment SaaS serving 5,000+ doctors and 200+ hospitals with 15,000+ monthly active sessions.',
        'Cut initial render from 3.2s to 800ms on 10K+ job listings with virtualisation, memoisation, code-splitting and lazy loading; Lighthouse to 92+.',
        'Integrated the OpenAI GPT-4 API into a job-matching engine that reduced average time-to-hire by 35%.',
      ],
      more: [
        'Architected the app with Hooks and Context API, managing state across 4 user roles with OAuth and granular RBAC.',
        'Built 40+ reusable components following atomic design, with TypeScript interfaces and unit tests — halving feature development time.',
        'Integrated REST APIs for job matching, profiles and application tracking with error handling, loading states and optimistic UI.',
        'Mentored junior developers through code reviews and pair programming in an Agile/Scrum team.',
      ],
    },
    {
      id: 'kwikkoder',
      initials: 'KK',
      stack: ['React.js', 'Next.js', 'TypeScript', 'PostgreSQL'],
      company: 'Kwikkoder-IT Solutions',
      role: 'React.js Developer',
      location: 'India',
      start: 'Jun 2022',
      end: 'Apr 2024',
      startISO: '2022-06',
      endISO: '2024-04',
      highlights: [
        'Built a full-stack School Management System in React.js, Next.js and TypeScript on PostgreSQL, managing 2,500+ student records.',
        'Reduced bundle size by 40% and page load from 4.2s to 1.8s with code-splitting, lazy loading and memoisation.',
        'Improved code reusability by 60% with custom Hooks, HOCs and Context API + useReducer.',
      ],
      more: [
        'Managed version control with GitFlow and ran peer code reviews in a five-developer team on two-week sprints.',
      ],
    },
  ],

  skills: [
    {
      id: 'core',
      label: 'Core',
      icon: 'code',
      blurb: 'The languages and frameworks I write every day.',
      items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'],
    },
    {
      id: 'ecosystem',
      label: 'Ecosystem',
      icon: 'boxes',
      blurb: 'State, styling, tooling and performance.',
      items: [
        'React Hooks',
        'Redux',
        'Zustand',
        'Context API',
        'React Query',
        'Tailwind CSS',
        'shadcn/ui',
        'Material UI',
        'Ant Design',
        'Vite',
        'Webpack',
        'Nx / Turborepo',
        'Accessibility (axe-core)',
        'Virtualisation',
        'Code-splitting',
      ],
    },
    {
      id: 'backend',
      label: 'Backend',
      icon: 'server',
      blurb: 'APIs, auth and data I build the UI against.',
      items: [
        'Node.js',
        'Express.js',
        'REST APIs',
        'GraphQL (basic)',
        'OAuth',
        'JWT',
        'RBAC',
        'Server-Sent Events',
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'Prisma ORM',
      ],
    },
    {
      id: 'ai',
      label: 'AI',
      icon: 'sparkles',
      blurb: 'LLM features that stream, not spin.',
      items: [
        'Anthropic Claude API',
        'OpenAI API (GPT-4)',
        'Claude Code',
        'Prompt engineering',
        'Streaming AI UI',
        'Recommendation engines',
      ],
    },
  ],

  resumeSkills: [
    { label: 'Core', items: 'React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3' },
    {
      label: 'React Ecosystem',
      items:
        'React Hooks, Component Lifecycle, Redux, Zustand, Context API, React Query, Performance Optimisation (memoisation, virtualisation, code-splitting, lazy loading)',
    },
    {
      label: 'Frameworks & UI',
      items:
        'Next.js (SSR, SSG, API Routes, Routing), Material UI, Ant Design, Tailwind CSS, shadcn/ui, Bootstrap, Responsive / Accessible Design (a11y, axe-core)',
    },
    {
      label: 'Backend & APIs',
      items: 'Node.js, Express.js, REST APIs, GraphQL (basic), OAuth, JWT, RBAC, Server-Sent Events (SSE)',
    },
    { label: 'Databases & ORM', items: 'PostgreSQL, MySQL, MongoDB' },
    { label: 'Build & Tooling', items: 'Vite, Webpack, Git, GitHub, GitLab, Monorepo (Nx / Turborepo basics)' },
    {
      label: 'AI & LLM',
      items:
        'OpenAI API (GPT-4), Anthropic Claude API, Claude Code, Prompt Engineering for LLMs, AI-powered UI (chatbots, recommendation engines)',
    },
    { label: 'Security', items: 'CORS mitigation, JWT-based Auth, Middleware-enforced RBAC' },
    { label: 'Practices', items: 'Agile/Scrum, Code Reviews, Mentoring, Cross-browser Compatibility, Atomic Design' },
  ],

  education: [
    {
      institution: 'NxtWave CCBP 4.0 Intensive Program',
      credential: 'Fellow — Full Stack Development',
      location: 'Online',
      period: 'Jun 2022 – Feb 2023',
    },
    {
      institution: 'Vardhaman College of Engineering (VCEH)',
      credential: 'Bachelor of Technology',
      location: 'Hyderabad, India',
      period: '2019 – 2022',
    },
  ],

  certifications: [
    {
      name: 'Introduction to Generative AI',
      issuer: 'Ministry of Digital Malaysia & Intel Digital Readiness Program',
      date: 'Jan 2026',
    },
    { name: 'React JS, JavaScript Essentials, Responsive Web Design', issuer: 'NxtWave CCBP 4.0' },
    { name: 'Digital Marketing Certification', issuer: 'NxtWave' },
  ],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? resume.site.url).replace(/\/$/, '');

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return resume.caseStudies.find((study) => study.slug === slug);
}

export const hasGithub = resume.person.links.github.href !== '';
