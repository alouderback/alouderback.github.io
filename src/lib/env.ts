import { ENVIRONMENTS, ENV_KEYS, SITE, urlFor, sharedDataPath } from '../../site.config.mjs';

const envKey = process.env.ENV_NAME ?? 'dev';
const config = ENVIRONMENTS[envKey];

if (!config) {
  throw new Error(
    `ENV_NAME='${envKey}' is not a known environment. Expected: ${ENV_KEYS.join(', ')}`
  );
}

/** Which deployment environment this build is for. */
export const ENV = {
  key: envKey,
  name: config.name,
  branch: config.branch,
  sfAnalogue: config.sfAnalogue,
  url: urlFor(envKey),
  isProd: envKey === 'prod',
} as const;

const sha = process.env.GITHUB_SHA ?? '';
const runId = process.env.GITHUB_RUN_ID ?? '';
const repoUrl = `https://github.com/${SITE.repo}`;

/**
 * Metadata about the build that produced this page. Populated by GitHub Actions;
 * falls back to sensible local values so `npm run dev` never shows blanks.
 */
export const BUILD = {
  sha: sha || 'local',
  shortSha: sha ? sha.slice(0, 7) : 'local',
  branch: process.env.GITHUB_REF_NAME ?? config.branch,
  time: new Date().toISOString(),
  runNumber: process.env.GITHUB_RUN_NUMBER ?? null,
  runUrl: runId ? `${repoUrl}/actions/runs/${runId}` : null,
  commitUrl: sha ? `${repoUrl}/commit/${sha}` : null,
  repoUrl,
  isCI: Boolean(process.env.GITHUB_ACTIONS),
} as const;

/** Every environment, for the org switcher and the pipeline page. */
export const ALL_ENVIRONMENTS = ENV_KEYS.map((key) => ({
  key,
  name: ENVIRONMENTS[key].name,
  branch: ENVIRONMENTS[key].branch,
  sfAnalogue: ENVIRONMENTS[key].sfAnalogue,
  url: urlFor(key),
  isCurrent: key === envKey,
}));

/**
 * Where the live DORA metrics file is served from. It sits at the Pages root,
 * shared by all three environments, so this is not relative to the env base.
 */
export const DORA_URL = sharedDataPath('dora.json');

export { SITE };
