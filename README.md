# Personal Portfolio

A sleek, animated, personal portfolio and brag document, designed to showcase projects, start-ups, experiences, and receipts. Built for velocity and beautifully optimized for proof-of-work.

## 🚀 Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** Tailwind CSS & Framer Motion for buttery smooth animations
- **Content:** a typed local source of truth (`app/content/site.ts`)
- **Database:** Supabase (PostgreSQL), used by the optional admin CMS only
- **Deployment:** Vercel

## 📂 Project Structure
- **/app**: Core Next.js routing, layouts, and server actions.
- **/app/content/site.ts**: The single source of truth for every piece of public
  content: hero, current work, the FBLA feature, achievements, experience,
  projects, nav, and footer. Edit here to change the site.
- **/app/components**: Reusable UI blocks (`Hero`, `CurrentWork`, `FblaFeature`,
  `Achievements`, `Experience`, `Projects`, `MarqueeBanner`, `SmoothScroll`, etc.).
- **/app/admin**: Authenticated CMS over the legacy Supabase tables.
- **/supabase**: Supabase DB schemas, migrations, and local testing configurations.

## 🧱 Local Development

1. **Clone the repo:**
   ```bash
   git clone https://github.com/SaiAmartya/brag_site.git
   cd brag_site
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Optional: set up Supabase variables.**
   The public page needs none of these. They are only required for `/login` and
   `/admin`. Create a `.env.local` file with your keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_publishable_key
   ```

4. **Run the local server:**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to interact with the frontend.

## ✨ Features
- **Deterministic content:** The public page renders entirely from
  `app/content/site.ts`, with no network call on the render path, so it can never
  go blank or revert to stale rows.
- **CMS Backend:** Admin panel over the legacy Supabase tables, kept for editing
  history. It no longer drives the public page.
- **Micro-interactions:** Custom components with spring physics, parallax, and animated clouds via Framer Motion.
- **Accessible by default:** Skip link, semantic heading order, descriptive alt
  text, visible focus states, and a full `prefers-reduced-motion` path. Hero copy
  renders without JavaScript.
