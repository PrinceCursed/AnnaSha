import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';

// Timeline rule in «Опыт работы»: drawn top → bottom along with the scroll.
export function ScrollLine({ top }: { top: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.6'] });
  const scaleY = useTransform(scrollYProgress, v => (reduce ? 1 : v));
  return (
    <m.div
      ref={ref}
      aria-hidden="true"
      className="absolute bottom-0 left-0 w-px origin-top bg-wine"
      style={{ top, scaleY }}
    />
  );
}
