import { useEffect, useReducer, useState } from 'react'
import { ME } from './content.js'
import { APPS } from './apps.jsx'
import { init, reducer, activeId } from './wm.js'

// brand logos as inline SVG (no image files)
const svg = (d, fill) => <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d={d} fill={fill} /></svg>
const LOGO = {
  mail: <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="1.5" y="4" width="21" height="16" rx="1.5" fill="#fff" stroke="#c5221f" strokeWidth="2" /><path d="M2.5 5.5 12 13l9.5-7.5" fill="none" stroke="#c5221f" strokeWidth="2" /></svg>,
  linkedin: svg('M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.71 1.637-1.452 3.37-1.452 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', '#0a66c2'),
  github: svg('M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12', '#000'),
}

const BOOT = ['Loading Resume.doc ............ OK', 'Loading work highlights ....... OK', 'Loading skills ................ OK', 'Starting desktop ...']

// sessionStorage can throw in private windows; the intro just replays if it does
const seen = () => { try { return !!sessionStorage.seen } catch { return false } }
const setSeen = v => { try { v ? (sessionStorage.seen = 1) : sessionStorage.removeItem('seen') } catch {} }

function Boot({ done }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (n > BOOT.length) return void done()
    const t = setTimeout(() => setN(n + 1), 450)
    return () => clearTimeout(t)
  }, [n])
  return (
    <div id="boot" onClick={done}>
      PB-OS 98 · Pranay Bathija's portfolio{'\n'}
      ------------------------------------{'\n'}
      {BOOT.slice(0, n).join('\n')}
      <small>Click to skip</small>
    </div>
  )
}

function Login({ done }) {
  return (
    <div id="login">
      <form className="dlg" onSubmit={e => { e.preventDefault(); done() }}>
        <div className="tb"><span>Log On</span></div>
        <div className="in">
          <p>Log on to see {ME.name}'s work.</p>
          <label>User name:<input defaultValue="recruiter" /></label>
          <label>Password:<input type="password" defaultValue="opensesame" /></label>
          <div className="row">
            <button className="b98" autoFocus>OK</button>
            <button className="b98" type="button" onClick={done}>Cancel</button>
          </div>
          <div className="hint">No password needed. Just press OK.</div>
        </div>
      </form>
    </div>
  )
}

function Win({ w, active, dispatch, children }) {
  const a = APPS[w.id]
  const act = type => () => dispatch({ type, id: w.id })
  const drag = e => {
    if (e.target.closest('button') || w.max) return
    const el = e.currentTarget, dx = e.clientX - w.x, dy = e.clientY - w.y
    el.setPointerCapture(e.pointerId)
    // keep at least 80px of the title bar on screen so the window can always be grabbed back
    el.onpointermove = m => dispatch({ type: 'move', id: w.id, x: Math.max(80 - el.offsetWidth, m.clientX - dx), y: Math.max(0, m.clientY - dy) })
    el.onpointerup = () => { el.onpointermove = el.onpointerup = null }
  }
  return (
    <section
      className={`win${active ? ' active' : ''}${w.max ? ' max' : ''}`}
      hidden={w.min}
      aria-label={a.title}
      style={{ width: a.w, height: a.h, left: w.x, top: w.y, zIndex: w.z }}
      onPointerDown={act('focus')}
    >
      <div className="tb" onPointerDown={drag} onDoubleClick={e => e.target.closest('button') || act('max')()}>
        <span>{a.icon} {a.title}</span>
        <button aria-label="Minimize" onClick={act('min')}>_</button>
        <button aria-label="Maximize" onClick={act('max')}>□</button>
        <button aria-label="Close" onClick={act('close')}>✕</button>
      </div>
      <div className="wb">{children}</div>
    </section>
  )
}

function Clock() {
  const [t, setT] = useState(() => new Date())
  useEffect(() => {
    const i = setInterval(() => setT(new Date()), 30000)
    return () => clearInterval(i)
  }, [])
  return <div id="clock">{t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
}

function Desktop({ live, first }) {
  const [s, dispatch] = useReducer(reducer, init)
  const [sel, setSel] = useState()
  const [menu, setMenu] = useState(false)
  const open = id => dispatch({ type: 'open', id })
  const active = activeId(s)

  // first visit this session: greet with the resume
  useEffect(() => {
    if (!live || !first) return
    const t = setTimeout(() => open('resume'), 400)
    return () => clearTimeout(t)
  }, [live])

  return (
    <div inert={!live} onClick={() => setMenu(false)}>
      <div id="desk">
        <div id="icons">
          {Object.entries(APPS).map(([k, a]) => (
            // mouse: click selects, double-click opens. Keyboard (detail 0) and touch: one press opens.
            <button
              key={k}
              className={`ico${sel === k ? ' sel' : ''}`}
              onClick={e => (e.detail === 0 || matchMedia('(pointer:coarse)').matches ? open(k) : setSel(k))}
              onDoubleClick={() => open(k)}
            >
              <i>{a.icon}</i>{a.title}
            </button>
          ))}
        </div>
        <button id="cta" onClick={() => open('contact')}>
          <b>{ME.cta.title}</b>
          {ME.cta.text}
        </button>
        {s.wins.map(w => {
          const { Body } = APPS[w.id]
          return <Win key={w.id} w={w} active={w.id === active} dispatch={dispatch}><Body open={open} /></Win>
        })}
      </div>

      {menu && (
        <div id="menu">
          {Object.entries(APPS).filter(([k]) => k !== 'bin').map(([k, a]) => (
            <button key={k} onClick={() => open(k)}>{a.icon} {a.title}</button>
          ))}
          <hr />
          <button onClick={() => { setSeen(false); location.reload() }}>🔄 Replay intro</button>
        </div>
      )}
      <div id="bar">
        <button className="b98" id="start" aria-expanded={menu} onClick={e => { e.stopPropagation(); setMenu(!menu) }}>
          <span>🪟</span>Start
        </button>
        <div className="sep" />
        {/* quick links: icon-only on phones */}
        <a className="b98 tbtn ql" title="Email me" href={`mailto:${ME.email}`}>{LOGO.mail}<span className="hide-m">Email</span></a>
        <a className="b98 tbtn ql" title="LinkedIn" href={ME.linkedin} target="_blank" rel="noopener">{LOGO.linkedin}<span className="hide-m">LinkedIn</span></a>
        <a className="b98 tbtn ql" title="GitHub" href={ME.github} target="_blank" rel="noopener">{LOGO.github}<span className="hide-m">GitHub</span></a>
        <div className="sep" />
        <div id="tasks">
          {s.wins.map(w => (
            <button key={w.id} className={`b98 tbtn${w.id === active ? ' on' : ''}`} onClick={() => dispatch({ type: 'task', id: w.id })}>
              {APPS[w.id].icon} {APPS[w.id].title}
            </button>
          ))}
        </div>
        <Clock />
      </div>
    </div>
  )
}

export default function App() {
  const [first] = useState(() => !seen())
  const [stage, setStage] = useState(first ? 'boot' : 'desktop')
  return (
    <>
      {stage === 'boot' && <Boot done={() => setStage('login')} />}
      {stage === 'login' && <Login done={() => { setSeen(true); setStage('desktop') }} />}
      <Desktop live={stage === 'desktop'} first={first} />
    </>
  )
}
