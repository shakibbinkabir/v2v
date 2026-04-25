# V2V Bridge

V2V Bridge (Voice to Venture Bridge) is a 3-month youth-led storytelling
project under Plan International Bangladesh's Youth Equality Award 2026,
implemented by CapeC. Consulting in Satkhira and Dhaka. The site is a
curated public showcase of women entrepreneurs' podcasts, reels, and
profiles, plus a locked internal upload workflow for the production team.

## Run locally

```
pnpm install
pnpm dev          # localhost:3000
pnpm build        # static export to /out
pnpm typecheck
pnpm lint
```

Falls back to `npm` if `pnpm` is unavailable.

## Stack

- Next.js 15 (App Router, static export)
- TypeScript strict, `noUncheckedIndexedAccess`
- Tailwind CSS v4 with brand tokens via `@theme`
- Hind Siliguri (Bangla) + Inter (English) via `next/font/google`
- Native CSS smooth scroll — no Lenis
- File-based content in `/content/`, validated with Zod (added in Stage 2)
- Hosted on Vercel Hobby (static export)

Brand tokens are defined once in `src/app/globals.css` and surface as
both CSS custom properties and Tailwind utilities (`bg-brand-teal`,
`text-brand-coral`, `font-bangla`, `font-sans`).

## Project documents

- [`V2V_Bridge_PRD_Staged_v1.1.md`](./V2V_Bridge_PRD_Staged_v1.1.md) —
  the staged technical PRD that drives this build.
- [`CONVENTIONS.md`](./CONVENTIONS.md) — repo conventions every agent
  reads before touching code.
- [`V2V_Bridge_ClaudeCode_Prompts.md`](./V2V_Bridge_ClaudeCode_Prompts.md)
  — per-stage prompts.
- `STAGE-N-DONE.md` files at the repo root — handoff notes per stage.

## How to publish content

After Stage 2 lands, content lives in `/content/`:

- `/content/entrepreneurs/<id>.json`
- `/content/podcasts/<id>.json`
- `/content/reels/<id>.json`
- `/content/pages/<slug>.json`

Non-developers can edit these via the GitHub web UI:

1. Open the relevant file on GitHub.
2. Click the pencil icon to edit in-browser.
3. Change the JSON. Set `published: true` only after both YSC reviewers
   and the project lead have signed off and the consent form is filed in
   Drive `/Consent/`.
4. Commit straight to a branch and open a pull request. CI typechecks
   the JSON against its Zod schema; a failed validation blocks merge.
5. Merge → Vercel rebuilds → live within a minute.

Safeguarding rules baked into the build (enforced regardless of JSON):

- No identifiable face of any minor anywhere on the public layer.
- No personal contact details of any contributor on the public layer.
- No location below district level (Satkhira) on the public layer.
- Photos appear only when the entrepreneur record sets
  `photoConsent: true`.
- Items render publicly only when `published: true`.

## Coordination

Stages 3-6 run in parallel on separate branches. If a parallel agent
needs to modify a file outside its assigned directories, it stops and
appends a note to `coordination/blockers.md` rather than editing.
