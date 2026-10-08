import React, { useState } from 'react';
import type { HomePartner } from '../data/homePartnerTypes';
import { cloudinaryImage } from '../lib/cloudinary';
import { useHomePartners } from '../lib/useHomePartners';
import { Container } from './ui';

/** Every logo sits in a square box of this many CSS pixels (kept in sync with the h-/w- classes below). */
const LOGO_BOX = 120;
const MIN_PER_SET = 12;
const SECONDS_PER_LOGO = 2.4;

const Logo: React.FC<{ partner: HomePartner; decorative: boolean }> = ({ partner, decorative }) => {
  // Logos hosted elsewhere (instead of Cloudinary) can be blocked or removed; show the name rather than a broken image.
  const [failed, setFailed] = useState(false);
  const logo = cloudinaryImage(partner.logo.url, LOGO_BOX * 2, {
    aspect: '1:1',
    crop: 'fit',
    gravity: 'center',
    widths: [LOGO_BOX, LOGO_BOX * 2, LOGO_BOX * 3],
  });
  const image = failed ? (
    <span className="text-center font-display text-lg font-medium leading-tight text-muted transition-colors group-hover:text-fg">
      {partner.name}
    </span>
  ) : (
    <img
      src={logo.src}
      srcSet={logo.srcSet}
      sizes="120px"
      width={LOGO_BOX * 2}
      height={LOGO_BOX * 2}
      alt={decorative ? '' : partner.logo.alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="h-full w-full object-contain opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
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
        className="ribbon mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
        style={{ '--ribbon-seconds': `${seconds}s` } as React.CSSProperties}
      >
        <div className="ribbon-track">
          {[false, true].map((decorative) => (
            <ul
              key={decorative ? 'copy' : 'original'}
              aria-hidden={decorative || undefined}
              aria-label={decorative ? undefined : 'Partners and collaborating companies'}
              className="flex shrink-0 items-center gap-6 pr-6 sm:gap-8 sm:pr-8"
            >
              {copy.map((partner, i) => (
                <li key={`${partner.slug}-${i}`} className="h-[120px] w-[120px] shrink-0">
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
