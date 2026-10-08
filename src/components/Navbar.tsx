import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, useRouter } from '../lib/router';
import { NAV_LINKS } from '../data/site';
import { COMPANY_LINKS } from '../data/company';

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Link to="/" aria-label="PropushHub home" className={`flex items-center gap-3 ${className}`}>
    <img src="/logo.png" width={40} height={40} alt="" className="block h-10 w-10 rounded-lg" />
    <span className="font-display text-[19px] font-medium tracking-tight">PropushHub</span>
  </Link>
);

/**
 * "Company" dropdown. The links are always in the HTML (visually hidden while closed, so crawlers and the
 * footer see the same URLs). Opens on hover for a mouse, on click/tap or Enter/Space otherwise, and closes
 * on Escape, an outside click or navigation.
 */
const CompanyMenu: React.FC<{ active: boolean }> = ({ active }) => {
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const lastInput = useRef<'mouse' | 'touch' | 'keyboard'>('keyboard');

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapper}
      className="relative"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="company-menu"
        onPointerDown={(e) => {
          lastInput.current = e.pointerType === 'mouse' ? 'mouse' : 'touch';
        }}
        onKeyDown={() => {
          lastInput.current = 'keyboard';
        }}
        // A mouse has already opened it on hover, so a click keeps it open; touch and keyboard toggle.
        onClick={() => setOpen((value) => (lastInput.current === 'mouse' ? true : !value))}
        className={`inline-flex cursor-pointer items-center gap-1 text-sm font-medium transition-colors hover:text-fg ${
          active || open ? 'text-fg' : 'text-muted'
        }`}
      >
        Company
        <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        id="company-menu"
        className={`absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-4 transition duration-200 ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-1 opacity-0'
        }`}
      >
        <ul className="rounded-3xl border border-line bg-ink p-2 shadow-[0_28px_70px_-28px_rgb(0_0_0/0.28)]">
          {COMPANY_LINKS.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                aria-current={pathname === item.to ? 'page' : undefined}
                className="block rounded-2xl px-4 py-3 transition-colors hover:bg-surface"
              >
                <span className="block font-display text-base font-medium">{item.label}</span>
                <span className="block text-sm text-muted">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Navbar: React.FC = () => {
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);
  const companyActive = COMPANY_LINKS.some((item) => pathname === item.to);
  // The dropdown sits just before the last link ("Contact").
  const before = NAV_LINKS.slice(0, -1);
  const last = NAV_LINKS[NAV_LINKS.length - 1];

  const linkClass = (to: string) =>
    `text-sm font-medium transition-colors hover:text-fg ${isActive(to) ? 'text-fg' : 'text-muted'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink">
      <div className="container-x flex h-16 items-center justify-between">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {before.map((item) => (
            <Link key={item.to} to={item.to} aria-current={isActive(item.to) ? 'page' : undefined} className={linkClass(item.to)}>
              {item.label}
            </Link>
          ))}
          <CompanyMenu active={companyActive} />
          <Link to={last.to} aria-current={isActive(last.to) ? 'page' : undefined} className={linkClass(last.to)}>
            {last.label}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn btn-primary hidden !h-10 !px-5 sm:inline-flex">
            Get a quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 grid h-10 w-10 cursor-pointer place-items-center text-fg md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-ink md:hidden">
          <div className="container-x flex flex-col py-2">
            {before.map((item) => (
              <Link key={item.to} to={item.to} className="border-b border-line py-4 text-lg font-medium text-fg">
                {item.label}
              </Link>
            ))}
            <div className="border-b border-line py-4">
              <p className="eyebrow mb-3">Company</p>
              <ul className="space-y-1">
                {COMPANY_LINKS.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="block rounded-xl px-3 py-3 text-lg font-medium text-fg hover:bg-surface">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link to={last.to} className="border-b border-line py-4 text-lg font-medium text-fg">
              {last.label}
            </Link>
            <Link to="/contact" className="btn btn-primary my-5 w-full">
              Get a quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
