import React from 'react';

interface SiteImageProps {
  image: { width: number; height: number; alt: string; src?: string };
  /** Short caption shown inside the placeholder, e.g. "Hero image". */
  label?: string;
  /** Above-the-fold image: loaded eagerly with high fetch priority. */
  priority?: boolean;
  className?: string;
}

/**
 * Renders the real image when `src` is set, otherwise a "W × H" placeholder
 * with the same aspect ratio, so layout never shifts when the real file arrives.
 */
export const SiteImage: React.FC<SiteImageProps> = ({ image, label, priority, className = '' }) => {
  const { width, height, alt, src } = image;

  if (src) {
    return (
      <img
        src={src}
        width={width}
        height={height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={`block h-auto w-full border border-line ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      style={{ aspectRatio: `${width} / ${height}` }}
      className={`relative w-full overflow-hidden border border-line bg-surface-2 ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full text-line-strong"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="absolute inset-0 grid place-items-center p-4 text-center">
        <div className="bg-surface-2 px-3 py-2">
          <p className="text-sm font-medium tracking-wide text-fg sm:text-base">
            {width} × {height}
          </p>
          {label && <p className="mt-1 text-[11px] uppercase tracking-widest text-dim">{label}</p>}
        </div>
      </div>
    </div>
  );
};
