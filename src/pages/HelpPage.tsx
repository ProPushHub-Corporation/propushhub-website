import React from 'react';
import { ArrowUpRight, FileText, LifeBuoy, Mail, MessageCircle } from 'lucide-react';
import { HELP_GROUPS } from '../data/company';
import { COMPANY_INFO } from '../data/site';
import { Link } from '../lib/router';
import { Reveal } from '../components/reactbits/Reveal';
import { PageHero, Section, SectionHeader } from '../components/ui';
import { FaqList, FinalCta } from '../components/sections';

const QUICK_HELP = [
  {
    title: 'Start a project',
    detail: 'Tell us what you want to build and get a written quote.',
    to: '/contact',
    icon: FileText,
  },
  {
    title: 'Get support',
    detail: 'Something not working? Message us on WhatsApp with what you see.',
    href: COMPANY_INFO.whatsappUrl,
    icon: LifeBuoy,
  },
  {
    title: 'Email us',
    detail: COMPANY_INFO.email,
    href: `mailto:${COMPANY_INFO.email}`,
    icon: Mail,
  },
] as const;

export const HelpPage: React.FC = () => (
  <main id="main">
    <PageHero
      crumbs={[{ name: 'Home', to: '/' }, { name: 'Help' }]}
      eyebrow="Help center"
      title="How can we help?"
      titleId="help-title"
      intro="Answers to the questions we hear most, and the quickest ways to reach us if you need a person."
    >
      <Link to="/contact" className="btn btn-primary">
        Contact form
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        WhatsApp
      </a>
    </PageHero>

    <Section id="quick-help" labelledBy="quick-help-title">
      <SectionHeader id="quick-help-title" eyebrow="Quick help" title="Where do you want to start?" />
      <ul className="grid gap-4 md:grid-cols-3">
        {QUICK_HELP.map((item, i) => {
          const Icon = item.icon;
          const body = (
            <>
              <Icon className="h-6 w-6" aria-hidden="true" />
              <h3 className="mt-8 font-display text-xl font-medium tracking-tight">{item.title}</h3>
              <p className="mt-2 break-words text-sm leading-relaxed text-muted">{item.detail}</p>
            </>
          );
          return (
            <Reveal as="li" key={item.title} spotlight delay={i * 0.08} className="rounded-3xl bg-surface">
              {'to' in item ? (
                <Link to={item.to} className="block p-7">
                  {body}
                </Link>
              ) : (
                <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block p-7">
                  {body}
                </a>
              )}
            </Reveal>
          );
        })}
      </ul>
    </Section>

    <Section id="faq" labelledBy="faq-title">
      <SectionHeader id="faq-title" eyebrow="FAQ" title="Frequently asked questions" />
      <div className="space-y-14">
        {HELP_GROUPS.map((group) => (
          <div key={group.title} className="grid gap-6 lg:grid-cols-12">
            <h3 className="font-display text-2xl font-medium tracking-tight lg:col-span-4">{group.title}</h3>
            <FaqList faqs={group.faqs} openFirst={false} className="lg:col-span-8" />
          </div>
        ))}
      </div>
    </Section>

    <FinalCta
      eyebrow="Still need help?"
      title="Can’t find your answer? Ask us directly."
      description="Send a message and a real person will reply."
      action="Contact form"
      reassurance={false}
    />
  </main>
);
