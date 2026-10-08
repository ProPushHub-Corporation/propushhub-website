import { PROJECTS } from './projects';
import type { Project } from './projects';
import type { ShowcaseProject } from './showcaseTypes';

/** Firestore rejects `undefined`, so drop it (deeply) before writing. */
const compact = <T>(value: T): T => {
  if (Array.isArray(value)) return value.map(compact) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, compact(v)])
    ) as T;
  }
  return value;
};

const toShowcaseProject = (project: Project, index: number): ShowcaseProject =>
  compact<ShowcaseProject>({
    slug: project.slug,
    title: project.displayTitle,
    category: project.category,
    shortDescription: project.shortDescription,
    longDescription: project.longDescription,
    type: project.type,
    status: project.status,
    technologies: project.technologies,
    allTechnologies: project.allTechnologies,
    features: project.features,
    filterCategories: project.filterCategories,
    images: project.screenshots.map((shot) => ({
      id: shot.id,
      label: shot.label,
      alt: `${project.displayTitle}: ${shot.label}`,
      caption: shot.caption,
      url: shot.url,
    })),
    liveUrl: project.liveUrl,
    secondaryLiveUrl: project.secondaryLiveUrl,
    githubUrl: project.githubUrl,
    secondaryGithubUrl: project.secondaryGithubUrl,
    featured: project.featured,
    published: true,
    order: index + 1,
    caseStudy: {
      overview: project.caseStudy.overview,
      problem: project.caseStudy.problem,
      solution: project.caseStudy.solution,
      keyFeatures: project.caseStudy.keyFeatures,
      architectureSummary: project.caseStudy.architectureSummary,
      workflowSteps: project.caseStudy.workflowSteps,
      techStackByLayer: project.caseStudy.techStackByLayer,
      challenges: project.caseStudy.challenges,
      disclaimer: project.caseStudy.disclaimer,
    },
  });

/**
 * The portfolio data bundled with the repo, in Firestore document shape. Used to seed Firestore
 * (scripts/seed-showcase.ts) and as the build-time fallback when Firestore can't be reached.
 */
export const seedShowcaseProjects = (): ShowcaseProject[] => PROJECTS.map(toShowcaseProject);
