import { PROJECT_SIZE } from '../data/images';
import type { ShowcaseProject } from '../data/showcaseTypes';
import { cloudinaryImage } from './cloudinary';

/**
 * Props for <SiteImage> for one of a project's images: a right-sized Cloudinary delivery URL when the
 * image has one, otherwise just the size and alt text so the "1600 x 1000" placeholder is shown.
 */
export const projectImage = (project: ShowcaseProject, index = 0, width = 1200) => {
  const image = project.images[index] ?? project.images[0];
  const delivery = image?.url ? cloudinaryImage(image.url, width) : {};
  return { ...PROJECT_SIZE, alt: image?.alt ?? project.title, ...delivery };
};
