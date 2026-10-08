import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data/services';
import { HERO, HOME_FAQS, PROCESS_STEPS, REASONS } from '../data/site';
import { HOME_HERO_IMAGE } from '../data/images';
import { Link } from '../lib/router';
import { SiteImage } from '../components/SiteImage';
import { SplitText } from '../components/reactbits/SplitText';
import { Container, Section, SectionHeader } from '../components/ui';
import {
  FaqSection,
  FinalCta,
  ProcessSection,
  Reassurance,
  ServiceList,
} from '../components/sections';

export const HomePage: React.FC = () => {
  const facts = [
    { value: String(SERVICES.length), label: 'Development services under one roof' },
    { value: String(PROCESS_STEPS.length), label: 'Clear steps from first call to launch' },
    { value: 'Web · Mobile · Desktop', label: 'Every platform your business uses' },
  ];

  return (
    <main id="main">
      <section aria-labelledby="hero-title" className="bg-ink pt-16 sm:pt-24">
        <Container className="text-center">
          <p className="eyebrow" data-reveal>
            {HERO.eyebrow}
          </p>
          <SplitText
            tag="h1"
            id="hero-title"
            text={HERO.title}
            className="mx-auto mt-6 max-w-5xl text-[length:clamp(2.75rem,7.2vw,5.75rem)] leading-[0.98] tracking-[-0.035em]"
          />
          <p
            className="mx-auto mt-8 max-w-[52ch] text-lg leading-relaxed text-muted sm:text-xl"
            data-reveal
          >
            {HERO.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3" data-reveal>
            <Link to="/contact" className="btn btn-primary">
              Get a free quote
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/services" className="btn btn-secondary">
              Explore services
            </Link>
          </div>
          <div data-reveal>
            <Reassurance className="mt-8 justify-center" />
          </div>

          <div className="mt-16 sm:mt-20" data-reveal>
            <SiteImage image={HOME_HERO_IMAGE} label="Hero image" priority />
          </div>

          <dl data-reveal className="grid gap-8 border-b border-line py-10 sm:grid-cols-3 sm:py-12">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <p className="text-3xl font-semibold tracking-tight">{fact.value}</p>
                  <p className="mt-2 text-sm text-muted">{fact.label}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section id="services" labelledBy="services-title">
        <SectionHeader
          id="services-title"
          eyebrow="Services"
          title="Everything you need to build, launch and grow software"
          intro="From a first website to a full ERP, we cover the whole development stack, so you deal with one team instead of five."
        />
        <ServiceList />
      </Section>

      <Section id="why" labelledBy="why-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">Why PropushHub</p>
            <h2 id="why-title" className="text-3xl leading-[1.08] sm:text-5xl">
              A development partner you can hold to account
            </h2>
          </div>
          <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7">
            {REASONS.map((reason) => (
              <div key={reason.title} className="border-t border-line-strong pt-5">
                <dt className="text-xl font-semibold tracking-tight">{reason.title}</dt>
                <dd className="mt-3 leading-relaxed text-muted">{reason.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <ProcessSection />

      <FaqSection faqs={HOME_FAQS} title="Questions before you start" />

      <FinalCta />
    </main>
  );
};
