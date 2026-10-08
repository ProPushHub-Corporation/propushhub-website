import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getServiceBySlug } from '../data/services';
import { Link } from '../lib/router';
import { SiteImage } from '../components/SiteImage';
import { Breadcrumbs, Container, Section, SectionHeader } from '../components/ui';
import { FaqSection, FinalCta, ProcessSection, Reassurance } from '../components/sections';
import { NotFoundPage } from './NotFoundPage';

export const ServicePage: React.FC<{ slug: string }> = ({ slug }) => {
  const service = getServiceBySlug(slug);
  if (!service) return <NotFoundPage />;

  const related = service.relatedServices
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  // Alternate black / white sections down the page.
  let tone: 'dark' | 'light' = 'light';
  const next = () => {
    const current = tone;
    tone = tone === 'light' ? 'dark' : 'light';
    return current;
  };

  return (
    <main id="main">
      <section aria-labelledby="service-title" className="bg-ink pb-20 pt-10 sm:pb-28">
        <Container>
          <Breadcrumbs
            items={[{ name: 'Home', to: '/' }, { name: 'Services', to: '/services' }, { name: service.name }]}
          />
          <p className="eyebrow animate-rise">Service</p>
          <h1
            id="service-title"
            className="animate-rise mt-6 max-w-4xl text-[length:clamp(2.5rem,6vw,4.75rem)] leading-[1] tracking-[-0.04em]"
            style={{ animationDelay: '80ms' }}
          >
            {service.h1}
          </h1>
          <p
            className="animate-rise mt-8 max-w-[58ch] text-lg leading-relaxed text-muted sm:text-xl"
            style={{ animationDelay: '160ms' }}
          >
            {service.intro}
          </p>
          <div className="animate-rise mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: '240ms' }}>
            <Link to={`/contact?service=${service.slug}`} className="btn btn-primary">
              Get a quote
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/services" className="btn btn-secondary">
              All services
            </Link>
          </div>
          <Reassurance className="mt-8" />
          <SiteImage image={service.image} label={service.name} priority className="mt-14 sm:mt-20" />
        </Container>
      </section>

      <Section id="included" tone={next()} labelledBy="included-title">
        <SectionHeader
          id="included-title"
          eyebrow="What you get"
          title={`What’s included in our ${service.name.toLowerCase()}`}
        />
        <ul className="grid gap-x-10 gap-y-10 md:grid-cols-2">
          {service.deliverables.map((item, i) => (
            <li key={item.title} className="border-t border-fg pt-5">
              <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-5 text-xl">{item.title}</h3>
              <p className="mt-2 max-w-[48ch] leading-relaxed text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="fit" tone={next()} labelledBy="fit-title">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-5">Who it’s for</p>
            <h2 id="fit-title" className="text-3xl leading-[1.08] sm:text-4xl">
              Built for teams like yours
            </h2>
            <ul className="mt-8 border-t border-line-strong">
              {service.forWho.map((item) => (
                <li key={item} className="border-b border-line py-4 text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-5">Technology</p>
            <h2 className="text-3xl leading-[1.08] sm:text-4xl">Tools we use</h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {service.stack.map((tech) => (
                <li key={tech} className="border border-line-strong px-3 py-1.5 font-mono text-sm text-fg-2">
                  {tech}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[48ch] text-sm leading-relaxed text-muted">
              We choose technology to fit your project, budget and team, not the other way round.
            </p>
          </div>
        </div>
      </Section>

      <ProcessSection tone={next()} />

      <FaqSection
        faqs={service.faqs}
        tone={next()}
        id="faq"
        title={`${service.name}: common questions`}
      />

      <Section id="related-services" tone={next()} labelledBy="related-services-title">
        <SectionHeader id="related-services-title" eyebrow="Related services" title="Often combined with" />
        <ul className="grid gap-px border border-line bg-line md:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug} className="bg-ink">
              <Link
                to={`/services/${item.slug}`}
                className="group flex h-full flex-col justify-between gap-8 p-6 transition-colors hover:bg-fg"
              >
                <div>
                  <h3 className="text-xl transition-colors group-hover:text-ink">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted transition-colors group-hover:text-ink/70">
                    {item.summary}
                  </p>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-5 w-5 transition-colors group-hover:text-ink"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta serviceSlug={service.slug} />
    </main>
  );
};
