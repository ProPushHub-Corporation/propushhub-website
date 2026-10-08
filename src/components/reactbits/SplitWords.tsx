import React from 'react';

interface SplitWordsProps {
  text: string;
  tag?: 'h1' | 'h2';
  id?: string;
  className?: string;
  /** Animation order of the first word; later words follow in sequence. */
  start?: number;
}

/**
 * The React Bits "SplitText" effect (each word rises into place in sequence), done in CSS so it runs at
 * first paint without any JavaScript. The words are real text in the HTML, so the heading stays fully
 * readable for crawlers and screen readers. Timing lives in `.hero-anim` (index.css).
 */
export const SplitWords: React.FC<SplitWordsProps> = ({ text, tag = 'h1', id, className = '', start = 1 }) => {
  const Tag = tag as React.ElementType;
  const words = text.split(' ');
  return (
    <Tag id={id} className={className}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="hero-anim inline-block" style={{ '--i': start + i } as React.CSSProperties}>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </Tag>
  );
};
