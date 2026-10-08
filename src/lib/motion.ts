import type { gsap as Gsap } from 'gsap';
import type { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger';
import type { SplitText as SplitTextPlugin } from 'gsap/SplitText';

export interface Motion {
  gsap: typeof Gsap;
  ScrollTrigger: typeof ScrollTriggerPlugin;
  SplitText: typeof SplitTextPlugin;
}

const WAKE_EVENTS = ['pointermove', 'pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll'] as const;
const IDLE_DELAY_MS = 4500;

let gate: Promise<void> | undefined;
let motion: Promise<Motion | null> | undefined;

/**
 * Resolves on the visitor's first interaction, or a few seconds after the page has loaded. GSAP is
 * deliberately kept off the critical path so it never competes with first paint or hydration.
 */
const whenReady = (): Promise<void> =>
  (gate ??= new Promise<void>((resolve) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const go = () => {
      WAKE_EVENTS.forEach((event) => window.removeEventListener(event, go));
      if (timer) clearTimeout(timer);
      resolve();
    };
    WAKE_EVENTS.forEach((event) => window.addEventListener(event, go, { passive: true }));
    const arm = () => {
      timer = setTimeout(go, IDLE_DELAY_MS);
    };
    if (document.readyState === 'complete') arm();
    else window.addEventListener('load', arm, { once: true });
  }));

/** Resolves on the first interaction or a few seconds after load. Use it to defer non-critical work. */
export const whenIdle = (): Promise<void> => (typeof window === 'undefined' ? new Promise<void>(() => {}) : whenReady());

/**
 * Loads GSAP (+ ScrollTrigger, SplitText) on demand. Resolves to `null` on the server and for visitors who
 * prefer reduced motion, so callers simply skip their enhancement and the page stays fully visible.
 */
export const loadMotion = (): Promise<Motion | null> => {
  if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return Promise.resolve(null);
  }
  return (motion ??= whenReady()
    .then(async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('gsap/SplitText'),
      ]);
      gsap.registerPlugin(ScrollTrigger, SplitText);
      return { gsap, ScrollTrigger, SplitText };
    })
    .catch(() => null));
};

/**
 * Only content that starts below the fold is ever hidden for a reveal. Anything already on screen (or
 * everything, for a crawler with a tall viewport) is left untouched, so nothing flashes or goes missing.
 */
export const belowFold = (el: Element, ratio = 0.92): boolean =>
  el.getBoundingClientRect().top > window.innerHeight * ratio;
