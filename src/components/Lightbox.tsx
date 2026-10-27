import { useEffect, useRef } from 'react';
import { photos, ui } from '../content';
import { Picture } from './Picture';

type Props = { index: number; onIndex: (i: number) => void; onClose: () => void };

export function Lightbox({ index, onIndex, onClose }: Props) {
  const n = photos.length;
  const step = (d: number) => onIndex((index + d + n) % n);
  const touchX = useRef(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stepRef = useRef(step);
  stepRef.current = step;

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') stepRef.current(1);
      if (e.key === 'ArrowLeft') stepRef.current(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); prev?.focus(); };
  }, [onClose]);

  const photo = photos[index];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) { e.preventDefault(); step(dx < 0 ? 1 : -1); }
      }}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-[rgba(24,6,10,.95)] px-4 py-[72px] font-sans"
    >
      <Picture
        key={photo.img}
        name={photo.img}
        alt={photo.alt}
        sizes="(max-width: 1304px) 92vw, 1200px"
        onClick={e => e.stopPropagation()}
        className="block h-auto max-h-[calc(100vh-144px)] w-auto max-w-[min(92vw,1200px)] object-contain"
        priority
      />
      <button type="button" aria-label={ui.prev} onClick={e => { e.stopPropagation(); step(-1); }} className="absolute left-[clamp(8px,3vw,40px)] top-1/2 h-12 -translate-y-1/2 cursor-pointer border-0 bg-transparent px-3 font-[system-ui] text-[28px] text-paper">←</button>
      <button type="button" aria-label={ui.next} onClick={e => { e.stopPropagation(); step(1); }} className="absolute right-[clamp(8px,3vw,40px)] top-1/2 h-12 -translate-y-1/2 cursor-pointer border-0 bg-transparent px-3 font-[system-ui] text-[28px] text-paper">→</button>
      <button ref={closeRef} type="button" onClick={onClose} className="absolute right-4 top-4 h-11 cursor-pointer border-0 bg-transparent px-2 text-[15px] font-semibold text-paper underline underline-offset-[6px]">{ui.close}</button>
      <div className="absolute bottom-6 left-0 right-0 text-center text-[14px] text-rose" aria-live="polite">{index + 1} из {n}</div>
    </div>
  );
}
