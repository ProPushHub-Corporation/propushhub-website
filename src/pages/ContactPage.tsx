import React, { useEffect, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronDown, Mail, MessageCircle } from 'lucide-react';
import { CONTACT_TOPICS } from '../data/company';
import { SERVICES } from '../data/services';
import { BUDGET_OPTIONS, COMPANY_INFO } from '../data/site';
import { useRouter } from '../lib/router';
import { SplitWords } from '../components/reactbits/SplitWords';
import { Breadcrumbs, Container, anim } from '../components/ui';
import { Reassurance } from '../components/sections';

const OTHER = 'Not sure yet';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Label: React.FC<{ htmlFor: string; children: React.ReactNode; optional?: boolean }> = ({
  htmlFor,
  children,
  optional,
}) => (
  <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between text-sm font-medium">
    {children}
    {optional && <span className="text-xs font-normal text-dim">Optional</span>}
  </label>
);

const SelectField: React.FC<
  React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }
> = ({ children, className = '', ...rest }) => (
  <div className="relative">
    <select {...rest} className={`field pr-11 ${className}`}>
      {children}
    </select>
    <ChevronDown
      aria-hidden="true"
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
    />
  </div>
);

export const ContactPage: React.FC = () => {
  const { search } = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(OTHER);
  const [budget, setBudget] = useState('');
  const [details, setDetails] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Pre-select the service from /contact?service=<slug> (read after mount to keep SSR and client markup identical).
  useEffect(() => {
    const slug = new URLSearchParams(search).get('service');
    const match = [...SERVICES, ...CONTACT_TOPICS].find((s) => s.slug === slug);
    if (match) setService(match.name);
  }, [search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !details.trim()) {
      setError('Please fill in your name, email and a short description of your project.');
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setSending(true);
    try {
      const body = new FormData();
      body.append('name', name.trim());
      body.append('email', email.trim());
      body.append('service', service);
      body.append('budget', budget || 'Not provided');
      body.append('message', details.trim());
      body.append('_honey', honeypot);
      body.append('_subject', `New project enquiry: ${service}`);
      body.append('_template', 'table');
      body.append('_captcha', 'false');

      const res = await fetch(`https://formsubmit.co/ajax/${COMPANY_INFO.email}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      });
      const result = await res.json().catch(() => null);
      if (res.ok && result && String(result.success) === 'true') {
        setSent(true);
      } else {
        setError('We could not send your message. Please use WhatsApp or email instead.');
      }
    } catch {
      setError('We could not send your message. Please use WhatsApp or email instead.');
    } finally {
      setSending(false);
    }
  };

  return (
    <main id="main" className="bg-ink pb-24 pt-10 sm:pb-32">
      <Container>
        <Breadcrumbs items={[{ name: 'Home', to: '/' }, { name: 'Contact' }]} />
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow hero-anim" style={anim(0)}>
              Contact form · PPH Corporation
            </p>
            <SplitWords
              tag="h1"
              text="Tell us about your project"
              className="mt-6 text-[length:clamp(2.5rem,5.5vw,4.25rem)] leading-[1.06] tracking-[-0.02em]"
            />
            <p
              className="hero-anim mt-6 max-w-[44ch] text-lg leading-relaxed text-muted"
              style={anim(8)}
            >
              Use this contact form to reach PPH Corporation (PropushHub). Share what you want to build
              and roughly when you need it, and we will come back with questions, a suggested approach
              and a written quote.
            </p>
            <Reassurance className="mt-8" />

            <ul className="mt-12 border-t border-line-strong">
              <li className="border-b border-line">
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-5"
                >
                  <span className="flex items-center gap-4">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    <span>
                      <span className="block font-medium">WhatsApp</span>
                      <span className="block text-sm text-muted">{COMPANY_INFO.whatsappNumberDisplay}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </li>
              <li className="border-b border-line">
                <a href={`mailto:${COMPANY_INFO.email}`} className="group flex items-center justify-between gap-4 py-5">
                  <span className="flex items-center gap-4">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                    <span>
                      <span className="block font-medium">Email</span>
                      <span className="block break-all text-sm text-muted">{COMPANY_INFO.email}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            {sent ? (
              <div role="status" className="rounded-3xl bg-surface p-8 sm:p-12">
                <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
                <h2 className="mt-6 text-3xl">Thank you, {name.split(' ')[0]}.</h2>
                <p className="mt-4 max-w-[48ch] leading-relaxed text-muted">
                  We have your enquiry about <span className="text-fg">{service}</span> and will reply
                  to <span className="text-fg">{email}</span>. For a faster conversation, message us on
                  WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${COMPANY_INFO.phone.replace('+', '')}?text=${encodeURIComponent(
                    `Hello PropushHub, I'm ${name}. I just sent an enquiry about ${service}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-8"
                >
                  Continue on WhatsApp
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            ) : (
              <form
                id="contact-form"
                aria-label="PPH Corporation contact form"
                onSubmit={handleSubmit}
                noValidate
                className="rounded-3xl bg-surface p-6 sm:p-10"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="contact-name">Name</Label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="field"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="field"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-service">What do you need?</Label>
                    <SelectField id="contact-service" name="service" value={service} onChange={(e) => setService(e.target.value)}>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                      {CONTACT_TOPICS.map((topic) => (
                        <option key={topic.slug} value={topic.name}>
                          {topic.name}
                        </option>
                      ))}
                      <option value={OTHER}>{OTHER}</option>
                    </SelectField>
                  </div>
                  <div>
                    <Label htmlFor="contact-budget" optional>
                      Budget
                    </Label>
                    <SelectField id="contact-budget" name="budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
                      <option value="">Select a range</option>
                      {BUDGET_OPTIONS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </SelectField>
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="contact-details">Project details</Label>
                    <textarea
                      id="contact-details"
                      name="message"
                      rows={6}
                      required
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="What do you want to build, who is it for, and when do you need it?"
                      className="field resize-y"
                    />
                  </div>
                </div>

                {/* Honeypot: hidden from people, filled in by bots. */}
                <div aria-hidden="true" className="absolute -left-[9999px]">
                  <label htmlFor="contact-company">Company</label>
                  <input
                    id="contact-company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {error && (
                  <p role="alert" className="mt-6 rounded-xl border border-fg px-4 py-3 text-sm">
                    {error}
                  </p>
                )}

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" disabled={sending} className="btn btn-primary">
                    {sending ? 'Sending…' : 'Send enquiry'}
                    {!sending && <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
                  </button>
                  <p className="text-xs text-dim">We only use your details to reply to this enquiry.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
};
