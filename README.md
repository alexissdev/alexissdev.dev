# alexissdev.dev

Personal portfolio website for **Alexis Costa** — Full Stack Developer from Buenos Aires, Argentina.

Built with Next.js 16, React 19, Tailwind CSS v4, and Framer Motion. Designed with an Islands Architecture pattern: fully static shell with isolated interactive client components hydrated only where needed.

---

## Features

- **Islands Architecture** — static RSC shell + `"use client"` islands for interactive zones only
- **GitHub API integration** — live repos fetched and filtered from the GitHub REST & GraphQL APIs
- **GitHub Activity Graph** — yearly contribution heatmap with hover tooltips
- **Typewriter effect** — cycling role titles in the hero
- **Dynamic Open Graph images** — auto-generated per page and per project via `next/og`
- **Contact form** — powered by Resend, sends styled HTML emails
- **Custom cursor** — dot + spring-lagged ring, desktop only
- **Scroll progress bar** — gradient top bar tracking page scroll
- **Page transitions** — fade + slide via Framer Motion `template.tsx`
- **Skeleton loaders** — shimmer placeholders while project data loads
- **Sitemap + robots.txt** — auto-generated, SEO-ready
- **Back to top** button, scroll-aware navigation pill, mobile drawer

---

## Pages

| Route | Description |
|---|---|
| `/` | Hero · Stats · About · Now · Skills · Timeline · Activity Graph · Featured Projects |
| `/projects` | All repos with search and language filter |
| `/projects/[slug]` | Project detail with README rendered as markdown |
| `/contact` | Contact info + form with animated success modal |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Animations | Framer Motion v12 |
| Icons | react-icons v5 |
| Email | Resend |
| Markdown | react-markdown |
| Font | Inter (Google Fonts) |
| Language | TypeScript |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — nav, footer, cursor, progress bar
│   ├── template.tsx            # Page transition wrapper
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles, Tailwind theme, animations
│   ├── opengraph-image.tsx     # Dynamic OG image for home
│   ├── sitemap.ts              # Auto-generated sitemap
│   ├── robots.ts               # robots.txt
│   ├── api/
│   │   └── contact/route.ts    # Contact form POST handler (Resend)
│   ├── contact/
│   │   └── page.tsx
│   └── projects/
│       ├── page.tsx
│       ├── ProjectsClient.tsx  # Search + filter island
│       ├── loading.tsx         # Skeleton loading state
│       └── [slug]/
│           ├── page.tsx
│           └── opengraph-image.tsx  # Dynamic OG per project
├── components/
│   ├── islands/
│   │   ├── NavigationIsland.tsx     # Scroll-aware pill nav + mobile drawer
│   │   ├── HeroArrowIsland.tsx      # Bouncing scroll arrow
│   │   ├── TypewriterIsland.tsx     # Cycling role title with cursor
│   │   ├── AboutMeIsland.tsx        # Animated about section
│   │   ├── SkillsIsland.tsx         # Tech badges with real icons
│   │   ├── ActivityGraphIsland.tsx  # GitHub contribution heatmap
│   │   ├── ProjectCardIsland.tsx    # Animated project card
│   │   ├── ContactFormIsland.tsx    # Form with success modal
│   │   ├── FooterIsland.tsx         # Staggered footer
│   │   ├── CursorIsland.tsx         # Custom cursor
│   │   └── ScrollProgressIsland.tsx # Top progress bar
│   ├── TimelineSection.tsx     # Experience timeline
│   ├── SkeletonCard.tsx        # Shimmer skeleton
│   └── BackToTop.tsx           # Scroll-to-top button
├── lib/
│   └── github.ts               # GitHub REST + GraphQL API helpers
└── types/
    └── index.ts                # Repository type definition
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/alexissdev/alexissdev.dev
cd alexissdev.dev
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root:

```env
# Resend — email API for contact form
# Get your key at: resend.com → API Keys
RESEND_API_KEY=re_xxxxxxxxxxxx

# GitHub — raises rate limit from 60 to 5000 req/hour
# Also required for the GraphQL contribution graph
# Get at: github.com → Settings → Developer settings → Personal access tokens
# Required scope: read:user (classic) or Public Repositories read (fine-grained)
GITHUB_ACCESS_TOKEN=ghp_xxxxxxxxxxxx
```

### 3. Add public assets

Place these files in `/public/`:

```
public/
├── me.jpg           # Profile photo (256×256 minimum)
├── logo.png         # Nav logo (83×60px)
├── cv.pdf           # Downloadable resume
├── sounds/
│   └── notify.wav   # (optional — removed from UI but path reserved)
└── icon/
    ├── favicon.ico
    └── site.webmanifest
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Featured Projects

The following repos are marked as featured and appear highlighted across the site:

- `alexissdev.dev`
- `hermes`
- `caduceus`
- `events`
- `braian-contruciones`
- `lightweight-storage`

To change them, edit the `projectMeta` map in `src/lib/github.ts`.

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | For contact form | API key from resend.com |
| `GITHUB_ACCESS_TOKEN` | For activity graph | Personal access token from GitHub |

Both variables are optional at build time — the site builds and runs without them, but the contact form won't send emails and the contribution graph won't appear.

---

## Deployment

The project is optimized for **Vercel**:

```bash
npm run build
```

Set the environment variables in your Vercel project settings under **Settings → Environment Variables**.

The home and projects pages use ISR with `revalidate: 3600` (1 hour) so GitHub data stays fresh without rebuilding.

---

## License!

MIT — feel free to use this as inspiration for your own portfolio.
