import React, { useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TEAM_DISCIPLINES } from '../data/company';
import { MEMBER_SIZE } from '../data/images';
import { TEAM_GROUPS } from '../data/teamTypes';
import type { TeamMember } from '../data/teamTypes';
import { cloudinaryImage } from '../lib/cloudinary';
import { Link } from '../lib/router';
import { teamData } from '../lib/remote';
import { useRemoteCollection } from '../lib/useRemoteCollection';
import { SiteImage } from '../components/SiteImage';
import { Reveal } from '../components/reactbits/Reveal';
import { PageHero, Section, SectionHeader } from '../components/ui';
import { FinalCta } from '../components/sections';

const memberImage = (member: TeamMember, width: number) => ({
  ...MEMBER_SIZE,
  alt: member.photo?.alt ?? `${member.name}, ${member.role}`,
  ...(member.photo?.url ? cloudinaryImage(member.photo.url, width, { aspect: '4:5', gravity: 'face' }) : {}),
});

const MemberCard: React.FC<{ member: TeamMember; index: number; large?: boolean }> = ({ member, index, large }) => (
  <Reveal
    as="li"
    id={member.slug}
    spotlight
    delay={(index % 4) * 0.08}
    className={`flex rounded-3xl bg-surface p-4 sm:p-5 ${large ? 'flex-col sm:flex-row sm:items-start sm:gap-6' : 'flex-col'}`}
  >
    <div className={large ? 'sm:w-[220px] sm:shrink-0' : ''}>
      <SiteImage
        image={memberImage(member, 480)}
        sizes={large ? '(min-width: 640px) 220px, 100vw' : '(min-width: 1024px) 260px, (min-width: 640px) 45vw, 100vw'}
        label={member.name}
      />
    </div>
    <div className={`px-1 pb-1 ${large ? 'pt-5 sm:pt-1' : 'pt-5'}`}>
      <h3 className={`font-display font-medium tracking-tight ${large ? 'text-2xl' : 'text-xl'}`}>{member.name}</h3>
      <p className="mt-1 text-sm text-muted">{member.role}</p>
      {member.bio && <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>}
      {member.links && member.links.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {member.links.map((link) => (
            <li key={link.url}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  </Reveal>
);

export const TeamPage: React.FC = () => {
  const { items: members, loading } = useRemoteCollection(teamData);

  const groups = useMemo(
    () => TEAM_GROUPS.map((group) => ({ ...group, members: members.filter((m) => m.group === group.id) })),
    [members]
  );

  return (
    <main id="main">
      <PageHero
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Our team' }]}
        eyebrow="Our team"
        title="The people behind every project"
        titleId="team-title"
        intro="PropushHub is a team of engineers and designers who build and support everything we ship. We work as one team, so your project does not get passed between agencies."
      >
        <Link to="/jobs" className="btn btn-primary">
          Join the team
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link to="/contact" className="btn btn-secondary">
          Talk to us
        </Link>
      </PageHero>

      {groups.map((group) => (
        <Section key={group.id} id={group.id} labelledBy={`${group.id}-title`}>
          <SectionHeader id={`${group.id}-title`} eyebrow={group.eyebrow} title={group.title} />
          {group.members.length > 0 ? (
            <ul
              className={`grid gap-4 ${
                group.id === 'founders' ? 'md:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4'
              }`}
            >
              {group.members.map((member, i) => (
                <MemberCard key={member.slug} member={member} index={i} large={group.id === 'founders'} />
              ))}
            </ul>
          ) : (
            <div className="rounded-3xl bg-surface p-8 sm:p-10" aria-busy={loading}>
              <p className="max-w-[52ch] text-muted">
                {loading ? 'Loading…' : `${group.title} profiles will appear here soon.`}
              </p>
            </div>
          )}
        </Section>
      ))}

      <Section id="disciplines" labelledBy="disciplines-title">
        <SectionHeader
          id="disciplines-title"
          eyebrow="What we are good at"
          title="Skills under one roof"
          intro="Everything a software project needs, from the first sketch to long-term support."
        />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TEAM_DISCIPLINES.map((item, i) => (
            <Reveal as="li" key={item.title} spotlight delay={(i % 3) * 0.08} className="rounded-3xl bg-surface p-7">
              <span className="text-xs text-dim">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{item.detail}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <FinalCta title="Want to work with a team like this?" />
    </main>
  );
};
