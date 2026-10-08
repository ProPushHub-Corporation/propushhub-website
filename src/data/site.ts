import { ServiceFaq } from './services';

export const COMPANY_INFO = {
  name: 'PropushHub',
  tagline: 'We build the software your business runs on.',
  email: 'info.propushhub@gmail.com',
  phone: '+923190586822',
  whatsappNumberDisplay: '+92 319 0586822',
  whatsappUrl:
    'https://wa.me/923190586822?text=Hello%20PropushHub%2C%20I%20would%20like%20to%20discuss%20a%20software%20project.',
};

export const NAV_LINKS: { label: string; to: string }[] = [
  { label: 'Services', to: '/services' },
  { label: 'Showcase', to: '/showcase' },
  { label: 'Contact', to: '/contact' },
];

/** Reassurance shown next to the main call to action. Edit to match real policy. */
export const CTA_REASSURANCE = ['Free consultation', 'Written quote', 'Reply within 1 business day'];

export const HERO = {
  eyebrow: 'Software development company',
  title: 'We build the software your business runs on.',
  subtitle:
    'Websites, CMS, mobile apps, desktop software and custom ERP. Designed, engineered and launched by one team.',
};

export const PROCESS_STEPS: { title: string; detail: string }[] = [
  {
    title: 'Discover',
    detail:
      'We learn your goals, users and constraints, then agree scope, timeline and a written quote before any work starts.',
  },
  {
    title: 'Design',
    detail: 'Wireframes and screens you can click through and approve before development begins.',
  },
  {
    title: 'Build',
    detail: 'Development in short cycles with regular demos, so you see progress and can steer early.',
  },
  {
    title: 'Launch',
    detail: 'Testing, deployment and handover. We take care of hosting, domains and store submissions.',
  },
  {
    title: 'Support',
    detail: 'After launch we monitor, fix and improve, on a maintenance plan if you want one.',
  },
];

export const REASONS: { title: string; detail: string }[] = [
  {
    title: 'One team, every platform',
    detail:
      'Web, mobile, desktop, backend and design under one roof, so there are no handoffs between agencies.',
  },
  {
    title: 'Direct communication',
    detail:
      'You talk to the people building your software, over WhatsApp, email or video, with regular progress updates.',
  },
  {
    title: 'Clear scope, clear price',
    detail: 'A written scope and quote before work begins. No surprises halfway through.',
  },
  {
    title: 'Built to last',
    detail:
      'Clean, documented code on mainstream technology, so you are never locked in to us.',
  },
];

export const HOME_FAQS: ServiceFaq[] = [
  {
    q: 'What does PropushHub build?',
    a: 'We build websites, CMS-driven sites, e-commerce stores, web applications, mobile apps, desktop software, ERP and custom business systems, APIs and AI features. We also handle design, deployment and ongoing support.',
  },
  {
    q: 'How much does a project cost?',
    a: 'It depends on scope. A marketing website, a mobile app and an ERP system are very different projects. Every engagement starts with a free consultation and ends with a written quote, so you know the price before work begins.',
  },
  {
    q: 'How long will my project take?',
    a: 'A focused business website typically takes a few weeks. Mobile apps, web applications and ERP systems take a few months, and large systems are delivered in stages so you can start using them earlier. You get a timeline in writing.',
  },
  {
    q: 'Who owns the source code?',
    a: 'You do. Once the project is paid for, the source code and the accounts it runs on belong to you.',
  },
  {
    q: 'Do you provide support after launch?',
    a: 'Yes. We offer maintenance plans covering bug fixes, updates, backups and monitoring, and we can also support software that someone else built.',
  },
  {
    q: 'Can we work together remotely?',
    a: 'Yes. Projects run remotely through WhatsApp, email and video calls, with regular progress updates and demos.',
  },
];

export const BUDGET_OPTIONS = [
  'Under $1,000',
  '$1,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000+',
  'Not sure yet',
];
