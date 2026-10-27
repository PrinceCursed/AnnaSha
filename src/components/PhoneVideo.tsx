import { useEffect, useRef, useState } from 'react';
import { ui } from '../content';
import { video } from '../media.gen';
import { asset } from '../lib';

// Phone mockup with the reel. The file loads only when the phone nears the viewport.
export function PhoneVideo({ mob }: { mob: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      setLoad(true);
    }, { rootMargin: '300px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!load || !el) return;
    el.muted = true;
    el.play()?.catch(() => {});
  }, [load]);

  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    if (!el.muted) el.play()?.catch(() => {});
    setSound(!el.muted);
  };

  return (
    <div className={mob ? 'rounded-[40px] bg-phone p-2 shadow-[0_40px_64px_-32px_rgba(10,2,4,.7)]' : 'rounded-[48px] bg-phone p-[10px] shadow-[0_48px_80px_-36px_rgba(10,2,4,.7)]'}>
      <div className={`relative aspect-[9/16] overflow-hidden bg-phone ${mob ? 'rounded-[32px]' : 'rounded-[38px]'}`}>
        <video
          ref={ref}
          src={load ? asset(video.src) : undefined}
          poster={asset(video.poster)}
          muted
          loop
          playsInline
          autoPlay={load}
          preload="none"
          aria-label="Ролик для katyassswan"
          className="absolute inset-0 block h-full w-full object-cover"
        />
        <div aria-hidden="true" className={`absolute left-1/2 w-[30%] -translate-x-1/2 rounded-full bg-phone ${mob ? 'top-2 h-5' : 'top-[10px] h-6'}`} />
        {video.hasAudio && (
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={sound}
            className={`absolute cursor-pointer rounded-[2px] border-0 bg-[rgba(20,7,9,.74)] font-sans text-[14px] font-semibold text-paper backdrop-blur-[8px] transition-colors duration-200 hover:bg-[rgba(20,7,9,.9)] ${mob ? 'bottom-[10px] left-[10px] right-[10px] h-11' : 'bottom-3 left-3 right-3 h-[46px]'}`}
          >
            {sound ? ui.soundOff : ui.soundOn}
          </button>
        )}
      </div>
    </div>
  );
}
