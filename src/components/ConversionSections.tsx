import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Github, Mail, MessageSquare, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/projects';
import { useRouter } from '../lib/router';

const PROOF_AREAS = [
  {
    index: '01',
    title: 'Full-Stack & Web Application Development',
    detail:
      'Production applications built with Next.js, React, TypeScript, Redux Toolkit, and Node.js—spanning multi-role dashboards, bilingual LTR/RTL interfaces, and SSR/App Router architectures.',
    evidenceProject: 'Barakah ERP · Helplytics · Student Portal',
  },
  {
    index: '02',
    title: 'ERP & Enterprise Warehouse Systems',
    detail:
      'Custom business operations software covering multi-site stock tracking, client-side invoice OCR, multi-item sales billing, PDF document generation, supplier ledgers, and role-based permissions.',
    evidenceProject: 'Barakah ERP · CoreStock (User & Admin Platforms)',
  },
  {
    index: '03',
    title: 'Cross-Platform Mobile & Offline-First Apps',
    detail:
      'React Native mobile applications for Android and iOS, geolocation & map tracking, push notifications, local SQLite offline persistence, and automatic background sync queues.',
    evidenceProject: 'RoadHelper · Field Capture · TalkBridge Mobile',
  },
  {
    index: '04',
    title: 'AI-Integrated Workflows & Developer Tooling',
    detail:
      'Practical AI integrations using Google Gemini and OpenAI alongside automated QA pipelines, Playwright headless browser verification, static security scanning, and command-policy engines.',
    evidenceProject: 'AI QA Agent · AI Clinic Management · Helplytics',
  },
  {
    index: '05',
    title: 'REST APIs, Real-Time Sync & Database Systems',
    detail:
      'Backend architectures engineered with Node.js, Express, MongoDB, PostgreSQL (with cryptographic idempotency constraints), Firebase Firestore, Firebase Storage, and Socket.io.',
    evidenceProject: 'Field Capture · TalkBridge · AI Clinic Management',
  },
  {
    index: '06',
    title: 'Production Deployment & Open-Source Packages',
    detail:
      'Live cloud deployments on Vercel, published mobile builds on Google Play Console, and public open-source repositories and npm packages (including @syedmuhammadali-dev/ai-qa-agent and gdrive-db).',
    evidenceProject: 'Public GitHub & npm Ecosystem',
  },
];

