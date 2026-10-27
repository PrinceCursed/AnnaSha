import { tools } from '../content';

export function Tools({ mob }: { mob: boolean }) {
  if (mob) {
    return (
      <section id="s-tools" className="px-5 py-[72px]">
        <h2 className="h2-m text-[44px] text-wine">{tools.title}</h2>
        <dl className="m-0 mt-7 border-b border-line">
          {tools.rows.map(r => (
            <div key={r.label} className="flex flex-col gap-1.5 border-t border-line py-5">
              <dt className="text-[14px] text-muted">{r.label}</dt>
              <dd className="m-0 font-display text-[24px] font-medium leading-[1.3] text-wine">{r.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    );
  }
  return (
    <section id="s-tools" className="relative px-gutter py-[clamp(80px,9cqi,140px)]">
      <div className="mx-auto flex max-w-page flex-wrap items-start gap-x-[clamp(40px,6cqi,96px)] gap-y-8">
        <div className="flex-[1_1_300px]"><h2 className="h2 text-[clamp(44px,5.6cqi,88px)] text-wine">{tools.title}</h2></div>
        <dl className="m-0 min-w-0 flex-[2_1_560px] border-b border-line">
          {tools.rows.map(r => (
            <div key={r.label} className="flex flex-wrap gap-x-8 gap-y-1.5 border-t border-line py-6">
              <dt className="flex-[0_0_130px] pt-2 text-[15px] text-muted">{r.label}</dt>
              <dd className="m-0 flex-[1_1_320px] font-display text-[clamp(26px,2.6cqi,40px)] font-medium leading-[1.25] text-wine">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
