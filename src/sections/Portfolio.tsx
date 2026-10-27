import { useRef } from 'react';
import { lifestyleIdx, photos, portfolio, ui } from '../content';
import { Picture } from '../components/Picture';
import { PhoneVideo } from '../components/PhoneVideo';

const { project, lifestyle } = portfolio;
const LINE = 'border-[rgba(250,247,244,.2)]';

function Ribbon({ mob, onOpen, ribbonRef }: { mob: boolean; onOpen: (i: number) => void; ribbonRef?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ribbonRef}
      className={mob
        ? 'no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory gap-1.5 overflow-x-auto overscroll-x-contain scroll-px-5 px-5'
        : 'no-scrollbar -mx-gutter mt-[clamp(32px,4cqi,48px)] flex snap-x snap-mandatory gap-1.5 overflow-x-auto overscroll-x-contain px-gutter [scroll-padding:0_clamp(24px,4.4cqi,64px)]'}
    >
      {lifestyleIdx.map(i => (
        <button
          key={i}
          type="button"
          onClick={() => onOpen(i)}
          aria-label={photos[i].alt}
          className={`flex-none cursor-zoom-in snap-start overflow-hidden border-0 bg-film p-0 aspect-[9/16] ${mob ? 'w-[68%]' : 'h-[clamp(400px,40cqi,580px)]'}`}
        >
          <Picture
            name={photos[i].img}
            alt={photos[i].alt}
            sizes={mob ? '68vw' : '330px'}
            draggable={false}
            className={`block h-full w-full object-cover ${mob ? '' : 'zoom-img'}`}
          />
        </button>
      ))}
      {mob && <span className="w-3.5 flex-none" />}
    </div>
  );
}

const steps = (mob: boolean) => (
  <dl className={`m-0 border-b ${LINE} ${mob ? 'mt-7' : 'mt-3 max-w-[560px]'}`}>
    {project.steps.map(s => mob ? (
      <div key={s.title} className={`flex items-center gap-4 border-t ${LINE} py-3.5`}>
        <dt className="flex-[0_0_150px] font-display text-[22px] font-medium uppercase leading-[1.2]">{s.title}</dt>
        <dd className="m-0 min-w-0 flex-[1_1_0] text-[15px] leading-[1.4] text-rose">{s.text}</dd>
      </div>
    ) : (
      <div key={s.title} className={`flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t ${LINE} py-[18px]`}>
        <dt className="flex-[0_0_200px] font-display text-[clamp(26px,2.6cqi,40px)] font-medium uppercase leading-[1.1]">{s.title}</dt>
        <dd className="m-0 flex-[1_1_200px] text-[16px] leading-[1.5] text-rose">{s.text}</dd>
      </div>
    ))}
  </dl>
);

export function PortfolioDesktop({ onOpen }: { onOpen: (i: number) => void }) {
  const ribbon = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => {
    const r = ribbon.current;
    if (r) r.scrollBy({ left: d * r.clientWidth * 0.8, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  const arrow = 'h-12 w-12 cursor-pointer font-[system-ui] rounded-[2px] border border-solid border-[rgba(250,247,244,.35)] bg-transparent text-[20px] text-paper transition-colors duration-200 hover:bg-[rgba(250,247,244,.1)]';

  return (
    <section id="s-portfolio" className="relative bg-wine px-gutter py-[clamp(80px,9cqi,140px)] text-paper">
      <div className="mx-auto max-w-page">
        <div className="flex flex-wrap items-end gap-x-7">
          <h2 className="h2 text-paper">{portfolio.title}</h2>
          <span className="origin-bottom-left -rotate-[5deg] whitespace-nowrap px-[.1em] pb-[.2em] font-script text-[clamp(30px,3.4cqi,52px)] leading-[1.2] text-rose">{portfolio.note}</span>
        </div>
        <div className="mt-[clamp(48px,6cqi,88px)] flex flex-wrap items-center justify-center gap-x-[clamp(48px,7cqi,120px)] gap-y-12">
          <div className="relative w-[clamp(260px,27cqi,380px)] flex-none">
            <PhoneVideo mob={false} />
          </div>
          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-6">
            <p className="m-0 text-[clamp(17px,1.4cqi,20px)] font-semibold text-rose">{project.kicker}</p>
            <h3 className="m-0 -mt-3 font-display text-[clamp(48px,7.6cqi,120px)] font-bold uppercase leading-[.95] [overflow-wrap:anywhere]">{project.name}</h3>
            <p className="m-0 max-w-[460px] text-[clamp(17px,1.35cqi,20px)] leading-[1.6] text-rose-soft [text-wrap:pretty]">{project.text}</p>
            {steps(false)}
          </div>
        </div>
        <div className="mt-[clamp(96px,11cqi,160px)] flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <div className="flex min-w-0 flex-col gap-5">
            <h3 className="m-0 font-display text-[clamp(44px,5.4cqi,84px)] font-bold uppercase leading-[.95]">{lifestyle.title}</h3>
            <p className="m-0 max-w-[420px] text-[17px] leading-[1.6] text-rose-soft [text-wrap:pretty]">{lifestyle.text}</p>
          </div>
          <div className="flex gap-2">
            <button type="button" aria-label={ui.prev} onClick={() => scroll(-1)} className={arrow}>←</button>
            <button type="button" aria-label={ui.next} onClick={() => scroll(1)} className={arrow}>→</button>
          </div>
        </div>
        <Ribbon mob={false} onOpen={onOpen} ribbonRef={ribbon} />
      </div>
    </section>
  );
}

export function PortfolioMobile({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section id="s-portfolio" className="bg-wine px-5 py-[72px] text-paper">
      <h2 className="h2-m text-paper">{portfolio.title}</h2>
      <div className="ml-1 mt-1.5 w-max max-w-full origin-left -rotate-[4deg] px-[.1em] pb-[.1em] font-script text-[30px] leading-[1.2] text-rose">{portfolio.note}</div>
      <div className="mx-auto mt-10 w-[70%] max-w-[300px]">
        <PhoneVideo mob />
      </div>
      <div className="mt-9 text-center">
        <p className="m-0 text-[16px] font-semibold text-rose">{project.kicker}</p>
        <h3 className="m-0 mt-1 font-display text-[clamp(40px,13cqi,56px)] font-bold uppercase leading-none [overflow-wrap:anywhere]">{project.name}</h3>
        <p className="m-0 mx-auto mt-3.5 max-w-[340px] text-[16px] leading-[1.5] text-rose-soft [text-wrap:pretty]">{project.text}</p>
      </div>
      {steps(true)}
      <h3 className="m-0 mt-[72px] font-display text-[40px] font-bold uppercase leading-[.95]">{lifestyle.title}</h3>
      <p className="m-0 mt-3.5 text-[16px] leading-[1.5] text-rose-soft [text-wrap:pretty]">{lifestyle.text}</p>
      <Ribbon mob onOpen={onOpen} />
      <p className="m-0 mt-3 text-[14px] text-rose">{ui.swipeHint}</p>
    </section>
  );
}
