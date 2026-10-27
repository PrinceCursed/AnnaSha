import { about } from '../content';
import { Picture } from '../components/Picture';

const big = 'font-display font-bold leading-[.92] text-paper';

export function AboutDesktop() {
  const [teams, people, events] = about.stats;
  return (
    <section id="s-about" className="relative z-[2] bg-wine px-gutter py-[clamp(64px,8cqi,120px)] text-paper">
      <div className="mx-auto max-w-page">
        <div className="flex flex-wrap items-start gap-x-[clamp(40px,6cqi,96px)] gap-y-10">
          <div className="about-pull min-w-0 flex-[0_1_380px]">
            <div className="relative aspect-[2/3]">
              <Picture name="about" alt={about.photoAlt} sizes="380px" className="absolute inset-0 block h-full w-full object-cover object-center" />
            </div>
          </div>
          <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-7">
            <h2 className="h2 text-paper">{about.title}</h2>
            <p className="m-0 max-w-[720px] text-[clamp(22px,2.3cqi,34px)] font-medium leading-[1.3] [text-wrap:pretty]">{about.lead}</p>
            <p className="m-0 max-w-[600px] text-[clamp(16px,1.25cqi,18px)] leading-[1.65] text-rose-soft [text-wrap:pretty]">{about.text}</p>
            <p className="m-0 max-w-[640px] text-[clamp(16px,1.25cqi,18px)] leading-[1.7] text-rose">{about.traits}</p>
          </div>
        </div>
        <div className="mt-[clamp(56px,7cqi,104px)] flex flex-wrap gap-x-[clamp(40px,6cqi,96px)] gap-y-10 border-t border-[rgba(250,247,244,.2)] pt-[clamp(28px,3cqi,40px)]">
          <div className="min-w-0 flex-[1.6_1_420px]">
            <div className="flex flex-col gap-2.5">
              <span className={`${big} text-[clamp(64px,9.6cqi,150px)]`}>{about.experience.lines[0]}<br />{about.experience.lines[1]}</span>
              <span className="text-[16px] text-rose">{about.experience.label}</span>
            </div>
          </div>
          <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-6 pt-2">
            <div className="flex flex-col gap-2.5">
              <span className={`${big} text-[clamp(48px,4.6cqi,68px)]`}>{teams.value}</span>
              <span className="text-[16px] text-rose">{teams.label}</span>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              {[people, events].map(s => (
                <div key={s.label} className="flex flex-col gap-2.5">
                  <span className={`${big} text-[clamp(40px,3.4cqi,52px)]`}>{s.value}</span>
                  <span className="text-[16px] text-rose">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutMobile() {
  return (
    <section id="s-about" className="bg-wine px-5 py-[72px] text-paper">
      <h2 className="h2-m text-paper">{about.title}</h2>
      <div className="relative mt-7 aspect-[4/5] overflow-hidden bg-stone">
        <Picture name="about" alt={about.photoAlt} sizes="calc(100vw - 40px)" className="absolute inset-0 block h-full w-full object-cover object-[50%_45%]" />
      </div>
      <p className="m-0 mt-7 text-[22px] font-medium leading-[1.35] [text-wrap:pretty]">{about.lead}</p>
      <p className="m-0 mt-4 text-[16px] leading-[1.5] text-rose-soft [text-wrap:pretty]">{about.text}</p>
      <p className="m-0 mt-4 text-[16px] leading-[1.5] text-rose">{about.traits}</p>
      <div className="mt-12 border-b border-[rgba(250,247,244,.2)]">
        <div className="flex flex-col gap-2 border-t border-[rgba(250,247,244,.2)] pb-5 pt-4">
          <span className="font-display text-[56px] font-bold leading-none text-paper">{about.experience.lines.join(' ')}</span>
          <span className="text-[16px] leading-[1.4] text-rose">{about.experience.label}</span>
        </div>
        {about.stats.map(s => (
          <div key={s.label} className="flex items-center gap-4 border-t border-[rgba(250,247,244,.2)] py-4">
            <span className="flex-[0_0_150px] whitespace-nowrap font-display text-[44px] font-bold leading-none text-paper">{s.value}</span>
            <span className="min-w-0 flex-[1_1_0] text-[16px] leading-[1.4] text-rose">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
