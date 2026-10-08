/**
 * Adapted from the React Bits "SplitText" component (https://reactbits.dev/text-animations/split-text).
 *
 * Differences from the original:
 *  - GSAP and its SplitText plugin are imported on demand, so they stay out of the main bundle.
 *  - The animation is released by the intro (`intro:reveal`) instead of a ScrollTrigger.
 *  - It does nothing unless the intro is playing. In every other case the plain, server-rendered
 *    text is left untouched, which keeps the heading fully visible to crawlers and no-JS visitors.
 */
import React, { useEffect, useRef } from 'react';
import { INTRO_REVEAL_EVENT, introPending, introRevealed } from '../../lib/introState';

type Vars = Record<string, unknown>;

const DEFAULT_FROM: Vars = { opacity: 0, y: 48 };
const DEFAULT_TO: Vars = { opacity: 1, y: 0 };

interface SplitTextProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Gap between each piece, in milliseconds. */
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: Vars;
  to?: Vars;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  tag = 'p',
  id,
  className = '',
  style,
  delay = 22,
  duration = 0.85,
  ease = 'power3.out',
  splitType = 'chars',
  from = DEFAULT_FROM,
  to = DEFAULT_TO,
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !introPending()) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const [{ gsap }, { SplitText: GSAPSplitText }] = await Promise.all([
        import('gsap'),
        import('gsap/SplitText'),
      ]);
      // Split only after the web font is ready, otherwise line widths are measured wrong.
      await document.fonts.ready;
      // If the intro already finished (very slow connection), leave the plain text alone.
      if (disposed || !introPending()) return;

      gsap.registerPlugin(GSAPSplitText);
      const split = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        reduceWhiteSpace: false,
        charsClass: 'split-char',
        wordsClass: 'split-word',
        linesClass: 'split-line',
      });
      const targets = split[splitType];
      gsap.set(targets, { ...from });

      const play = () => {
        gsap.to(targets, {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          force3D: true,
          // Put the original text back so resizing, selection and screen readers behave normally.
          onComplete: () => split.revert(),
        });
      };

      if (introRevealed()) play();
      else window.addEventListener(INTRO_REVEAL_EVENT, play, { once: true });

      cleanup = () => {
        window.removeEventListener(INTRO_REVEAL_EVENT, play);
        gsap.killTweensOf(targets);
        split.revert();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [text, delay, duration, ease, splitType, from, to]);

  const Tag = tag as React.ElementType;
  return (
    <Tag ref={ref} id={id} className={className} style={style}>
      {text}
    </Tag>
  );
};
