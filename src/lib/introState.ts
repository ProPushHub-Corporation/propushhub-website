/**
 * Shared flags for the first-visit intro. Kept free of GSAP so it can be imported
 * anywhere without pulling the animation library into the main bundle.
 *
 * The intro only runs when the inline script in index.html adds `intro-pending` to <html>
 * (home page, first visit of the session, no reduced-motion, not a crawler). Everything
 * else renders the plain, fully visible server-rendered page.
 */
export const INTRO_CLASS = 'intro-pending';
export const INTRO_REVEAL_EVENT = 'intro:reveal';

export const introPending = (): boolean =>
  typeof document !== 'undefined' && document.documentElement.classList.contains(INTRO_CLASS);

/** True once the curtain has started lifting and the hero may animate in. */
export const introRevealed = (): boolean =>
  typeof document !== 'undefined' && document.documentElement.dataset.introReveal === '1';
