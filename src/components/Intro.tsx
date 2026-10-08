import React, { useEffect, useRef, useState } from 'react';
import { INTRO_CLASS, introPending } from '../lib/introState';

/**
 * First-visit intro overlay. The markup is always part of the prerendered HTML but stays
 * `display: none` (see index.css) unless the inline script in index.html marked this visit
 * with `intro-pending`, so crawlers and no-JS visitors never see it.
 */
export const Intro: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!introPending()) {
      setGone(true);
      return;
    }

    let cancelled = false;
    let cleanup = () => {};
    import('../lib/intro')
      .then(({ playIntro }) => {
        if (cancelled || !ref.current) return;
        cleanup = playIntro(ref.current, () => setGone(true));
      })
      .catch(() => {
        // Never leave the page covered if the animation code fails to load.
        document.documentElement.classList.remove(INTRO_CLASS);
        setGone(true);
      });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  if (gone) return null;

  return (
    <div id="intro" ref={ref} aria-hidden="true" className="fixed inset-0 z-[100] place-items-center bg-ink text-fg">
      <div className="flex flex-col items-center gap-5">
        <img
          data-intro-in
          src="/logo.png"
          width={72}
          height={72}
          alt=""
          className="block h-[72px] w-[72px]"
          style={{ opacity: 0 }}
        />
        <p data-intro-in className="text-3xl font-bold tracking-tight" style={{ opacity: 0 }}>
          PropushHub
        </p>
      </div>
      <p
        data-intro-in
        className="absolute bottom-8 left-5 text-sm text-muted sm:left-8"
        style={{ opacity: 0 }}
      >
        Software development company
      </p>
      <p
        data-intro-in
        data-intro-count
        className="absolute bottom-8 right-5 text-sm tabular-nums text-muted sm:right-8"
        style={{ opacity: 0 }}
      >
        000
      </p>
      <div
        data-intro-bar
        className="absolute inset-x-0 bottom-0 h-px bg-fg"
        style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
      />
    </div>
  );
};
