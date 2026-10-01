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
  pdf: '', // put resume.pdf in /public and set this to '/resume.pdf' to show the download button
  cta: { title: '📬 Open to Business Analyst roles', text: 'Click here to get in touch.' }, // sticky note on the desktop
}

export const RESUME = {
  tagline: 'FinTech Operations · Business Analysis · Stakeholder Management',
  stats: [
    ['2', 'yrs full-time in app support'],
    ['$20–30B', 'daily settlements supported'],
    ['Tier-1', 'global bank clients'],
  ],
  about:
    "I'm a BBA graduate with 2 years of full-time application support experience at Baton Systems, a global FinTech firm, working directly with Tier-1 bank clients including JPMorgan, Citi, HSBC and Goldman Sachs. I document production incidents, run root cause analysis, gather requirements from cross-functional stakeholders and turn technical findings into clear business narratives. That mix of analysis and client-facing communication is what I bring to Business Analyst work at the intersection of technology and financial operations.",
  jobs: [
    {
      role: 'Application Support Engineer', company: 'Baton Systems', dates: 'Jan 2023 – Present',
      note: 'FinTech post-trade settlements platform. Clients include JPMorgan, Citi, HSBC and Goldman Sachs ($20–30B in daily asset settlements).',
      points: [
        'Primary liaison between internal engineering teams and Tier-1 bank clients for production incidents, gathering, clarifying and communicating requirements across technical and non-technical stakeholders.',
        'Authored structured Root Cause Analysis (RCA) documents, translating complex system failures into clear, actionable findings for senior management and client teams.',
        'Documented and maintained operational runbooks and process workflows, reducing average incident resolution time and improving onboarding speed for new engineers.',
        'Analysed recurring ticket trend data across multiple client environments to identify upstream process gaps early, reducing escalation frequency.',
        'Coordinated with DevOps, QA and product teams on Kubernetes/EKS environments, translating business-side incidents into technical requirements and back.',
        'Managed SLA compliance tracking for critical financial infrastructure, with regular status reports to client stakeholders at major global banks.',
      ],
    },
    {
      role: 'Digital Marketing Intern', company: "Nester's Hub", dates: '2022 – 2023',
      points: [
        'Conducted competitor and market research, producing structured reports that informed quarterly campaign and content strategy.',
        'Analysed campaign performance data (ROAS, CPL, CTR) in Meta Ads Manager and Google Analytics and presented actionable insights to stakeholders.',
        'Managed client relationships and prospecting outreach, improving pipeline velocity and driving repeat engagement from existing accounts.',
        'Ran A/B tests on ad creatives and landing pages and translated the results into revised campaign briefs.',
      ],
    },
    {
      role: 'Digital Marketing Intern', company: 'Ullas Trust (NGO)', dates: '2021 – 2022',
      points: [
        'Managed paid digital campaigns on a constrained NGO budget, meeting awareness and outreach goals through data-driven optimisation.',
        'Implemented on-page and off-page SEO improvements, improving search visibility.',
      ],
    },
  ],
  sections: [
    {
      title: 'Education',
      items: [
        "Bachelor of Business Administration (BBA), St. Joseph's College of Commerce, Bangalore — 2021 – 2024",
        'Specialisation: Marketing & Business Management',
        'Captain, eSports Team · Member: Finance Club, Quiz Club, Business Team',
        '1st Place, Inter-Collegiate Marketing Fest (all Bangalore colleges): live campaign strategy and pitch presentation',
      ],
    },
    {
      title: 'Achievements',
      items: [
        'National eSports Athlete of the Year, 2019 & 2020 consecutively. One of fewer than 10 players recognised at national level in India across both years.',
        'Supported live financial infrastructure processing $20–30B in daily settlements at Baton Systems.',
      ],
    },
    {
      title: 'Certifications (in progress)',
      items: [
        'Prompt Engineering · Anthropic Claude (Claude Code)',
        'Google Analytics 4 Certification · Google Skillshop',
        'Meta Blueprint: Digital Marketing Associate · Meta',
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
  ['Analysis', 'Requirements Gathering, Root Cause Analysis, Process Documentation, Gap Analysis, User Story Writing'],
  ['Stakeholders', 'Client Communication, Cross-functional Coordination, Executive Reporting, SLA Management, Escalation Handling'],
  ['Domain', 'Post-Trade Settlements, Collateral Management, Financial Infrastructure, Trading Workflows, Incident Lifecycle'],
  ['Tools & Data', 'JIRA, Confluence, Kubernetes/EKS, Google Analytics 4, Meta Ads Manager, Excel, Canva'],
]
