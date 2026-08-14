#!/usr/bin/env node
/**
 * Verifies every internal link and asset reference in the built output.
 *
 * The check that earns its keep is the second one: an absolute internal path
 * that does not start with the environment's base means somebody skipped
 * withBase(). That link works locally and 404s the moment the site is served
 * from a subdirectory, which is how Sandbox and Test are always served.
 *
 * Usage: node scripts/check-links.mjs [env ...]   (defaults to every built env)
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve, posix } from 'node:path';
import { ENV_KEYS, baseFor, SITE } from '../site.config.mjs';

const DIST = resolve(process.cwd(), 'dist');

/** Published by dora.yml to the Pages root, so it is absent from any build. */
const EXTERNAL_TO_BUILD = [`${SITE.pathPrefix}/data/`.replace(/\/{2,}/g, '/')];

const SKIP = /^(https?:|mailto:|tel:|data:|javascript:|#|\/\/)/i;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (full.endsWith('.html')) out.push(full);
  }
  return out;
}

/** Pull href/src values out of the markup. Good enough for our own output. */
function extractRefs(html) {
  const refs = [];
  const re = /(?:href|src)\s*=\s*"([^"]*)"/gi;
  let m;
  while ((m = re.exec(html)) !== null) refs.push(m[1]);
  return refs;
}

function resolveTarget(distRoot, base, ref, fromFile) {
  const clean = ref.split('#')[0].split('?')[0];
  if (!clean) return null;

  let pathname;
  if (clean.startsWith('/')) {
    pathname = clean;
  } else {
    // Relative to the directory the page lives in.
    const pageDir = posix.dirname(fromFile.replace(distRoot, '').replaceAll('\\', '/'));
    pathname = posix.resolve(posix.join(base, pageDir), clean);
  }

  if (EXTERNAL_TO_BUILD.some((p) => pathname.startsWith(p))) return { kind: 'shared', pathname };
  if (!pathname.startsWith(base)) return { kind: 'outside-base', pathname };

  const rel = pathname.slice(base.length);
  const candidates = [
    join(distRoot, rel),
    join(distRoot, rel, 'index.html'),
    join(distRoot, `${rel}.html`),
  ];
  return { kind: 'internal', pathname, candidates };
}

let totalRefs = 0;
const problems = [];
const targets = process.argv.slice(2).length ? process.argv.slice(2) : ENV_KEYS;

for (const envKey of targets) {
  const distRoot = join(DIST, envKey);
  if (!existsSync(distRoot)) {
    console.log(`skip ${envKey}: no build at dist/${envKey}`);
    continue;
  }

  const base = baseFor(envKey);
  const files = walk(distRoot);
  let envRefs = 0;

  for (const file of files) {
    const html = readFileSync(file, 'utf8');
    for (const ref of extractRefs(html)) {
      if (SKIP.test(ref)) continue;
      envRefs += 1;
      totalRefs += 1;

      const target = resolveTarget(distRoot, base, ref, file);
      if (!target) continue;

      if (target.kind === 'outside-base') {
        problems.push({
          env: envKey,
          file: file.replace(`${DIST}/`, ''),
          ref,
          why: `absolute path outside the '${base}' base. Missing withBase()?`,
        });
        continue;
      }
      if (target.kind === 'shared') continue;

      if (!target.candidates.some((c) => existsSync(c))) {
        problems.push({
          env: envKey,
          file: file.replace(`${DIST}/`, ''),
          ref,
          why: `no file at ${target.pathname}`,
        });
      }
    }
  }

  console.log(`${envKey}: ${files.length} pages, ${envRefs} internal refs checked`);
}

if (problems.length) {
  console.error(`\n${problems.length} broken reference(s):\n`);
  for (const p of problems) {
    console.error(`  [${p.env}] ${p.file}`);
    console.error(`      ${p.ref}`);
    console.error(`      ${p.why}\n`);
  }
  process.exit(1);
}

console.log(`\nOK. ${totalRefs} internal references all resolve.`);
