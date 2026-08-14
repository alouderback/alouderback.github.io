/**
 * Key Skills leads the experience page, ahead of role history. Each group pairs
 * the tool with the work actually done in it, so nothing here is a bare keyword.
 */
export interface SkillGroup {
  id: string;
  name: string;
  summary: string;
  items: { name: string; detail: string }[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'gearset',
    name: 'Gearset',
    summary: 'The platform the NPT CRM pipeline runs on. I stood it up, and I own it end to end.',
    items: [
      {
        name: 'CI/CD Pipeline',
        detail:
          'Instituted the pipeline for continuous development, testing, and releases across the CRM team.',
      },
      {
        name: 'Code Scan',
        detail:
          'Static code analysis wired in as a gate, so problems surface before a reviewer opens the change.',
      },
      {
        name: 'Build Agent',
        detail:
          'Self-hosted build execution for validation and deployment jobs inside the pipeline.',
      },
      {
        name: 'Backup',
        detail: 'Led the migration from Own Secure to Gearset Backup when Own Backup was sunset.',
      },
    ],
  },
  {
    id: 'source-control',
    name: 'Azure DevOps & GitHub',
    summary:
      'Implementations of both, covering the repository model and the automation on top of it.',
    items: [
      {
        name: 'Azure DevOps',
        detail: 'Repository structure, pipelines, and work item flow into the release process.',
      },
      {
        name: 'GitHub',
        detail:
          'Branching strategy, GitHub Actions authoring, environment-gated deployments. This site runs on it.',
      },
      {
        name: 'Branching & PR gating',
        detail:
          'Long-lived environment branches, promotion paths, and required checks before a merge lands.',
      },
      {
        name: 'Peer review standardization',
        detail:
          'Consistent review expectations so the quality of a review does not depend on who picks it up.',
      },
    ],
  },
  {
    id: 'jira',
    name: 'Jira & Jira Service Management',
    summary:
      'Owned the rearchitecture and rollout of both. This is the layer that made department-wide metrics possible.',
    items: [
      {
        name: 'Jira rearchitecture',
        detail:
          'Rebuilt project and workflow structure so delivery work could be tracked consistently across teams.',
      },
      {
        name: 'Jira Service Management',
        detail: 'Rolled out JSM alongside Jira to bring intake and delivery into one system.',
      },
      {
        name: 'JSM Help Portal',
        detail: 'Built the portal end users file through, replacing scattered intake channels.',
      },
      {
        name: 'Center of Excellence Dashboard',
        detail:
          'The rearchitecture is what made this possible. Clean data in Jira is the prerequisite for real reporting.',
      },
    ],
  },
  {
    id: 'metrics',
    name: 'Metrics & Governance',
    summary: 'Measuring delivery so the next investment can be argued for with numbers.',
    items: [
      {
        name: 'DORA metrics',
        detail:
          'Deployment frequency, lead time for changes, change failure rate, and time to restore.',
      },
      {
        name: 'Value-based metrics',
        detail:
          'Velocity and transformation progress reported across IT, not just within one team.',
      },
      {
        name: 'Intelligent SDLC gating',
        detail: 'Static code analysis, AI/LLM scanning, and peer review enforced as release gates.',
      },
      {
        name: 'Release management',
        detail: 'Copado Certified Deployment Manager. 150+ releases orchestrated in 2025.',
      },
    ],
  },
  {
    id: 'engineering',
    name: 'Salesforce & Engineering',
    summary: 'The developer background the DevOps work is built on.',
    items: [
      {
        name: 'Lightning Web Components',
        detail:
          'Built React-based LWC for the USDA ReConnect grant application portal at Deloitte.',
      },
      {
        name: 'Salesforce platform',
        detail:
          'Salesforce Certified Administrator. Four years working in and around the platform.',
      },
      {
        name: 'JavaScript & TypeScript',
        detail: 'React and LWC on the front end, Node for pipeline tooling.',
      },
      {
        name: 'Java',
        detail:
          'Messaging protocols and a JavaFX testing dashboard for U.S. Army C5ISR training systems.',
      },
    ],
  },
];
