import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data/services';
import { REASONS } from '../data/site';
import { Link } from '../lib/router';
import { Reveal } from '../components/reactbits/Reveal';
import { PageHero, Section, SectionHeader } from '../components/ui';
import { FinalCta, ProcessSection } from '../components/sections';

const WHAT_WE_DO = [
  {
    title: 'Build',
    detail: 'Websites, CMS and e-commerce, web and mobile apps, desktop software and custom ERP.',
  },
  {
    title: 'Connect',
    detail: 'APIs, integrations, AI features and the cloud setup that ties your tools together.',
  },
  {
    title: 'Look after',
    detail: 'Deployment, monitoring, maintenance and support once your product is live.',
  },
];

export const AboutPage: React.FC = () => (
  <main id="main">
    <PageHero
      crumbs={[{ name: 'Home', to: '/' }, { name: 'About us' }]}
      eyebrow="About us"
      title="We build software that businesses depend on"
      titleId="about-title"
      intro="PropushHub Corporation (PPH) is a software development company. We design, build and support software for businesses, with one team from the first call to launch and beyond."
    >
      <Link to="/contact" className="btn btn-primary">
        Start a project
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <Link to="/services" className="btn btn-secondary">
        Our services
      </Link>
    </PageHero>

    <Section id="what-we-do" labelledBy="what-we-do-title">
      <SectionHeader
        id="what-we-do-title"
        eyebrow="What we do"
        title="One team for the whole stack"
        intro={`${SERVICES.length} services, from a first website to a full ERP, so you deal with one team instead of several.`}
      />
      <ul className="grid gap-4 md:grid-cols-3">
        {WHAT_WE_DO.map((item, i) => (
          <Reveal as="li" key={item.title} spotlight delay={i * 0.08} className="rounded-3xl bg-surface p-7">
            <h3 className="font-display text-2xl font-medium tracking-tight">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{item.detail}</p>
          </Reveal>
        ))}
      </ul>
      <p className="mt-8 text-muted">
        See{' '}
        <Link to="/services" className="text-fg underline underline-offset-4">
          all services
        </Link>{' '}
        or the{' '}
        <Link to="/showcase" className="text-fg underline underline-offset-4">
          projects we have built
        </Link>
        .
      </p>
    </Section>

    <Section id="principles" labelledBy="principles-title">
      <SectionHeader id="principles-title" eyebrow="How we work" title="What you can expect from us" />
      <dl className="grid gap-4 sm:grid-cols-2">
        {REASONS.map((reason, i) => (
          <Reveal key={reason.title} spotlight delay={(i % 2) * 0.08} className="rounded-3xl bg-surface p-7">
            <dt className="font-display text-xl font-medium tracking-tight">{reason.title}</dt>
            <dd className="mt-3 leading-relaxed text-muted">{reason.detail}</dd>
          </Reveal>
        ))}
      </dl>
    </Section>

    <ProcessSection />
    <FinalCta />
  </main>
);
