# Portfolio — context for future chats

Pranay Bathija's personal portfolio: a Windows 98-style desktop (boot screen → login → desktop with draggable windows). Pranay is an **Application Support Engineer** at a FinTech firm, moving toward Business Analyst roles. Built with React 19 + Vite 8. No other runtime dependencies.

**The owner does not code.** Do the work end to end (install, run, verify) and explain results in plain language. Don't ask them to edit code or run multi-step terminal commands.

## Commands

| What | Command |
|---|---|
| Run locally (live reload) | `npm run dev` |
| Production build → `dist/` | `npm run build` |
| Window-manager check | `npm test` |

`.claude/launch.json` runs the dev server on port 8123 for the Claude preview panel.

## Where things are

| File | What it holds |
|---|---|
| `src/content.js` | **All text**: name, contact links, resume, projects, tech stack. Content changes go here and nowhere else. |
| `src/apps.jsx` | One component per desktop app (Resume, Projects, Terminal, Contact, Recycle Bin) and the `APPS` registry (icon, title, window size). Add a new desktop app by adding a component + an `APPS` entry; icons, start menu and taskbar pick it up automatically. |
| `src/App.jsx` | Shell: Boot, Login, Desktop, window frame (`Win`), taskbar, start menu, clock. |
| `src/wm.js` | Window-manager state as a pure reducer (open / focus / minimise / maximise / move / close). Tested by `src/wm.test.js`. |
| `src/styles.css` | All styling. Plain CSS, Win98 look. |
| `index.html` | Vite entry. Holds the meta description (page title is set from `content.js` in `main.jsx`). |
| `legacy/index.html` | The original single-file HTML version, kept for reference. Not part of the build. |

## Status (2026-10-02)

Done: full React port of the original page, plus an interactive terminal (`help`, `stack`, `projects`, `whoami`, `contact`, `open <app>`, `clear`), resizable windows, keyboard-accessible icons/menus, phone layout (windows go full-screen under 700px). Verified in headless Chrome with no console errors.

**Content filled in from the owner's resume (2026-10-02).** `src/content.js` now holds real details: name, Chennai, email, LinkedIn, GitHub, Baton Systems + two internships, education, achievements, in-progress certifications, skills. The template's sample projects and invented metrics were removed; "My Projects" now shows eight work highlights taken from resume bullets. The "Tech Stack" app was renamed "Skills".

Content rules:
- **Only state what the resume supports.** No invented numbers, clients, testimonials or outcomes. The one figure in use is "$20–30B in daily settlements".
- **Phone number is deliberately not on the site or in this public repo.** Don't add it without the owner asking.
- Optional fields hide their UI when empty: `ME.calendar` (Book a call), `ME.replyTime`, `ME.pdf` (Download PDF), `RESUME.quote` (testimonial), project `link`.

Decided by the owner (2026-10-02) — don't change without asking:
- Headline role stays "Application Support Engineer" (not "Business Analyst").
- The desktop sticky note says "Open to Business Analyst roles"; the owner accepted that this is publicly visible.
- Experience is stated as "2 years full time" (the owner's wording), not "2+" or a figure computed from the Jan 2023 start date.
- Naming Baton's bank clients (JPMorgan, Citi, HSBC, Wells Fargo) is fine.

Still open:
- Resume PDF download: the owner's PDF includes their phone number; needs a phone-free version in `public/resume.pdf`, then set `ME.pdf = '/resume.pdf'`.

Also not done: deployment/hosting, custom domain. The contact form opens the visitor's email app (`mailto:`); there is no backend.

## Git and GitHub

- Public repo: https://github.com/pranayyyb/portfolio (branch `main`, remote `origin`).
- The GitHub CLI is installed at `~/.local/bin/gh` (not on PATH — call it by full path) and is logged in as `pranayyyb`. `git push` works over HTTPS through it.
- Commit author is set for this repo only: "Pranay Bathija" / pranay.bathija25@gmail.com. There is no global git identity.
- The repo is public: never commit secrets, and ask before pushing anything personal the owner hasn't approved.

## Decisions and conventions

- Kept the retro desktop concept from the original; it is the portfolio's identity. Don't restyle to a generic modern layout unless asked.
- Keep it small: no UI libraries, no router, no state library, no CSS framework. Prefer native browser features (window resizing is CSS `resize`, the hidden desktop uses `inert`).
- Emoji are the icons. No image assets.
- Intro (boot + login) plays once per browser session (`sessionStorage.seen`); Start → Restart replays it.
- Effects must not return non-functions: Chrome's `scrollIntoView` returns a Promise, so wrap such calls in braces.

## Machine gotcha: npm cache

`~/.npm/_cacache` on this Mac contains a few root-owned folders (from an old `sudo npm`), which makes npm **silently skip optional native packages** — the symptom is `Cannot find native binding` / `Cannot find module ...darwin-arm64.node` from rolldown or lightningcss at build time. This project's `.npmrc` works around it by using `~/.cache/npm` as the cache. Permanent fix (needs the owner's password): `sudo chown -R $(whoami) ~/.npm`, after which `.npmrc` can be deleted. New projects on this machine will hit the same problem until then.

## Location

This folder is a Claude scratch workspace under `~/Library/Application Support/Claude/scratch-workspaces/…`, which is hidden in Finder. If the owner wants a permanent home (e.g. `~/Documents/portfolio`), copy everything except `node_modules` and `dist`, then run `npm install`.
