import React from 'react';
import { COMPANY_INFO, PROJECTS } from '../data/projects';
import { useRouter } from '../lib/router';

export const Footer: React.FC = () => {
  const { navigate, openProjectModal } = useRouter();

  return (
    <footer className="bg-base text-muted border-t border-line py-16">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-line">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-1">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="font-display text-xl font-bold text-white tracking-tight mb-3 cursor-pointer"
            >
              PropushHub
            </button>
            <p className="text-sm text-dim leading-relaxed mb-5">
              We don’t just build landing pages. We build complete digital products—custom ERP
              systems, warehouse platforms, web and mobile ecosystems, and AI-integrated business
              software.
            </p>
            <button
              type="button"
              onClick={() => openProjectModal()}
              className="px-4 py-2 text-xs font-semibold text-white btn-primary rounded-full cursor-pointer"
            >
              Start Your Project
            </button>
          </div>

          {/* Column 2: Selected Case Studies */}
          <div>
            <h3 className="font-display text-sm font-bold text-white mb-4">
              Selected Case Studies
            </h3>
            <ul className="space-y-2.5 text-sm text-dim">
              {PROJECTS.slice(0, 6).map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => navigate(`/work/${p.slug}`)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {p.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/work')}
                  className="text-accent hover:text-accent font-medium transition-colors text-left cursor-pointer"
                >
                  View All 9 Projects →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Capabilities */}
          <div>
            <h3 className="font-display text-sm font-bold text-white mb-4">
              What We Build
            </h3>
            <ul className="space-y-2.5 text-sm text-dim">
              <li>ERP &amp; Business Software</li>
              <li>Inventory &amp; Warehouse Systems</li>
              <li>Web + Mobile App Ecosystems</li>
              <li>Multi-Role SaaS Platforms</li>
              <li>AI Applications &amp; Developer Tools</li>
              <li>REST APIs &amp; Database Architecture</li>
            </ul>
          </div>

          {/* Column 4: Direct Contact & Public Proof */}
          <div>
            <h3 className="font-display text-sm font-bold text-white mb-4">
              Connect &amp; Verify
            </h3>
            <ul className="space-y-2.5 text-sm text-dim">
              <li>
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {COMPANY_INFO.whatsappNumberDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.githubProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub Profile (syedmuhammadali-dev)
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.developerPortfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Lead Engineer Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-dim">
          <p>© {new Date().getFullYear()} PropushHub. Built with real-world engineering proof.</p>
          <p>
            All showcased projects represent real software systems built by the PropushHub
            development team.
          </p>
        </div>
      </div>
    </footer>
  );
};
