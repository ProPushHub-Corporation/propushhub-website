const CLOUDINARY_UPLOAD = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)$/;

export interface ResponsiveImage {
  src: string;
  srcSet?: string;
}

const WIDTHS = [480, 800, 1200, 1600];

const withTransform = (url: string, transform: string): string | null => {
  const match = CLOUDINARY_UPLOAD.exec(url);
  return match ? `${match[1]}${transform}/${match[2]}` : null;
};

/** 1200x630 JPEG crop for og:image / JSON-LD, which many crawlers handle better than WebP/AVIF. */
export const cloudinaryOgImage = (url: string): string =>
  withTransform(url, 'c_fill,g_north,w_1200,h_630,f_jpg,q_auto') ?? url;

/**
 * Right-sized, auto-format (WebP/AVIF) delivery for a Cloudinary image at 16:10, anchored to the top
 * so screenshots keep their header. Non-Cloudinary URLs are returned untouched.
 */
export const cloudinaryImage = (
  url: string,
  width = 1200,
  {
    aspect = '16:10',
    gravity = 'north',
    crop = 'fill',
    widths = WIDTHS,
  }: { aspect?: string; gravity?: string; crop?: 'fill' | 'fit'; widths?: number[] } = {}
): ResponsiveImage => {
  const transform = (w: number) => `f_auto,q_auto,c_${crop},g_${gravity},ar_${aspect},w_${w}`;
  const src = withTransform(url, transform(width));
  if (!src) return { src: url };
  return {
    src,
    srcSet: widths.map((w) => `${withTransform(url, transform(w))} ${w}w`).join(', '),
  };
};
