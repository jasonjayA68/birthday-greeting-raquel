# birthday-greeting-raquel

A little interactive birthday greeting for Raquel's 26th 🎂 — Next.js (App Router) + TypeScript.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Customize

- Photos: `public/images/raquel-1.jpg` … `raquel-6.jpg` (lowercase names — Vercel is case-sensitive). Alt text and sizes live in `src/lib/photos.ts`.
- Message text: `src/components/MessageCard.tsx`.
- Optional music: add `public/audio/song.mp3` — the music button appears automatically.

## Environment

| Variable | Example | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://birthday-greetings-raquel.vercel.app` | Full URL for Open Graph link previews |
