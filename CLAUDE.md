# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Dami's Burguer — the burger restaurant's site, built with **React 19 + TypeScript + Vite**, routed with React Router (BrowserRouter). It was migrated on 2026-11-14 from a static multi-page HTML/CSS/TS site; the markup, class names, ids and CSS were kept identical, so `src/styles/styles.css` is the same stylesheet as before.

## Commands

- `npm run dev` — Vite dev server.
- `npm run build` — `tsc --noEmit` (type-check) then `vite build` into `dist/`.
- `npm run preview` — serve the built `dist/`.
- No lint or test runner configured.

## Deploy

`netlify.toml` builds with `npm run build` and publishes `dist/`. `public/_redirects` sends the old `*.html` URLs to the new routes (301) and falls back every other path to `index.html` so client-side routes work on reload. `public/robots.txt` is copied as-is.

## Architecture

Two Vite entries (see `vite.config.ts`):
- `index.html` → `src/main.tsx` — the public site (SPA).
- `playground.html` → `src/playground/main.tsx` — the backoffice component library. Kept as a separate entry on purpose so its CSS (`src/playground/css/*`, aggregated by `playground.css`) never mixes with the site's `styles.css`; both define overlapping custom properties.

Both HTML entries keep the analytics snippets (gtag, Mixpanel, Contentsquare) in `<head>`. **Never write the literal text `</head>` inside an HTML comment** there: Vite injects the bundle `<script>` before the first `</head>` it finds and it ended up inside a comment once.

**Site (`src/`):**
- `App.tsx` — routes: `/`, `/menu`, `/nosotros`, `/login`, `/registro`; unknown paths redirect to `/`.
- `components/Layout.tsx` — skip link, `Header`, `<Outlet />`, `Footer`. Also scrolls to `#hash` after navigation (e.g. `/#contacto`) or to the top, and runs `useAnimateOnScroll` (IntersectionObserver adding `.is-visible` to `.animate-on-scroll`) on every route change.
- `components/Header.tsx` — logo, `ThemeToggle`, mobile `#btn-menu` toggle (Escape closes and refocuses it; clicking a link closes it), nav. Page links use `NavLink` (sets `aria-current="page"`, which the CSS styles); home-section links (`/#testimonios`, `/#contacto`) use `Link`. The sliding `.nav-pill` is driven by `hooks/useNavPill.ts` (measures with `getBoundingClientRect`, re-measures on resize, fonts ready, route change and menu open).
- `components/ThemeToggle.tsx` — flips `data-theme` on `<html>` and stores it in `localStorage('theme')`. The inline script in `index.html` sets the initial theme before first paint.
- `components/Seo.tsx` — per-page `<title>`, description, OG/Twitter tags (React 19 hoists them into `<head>`).
- `data/menu.ts` — the whole menu (3 categories, 12 items) plus `formatPrice`/`priceLabel`. Cards are generated from it; the home page's featured cards reuse items by id.
- `components/MenuCard.tsx` — a product card; with `onAdd` it shows the quantity stepper (1–20, clamped on blur) and "Agregar al pedido" ("Agregado ✓" for 1.2 s).
- `hooks/useCart.ts` + `components/CartSummary.tsx` — simulated order: cart state in React, persisted to `localStorage('damisburguer_carrito')`. No backend (see `PLAN.md`).
- Forms: `ContactForm` (home), `pages/LoginPage`, `pages/RegistroPage`. Controlled inputs; validation runs on submit with rules in `lib/validation.ts` (email, password strength, age 13–120). `FormField` renders label + input + optional hint + `.field-error` span wired with `aria-describedby`/`aria-invalid`; `FormFeedback` is the summary below the form; `useFieldRefs` focuses the first invalid field. Inputs keep `required`, so the browser's native check runs before ours.

**Gotcha:** the `hidden` attribute doesn't hide elements whose CSS sets `display` (e.g. `.btn`). Render conditionally instead (`{cond && <button/>}`), as `CartSummary` does.

**CSS:** `src/styles/styles.css` is mobile-first: unqualified rules are mobile, a single `@media (min-width: 769px)` block near the end holds desktop overrides, no `!important`. Dark mode is a `[data-theme="dark"]` block after `:root`.

**Images:** all photos are Unsplash URLs; verify a new photo id returns 200 before using it (ids can disappear).

**Playground (`src/playground/`):** `Playground.tsx` renders the six sections (Alerts, Botones, Checkboxes/Radios, Dialogs, Menús, Toasts) with their keyboard/focus docs. `AccountMenu.tsx` is the dropdown (one open at a time, Escape/click-outside close). `useToasts.ts` caps visible toasts at 3 and removes new ones after 4 s. The dialog uses the native `<dialog>` with `showModal()` and returns focus to its trigger on close. `variables.css` holds the backoffice design tokens; `alerts.css` is hand-authored, leave it alone.
