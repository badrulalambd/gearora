<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# gearora-client

Single Next.js 16 App Router app (no workspaces). Static site: routes in `app/` (incl. `(auth)` group for sign-in/up), feature components in `components/<feature>/`, shadcn UI in `components/ui`, helpers in `lib/`. No API routes, env vars, or data fetching exist yet — pages are mostly placeholders.

## Verify before finishing

- `npm run lint` (flat config, `eslint.config.mjs`) → `npm run typecheck` (`tsc --noEmit`)
- `npm run build` for full Next.js validation; `npm run dev` to run locally
- There is no test runner — don't add `npm test` or invent test commands.

## Gotchas

- Path alias `@/*` maps to the repo root (`tsconfig.json`).
- Prettier is strict: no semicolons, double quotes, LF, class order handled by `prettier-plugin-tailwindcss`. Never hand-sort Tailwind classes — run `npm run format` (only rewrites `**/*.{ts,tsx}`).
- Tailwind v4 is CSS-first: no `tailwind.config` file; theme/variables live in `app/globals.css` (`@theme`, shadcn CSS vars), wired via `postcss.config.mjs`.
- Add UI with `npx shadcn@latest add <name>` — `components.json` sets style `base-nova`, `rsc: true`, lucide icons, and the `@/components` / `@/lib` / `@/hooks` aliases. The `shadcn` CLI is already a dependency.
- Components are Server Components by default; only add `"use client"` when state/effects/browser APIs are needed (see `components/theme-provider.tsx`).
- `CLAUDE.md` is just `@AGENTS.md` — this file is the single source of instructions.
