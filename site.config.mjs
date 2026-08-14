/**
 * Single source of truth for where this site is served from.
 *
 * Phase 1 (now): GitHub Pages project URL.
 * Phase 2 (once DNS for alouderback.com resolves): change `origin` to
 * 'https://alouderback.com', change `pathPrefix` to '', and add a CNAME file to
 * the gh-pages branch. Nothing else in the codebase needs to change.
 */
export const SITE = {
  origin: 'https://alouderback.github.io',
  pathPrefix: '/resume-site',
  repo: 'alouderback/resume-site',
};

/**
 * @typedef {Object} DeployEnvironment
 * @property {string} key          Internal key, also the ENV_NAME build arg.
 * @property {string} name         Human label shown in the UI.
 * @property {string} branch       Long-lived branch that owns this environment.
 * @property {string} ghEnvironment GitHub Environment name used for deploy records.
 * @property {string} dir          Subdirectory on the gh-pages branch ('' means root).
 * @property {string} sfAnalogue   The Salesforce org this maps to.
 */

/** @type {Record<string, DeployEnvironment>} */
export const ENVIRONMENTS = {
  dev: {
    key: 'dev',
    name: 'Sandbox',
    branch: 'dev',
    ghEnvironment: 'dev',
    dir: 'dev',
    sfAnalogue: 'Developer sandbox',
  },
  qa: {
    key: 'qa',
    name: 'Test',
    branch: 'qa',
    ghEnvironment: 'qa',
    dir: 'qa',
    sfAnalogue: 'Partial or Full Copy sandbox (UAT)',
  },
  prod: {
    key: 'prod',
    name: 'Production',
    branch: 'main',
    ghEnvironment: 'production',
    dir: '',
    sfAnalogue: 'Production org',
  },
};

/** Long-lived branch to environment key. */
export const BRANCH_TO_ENV = {
  dev: 'dev',
  qa: 'qa',
  main: 'prod',
};

export const ENV_KEYS = Object.keys(ENVIRONMENTS);

/**
 * Absolute path this environment is served from, always with a trailing slash.
 * @param {string} envKey
 * @returns {string}
 */
export function baseFor(envKey) {
  const env = ENVIRONMENTS[envKey];
  if (!env)
    throw new Error(`Unknown environment '${envKey}'. Expected one of: ${ENV_KEYS.join(', ')}`);
  const path = `${SITE.pathPrefix}/${env.dir}`.replace(/\/+$/, '');
  return path === '' ? '/' : `${path}/`;
}

/**
 * Full public URL for an environment.
 * @param {string} envKey
 * @returns {string}
 */
export function urlFor(envKey) {
  return SITE.origin + baseFor(envKey);
}

/**
 * Resolve an environment from a branch name, for CI.
 * @param {string} branch
 * @returns {string | undefined}
 */
export function envForBranch(branch) {
  return BRANCH_TO_ENV[branch];
}

/**
 * Path to a file in the shared data directory at the Pages root. The DORA
 * workflow writes there so one metrics file serves all three environments
 * without committing to any source branch.
 * @param {string} file
 * @returns {string}
 */
export function sharedDataPath(file) {
  return `${SITE.pathPrefix}/data/${file}`.replace(/\/{2,}/g, '/');
}
