/* ---- All portfolio text lives here. Source of truth: Pranay's resume. Don't add claims or numbers that aren't in it. ---- */

export const ME = {
  name: 'Pranay Bathija',
  role: 'Application Support Engineer',
  city: 'Chennai, India',
  email: 'pranay.bathija25@gmail.com',
  linkedin: 'https://www.linkedin.com/in/pranay-bathija-246312214/',
  github: 'https://github.com/pranayyyb',
  calendar: '', // booking link (e.g. Calendly); leave '' to hide the "Book a call" button
  replyTime: '', // e.g. '24 hours'; leave '' to make no promise
  pdf: '/resume.pdf', // generated from this file by `npm run pdf` (dev server must be running); '' hides the Download PDF button
  cta: { title: '📬 Open to Business Analyst roles', text: 'Click here to get in touch.' }, // sticky note on the desktop
}

export const RESUME = {
  tagline: 'FinTech Operations · Business Analysis · Stakeholder Management',
  // { company, place?, role, dates, note?, points }. A company with several roles uses roles: [{ role, dates, note?, points }]. **text** renders bold.
  // Dates and cities from the owner's LinkedIn (2026-10-14).
  jobs: [
    {
      company: 'Baton Systems', place: 'Chennai, Tamil Nadu',
      roles: [{
      role: 'Application Support Engineer', dates: 'Dec 2024 – Present',
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
      }, {
        role: 'Application Support Engineer Intern', dates: 'May 2023 – Jun 2023', points: [],
      }],
    },
    {
      role: 'Intern', company: "Nester's Hub", place: 'Bengaluru, Karnataka', dates: 'Oct 2023 – Nov 2023',
      points: [
        'Analysed campaign data (**ROAS, CPL, CTR**) in **Meta Ads Manager** and **Google Analytics** and presented insights to stakeholders.',
        'Ran **A/B tests** on ads and landing pages and turned the results into revised campaign briefs.',
        'Produced competitor and market research reports that shaped quarterly campaign strategy.',
        'Managed client relationships and prospecting outreach to drive repeat engagement.',
      ],
    },
    {
      role: 'Marketing Intern', company: 'Ullas Trust (NGO)', place: 'Chennai, Tamil Nadu', dates: 'Jul 2022 – Aug 2022',
      points: [
        'Ran paid digital campaigns on a tight NGO budget, meeting awareness and outreach goals.',
        'Improved search visibility through on-page and off-page SEO.',
      ],
    },
  ],
  education: [
    {
      role: 'BBA, Marketing & Business Management', company: "St. Joseph's College of Commerce", place: 'Bengaluru, Karnataka', dates: 'Aug 2021 – Aug 2024',
      points: [
        '**1st place**, Inter-Collegiate Marketing Fest (all Bengaluru colleges): live campaign strategy and pitch.',
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

// "My Projects" folders. Keep descriptions to one or two short sentences and don't name employers (owner's call, 2026-10-21).
// type: shown under the title. result: one-liner used by the terminal's `projects` command. link: GitHub/write-up URL, '' hides the button.
export const PROJECTS = [
  { name: 'Olist E-Commerce Sales Analysis', type: 'SQL project', desc: 'SQL analysis of ~100,000 marketplace orders: what sells, who buys, how they pay and whether they come back. Found that only 3.1% of customers ever ordered again.', tech: ['SQL', 'SQLite', 'Data Analysis'], result: 'SQL analysis of 100k orders', link: 'https://github.com/pranayyyb/olist-ecommerce-sales-analysis' },
  { name: 'Retro Desktop Portfolio', type: 'Web project', desc: "The site you're on: a Windows-style desktop with draggable windows, a Word-style resume and a game of Snake.", tech: ['React', 'Vite', 'CSS'], result: "This site", link: 'https://github.com/pranayyyb/portfolio' },
  { name: 'Production Incident Liaison', type: 'Work highlight', desc: 'The link between engineers and bank clients during production incidents, keeping both sides informed.', tech: ['Client Communication', 'Escalation Handling', 'JIRA'], result: 'Engineers ↔ bank clients', link: '' },
  { name: 'Root Cause Analysis Reports', type: 'Work highlight', desc: 'Turn system failures into clear, actionable findings for leadership and clients.', tech: ['Root Cause Analysis', 'Confluence'], result: 'Clear findings for leadership', link: '' },
  { name: 'Runbooks & Workflows', type: 'Work highlight', desc: 'Runbooks and process docs that cut incident resolution time and speed up onboarding.', tech: ['Process Documentation', 'Confluence'], result: 'Faster incident resolution', link: '' },
  { name: 'Ticket Trend Analysis', type: 'Work highlight', desc: 'Spot recurring issues across client environments before they escalate.', tech: ['JIRA', 'Gap Analysis'], result: 'Fewer escalations', link: '' },
  { name: 'SLA Reporting', type: 'Work highlight', desc: 'Track SLA compliance and report status to client stakeholders.', tech: ['SLA Management', 'Executive Reporting'], result: 'Regular status reports', link: '' },
  { name: 'Campaign Performance Analysis', type: 'Work highlight', desc: 'Read ROAS, CPL and CTR data and A/B test results to sharpen campaign briefs.', tech: ['Google Analytics', 'Meta Ads Manager', 'A/B Testing'], result: 'Data-led campaign briefs', link: '' },
]

export const STACK = [
  ['Business Analysis', ['Requirements Gathering', 'User Story Writing', 'Gap Analysis', 'Root Cause Analysis', 'Process Documentation']],
  ['Stakeholder Management', ['Client Communication', 'Cross-functional Coordination', 'Executive Reporting', 'Escalation Handling', 'SLA Management']],
  ['FinTech Domain', ['Post-Trade Settlements', 'Collateral Management', 'Trading Workflows', 'Financial Infrastructure', 'Incident Lifecycle']],
  ['Cloud, DevOps & Tools', ['AWS (S3, IAM, EC2)', 'Docker', 'Kubernetes/EKS', 'CI/CD (GitHub Actions, TeamCity)', 'Monitoring (Grafana, Kibana)']],
  ['Tools', ['JIRA', 'Confluence', 'Postman', 'Excel', 'Claude Code', 'VS Code', 'Git/GitHub']],
  ['Marketing & Analytics', ['Google Analytics 4', 'Meta Ads Manager', 'A/B Testing', 'Canva']],
]
