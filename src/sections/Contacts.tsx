import { contacts, footerLinks, links, site, ui } from '../content';
import { greetingGlyphs } from '../glyphs.gen';
import { Picture } from '../components/Picture';
import { Signature } from '../components/Signature';
import { asset, external, scrollToSection } from '../lib';

const LINE = 'border-[rgba(250,247,244,.2)]';
const VIEW_EASE: [number, number, number, number] = [0.3, 0.6, 0.3, 1];
const toTop = (e: React.MouseEvent) => { e.preventDefault(); scrollToSection('s-top'); };

export function ContactsDesktop() {
  const rows = [
    { label: contacts.rows.telegram, value: links.telegramHandle, href: links.telegram, ext: true },
    { label: contacts.rows.email, value: links.email, href: `mailto:${links.email}`, ext: false },
    { label: contacts.rows.hh, value: contacts.rows.hhValue, href: links.hh, ext: true },
  ];
  return (
    <section id="s-contacts" className="relative bg-wine px-gutter py-[clamp(72px,8cqi,120px)] text-paper">
      <div className="mx-auto flex max-w-page flex-wrap items-end gap-x-[clamp(40px,6cqi,96px)] gap-y-14">
        <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-7">
          <h2 className="m-0 font-display text-[clamp(56px,10.4cqi,168px)] font-bold uppercase leading-[.92] text-paper">{contacts.title}</h2>
          <p className="m-0 max-w-[480px] text-[clamp(18px,1.6cqi,22px)] leading-[1.5] text-rose-pale">{contacts.text}</p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href={links.telegram} {...external} className="btn bg-paper text-wine hover:text-wine">{ui.writeTelegram}</a>
            <a href={asset(links.pdf)} download={links.pdfName} className="link-u text-[16px] text-paper hover:text-paper">{ui.downloadPdf}</a>
          </div>
          <dl className={`m-0 mt-4 border-b ${LINE}`}>
            {rows.map(r => (
              <div key={r.label} className={`flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t ${LINE} py-4`}>
                <dt className="flex-[0_0_110px] text-[15px] text-rose">{r.label}</dt>
                <dd className="m-0 min-w-0 flex-[1_1_220px]">
                  <a href={r.href} {...(r.ext ? external : {})} className="text-[clamp(17px,1.5cqi,21px)] font-semibold text-paper [overflow-wrap:anywhere] hover:text-rose">{r.value}</a>
                </dd>
              </div>
            ))}
            <div className={`flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t ${LINE} py-4`}>
              <dt className="flex-[0_0_110px] text-[15px] text-rose">{contacts.city.label}</dt>
              <dd className="m-0 flex-[1_1_220px] text-[clamp(17px,1.5cqi,21px)] font-semibold">{contacts.city.value}</dd>
            </div>
          </dl>
        </div>
        <div className="relative w-full min-w-0 flex-[0_1_420px]">
          <div className="relative aspect-[2/3]">
            <Picture name="portrait" alt={site.name} sizes="420px" className="absolute inset-0 block h-full w-full object-cover object-center" />
          </div>
          <div className="pointer-events-none absolute bottom-[6%] left-[clamp(12px,6%,28px)] origin-left -rotate-[8deg]">
            <div className="text-[clamp(36px,3.8cqi,56px)] text-wine">
              <Signature glyphs={greetingGlyphs} label={contacts.greeting} trigger="view" ease={VIEW_EASE} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactsMobile() {
  const rows = [
    { label: contacts.rows.telegram, value: links.telegramHandle, props: { href: links.telegram, ...external } },
    { label: contacts.rows.email, value: links.email, props: { href: `mailto:${links.email}` } },
    { label: contacts.rows.hh, value: contacts.rows.hhValue, props: { href: links.hh, ...external } },
    { label: contacts.rows.pdf, value: contacts.rows.pdfValue, props: { href: asset(links.pdf), download: links.pdfName } },
  ];
  return (
    <section id="s-contacts" className="bg-wine px-5 py-[72px] text-paper">
      <h2 className="m-0 font-display text-[clamp(52px,16cqi,72px)] font-bold uppercase leading-[.95] text-paper [overflow-wrap:anywhere]">{contacts.title}</h2>
      <p className="m-0 mt-4 text-[18px] leading-[1.5] text-rose-pale">{contacts.text}</p>
      <a href={links.telegram} {...external} className="btn mt-7 flex h-14 w-full bg-paper text-wine hover:text-wine">{ui.writeTelegram}</a>
      <div className={`mt-7 border-b ${LINE}`}>
        {rows.map(r => (
          <a key={r.label} {...r.props} className={`flex min-h-16 items-center justify-between gap-4 border-t ${LINE} py-2.5 text-paper hover:text-rose`}>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[13px] leading-[1.4] text-rose">{r.label}</span>
              <span className="text-[18px] font-semibold leading-[1.35] [overflow-wrap:anywhere]">{r.value}</span>
            </span>
            <span aria-hidden="true" className="flex-none text-[20px]">→</span>
          </a>
        ))}
        <div className={`flex min-h-16 flex-col justify-center gap-0.5 border-t ${LINE} py-2.5`}>
          <span className="text-[13px] leading-[1.4] text-rose">{contacts.city.label}</span>
          <span className="text-[18px] font-semibold leading-[1.35]">{contacts.city.value}</span>
        </div>
      </div>
      <div className="relative mt-10 aspect-[4/5] overflow-hidden bg-stone">
        <Picture name="portrait" alt={site.name} sizes="calc(100vw - 40px)" className="absolute inset-0 block h-full w-full object-cover object-[50%_40%]" />
        <div className="pointer-events-none absolute left-4 top-[7%] origin-left -rotate-[8deg]">
          <div className="text-[34px] text-wine">
            <Signature glyphs={greetingGlyphs} label={contacts.greeting} trigger="view" ease={VIEW_EASE} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ mob }: { mob: boolean }) {
  const sign = <span className="text-[15px] text-muted"><span className="font-bold text-wine">{site.name}</span>, {site.year}</span>;
  if (mob) {
    return (
      <footer className="flex flex-col gap-4 px-5 pb-10 pt-8">
        {sign}
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          {footerLinks.map(l => (
            <a key={l.label} href={l.href} {...(l.external ? external : {})} className="flex min-h-11 items-center text-[16px] font-semibold text-wine underline underline-offset-[6px]">{l.label}</a>
          ))}
          <a href="#s-top" onClick={toTop} className="ml-auto flex min-h-11 items-center text-[16px] font-semibold text-wine">{ui.toTop}</a>
        </div>
      </footer>
    );
  }
  return (
    <footer className="px-gutter py-[clamp(28px,3cqi,40px)]">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-8 gap-y-3">
        {sign}
        <div className="flex flex-wrap gap-x-[22px] gap-y-1.5">
          {footerLinks.map(l => (
            <a key={l.label} href={l.href} {...(l.external ? external : {})} className="link-u text-[15px] text-wine hover:text-wine">{l.label}</a>
          ))}
        </div>
        <a href="#s-top" onClick={toTop} className="text-[15px] font-semibold text-wine">{ui.toTop}</a>
      </div>
    </footer>
  );
}
