import { useEffect, useRef, useState } from 'react'
import { ME, RESUME, PROJECTS, STACK } from './content.js'
import { SIZE, newGame, step } from './snake.js'

/* Each desktop app is a component that receives open(id) so it can launch other apps. */

// "**x**" in content renders as bold
const rich = t => t.split(/\*\*(.+?)\*\*/).map((x, i) => (i % 2 ? <b key={i}>{x}</b> : x))

const Entry = ({ e, plain }) => (
  <li className="entry">
    <div className="row"><b>{e.company}</b><span>{e.place}</span></div>
    {(e.roles ?? [e]).map(r => (
      <div key={r.role} className="role">
        <div className="row">{plain ? <span>{r.role}</span> : <b>{r.role}</b>}<span>{r.dates}</span></div>
        {r.note && <div>{rich(r.note)}</div>}
        {r.points.length > 0 && <ul>{r.points.map((pt, k) => <li key={k}>{rich(pt)}</li>)}</ul>}
      </div>
    ))}
  </li>
)

// Word-style document icon (inline SVG, sized by font-size)
const WordIcon = () => (
  <svg viewBox="0 0 32 32" width="1em" height="1em" aria-hidden="true" style={{ verticalAlign: '-0.15em' }}>
    <path d="M8 2h14l7 7v21H8z" fill="#fff" stroke="#555" />
    <path d="M22 2v7h7" fill="#ddd" stroke="#555" />
    <path d="M12 14h13M12 18h13M12 22h13M12 26h9" stroke="#9ab" strokeWidth="1.5" />
    <rect x="2" y="9" width="15" height="15" rx="1.5" fill="#2b579a" />
    <path d="M4.6 12.5l1.9 8 2-6 2 6 1.9-8" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
)

// decorative Word 98 chrome; only Print and Download PDF do anything
const MENU = ['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Table', 'Window', 'Help']

