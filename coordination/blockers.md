## Open blockers

### B-001 — `generateStaticParams` returns empty under `output: "export"`
- Raised by: Stage 4 (Agent B), 2026-04-26
- Affected: Stage 4 (`/podcasts/[id]`), Stage 5 (`/entrepreneurs/[id]`)

`next.config.ts` sets `output: "export"`. Next 15 then refuses to build a
`[id]` route whose `generateStaticParams()` returns `[]` — it errors with
*"Page is missing generateStaticParams() so it cannot be used with
output: export"*. With every seed record currently `published: false`,
`getAllPublishedPodcasts()` returns `[]` in production builds (the dev
fallback in `src/lib/content.ts` only fires when `NODE_ENV ===
"development"`, and `next build` forces `production`).

This means a clean `pnpm build` is impossible until at least one piece
of seed content flips to `published: true`, *or* the loader's dev
fallback is broadened to cover `next build` too, *or* the export
constraint is relaxed.

**Workaround in place (Stage 4):** when `getAllPublishedPodcasts()` is
empty, `generateStaticParams` falls back to `_getAllPodcastsRaw()` so
the build succeeds. Each detail page still calls `notFound()` for any
record with `published === false`, so the safeguarding gate stays
intact at render time — the emitted HTML for unpublished IDs is the
project's not-found page, not the episode content.

**Suggested clean resolutions** (any one is fine, picking is Stage 2's
call):

1. Flip one seed podcast/entrepreneur to `published: true` so the
   parallel stages have a real anchor to build against.
2. Add an explicit `INCLUDE_UNPUBLISHED=1` env opt-in to the loader,
   wire it into a `pnpm build:dev` script, and have the parallel
   agents call that for verification.
3. Drop `output: "export"` until a published item exists (changes the
   deploy story, probably not acceptable).
