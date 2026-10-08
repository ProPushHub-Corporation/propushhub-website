/**
 * Adapted from the React Bits "SplitText" component (https://reactbits.dev/text-animations/split-text).
 *
 * Differences from the original:
 *  - GSAP, SplitText and ScrollTrigger are loaded on demand (see lib/motion.ts), not bundled up front.
 *  - It only touches headings that start below the fold, after the page has loaded. Everything else stays
 *    plain server-rendered text, which keeps headings visible to crawlers and no-JS visitors.
 *  - It splits into words (readable at heading sizes) and reverts to plain text when the animation ends.
 */
import React, { useEffect, useRef } from 'react';
import { belowFold, loadMotion } from '../../lib/motion';

interface SplitTextProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p';
  id?: string;
  className?: string;
  /** Seconds between each word. */
  stagger?: number;
  duration?: number;
  ease?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  tag = 'h2',
  id,
  className = '',
  stagger = 0.06,
  duration = 0.9,
  ease = 'power3.out',
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let off = false;
    let cleanup = () => {};

    loadMotion().then(async (m) => {
      if (!m || off || !belowFold(el)) return;
      // Split only after the web fonts are ready, otherwise word widths are measured wrong.
      await document.fonts.ready;
      if (off || !belowFold(el, 1)) return;

      const { gsap, ScrollTrigger, SplitText: Splitter } = m;
      const split = new Splitter(el, { type: 'words', smartWrap: true });
      gsap.set(split.words, { opacity: 0, y: 28 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () =>
          gsap.to(split.words, {
            opacity: 1,
            y: 0,
            duration,
            ease,
            stagger,
            force3D: true,
            onComplete: () => split.revert(),
          }),
      });
      cleanup = () => {
        trigger.kill();
        gsap.killTweensOf(split.words);
        split.revert();
      };
    });

    return () => {
      off = true;
      cleanup();
    };
  }, [text, stagger, duration, ease]);

  const Tag = tag as React.ElementType;
  return (
    <Tag ref={ref} id={id} className={className}>
      {text}
    </Tag>
  );
};
