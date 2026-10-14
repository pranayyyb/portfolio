import { useEffect, useRef, useState } from 'react'
import { ME, RESUME, PROJECTS, STACK } from './content.js'

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

function Projects({ open }) {
  const [sel, setSel] = useState(null)
  const p = PROJECTS[sel]
  return (
    <div className="xp">
      <aside>
        <div>🖥 This PC</div>
        <div style={{ paddingLeft: 16 }}>💽 Career (C:)</div>
        <div className="on" style={{ marginLeft: 28 }}>📂 Highlights</div>
        <div style={{ paddingLeft: 28 }}>📂 Education</div>
        <div style={{ paddingLeft: 28 }}>📂 Certifications</div>
      </aside>
      <main>
        {p ? (
          <>
            <button className="b98 back" onClick={() => setSel(null)}>← All highlights</button>
            <h2>📁 {p.name}</h2>
            <p style={{ color: '#666' }}>Type: Work highlight</p>
            <span className="chip good">{p.result}</span>
            <h3>Description</h3>
            <p>{p.desc}</p>
            <h3>Skills and tools</h3>
            {p.tech.map(t => <span className="chip" key={t}>{t}</span>)}
            {p.link && <><h3>Links</h3><a className="link" href={p.link} target="_blank" rel="noopener">Read more</a></>}
            <div className="note">
              <b>Tip:</b> Curious about the details? <button className="a" onClick={() => open('contact')}>Send me a message</button>.
            </div>
          </>
        ) : (
          <div className="files">
            {PROJECTS.map((x, k) => (
              <button className="file" key={x.name} onClick={() => setSel(k)}><i>📁</i>{x.name}</button>
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
  help: () => 'stack      list my skills and tools\nprojects   list work highlights\nwhoami     who is this\ncontact    how to reach me\nopen X     open resume | projects | contact\ndate       current date\nclear      clear the screen',
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

const Bin = () => <p style={{ textAlign: 'center', marginTop: 30 }}>🗑 Nothing in here.<br />Nothing gets deleted without a root cause analysis.</p>

export const APPS = {
  resume: { icon: <WordIcon />, title: 'Resume.doc', w: 820, h: 680, Body: Resume },
  projects: { icon: '📁', title: 'My Projects', w: 700, h: 480, Body: Projects },
  stack: { icon: '⌨', title: 'Skills', w: 680, h: 600, Body: Terminal },
  contact: { icon: '📬', title: 'Contact Me', w: 480, h: 440, Body: Contact },
  bin: { icon: '🗑', title: 'Recycle Bin', w: 360, h: 220, Body: Bin },
}
