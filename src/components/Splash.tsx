import React from 'react';

const strokeStyle = (i: number) => ({ '--i': i }) as React.CSSProperties;

/**
 * "PPH" loading screen. Always present in the prerendered home page but `display: none` until the
 * inline script in index.html adds `splash` to <html> (see index.css), so crawlers and no-JS visitors
 * never see it. Drawn as an SVG so it stays crisp while it zooms to full screen.
 */
export const Splash: React.FC = () => (
  <div id="splash" aria-hidden="true">
    <svg className="splash-mark" viewBox="0 0 350 140" fill="none" stroke="currentColor" strokeWidth="24" focusable="false">
      {/* P */}
      <path className="splash-stroke" style={strokeStyle(0)} pathLength={1} d="M12 140V12H62A32 32 0 0 1 62 76H6" />
      {/* P */}
      <path className="splash-stroke" style={strokeStyle(1)} pathLength={1} d="M136 140V12H186A32 32 0 0 1 186 76H130" />
      {/* H */}
      <path className="splash-stroke" style={strokeStyle(2)} pathLength={1} d="M262 0V140" />
      <path className="splash-stroke" style={strokeStyle(3)} pathLength={1} d="M338 0V140" />
      <path className="splash-stroke" style={strokeStyle(4)} pathLength={1} d="M256 70H344" />
    </svg>
    <div className="splash-bar" />
  </div>
);