export const TrustExperienceSection: React.FC = () => {
  return (
    <section
      id="engineering-experience"
      className="py-20 sm:py-24 border-t border-line bg-surface"
    >
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-semibold text-accent mb-2">
            Engineering Proof · Verifiable Public Work
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-fg tracking-tight mb-4">
            Built With Real-World Development Experience
          </h2>
          <p className="text-muted text-base leading-relaxed">
            Every capability offered by PropushHub is backed by inspectable source code, live
            deployments, and real full-stack, mobile, and enterprise software systems built by our
            development team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROOF_AREAS.map((item) => (
            <div
              key={item.index}
              className="p-6 rounded-3xl glass card-glow flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-accent font-medium mb-3">
                  {item.index}. Capability Proof
                </div>
                <h3 className="font-display text-lg font-bold text-fg mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-5">
                  {item.detail}
                </p>
              </div>
              <div className="pt-3 border-t border-line text-xs font-mono text-dim">
                Demonstrated in: <span className="text-fg-2">{item.evidenceProject}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const GithubExploreSection: React.FC = () => {
  return (
    <section className="py-16 border-t border-line bg-ink">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-600/30 via-surface-2 to-teal-500/20 border border-line-strong text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-accent mb-2">
              Open Source &amp; Public Repositories
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              Explore More Projects
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Want to see more of our development work? Explore the public repositories and
              projects.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={COMPANY_INFO.githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-fg bg-surface rounded-lg hover:bg-surface/10 transition-colors whitespace-nowrap"
            >
              <Github className="w-4 h-4" />
              <span>View GitHub</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FinalConversionSection: React.FC = () => {
  const { openProjectModal } = useRouter();

  return (
    <section
      id="start-project"
      className="py-20 sm:py-24 border-t border-line bg-surface"
    >
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-accent mb-2">
            Project Inquiry · Direct Engineering Consultation
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-fg tracking-tight mb-5">
            Have a Project in Mind?
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed mb-8">
            Whether you need a website, mobile app, ERP system, custom software, or help fixing an
            existing application, let's discuss what you want to build.
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => openProjectModal()}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white btn-primary rounded-full whitespace-nowrap cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-fg bg-ink border border-line-strong rounded-lg hover:bg-surface/10 transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-emerald-700" />
              <span>Talk on WhatsApp</span>
            </a>

            <a
              href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
                'Project Inquiry — PropushHub'
              )}`}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-fg bg-ink border border-line-strong rounded-lg hover:bg-surface/10 transition-colors whitespace-nowrap"
            >
              <Mail className="w-4 h-4 text-fg-2" />
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ProjectInquiryModal: React.FC<{
  isOpen: boolean;
  defaultProjectType?: string;
  onClose: () => void;
}> = ({ isOpen, defaultProjectType, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(
    defaultProjectType || 'Custom ERP / Business Software'
  );
  const [details, setDetails] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !details.trim()) {
      setErrorMessage('Please fill in your name, email, and project summary.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('email', email.trim());
      formData.append('project_type', projectType);
      formData.append('message', details.trim());
      formData.append('_subject', `New Project Inquiry — ${projectType}`);
      formData.append('_template', 'table');
      formData.append('_captcha', 'false');

      const res = await fetch(
        `https://formsubmit.co/ajax/${COMPANY_INFO.email}`,
        {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        }
      );
      const result = await res.json().catch(() => null);
      if (res.ok && result && String(result.success) === 'true') {
        setSubmitted(true);
      } else {
        setErrorMessage(
          'We could not send your brief right now. Please use WhatsApp or email us directly.'
        );
      }
    } catch {
      setErrorMessage(
        'We could not send your brief right now. Please use WhatsApp or email us directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-xs"
    >
      <div className="bg-surface border border-line-strong rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-xl relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={resetAndClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 text-dim hover:text-fg rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold text-fg mb-2">
              Project Brief Received
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Thank you, <span className="font-semibold text-fg">{name}</span>. Your inquiry
              regarding <span className="font-semibold text-fg">{projectType}</span> has
              been prepared. You can also connect immediately on WhatsApp or via direct email below.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/923190586822?text=${encodeURIComponent(
                  `Hello PropushHub, I am ${name} (${email}). Project Type: ${projectType}. Details: ${details}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Directly on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={resetAndClose}
                className="px-4 py-2.5 text-xs font-semibold text-fg-2 bg-surface/5 rounded-lg hover:bg-surface/10 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold text-accent mb-1">
              PropushHub · Start Your Project
            </p>
            <h3
              id="project-modal-title"
              className="font-display text-2xl font-bold text-fg mb-2"
            >
              Tell Us What You Want to Build
            </h3>
            <p className="text-muted text-sm mb-6">
              Share your project scope below, or connect directly via WhatsApp or email.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label
                  htmlFor="inquiry-name"
                  className="block text-xs font-semibold text-fg-2 mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="inquiry-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tariq Mahmood"
                  className="w-full px-3.5 py-2.5 text-sm text-fg placeholder:text-dim bg-white/5 rounded-xl border border-line-strong focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry-email"
                  className="block text-xs font-semibold text-fg-2 mb-1.5"
                >
                  Work or Personal Email
                </label>
                <input
                  id="inquiry-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 text-sm text-fg placeholder:text-dim bg-white/5 rounded-xl border border-line-strong focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry-type"
                  className="block text-xs font-semibold text-fg-2 mb-1.5"
                >
                  What kind of software do you need?
                </label>
                <select
                  id="inquiry-type"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm text-fg rounded-xl border border-line-strong bg-surface-2 focus:outline-none focus:border-accent"
                >
                  <option value="Custom ERP / Business Software">
                    Custom ERP / Business Software
                  </option>
                  <option value="Inventory & Warehouse System">
                    Inventory &amp; Warehouse System
                  </option>
                  <option value="Web + Mobile Application Ecosystem">
                    Web + Mobile Application Ecosystem
                  </option>
                  <option value="SaaS Platform / Dashboard">
                    SaaS Platform / Dashboard
                  </option>
                  <option value="AI-Integrated Application / Tool">
                    AI-Integrated Application / Tool
                  </option>
                  <option value="Website Development / Existing App Improvement">
                    Website Development / Existing App Improvement
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="inquiry-details"
                  className="block text-xs font-semibold text-fg-2 mb-1.5"
                >
                  Project Overview &amp; Goals
                </label>
                <textarea
                  id="inquiry-details"
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Describe the workflows, user roles, or platform you want to build..."
                  className="w-full px-3.5 py-2.5 text-sm text-fg placeholder:text-dim bg-white/5 rounded-xl border border-line-strong focus:outline-none focus:border-accent"
                />
              </div>

              {errorMessage && (
                <p className="text-xs font-medium text-red-600">{errorMessage}</p>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-3 text-sm font-semibold text-white btn-primary rounded-full cursor-pointer disabled:opacity-60"
                >
                  {submitting ? 'Sending Brief...' : 'Submit Project Brief'}
                </button>

                <div className="flex items-center gap-4 text-xs font-semibold text-muted">
                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    WhatsApp Us →
                  </a>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="hover:text-accent transition-colors"
                  >
                    Email Directly →
                  </a>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
