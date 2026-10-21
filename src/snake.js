// Snake game rules as pure functions (no React), tested by snake.test.js.
export const SIZE = 16 // board is SIZE x SIZE cells

const same = (a, b) => a[0] === b[0] && a[1] === b[1]

export function placeFood(snake, rand = Math.random) {
  const free = []
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) if (!snake.some(c => same(c, [x, y]))) free.push([x, y])
  return free.length ? free[Math.floor(rand() * free.length)] : null
}

export function newGame(rand) {
  const snake = [[6, 8], [5, 8], [4, 8]]
  return { snake, dir: [1, 0], food: placeFood(snake, rand), score: 0, over: false }
}

// Advance one tick. `turn` is the direction the player last asked for; turning straight back is ignored.
export function step(g, turn = g.dir, rand) {
  if (g.over) return g
  const dir = turn[0] === -g.dir[0] && turn[1] === -g.dir[1] ? g.dir : turn
  const head = [g.snake[0][0] + dir[0], g.snake[0][1] + dir[1]]
  const ate = g.food && same(head, g.food)
  const body = ate ? g.snake : g.snake.slice(0, -1) // the tail moves away unless we grow
  if (head[0] < 0 || head[1] < 0 || head[0] >= SIZE || head[1] >= SIZE || body.some(c => same(c, head))) return { ...g, dir, over: true }
  const snake = [head, ...body]
  const food = ate ? placeFood(snake, rand) : g.food
  return { snake, dir, food, score: g.score + (ate ? 1 : 0), over: !food } // no free cell left = board full
}
