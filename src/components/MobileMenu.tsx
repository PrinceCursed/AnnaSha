import { useEffect, useRef } from 'react';
import { links, nav, site, ui } from '../content';
import { asset, external, scrollToSection } from '../lib';

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); prev?.focus(); };
  }, [onClose]);

  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); onClose(); scrollToSection(id); };

  return (
    <div role="dialog" aria-modal="true" aria-label={ui.menu} className="fixed inset-0 z-[100] flex flex-col overflow-auto bg-wine px-5 pb-8 font-sans text-paper">
      <div className="flex h-[60px] flex-none items-center justify-between">
        <span className="font-display text-[17px] font-semibold uppercase tracking-[.04em]">{site.name}</span>
        <button ref={closeRef} type="button" onClick={onClose} className="h-11 cursor-pointer border-0 bg-transparent px-1 text-[15px] font-semibold text-paper underline underline-offset-[6px]">{ui.close}</button>
      </div>
      <nav aria-label="Разделы" className="mt-5 flex flex-col">
        {nav.map(n => (
          <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className="block border-b border-[rgba(250,247,244,.16)] py-3 font-display text-[40px] font-semibold uppercase leading-[1.05] text-paper hover:text-paper">{n.label}</a>
        ))}
      </nav>
      <div className="mt-auto flex flex-col items-start gap-[18px] pt-8">
        <a href={links.telegram} {...external} className="btn w-full bg-paper text-wine hover:text-wine">{ui.writeTelegram}</a>
        <a href={asset(links.pdf)} download={links.pdfName} className="link-u text-[16px] text-paper hover:text-paper">{ui.downloadPdf}</a>
      </div>
    </div>
  );
}
