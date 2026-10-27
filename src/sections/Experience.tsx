import { useState } from 'react';
import { experience, ui } from '../content';
import { ScrollLine } from '../components/ScrollLine';

const { current, key } = experience;

export function ExperienceDesktop() {
  return (
    <section id="s-exp" className="relative px-gutter py-[clamp(80px,9cqi,140px)]">
      <div className="mx-auto max-w-page">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <h2 className="h2 text-wine">{experience.title}</h2>
          <p className="m-0 pb-2.5 text-[17px] text-muted">{experience.total}</p>
        </div>
        <div className="relative mt-[clamp(48px,5cqi,72px)] pl-[clamp(24px,3cqi,44px)]">
          <ScrollLine top={6} />
          <div className="flex flex-wrap gap-x-[clamp(32px,4cqi,64px)] gap-y-4">
            <div className="flex flex-[0_1_240px] flex-col gap-1.5">
              <span className="font-display text-[clamp(22px,2cqi,28px)] font-semibold leading-[1.15] text-wine">{current.period}</span>
              <span className="text-[15px] text-muted">{current.caption}</span>
            </div>
            <div className="min-w-0 flex-[1_1_480px]">
              <h3 className="m-0 font-display text-[clamp(30px,3cqi,44px)] font-semibold uppercase leading-none text-wine">{current.role}</h3>
              <p className="m-0 mt-3 text-[18px] font-bold">{current.company}</p>
              <p className="m-0 mt-1 text-[15px] text-muted">{current.industry}</p>
              <ul className="m-0 mt-6 max-w-[720px] list-none p-0">
                {current.duties.map(d => <li key={d} className="row border-line">{d}</li>)}
              </ul>
            </div>
          </div>
          <div className="mt-[clamp(64px,7cqi,104px)] flex flex-wrap gap-x-[clamp(32px,4cqi,64px)] gap-y-4">
            <div className="flex flex-[0_1_240px] flex-col gap-1.5">
              <span className="font-display text-[clamp(22px,2cqi,28px)] font-semibold leading-[1.15] text-wine">{key.period}</span>
              <span className="text-[15px] text-muted">{key.duration}</span>
              <span className="mt-3.5 w-max origin-left -rotate-[6deg] font-script text-[clamp(30px,2.6cqi,38px)] leading-[1.1] text-wine">{key.note}</span>
            </div>
            <div className="min-w-0 flex-[1_1_480px] bg-blush p-[clamp(24px,3.6cqi,56px)]">
              <h3 className="m-0 font-display text-[clamp(40px,5.4cqi,84px)] font-bold uppercase leading-[.95] text-wine [text-wrap:balance]">{key.role}</h3>
              <p className="m-0 mt-4 text-[clamp(18px,1.5cqi,21px)] font-bold">{key.company}</p>
              <p className="m-0 mt-1 text-[15px] text-muted">{key.industry}</p>
              <ul className="m-0 mt-7 list-none p-0 [column-gap:48px] [columns:2_280px]">
                {key.duties.map(d => <li key={d} className="row border-blush-line">{d}</li>)}
              </ul>
              <div className="mt-8 flex flex-wrap gap-x-14 gap-y-6">
                {key.stats.map(s => (
                  <p key={s.label} className="m-0 flex flex-col gap-1.5">
                    <span className="font-display text-[clamp(44px,4.4cqi,64px)] font-bold leading-none text-wine">{s.value}</span>
                    <span className="text-[15px]">{s.label}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExperienceMobile() {
  const [all, setAll] = useState(false);
  const duties = all ? key.duties : key.duties.slice(0, key.collapsedCount);
  return (
    <section id="s-exp" className="px-5 py-[72px]">
      <h2 className="h2-m text-wine">{experience.title}</h2>
      <p className="m-0 mt-3 text-[16px] text-muted">{experience.totalMobile}</p>
      <div className="relative mt-10 pl-5">
        <ScrollLine top={4} />
        <div>
          <span className="font-display text-[18px] font-semibold leading-[1.3] text-wine">{current.period}</span>
          <h3 className="m-0 mt-2 font-display text-[28px] font-semibold uppercase leading-[1.05] text-wine">{current.role}</h3>
          <p className="m-0 mt-2.5 text-[17px] font-bold">{current.company}</p>
          <p className="m-0 mt-0.5 text-[14px] leading-[1.45] text-muted">{current.industry}</p>
          <ul className="m-0 mt-4 list-none border-b border-line p-0">
            {current.duties.map(d => <li key={d} className="row border-line">{d}</li>)}
          </ul>
        </div>
        <div className="mt-14">
          <span className="font-display text-[18px] font-semibold leading-[1.3] text-wine">{key.period}</span>
          <p className="m-0 mt-0.5 text-[14px] text-muted">{key.duration} · {key.note}</p>
          <div className="mt-4 bg-blush p-5">
            <h3 className="m-0 font-display text-[32px] font-bold uppercase leading-none text-wine">{key.role}</h3>
            <p className="m-0 mt-3 text-[17px] font-bold">{key.company}</p>
            <p className="m-0 mt-0.5 text-[14px] leading-[1.45] text-muted">{key.industry}</p>
            <ul id="joy-duties" className="m-0 mt-4 list-none p-0">
              {duties.map(d => <li key={d} className="row border-blush-line">{d}</li>)}
            </ul>
            <button
              type="button"
              onClick={() => setAll(v => !v)}
              aria-expanded={all}
              aria-controls="joy-duties"
              className="block min-h-12 w-full cursor-pointer whitespace-nowrap border-0 border-t border-solid border-blush-line bg-transparent p-0 text-left text-[16px] font-semibold text-wine underline underline-offset-[6px]"
            >
              {all ? ui.collapse : ui.showAll}
            </button>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {key.stats.map(s => (
                <p key={s.label} className="m-0 flex flex-col gap-1">
                  <span className="font-display text-[44px] font-bold leading-none text-wine">{s.value}</span>
                  <span className="text-[14px] leading-[1.4]">{s.label}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
