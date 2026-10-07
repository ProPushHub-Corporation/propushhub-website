/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RouterProvider, useRouter } from './lib/router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectInquiryModal } from './components/ConversionSections';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { CaseStudyPage } from './pages/CaseStudyPage';

const AppRoutes: React.FC = () => {
  const { pathname } = useRouter();

  if (pathname === '/work' || pathname === '/work/') {
    return <WorkPage />;
  }

  if (pathname.startsWith('/work/')) {
    const slug = pathname.replace('/work/', '').replace(/\/$/, '');
    return <CaseStudyPage key={slug} slug={slug} />;
  }

  return <HomePage />;
};

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultProjectType, setDefaultProjectType] = useState<string | undefined>(
    undefined
  );

  const handleOpenProjectModal = (projectType?: string) => {
    setDefaultProjectType(projectType);
    setModalOpen(true);
  };

  return (
    <RouterProvider onOpenProjectModal={handleOpenProjectModal}>
      <div className="min-h-screen flex flex-col bg-[#F7F7F4] text-[#0F172A]">
        <Navbar />
        <div className="flex-1">
          <AppRoutes />
        </div>
        <Footer />
        <ProjectInquiryModal
          isOpen={modalOpen}
          defaultProjectType={defaultProjectType}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </RouterProvider>
  );
}

