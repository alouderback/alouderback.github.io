import { defineConfig } from 'astro/config';
import { SITE, ENVIRONMENTS, ENV_KEYS, baseFor } from './site.config.mjs';

const envKey = process.env.ENV_NAME ?? 'dev';

if (!ENVIRONMENTS[envKey]) {
  throw new Error(
    `ENV_NAME='${envKey}' is not a known environment. Expected one of: ${ENV_KEYS.join(', ')}`
  );
}

// https://astro.build/config
export default defineConfig({
  site: SITE.origin,
  base: baseFor(envKey),
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  // Each environment builds into its own folder so `build:all` never clobbers itself.
  outDir: `./dist/${envKey}`,
  devToolbar: {
    enabled: false,
  },
});
