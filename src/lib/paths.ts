/**
 * Astro does not rewrite hrefs for `config.base`, so every internal link and
 * asset reference in this codebase goes through withBase(). Skipping it works
 * locally and breaks the moment the site is served from a subdirectory, which
 * is exactly how the Sandbox and Test environments are served.
 */
const BASE = import.meta.env.BASE_URL; // always ends with '/'

const EXTERNAL = /^([a-z][a-z0-9+.-]*:|\/\/|#)/i;

export function withBase(path: string): string {
  if (EXTERNAL.test(path)) return path;
  return `${BASE}${path.replace(/^\/+/, '')}`;
}

/** True when `path` is the page currently being rendered. Used for nav highlighting. */
export function isActive(currentPathname: string, path: string): boolean {
  const target = withBase(path);
  const normalise = (p: string) => (p.endsWith('/') ? p : `${p}/`);
  return normalise(currentPathname) === normalise(target);
}
