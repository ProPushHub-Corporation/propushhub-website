import React from 'react';
import { Container } from '../components/ui';
import { Link } from '../lib/router';

export const NotFoundPage: React.FC = () => (
  <main id="main" className="bg-ink py-28 sm:py-40">
    <Container>
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 max-w-3xl text-5xl leading-[1] tracking-[-0.04em] sm:text-7xl">
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
        <Link to="/work" className="btn btn-secondary">
          See our work
        </Link>
      </div>
    </Container>
  </main>
);
