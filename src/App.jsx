import { useEffect, useReducer, useState } from 'react'
import { ME } from './content.js'
import { APPS, LOGO } from './apps.jsx'
import { init, reducer, activeId } from './wm.js'

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
              style={a.spot && { gridArea: a.spot }}
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
