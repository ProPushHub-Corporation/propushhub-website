import React from 'react';
import { ArrowUpRight, Mail, MessageCircle, Plus } from 'lucide-react';
import { JOB_TRAITS } from '../data/company';
import { COMPANY_INFO } from '../data/site';
import { jobData } from '../lib/remote';
import { Link } from '../lib/router';
import { useRemoteCollection } from '../lib/useRemoteCollection';
import { Reveal } from '../components/reactbits/Reveal';
import { PageHero, Section, SectionHeader } from '../components/ui';
import { FinalCta } from '../components/sections';

const chip = 'rounded-full border border-line-strong px-3 py-1 text-xs text-fg-2';

export const JobsPage: React.FC = () => {
  const { items: jobs, loading } = useRemoteCollection(jobData);

  return (
    <main id="main">
      <PageHero
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Jobs' }]}
        eyebrow="Jobs"
        title="Jobs at PropushHub"
        titleId="jobs-title"
        intro="We are always interested in good engineers, designers and testers. See the open roles below, or send us your work and tell us what you would like to do."
      >
        <Link to="/contact?service=careers" className="btn btn-primary">
          Send your application
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link to="/team" className="btn btn-secondary">
          Meet the team
        </Link>
      </PageHero>

      <Section id="open-roles" labelledBy="open-roles-title">
        <SectionHeader id="open-roles-title" eyebrow="Open positions" title="Current openings" />

        {jobs.length > 0 ? (
          <div className="space-y-3">
            {jobs.map((job, i) => (
              <details key={job.slug} id={job.slug} className="group rounded-3xl bg-surface px-6 sm:px-8" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl">{job.title}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      <li className={chip}>{job.department}</li>
                      <li className={chip}>{job.type}</li>
                      <li className={chip}>{job.remote ? `Remote · ${job.location}` : job.location}</li>
                    </ul>
                  </div>
                  <Plus aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform group-open:rotate-45" />
                </summary>
                <div className="space-y-6 pb-8 leading-relaxed text-muted">
                  <p>{job.summary}</p>
                  <div>
                    <h4 className="font-display text-base font-medium text-fg">What you will do</h4>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5">
                      {job.responsibilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-display text-base font-medium text-fg">What we are looking for</h4>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5">
                      {job.requirements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={job.applyUrl ?? `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                    {...(job.applyUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="btn btn-primary"
                  >
                    Apply for this role
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </details>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-surface p-8 sm:p-12" aria-busy={loading}>
            <h3 className="font-display text-2xl font-medium tracking-tight">
              {loading ? 'Loading openings…' : 'No open positions right now'}
            </h3>
            {!loading && (
              <>
                <p className="mt-3 max-w-[56ch] leading-relaxed text-muted">
                  We are not advertising a role at the moment, but we are happy to hear from talented people. Send your
                  CV and a link to your work, tell us what you would like to do, and we will reach out if a suitable role
                  opens.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent('Job application')}`}
                    className="btn btn-primary"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Email your CV
                  </a>
                  <a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
              </>
            )}
          </div>
        )}
      </Section>

      <Section id="what-we-look-for" labelledBy="what-we-look-for-title">
        <SectionHeader
          id="what-we-look-for-title"
          eyebrow="Who we look for"
          title="What matters to us"
          intro="Skills can be learned. These are the things we value in everyone we work with."
        />
        <dl className="grid gap-4 sm:grid-cols-2">
          {JOB_TRAITS.map((trait, i) => (
            <Reveal key={trait.title} spotlight delay={(i % 2) * 0.08} className="rounded-3xl bg-surface p-7">
              <dt className="font-display text-xl font-medium tracking-tight">{trait.title}</dt>
              <dd className="mt-3 leading-relaxed text-muted">{trait.detail}</dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      <FinalCta
        serviceSlug="careers"
        eyebrow="Join us"
        title="Think you would fit in? Say hello."
        description="Send your CV and a link to your work, and tell us what you would like to do."
        action="Send your application"
        reassurance={false}
      />
    </main>
  );
};
