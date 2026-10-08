import type { ServiceFaq } from './services';
import { HOME_FAQS } from './site';

/** Links in the "Company" dropdown, footer and sitemap. */
export const COMPANY_LINKS: { label: string; to: string; description: string }[] = [
  { label: 'About us', to: '/about', description: 'Who we are and how we work' },
  { label: 'Our team', to: '/team', description: 'The people behind your project' },
  { label: 'Jobs', to: '/jobs', description: 'Open roles and how to apply' },
  { label: 'Collaboration', to: '/collaboration', description: 'Partner with us as a company' },
  { label: 'Help', to: '/help', description: 'Answers, support and contact options' },
];

/** Extra topics offered on the contact form besides the services. `slug` is used in /contact?service=<slug>. */
export const CONTACT_TOPICS: { slug: string; name: string }[] = [
  { slug: 'collaboration', name: 'Partnership / collaboration' },
  { slug: 'careers', name: 'Job application / careers' },
];

/* ------------------------------------------------------------------ Team */

/** People (founders and team) are loaded from the Firestore `team` collection: see DATA_TYPES.md. */

export const TEAM_DISCIPLINES: { title: string; detail: string }[] = [
  {
    title: 'Web and full-stack engineering',
    detail: 'Websites, web applications and the APIs behind them, built with React, Next.js and Node.js.',
  },
  {
    title: 'Mobile and desktop engineering',
    detail: 'iOS, Android and desktop software, including offline-first apps and hardware integration.',
  },
  {
    title: 'UI/UX design',
    detail: 'User flows, interface design and design systems that developers can build from directly.',
  },
  {
    title: 'Backend, cloud and DevOps',
    detail: 'Databases, integrations, deployments and monitoring that keep products running.',
  },
  {
    title: 'Quality and testing',
    detail: 'Manual and automated testing, so releases are checked before they reach your users.',
  },
  {
    title: 'Delivery and support',
    detail: 'Planning, regular updates and after-launch maintenance for every project.',
  },
];

/* ------------------------------------------------------------------ Jobs */

/** Open roles are loaded from the Firestore `jobs` collection: see DATA_TYPES.md. */

export const JOB_TRAITS: { title: string; detail: string }[] = [
  { title: 'Clear communication', detail: 'You write clear code and clear messages, and keep people informed without being chased.' },
  { title: 'Ownership', detail: 'You take a task from first idea to a working, tested result.' },
  { title: 'Craft', detail: 'You care about details users notice, and about the ones they never see.' },
  { title: 'Curiosity', detail: 'You enjoy learning a client’s business as much as the technology.' },
];

/* --------------------------------------------------------- Collaboration */

/** Partners, owners and sponsors are loaded from the Firestore `partners` collection: see DATA_TYPES.md. */

export const COLLAB_TYPES: { title: string; detail: string }[] = [
  {
    title: 'Agencies and white-label development',
    detail:
      'You keep the client relationship; we build under your brand to your standards, with a clear scope and regular demos.',
  },
  {
    title: 'Technology and integration partners',
    detail:
      'Platform, SaaS and API providers we can integrate with, and recommend to clients where it is a good fit.',
  },
  {
    title: 'Referral partners',
    detail:
      'Consultants and advisors who meet businesses that need software and want a reliable team to introduce.',
  },
  {
    title: 'Specialists and freelancers',
    detail: 'Designers, writers and engineers who would like to work with us on specific projects.',
  },
];

export const COLLAB_STEPS: { title: string; detail: string }[] = [
  { title: 'Introduce yourself', detail: 'Tell us about your company, what you do and what kind of collaboration you have in mind.' },
  { title: 'Talk through the fit', detail: 'We discuss scope, expectations and how we would work together.' },
  { title: 'Start with one project', detail: 'A first small project is the best way to see whether we work well together.' },
];

/* ------------------------------------------------------------------ Help */

export interface HelpGroup {
  title: string;
  faqs: ServiceFaq[];
}

const fromHome = (...questions: string[]): ServiceFaq[] =>
  questions.map((q) => HOME_FAQS.find((f) => f.q === q)).filter((f): f is ServiceFaq => Boolean(f));

export const HELP_GROUPS: HelpGroup[] = [
  {
    title: 'Getting started',
    faqs: [
      {
        q: 'How do I start a project with PropushHub?',
        a: 'Send a short brief through the contact form (what you want to build, who it is for and when you need it) or message us on WhatsApp. We reply with questions and a suggested approach, then a written quote.',
      },
      {
        q: 'What should I include in my project brief?',
        a: 'Your goal, who will use the product, any examples you like, a rough budget range and your deadline. Rough is fine: we fill in the gaps together.',
      },
      {
        q: 'Do I need technical knowledge?',
        a: 'No. We explain every choice in plain language and recommend the simplest option that fits your needs.',
      },
      ...fromHome('What does PropushHub build?'),
    ],
  },
  {
    title: 'Pricing and timelines',
    faqs: [
      ...fromHome('How much does a project cost?', 'How long will my project take?'),
      {
        q: 'Can we start with a smaller version?',
        a: 'Yes. Many projects begin with an MVP or a single module and grow from there. It lowers the risk and gets something working sooner.',
      },
    ],
  },
  {
    title: 'Working with us',
    faqs: [
      ...fromHome('Can we work together remotely?', 'Who owns the source code?'),
      {
        q: 'Can you work with software that already exists?',
        a: 'Yes. We review the existing code first, then fix, extend or rebuild it depending on what makes sense.',
      },
    ],
  },
  {
    title: 'After launch',
    faqs: [
      ...fromHome('Do you provide support after launch?'),
      {
        q: 'What if something breaks?',
        a: 'Message us on WhatsApp or email with what you see, and a screenshot if you can. We will tell you what we can do and how quickly.',
      },
      {
        q: 'Can you host the project for us?',
        a: 'Yes. We deploy to cloud hosting such as Vercel or AWS and can manage it as part of a maintenance plan.',
      },
    ],
  },
];

export const ALL_HELP_FAQS: ServiceFaq[] = HELP_GROUPS.flatMap((group) => group.faqs);
