export interface Role {
  id: string;
  title: string;
  org: string;
  team?: string;
  location?: string;
  detail?: string;
  start: string;
  end: string;
  current?: boolean;
  bullets: string[];
}

/** Wording stays close to the resume, since that wording is already Alex's. */
export const roles: Role[] = [
  {
    id: 'npt',
    title: 'Salesforce DevOps Engineer',
    org: 'National Philanthropic Trust',
    team: 'IT Delivery, CRM Team',
    start: 'Nov 2024',
    end: 'Present',
    current: true,
    bullets: [
      'Instituted a Gearset CI/CD pipeline for continuous development, testing, and releases.',
      "Orchestrated over 150 releases over the course of 2025, doubling the CRM team's previous release cadence.",
      'Enforced intelligent gating in the SDLC, including static code analysis, AI/LLM scanning, and peer review standardization.',
      'Led the migration from Own Secure to Gearset Backup upon the sunset of Own Backup.',
      'Owned the rearchitecture and rollout of Jira and the JSM Help Portal, which allowed for the creation of a Center of Excellence Dashboard.',
      'Helped found the first IT Delivery Center of Excellence and built the Center of Excellence Metrics Dashboard to generate reporting of value-based metrics like DORA, velocity, and transformation progress across IT.',
    ],
  },
  {
    id: 'deloitte',
    title: 'Software Solution Analyst',
    org: 'Deloitte',
    team: 'U.S. Delivery Center',
    detail: 'Federal Contractor, full-time',
    start: 'Jun 2021',
    end: 'Nov 2024',
    bullets: [
      'Worked with a team of functional and software developers to deliver updates and newly designed products to product owners.',
      'Built React-based Lightning Web Components for a web application allowing customers to create applications for the USDA ReConnect grant program.',
      'Supported USDA, VA, and HHS clients to help drive government processes, grant programs, and employee management systems and platforms.',
    ],
  },
  {
    id: 'c5isr',
    title: 'Student Intern',
    org: 'C5ISR Command, Power, and Integration (U.S. Army)',
    location: 'Aberdeen Proving Ground, MD',
    detail: 'Secret clearance. Intermittent, 40 hours a week across three terms.',
    start: 'Sep 2019',
    end: 'Apr 2021',
    bullets: [
      'Worked with a team of 4 to implement new messaging protocols and messaging testing suites for use in training warfighters and in the battlefield.',
      'Used Java and JavaFX to implement a new testing dashboard and messaging protocol, and JIRA to manage version control.',
    ],
  },
];

export interface LeadershipEntry {
  id: string;
  title: string;
  org: string;
  start: string;
  end: string;
  bullets: string[];
}

export const leadership: LeadershipEntry[] = [
  {
    id: 'evaluation-criteria',
    title: 'Evaluation Criteria Implementation, Project Lead',
    org: 'Deloitte',
    start: 'Mar 2022',
    end: 'May 2022',
    bullets: [
      "Managed a development scrum team of 4 to successfully design, implement, and deploy the Evaluation Criteria webpage for USDA's ReConnect portal.",
      'Assisted with the design phase, ticket writing, developing, and testing of brand new functionality for the ReConnect portal.',
    ],
  },
];

/** The resume's "Ask Me About" section. */
export const askMeAbout = [
  {
    title: 'McNees TechCelerator',
    detail: 'Participant and grant winner',
    period: 'Apr 2022 to May 2022',
  },
  {
    title: 'Eagle Scout Project: Installation of a Flagpole',
    detail: 'Fallston United Methodist Church',
    period: 'Dec 2015 to Sep 2016',
  },
];
