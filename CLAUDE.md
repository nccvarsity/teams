# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page, scroll-driven marketing site for **V Teams** (NCC Varsity serving-team recruitment). It introduces the serving teams and links visitors to a sign-up form. Built as an immersive scrollytelling experience with 3D models.

It is a **statically-exported** Next.js App Router site (`output: 'export'`) deployed to **GitHub Pages** — there is no server, no API routes, and no runtime image optimization.

## Toolchain & commands

- **Package manager: Yarn 1 (classic), run via Corepack.** `yarn` is not installed globally; use `corepack enable` once (or prefix commands with `corepack yarn@1.22.22 ...`). `package.json` pins `packageManager: yarn@1.22.22`.
- **Node ≥ 22** (`.nvmrc` → 24; `engines.node` `>=22.0.0`). Next 16 only needs ≥ 20.9, but `camera-controls` (transitive via `@react-three/drei`) declares `node >=22.0.0`, which is the real floor.
- **`NEXT_PUBLIC_SITE_URL` is required** — `src/lib/constants.ts` throws at import time if it is unset. For local work create a `.env` with `NEXT_PUBLIC_SITE_URL=http://localhost:3000` (see `.env.example`). `.env.production` holds the deployed URL.

| Task | Command |
|------|---------|
| Dev server (Turbopack, :3000) | `yarn dev` |
| Production build + static export → `out/` | `yarn build` |
| Type-check only | `yarn tsc` |
| Lint (ESLint + Stylelint) | `yarn lint` |
| Sitemap (runs automatically after `build`) | `yarn postbuild` |

There are **no tests** in this repo. Verify changes with `yarn tsc` and `yarn build` (the build also type-checks).

## Version-pinning constraints (do not naively change)

These version choices are deliberate. Keep them unless you verify the blockers are resolved:

- **TypeScript is on 5.x, not 7.x.** `@typescript-eslint` requires `typescript <6.1.0`; TS 7 (the native compiler) breaks the lint/type tooling.
- **ESLint is on 9.x, not 10.x.** `eslint-plugin-react` / `eslint-plugin-import` still call `context.getFilename()`, removed in ESLint 10.
- **`resolutions` forces `@radix-ui/react-slot`/`react-portal`/`react-compose-refs` up to React-19-compatible versions.** `@bsmnt/scrollytelling` declares these as `>=1` and Yarn would otherwise resolve old (React-18-only) copies that read the removed `element.ref`, which breaks GSAP ref-forwarding and causes hydration mismatches on React 19. Do not remove the `resolutions` block while on React 19.

## Architecture

- **App Router, single page.** `src/app/layout.tsx` (fonts, metadata, mounts `AppHooks`) → `src/app/page.tsx` composes the ordered sections in `src/app/sections/*` (`welcome`, `marquee`, `teams-tileboard`, `highlight`, `outro`). No `pages/`, no `_app`/`_document`.
- **Client boundaries.** `src/app/app-hooks.tsx` (`'use client'`) mounts client-side app hooks (fonts-loaded, tab detection, dev inspector) incl. Google Analytics (`src/lib/ga.tsx`, wired via `usePathname` from `next/navigation`). `src/app/providers/screen-size.tsx` gates rendering during resize.
- **3D (react-three-fiber + drei).** Section components render a `<Canvas>` with `*-model.tsx` components. GLB models live in `public/models/` and are loaded **by URL** via `useGLTF(...)` — never imported into JS. Model URLs are prefixed with the base path at runtime via `` (isProd ? '/teams' : '') + '/models/...' `` (`isProd` from `src/lib/constants.ts`).
- **Scrollytelling.** `@bsmnt/scrollytelling`; wrapper at `src/lib/scrollytelling-client.tsx`. GSAP for animation.
- **State.** `zustand` store at `src/context/use-app-store.ts` (tracks `fontsLoaded`).
- **Sign-up links.** The `teams-tileboard` section renders team tiles via `src/components/tileboard/`; each tile links to the external Google sign-up form built by `src/lib/utils/signuplink.ts` (`createLinkFromTeamClusterName`, keyed off the `Teams` enum).
- **Styling.** SCSS Modules (`*.module.scss`) + global styles in `src/css/`; `clsx` for conditional classes. Shared SCSS functions/variables live in `src/css/helpers.scss` and are pulled in with `@use '~/css/helpers' as *;` (the `~` alias resolves to `src/`). There is no Tailwind and no CSS-in-JS.

## Static-export & deploy constraints

- `next.config.js`: `output: 'export'`, `images.unoptimized: true`. When running in GitHub Actions, `basePath`/`assetPrefix` are derived from `GITHUB_REPOSITORY` (the `/teams` prefix) — this is why model/asset paths are base-path-aware.
- Deploy is `.github/workflows/nextjs.yml`: on push to `development` it runs `yarn install` + `yarn next build` and publishes `out/` to GitHub Pages. CI does **not** run lint or type-check, so run them locally before pushing.
- ESLint uses **flat config** (`eslint.config.mjs`, via `FlatCompat`); `next lint` was removed in Next 16, so the `lint` script calls `eslint` directly. Prettier/Stylelint configs are inline in `package.json`.

## Formatting & lint state

- The codebase is Prettier-formatted (Prettier 3, config inline in `package.json`; `.prettierignore` excludes build output and the vendored `src/css/reset.css`).
- `yarn lint` passes with **0 errors** and a handful of intentional non-failing warnings: `react-hooks/exhaustive-deps` (do not "fix" blindly — verify each dependency), `import/no-named-as-default` (cosmetic), and one dev-only `no-console`.
- `src/css/reset.css` is vendored normalize.css — leave it unformatted/unlinted (it is excluded from both Prettier and Stylelint).
