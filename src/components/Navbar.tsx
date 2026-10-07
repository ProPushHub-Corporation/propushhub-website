import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from '../lib/router';

export const Navbar: React.FC = () => {
  const { pathname, navigate, openProjectModal } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (targetPath: string, scrollToId?: string) => {
    setMobileMenuOpen(false);
    if (scrollToId) {
      if (pathname !== '/') {
        navigate('/', { scrollToId });
      } else {
        const el = document.getElementById(scrollToId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }
    navigate(targetPath);
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#F7F7F4]/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-[1240px] mx-auto h-full px-6 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('/')}
          className="font-display text-xl font-bold tracking-tight text-slate-900 hover:text-[#1D4ED8] transition-colors cursor-pointer whitespace-nowrap"
        >
          PropushHub
        </button>

        {/* Zone 2: 5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => handleNavClick('/', 'selected-work')}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap cursor-pointer"
          >
            Selected Work
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('/work')}
            className={`hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap cursor-pointer ${
              pathname.startsWith('/work') ? 'text-slate-900 underline' : ''
            }`}
          >
            All Projects
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('/', 'capabilities')}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap cursor-pointer"
          >
            Capabilities
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('/', 'engineering-experience')}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap cursor-pointer"
          >
            Experience
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('/', 'start-project')}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Primary action */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => openProjectModal()}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#1D4ED8] rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            Start Your Project
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-sm">
          <button
            type="button"
            onClick={() => handleNavClick('/', 'selected-work')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Selected Work
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('/work')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            All Projects
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('/', 'capabilities')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Capabilities
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('/', 'engineering-experience')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Experience
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('/', 'start-project')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
};
