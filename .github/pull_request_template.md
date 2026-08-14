## What changed

<!-- One or two sentences. What a reader of the site would notice. -->

## Why

<!-- The reason, not the diff. -->

## Environment path

<!-- Which environment does this land in first, and where should it end up? -->

- [ ] Targets `dev` (Sandbox) and will be promoted from there
- [ ] Promotion PR (`dev` to `qa`, or `qa` to `main`)
- [ ] Hotfix straight to a later environment (explain below)

## Checks

- [ ] `npm run check` passes locally
- [ ] Every new internal link and asset reference goes through `withBase()`
- [ ] Any environment-specific content is gated in `src/lib/flags.ts`
- [ ] Resume content lives in `src/data/`, not hardcoded in a page
- [ ] Copy follows the voice rules in `CONTRIBUTING.md`
