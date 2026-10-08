import React from 'react';
import { Link } from '../lib/router';
import { SplitText } from './reactbits/SplitText';
import { SplitWords } from './reactbits/SplitWords';

/** Order index for the `.hero-anim` load-in animation (see index.css). */
export const anim = (i: number) => ({ '--i': i }) as React.CSSProperties;

export const Container: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => <div className={`container-x ${className}`}>{children}</div>;

interface SectionProps {
  id?: string;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  id,
  labelledBy,
  className = '',
  children,
}) => (
  <section
    id={id}
    aria-labelledby={labelledBy}
    className={`border-t border-line bg-ink py-20 text-fg sm:py-28 ${className}`}
  >
    <Container>{children}</Container>
  </section>
);

interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  id,
  eyebrow,
  title,
  intro,
  className = '',
}) => (
  <div className={`mb-12 max-w-3xl sm:mb-16 ${className}`}>
    <p className="eyebrow mb-5">{eyebrow}</p>
    <SplitText tag="h2" id={id} text={title} className="text-3xl leading-[1.08] sm:text-5xl" />
    {intro && <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-muted">{intro}</p>}
  </div>
);

export const Breadcrumbs: React.FC<{ items: { name: string; to?: string }[] }> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="mb-10">
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-dim">
      {items.map((item, i) => (
        <li key={item.name} className="flex items-center gap-2">
          {item.to ? (
            <Link to={item.to} className="transition-colors hover:text-fg">
              {item.name}
            </Link>
          ) : (
            <span aria-current="page" className="text-fg-2">
              {item.name}
            </span>
          )}
          {i < items.length - 1 && <span aria-hidden="true">/</span>}
        </li>
      ))}
    </ol>
  </nav>
);

interface PageHeroProps {
  crumbs: { name: string; to?: string }[];
  eyebrow: string;
  /** The page's single <h1>. */
  title: string;
  titleId: string;
  intro: string;
  /** Buttons shown under the intro. */
  children?: React.ReactNode;
}

/** Standard top-of-page block: breadcrumbs, eyebrow, animated H1, intro and optional actions. */
export const PageHero: React.FC<PageHeroProps> = ({ crumbs, eyebrow, title, titleId, intro, children }) => {
  const words = title.split(' ').length;
  return (
    <section aria-labelledby={titleId} className="bg-ink pb-16 pt-10 sm:pb-24">
      <Container>
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow hero-anim" style={anim(0)}>
          {eyebrow}
        </p>
        <SplitWords
          tag="h1"
          id={titleId}
          text={title}
          className="mt-6 max-w-4xl text-[length:clamp(2.5rem,6vw,4.75rem)] leading-[1.06] tracking-[-0.02em]"
        />
        <p
          className="hero-anim mt-8 max-w-[58ch] text-lg leading-relaxed text-muted sm:text-xl"
          style={anim(words + 2)}
        >
          {intro}
        </p>
        {children && (
          <div className="hero-anim mt-10 flex flex-wrap items-center gap-3" style={anim(words + 3)}>
            {children}
          </div>
        )}
      </Container>
    </section>
  );
};
