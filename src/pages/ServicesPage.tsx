import React from 'react';
import { SERVICES } from '../data/services';
import { Breadcrumbs, Container, Section, SectionHeader, anim } from '../components/ui';
import { FinalCta, ProcessSection, ServiceList } from '../components/sections';
import { Link } from '../lib/router';
import { SplitWords } from '../components/reactbits/SplitWords';

export const ServicesPage: React.FC = () => (
  <main id="main">
    <section aria-labelledby="services-hero-title" className="bg-ink pb-20 pt-10 sm:pb-28">
      <Container>
        <Breadcrumbs items={[{ name: 'Home', to: '/' }, { name: 'Services' }]} />
        <p className="eyebrow hero-anim" style={anim(0)}>
          Services
        </p>
        <SplitWords
          tag="h1"
          id="services-hero-title"
          text="Software development services for every stage of your business"
          className="mt-6 max-w-4xl text-[length:clamp(2.5rem,6vw,4.75rem)] leading-[1.06] tracking-[-0.02em]"
        />
        <p
          className="hero-anim mt-8 max-w-[56ch] text-lg leading-relaxed text-muted sm:text-xl"
          style={anim(10)}
        >
          {SERVICES.length} services covering websites, CMS, e-commerce, web and mobile applications,
          desktop software, ERP, APIs, design, AI and ongoing support. Start with one, or combine
          several in a single project.
        </p>
      </Container>
    </section>

    <Section labelledBy="all-services-title">
      <SectionHeader
        id="all-services-title"
        eyebrow="All services"
        title="Choose what you need"
        intro="Each service has its own page with deliverables, technology and answers to common questions."
      />
      <ServiceList />
      <p className="mt-10 text-muted">
        Not sure which service fits?{' '}
        <Link to="/contact" className="text-fg underline underline-offset-4">
          Describe your idea
        </Link>{' '}
        and we will recommend the right approach.
      </p>
    </Section>

    <ProcessSection />
    <FinalCta />
  </main>
);
