import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { Project } from '../data/projects';
import { useRouter } from '../lib/router';

interface ProjectCardProps {
  project: Project;
  variant?: 'prominent' | 'standard';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  variant = 'standard',
}) => {
  const { navigate } = useRouter();
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const activeScreenshot =
    project.screenshots[activeScreenshotIndex] || project.screenshots[0];

  const isProminent = variant === 'prominent';

  return (
    <article
      className={`group bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 ${
        isProminent ? 'p-6 sm:p-8' : 'p-5 sm:p-6'
      }`}
    >
      <div>
        {/* Quiet 1-line unboxed metadata kicker (Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500 mb-2">
          <span className="text-[#1D4ED8] font-semibold">
            {project.ecosystemBadge
              ? `${project.ecosystemBadge} — ${project.visualHierarchyLabel}`
              : project.visualHierarchyLabel}
          </span>
          <span aria-hidden="true">·</span>
          <span>{project.category}</span>
        </div>

        {/* Project Title */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3
            onClick={() => navigate(`/work/${project.slug}`)}
            className={`font-display font-bold text-slate-900 group-hover:text-[#1D4ED8] transition-colors cursor-pointer ${
              isProminent ? 'text-2xl sm:text-[28px] leading-tight' : 'text-xl leading-snug'
            }`}
          >
            {project.displayTitle}
          </h3>
        </div>

        {/* Business-focused description */}
        <p className="text-slate-600 text-[15px] leading-relaxed mb-5 max-w-[68ch]">
          {project.shortDescription}
        </p>

        {/* Interactive Screenshot View Switcher (for CoreStock's 5 views & Barakah ERP's views) */}
        {project.screenshots.length > 1 && (
          <div
            role="tablist"
            aria-label={`${project.title} screenshot views`}
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg mb-3 w-fit"
          >
            {project.screenshots.map((shot, idx) => (
              <button
                key={shot.id}
                type="button"
                role="tab"
                aria-selected={activeScreenshotIndex === idx}
                onClick={() => {
                  setActiveScreenshotIndex(idx);
                  setImageError(false);
                }}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeScreenshotIndex === idx
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {shot.label}
              </button>
            ))}
          </div>
        )}

        {/* Project Screenshot / Visual Container */}
        <div
          onClick={() => navigate(`/work/${project.slug}`)}
          className="relative w-full aspect-16/10 bg-slate-900 rounded-xl overflow-hidden border border-slate-200 mb-5 cursor-pointer"
        >
          {!imageError && activeScreenshot ? (
            <img
              src={activeScreenshot.url}
              alt={`${project.displayTitle} — ${activeScreenshot.label}`}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.01]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-white">
              <p className="font-display text-lg font-bold mb-1">
                {project.displayTitle}
              </p>
              <p className="text-xs text-slate-400 font-mono">
                {activeScreenshot?.replacementPathHint || `/public/projects/${project.slug}/`}
              </p>
            </div>
          )}
        </div>

        {/* Highlighted Capabilities (4 key highlights for prominent cards) */}
        {isProminent && (
          <div className="mb-5 pt-1">
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-600">
              {project.features.slice(0, 6).map((feat) => (
                <div key={feat} className="flex items-baseline gap-2">
                  <span className="text-[#1D4ED8] font-bold" aria-hidden="true">
                    —
                  </span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-200/80 flex flex-col gap-4">
        {/* Curated Technology Stack — Clean unboxed typographic separators */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-500">
          {project.technologies.map((tech, i) => (
            <React.Fragment key={tech}>
              <span className="text-slate-700">{tech}</span>
              {i < project.technologies.length - 1 && (
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Action Row: View Case Study + Optional Live Demo & GitHub */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={() => navigate(`/work/${project.slug}`)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-[#1D4ED8] transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>View Case Study</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[#1D4ED8] transition-colors whitespace-nowrap"
              >
                <span>{project.secondaryLiveUrl ? 'User Demo' : 'Live Demo'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.secondaryLiveUrl && (
              <a
                href={project.secondaryLiveUrl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[#1D4ED8] transition-colors whitespace-nowrap"
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
                className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors whitespace-nowrap"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
