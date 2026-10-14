/* ---- All portfolio text lives here. Source of truth: Pranay's resume. Don't add claims or numbers that aren't in it. ---- */

export const ME = {
  name: 'Pranay Bathija',
  role: 'Application Support Engineer',
  city: 'Chennai, India',
  email: 'pranay.bathija25@gmail.com',
  linkedin: 'https://linkedin.com/in/pranaybathija',
  github: 'https://github.com/pranayyyb',
  calendar: '', // booking link (e.g. Calendly); leave '' to hide the "Book a call" button
  replyTime: '', // e.g. '24 hours'; leave '' to make no promise
  pdf: '/resume.pdf', // generated from this file by `npm run pdf` (dev server must be running); '' hides the Download PDF button
  cta: { title: '📬 Open to Business Analyst roles', text: 'Click here to get in touch.' }, // sticky note on the desktop
}

export const RESUME = {
  tagline: 'FinTech Operations · Business Analysis · Stakeholder Management',
  // jobs and education share one shape: { role, company, place?, dates, note?, points }. **text** renders bold.
  jobs: [
    {
      role: 'Application Support Engineer', company: 'Baton Systems', dates: 'Jan 2023 – Present',
      note: 'Post-trade settlements platform supporting **$20–30B in daily settlements** · clients include JPMorgan, Citi, HSBC and Goldman Sachs',
      points: [
        'Primary liaison between engineering teams and **Tier-1 bank clients** during production incidents.',
        'Gather, clarify and communicate **requirements** across technical and non-technical stakeholders.',
        'Write **Root Cause Analysis** reports that turn system failures into clear findings for senior management and clients.',
        'Maintain **runbooks and process workflows** that **cut incident resolution time** and speed up onboarding.',
        'Analyse **ticket trends** across client environments to catch process gaps before they escalate.',
        'Coordinate with DevOps, QA and product teams on **Kubernetes/EKS** environments.',
        'Track **SLA compliance** and report status to client stakeholders at major global banks.',
      ],
    },
    {
      role: 'Digital Marketing Intern', company: "Nester's Hub", dates: '2022 – 2023',
      points: [
        'Analysed campaign data (**ROAS, CPL, CTR**) in **Meta Ads Manager** and **Google Analytics** and presented insights to stakeholders.',
        'Ran **A/B tests** on ads and landing pages and turned the results into revised campaign briefs.',
        'Produced competitor and market research reports that shaped quarterly campaign strategy.',
        'Managed client relationships and prospecting outreach to drive repeat engagement.',
      ],
    },
    {
      role: 'Digital Marketing Intern', company: 'Ullas Trust (NGO)', dates: '2021 – 2022',
      points: [
        'Ran paid digital campaigns on a tight NGO budget, meeting awareness and outreach goals.',
        'Improved search visibility through on-page and off-page SEO.',
      ],
    },
  ],
  education: [
    {
      role: 'BBA, Marketing & Business Management', company: "St. Joseph's College of Commerce", place: 'Bangalore, Karnataka', dates: '2021 – 2024',
      points: [
        '**1st place**, Inter-Collegiate Marketing Fest (all Bangalore colleges): live campaign strategy and pitch.',
        'Captain, eSports team · Member of the Finance Club, Quiz Club and Business Team.',
      ],
    },
  ],
  sections: [
    {
      title: 'Achievements',
      items: [
        '**National eSports Athlete of the Year**, 2019 and 2020: one of fewer than 10 players in India recognised in both years.',
      ],
    },
    {
      title: 'Certifications',
      items: [
        'Prompt Engineering · Anthropic Claude (Claude Code)',
        'Google Analytics 4 · Google Skillshop',
        'Meta Blueprint: Digital Marketing Associate · Meta (in progress)',
      ],
    },
  ],
  quote: null, // { text: '…', by: 'Name, Title, Company' } — only add a real testimonial
}

// Work highlights. result = short outcome chip. link: URL to a write-up; leave '' to hide the button
export const PROJECTS = [
  { name: 'Tier-1 Bank Incident Liaison', desc: 'At Baton Systems I am the primary liaison between internal engineering teams and Tier-1 bank clients during production incidents: gathering, clarifying and communicating requirements across technical and non-technical stakeholders.', tech: ['Client Communication', 'Escalation Handling', 'JIRA'], result: 'Tier-1 bank clients', link: '' },
  { name: 'Root Cause Analysis Reports', desc: 'Structured RCA documents for production incidents that translate complex system failures into clear, actionable findings for senior management and client teams.', tech: ['Root Cause Analysis', 'Confluence', 'Executive Reporting'], result: 'Clear findings for leadership', link: '' },
  { name: 'Runbooks & Process Workflows', desc: 'Documented and maintained operational runbooks and process workflows, reducing average incident resolution time and improving onboarding speed for new engineers.', tech: ['Process Documentation', 'Confluence'], result: 'Faster incident resolution', link: '' },
  { name: 'Ticket Trend Analysis', desc: 'Analysed recurring ticket trend data across multiple client environments to spot upstream process gaps early, enabling intervention before issues escalated.', tech: ['JIRA', 'Gap Analysis'], result: 'Fewer escalations', link: '' },
  { name: 'SLA Compliance Reporting', desc: 'Tracked SLA compliance for critical financial infrastructure and produced regular status reports communicated directly to client stakeholders at major global banks.', tech: ['SLA Management', 'Executive Reporting'], result: 'Regular client status reports', link: '' },
  { name: 'EKS Delivery Coordination', desc: 'Coordinated with DevOps, QA and product teams on Kubernetes/EKS environments, translating business-side incidents into technical requirements and back across the software delivery lifecycle.', tech: ['Kubernetes/EKS', 'Cross-functional Coordination'], result: 'Business ↔ technical translation', link: '' },
  { name: 'Campaign Performance Analysis', desc: "At Nester's Hub I analysed campaign performance data (ROAS, CPL, CTR), ran A/B tests on ad creatives and landing pages, and turned the findings into revised campaign briefs.", tech: ['Meta Ads Manager', 'Google Analytics', 'A/B Testing'], result: 'Insights for stakeholders', link: '' },
  { name: 'Inter-Collegiate Marketing Fest', desc: 'Live campaign strategy and pitch presentation, competing against colleges from across Bangalore.', tech: ['Campaign Strategy', 'Pitching'], result: '1st place', link: '' },
]

export const STACK = [
  ['Business Analysis', ['Requirements Gathering', 'User Story Writing', 'Gap Analysis', 'Root Cause Analysis', 'Process Documentation']],
  ['Stakeholder Management', ['Client Communication', 'Cross-functional Coordination', 'Executive Reporting', 'Escalation Handling', 'SLA Management']],
  ['FinTech Domain', ['Post-Trade Settlements', 'Collateral Management', 'Trading Workflows', 'Financial Infrastructure', 'Incident Lifecycle']],
  ['Cloud, DevOps & Tools', ['AWS (S3, IAM, EC2)', 'Docker', 'Kubernetes/EKS', 'CI/CD (GitHub Actions, TeamCity)', 'Monitoring (Grafana, Kibana)']],
  ['Tools', ['JIRA', 'Confluence', 'Postman', 'Excel', 'Claude Code', 'VS Code', 'Git/GitHub']],
  ['Marketing & Analytics', ['Google Analytics 4', 'Meta Ads Manager', 'A/B Testing', 'Canva']],
]
