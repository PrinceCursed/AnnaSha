import { useRef, useState } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { skills } from '../content';

const ROW = 'row border-[rgba(250,247,244,.2)]';

// Tab switch: short 250 ms fade of the list, active tab underlined.
export function Skills({ mob }: { mob: boolean }) {
  const [tab, setTab] = useState(0);
  const changed = useRef(false);
  const reduce = useReducedMotion();
  const select = (i: number) => { changed.current = true; setTab(i); };

  const onKey = (e: React.KeyboardEvent) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const next = (tab + d + skills.tabs.length) % skills.tabs.length;
    select(next);
    document.getElementById(`sk-tab-${next}`)?.focus();
  };

  const tabs = (
    <div
      role="tablist"
      onKeyDown={onKey}
      className={mob
        ? 'no-scrollbar -mx-5 mt-7 flex gap-6 overflow-x-auto border-b border-[rgba(250,247,244,.2)] px-5'
        : 'no-scrollbar mt-[clamp(32px,4cqi,56px)] flex gap-[clamp(20px,3cqi,44px)] overflow-x-auto border-b border-[rgba(250,247,244,.2)]'}
    >
      {skills.tabs.map((t, i) => (
        <button
          key={t.label}
          id={`sk-tab-${i}`}
          type="button"
          role="tab"
          aria-selected={tab === i}
          aria-controls="sk-panel"
          tabIndex={tab === i ? 0 : -1}
          onClick={() => select(i)}
          className={`flex-none cursor-pointer border-0 border-b-2 border-solid bg-transparent font-display font-medium uppercase tracking-[.02em] transition-colors duration-[250ms] ${mob ? 'whitespace-nowrap pb-3 pt-3.5 text-[17px]' : 'py-2.5 text-[clamp(18px,1.6cqi,24px)]'}`}
          style={{ color: tab === i ? '#FAF7F4' : 'rgba(250,247,244,.55)', borderBottomColor: tab === i ? '#FAF7F4' : 'transparent' }}
        >
          {t.label}
        </button>
      ))}
      {mob && <span className="w-px flex-none" />}
    </div>
  );

  const panel = (
    <m.div
      key={tab}
      id="sk-panel"
      role="tabpanel"
      aria-labelledby={`sk-tab-${tab}`}
      initial={changed.current && !reduce ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <ul className={mob ? 'm-0 list-none border-b border-[rgba(250,247,244,.2)] p-0' : 'm-0 list-none p-0 [column-gap:48px] [columns:3_240px]'}>
        {skills.tabs[tab].items.map(s => <li key={s} className={ROW}>{s}</li>)}
      </ul>
    </m.div>
  );

  const strengths = <><span className="font-semibold text-paper">{skills.strengthsLabel}</span> {skills.strengths}</>;

  if (mob) {
    return (
      <section id="s-skills" className="bg-wine px-5 py-[72px] text-paper">
        <h2 className="h2-m text-paper">{skills.title}</h2>
        {tabs}
        <div className="mt-5">{panel}</div>
        <p className="m-0 mt-8 text-[16px] leading-[1.5] text-rose [text-wrap:pretty]">{strengths}</p>
      </section>
    );
  }
  return (
    <section id="s-skills" className="relative bg-wine px-gutter py-[clamp(72px,8cqi,120px)] text-paper">
      <div className="relative mx-auto max-w-page">
        <h2 className="h2 text-paper">{skills.title}</h2>
        {tabs}
        <div className="mt-7 min-h-[200px]">{panel}</div>
        <p className="m-0 mt-[clamp(48px,5cqi,72px)] max-w-[880px] text-[clamp(18px,1.6cqi,22px)] leading-[1.6] text-rose [text-wrap:pretty]">{strengths}</p>
      </div>
    </section>
  );
}
