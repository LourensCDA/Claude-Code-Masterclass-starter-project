# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Pocket Heist — a "tiny office heist" planning app, used as the starter project for the Claude Code Masterclass. Several pages are still stubs (e.g. `app/(dashboard)/heists/*`); expect to build out features rather than modify existing logic.

## Commands

- `npm run dev` — start the dev server at http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config, Next core-web-vitals + TypeScript rules)
- `npm test` — run the Vitest suite (watch mode by default)
- `npm test -- run` — single non-watch run
- `npm test -- tests/components/Navbar.test.tsx` — run one test file

## Architecture

Next.js 16 (App Router) + React 19 + TypeScript (strict) + Tailwind CSS v4.

**Route groups drive layout.** The `app/` directory splits routes into two groups with different chrome:

- `app/(public)/` — unauthenticated pages (`/`, `/login`, `/signup`, `/preview`). Bare `<main className="public">` layout, no nav.
- `app/(dashboard)/` — the authenticated app (`/heists`, `/heists/create`, `/heists/[id]`). Layout renders the shared `<Navbar />`.

The root `/` page (`app/(public)/page.tsx`) is a splash page whose intended job is to redirect: logged-in users → `/heists`, otherwise → `/login`. `app/(public)/preview/page.tsx` is a scratch page for previewing newly built UI components. `/login` and `/signup` render a shared `AuthForm` component (see below); there is no real auth/session backend yet — submitting either form just `console.log`s the entered values.

**Components** live in `components/<Name>/` as a folder with three files: `<Name>.tsx`, `<Name>.module.css`, and an `index.ts` barrel that re-exports the default. Import via the barrel (`@/components/Navbar`), not the file. `@/*` is the path alias for the repo root (see `tsconfig.json`). Components are plain function components with local `useState`, no class components and no shared form/validation libraries — `lucide-react` is the icon library in use (e.g. `Clock8` in `Navbar`, `Eye`/`EyeOff` in `AuthForm`).

**Styling is Tailwind v4, CSS-first.** There is no `tailwind.config.js`. The theme (colors, fonts) is defined with `@theme` in `app/globals.css` using CSS variables like `--color-primary`. Use those tokens via utilities (`bg-light`, `text-body`, `text-heading`, etc.). CSS Modules that need `@apply` must start with `@reference "../../app/globals.css";` to pull in the theme — see `components/Navbar/Navbar.module.css`. Reuse existing global classes where they fit (e.g. `.btn`, `.page-content`, `.form-title`) instead of redefining equivalent styles in a module.

**Tests** live under `tests/`, mirroring the source tree (e.g. `tests/components/Navbar.test.tsx`). Vitest runs in a `jsdom` environment with globals enabled (no need to import `describe`/`it`/`expect`, though existing tests do). `@testing-library/jest-dom` matchers are loaded via `vitest.setup.ts`; the `@/*` alias works in tests through `vite-tsconfig-paths`. `@testing-library/user-event` is available for simulating typing/clicking in interactive components (e.g. `tests/components/AuthForm.test.tsx`).

## Checking Documentation

- **important** When implementing any lib/gramework-specific features, ALWAYS check the appropriate lib/framework documentation using the Context7 MCP server before writing any code.
