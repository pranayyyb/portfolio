/* ---- All portfolio text lives here. Anything in [square brackets] is a placeholder to replace. ---- */

export const ME = {
  name: '[Your Name]',
  role: 'Application Support Engineer',
  city: '[City]',
  email: 'you@example.com',
  linkedin: 'https://linkedin.com/in/[you]',
  github: 'https://github.com/[you]',
  calendar: 'https://calendly.com/[you]',
  replyTime: '[24 hours]',
  pdf: '', // put resume.pdf in /public and set this to '/resume.pdf' to show the download button
}

export const RESUME = {
  stats: [
    ['[6+]', 'yrs in app support'],
    ['[2,000+]', 'incidents resolved'],
    ['[99%]', 'SLA compliance'],
  ],
  about:
    "I'm the engineer teams call when production breaks. I triage, diagnose and fix issues, then remove the root cause so they don't return. [Add 1–2 lines on your domain: fintech, SaaS, healthcare…]",
  jobs: [
    { role: '[Role]', company: '[Company]', dates: '[Dates]', points: ['[Achievement with a number]', '[Achievement with a number]'] },
    { role: '[Role]', company: '[Company]', dates: '[Dates]', points: ['[Achievement with a number]'] },
  ],
  certs: ['[ITIL 4 Foundation]', '[AWS Cloud Practitioner]'],
  quote: {
    text: '[Short client or manager quote about fast resolution and calm communication.]',
    by: '[Name, Title, Company]',
  },
}

// link: URL of a case study; leave '' to hide the button
export const PROJECTS = [
  { name: 'Payment API Stabilisation', desc: 'Recurring outages on a payments API caused failed checkouts. I traced the root cause to connection-pool exhaustion, fixed it, and added alerting. Repeat incidents dropped 64% and MTTR fell from 2h to 20m.', tech: ['Splunk', 'SQL', 'Linux', 'ServiceNow'], result: '−64% repeat incidents', link: '' },
  { name: 'Ticket Triage Automation', desc: 'Wrote runbooks and scripts that auto-classify and resolve the top 10 recurring tickets, freeing the team for real incidents.', tech: ['Python', 'Bash', 'Jira'], result: '40% fewer tickets', link: '' },
  { name: 'Monitoring & Alerting Overhaul', desc: 'Replaced noisy alerts with actionable, severity-based ones with on-call runbooks.', tech: ['Datadog', 'PagerDuty', 'Grafana'], result: '−70% alert noise', link: '' },
  { name: 'Database Performance Tuning', desc: 'Found slow queries via log analysis and tuned indexes for a reporting app.', tech: ['SQL', 'Oracle', 'AWR'], result: 'Reports 8× faster', link: '' },
  { name: 'Release & Deployment Support', desc: 'Supported weekly releases with smoke tests, rollback plans and post-deploy verification.', tech: ['CI/CD', 'Jenkins', 'Bash'], result: '0 failed releases / 6 mo', link: '' },
  { name: 'Knowledge Base Rebuild', desc: 'Audited and rewrote support documentation so L1 could resolve more without escalating.', tech: ['Confluence', 'Runbooks'], result: 'L1 resolution +25%', link: '' },
]

export const STACK = [
  ['Monitoring', 'Splunk, Datadog, Grafana, Nagios'],
  ['Ticketing', 'ServiceNow, Jira Service Mgmt, Zendesk'],
  ['Databases', 'SQL, Oracle, PostgreSQL, MySQL'],
  ['OS / Scripting', 'Linux, Windows Server, Bash, Python, PowerShell'],
  ['APIs / Cloud', 'REST, Postman, AWS, Azure'],
  ['Practices', 'ITIL, RCA, runbooks, SLA mgmt, on-call'],
]
