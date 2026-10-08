import React from 'react';
import { Link } from '../lib/router';

export const Container: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => <div className={`container-x ${className}`}>{children}</div>;

interface SectionProps {
  id?: string;
  /** `light` renders a white surface; the default is black. */
  tone?: 'dark' | 'light';
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  id,
  tone = 'dark',
  labelledBy,
  className = '',
  children,
}) => (
  <section
    id={id}
    aria-labelledby={labelledBy}
    className={`${tone === 'light' ? 'light' : 'bg-ink text-fg'} border-t border-line py-20 sm:py-28 ${className}`}
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
    <h2 id={id} className="text-3xl leading-[1.08] sm:text-5xl">
      {title}
    </h2>
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
