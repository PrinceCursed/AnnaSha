import type { CSSProperties } from 'react';
import { images, type ImageName } from '../media.gen';
import { asset } from '../lib';

type Props = {
  name: ImageName;
  alt: string;
  sizes: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  draggable?: boolean;
  onClick?: (e: React.MouseEvent) => void;
};

const srcset = (name: ImageName, ext: string) =>
  images[name].widths.map(w => `${asset(`media/${name}-${w}.${ext}`)} ${w}w`).join(', ');

export function Picture({ name, alt, sizes, className, style, priority, draggable, onClick }: Props) {
  const img = images[name];
  const fallback = img.widths[Math.min(2, img.widths.length - 1)];
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={srcset(name, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(name, 'webp')} sizes={sizes} />
      <img
        src={asset(`media/${name}-${fallback}.webp`)}
        alt={alt}
        width={img.w}
        height={img.h}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchpriority: 'high' } : {})}
        draggable={draggable}
        className={className}
        style={style}
        onClick={onClick}
      />
    </picture>
  );
}
