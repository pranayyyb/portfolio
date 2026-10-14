import test from 'node:test'
import assert from 'node:assert/strict'
import { init, reducer, activeId } from './wm.js'

const run = (...actions) => actions.reduce((s, [type, id]) => reducer(s, { type, id }), init)

test('window manager', () => {
  let s = run(['open', 'a'], ['open', 'b'])
  assert.equal(activeId(s), 'b')
  assert.equal(activeId(reducer(s, { type: 'focus', id: 'a' })), 'a')

  s = reducer(s, { type: 'task', id: 'b' }) // taskbar click on the active window minimises it
  assert.equal(activeId(s), 'a')
  s = reducer(s, { type: 'open', id: 'b' }) // reopening restores instead of duplicating
  assert.equal(s.wins.length, 2)
  assert.equal(activeId(s), 'b')

  s = reducer(s, { type: 'close', id: 'b' })
  assert.deepEqual(s.wins.map(w => w.id), ['a'])
  assert.equal(activeId(run(['open', 'a'], ['min', 'a'])), undefined)
})
