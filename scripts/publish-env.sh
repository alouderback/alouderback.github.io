#!/usr/bin/env bash
#
# Publishes one built environment into its own folder on the gh-pages branch.
#
# Each environment writes only its own subdirectory, so a broken build in
# Sandbox can never take down Production. Publishing Production is the only
# fiddly case: it owns the root, so it has to clear root files while leaving
# the sibling environments, the shared data folder, and the CNAME alone.
#
# Usage: scripts/publish-env.sh <env-key> [pages-dir]
#
set -euo pipefail

ENV_KEY="${1:?usage: publish-env.sh <env-key> [pages-dir]}"
PAGES_DIR="${2:-gh-pages}"
SRC="dist/${ENV_KEY}"

if [[ ! -d "$SRC" ]]; then
  echo "error: no build at ${SRC}. Run ENV_NAME=${ENV_KEY} npm run build first." >&2
  exit 1
fi

if [[ ! -d "${PAGES_DIR}/.git" ]]; then
  echo "error: ${PAGES_DIR} is not a git checkout of the gh-pages branch." >&2
  exit 1
fi

# Ask the single source of truth where this environment lives.
TARGET_DIR="$(node -e "import('./site.config.mjs').then(m => {
  const env = m.ENVIRONMENTS[process.argv[1]];
  if (!env) { console.error('unknown environment: ' + process.argv[1]); process.exit(1); }
  process.stdout.write(env.dir);
})" "$ENV_KEY")"

ENV_NAME="$(node -e "import('./site.config.mjs').then(m =>
  process.stdout.write(m.ENVIRONMENTS[process.argv[1]].name))" "$ENV_KEY")"

# Things at the Pages root that belong to somebody else and must survive a
# Production publish.
PRESERVE=(.git qa dev data CNAME .nojekyll)

if [[ -z "$TARGET_DIR" ]]; then
  echo "Publishing ${ENV_NAME} to the ${PAGES_DIR} root"
  FIND_ARGS=()
  for keep in "${PRESERVE[@]}"; do
    FIND_ARGS+=(! -name "$keep")
  done
  find "$PAGES_DIR" -mindepth 1 -maxdepth 1 "${FIND_ARGS[@]}" -exec rm -rf {} +
  cp -R "${SRC}/." "${PAGES_DIR}/"
else
  echo "Publishing ${ENV_NAME} to ${PAGES_DIR}/${TARGET_DIR}/"
  rm -rf "${PAGES_DIR:?}/${TARGET_DIR}"
  mkdir -p "${PAGES_DIR}/${TARGET_DIR}"
  cp -R "${SRC}/." "${PAGES_DIR}/${TARGET_DIR}/"
fi

# Pages would otherwise run the output through Jekyll and drop _astro/.
touch "${PAGES_DIR}/.nojekyll"

cd "$PAGES_DIR"

if git diff --quiet && git diff --staged --quiet && [[ -z "$(git status --porcelain)" ]]; then
  echo "No change to publish for ${ENV_NAME}."
  exit 0
fi

git add -A
git commit -m "deploy(${ENV_KEY}): ${ENV_NAME} from ${GITHUB_SHA:-local}" \
  -m "Source branch: ${GITHUB_REF_NAME:-local}
Workflow run: ${GITHUB_RUN_ID:-n/a}"

# The concurrency group serialises publishes, but a retry costs nothing.
for attempt in 1 2 3; do
  if git push origin HEAD:gh-pages; then
    echo "Published ${ENV_NAME}."
    exit 0
  fi
  echo "Push rejected (attempt ${attempt}). Rebasing onto the latest gh-pages."
  git pull --rebase origin gh-pages
done

echo "error: could not push to gh-pages after 3 attempts." >&2
exit 1
