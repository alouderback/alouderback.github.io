export const profile = {
  name: 'Alex Louderback',
  headline: "The Developer's Developer",
  role: 'Salesforce DevOps Engineer',
  company: 'National Philanthropic Trust',
  location: 'Maryland, USA',
  email: 'alex@alouderback.com',
  github: 'https://github.com/alouderback',
  githubHandle: 'alouderback',
  // Phone is on the PDF resume but deliberately left off the public site to
  // keep it away from scrapers. Add it here if you want it shown.
  // phone: '(443) 686-2297',
  // linkedin: 'https://www.linkedin.com/in/...',
  resumePdf: '/Alex-Louderback-Resume.pdf',

  summary:
    'I build the delivery pipelines that Salesforce teams ship through. At National Philanthropic Trust I run CI/CD for the CRM team, where release cadence doubled after the pipeline went in. Before that I was a Salesforce developer at Deloitte writing Lightning Web Components for federal clients, which is why I tend to design tooling from the developer seat rather than from the process diagram.',

  /** Headline numbers, all drawn from the resume. */
  stats: [
    { value: '150+', label: 'releases orchestrated in 2025', context: 'CRM team, NPT' },
    { value: '2x', label: 'the prior release cadence', context: 'after the Gearset pipeline' },
    { value: '1st', label: 'IT Delivery Center of Excellence', context: 'helped found it at NPT' },
    { value: '2', label: 'conference talks in the last year', context: 'London and virtual' },
  ],
} as const;
