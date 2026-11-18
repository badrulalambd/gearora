<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# gearora-client

Single Next.js 16 App Router app (no workspaces). Routes in `app/` (`(auth)` group = sign-in/up), feature components in `components/<feature>/`, auth UI in `components/auth/`, shadcn UI in `components/ui`, server/client helpers in `lib/`. Brand colors are hardcoded as arbitrary Tailwind values across the UI: primary `#F4B400`, background `#0B0B0B`.

## Verify before finishing

- `npm run lint` (flat config, `eslint.config.mjs`) → `npm run typecheck` (`tsc --noEmit`) → `npm run build`
- There is no test runner — don't add `npm test` or invent test commands.
- Format only files you touched: `npx prettier --write <path>`. The tree is not fully prettier-clean, so `npm run format` rewrites unrelated files.

## Auth (BetterAuth + MongoDB)

- Server config `lib/auth.ts` (MongoDB Atlas via `MONGODB_USER`/`MONGODB_PASSWORD`), client `lib/auth-client.ts`, catch-all handler `app/api/auth/[...all]/route.ts` — all already exist; don't recreate them.
- Client methods (`signIn.email`, `signUp.email`, `signIn.social`) return `{ data, error }` — check `error`, don't try/catch. The `minPasswordLength: 6` in `lib/auth.ts` is deliberate (BetterAuth defaults to 8 and would reject valid sign-ups).
- Google OAuth callback: `{BETTER_AUTH_URL}/api/auth/callback/google`. `.env*` is gitignored; Next loads `.env` natively.
- Toasts: `react-hot-toast`; the `<Toaster>` is already mounted in `app/layout.tsx` — don't add a second one.
- `Navbar` + `Footer` render once from `app/layout.tsx`, inside `ThemeProvider` — don't re-render them in pages. Anything using `next-themes` `useTheme` must render inside that provider; outside it, `setTheme` silently no-ops.

## Gotchas

- Path alias `@/*` maps to the repo root (`tsconfig.json`).
- Prettier: no semicolons, double quotes, LF; Tailwind class order is handled by `prettier-plugin-tailwindcss` — never hand-sort classes.
- eslint-config-next 16 enables React-compiler rules: calling `setState` synchronously in an effect body fails lint (`react-hooks/set-state-in-effect`). Close state from event handlers instead, or detect hydration with `useSyncExternalStore` (see `components/header/Navbar.tsx`).
- The shadcn `Button` is Base UI (`@base-ui/react`), not Radix: there is no `asChild` — render it as a link with `render={<Link href="…" />}` plus `nativeButton={false}`. It defaults to `type="button"`, so form submits need an explicit `type="submit"`.
- Tailwind v4 is CSS-first: no `tailwind.config` file; theme/variables live in `app/globals.css`, wired via `postcss.config.mjs`.
- Add UI with `npx shadcn@latest add <name>` — `components.json` sets style `base-nova`, `rsc: true`, lucide icons, and the `@/components` / `@/lib` / `@/hooks` aliases. The `shadcn` CLI is already a dependency.
- Components are Server Components by default; add `"use client"` only for state/effects/browser APIs (see `components/theme-provider.tsx`). `framer-motion` is the animation convention (`components/home/Banner.tsx`, `components/auth/AuthShell.tsx`).
- `CLAUDE.md` is just `@AGENTS.md` — this file is the single source of instructions.
