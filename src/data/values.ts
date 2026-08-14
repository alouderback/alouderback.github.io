export interface Pillar {
  id: string;
  title: string;
  short: string;
  body: string[];
  evidence: { label: string; detail: string }[];
}

/**
 * First-person copy. Drafted plainly so Alex can rewrite it in his own words
 * without unpicking anything clever.
 */
export const pillars: Pillar[] = [
  {
    id: 'integrated-sdlc',
    title: 'An SDLC where every phase connects, and every phase has an agent in it',
    short: 'Tightly integrated delivery, with automation working inside each stage.',
    body: [
      'Handoffs are where delivery slows down. A ticket that has to be re-keyed, a build assembled by hand, a review that starts cold because nobody carried the context forward. Each one costs a little time and a lot of goodwill.',
      'I build pipelines where each phase feeds the next without manual re-entry, and where automated analysis runs before a person ever opens the pull request. Static code analysis and AI/LLM scanning gate the change first. Peer review then gets spent on design and business logic, which is the part people are good at.',
      'Agentic tooling belongs in every phase, not bolted on at the end. Intake, development, review, release, and reporting each have work that a machine should be doing.',
    ],
    evidence: [
      {
        label: 'Intelligent gating at NPT',
        detail:
          'Static code analysis, AI/LLM scanning, and standardized peer review enforced as release gates.',
      },
      {
        label: 'Jira and JSM rearchitecture',
        detail:
          'Intake and delivery brought into one system so work items carry through to release.',
      },
      {
        label: 'This site',
        detail:
          'Six workflows covering CI, promotion, deployment, AI review, release notes, and metrics.',
      },
    ],
  },
  {
    id: 'measured-automation',
    title: 'Automation you can measure, and metrics that fund the next change',
    short: 'Automated workflows tracked through value-based and DORA metrics.',
    body: [
      'Automating a workflow is half the job. If you cannot show what changed, you cannot make the case for the next investment, and the work stalls out after the first win.',
      'I track DORA metrics next to velocity and transformation progress, and I put them where the whole department can see them. At NPT that reporting became the Center of Excellence Metrics Dashboard, built on top of the Jira rearchitecture that made the data trustworthy in the first place.',
      'In 2025 the CRM team shipped more than 150 releases, double its previous cadence. That number did more to justify the pipeline than any argument I made about it beforehand.',
    ],
    evidence: [
      {
        label: '150+ releases in 2025',
        detail: 'Double the CRM team cadence prior to the Gearset pipeline.',
      },
      {
        label: 'Center of Excellence Metrics Dashboard',
        detail: 'DORA, velocity, and transformation progress reported across IT.',
      },
      {
        label: 'Live on this site',
        detail: 'The pipeline page reports real DORA metrics for this repository.',
      },
    ],
  },
  {
    id: 'developer-morale',
    title: 'Better tooling is a morale problem first',
    short: 'Improving the morale and working environments of development teams.',
    body: [
      "Developers rarely burn out on hard problems. They burn out on twenty-minute deploys, environments that drift, and being blocked on someone else's manual step for a day and a half.",
      'Almost every piece of automation I have built started as a complaint from someone on the team. Fixing that kind of friction hands people their attention back, and a team with its attention back does better work without anyone asking it to.',
      'This is also why I talk about DevOps as a team sport. The pipeline belongs to everyone who touches it, and everyone who touches it should be able to change it.',
    ],
    evidence: [
      {
        label: 'DevOps is a Team Sport',
        detail: "Conference talk delivered at DevOps Dreamin' London 2025.",
      },
      {
        label: 'Center of Excellence',
        detail: 'Helped found the first IT Delivery CoE at NPT.',
      },
      {
        label: 'JSM Help Portal',
        detail: 'One front door for requests, instead of scattered intake channels.',
      },
    ],
  },
];
