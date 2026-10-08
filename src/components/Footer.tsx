import React from 'react';
import { COMPANY_INFO } from '../data/site';
import { SERVICES } from '../data/services';
import { Link } from '../lib/router';
import { Logo } from './Navbar';

const linkCls = 'text-sm text-muted transition-colors hover:text-fg';

export const Footer: React.FC = () => (
  <footer className="border-t border-line bg-ink">
    <div className="container-x py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            Websites, CMS, mobile apps, desktop software and custom ERP. Designed, built and
            supported by one team.
          </p>
          <Link to="/contact" className="btn btn-primary mt-7 !h-10 !px-5">
            Get a quote
          </Link>
        </div>

        <nav aria-label="Services" className="lg:col-span-4">
          <h2 className="eyebrow mb-5 !text-fg">Services</h2>
          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className={linkCls}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="lg:col-span-2">
          <h2 className="eyebrow mb-5 !text-fg">Company</h2>
          <ul className="space-y-3">
            <li>
              <Link to="/services" className={linkCls}>
                All services
              </Link>
            </li>
            <li>
              <Link to="/showcase" className={linkCls}>
                Showcase
              </Link>
            </li>
            <li>
              <Link to="/contact" className={linkCls}>
                Contact form
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="eyebrow mb-5 !text-fg">Contact</h2>
          <ul className="space-y-3">
            <li>
              <a href={`mailto:${COMPANY_INFO.email}`} className={`${linkCls} break-words`}>
                {COMPANY_INFO.email}
              </a>
            </li>
            <li>
              <a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
                WhatsApp {COMPANY_INFO.whatsappNumberDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-2 border-t border-line pt-6 text-xs text-dim sm:flex-row sm:justify-between">
        <p>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> PropushHub Corporation (PPH). All rights reserved.</p>
        <p>Website · CMS · Mobile · Desktop · ERP</p>
      </div>
    </div>
  </footer>
);
