import { hero, links, site, ui, footerLinks } from '../content';
import { nameGlyphs } from '../glyphs.gen';
import { Picture } from '../components/Picture';
import { Signature } from '../components/Signature';
import { asset, external } from '../lib';

const HERO_EASE: [number, number, number, number] = [0.55, 0.1, 0.35, 1];

function Title({ className }: { className: string }) {
  return (
    <h1 className={`m-0 whitespace-nowrap font-display font-bold uppercase text-wine ${className}`}>
      <span className="block overflow-hidden" style={{ padding: '.18em .06em .14em', margin: '-.18em -.06em -.14em' }}>{hero.title}</span>
    </h1>
  );
}

export function HeroDesktop() {
  return (
    <section id="s-top" className="hero-pad relative px-gutter">
      <div className="mx-auto grid max-w-page grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-x-[4cqi]">
        <div className="relative z-[3] col-[1/3] row-start-1">
          <Title className="text-[clamp(64px,24cqi,360px)] leading-[.86] tracking-[-.01em]" />
          <div className="pointer-events-none ml-[5cqi] mt-[1.2cqi] w-max origin-left -rotate-[4deg]">
            <div className="text-[5cqi] text-ink">
              <Signature glyphs={nameGlyphs} label={site.name} trigger="load" ease={HERO_EASE} delay={0.3} />
            </div>
          </div>
        </div>
        <div className="col-start-1 row-start-2 flex max-w-[540px] flex-col gap-6 pt-[clamp(32px,3.6cqi,56px)]">
          <p className="m-0 text-[clamp(17px,1.35cqi,20px)] font-semibold text-wine">{hero.roles}</p>
          <p className="m-0 text-[clamp(20px,1.8cqi,26px)] font-medium leading-[1.4] text-ink [text-wrap:pretty]">{hero.lead}</p>
          <p className="m-0 text-[16px] leading-[1.6] text-muted">{hero.note}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href={links.telegram} {...external} className="btn bg-wine text-paper hover:text-paper">{ui.writeTelegram}</a>
            <a href={asset(links.pdf)} download={links.pdfName} className="link-u text-[16px] text-wine hover:text-wine">{ui.downloadPdf}</a>
          </div>
          <div className="border-t border-line pt-5">
            <div className="flex flex-wrap gap-x-[22px] gap-y-1.5">
              {footerLinks.map(l => (
                <a key={l.label} href={l.href} {...(l.external ? external : {})} className="link-u text-[15px] text-ink hover:text-ink">{l.label}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-photo relative z-[1] col-start-2 row-[1/3] -mr-[clamp(24px,4.4cqi,64px)]">
          <div className="relative aspect-[2/3] bg-portrait">
            <Picture name="portrait" alt={hero.portraitAlt} sizes="(max-width: 1440px) 42vw, 600px" priority className="absolute inset-0 block h-full w-full object-cover object-center" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroMobile() {
  return (
    <section id="s-top" className="px-5 pb-[72px] pt-5">
      <Title className="text-[clamp(48px,calc((100cqi-40px)/3.6),200px)] leading-[.88] tracking-[-.01em]" />
      <div className="pointer-events-none ml-3 mt-2.5 w-max max-w-full origin-left -rotate-[4deg]">
        <div className="text-[clamp(30px,9cqi,40px)] text-ink">
          <Signature glyphs={nameGlyphs} label={site.name} trigger="load" ease={HERO_EASE} delay={0.3} />
        </div>
      </div>
      <div className="relative mt-6 aspect-[4/5] overflow-hidden bg-portrait">
        <Picture name="portrait" alt={hero.portraitAlt} sizes="calc(100vw - 40px)" priority className="absolute inset-0 block h-full w-full object-cover object-[50%_40%]" />
      </div>
      <p className="m-0 mt-6 text-[15px] font-semibold leading-[1.5] text-wine">{hero.roles}</p>
      <p className="m-0 mt-3 text-[21px] font-medium leading-[1.4] text-ink [text-wrap:pretty]">{hero.lead}</p>
      <p className="m-0 mt-3 text-[16px] leading-[1.5] text-muted">{hero.noteMobile}</p>
      <a href={links.telegram} {...external} className="btn mt-7 flex h-14 w-full bg-wine text-paper hover:text-paper">{ui.writeTelegram}</a>
    </section>
  );
}
