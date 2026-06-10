# 🌟 Bragsite

A sleek, animated, personal portfolio and brag document, designed to showcase projects, start-ups, experiences, and receipts. Built for velocity and beautifully optimized for proof-of-work.

## 🚀 Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** Tailwind CSS & Framer Motion for buttery smooth animations
- **Database:** Supabase (PostgreSQL) for dynamic content injection
- **Deployment:** Vercel

## 📂 Project Structure
- **/app**: Core Next.js routing, layouts, and server actions.
- **/app/components**: Reusable UI blocks (`Hero`, `Ventures`, `Projects`, `MarqueeBanner`, `SmoothScroll`, etc.).
- **/app/admin**: Authenticated CMS to manage portfolio entries directly on the web.
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

3. **Set up Supabase variables:**
   Create a `.env.local` file with your keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the local server:**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to interact with the frontend.

## ✨ Features
- **Dynamic Portfolios:** Data automatically loads from the Supabase tables (`ventures`, `experiences`, `projects`, `achievements`).
- **CMS Backend:** Simple admin panel to seamlessly add, edit, and organize content.
- **Micro-interactions:** Custom components with spring physics, parallax, and animated clouds via Framer Motion.
