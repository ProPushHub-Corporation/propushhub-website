import React, { useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { COLLAB_STEPS, COLLAB_TYPES } from '../data/company';
import { PARTNER_GROUPS } from '../data/partnerTypes';
import type { Partner } from '../data/partnerTypes';
import { cloudinaryImage } from '../lib/cloudinary';
import { partnerData } from '../lib/remote';
import { Link } from '../lib/router';
import { useRemoteCollection } from '../lib/useRemoteCollection';
import { SiteImage } from '../components/SiteImage';
import { Reveal } from '../components/reactbits/Reveal';
import { PageHero, Section, SectionHeader } from '../components/ui';
import { FinalCta } from '../components/sections';

const LOGO_SIZE = { width: 320, height: 160 };

/** Company logo on a 2:1 tile, never cropped. A size placeholder shows until a logo URL exists. */
const PartnerLogo: React.FC<{ partner: Partner }> = ({ partner }) => {
  if (!partner.logo?.url) {
    return <SiteImage image={{ ...LOGO_SIZE, alt: `${partner.name} logo` }} label={partner.name} />;
  }
  const logo = cloudinaryImage(partner.logo.url, 480, { aspect: '2:1', gravity: 'center', crop: 'fit' });
  return (
    <div className="grid aspect-[2/1] place-items-center overflow-hidden rounded-3xl border border-line bg-ink p-5">
      <img
        src={logo.src}
        srcSet={logo.srcSet}
        sizes="(min-width: 1024px) 240px, (min-width: 640px) 45vw, 90vw"
        width={LOGO_SIZE.width}
        height={LOGO_SIZE.height}
        alt={partner.logo.alt ?? `${partner.name} logo`}
        loading="lazy"
        decoding="async"
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
};

const PartnerCard: React.FC<{ partner: Partner; index: number }> = ({ partner, index }) => (
  <Reveal as="li" id={partner.slug} spotlight delay={(index % 4) * 0.08} className="flex flex-col rounded-3xl bg-surface p-4 sm:p-5">
    <PartnerLogo partner={partner} />
    <div className="px-1 pb-1 pt-5">
      <h3 className="font-display text-xl font-medium tracking-tight">{partner.name}</h3>
      {partner.description && <p className="mt-2 text-sm leading-relaxed text-muted">{partner.description}</p>}
      {partner.url && (
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
        >
          Visit website
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
    </div>
  </Reveal>
);

export const CollaborationPage: React.FC = () => {
  const { items: partners } = useRemoteCollection(partnerData);
  const groups = useMemo(
    () =>
      PARTNER_GROUPS.map((group) => ({ ...group, partners: partners.filter((p) => p.kind === group.kind) })).filter(
        (group) => group.partners.length > 0
      ),
    [partners]
  );

  return (
    <main id="main">
      <PageHero
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Collaboration' }]}
        eyebrow="Collaboration"
        title="Collaborate with PropushHub"
        titleId="collaboration-title"
        intro="We work with agencies, consultants and technology companies that need a dependable development partner. If you build for clients or products of your own, we would like to hear from you."
      >
        <Link to="/contact?service=collaboration" className="btn btn-primary">
          Propose a collaboration
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link to="/services" className="btn btn-secondary">
          What we build
        </Link>
      </PageHero>

      <Section id="ways-to-collaborate" labelledBy="ways-title">
        <SectionHeader
          id="ways-title"
          eyebrow="Ways to work together"
          title="How companies collaborate with us"
          intro="These are the kinds of partnership we are open to. If yours is different, tell us about it."
        />
        <ul className="grid gap-4 md:grid-cols-2">
          {COLLAB_TYPES.map((item, i) => (
            <Reveal as="li" key={item.title} spotlight delay={(i % 2) * 0.08} className="rounded-3xl bg-surface p-7">
              <span className="text-xs text-dim">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{item.detail}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Partners, ownership and sponsors come from Firestore; a group only appears once it has entries. */}
      {groups.map((group) => (
        <Section key={group.kind} id={`${group.kind}s`} labelledBy={`${group.kind}-title`}>
          <SectionHeader id={`${group.kind}-title`} eyebrow={group.eyebrow} title={group.title} intro={group.intro} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {group.partners.map((partner, i) => (
              <PartnerCard key={partner.slug} partner={partner} index={i} />
            ))}
          </ul>
        </Section>
      ))}

      <Section id="how-it-starts" labelledBy="how-it-starts-title">
        <SectionHeader id="how-it-starts-title" eyebrow="How it starts" title="Three simple steps" />
        <ol className="grid gap-4 md:grid-cols-3">
          {COLLAB_STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} spotlight delay={i * 0.08} className="rounded-3xl bg-surface p-7">
              <span className="text-xs text-dim">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 font-display text-2xl font-medium tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <FinalCta
        serviceSlug="collaboration"
        eyebrow="Collaborate"
        title="Let’s explore working together."
        description="Tell us about your company and what you have in mind."
        action="Propose a collaboration"
        reassurance={false}
      />
    </main>
  );
};
