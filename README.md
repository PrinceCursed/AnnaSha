# Анна Шапошникова — резюме

Одностраничный сайт-резюме. Vite + React + TypeScript + Tailwind, анимации на Motion.
Сайт: https://princecursed.github.io/AnnaSha/ (закрыт от индексации, доступ по ссылке).

## Как поменять текст

Все тексты, ссылки и данные лежат в [`src/content.ts`](src/content.ts): заголовки, опыт, навыки,
контакты, подписи к фото, порядок фото в ленте и мозаике. Компоненты только выводят эти данные.

Рукописные строки («Анна Шапошникова», «Буду рада знакомству») рисуются SVG-контурами шрифта
Marck Script. Если меняете их текст, поправьте строки в `scripts/build-glyphs.mjs` и выполните:

```bash
npm run glyphs
```

## Как поменять фото, видео или PDF

1. Положите исходник в `design/export/img/` (фото — `.jpg`, видео — `katyassswan.mp4`).
2. Перегенерируйте медиа: из исходников собираются AVIF/WebP разных ширин, H.264-видео и постер.
   Готовые файлы попадают в `public/media/`, исходники в сборку не идут.

```bash
npm run media
```

Новое фото нужно добавить в список `photos` в `src/content.ts`. Скрипт не перезаписывает готовые
файлы, поэтому при замене фото с тем же именем сначала удалите его старые версии из `public/media/`.

PDF-резюме лежит в `public/Anna_Shaposhnikova_Resume.pdf`: просто замените файл.

Картинка для превью ссылки (Telegram и др.) — `public/og.jpg`. Она снимается с hero-блока сайта:

```bash
npm run build
npm run preview
```

Пока работает preview, в другом терминале:

```bash
npm run og
```

## Локальный запуск

```bash
npm ci
npm run dev
```

## Деплой

Каждый push в `main` запускает GitHub Actions (`.github/workflows/deploy.yml`):
`npm ci` → `npm run build` → публикация на GitHub Pages. Отдельно ничего делать не нужно.

```bash
git add -A
git commit -m "Обновить контент"
git push
```

Ход деплоя виден во вкладке Actions репозитория. В Settings → Pages источник должен быть
«GitHub Actions».

Сборка рассчитана на адрес `/AnnaSha/` (`base` в `vite.config.ts`). Если репозиторий
переименовать, поменяйте `base`, пути `/AnnaSha/` в `index.html` и `scripts/prerender.mjs`,
а также `og:url` и `og:image`.

Индексация отключена: `<meta name="robots" content="noindex, nofollow">` и `public/robots.txt`.
