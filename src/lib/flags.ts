import { ENV } from './env';

/**
 * Feature flags, resolved at build time. This is what makes the three
 * deployments genuinely different builds rather than the same site in three
 * colours: content is gated here, and a flag only reaches Production once it
 * has been promoted through Sandbox and Test.
 */
export type FlagName =
  | 'showBuildPanel'
  | 'showWipSections'
  | 'showReleaseCandidate'
  | 'showOrgSwitcher'
  | 'showDoraDashboard';

type FlagMatrix = Record<FlagName, Record<string, boolean>>;

const MATRIX: FlagMatrix = {
  // Full build/environment inspector. Production gets a quiet footer stamp instead.
  showBuildPanel: { dev: true, qa: true, prod: false },
  // Work in progress that has not been promoted yet.
  showWipSections: { dev: true, qa: false, prod: false },
  // Release-candidate banner plus the automated check summary for this build.
  showReleaseCandidate: { dev: true, qa: true, prod: false },
  // Switcher for jumping between the three deployed environments.
  showOrgSwitcher: { dev: true, qa: true, prod: true },
  // DORA metrics dashboard on the pipeline page.
  showDoraDashboard: { dev: true, qa: true, prod: true },
};

export function flag(name: FlagName): boolean {
  return MATRIX[name][ENV.key] ?? false;
}

/** Every flag resolved for the current environment, for the build panel. */
export const FLAGS = Object.fromEntries(
  (Object.keys(MATRIX) as FlagName[]).map((name) => [name, flag(name)])
) as Record<FlagName, boolean>;

/** The full matrix, so the pipeline page can show what differs where. */
export const FLAG_MATRIX = MATRIX;
