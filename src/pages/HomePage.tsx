import React from 'react';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import {
  getHomepageFeaturedProjects,
  PROJECTS,
} from '../data/projects';
import { useRouter } from '../lib/router';
import { ProjectCard } from '../components/ProjectCard';
import {
  FinalConversionSection,
  GithubExploreSection,
  TrustExperienceSection,
} from '../components/ConversionSections';

const DIGITAL_PRODUCT_PILLARS = [
  'Website Development',
  'Web Applications',
  'Mobile Applications',
  'ERP Systems',
  'Business Software',
  'AI Applications',
  'Dashboards',
  'APIs',
  'Database Systems',
  'Deployment',
];

const CORE_CAPABILITIES = [
  {
    number: '01',
    title: 'Custom ERP & Business Operations Software',
    description:
      'End-to-end commercial systems engineered for inventory control, multi-item billing, purchase ledgers, client-side invoice OCR, bilingual LTR/RTL workflows, and financial reporting.',
    proofSlug: 'barakah-erp',
    proofLabel: 'Inspect Barakah ERP Case Study →',
  },
  {
    number: '02',
    title: 'Enterprise Inventory & Multi-Site Warehouse Systems',
    description:
      'Dual-portal warehouse architectures separating daily floor operations (User Panel) from executive multi-site governance and role-based permissions (Admin Panel).',
    proofSlug: 'corestock',
    proofLabel: 'Inspect CoreStock Case Study →',
  },
  {
    number: '03',
    title: 'Web + Mobile Application Ecosystems',
    description:
      'Synchronized Next.js web platforms and React Native mobile apps sharing real-time Firestore state, live GPS map tracking, and multi-role Customer, Helper, and Admin workflows.',
    proofSlug: 'roadhelper',
    proofLabel: 'Inspect RoadHelper Case Study →',
  },
  {
    number: '04',
    title: 'AI-Integrated Platforms & Developer Tooling',
    description:
      'Multi-role healthcare and helpdesk SaaS platforms alongside automated QA monorepos with Playwright browser verification, static security scanning, and Gemini AI workflows.',
    proofSlug: 'ai-qa-agent',
    proofLabel: 'Inspect AI QA Agent Case Study →',
  },
];

