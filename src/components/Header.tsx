import { links, nav, site, ui } from '../content';
import { external, scrollToSection, useScrolledPast } from '../lib';

type Variant = 'desk' | 'tab' | 'phone';

// Header height full → compact, per design. Done with transforms only: the
// sticky offset hides the top strip and the row shifts down to stay centred.
const H: Record<Variant, [number, number]> = { desk: [84, 64], tab: [68, 58], phone: [60, 56] };

const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); scrollToSection(id); };

export function Header({ variant, menuOpen, onMenu }: { variant: Variant; menuOpen: boolean; onMenu: () => void }) {
  const compact = useScrolledPast(40);
  const [full, small] = H[variant];
  const shift = full - small;

  return (
    <header className="sticky z-50" style={{ top: -shift }}>
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b transition-opacity duration-[400ms] ease-out"
        style={{ opacity: compact ? 1 : 0, background: 'rgba(250,247,244,.92)', borderColor: 'rgba(94,11,28,.14)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      />
      <div
        className="relative transition-transform duration-[400ms] ease-out"
        style={{ transform: compact ? `translateY(${shift / 2}px)` : 'none' }}
      >
        {variant === 'desk' && (
          <div className="mx-auto flex h-[84px] max-w-header items-center justify-between gap-8 px-gutter">
            <a href="#s-top" onClick={go('s-top')} className="whitespace-nowrap font-display text-[20px] font-semibold uppercase tracking-[.04em] text-wine">{site.name}</a>
            <nav aria-label="Разделы" className="flex gap-[clamp(20px,2.4cqi,36px)]">
              {nav.map(n => (
                <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className="text-[15px] font-medium text-ink transition-colors duration-200 hover:text-wine">{n.label}</a>
              ))}
            </nav>
            <a href={links.telegram} {...external} className="link-u text-[15px] text-wine hover:text-wine">{ui.write}</a>
          </div>
        )}
        {variant === 'tab' && (
          <div className="flex h-[68px] items-center justify-between gap-4 px-gutter">
            <a href="#s-top" onClick={go('s-top')} className="whitespace-nowrap font-display text-[17px] font-semibold uppercase tracking-[.04em] text-wine">{site.name}</a>
            <button type="button" onClick={onMenu} aria-expanded={menuOpen} className="h-11 cursor-pointer border-0 bg-transparent px-1 text-[15px] font-semibold text-wine underline underline-offset-[6px]">{ui.menu}</button>
          </div>
        )}
        {variant === 'phone' && (
          <div className="flex h-[60px] items-center justify-between gap-4 px-5">
            <a href="#s-top" onClick={go('s-top')} className="whitespace-nowrap font-display text-[16px] font-semibold uppercase tracking-[.04em] text-wine">{site.name}</a>
            <button type="button" onClick={onMenu} aria-label={ui.menu} aria-expanded={menuOpen} className="-mr-3 flex h-12 w-12 flex-none cursor-pointer flex-col items-center justify-center gap-1.5 border-0 bg-transparent p-0">
              <span className="block h-0.5 w-6 bg-wine" /><span className="block h-0.5 w-6 bg-wine" /><span className="block h-0.5 w-6 bg-wine" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
