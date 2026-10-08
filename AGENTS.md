<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# open-daycare

Next.js 16.3.8 (App Router) + React 19.2.8 + Tailwind v4. Greenfield: `app/` still holds the create-next-app boilerplate (`page.tsx`, default metadata).

## Commands
- `npm run dev` — dev server at http://localhost:3000
- `npm run build` — production build; this is the only built-in typecheck step (no `typecheck` or `test` script exists)
- `npm run lint` — ESLint flat config (`eslint-config-next`)
- Ad-hoc typecheck: `npx tsc --noEmit`
- No test framework is configured.

## Design source of truth
- `references/pantallas/*.dc.html` (16 screens) are the UI mockups to build from — do not invent layouts.
- `references/screenshots/` holds rendered images of those same screens.
- These `.dc.html` files are a generated runtime (`support.js` says "do not edit"). Port their structure/styles into App Router components; never ship them directly.

## Conventions
- Path alias `@/*` maps to the repo root (`./*`), not `src/`.
- Tailwind v4 is configured in CSS (`app/globals.css`: `@import "tailwindcss"` + `@theme`); there is no `tailwind.config.js`.
- Code in English, comments in Spanish.
- Mockups use Fredoka/Nunito fonts while `app/layout.tsx` still loads Geist — reconcile when implementing screens.

## Spec workflow
- Feature work is driven by the `/spec` and `/spec-impl` skills in `.agents/skills/`.
- Specs live in `specs/` (first is `01-<slug>.md`).
- `/spec-impl` only runs when a spec's status means "Approved" and creates branch `spec-NN-slug` (disable via `specs/.spec-config.yml` → `AutoCreateBranch: false`).
- After `/spec-impl`, verify the acceptance criteria with the `spec-verify` agent (`.opencode/agent/spec-verify.md`); invoke it via `@spec-verify`. It runs build/lint, validates Next.js recommendations with Context7, compares screens with Playwright MCP, corrects failures, and ticks the spec's checkboxes.
- Never commit unless explicitly asked; the skills and `spec-verify` enforce this too.

## MCP / tooling
- Playwright screenshots, logs, and snapshots must go in `.playwright-mcp/` (gitignored).
- Use Context7 for up-to-date framework/library docs instead of relying on training data.