export const HomePage: React.FC = () => {
  const { navigate, openProjectModal } = useRouter();
  const featuredProjects = getHomepageFeaturedProjects();

  return (
    <main>
      {/* HERO SECTION */}
      <section className="pt-14 pb-20 sm:pt-20 sm:pb-24 border-b border-line">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Proposition & Primary Action */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-accent mb-4">
                <span>PropushHub Software Engineering</span>
                <span aria-hidden="true">·</span>
                <span className="text-muted font-medium">
                  ERP, Web, Mobile &amp; AI Product Development
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold text-fg tracking-tight leading-[1.08] mb-6">
                We don’t just build landing pages. We build complete digital products.
              </h1>

              <p className="text-muted text-base sm:text-lg leading-relaxed mb-8 max-w-[62ch]">
                PropushHub designs, engineers, and deploys custom ERP platforms, multi-site
                warehouse systems, synchronized web and React Native mobile applications, and
                AI-powered business software—backed by verifiable, production-deployed code.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  type="button"
                  onClick={() => openProjectModal()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white btn-primary rounded-full whitespace-nowrap cursor-pointer"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('selected-work');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-fg bg-surface border border-line-strong rounded-lg hover:bg-surface/10 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Explore Selected Work</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* 10-Pillar Product Capability Strip (Clean unboxed typography) */}
              <div className="pt-6 border-t border-line">
                <p className="text-xs font-mono text-dim mb-2.5">
                  End-to-End Engineering Scope:
                </p>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs sm:text-[13px] font-medium text-fg-2">
                  {DIGITAL_PRODUCT_PILLARS.map((pillar, index) => (
                    <React.Fragment key={pillar}>
                      <span>{pillar}</span>
                      {index < DIGITAL_PRODUCT_PILLARS.length - 1 && (
                        <span aria-hidden="true" className="text-accent font-bold">
                          +
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Immediate Proof Matrix of Real Built Systems */}
            <div className="lg:col-span-5 bg-surface border border-line rounded-2xl p-6 sm:p-7">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-line">
                <div>
                  <p className="text-xs font-semibold text-accent">
                    Projects Built by Our Development Team
                  </p>
                  <h2 className="font-display text-lg font-bold text-fg">
                    Real-World Software Systems
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/work')}
                  className="text-xs font-semibold text-muted hover:text-accent transition-colors whitespace-nowrap cursor-pointer"
                >
                  All {PROJECTS.length} Projects →
                </button>
              </div>

              <div className="divide-y divide-line">
                {featuredProjects.slice(0, 6).map((proj) => (
                  <div
                    key={proj.id}
                    className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-4 group"
                  >
                    <div>
                      <p className="text-[11px] font-mono text-dim mb-0.5">
                        {proj.visualHierarchyLabel}
                      </p>
                      <button
                        type="button"
                        onClick={() => navigate(`/work/${proj.slug}`)}
                        className="font-display text-sm sm:text-base font-bold text-fg group-hover:text-accent transition-colors text-left cursor-pointer"
                      >
                        {proj.title}
                      </button>
                      <p className="text-xs text-dim mt-0.5 line-clamp-1">
                        {proj.technologies.slice(0, 4).join(' · ')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-1">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Open ${proj.title} live deployment`}
                          className="text-xs font-medium text-dim hover:text-accent transition-colors inline-flex items-center gap-1"
                        >
                          <span>Live</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => navigate(`/work/${proj.slug}`)}
                        className="text-xs font-semibold text-fg hover:text-accent transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Case Study →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED WORK / WHAT WE'VE BUILT (6 Strongest Projects on Homepage) */}
      <section id="selected-work" className="py-20 sm:py-24">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-accent mb-2">
                Selected Work · Projects Built by Our Development Team
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-fg tracking-tight mb-3">
                What We’ve Built
              </h2>
              <p className="text-muted text-base leading-relaxed">
                Substantial, production-oriented software applications demonstrating custom ERP
                architecture, multi-site warehouse platforms, synchronized web and mobile
                ecosystems, and AI-powered engineering tools.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/work')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-fg bg-surface border border-line-strong rounded-lg hover:border-accent transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
            >
              <span>View All Work →</span>
            </button>
          </div>

          {/* Row 1: #1 Barakah ERP (Most Prominent) + #2 CoreStock (Unified User/Admin with 5-screenshot switcher) */}
          <div className="grid lg:grid-cols-12 gap-8 mb-8">
            {featuredProjects[0] && (
              <div className="lg:col-span-7 flex">
                <ProjectCard project={featuredProjects[0]} variant="prominent" />
              </div>
            )}
            {featuredProjects[1] && (
              <div className="lg:col-span-5 flex">
                <ProjectCard project={featuredProjects[1]} variant="prominent" />
              </div>
            )}
          </div>

          {/* Row 2: #3 RoadHelper ("Web + Mobile Solutions" Prominent) + #4 AI Clinic Management */}
          <div className="grid lg:grid-cols-12 gap-8 mb-8">
            {featuredProjects[2] && (
              <div className="lg:col-span-7 flex">
                <ProjectCard project={featuredProjects[2]} variant="prominent" />
              </div>
            )}
            {featuredProjects[3] && (
              <div className="lg:col-span-5 flex">
                <ProjectCard project={featuredProjects[3]} variant="prominent" />
              </div>
            )}
          </div>

          {/* Row 3: #5 Helplytics + #6 AI QA Agent */}
          <div className="grid lg:grid-cols-12 gap-8">
            {featuredProjects[4] && (
              <div className="lg:col-span-6 flex">
                <ProjectCard project={featuredProjects[4]} variant="standard" />
              </div>
            )}
            {featuredProjects[5] && (
              <div className="lg:col-span-6 flex">
                <ProjectCard project={featuredProjects[5]} variant="standard" />
              </div>
            )}
          </div>

          {/* Homepage Portfolio Footer CTA: View All Work → /work */}
          <div className="mt-12 pt-8 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-muted">
              Looking for additional web, offline-first field data, and cross-platform mobile
              projects (including <span className="font-semibold text-fg">Student Portal</span>,{' '}
              <span className="font-semibold text-fg">Field Capture</span>, and{' '}
              <span className="font-semibold text-fg">TalkBridge</span>)?
            </p>
            <button
              type="button"
              onClick={() => navigate('/work')}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-surface-2 rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>View All Work →</span>
            </button>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES SECTION (Adjacent to Selected Work proof) */}
      <section id="capabilities" className="py-20 sm:py-24 bg-surface border-t border-line">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-semibold text-accent mb-2">
              Software Architecture · Product Engineering
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-fg tracking-tight mb-4">
              What Kind of Software PropushHub Builds
            </h2>
            <p className="text-muted text-base leading-relaxed">
              We partner with businesses and founders to architect complete digital systems—from
              multi-tenant ERPs and warehouse control panels to React Native mobile apps and
              AI-assisted workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {CORE_CAPABILITIES.map((cap) => (
              <div
                key={cap.number}
                className="p-7 rounded-2xl bg-base border border-line flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-mono text-accent font-semibold mb-2">
                    {cap.number}. Engineering Domain
                  </p>
                  <h3 className="font-display text-xl font-bold text-fg mb-3">
                    {cap.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-muted leading-relaxed mb-6">
                    {cap.description}
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => navigate(`/work/${cap.proofSlug}`)}
                    className="text-xs font-semibold text-fg hover:text-accent transition-colors cursor-pointer"
                  >
                    {cap.proofLabel}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SECTION: Built With Real-World Development Experience */}
      <TrustExperienceSection />

      {/* GITHUB CTA: Explore More Projects */}
      <GithubExploreSection />

      {/* FINAL CONVERSION SECTION: Have a Project in Mind? */}
      <FinalConversionSection />
    </main>
  );
};
