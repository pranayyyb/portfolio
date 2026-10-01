import { useEffect, useRef, useState } from 'react'
import { ME, RESUME, PROJECTS, STACK } from './content.js'

/* Each desktop app is a component that receives open(id) so it can launch other apps. */

function Resume({ open }) {
  return (
    <>
      <h2>{ME.name}</h2>
      <p><b>{ME.role}</b> · {ME.city} · {ME.email}<br />{RESUME.tagline}</p>
      <div className="stats">
        {RESUME.stats.map(([n, label]) => <div key={label}><b>{n}</b>{label}</div>)}
      </div>
      <h3>About</h3>
      <p>{RESUME.about}</p>
      <h3>Experience</h3>
      {RESUME.jobs.map((j, i) => (
        <p key={i}>
          <b>{j.role}, {j.company}</b> — {j.dates}
          {j.note && <><br /><i>{j.note}</i></>}
          {j.points.map((pt, k) => <span key={k}><br />• {pt}</span>)}
        </p>
      ))}
      {RESUME.sections.map(s => (
        <div key={s.title}>
          <h3>{s.title}</h3>
          <p>{s.items.map((it, k) => <span key={k}>{k > 0 && <br />}• {it}</span>)}</p>
        </div>
      ))}
      {RESUME.quote && <div className="note">“{RESUME.quote.text}” — {RESUME.quote.by}</div>}
      <p style={{ marginTop: 12 }}>
        {ME.pdf && <a className="link" href={ME.pdf} download>⬇ Download PDF</a>}
        <button className="link" onClick={() => open('contact')}>Get in touch →</button>
      </p>
    </>
  )
}

function Projects({ open }) {
  const [sel, setSel] = useState(null)
  const p = PROJECTS[sel]
  return (
    <div className="xp">
      <aside>
        <div>🖥 My Computer</div>
        <div style={{ paddingLeft: 16 }}>💽 Local Disk (C:)</div>
        <div style={{ paddingLeft: 28 }}>📂 Documents</div>
        <div className="on" style={{ marginLeft: 40 }}>📂 Projects</div>
        <div style={{ paddingLeft: 28 }}>📂 Downloads</div>
        <div>🗑 Recycle Bin</div>
      </aside>
      <main>
        {p ? (
          <>
            <button className="b98 back" onClick={() => setSel(null)}>← Back to Projects</button>
            <h2>📁 {p.name}</h2>
            <p style={{ color: '#666' }}>Type: Work highlight</p>
            <span className="chip good">{p.result}</span>
            <h3>Description</h3>
            <p>{p.desc}</p>
            <h3>Skills and tools</h3>
            {p.tech.map(t => <span className="chip" key={t}>{t}</span>)}
            {p.link && <><h3>Links</h3><a className="link" href={p.link} target="_blank" rel="noopener">Read more</a></>}
            <div className="note">
              <b>Note:</b> Want to hear more about this? <button className="a" onClick={() => open('contact')}>Contact me</button>.
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

const stackOut = STACK.map(([a, b]) => <div key={a}><span className="k">{a.padEnd(15)}</span> {b}</div>)
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
      <h2>📬 Let's talk</h2>
      <p>Have a role, a project or a question? Send me a message.{ME.replyTime && ` I reply within ${ME.replyTime}.`}</p>
      <form className="cf" onSubmit={submit}>
        <p><input name="n" placeholder="Your name" aria-label="Your name" required /></p>
        <p><input name="e" type="email" placeholder="Your email" aria-label="Your email" required /></p>
        <p><textarea name="m" rows="4" placeholder="Your message" aria-label="Message" required /></p>
        <button className="b98">Send ✉</button>{' '}
        {ME.calendar && <a className="link" href={ME.calendar} target="_blank" rel="noopener">📅 Book a call</a>}
      </form>
      <p style={{ marginTop: 10 }}>
        Or email <a href={`mailto:${ME.email}`}>{ME.email}</a> · <a href={ME.linkedin} target="_blank" rel="noopener">LinkedIn</a>
      </p>
    </>
  )
}

const Bin = () => <p style={{ textAlign: 'center', marginTop: 30 }}>🗑 Recycle Bin is empty.<br />Unlike my ticket backlog.</p>

export const APPS = {
  resume: { icon: '📄', title: 'Resume.doc', w: 560, h: 460, Body: Resume },
  projects: { icon: '📁', title: 'My Projects', w: 700, h: 480, Body: Projects },
  stack: { icon: '⌨', title: 'Skills', w: 640, h: 400, Body: Terminal },
  contact: { icon: '📬', title: 'Contact Me', w: 480, h: 440, Body: Contact },
  bin: { icon: '🗑', title: 'Recycle Bin', w: 360, h: 220, Body: Bin },
}