function Resume() {
  return (
    <div className="word">
      <div className="menu" aria-hidden="true">{MENU.map(m => <span key={m}>{m}</span>)}</div>
      <div className="tools">
        <span className="ti" aria-hidden="true">📄</span><span className="ti" aria-hidden="true">📂</span><span className="ti" aria-hidden="true">💾</span>
        <button className="ti" title="Print" aria-label="Print resume" onClick={() => print()}>🖨</button>
        {ME.pdf && <><span className="vsep" /><a className="dl" href={ME.pdf} download="Pranay-Bathija-Resume.pdf">⬇ Download PDF</a></>}
        <span className="vsep hide-m" />
        <span className="hide-m" aria-hidden="true"><span className="ti"><b>B</b></span><span className="ti"><i>I</i></span><span className="ti"><u>U</u></span></span>
      </div>
      <div className="scroll">
        <article className="page">
          <h1>{ME.name}</h1>
          <p className="c">{ME.city}</p>
          <p className="c links">
            <a href={`mailto:${ME.email}`}>{ME.email}</a>
            <a href={ME.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            <a href={ME.github} target="_blank" rel="noopener">GitHub</a>
          </p>
          <h2>Education</h2>
          <ul>{RESUME.education.map((j, i) => <Entry key={i} e={j} plain />)}</ul>
          <h2>Experience</h2>
          <ul>{RESUME.jobs.map((j, i) => <Entry key={i} e={j} />)}</ul>
          {RESUME.sections.map(s => (
            <div key={s.title}>
              <h2>{s.title}</h2>
              <ul className="flat">{s.items.map((it, k) => <li key={k}>{rich(it)}</li>)}</ul>
            </div>
          ))}
          <h2>Skills</h2>
          <ul className="flat">{STACK.map(([g, items]) => <li key={g}><b>{g}:</b> {items.join(', ')}</li>)}</ul>
          {RESUME.quote && <p><i>“{RESUME.quote.text}” — {RESUME.quote.by}</i></p>}
        </article>
      </div>
    </div>
  )
}

// brand logos as inline SVG (no image files)
const svg = (d, fill) => <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d={d} fill={fill} /></svg>
export const LOGO = {
  mail: <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="1.5" y="4" width="21" height="16" rx="1.5" fill="#fff" stroke="#c5221f" strokeWidth="2" /><path d="M2.5 5.5 12 13l9.5-7.5" fill="none" stroke="#c5221f" strokeWidth="2" /></svg>,
  linkedin: svg('M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.71 1.637-1.452 3.37-1.452 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', '#0a66c2'),
  github: svg('M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12', '#000'),
}

// XP-style yellow folder (inline SVG, sized by font-size)
const FolderIcon = () => (
  <svg viewBox="0 0 32 32" width="1em" height="1em" aria-hidden="true" style={{ verticalAlign: '-0.15em' }}>
    <path d="M2 7h10l3 3h15v17H2z" fill="#e8b93a" />
    <path d="M2 12h28l-2 15H4z" fill="#ffd968" />
    <path d="M2 12h28" stroke="#f9eab0" />
  </svg>
)

function Projects({ open }) {
  const [sel, setSel] = useState(null)
  const p = PROJECTS[sel]
  return (
    <div className="xp">
      <aside>
        <div>🖥 This PC</div>
        <div style={{ paddingLeft: 16 }}>💽 Career (C:)</div>
        <div className="on" style={{ marginLeft: 28 }}><FolderIcon /> Projects</div>
        <div style={{ paddingLeft: 28 }}><FolderIcon /> Education</div>
        <div style={{ paddingLeft: 28 }}><FolderIcon /> Certifications</div>
      </aside>
      <main>
        {p ? (
          <>
            <button className="b98 back" onClick={() => setSel(null)}>← Back</button>
            <div className="card">
              <div className="card-hd">
                <span className="big"><FolderIcon /></span>
                <div><h2>{p.name}</h2><span className="dim">Type: {p.type}</span></div>
              </div>
              <h3>About</h3>
              <p>{p.desc}</p>
              <h3>Skills & Tools</h3>
              <div>{p.tech.map(t => <span className="chip" key={t}>{t}</span>)}</div>
              {p.link && <><h3>Links</h3><a className="link gh" href={p.link} target="_blank" rel="noopener">{LOGO.github} View on GitHub</a></>}
              <div className="note">
                <b>Tip:</b> Want the details? <button className="a" onClick={() => open('contact')}>Send me a message</button>.
              </div>
            </div>
          </>
        ) : (
          <div className="files">
            {PROJECTS.map((x, k) => (
              <button className="file" key={x.name} onClick={() => setSel(k)}><i><FolderIcon /></i>{x.name}</button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

const stackOut = STACK.map(([group, items]) => (
  <div key={group} className="grp">
    <div className="k">[ {group} ]</div>
    <div className="cols">{items.map(x => <span key={x}>› {x}</span>)}</div>
  </div>
))
const COMMANDS = {
  help: () => 'stack      list my skills and tools\nprojects   list work highlights\nwhoami     who is this\ncontact    how to reach me\nopen X     open resume | projects | snake | contact\ndate       current date\nclear      clear the screen',
  stack: () => stackOut,
  projects: () => PROJECTS.map(p => `${p.name.padEnd(32)} ${p.result}`).join('\n'),
  whoami: () => `${ME.name} — ${ME.role}, ${ME.city}`,
  contact: () => `${ME.email}\n${ME.linkedin}\n${ME.github}`,
  date: () => new Date().toString(),
}

function Terminal({ open }) {
  const [log, setLog] = useState([['stack', stackOut], ['', "Type 'help' for more commands."]])
  const input = useRef()
  // braces matter: newer Chrome returns a Promise from scrollIntoView, and an effect must not return one
  useEffect(() => { input.current.scrollIntoView({ block: 'nearest' }) }, [log])

  const submit = e => {
    e.preventDefault()
    const raw = input.current.value.trim()
    const [c, arg] = raw.toLowerCase().split(/\s+/)
    input.current.value = ''
    if (c === 'clear') return setLog([])
    let out = ''
    // Object.hasOwn: typing "constructor" must not hit Object.prototype
    if (c === 'open' && Object.hasOwn(APPS, arg)) { open(arg); out = `Opening ${APPS[arg].title}...` }
    else if (Object.hasOwn(COMMANDS, c)) out = COMMANDS[c]()
    else if (raw) out = `'${c}' is not recognized as an internal or external command. Try 'help'.`
    setLog(l => [...l, [raw, out]])
  }

  return (
    <div className="term" onClick={() => getSelection().isCollapsed && input.current.focus()}>
      {log.map(([cmd, out], i) => (
        <div key={i}>
          {(cmd || !out) && <div>C:\&gt; {cmd}</div>}
          <div>{out}</div>
          <br />
        </div>
      ))}
      <form onSubmit={submit}>
        C:\&gt; <input ref={input} aria-label="Command" autoFocus autoComplete="off" autoCapitalize="off" spellCheck="false" />
      </form>
    </div>
  )
}

function Contact() {
  const submit = e => {
    e.preventDefault()
    const f = e.target
    location.href = `mailto:${ME.email}?subject=${encodeURIComponent('Portfolio enquiry from ' + f.n.value)}&body=${encodeURIComponent(f.m.value + '\n\n' + f.n.value + ' <' + f.e.value + '>')}`
  }
  return (
    <>
      <h2>📬 Get in touch</h2>
      <p>Have a role, a project or a question? Send me a message.{ME.replyTime && ` I reply within ${ME.replyTime}.`}</p>
      <form className="cf" onSubmit={submit}>
        <p><input name="n" placeholder="Your name" aria-label="Your name" required /></p>
        <p><input name="e" type="email" placeholder="Your email" aria-label="Your email" required /></p>
        <p><textarea name="m" rows="4" placeholder="Your message" aria-label="Message" required /></p>
        <button className="b98">Send message</button>{' '}
        {ME.calendar && <a className="link" href={ME.calendar} target="_blank" rel="noopener">📅 Book a call</a>}
      </form>
      <p style={{ marginTop: 10 }}>
        Or email <a href={`mailto:${ME.email}`}>{ME.email}</a> · <a href={ME.linkedin} target="_blank" rel="noopener">LinkedIn</a>
      </p>
    </>
  )
}

const KEYS = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] }
const best = { get: () => { try { return +localStorage.snakeBest || 0 } catch { return 0 } }, set: v => { try { localStorage.snakeBest = v } catch {} } }

function Snake() {
  const [g, setG] = useState(() => newGame())
  const [running, setRunning] = useState(false)
  const [hi, setHi] = useState(best.get)
  const turn = useRef(g.dir)
  const board = useRef()
  useEffect(() => { board.current.focus() }, []) // so arrow keys work straight away

  useEffect(() => {
    if (!running || g.over) return
    const t = setInterval(() => setG(x => step(x, turn.current)), 130)
    return () => clearInterval(t)
  }, [running, g.over])

  useEffect(() => { if (g.score > hi) { setHi(g.score); best.set(g.score) } }, [g.score])

  const go = d => { turn.current = d; if (!g.over) setRunning(true) }
  const restart = () => { const n = newGame(); turn.current = n.dir; setG(n); setRunning(true) }
  const key = e => {
    const d = KEYS[e.key.length === 1 ? e.key.toLowerCase() : e.key]
    if (d) { e.preventDefault(); go(d) }
    else if (e.key === ' ') { e.preventDefault(); g.over ? restart() : setRunning(r => !r) }
  }

  const cells = new Map(g.snake.map((c, i) => [c[1] * SIZE + c[0], i ? 's' : 's head']))
  if (g.food) cells.set(g.food[1] * SIZE + g.food[0], 'food')
  return (
    <div className="snake">
      <div className="snake-bar"><span>Score: <b>{g.score}</b></span><span>Best: <b>{hi}</b></span><button className="b98" onClick={restart}>New game</button></div>
      <div className="board" ref={board} tabIndex={0} onKeyDown={key} aria-label="Snake board. Use the arrow keys to steer, Space to pause.">
        {Array.from({ length: SIZE * SIZE }, (_, i) => <i key={i} className={cells.get(i)} />)}
        {(!running || g.over) && (
          <div className="msg" onClick={g.over ? restart : () => setRunning(true)}>
            {g.over ? <>Game over! Score {g.score}<br />Click or press Space to play again</> : <>Arrow keys or WASD to steer<br />Click or press an arrow to start</>}
          </div>
        )}
      </div>
      <div className="pad" aria-label="Direction buttons">
        <button className="b98" aria-label="Up" onClick={() => go([0, -1])}>▲</button>
        <button className="b98" aria-label="Left" onClick={() => go([-1, 0])}>◀</button>
        <button className="b98" aria-label="Down" onClick={() => go([0, 1])}>▼</button>
        <button className="b98" aria-label="Right" onClick={() => go([1, 0])}>▶</button>
      </div>
    </div>
  )
}

const Bin = () => <p style={{ textAlign: 'center', marginTop: 30 }}>🗑 Nothing in here.<br />Nothing gets deleted without a root cause analysis.</p>

export const APPS = {
  resume: { icon: <WordIcon />, title: 'Resume.doc', w: 820, h: 680, Body: Resume },
  projects: { icon: <FolderIcon />, title: 'My Projects', w: 720, h: 500, Body: Projects },
  stack: { icon: '⌨', title: 'Skills', w: 680, h: 600, Body: Terminal },
  snake: { icon: '🐍', title: 'Snake', w: 380, h: 520, Body: Snake },
  contact: { icon: '📬', title: 'Contact Me', w: 480, h: 440, Body: Contact },
  bin: { icon: '🗑', title: 'Recycle Bin', w: 360, h: 220, Body: Bin },
}
