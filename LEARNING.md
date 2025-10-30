# LEARNING: 4‑Week Portfolio Plan (daily checklist)

Goal: Build a polished Next.js portfolio while learning fundamentals. Follow small daily tasks + longer weekend sessions.

## 🌅 Morning Learning Routine (Weekdays — 1.5–2 hrs)
- [ ] **10m Warm-up & Recall**
  - Review yesterday's key concepts using active recall
  - Test yourself on important code snippets
  - Set specific goals for today's session

- [ ] **45–75m Deep Work Block**
  - Focus on one concept or small project
  - Use Pomodoro technique (25/5)
  - Code along with tutorials or build small exercises

- [ ] **15m Portfolio Integration**
  - Apply one new concept to your portfolio
  - Write a brief note explaining your implementation
  - Plan tomorrow's learning objectives

- [ ] **5m Reflection & Commit**
  - Commit your changes with a clear message
  - Jot down one key takeaway
  - Note any questions for future research

## 🏆 Weekend Learning Sprint (3–5 hrs)
- [ ] **30m Weekly Review**
  - Consolidate notes from the week
  - Create a "cheat sheet" of key concepts
  - Identify knowledge gaps to address

- [ ] **2–2.5h Project Work**
  - Work on a larger portfolio feature
  - Implement something challenging
  - Focus on quality over quantity

- [ ] **1h Polish & Deploy**
  - Test your work thoroughly
  - Document your process
  - Deploy updates to your live portfolio
  - Share your progress with others
    
---

## Week 1 — HTML & CSS
- [ ] Day 1: semantic HTML, page structure (header, main, footer)
- [ ] Day 2: responsive layout basics (meta viewport, container)
- [ ] Day 3: Flexbox — build header/nav
- [ ] Day 4: Grid — build projects grid
- [ ] Day 5: Responsive breakpoints + mobile polish
- [ ] Weekend: Deploy static homepage (Vercel) and write notes

## Week 2 — JavaScript basics
- [ ] Day 1: DOM selection & events (nav toggle)
- [ ] Day 2: Forms & validation (basic contact form)
- [ ] Day 3: fetch API + async/await — load projects JSON
- [ ] Day 4: simple stateful UI (modal or tabs) in vanilla JS
- [ ] Day 5: refactor one interaction for reusability
- [ ] Weekend: integrate JS-driven project list into homepage

## Week 3 — React fundamentals
- [ ] Day 1: create-react-component, props, JSX
- [ ] Day 2: useState, useEffect basics
- [ ] Day 3: lift state, component composition (Gallery + Card)
- [ ] Day 4: routing basics (Next.js pages or app router overview)
- [ ] Day 5: convert one page to React components
- [ ] Weekend: deploy React-converted page, test on device

## Week 4 — Next.js + TypeScript intro
- [ ] Day 1: Next.js routing and folder structure (pages or app)
- [ ] Day 2: static props / server-side rendering basics
- [ ] Day 3: add TypeScript to project, rename files and run `npm run dev`
- [ ] Day 4: next/image, SEO meta tags, basic accessibility checks
- [ ] Day 5: add dark mode (next-themes) or Tailwind starter
- [ ] Weekend: final polish, performance check, deploy to Vercel

---

## Upcoming setup steps (what to do next in this repo)
1. Verify `frontend` runs locally: `npm install` and `npm run dev` inside `frontend/`.
2. Add or confirm a root `.gitignore` and keep `frontend/.gitignore` for frontend-specific ignores.
3. Install TypeScript dev dependencies (if not present): `npm i -D typescript @types/react @types/node` and run dev to let Next generate `tsconfig` entries.
4. (Optional) Install Tailwind: `npm i -D tailwindcss postcss autoprefixer` then `npx tailwindcss init -p` and configure `globals.css`.
5. Add lightweight UI/UX libraries as needed: `framer-motion`, `react-icons`, `next-themes`.
6. Add 3D/audio if desired (dynamic import): `three`, `@react-three/fiber`, `@react-three/drei`, `howler`.
7. Keep heavy client-only features behind dynamic imports to keep initial SSR fast.
8. Deploy to Vercel and test on mobile; set up a basic CI if desired.

## Recommendations
- Framework: Keep Next.js (App router) + TypeScript for a modern portfolio.
- Styling: Tailwind CSS for fast iteration or CSS Modules for scoped styles.
- Performance: Use `next/image`, optimize images, lazy-load heavy components.
- Accessibility: Use semantic HTML, keyboard navigation, and Lighthouse checks.
- Git: Commit small, descriptive changes; use feature branches and push often.
- Learning: Build by doing—small features, ship early, iterate.

## Short-term priorities (today / this week)
- Commit `LEARNING.md` to the repo root.
- Confirm `frontend` dev server runs and open the site.
- Add `.gitignore` at repo root (if missing) and untrack accidental `node_modules`.


If you want, I can also create `TUTOR.md` with the tutor rules and `001-lesson-...` starter files. Tell me which file to create next.