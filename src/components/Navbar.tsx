import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useRouter } from '../lib/router';
import { NAV_LINKS } from '../data/site';

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Link to="/" aria-label="PropushHub home" className={`flex items-center gap-3 ${className}`}>
    <img src="/logo.png" width={40} height={40} alt="" className="block h-10 w-10 rounded-lg" />
    <span className="font-display text-[19px] font-medium tracking-tight">PropushHub</span>
  </Link>
);

export const Navbar: React.FC = () => {
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink">
      <div className="container-x flex h-16 items-center justify-between">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              aria-current={isActive(item.to) ? 'page' : undefined}
              className={`text-sm font-medium transition-colors hover:text-fg ${
                isActive(item.to) ? 'text-fg' : 'text-muted'
              }`}
            >
              {item.label}
            </Link>
          ))}
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
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-ink md:hidden">
          <div className="container-x flex flex-col py-2">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="border-b border-line py-4 text-lg font-medium text-fg"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" className="btn btn-primary my-5 w-full">
              Get a quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
