import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import {
  getProjectsByDisplaySection,
  PROJECT_FILTERS,
  ProjectFilterCategory,
  PROJECTS,
} from '../data/projects';
import { useRouter } from '../lib/router';
import { ProjectCard } from '../components/ProjectCard';
import {
  FinalConversionSection,
  GithubExploreSection,
  TrustExperienceSection,
} from '../components/ConversionSections';

export const WorkPage: React.FC = () => {
  const { navigate, openProjectModal } = useRouter();
  const [activeFilter, setActiveFilter] = useState<ProjectFilterCategory>('All');

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.filterCategories.includes(activeFilter));

  const featuredSectionProjects = getProjectsByDisplaySection('featured');
  const aiAdvancedProjects = getProjectsByDisplaySection('ai-advanced');
  const webBusinessProjects = getProjectsByDisplaySection('web-business');
  const mobileProjects = getProjectsByDisplaySection('mobile');

  return (
    <main>
      {/* Page Header */}
      <section className="pt-12 pb-14 border-b border-line bg-surface">
        <div className="max-w-[1240px] mx-auto px-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-fg mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold text-accent mb-2">
                Selected Work · Real-World Projects Built by Our Development Team
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-fg tracking-tight mb-4">
                Complete Digital Products &amp; Software Systems
              </h1>
              <p className="text-muted text-base sm:text-lg leading-relaxed">
                Explore our substantial real-world software work across custom ERP platforms,
                multi-site inventory systems, synchronized web and mobile applications, and
                AI-powered engineering tools.
              </p>
            </div>

            <button
              type="button"
              onClick={() => openProjectModal()}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white btn-primary rounded-full whitespace-nowrap self-start lg:self-auto cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Filter Controls (Functional Segmented Buttons) */}
          <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="flex flex-wrap items-center gap-1.5 p-1.5 bg-ink border border-line rounded-xl w-fit"
            >
              {PROJECT_FILTERS.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-surface-2 text-white shadow-xs'
                        : 'text-muted hover:text-fg bg-surface/5'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            <p className="text-xs font-mono text-dim tabular-nums">
              Showing {filteredProjects.length} of {PROJECTS.length} Selected Projects
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Content Area */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <AnimatePresence mode="wait">
            {activeFilter === 'All' ? (
              <motion.div
                key="categorized-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="space-y-24"
              >
                {/* CATEGORY 1: FEATURED PROJECTS (Largest Cards) */}
                <div>
                  <div className="mb-8 pb-4 border-b border-line flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <p className="text-xs font-mono text-accent mb-1">
                        01. Primary Flagship Systems
                      </p>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-fg">
                        Featured Projects
                      </h2>
                    </div>
                    <p className="text-xs text-dim">
                      Barakah ERP · CoreStock · RoadHelper · AI Clinic Management
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {featuredSectionProjects.map((project) => (
                      <ProjectCard
                        key={`featured-${project.id}`}
                        project={project}
                        variant="prominent"
                      />
                    ))}
                  </div>
                </div>

                {/* CATEGORY 2: AI & ADVANCED SOFTWARE */}
                <div>
                  <div className="mb-8 pb-4 border-b border-line flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <p className="text-xs font-mono text-accent mb-1">
                        02. AI &amp; Engineering Systems
                      </p>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-fg">
                        AI &amp; Advanced Software
                      </h2>
                    </div>
                    <p className="text-xs text-dim">
                      Automated QA Monorepo · Helpdesk &amp; AI Center · Multi-Role AI Workflows
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {aiAdvancedProjects.map((project) => (
                      <ProjectCard
                        key={`ai-${project.id}`}
                        project={project}
                        variant="standard"
                      />
                    ))}
                  </div>
                </div>

                {/* CATEGORY 3: WEB & BUSINESS APPLICATIONS */}
                <div>
                  <div className="mb-8 pb-4 border-b border-line flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <p className="text-xs font-mono text-accent mb-1">
                        03. Commercial &amp; Operational Platforms
                      </p>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-fg">
                        Web &amp; Business Applications
                      </h2>
                    </div>
                    <p className="text-xs text-dim">
                      ERP · Warehouse Management · Academic Portals · Offline-First Field Capture
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {webBusinessProjects.map((project) => (
                      <ProjectCard
                        key={`web-${project.id}`}
                        project={project}
                        variant="standard"
                      />
                    ))}
                  </div>
                </div>

                {/* CATEGORY 4: MOBILE APPLICATIONS / WEB + MOBILE SOLUTIONS */}
                <div>
                  <div className="mb-8 pb-4 border-b border-line flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <p className="text-xs font-mono text-accent mb-1">
                        04. Web + Mobile Solutions &amp; Cross-Platform Apps
                      </p>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-fg">
                        Mobile Applications
                      </h2>
                    </div>
                    <p className="text-xs text-dim">
                      React Native · TypeScript · Real-Time Maps &amp; Messaging
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {mobileProjects.map((project) => (
                      <ProjectCard
                        key={`mobile-${project.id}`}
                        project={project}
                        variant="prominent"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`filtered-${activeFilter}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <div className="mb-8 pb-4 border-b border-line flex items-center justify-between">
                  <h2 className="font-display text-2xl font-bold text-fg">
                    {activeFilter}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveFilter('All')}
                    className="text-xs font-semibold text-accent hover:underline cursor-pointer"
                  >
                    Reset Filter (Show All Categories)
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={`${activeFilter}-${project.id}`}
                      project={project}
                      variant={project.featured ? 'prominent' : 'standard'}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <TrustExperienceSection />
      <GithubExploreSection />
      <FinalConversionSection />
    </main>
  );
};
