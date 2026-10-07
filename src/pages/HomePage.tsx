import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
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
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 -z-10 w-[60rem] h-[30rem] rounded-full bg-indigo-500/20 blur-[120px] animate-float"
          aria-hidden="true"
        />
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-14 items-center">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-7 rounded-full glass text-xs font-medium text-fg-2">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
                </span>
                ERP · Web · Mobile · AI Product Engineering
              </div>

              <h1 className="font-display text-[40px] sm:text-6xl lg:text-[68px] font-bold text-fg leading-[1.04] mb-6">
                We don’t just build landing pages.{' '}
                <span className="gradient-text">We build complete digital products.</span>
              </h1>

              <p className="text-muted text-base sm:text-lg leading-relaxed mb-9 max-w-[60ch]">
                PropushHub designs, engineers, and deploys custom ERP platforms, multi-site
                warehouse systems, synchronized web and React Native mobile applications, and
                AI-powered business software—backed by verifiable, production-deployed code.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 mb-12">
                <button
                  type="button"
                  onClick={() => openProjectModal()}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold btn-primary rounded-full whitespace-nowrap cursor-pointer"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => document.getElementById('selected-work')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-fg glass rounded-full hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Explore Selected Work</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md">
                {[
                  [`${PROJECTS.length}+`, 'Products shipped'],
                  ['3', 'Platforms: Web · Mobile · AI'],
                  ['100%', 'Verifiable code'],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="font-display text-3xl font-bold text-fg">{value}</p>
                    <p className="text-xs text-dim leading-snug mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: floating glass proof card */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            >
              <div className="relative">
                <div className="absolute -inset-px rounded-[28px] bg-gradient-to-br from-indigo-400/50 via-transparent to-teal-300/40 blur-sm" aria-hidden="true" />
                <div className="relative glass bg-surface/70 rounded-[28px] p-6 sm:p-7 shadow-2xl">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-line">
                    <div>
                      <p className="text-xs font-semibold text-accent mb-0.5">
                        Built by our development team
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
                      All {PROJECTS.length} →
                    </button>
                  </div>

                  <div className="space-y-1">
                    {featuredProjects.slice(0, 6).map((proj) => (
                      <div
                        key={proj.id}
                        onClick={() => navigate(`/work/${proj.slug}`)}
                        className="p-3 -mx-3 rounded-2xl flex items-center justify-between gap-4 group cursor-pointer hover:bg-white/5 transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="text-[11px] font-mono text-dim mb-0.5 truncate">
                            {proj.visualHierarchyLabel}
                          </p>
                          <p className="font-display text-sm sm:text-base font-semibold text-fg group-hover:text-accent transition-colors truncate">
                            {proj.title}
                          </p>
                          <p className="text-xs text-dim mt-0.5 truncate">
                            {proj.technologies.slice(0, 4).join(' · ')}
                          </p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 shrink-0 text-dim group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scope marquee */}
          <div className="mt-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
            <div className="flex w-max gap-3 animate-marquee">
              {[...DIGITAL_PRODUCT_PILLARS, ...DIGITAL_PRODUCT_PILLARS].map((pillar, i) => (
                <span
                  key={`${pillar}-${i}`}
                  className="px-4 py-2 rounded-full glass text-sm font-medium text-fg-2 whitespace-nowrap"
                >
                  {pillar}
                </span>
              ))}
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
                className="p-7 rounded-3xl glass card-glow flex flex-col justify-between"
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
