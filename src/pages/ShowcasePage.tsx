import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SHOWCASE_FILTERS } from '../data/showcaseTypes';
import type { ShowcaseFilter, ShowcaseProject } from '../data/showcaseTypes';
import { fetchShowcaseProjects } from '../lib/showcase';
import { projectImage } from '../lib/showcaseImages';
import { whenIdle } from '../lib/motion';
import { getShowcaseSnapshot, setShowcaseSnapshot } from '../lib/showcaseStore';
import { Link } from '../lib/router';
import { SiteImage } from '../components/SiteImage';
import { Reveal } from '../components/reactbits/Reveal';
import { SplitWords } from '../components/reactbits/SplitWords';
import { Breadcrumbs, Container, anim } from '../components/ui';
import { FinalCta } from '../components/sections';

type Filter = 'All' | ShowcaseFilter;
const FILTERS: Filter[] = ['All', ...SHOWCASE_FILTERS];

const CARD_SIZES = '(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw';

const ProjectCard: React.FC<{ project: ShowcaseProject; index: number }> = ({ project, index }) => (
  <Reveal
    as="article"
    id={project.slug}
    spotlight
    delay={(index % 2) * 0.1}
    className="group flex flex-col rounded-3xl bg-surface p-4 sm:p-5"
  >
    <SiteImage image={projectImage(project)} sizes={CARD_SIZES} label={project.title} />

    <div className="flex flex-1 flex-col px-1 pb-1 pt-6 sm:px-2">
      <p className="eyebrow">{project.category}</p>
      <h2 className="mt-3 text-2xl leading-tight sm:text-3xl">
        <Link to={`/showcase/${project.slug}`} className="hover:underline hover:underline-offset-4">
          {project.title}
        </Link>
      </h2>
      <p className="mt-3 leading-relaxed text-muted">{project.shortDescription}</p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
        {project.technologies.slice(0, 5).map((tech) => (
          <li key={tech} className="rounded-full border border-line-strong bg-ink px-3 py-1 text-xs text-fg-2">
            {tech}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-dim">{project.status}</p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Link to={`/showcase/${project.slug}`} className="btn btn-primary !h-10 !px-5 !text-sm">
          View project
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary !h-10 !px-5 !text-sm"
          >
            {project.secondaryLiveUrl ? 'User app' : 'Live demo'}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  </Reveal>
);

export const ShowcasePage: React.FC = () => {
  const [projects, setProjects] = useState<ShowcaseProject[]>(() => getShowcaseSnapshot() ?? []);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(() =>
    (getShowcaseSnapshot()?.length ?? 0) > 0 ? 'ready' : 'loading'
  );
  const [filter, setFilter] = useState<Filter>('All');

  // Show the prerendered/embedded data straight away, then refresh from Firestore.
  useEffect(() => {
    let cancelled = false;
    // With prerendered data already on screen, the refresh can wait until the visitor interacts or the page has settled.
    (projects.length > 0 ? whenIdle() : Promise.resolve())
      .then(() => (cancelled ? [] : fetchShowcaseProjects()))
      .then((fresh) => {
        if (cancelled) return;
        if (fresh.length > 0) {
          setShowcaseSnapshot(fresh);
          setProjects(fresh);
        }
        setStatus(fresh.length > 0 || projects.length > 0 ? 'ready' : 'error');
      })
      .catch((error) => {
        if (import.meta.env.DEV) console.warn('[showcase] could not read Firestore:', error);
        if (!cancelled) setStatus(projects.length > 0 ? 'ready' : 'error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.filterCategories.includes(filter))),
    [projects, filter]
  );

  return (
    <main id="main">
      <section aria-labelledby="showcase-title" className="bg-ink pb-12 pt-10 sm:pb-16">
        <Container>
          <Breadcrumbs items={[{ name: 'Home', to: '/' }, { name: 'Showcase' }]} />
          <p className="eyebrow hero-anim" style={anim(0)}>
            Showcase
          </p>
          <SplitWords
            tag="h1"
            id="showcase-title"
            text="Software we have built"
            className="mt-6 max-w-4xl text-[length:clamp(2.5rem,6vw,4.75rem)] leading-[1.06] tracking-[-0.02em]"
          />
          <p
            className="hero-anim mt-8 max-w-[56ch] text-lg leading-relaxed text-muted sm:text-xl"
            style={anim(6)}
          >
            ERP and inventory systems, web and mobile apps, SaaS dashboards and AI tools. Open a project
            for the full case study, a live demo and the source code.
          </p>

          <div
            role="group"
            aria-label="Filter projects by category"
            className="mt-10 flex flex-wrap items-center gap-2"
          >
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  filter === item
                    ? 'border-fg bg-fg text-ink'
                    : 'border-line-strong text-fg-2 hover:border-fg'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          {status === 'ready' && (
            <p className="mt-5 text-sm text-dim" aria-live="polite">
              Showing {visible.length} of {projects.length} projects
            </p>
          )}
        </Container>
      </section>

      <section aria-label="Projects" className="bg-ink pb-24 sm:pb-32">
        <Container>
          {status === 'loading' && (
            <div className="grid gap-6 md:grid-cols-2" aria-busy="true">
              {[0, 1].map((i) => (
                <div key={i} className="rounded-3xl bg-surface p-5">
                  <div className="aspect-[16/10] rounded-3xl bg-surface-2" />
                  <div className="mt-6 h-4 w-1/3 rounded-full bg-surface-2" />
                  <div className="mt-4 h-8 w-2/3 rounded-full bg-surface-2" />
                  <div className="mt-4 h-4 w-full rounded-full bg-surface-2" />
                </div>
              ))}
            </div>
          )}

          {status === 'error' && (
            <div role="status" className="rounded-3xl bg-surface p-8 sm:p-12">
              <h2 className="text-2xl">Projects are unavailable right now</h2>
              <p className="mt-3 max-w-[52ch] text-muted">
                We could not load the project list. Please try again in a moment, or tell us what you
                want to build and we will share relevant examples.
              </p>
              <Link to="/contact" className="btn btn-primary mt-6">
                Contact us
              </Link>
            </div>
          )}

          {status === 'ready' && (
            <div className="grid gap-6 md:grid-cols-2">
              {visible.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <FinalCta title="Want something like this? Let’s talk." />
    </main>
  );
};
