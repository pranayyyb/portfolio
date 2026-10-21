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

// rolling green hill under a blue sky, drawn in SVG (a lookalike of the classic XP wallpaper, not the photo)
const Wallpaper = () => (
  <svg id="wall" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1452c9" /><stop offset=".45" stopColor="#3f86e3" /><stop offset=".7" stopColor="#9cc9f3" /></linearGradient>
      <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9ad64a" /><stop offset=".35" stopColor="#5fae22" /><stop offset="1" stopColor="#2f7a12" /></linearGradient>
      <linearGradient id="field" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4f9a1c" /><stop offset="1" stopColor="#24600c" /></linearGradient>
      <radialGradient id="sun" cx=".3" cy=".55" r=".5"><stop offset="0" stopColor="#d8f27a" stopOpacity=".55" /><stop offset="1" stopColor="#d8f27a" stopOpacity="0" /></radialGradient>
      <filter id="soft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="14" /></filter>
      <filter id="wisp" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
    </defs>
    <rect width="1600" height="1000" fill="url(#sky)" />
    <g fill="#fff" filter="url(#wisp)" opacity=".75">
      <path d="M520 40 C 700 60 860 140 900 210 C 800 160 660 110 520 40Z" />
      <path d="M180 270 C 260 260 330 300 300 330 C 250 320 210 300 180 270Z" />
      <path d="M1180 60 C 1320 70 1420 130 1500 120 C 1400 160 1260 120 1180 60Z" />
    </g>
    <g fill="#fff" filter="url(#soft)" opacity=".9">
      <ellipse cx="160" cy="40" rx="190" ry="50" />
      <ellipse cx="1240" cy="70" rx="200" ry="55" />
      <ellipse cx="700" cy="330" rx="90" ry="38" />
      <ellipse cx="1050" cy="300" rx="130" ry="40" />
      <ellipse cx="1130" cy="360" rx="160" ry="48" />
      <ellipse cx="1330" cy="240" rx="110" ry="34" />
      <ellipse cx="340" cy="210" rx="70" ry="22" />
      <ellipse cx="1000" cy="450" rx="420" ry="26" />
      <ellipse cx="500" cy="440" rx="200" ry="14" />
    </g>
    <path d="M1150 530 C 1260 505 1380 500 1600 515 L1600 560 L1150 560Z" fill="#8aa4c4" />
    <path d="M0 500 C 220 450 520 420 820 455 C 1100 488 1350 520 1600 540 L1600 1000 L0 1000Z" fill="url(#hill)" />
    <rect width="1600" height="1000" fill="url(#sun)" />
    <path d="M0 800 C 400 770 900 785 1600 740 L1600 1000 L0 1000Z" fill="url(#field)" opacity=".85" filter="url(#wisp)" />
  </svg>
)

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
        <Wallpaper />
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
