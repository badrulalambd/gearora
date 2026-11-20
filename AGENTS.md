<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# gearora-client

Single Next.js 16 App Router app (no workspaces). Routes in `app/` (`(auth)` group = sign-in/up, `dashboard/{customer,owner,admin}` = role-based dashboards), feature components in `components/<feature>/`, auth UI in `components/auth/`, shadcn UI in `components/ui`, fetch helpers in `lib/api/` + `lib/action/`, shared types in `type/type.ts`. Brand colors are hardcoded as arbitrary Tailwind values across the UI: primary `#F4B400`, background `#0B0B0B`.

## Verify before finishing

- `npm run lint` (flat config, `eslint.config.mjs`) → `npm run typecheck` (`tsc --noEmit`) → `npm run build`
- There is no test runner — don't add `npm test` or invent test commands.
- Format only files you touched: `npx prettier --write <path>`. The tree is not fully prettier-clean (32 files fail `--check`), so `npm run format` rewrites unrelated files.

## Backend is a separate repo — not Next.js API routes

- Equipment CRUD does **not** go through Next API routes or server actions. `lib/api/*` and `lib/action/*` fetch `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:5000`), served by the sibling repo `../gearora-server` (Express + the same MongoDB Atlas cluster; run `node index.js`, it needs its own `.env`). Start it locally or equipment pages fail.
- Despite the folder name, `lib/action/*` are plain `fetch` wrappers, **not** React server actions.
- The only Next API route is `app/api/auth/[...all]/route.ts` (BetterAuth).
- Image uploads go to imgbb via `NEXT_PUBLIC_IMGBB_API_KEY` (see `add-equipment/page.tsx`), not to the Express server.
- Env vars live in `.env` (gitignored, Next loads it natively): `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_USER`/`MONGODB_PASSWORD`, `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_IMGBB_API_KEY`.

## Auth (BetterAuth + MongoDB)

- Server config `lib/auth.ts`, client `lib/auth-client.ts` — both already exist; don't recreate them. Google OAuth callback: `{BETTER_AUTH_URL}/api/auth/callback/google`.
- Client methods (`signIn.email`, `signUp.email`, `signIn.social`) return `{ data, error }` — check `error`, don't try/catch. The `minPasswordLength: 6` in `lib/auth.ts` is deliberate (BetterAuth defaults to 8 and would reject valid sign-ups).
- **No `middleware.ts`** — route protection is ad hoc per page: server pages call `auth.api.getSession({ headers: await headers() })` and render a fallback panel; client pages use `useSession` from `lib/auth-client`. Dashboard root pages (`/dashboard/owner` etc.) are currently unguarded — add a check if you're securing one.
- Roles: `user.role` = `customer` | `owner` | `admin`, default `customer` (`lib/auth.ts` `additionalFields`), driving `/dashboard/<role>` routes and `components/dashboard/DashboardSidebar.tsx`. ⚠️ The type-inference plugin in `lib/auth-client.ts` still lists stale roles from another project (`seeker`/`recruiter`, default `seeker`) — trust `lib/auth.ts` for actual role values; keep the two in sync if you touch either.
- Toasts: `react-hot-toast`; the `<Toaster>` is already mounted in `app/layout.tsx` — don't add a second one.
- `Navbar` + `Footer` render once from `app/layout.tsx`, inside `ThemeProvider` — don't re-render them in pages. Anything using `next-themes` `useTheme` must render inside that provider; outside it, `setTheme` silently no-ops.

## Gotchas

- Path alias `@/*` maps to the repo root (`tsconfig.json`).
- Prettier: no semicolons, double quotes, LF; Tailwind class order is handled by `prettier-plugin-tailwindcss` (`tailwindStylesheet: app/globals.css`) — never hand-sort classes.
- eslint-config-next 16 enables React-compiler rules: calling `setState` synchronously in an effect body fails lint (`react-hooks/set-state-in-effect`). Close state from event handlers instead, or detect hydration with `useSyncExternalStore` (see `components/header/Navbar.tsx`).
- The shadcn `Button` is Base UI (`@base-ui/react`), not Radix: there is no `asChild` — render it as a link with `render={<Link href="…" />}` plus `nativeButton={false}`. It defaults to `type="button"`, so form submits need an explicit `type="submit"`.
- Tailwind v4 is CSS-first: no `tailwind.config` file; theme/variables live in `app/globals.css`, wired via `postcss.config.mjs`.
- Add UI with `npx shadcn@latest add <name>` — `components.json` sets style `base-nova`, `rsc: true`, lucide icons, and the `@/components` / `@/lib` / `@/hooks` aliases. The `shadcn` CLI is already a dependency.
- Components are Server Components by default; add `"use client"` only for state/effects/browser APIs (see `components/theme-provider.tsx`). `framer-motion` is the animation convention (`components/home/Banner.tsx`, `components/auth/AuthShell.tsx`).
- `import { cn } from "cn"` (the `cn` package); `lib/utils.ts` re-exports it for the shadcn `@/lib/utils` alias.
- `CLAUDE.md` is just `@AGENTS.md` — this file is the single source of instructions.
