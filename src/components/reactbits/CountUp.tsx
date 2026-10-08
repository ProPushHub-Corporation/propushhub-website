import React, { useEffect, useRef } from 'react';
import { belowFold, loadMotion } from '../../lib/motion';

interface CountUpProps {
  to: number;
  duration?: number;
  className?: string;
}

/**
 * Number that counts up when it scrolls into view (React Bits "CountUp", driven by GSAP).
 * The server-rendered HTML already contains the final number.
 */
export const CountUp: React.FC<CountUpProps> = ({ to, duration = 1.4, className }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let off = false;
    let cleanup = () => {};

    loadMotion().then((m) => {
      if (!m || off || !belowFold(el)) return;
      const { gsap, ScrollTrigger } = m;
      const state = { value: 0 };
      el.textContent = '0';
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () =>
          gsap.to(state, {
            value: to,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = String(Math.round(state.value));
            },
            onComplete: () => {
              el.textContent = String(to);
            },
          }),
      });
      cleanup = () => {
        trigger.kill();
        gsap.killTweensOf(state);
        el.textContent = String(to);
      };
    });

    return () => {
      off = true;
      cleanup();
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {to}
    </span>
  );
};
