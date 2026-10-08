import React from 'react';
import { Container } from '../components/ui';
import { Link } from '../lib/router';

// `data-not-found` marks the prerendered 404.html. main.tsx re-renders that file instead of hydrating it, so a
// project added to Firestore after the last build can still load on its own URL (see ProjectPage).
export const NotFoundPage: React.FC = () => (
  <main id="main" data-not-found className="bg-ink py-28 sm:py-40">
    <Container>
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 max-w-3xl text-5xl leading-[1.06] tracking-[-0.02em] sm:text-7xl">
        This page doesn’t exist.
      </h1>
      <p className="mt-6 max-w-[48ch] text-lg text-muted">
        The link may be broken or the page may have moved. Try one of these instead.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/" className="btn btn-primary">
          Go to homepage
        </Link>
        <Link to="/services" className="btn btn-secondary">
          Browse services
        </Link>
        <Link to="/showcase" className="btn btn-secondary">
          See our projects
        </Link>
      </div>
    </Container>
  </main>
);
