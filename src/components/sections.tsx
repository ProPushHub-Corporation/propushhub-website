import React from 'react';
import { ArrowRight, ArrowUpRight, Check, Plus } from 'lucide-react';
import { SERVICES } from '../data/services';
import { COMPANY_INFO, CTA_REASSURANCE, PROCESS_STEPS } from '../data/site';
import type { ServiceFaq } from '../data/services';
import { Link } from '../lib/router';
import { Container, Section, SectionHeader } from './ui';

export const Reassurance: React.FC<{ className?: string }> = ({ className = '' }) => (
  <ul className={`flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted ${className}`}>
    {CTA_REASSURANCE.map((item) => (
      <li key={item} className="flex items-center gap-2">
        <Check className="h-4 w-4 text-fg" aria-hidden="true" />
        {item}
      </li>
    ))}
  </ul>
);

/** Numbered, fully clickable list of every service. */
export const ServiceList: React.FC<{ exclude?: string[] }> = ({ exclude = [] }) => {
  const items = SERVICES.filter((s) => !exclude.includes(s.slug));
  return (
    <ul className="border-t border-line-strong">
      {items.map((s, i) => (
        <li key={s.slug} className="border-b border-line">
          <Link
            to={`/services/${s.slug}`}
            className="group -mx-4 grid items-baseline gap-x-8 gap-y-2 px-4 py-7 transition-colors hover:bg-fg sm:grid-cols-12"
          >
            <span className="text-xs text-dim transition-colors group-hover:text-ink sm:col-span-1">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-ink sm:col-span-5 sm:text-3xl">
              {s.name}
            </h3>
            <p className="text-muted transition-colors group-hover:text-ink/70 sm:col-span-5">{s.summary}</p>
            <ArrowRight
              aria-hidden="true"
              className="hidden h-5 w-5 justify-self-end transition-all group-hover:translate-x-1 group-hover:text-ink sm:col-span-1 sm:block"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const ProcessSection: React.FC<{ tone?: 'dark' | 'light' }> = ({ tone = 'light' }) => (
  <Section id="process" tone={tone} labelledBy="process-title">
    <SectionHeader
      id="process-title"
      eyebrow="How we work"
      title="A clear process from first call to launch"
      intro="Five steps, each with a clear outcome, so you always know what happens next."
    />
    <ol className="grid gap-x-8 gap-y-10 md:grid-cols-5">
      {PROCESS_STEPS.map((step, i) => (
        <li key={step.title} className="border-t border-fg pt-5">
          <span className="text-xs text-dim">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="mt-8 text-2xl">{step.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{step.detail}</p>
        </li>
      ))}
    </ol>
  </Section>
);

interface FaqSectionProps {
  faqs: ServiceFaq[];
  tone?: 'dark' | 'light';
  id?: string;
  eyebrow?: string;
  title?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  faqs,
  tone = 'light',
  id = 'faq',
  eyebrow = 'FAQ',
  title = 'Questions we hear most',
}) => (
  <Section id={id} tone={tone} labelledBy={`${id}-title`}>
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h2 id={`${id}-title`} className="text-3xl leading-[1.08] sm:text-5xl">
          {title}
        </h2>
        <p className="mt-5 text-muted">
          Something else on your mind?{' '}
          <Link to="/contact" className="text-fg underline underline-offset-4">
            Ask us directly
          </Link>
          .
        </p>
      </div>
      <div className="border-t border-line-strong lg:col-span-8">
        {faqs.map((faq, i) => (
          <details key={faq.q} className="group border-b border-line" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
              <h3 className="text-lg font-medium tracking-normal">{faq.q}</h3>
              <Plus aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform group-open:rotate-45" />
            </summary>
            <p className="max-w-[62ch] pb-7 leading-relaxed text-muted">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  </Section>
);

interface FinalCtaProps {
  /** Pre-selects this service on the contact form. */
  serviceSlug?: string;
  title?: string;
  tone?: 'dark' | 'light';
}

export const FinalCta: React.FC<FinalCtaProps> = ({
  serviceSlug,
  title = 'Tell us what you need. We’ll show you how we’d build it.',
  tone = 'dark',
}) => (
  <section
    aria-labelledby="cta-title"
    className={`${tone === 'light' ? 'light' : 'bg-ink text-fg'} border-t border-line py-24 sm:py-32`}
  >
    <Container>
      <p className="eyebrow mb-5">Start a project</p>
      <h2 id="cta-title" className="max-w-4xl text-4xl leading-[1.04] sm:text-6xl">
        {title}
      </h2>
      <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted">
        Share a few details and get a clear scope and a written quote. No obligation.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link to={serviceSlug ? `/contact?service=${serviceSlug}` : '/contact'} className="btn btn-primary">
          Get a free quote
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          Chat on WhatsApp
        </a>
      </div>
      <Reassurance className="mt-8" />
    </Container>
  </section>
);
