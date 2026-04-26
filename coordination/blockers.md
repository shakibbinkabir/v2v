Cross-stage blockers parallel agents flag here.

## Stage 3 (resolved on stage-3-static-pages branch only)

* **Workspace was thrashing between stage branches** during Stage 3 work:
  page.tsx in the working tree was reverted to the Stage 1 placeholder
  multiple times by external orchestration (branch checkouts triggered
  by parallel Stage 4 / Stage 5 / Stage 6 sessions sharing this clone).
  The actual Stage 3 home page **is** committed on
  `stage-3-static-pages` (commit `4a4f727`) and the static build of
  that commit renders all 5 routes correctly. If the Integration pass
  sees the placeholder again, it is a working-tree artefact, not the
  branch state — `git checkout stage-3-static-pages -- src/app/page.tsx`
  restores it.

* **Structural labels not in /content/pages/*.json.** Several small
  bilingual strings the spec asks Stage 3 to render are not present in
  the JSON copy: the home-page CTAs ("Listen to the stories", "About
  the project"), the section headings ("Latest stories", "Latest
  reels"), the "Coming May–June 2026" empty state, and equivalents on
  /resources ("Available June 2026") and /safeguarding ("Report a
  safeguarding concern"). They are inlined as `BilingualString`
  literals in the Stage 3 page files — the bilingual contract is
  preserved, but CONVENTIONS.md says "all user-facing strings live in
  /content/pages/*.json". Stage 2.x or a content edit should add a
  `cta` / `headings` map to home.json, resources.json, and
  safeguarding.json, then Stage 3 replaces the inline literals with
  `home.cta.listen` etc. Logged for the next coordination pass.
