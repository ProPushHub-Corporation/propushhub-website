import React, { useEffect, useRef } from 'react';
import { loadMotion } from '../../lib/motion';

interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  /** How far the element follows the cursor (0 to 1). */
  strength?: number;
  /** Extra distance around the element, in pixels, in which it reacts. */
  padding?: number;
}

/**
 * Element that leans toward the cursor when it gets close (React Bits "Magnet", driven by GSAP).
 * Fine-pointer devices only, and only after the page has loaded.
 */
export const Magnet: React.FC<MagnetProps> = ({ children, className = '', strength = 0.3, padding = 48 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let off = false;
    let cleanup = () => {};

    loadMotion().then((m) => {
      if (!m || off) return;
      const { gsap } = m;
      const moveX = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
      const moveY = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });

      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const near =
          event.clientX > rect.left - padding &&
          event.clientX < rect.right + padding &&
          event.clientY > rect.top - padding &&
          event.clientY < rect.bottom + padding;
        moveX(near ? (event.clientX - (rect.left + rect.width / 2)) * strength : 0);
        moveY(near ? (event.clientY - (rect.top + rect.height / 2)) * strength : 0);
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      cleanup = () => {
        window.removeEventListener('pointermove', onMove);
        gsap.killTweensOf(el);
        gsap.set(el, { clearProps: 'transform' });
      };
    });

    return () => {
      off = true;
      cleanup();
    };
  }, [strength, padding]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};
