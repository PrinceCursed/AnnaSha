import { education } from '../content';

export function Education({ mob }: { mob: boolean }) {
  if (mob) {
    const { languages, extra } = education;
    const cards = [
      ...education.items,
      { when: languages.title, title: languages.text, text: '' },
      { when: extra.title, title: extra.mobileTitle, text: extra.mobileText },
    ];
    return (
      <section id="s-edu" className="bg-blush px-5 py-[72px]">
        <h2 className="h2-m text-[44px] text-wine">{education.title}</h2>
        <div className="mt-7 flex flex-col gap-2">
          {cards.map(c => (
            <div key={c.when} className="flex flex-col gap-1.5 bg-paper p-5">
              <span className="font-display text-[16px] font-medium leading-[1.3] text-wine">{c.when}</span>
              <span className="text-[19px] font-bold leading-[1.3]">{c.title}</span>
              {c.text && <span className="text-[16px] leading-[1.5] text-muted">{c.text}</span>}
            </div>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section id="s-edu" className="relative bg-blush px-gutter py-[clamp(80px,9cqi,140px)]">
      <div className="mx-auto max-w-page">
        <h2 className="h2 max-w-[900px] text-wine">{education.title}</h2>
        <div className="mt-[clamp(36px,4cqi,56px)] max-w-[1080px] border-b border-blush-line">
          {education.items.map(e => (
            <div key={e.when} className="flex flex-wrap gap-x-8 gap-y-1.5 border-t border-blush-line py-7">
              <span className="flex-[0_0_220px] font-display text-[20px] font-medium leading-[1.3] text-wine">{e.when}</span>
              <div className="min-w-0 flex-[1_1_420px]">
                <div className="text-[clamp(20px,1.8cqi,26px)] font-bold leading-[1.3]">{e.title}</div>
                <div className="mt-1.5 text-[16px] leading-[1.5] text-muted">{e.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[clamp(40px,4.4cqi,64px)] flex max-w-[1080px] flex-wrap gap-x-[clamp(40px,6cqi,96px)] gap-y-8">
          {[
            { ...education.languages, cls: 'flex-[1_1_300px]' },
            { ...education.extra, cls: 'flex-[1.4_1_360px]' },
          ].map(b => (
            <div key={b.title} className={b.cls}>
              <div className="font-display text-[20px] font-medium text-wine">{b.title}</div>
              <p className="m-0 mt-2 text-[17px] leading-[1.6]">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
