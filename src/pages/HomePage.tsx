import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data/services';
import { HERO, HOME_FAQS, PROCESS_STEPS, REASONS } from '../data/site';
import { HOME_HERO_IMAGE } from '../data/images';
import { Link } from '../lib/router';
import { SiteImage } from '../components/SiteImage';
import { Splash } from '../components/Splash';
import { CountUp } from '../components/reactbits/CountUp';
import { Magnet } from '../components/reactbits/Magnet';
import { Reveal } from '../components/reactbits/Reveal';
import { SplitWords } from '../components/reactbits/SplitWords';
import { SplitText } from '../components/reactbits/SplitText';
import { PartnerRibbon } from '../components/PartnerRibbon';
import { Container, Section, SectionHeader, anim } from '../components/ui';
import {
  FaqSection,
  FinalCta,
  ProcessSection,
  Reassurance,
  ServiceList,
} from '../components/sections';

export const HomePage: React.FC = () => {
  const facts: { value: number | string; label: string }[] = [
    { value: SERVICES.length, label: 'Development services under one roof' },
    { value: PROCESS_STEPS.length, label: 'Clear steps from first call to launch' },
    { value: 'Web · Mobile · Desktop', label: 'Every platform your business uses' },
  ];

  return (
    <>
      <Splash />
      <main id="main">
        <section aria-labelledby="hero-title" className="bg-ink pt-16 sm:pt-24">
          <Container className="text-center">
            <p className="eyebrow hero-anim" style={anim(0)}>
              {HERO.eyebrow}
            </p>
            <SplitWords
              tag="h1"
              id="hero-title"
              text={HERO.title}
              className="mx-auto mt-6 max-w-5xl text-[length:clamp(2.75rem,7.2vw,5.75rem)] leading-[1.04] tracking-[-0.025em]"
            />
            <p
              className="hero-anim mx-auto mt-8 max-w-[52ch] text-lg leading-relaxed text-muted sm:text-xl"
              style={anim(10)}
            >
              {HERO.subtitle}
            </p>
            <div className="hero-anim mt-10 flex flex-wrap items-center justify-center gap-3" style={anim(11)}>
              <Magnet>
                <Link to="/contact" className="btn btn-primary">
                  Get a free quote
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Magnet>
              <Link to="/services" className="btn btn-secondary">
                Explore services
              </Link>
            </div>
            <div className="hero-anim" style={anim(12)}>
              <Reassurance className="mt-8 justify-center" />
            </div>

            <div className="hero-anim mt-16 sm:mt-20" style={anim(13)}>
              <SiteImage image={HOME_HERO_IMAGE} label="Hero image" priority />
            </div>

            <dl className="hero-anim grid gap-8 border-b border-line py-10 sm:grid-cols-3 sm:py-12" style={anim(14)}>
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="sr-only">{fact.label}</dt>
                  <dd>
                    <p className="font-display text-3xl font-medium tracking-tight">
                      {typeof fact.value === 'number' ? <CountUp to={fact.value} /> : fact.value}
                    </p>
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
              <SplitText
                tag="h2"
                id="why-title"
                text="A development partner you can hold to account"
                className="text-3xl leading-[1.08] sm:text-5xl"
              />
            </div>
            <dl className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {REASONS.map((reason, i) => (
                <Reveal key={reason.title} spotlight delay={(i % 2) * 0.1} className="rounded-3xl bg-surface p-7">
                  <dt className="font-display text-xl font-medium tracking-tight">{reason.title}</dt>
                  <dd className="mt-3 leading-relaxed text-muted">{reason.detail}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </Section>

        <ProcessSection />

        <FaqSection faqs={HOME_FAQS} title="Questions before you start" />

        <FinalCta />

        {/* Shown only when roles/home_collaboration_partner is enabled in Firestore. */}
        <PartnerRibbon />
      </main>
    </>
  );
};
