export interface Talk {
  id: string;
  title: string;
  kind: 'Talk' | 'Panel';
  event: string;
  host: string;
  date: string;
  isoDate: string;
  location: string;
  url: string;
  /** Wistia media id from the source URL, used for the embed. */
  wistiaId: string;
  summary: string;
  bullets: string[];
  withSpeakers?: { name: string; role: string }[];
}

export const talks: Talk[] = [
  {
    id: 'devops-is-a-team-sport',
    title: 'DevOps is a Team Sport',
    kind: 'Talk',
    event: "DevOps Dreamin' London 2025",
    host: 'Gearset',
    date: '20 November 2025',
    isoDate: '2025-11-20',
    location: 'London, UK',
    url: 'https://devopsdreamin.com/past-events/2025/london/?wvideo=090iuz9xt7',
    wistiaId: '090iuz9xt7',
    summary:
      "A session on what changes when DevOps stops being one person's job. The pipeline only works when the whole team can read it, run it, and change it.",
    bullets: [
      'Delivered a presentation on the benefits of integrating DevOps into everyday practices and across development teams.',
      "Represented NPT's values and innovation on an international stage to hundreds of conference attendees.",
    ],
  },
  {
    id: 'speed-security-governance',
    title: 'Speed, Security & Governance in the AI Era',
    kind: 'Panel',
    event: 'Taking Control of Complex Orgs Summit',
    host: 'Gearset',
    date: '2025',
    isoDate: '2025-01-01',
    location: 'Virtual',
    url: 'https://gearset.com/video/taking-control-of-complex-orgs-summit/?wvideo=zom0r8ho0l',
    wistiaId: 'zom0r8ho0l',
    summary:
      'A panel on how AI changes the governance conversation inside complex Salesforce orgs, and how much of it stays the same. The controls have not shifted as much as the tooling has, and human-in-the-loop is still where the real decisions get made.',
    bullets: [
      'Joined a cross-industry panel on balancing delivery speed against security and governance requirements.',
      'Discussed where AI belongs in a release process, and where a human still has to sign off.',
    ],
    withSpeakers: [
      { name: 'Jack McCurdy', role: 'DevOps Advocate, Gearset (moderator)' },
      { name: 'Agnieszka Oliver', role: 'Salesforce and MuleSoft Platform Lead, Zurich Insurance' },
      { name: 'Aramayis Kageorgis', role: 'Engineering Manager, Center of Excellence' },
    ],
  },
];
