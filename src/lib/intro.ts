import { gsap } from 'gsap';
import { INTRO_CLASS, INTRO_REVEAL_EVENT } from './introState';

/**
 * GSAP timeline for the first-visit intro: logo and counter fade in, a progress line
 * fills, then the white curtain lifts while the hero (`[data-reveal]` blocks and the
 * React Bits SplitText headline) animates in underneath.
 *
 * Loaded on demand from components/Intro.tsx, so GSAP never reaches visitors who don't
 * see the intro. Returns a cleanup function.
 */
export const playIntro = (root: HTMLElement, onDone: () => void): (() => void) => {
  const html = document.documentElement;
  const items = root.querySelectorAll('[data-intro-in]');
  const bar = root.querySelector('[data-intro-bar]');
  const count = root.querySelector('[data-intro-count]');
  const reveal = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  const progress = { value: 0 };

  const finish = () => {
    html.dataset.introReveal = '1';
    html.classList.remove(INTRO_CLASS);
    onDone();
  };

  const ctx = gsap.context(() => {
    // The overlay covers the page, so the hero can be hidden without a visible flash.
    gsap.set(reveal, { opacity: 0, y: 28 });

    const tl = gsap.timeline({ onComplete: finish });
    tl.fromTo(
      items,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power3.out' }
    )
      .to(
        progress,
        {
          value: 100,
          duration: 0.75,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (count) count.textContent = String(Math.round(progress.value)).padStart(3, '0');
          },
        },
        0.1
      )
      .to(bar, { scaleX: 1, duration: 0.75, ease: 'power2.inOut' }, 0.1)
      .to(items, { opacity: 0, y: -10, duration: 0.25, ease: 'power2.in', stagger: 0.03 }, '>0.05')
      .add(() => {
        html.dataset.introReveal = '1';
        window.dispatchEvent(new Event(INTRO_REVEAL_EVENT));
      })
      .to(root, { yPercent: -100, duration: 0.7, ease: 'expo.inOut' })
      .to(
        reveal,
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', clearProps: 'opacity,transform' },
        '<0.2'
      );

    // Clicking the intro fast-forwards it.
    root.addEventListener('click', () => tl.timeScale(4), { once: true });
  }, root);

  return () => {
    ctx.revert();
    html.classList.remove(INTRO_CLASS);
  };
};
