import { test } from 'node:test'
import assert from 'node:assert/strict'
import { newGame, step, SIZE } from './snake.js'

const zero = () => 0 // food always lands on the first free cell

test('snake moves, grows on food, ignores reversing, dies on walls and itself', () => {
  let g = { ...newGame(zero), food: [7, 8] }
  g = step(g, [1, 0], zero)
  assert.deepEqual(g.snake, [[7, 8], [6, 8], [5, 8], [4, 8]])
  assert.equal(g.score, 1)

  g = step(g, [-1, 0], zero) // straight back: ignored, keeps going right
  assert.deepEqual(g.snake[0], [8, 8])
  assert.equal(g.snake.length, 4)

  let wall = g
  for (let i = 0; i < SIZE && !wall.over; i++) wall = step(wall, [1, 0], zero)
  assert.equal(wall.over, true)

  const self = { snake: [[5, 5], [6, 5], [6, 6], [5, 6], [4, 6]], dir: [0, -1], food: [0, 0], score: 0, over: false }
  assert.equal(step(self, [0, 1]).over, false) // that's a reversal, so it keeps going up
  assert.equal(step({ ...self, dir: [-1, 0] }, [0, 1]).over, true) // down into its own body
})
