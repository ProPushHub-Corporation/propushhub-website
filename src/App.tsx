/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider, useRouter } from './lib/router';
import { useSeo } from './lib/useSeo';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServicePage } from './pages/ServicePage';
import { ContactPage } from './pages/ContactPage';
import { ShowcasePage } from './pages/ShowcasePage';
import { ProjectPage } from './pages/ProjectPage';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { JobsPage } from './pages/JobsPage';
import { CollaborationPage } from './pages/CollaborationPage';
import { HelpPage } from './pages/HelpPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppRoutes: React.FC = () => {
  const { pathname } = useRouter();
  useSeo(pathname);

  if (pathname === '/') return <HomePage />;
  if (pathname === '/services') return <ServicesPage />;
  if (pathname.startsWith('/services/')) {
    return <ServicePage key={pathname} slug={pathname.slice('/services/'.length)} />;
  }
  if (pathname === '/showcase') return <ShowcasePage />;
  if (pathname.startsWith('/showcase/')) {
    return <ProjectPage key={pathname} slug={pathname.slice('/showcase/'.length)} />;
  }
  if (pathname === '/about') return <AboutPage />;
  if (pathname === '/team') return <TeamPage />;
  if (pathname === '/jobs') return <JobsPage />;
  if (pathname === '/collaboration') return <CollaborationPage />;
  if (pathname === '/help') return <HelpPage />;
  if (pathname === '/contact') return <ContactPage />;
  return <NotFoundPage />;
};

export default function App({ initialPath }: { initialPath?: string }) {
  return (
    <RouterProvider initialPath={initialPath}>
      <div className="flex min-h-screen flex-col bg-ink text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-fg focus:px-5 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <Navbar />
        <div className="flex-1">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </RouterProvider>
  );
}
