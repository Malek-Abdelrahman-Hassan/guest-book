# Malek & Noha Wedding Website

A bilingual (Arabic / English) wedding website with a **playing cards theme**, an animated homepage, a **live guest book** that visitors can flip through like a real book, and a scannable **QR code** for sharing photos.

> Saturday, August 8, 2026 · 7:00 PM · El Masa Hall — International Park, Nasr City

## Features

- Playing-cards themed design (King of Hearts = Malek, Queen of Hearts = Noha)
- Animated hero with dealt cards, floating suits, and a live **countdown timer**
- Full **Arabic (RTL)** and **English (LTR)** support with one-tap language toggle
- **Live guest book** powered by Supabase — messages appear in real time as flippable book pages
- Clickable / scannable **QR code** linking to the shared Google Drive photo album
- Fully responsive and ready to deploy on **GitHub Pages**

## Tech Stack

- [Vite](https://vitejs.dev/) + React + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (real-time database for the guest book)
- [react-pageflip](https://www.npmjs.com/package/react-pageflip) (book flip effect)
- [Framer Motion](https://www.framer.com/motion/) (animations)
- [react-i18next](https://react.i18next.com/) (bilingual support)

## Getting Started (local development)

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

The site runs fine without any configuration — but the guest book will show a
"not configured" note until you connect Supabase (see below).

## Setting up the live Guest Book (Supabase)

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase dashboard, open **SQL Editor** and run:

   ```sql
   create table messages (
     id uuid default gen_random_uuid() primary key,
     name text not null,
     message text not null,
     created_at timestamptz default now()
   );

   alter table messages enable row level security;

   create policy "Anyone can read" on messages
     for select using (true);

   create policy "Anyone can insert" on messages
     for insert with check (true);
   ```

3. Enable realtime for the table: **Database → Replication** (or **Realtime**) →
   add the `messages` table to the `supabase_realtime` publication.
4. Go to **Project Settings → API** and copy the **Project URL** and the
   **anon public** key.
5. Copy `.env.example` to `.env` and paste your values:

   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

6. Restart `npm run dev`. The guest book is now live.

## Photo album QR code

The QR code in the **Photos** section is both scannable and clickable. It links to:

```
https://drive.google.com/drive/folders/1Hbwl4z2b-dfB8OoWJUfebJrYEvtwE1ah
```

To change it, edit `DRIVE_URL` in [`src/components/PhotoUpload.tsx`](src/components/PhotoUpload.tsx)
and replace `public/qr-code.png` with a matching QR image.

## Deploying to GitHub Pages

This repo includes a GitHub Actions workflow at
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that builds and
deploys automatically on every push to `main`.

1. In your GitHub repo, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
2. (For the live guest book on the deployed site) go to
   **Settings → Secrets and variables → Actions** and add two repository secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Push to `main`. The site will be published at:

   ```
   https://malek-abdelrahman-hassan.github.io/guest-book/
   ```

> The Vite `base` is set to `/guest-book/` in `vite.config.ts` to match the repo
> name. If you rename the repository, update that value too.

### Alternative: manual deploy

```bash
npm run deploy
```

This builds and pushes the `dist` folder to a `gh-pages` branch using the
`gh-pages` package.

## Project Structure

```
src/
  components/    UI sections (Hero, GuestBook, PhotoUpload, ...)
  hooks/         useMessages (Supabase fetch + realtime subscription)
  lib/           Supabase client
  locales/       en.json / ar.json translations
  i18n.ts        i18next + RTL setup
```

Made with love for Malek & Noha.
