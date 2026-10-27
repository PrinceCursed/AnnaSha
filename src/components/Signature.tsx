import { useId } from 'react';
import { m, useReducedMotion, type Variants } from 'motion/react';
import type { Glyphs } from '../glyphs.gen';

type Props = {
  glyphs: Glyphs;
  label: string;
  // 'load' — writes on page load (hero); 'view' — when scrolled into view.
  trigger: 'load' | 'view';
  ease: [number, number, number, number];
  delay?: number;
};

// Handwritten line: glyph outlines revealed left → right by a mask whose
// stroke is drawn with stroke-dashoffset (Motion's pathLength).
export function Signature({ glyphs, label, trigger, ease, delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const maskId = 'sig' + useId().replace(/:/g, '');
  const { d, w, h, upm } = glyphs;

  const pen: Variants = {
    hidden: { pathLength: 0 },
    // Reduced motion: same markup (keeps hydration stable), no animation.
    shown: { pathLength: 1, transition: reduce ? { duration: 0 } : { duration: 1.8, delay, ease } },
  };
  const play = trigger === 'load'
    ? { initial: 'hidden', animate: 'shown' }
    : { initial: 'hidden', whileInView: 'shown', viewport: { once: true, margin: '0px 0px -10% 0px' } };

  return (
    <m.svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${w} ${h}`}
      width={`${w / upm}em`}
      height={`${h / upm}em`}
      overflow="visible"
      className="block max-w-full"
      style={{ height: 'auto', aspectRatio: `${w} / ${h}` }}
      {...play}
    >
      <mask id={maskId} maskUnits="userSpaceOnUse" x={-w} y={-h} width={w * 3} height={h * 3}>
        <m.path
          d={`M ${-0.05 * w} ${h / 2} H ${1.05 * w}`}
          stroke="#fff"
          strokeWidth={h * 1.8}
          fill="none"
          variants={pen}
        />
      </mask>
      <path d={d} fill="currentColor" mask={`url(#${maskId})`} />
    </m.svg>
  );
}
