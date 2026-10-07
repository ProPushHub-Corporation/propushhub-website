import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useRouter } from '../lib/router';

const NAV_ITEMS: { label: string; path: string; scrollToId?: string }[] = [
  { label: 'Work', path: '/', scrollToId: 'selected-work' },
  { label: 'All Projects', path: '/work' },
  { label: 'Capabilities', path: '/', scrollToId: 'capabilities' },
  { label: 'Experience', path: '/', scrollToId: 'engineering-experience' },
  { label: 'Contact', path: '/', scrollToId: 'start-project' },
];

export const Navbar: React.FC = () => {
  const { pathname, navigate, openProjectModal } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (targetPath: string, scrollToId?: string) => {
    setMobileMenuOpen(false);
    if (scrollToId) {
      if (pathname !== '/') {
        navigate('/', { scrollToId });
      } else {
        document.getElementById(scrollToId)?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    navigate(targetPath);
  };

  const isActive = (item: (typeof NAV_ITEMS)[number]) =>
    !item.scrollToId && pathname.startsWith(item.path);

  return (
    <header className="sticky top-0 z-40 px-4 sm:px-6 pt-3">
      <div
        className={`max-w-[1240px] mx-auto h-14 px-4 sm:px-5 flex items-center justify-between rounded-full border transition-all duration-300 backdrop-blur-xl ${
          scrolled
            ? 'bg-base/80 border-line-strong shadow-[0_10px_40px_-12px_rgb(0_0_0/0.7)]'
            : 'bg-white/[0.03] border-line'
        }`}
      >
        <button
          type="button"
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2.5 cursor-pointer"
          aria-label="PropushHub home"
        >
          <span className="w-8 h-8 rounded-xl btn-primary grid place-items-center font-display font-bold text-sm">
            P
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-fg whitespace-nowrap">
            PropushHub
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavClick(item.path, item.scrollToId)}
              className={`px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                isActive(item)
                  ? 'text-fg bg-white/10'
                  : 'text-muted hover:text-fg hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openProjectModal()}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold btn-primary rounded-full whitespace-nowrap shrink-0 cursor-pointer"
          >
            Start Your Project
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 text-fg-2 hover:text-fg rounded-full hover:bg-white/10 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden max-w-[1240px] mx-auto mt-2 p-3 rounded-3xl bg-surface/95 backdrop-blur-xl border border-line-strong shadow-2xl">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavClick(item.path, item.scrollToId)}
              className="block w-full text-left px-4 py-3 rounded-2xl text-sm font-medium text-fg-2 hover:text-fg hover:bg-white/5 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              openProjectModal();
            }}
            className="mt-2 w-full px-4 py-3 text-sm font-semibold btn-primary rounded-2xl cursor-pointer"
          >
            Start Your Project
          </button>
        </div>
      )}
    </header>
  );
};
