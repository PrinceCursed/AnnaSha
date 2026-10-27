import { mosaic, photography, photos } from '../content';
import { Picture } from '../components/Picture';

export function Photography({ mob, onOpen }: { mob: boolean; onOpen: (i: number) => void }) {
  const cols = mob ? mosaic.mobile : mosaic.desktop;
  const grid = (
    <div className={`relative flex items-start gap-1.5 ${mob ? 'mt-7' : 'mt-[clamp(40px,4.4cqi,64px)]'}`}>
      {cols.map((col, c) => (
        <div key={c} className="flex min-w-0 flex-col gap-1.5" style={{ flex: col.flex, paddingTop: col.pt }}>
          {col.items.map(i => (
            <button
              key={i}
              type="button"
              onClick={() => onOpen(i)}
              aria-label={photos[i].alt}
              className="block w-full cursor-zoom-in overflow-hidden border-0 bg-line p-0"
              style={{ aspectRatio: photos[i].ar }}
            >
              <Picture
                name={photos[i].img}
                alt={photos[i].alt}
                sizes={mob ? '50vw' : '(max-width: 1440px) 40vw, 560px'}
                className={`block h-full w-full object-cover ${mob ? '' : 'zoom-img'}`}
              />
            </button>
          ))}
        </div>
      ))}
    </div>
  );

  if (mob) {
    return (
      <section className="px-5 py-[72px]">
        <h2 className="h2-m text-wine">{photography.title}</h2>
        <div className="ml-1 mt-1.5 w-max max-w-full origin-left -rotate-[4deg] px-[.1em] pb-[.1em] font-script text-[28px] leading-[1.2] text-ink">{photography.note}</div>
        <p className="m-0 mt-4 text-[16px] leading-[1.5] text-muted [text-wrap:pretty]">{photography.textMobile}</p>
        {grid}
      </section>
    );
  }
  return (
    <section className="relative px-gutter py-[clamp(80px,9cqi,140px)]">
      <div className="mx-auto max-w-page">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <div className="flex flex-wrap items-end gap-x-6">
            <h2 className="h2 text-wine">{photography.title}</h2>
            <span className="origin-bottom-left -rotate-[5deg] whitespace-nowrap px-[.1em] pb-[.2em] font-script text-[clamp(28px,3cqi,46px)] leading-[1.2] text-ink">{photography.note}</span>
          </div>
          <p className="m-0 max-w-[380px] pb-2.5 text-[17px] leading-[1.6] text-muted [text-wrap:pretty]">{photography.text}</p>
        </div>
        {grid}
      </div>
    </section>
  );
}
