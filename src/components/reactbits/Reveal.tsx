import React, { useEffect, useRef } from 'react';
import { belowFold, loadMotion } from '../../lib/motion';

type RevealTag = 'div' | 'li' | 'article' | 'section' | 'p' | 'ul' | 'dl';

interface RevealProps {
  as?: RevealTag;
  id?: string;
  className?: string;
  /** Seconds to wait after the element enters the viewport. */
  delay?: number;
  /** Starting offset in pixels. */
  y?: number;
  /** Soft cursor-following highlight on hover (React Bits "Spotlight Card"). */
  spotlight?: boolean;
  children: React.ReactNode;
}

/**
 * Scroll-triggered fade-up, in the spirit of React Bits' AnimatedContent / FadeContent, driven by GSAP
 * ScrollTrigger. Renders plain markup on the server; the animation is added after load and only to
 * elements that start below the fold.
 */
export const Reveal: React.FC<RevealProps> = ({
  as = 'div',
  id,
  className = '',
  delay = 0,
  y = 28,
  spotlight = false,
  children,
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let off = false;
    let cleanup = () => {};

    loadMotion().then((m) => {
      if (!m || off || !belowFold(el)) return;
      const { gsap, ScrollTrigger } = m;
      gsap.set(el, { opacity: 0, y });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () =>
          gsap.to(el, { opacity: 1, y: 0, duration: 0.9, delay, ease: 'power3.out', clearProps: 'opacity,transform' }),
      });
      cleanup = () => {
        trigger.kill();
        gsap.killTweensOf(el);
        gsap.set(el, { clearProps: 'opacity,transform' });
      };
    });

    return () => {
      off = true;
      cleanup();
    };
  }, [delay, y]);

  const onPointerMove = spotlight
    ? (event: React.PointerEvent<HTMLElement>) => {
        const target = event.currentTarget;
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        target.style.setProperty('--my', `${event.clientY - rect.top}px`);
      }
    : undefined;

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      id={id}
      className={`${spotlight ? 'spotlight ' : ''}${className}`}
      onPointerMove={onPointerMove}
    >
      {children}
    </Tag>
  );
};
