import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Github,
  Maximize2,
  MessageSquare,
  X,
} from 'lucide-react';
import {
  COMPANY_INFO,
  getProjectBySlug,
  PROJECTS,
} from '../data/projects';
import { useRouter } from '../lib/router';

interface CaseStudyPageProps {
  slug: string;
}

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ slug }) => {
  const { navigate, openProjectModal } = useRouter();
  const project = getProjectBySlug(slug);

  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!project) {
    return (
      <main className="py-24 max-w-[1240px] mx-auto px-6 text-center">
        <h1 className="font-display text-3xl font-bold text-slate-900 mb-3">
          Project Case Study Not Found
        </h1>
        <p className="text-slate-600 mb-6">
          The requested project slug could not be located in our portfolio.
        </p>
        <button
          type="button"
          onClick={() => navigate('/work')}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-[#1D4ED8] transition-colors cursor-pointer"
        >
          Return to Selected Work
        </button>
      </main>
    );
  }

  const activeShot =
    project.screenshots[activeShotIndex] || project.screenshots[0];

  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <main>
      {/* 1. PROJECT HERO */}
      <section className="pt-12 pb-16 border-b border-slate-200 bg-white">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button
              type="button"
              onClick={() => navigate('/work')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Projects (/work)</span>
            </button>
            <span className="text-slate-300" aria-hidden="true">
              /
            </span>
            <span className="text-xs font-mono text-slate-500">
              /work/{project.slug}
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              {/* Unboxed Metadata Line */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-[#1D4ED8] mb-3">
                <span>
                  {project.ecosystemBadge
                    ? `${project.ecosystemBadge} — ${project.visualHierarchyLabel}`
                    : project.visualHierarchyLabel}
                </span>
                <span aria-hidden="true" className="text-slate-400">
                  ·
                </span>
                <span className="text-slate-600 font-medium">{project.category}</span>
                <span aria-hidden="true" className="text-slate-400">
                  ·
                </span>
                <span className="text-slate-500 font-normal">
                  {project.caseStudy.attributionLabel}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-5">
                {project.displayTitle}
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-[68ch] mb-6">
                {project.longDescription}
              </p>

              {/* Important Disclaimer if applicable (e.g. Clinic Software / AI QA Agent) */}
              {project.caseStudy.disclaimer && (
                <div className="p-4 rounded-xl bg-[#F7F7F4] border border-slate-300 text-xs text-slate-700 leading-relaxed mb-6 max-w-[68ch]">
                  {project.caseStudy.disclaimer}
                </div>
              )}

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#1D4ED8] rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap"
                  >
                    <span>
                      {project.secondaryLiveUrl
                        ? 'Open User Platform Demo'
                        : 'Open Live Application'}
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {project.secondaryLiveUrl && (
                  <a
                    href={project.secondaryLiveUrl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
                  >
                    <span>{project.secondaryLiveUrl.label}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-900 bg-[#F7F7F4] border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Source on GitHub</span>
                  </a>
                )}

                {project.secondaryGithubUrl && (
                  <a
                    href={project.secondaryGithubUrl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-slate-700 bg-[#F7F7F4] border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
                  >
                    <span>{project.secondaryGithubUrl.label}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Project Classification Metadata Panel */}
            <div className="lg:col-span-4 bg-[#F7F7F4] border border-slate-200 rounded-2xl p-6 space-y-4">
              <div>
                <p className="text-xs font-mono text-slate-500 mb-1">Project Classification</p>
                <p className="text-sm font-semibold text-slate-900">
                  {project.caseStudy.projectNature}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200">
                <p className="text-xs font-mono text-slate-500 mb-1">Attribution</p>
                <p className="text-sm font-medium text-slate-800">
                  {project.caseStudy.attributionLabel}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200">
                <p className="text-xs font-mono text-slate-500 mb-1">Deployment Status</p>
                <p className="text-sm font-medium text-slate-800">{project.status}</p>
              </div>
              <div className="pt-3 border-t border-slate-200">
                <p className="text-xs font-mono text-slate-500 mb-1.5">Primary Stack</p>
                <p className="text-xs font-mono text-slate-700 leading-relaxed">
                  {project.technologies.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SCREENSHOTS & VISUAL SHOWCASE */}
      <section className="py-16 border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-mono text-[#1D4ED8] mb-1">
                Interface &amp; System Views
              </p>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Product Screenshots &amp; Module Views
              </h2>
            </div>

            {project.screenshots.length > 1 && (
              <div
                role="tablist"
                aria-label="Select product view"
                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-xl"
              >
                {project.screenshots.map((shot, idx) => (
                  <button
                    key={shot.id}
                    type="button"
                    role="tab"
                    aria-selected={activeShotIndex === idx}
                    onClick={() => setActiveShotIndex(idx)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      activeShotIndex === idx
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {shot.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {activeShot && (
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">
              <div
                onClick={() => setLightboxOpen(true)}
                className="relative w-full aspect-16/10 bg-slate-900 rounded-xl overflow-hidden border border-slate-200 cursor-zoom-in group"
              >
                <img
                  src={activeShot.url}
                  alt={`${project.displayTitle} — ${activeShot.label}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxOpen(true);
                  }}
                  className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900/90 border border-slate-700 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect Fullscreen</span>
                </button>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                <p>
                  <span className="font-semibold text-slate-900">{activeShot.label}:</span>{' '}
                  {activeShot.caption}
                </p>
                <span className="font-mono text-[11px] text-slate-400 shrink-0">
                  Asset path: {activeShot.replacementPathHint}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2, 3, 4. PROJECT OVERVIEW, PROBLEM & SOLUTION */}
      <section className="py-16 sm:py-20 border-b border-slate-200 bg-white">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="p-7 rounded-2xl bg-[#F7F7F4] border border-slate-200">
              <p className="text-xs font-mono text-[#1D4ED8] font-semibold mb-2">
                01. Project Overview
              </p>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
                Context &amp; Scope
              </h2>
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                {project.caseStudy.overview}
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#F7F7F4] border border-slate-200">
              <p className="text-xs font-mono text-[#1D4ED8] font-semibold mb-2">
                02. The Problem
              </p>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
                Operational Challenge
              </h2>
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                {project.caseStudy.problem}
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#F7F7F4] border border-slate-200">
              <p className="text-xs font-mono text-[#1D4ED8] font-semibold mb-2">
                03. The Solution
              </p>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
                What We Engineered
              </h2>
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                {project.caseStudy.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. KEY FEATURES */}
      <section className="py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-mono text-[#1D4ED8] font-semibold mb-2">
              04. Functional Capabilities
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Key Features &amp; Modules
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Implemented features verified directly against the {project.title} codebase and
              production deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {project.caseStudy.keyFeatures.map((feat, idx) => (
              <div
                key={feat.title}
                className="p-6 rounded-2xl bg-white border border-slate-200"
              >
                <p className="text-xs font-mono text-[#1D4ED8] mb-2">
                  Feature 0{idx + 1}
                </p>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 & 8. ARCHITECTURE / WORKFLOW & TECHNOLOGY STACK */}
      <section className="py-16 sm:py-20 border-b border-slate-200 bg-white">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Architecture & Workflow */}
            <div className="lg:col-span-7">
              <p className="text-xs font-mono text-[#1D4ED8] font-semibold mb-2">
                05. System Architecture &amp; Workflow
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                How the Platform Operates
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                {project.caseStudy.architectureSummary}
              </p>

              <div className="space-y-4">
                {project.caseStudy.workflowSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-5 rounded-xl bg-[#F7F7F4] border border-slate-200 flex items-start gap-4"
                  >
                    <span className="font-mono text-xs font-bold text-[#1D4ED8] pt-1 shrink-0">
                      {step.step}.
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-slate-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack By Layer */}
            <div className="lg:col-span-5">
              <p className="text-xs font-mono text-[#1D4ED8] font-semibold mb-2">
                06. Technology Stack
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Engineering Stack
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                Selected frameworks, state libraries, and infrastructure used in {project.title}.
              </p>

              <div className="space-y-4">
                {project.caseStudy.techStackByLayer.map((layer) => (
                  <div
                    key={layer.layer}
                    className="p-5 rounded-xl bg-[#F7F7F4] border border-slate-200"
                  >
                    <p className="text-xs font-mono text-slate-500 mb-2">
                      {layer.layer}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-mono font-medium text-slate-900">
                      {layer.items.map((item, i) => (
                        <React.Fragment key={item}>
                          <span>{item}</span>
                          {i < layer.items.length - 1 && (
                            <span aria-hidden="true" className="text-slate-400">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9 & 10. CHALLENGES & DEVELOPMENT APPROACH */}
      <section className="py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Technical Challenges */}
            <div className="lg:col-span-7">
              <p className="text-xs font-mono text-[#1D4ED8] font-semibold mb-2">
                07. Engineering Challenges
              </p>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
                Challenges &amp; Technical Resolutions
              </h2>

              <div className="space-y-5">
                {project.caseStudy.challenges.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-slate-200"
                  >
                    <p className="text-xs font-mono text-slate-500 mb-1">
                      Challenge 0{idx + 1}
                    </p>
                    <h3 className="font-display text-base font-bold text-slate-900 mb-2">
                      {c.challenge}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-900">Resolution: </span>
                      {c.resolution}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Development Approach & Live Links */}
            <div className="lg:col-span-5">
              <p className="text-xs font-mono text-[#1D4ED8] font-semibold mb-2">
                08. Implementation Philosophy
              </p>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
                Development Approach
              </h2>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 mb-6">
                {project.caseStudy.developmentApproach.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="font-mono text-xs font-bold text-[#1D4ED8] pt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              {/* 11. LIVE DEMO / GITHUB VERIFICATION BOX */}
              <div className="p-6 rounded-2xl bg-slate-900 text-white">
                <p className="text-xs font-mono text-blue-400 mb-1">
                  09. Direct Verification
                </p>
                <h3 className="font-display text-lg font-bold mb-2">
                  Inspect {project.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Explore the live deployed application or inspect the repository structure on
                  GitHub.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-900 bg-white rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <span>{project.secondaryLiveUrl ? 'Live User App' : 'Live Demo'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.secondaryLiveUrl && (
                    <a
                      href={project.secondaryLiveUrl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#1D4ED8] rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <span>{project.secondaryLiveUrl.label}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub Repository</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. BOTTOM CASE STUDY CTA: "Have a similar project in mind?" -> [Start Your Project] */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="p-8 sm:p-12 rounded-2xl bg-[#F7F7F4] border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-[#1D4ED8] mb-2">
                Build With PropushHub
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
                Have a similar project in mind?
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Whether you need a custom system like {project.title}, a full-stack web or mobile
                application, or an enterprise operational dashboard, let’s discuss your
                requirements.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => openProjectModal(project.category)}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#1D4ED8] rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>Talk on WhatsApp</span>
              </a>

              {nextProject && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveShotIndex(0);
                    navigate(`/work/${nextProject.slug}`);
                  }}
                  className="px-4 py-3.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Next: {nextProject.title} →
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Unobstructed Screenshot Inspection */}
      {lightboxOpen && activeShot && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/90 p-4 sm:p-8 flex flex-col items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between text-white">
              <div>
                <p className="font-display text-sm font-bold">
                  {project.displayTitle} — {activeShot.label}
                </p>
                <p className="text-xs text-slate-400 font-mono">
                  {activeShot.replacementPathHint}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close fullscreen preview"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-slate-950">
              <img
                src={activeShot.url}
                alt={activeShot.label}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[75vh] object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
