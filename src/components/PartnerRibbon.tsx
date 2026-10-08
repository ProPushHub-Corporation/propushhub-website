import React from 'react';
import type { HomePartner } from '../data/homePartnerTypes';
import { cloudinaryImage } from '../lib/cloudinary';
import { useHomePartners } from '../lib/useHomePartners';
import { Container } from './ui';

const MIN_PER_SET = 8;
const SECONDS_PER_LOGO = 3.5;

const Logo: React.FC<{ partner: HomePartner; decorative: boolean }> = ({ partner, decorative }) => {
  const logo = cloudinaryImage(partner.logo.url, 360, { aspect: '2:1', crop: 'fit', gravity: 'center' });
  const image = (
    <img
      src={logo.src}
      srcSet={logo.srcSet}
      sizes="180px"
      width={360}
      height={180}
      alt={decorative ? '' : partner.logo.alt}
      loading="lazy"
      decoding="async"
      className="max-h-14 w-auto max-w-full object-contain opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
    />
  );
  return partner.url ? (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={decorative ? undefined : partner.name}
      tabIndex={decorative ? -1 : undefined}
      className="group flex h-full w-full items-center justify-center"
    >
      {image}
    </a>
  ) : (
    <span className="group flex h-full w-full items-center justify-center">{image}</span>
  );
};

/**
 * Infinite right-to-left logo ribbon above the footer. It only renders when the `roles/home_collaboration_partner`
 * switch is on in Firestore and the `home_collaboration_partner` collection has published logos (DATA_TYPES.md).
 *
 * The track holds two identical copies of the list and slides left by exactly half its width, which loops
 * seamlessly in pure CSS. The second copy is hidden from assistive technology and the tab order.
 */
export const PartnerRibbon: React.FC = () => {
  const { enabled, items } = useHomePartners();
  if (!enabled || items.length === 0) return null;

  // Repeat short lists so one copy always fills the width of the screen.
  const copy = Array.from({ length: Math.ceil(MIN_PER_SET / items.length) }, () => items).flat();
  const seconds = Math.round(copy.length * SECONDS_PER_LOGO);

  return (
    <section aria-labelledby="partner-ribbon-title" className="border-t border-line bg-ink py-16 sm:py-20">
      <Container>
        <p className="eyebrow">Partners &amp; collaborations</p>
        <h2 id="partner-ribbon-title" className="mt-4 max-w-2xl text-2xl leading-tight sm:text-4xl">
          Companies we collaborate with
        </h2>
      </Container>

      <div
        className="ribbon mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
        style={{ '--ribbon-seconds': `${seconds}s` } as React.CSSProperties}
      >
        <div className="ribbon-track">
          {[false, true].map((decorative) => (
            <ul
              key={decorative ? 'copy' : 'original'}
              aria-hidden={decorative || undefined}
              aria-label={decorative ? undefined : 'Partners and collaborating companies'}
              className="flex shrink-0 items-center gap-12 pr-12"
            >
              {copy.map((partner, i) => (
                <li key={`${partner.slug}-${i}`} className="h-20 w-44 shrink-0">
                  <Logo partner={partner} decorative={decorative || i >= items.length} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};
