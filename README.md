# Daniel — Film Director Portfolio

A cinematic, dark, minimalist portfolio for film director Daniel. Built with React + TypeScript + Framer Motion.

## Tech Stack

- **React 18** + **TypeScript**
- **Framer Motion** — parallax, scroll-in animations, page transitions
- **CSS Modules** — scoped styles with CSS custom properties
- **Vite** — dev server & build
- **Jest + React Testing Library** — unit & integration tests
- **Playwright** — e2e tests

## Getting Started

```bash
# Install dependencies
npm install

# Install Playwright browsers (first time only)
npx playwright install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm test` | Run unit tests |
| `npm run test:watch` | Unit tests in watch mode |
| `npm run test:e2e` | Run Playwright e2e tests |

## Project Structure

```
src/
├── components/
│   ├── Nav/          # Sticky nav, scroll spy, mobile menu, theme toggle
│   ├── Hero/         # Full-height hero with parallax panels
│   ├── Showreel/     # Ticker strip + video modal
│   ├── Awards/       # Festival recognition strip
│   ├── About/        # Bio, portrait, services, press kit
│   ├── Projects/     # 6-card grid with hover overlays
│   ├── Gallery/      # Filterable photo + video grid
│   ├── Contact/      # Form with validation + success state
│   └── Footer/       # Nav links, social links, copyright
├── context/
│   └── ThemeContext.tsx   # Dark/light theme with localStorage
├── hooks/
│   ├── animations.ts      # Shared Framer Motion variants
│   ├── useScrollSpy.ts    # IntersectionObserver for active nav
│   └── useReducedMotion.ts
├── data/
│   └── index.ts      # Projects, gallery items, awards, nav links
├── types/
│   └── index.ts
└── styles/
    └── globals.css   # CSS custom properties, reset, utilities
tests/
├── unit/             # Jest + RTL component tests
├── e2e/              # Playwright end-to-end tests
└── setup.ts          # Jest setup, mocks for FM + IntersectionObserver
```

## Animations

All Framer Motion animations respect `prefers-reduced-motion`. When reduced motion is preferred, animations are skipped.

| Element | Animation |
|---|---|
| Hero text | Staggered fade + slide up on mount |
| Hero images | `useScroll` + `useTransform` parallax (3 speeds) |
| Nav | Slide down on mount, active underline `layoutId` |
| Section headings | Fade + slide up on `whileInView` |
| Project cards | `scale: 0.92→1` zoom on `whileInView`, `once: true` |
| Gallery items | Staggered zoom on `whileInView` |
| About section | Slide in from left on `whileInView` |
| Contact | Staggered fade up on `whileInView` |

## Accessibility

- Skip to main content link
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`, `<address>`
- All images have meaningful `alt` text
- All form inputs have associated `<label>` elements
- `aria-required`, `aria-invalid`, `aria-describedby` on form fields
- Error messages announced with `role="alert"`
- Form success state announced with `role="status"` and `aria-live="polite"`
- Filter buttons use `aria-pressed`
- Mobile menu uses `role="dialog"` + `aria-modal`
- All interactive elements keyboard-navigable
- Visible focus rings via `:focus-visible`
- `prefers-reduced-motion` support

## Theme

Dark (default) and light themes controlled by CSS custom properties on `[data-theme]`. Theme persists in `localStorage`.

```css
/* Switch theme */
document.documentElement.setAttribute('data-theme', 'light')
```

## Replacing Placeholder Content

1. **Director name** — search replace `Daniel` throughout
2. **Images** — replace `src` URLs in `src/data/index.ts`
3. **Showreel** — add Vimeo/YouTube embed in `Showreel.tsx` modal
4. **Press kit** — add `public/press-kit.pdf`
5. **Contact email** — update `alexandre@noir.studio` in `Contact.tsx`
6. **Social links** — update `href` values in `Contact.tsx` and `Footer.tsx`
