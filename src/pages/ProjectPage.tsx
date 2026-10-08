import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { getServicesForProject } from '../data/services';
import type { ShowcaseProject } from '../data/showcaseTypes';
import { fetchShowcaseProject } from '../lib/showcase';
import { getRouteSeo } from '../lib/seo';
import { projectImage } from '../lib/showcaseImages';
import { getShowcaseSnapshot, setShowcaseSnapshot, sortProjects } from '../lib/showcaseStore';
import { Link, useRouter } from '../lib/router';
import { applySeo } from '../lib/useSeo';
import { SiteImage } from '../components/SiteImage';
import { Reveal } from '../components/reactbits/Reveal';
import { SplitWords } from '../components/reactbits/SplitWords';
import { Breadcrumbs, Container, Section, SectionHeader, anim } from '../components/ui';
import { FinalCta } from '../components/sections';
import { NotFoundPage } from './NotFoundPage';

const chip = 'rounded-full border border-line-strong px-4 py-1.5 text-sm text-fg-2';

const ExternalButton: React.FC<{ href: string; primary?: boolean; children: React.ReactNode }> = ({
  href,
  primary,
  children,
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`btn ${primary ? 'btn-primary' : 'btn-secondary'}`}>
    {children}
    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
  </a>
);

const ProjectDetails: React.FC<{ project: ShowcaseProject; all: ShowcaseProject[] }> = ({ project, all }) => {
  const study = project.caseStudy;
  const services = getServicesForProject(project.slug);
  const index = all.findIndex((p) => p.slug === project.slug);
  const previous = index > 0 ? all[index - 1] : undefined;
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : undefined;
  const gallery = project.images.slice(1);
  const wordCount = project.title.split(' ').length;

  return (
    <main id="main">
      <section aria-labelledby="project-title" className="bg-ink pb-16 pt-10 sm:pb-24">
        <Container>
          <Breadcrumbs
            items={[{ name: 'Home', to: '/' }, { name: 'Showcase', to: '/showcase' }, { name: project.title }]}
          />
          <p className="eyebrow hero-anim" style={anim(0)}>
            {project.category}
          </p>
          <SplitWords
            tag="h1"
            id="project-title"
            text={project.title}
            className="mt-6 max-w-4xl text-[length:clamp(2.5rem,6vw,4.75rem)] leading-[1.06] tracking-[-0.02em]"
          />
          <p
            className="hero-anim mt-8 max-w-[60ch] text-lg leading-relaxed text-muted sm:text-xl"
            style={anim(wordCount + 2)}
          >
            {project.shortDescription}
          </p>

          {study?.disclaimer && (
            <p className="hero-anim mt-6 max-w-[62ch] rounded-2xl bg-surface px-5 py-4 text-sm leading-relaxed text-fg-2" style={anim(wordCount + 3)}>
              {study.disclaimer}
            </p>
          )}

          <div className="hero-anim mt-10 flex flex-wrap items-center gap-3" style={anim(wordCount + 4)}>
            {project.liveUrl && (
              <ExternalButton href={project.liveUrl} primary>
                {project.secondaryLiveUrl ? 'Open user app' : 'Open live demo'}
              </ExternalButton>
            )}
            {project.secondaryLiveUrl && (
              <ExternalButton href={project.secondaryLiveUrl.url}>{project.secondaryLiveUrl.label}</ExternalButton>
            )}
            {project.githubUrl && <ExternalButton href={project.githubUrl}>Source code</ExternalButton>}
            {project.secondaryGithubUrl && (
              <ExternalButton href={project.secondaryGithubUrl.url}>{project.secondaryGithubUrl.label}</ExternalButton>
            )}
          </div>

          <dl className="hero-anim mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-3" style={anim(wordCount + 5)}>
            <div>
              <dt className="eyebrow">Project type</dt>
              <dd className="mt-2 text-fg-2">{project.type}</dd>
            </div>
            <div>
              <dt className="eyebrow">Status</dt>
              <dd className="mt-2 text-fg-2">{project.status}</dd>
            </div>
            <div>
              <dt className="eyebrow">Built with</dt>
              <dd className="mt-2 text-fg-2">{project.technologies.slice(0, 4).join(', ')}</dd>
            </div>
          </dl>

          <div className="hero-anim mt-12" style={anim(wordCount + 6)}>
            <SiteImage image={projectImage(project, 0, 1600)} sizes="(min-width: 1200px) 1136px, 100vw" label={project.title} priority />
          </div>
        </Container>
      </section>

      <Section id="overview" labelledBy="overview-title">
        <SectionHeader id="overview-title" eyebrow="Overview" title={`About ${project.title}`} />
        {study ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              ['Context', study.overview],
              ['The problem', study.problem],
              ['The solution', study.solution],
            ].map(([heading, text], i) => (
              <Reveal key={heading} spotlight delay={i * 0.08} className="rounded-3xl bg-surface p-7">
                <h3 className="font-display text-xl font-medium tracking-tight">{heading}</h3>
                <p className="mt-3 leading-relaxed text-muted">{text}</p>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="max-w-[68ch] text-lg leading-relaxed text-muted">{project.longDescription}</p>
        )}
        {study && <p className="mt-8 max-w-[68ch] leading-relaxed text-muted">{project.longDescription}</p>}
      </Section>

      <Section id="features" labelledBy="features-title">
        <SectionHeader id="features-title" eyebrow="Features" title="What it does" />
        {study && study.keyFeatures.length > 0 ? (
          <ul className="grid gap-4 md:grid-cols-2">
            {study.keyFeatures.map((feature, i) => (
              <Reveal as="li" key={feature.title} spotlight delay={(i % 2) * 0.08} className="rounded-3xl bg-surface p-7">
                <span className="text-xs text-dim">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 font-display text-xl font-medium tracking-tight">{feature.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{feature.detail}</p>
              </Reveal>
            ))}
          </ul>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {project.features.map((feature) => (
              <li key={feature} className="rounded-2xl bg-surface px-5 py-4">
                {feature}
              </li>
            ))}
          </ul>
        )}
      </Section>

      {study && (study.workflowSteps.length > 0 || study.architectureSummary) && (
        <Section id="how-it-works" labelledBy="how-title">
          <SectionHeader id="how-title" eyebrow="How it works" title="Architecture and workflow" intro={study.architectureSummary} />
          <ol className="grid gap-4 md:grid-cols-2">
            {study.workflowSteps.map((step, i) => (
              <Reveal as="li" key={step.title} spotlight delay={(i % 2) * 0.08} className="rounded-3xl bg-surface p-7">
                <span className="text-xs text-dim">{step.step}</span>
                <h3 className="mt-4 font-display text-xl font-medium tracking-tight">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </Section>
      )}

      <Section id="technology" labelledBy="technology-title">
        <SectionHeader id="technology-title" eyebrow="Technology" title="Tools used" />
        {study && study.techStackByLayer.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {study.techStackByLayer.map((layer, i) => (
              <Reveal key={layer.layer} delay={(i % 2) * 0.08} className="rounded-3xl bg-surface p-7">
                <h3 className="font-display text-lg font-medium tracking-tight">{layer.layer}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {layer.items.map((item) => (
                    <li key={item} className={`${chip} bg-ink`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {project.allTechnologies.map((tech) => (
              <li key={tech} className={chip}>
                {tech}
              </li>
            ))}
          </ul>
        )}
      </Section>

      {study && study.challenges.length > 0 && (
        <Section id="challenges" labelledBy="challenges-title">
          <SectionHeader id="challenges-title" eyebrow="Challenges" title="Problems we solved along the way" />
          <ul className="space-y-4">
            {study.challenges.map((item, i) => (
              <Reveal as="li" key={item.challenge} spotlight delay={0} className="rounded-3xl bg-surface p-7">
                <span className="text-xs text-dim">Challenge {String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-xl font-medium tracking-tight">{item.challenge}</h3>
                <p className="mt-2 max-w-[68ch] leading-relaxed text-muted">
                  <span className="font-medium text-fg">Resolution: </span>
                  {item.resolution}
                </p>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {gallery.length > 0 && (
        <Section id="gallery" labelledBy="gallery-title">
          <SectionHeader id="gallery-title" eyebrow="Screens" title="Inside the product" />
          <div className="grid gap-6 md:grid-cols-2">
            {gallery.map((image, i) => (
              <Reveal as="div" key={image.id} delay={(i % 2) * 0.08}>
                <figure>
                  <SiteImage image={projectImage(project, i + 1, 1200)} sizes="(min-width: 768px) 560px, 100vw" label={image.label} />
                  <figcaption className="mt-3 text-sm text-muted">{image.caption ?? image.label}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {services.length > 0 && (
        <Section id="services" labelledBy="project-services-title">
          <SectionHeader id="project-services-title" eyebrow="Related services" title="Need something similar?" />
          <ul className="grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group flex h-full flex-col justify-between gap-8 rounded-3xl bg-surface p-7 transition-colors hover:bg-fg"
                >
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-tight transition-colors group-hover:text-ink">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted transition-colors group-hover:text-ink/70">
                      {service.summary}
                    </p>
                  </div>
                  <ArrowUpRight aria-hidden="true" className="h-5 w-5 transition-colors group-hover:text-ink" />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {(previous || next) && (
        <nav aria-label="More projects" className="border-t border-line bg-ink py-12">
          <Container className="flex flex-wrap items-center justify-between gap-6">
            {previous ? (
              <Link to={`/showcase/${previous.slug}`} className="group inline-flex items-center gap-3 font-display text-lg font-medium">
                <ArrowLeft aria-hidden="true" className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                <span>
                  <span className="eyebrow block">Previous project</span>
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link to={`/showcase/${next.slug}`} className="group inline-flex items-center gap-3 text-right font-display text-lg font-medium">
                <span>
                  <span className="eyebrow block">Next project</span>
                  {next.title}
                </span>
                <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </Container>
        </nav>
      )}

      <FinalCta title={`Want something like ${project.title}? Let’s talk.`} />
    </main>
  );
};

export const ProjectPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { pathname } = useRouter();
  const [project, setProject] = useState<ShowcaseProject | null>(
    () => getShowcaseSnapshot()?.find((p) => p.slug === slug) ?? null
  );
  const [status, setStatus] = useState<'ready' | 'loading' | 'missing'>(project ? 'ready' : 'loading');

  // A project added to Firestore after the last build has no prerendered page: load it on demand.
  useEffect(() => {
    if (project) return;
    let cancelled = false;
    fetchShowcaseProject(slug)
      .then((found) => {
        if (cancelled) return;
        if (!found) {
          setStatus('missing');
          return;
        }
        const all = sortProjects([...(getShowcaseSnapshot() ?? []), found]);
        setShowcaseSnapshot(all);
        setProject(found);
        setStatus('ready');
        applySeo(getRouteSeo(pathname, { showcase: all }));
      })
      .catch(() => {
        if (!cancelled) setStatus('missing');
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (status === 'missing') return <NotFoundPage />;
  if (!project) {
    return (
      <main id="main" className="bg-ink py-24" aria-busy="true">
        <Container>
          <div className="h-4 w-40 rounded-full bg-surface-2" />
          <div className="mt-6 h-16 w-2/3 rounded-3xl bg-surface-2" />
          <div className="mt-8 aspect-[16/10] rounded-3xl bg-surface-2" />
        </Container>
      </main>
    );
  }
  return <ProjectDetails project={project} all={getShowcaseSnapshot() ?? [project]} />;
};
