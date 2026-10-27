import { useEffect, useState } from 'react';

export const asset = (p: string) => import.meta.env.BASE_URL + p;

export const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Same breakpoints as the design: phone layout < 768, compact nav < 1180.
// On the server (prerender) the phone layout is assumed.
function readLayout() {
  if (typeof document === 'undefined') return { mob: true, nav: true };
  const w = document.documentElement.clientWidth;
  return { mob: w < 768, nav: w < 1180 };
}

export function useLayout() {
  const [layout, setLayout] = useState(readLayout);
  useEffect(() => {
    const on = () => setLayout(prev => {
      const next = readLayout();
      return next.mob === prev.mob && next.nav === prev.nav ? prev : next;
    });
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return layout;
}

export function useScrolledPast(px: number) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const on = () => setPast(window.scrollY > px);
    window.addEventListener('scroll', on, { passive: true });
    on();
    return () => window.removeEventListener('scroll', on);
  }, [px]);
  return past;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = id === 's-top' ? 0 : el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top, behavior: reducedMotion() ? 'auto' : 'smooth' });
}

export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [locked]);
}
