/* Window manager state. A pure reducer so it can be checked without a browser (wm.test.js). */

export const init = { wins: [], z: 10 }

// The focused window is the top-most one that isn't minimised.
export const activeId = s => s.wins.filter(w => !w.min).sort((a, b) => b.z - a.z)[0]?.id

export function reducer(s, a) {
  const z = s.z + 1
  const patch = f => ({ ...s, wins: s.wins.map(w => (w.id === a.id ? { ...w, ...f(w) } : w)) })
  const front = () => ({ ...patch(() => ({ z, min: false })), z })
  switch (a.type) {
    case 'open': {
      if (s.wins.some(w => w.id === a.id)) return front()
      const n = s.wins.length
      return { z, wins: [...s.wins, { id: a.id, z, min: false, max: false, x: 110 + n * 28, y: 24 + n * 28 }] }
    }
    case 'focus': return activeId(s) === a.id ? s : front()
    case 'task': return activeId(s) === a.id ? patch(() => ({ min: true })) : front() // taskbar button
    case 'min': return patch(() => ({ min: true }))
    case 'max': return patch(w => ({ max: !w.max }))
    case 'move': return patch(() => ({ x: a.x, y: a.y }))
    case 'close': return { ...s, wins: s.wins.filter(w => w.id !== a.id) }
    default: return s
  }
}
