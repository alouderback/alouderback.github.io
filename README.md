# alouderback.github.io

Alex Louderback's resume site, and the delivery pipeline that ships it.

The site is the artifact. One codebase, three long-lived branches, three deployed
environments, and promotion between them by pull request. It mirrors the Sandbox
to UAT to Production model of a Salesforce release pipeline, built with what
GitHub gives you for free.

| Branch | Environment | Salesforce analogue          | URL                          |
| ------ | ----------- | ---------------------------- | ---------------------------- |
| `dev`  | Sandbox     | Developer sandbox            | https://alouderback.com/dev/ |
| `qa`   | Test        | Partial or Full Copy sandbox | https://alouderback.com/qa/  |
| `main` | Production  | Production org               | https://alouderback.com/     |

## Running it locally

Requires Node 22.12 or newer (see `.nvmrc`).

```bash
npm ci
npm run dev
```

That serves the Sandbox build at `http://localhost:4321/dev/`. Use
`npm run dev:qa` or `npm run dev:prod` to see the other two. They differ in more
than colour, which is the point.

| Command             | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Sandbox dev server                               |
| `npm run build:all` | Builds all three environments into `dist/<env>/` |
| `npm run check`     | Lint, format check, and typecheck                |
| `npm run links`     | Verifies every internal link in `dist/`          |
| `npm run dora`      | Computes DORA metrics from the GitHub API        |

## How a change reaches Production

```
feature/*  --PR-->  dev  --promotion PR-->  qa  --promotion PR-->  main
                     |                       |                       |
                  Sandbox                  Test                 Production
```

1. Branch from `dev` as `feature/thing` or `fix/thing`.
2. Open a pull request into `dev`. CI runs lint, format, typecheck, all three
   builds, and the link check. If `ANTHROPIC_API_KEY` is set, Claude reviews the
   diff as well.
3. Merge. Sandbox deploys automatically.
4. Run the **Promote** workflow (`dev to qa`). It opens a pull request with the
   commit list being promoted. Merge it and Test deploys.
5. Run **Promote** again (`qa to main`). Merge it and Production deploys, a
   deployment record lands in the Environments tab, and a Release gets cut.

## Architecture notes

### One config value controls every URL

`site.config.mjs` is the single source of truth for where the site is served
from. `astro.config.mjs` derives the base path from it, `src/lib/paths.ts`
derives `withBase()` from it, and the deploy workflow derives environment names
and URLs from it.

**Astro does not rewrite hrefs for `base`.** Every internal link and asset
reference has to go through `withBase()`. Skipping it produces a link that works
in Production and 404s in Sandbox and Test, because those are served from
subdirectories. `npm run links` fails the build on exactly this mistake.

### Publishing writes to gh-pages, one folder per environment

A repository gets one GitHub Pages site, so three environments have to be three
paths inside it. `actions/deploy-pages` replaces the whole site on every run,
which would mean rebuilding all three branches on every push and letting a
broken Sandbox build block a Production deploy.

Instead, Pages serves the `gh-pages` branch and each environment writes only its
own subdirectory using plain git (`scripts/publish-env.sh`). Environments stay
independent, failures stay isolated, and `gh-pages` becomes an auditable record
of exactly what is deployed where.

```
gh-pages/
├─ index.html, _astro/   <- main   (Production)
├─ qa/                   <- qa     (Test)
├─ dev/                  <- dev    (Sandbox)
├─ data/dora.json        <- written by dora.yml
└─ .nojekyll
```

Publishing Production is the only fiddly case: it owns the root, so the script
clears root files while preserving `qa/`, `dev/`, `data/`, `CNAME`, and
`.nojekyll`.

### Feature flags make the environments genuinely different

`src/lib/flags.ts` maps each flag to each environment. Sandbox shows work in
progress and a build inspector, Test shows a release-candidate banner without
the unfinished content, Production is clean. A flag reaches Production only
after it has been promoted through the pipeline like anything else.

### DORA metrics come from real deployment history

`scripts/dora.mjs` computes deployment frequency, lead time for changes, change
failure rate, and time to restore from this repository's own GitHub deployments.
`dora.yml` runs it nightly and after each Production deploy, then writes
`data/dora.json` to the `gh-pages` root. All three environments read the same
file. Nothing is typed in by hand.

Writing to `gh-pages` rather than a source branch keeps bot commits out of
`dev`, `qa`, and `main`, and removes any chance of a deploy-triggers-metrics-
triggers-deploy loop.

## Workflows

| Workflow                    | Trigger                           | What it does                                                       |
| --------------------------- | --------------------------------- | ------------------------------------------------------------------ |
| `ci.yml`                    | PRs, pushes to the three branches | Lint, format, typecheck, build all three environments, check links |
| `deploy.yml`                | Push to `dev`, `qa`, `main`       | Builds that environment, publishes it, records the deployment      |
| `promote.yml`               | Manual                            | Opens a promotion pull request with the commit list                |
| `agentic-review.yml`        | Pull requests                     | Claude reviews the diff. Skipped without a key                     |
| `agentic-release-notes.yml` | Successful Production deploy      | Writes release notes and cuts a Release                            |
| `dora.yml`                  | Nightly, after Production deploys | Computes and publishes delivery metrics                            |

## Optional setup

### Enable the agentic jobs

Add an `ANTHROPIC_API_KEY` secret under **Settings → Secrets and variables →
Actions**. Both agentic workflows check for it first and skip cleanly when it is
absent, so nothing breaks while it is unset.

### Make CI run on promotion pull requests

Pull requests opened with the built-in `GITHUB_TOKEN` do not trigger other
workflows. That is a GitHub design decision, not a bug here. CI still runs on
the push to the target branch after a promotion PR merges.

To have CI run on the promotion PR itself, create a fine-grained personal access
token with `contents: write` and `pull requests: write`, and add it as a
`PROMOTE_TOKEN` secret. `promote.yml` uses it when present.

### Move Production to alouderback.com

Everything works on the `github.io` URL as-is. Because the site already serves
from the account root, moving to the custom domain is only a change of origin.
To do it:

1. At your DNS registrar, add four apex `A` records for `alouderback.com`:

   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   and a `CNAME` record for `www` pointing at `alouderback.github.io`.

2. Once those resolve, edit `site.config.mjs`:

   ```js
   export const SITE = {
     origin: 'https://alouderback.com',
     pathPrefix: '',
     repo: 'alouderback/alouderback.github.io',
   };
   ```

3. Add a `CNAME` file containing `alouderback.com` to the root of the `gh-pages`
   branch. `scripts/publish-env.sh` already preserves it across deploys.

4. In **Settings → Pages**, set the custom domain and enable **Enforce HTTPS**.

Production then serves from `alouderback.com/`, Test from `alouderback.com/qa/`,
and Sandbox from `alouderback.com/dev/`. Nothing else in the codebase changes.

The site previously lived in a separate `resume-site` repository. It was moved
here so Production owns the account root. The pre-existing contents of this
repository are preserved on the `legacy-2023` branch.

### Require reviews before merging

Branch protection currently requires passing status checks but not an approving
review, since a solo maintainer cannot approve their own pull request. To turn
reviews on once someone else is contributing:

```bash
gh api -X PUT repos/alouderback/alouderback.github.io/branches/main/protection/required_pull_request_reviews \
  -F required_approving_review_count=1
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the branching model and the writing
voice rules that apply to site copy.
