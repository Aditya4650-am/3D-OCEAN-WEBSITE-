# OCEAN INFOTECH — Immersive Ocean Exploration Website
# Developed by AM TECH.
An immersive, scroll-driven single-page experience that takes visitors on a vertical
expedition from the sunlit surface of the ocean down to the abyss — featuring a
scroll-scrubbed hero video dive, smooth inertial scrolling, a species archive with
profile modals, ocean-zone data, coral-reef field notes and a full-bleed illustrated
coral-reef backdrop.

> **Explore. Understand. Protect.**

---

## ✨ Features

- **Scroll-scrubbed hero dive** — a 720vh sticky hero whose underwater video is
  frame-scrubbed by scroll position, with a live dive-progress indicator (`01 / 08`).
- **Smooth inertial scrolling** — [Lenis](https://github.com/darkroomengineering/lenis)
  smooth wheel scrolling on desktop, with anchor navigation riding the same easing so
  menu jumps feel like one continuous dive. Honors `prefers-reduced-motion`.
- **Premium scroll motion (all sections except hero)** — scroll-linked parallax drift
  inside every framed photo, independent slow drift on the abyss particle layers,
  staggered blur-in reveals across grids (zones, species, stats, reef notes) and
  eased counters, all built with Framer Motion `useScroll`/`useTransform`.
- **Coral-reef backdrop system** — every content section (hero excluded) renders the
  supplied artwork `public/coral-reef-background.jpg` on a dedicated layer at exactly
  **50% opacity** over a deep-ocean base, sampled like a dive log: each section frames
  the depth that matches its story (sun rays → open water & fish → coral garden),
  finished with a faint cinematic veil for seamless seams and crisp typography.
- **Species archive** — four marine-life cards with hover reveals and a full
  **species profile modal** (habitat / size / diet / field fact).
- **Ocean zones, giants, reefs, abyss & conservation** — data-rich sections with
  glassmorphism dossiers, counters and reveal-on-scroll motion (Framer Motion).
- **Fully responsive** — dedicated mobile layouts, mobile menu, and reduced-motion
  fallbacks throughout.

## 🛠 Tech Stack

| Layer      | Technology                                     |
| ---------- | ---------------------------------------------- |
| Framework  | [Next.js 15](https://nextjs.org) (App Router)  |
| UI         | React 19, TypeScript                           |
| Motion     | Framer Motion, Lenis (smooth scroll)           |
| Styling    | Tailwind CSS + hand-tuned global CSS           |
| Icons      | lucide-react                                   |
| Media      | Scroll-scrubbed MP4 hero, illustrated backdrop |

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
# → http://localhost:3000

# 3. Production build & serve
npm run build
npm run start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout, metadata
│   ├── page.tsx        # The entire single-page experience (all sections)
│   └── globals.css     # Design system, section backdrops, responsive rules
├── public/
│   ├── coral-reef-background.jpg  # Site-wide illustrated backdrop (50% opacity)
│   ├── turtle-scroll.mp4          # Scroll-scrubbed hero dive video
│   ├── turtle.mp4                 # Hero loop video
│   └── images/                    # Species & section photography
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## 🎨 Backdrop Artwork

The coral-reef illustration is applied to **all sections except the hero** via a
`::before` layer at `opacity: .5`, with per-section `background-position` framing:

| Section       | Artwork depth framed        |
| ------------- | --------------------------- |
| The Ocean     | Sunlit surface & rays       |
| Ocean Zones   | Upper water column          |
| Marine Life   | Fish mid-water              |
| Dossier       | Open water                  |
| Giants        | Deep open water             |
| Coral Reefs   | Coral garden                |
| Facts         | Reef edge                   |
| Abyss         | Mid-water, heavier veil     |
| Conservation  | Full coral floor            |

To swap the artwork, replace `public/coral-reef-background.jpg` (portrait
orientation recommended) — no code changes required.

## 📄 Content

All marine data (species profiles, zone depths, statistics) is editorial content
defined in `app/page.tsx` and is intended for educational storytelling.

## © License

© 2026 Ocean Infotech. Explore. Understand. Protect.
