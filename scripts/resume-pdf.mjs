// Writes public/resume.pdf by printing the site's resume window in headless Chrome.
// Needs `npm run dev` running on port 8123. Re-run after editing resume text in src/content.js.
import { spawn } from 'node:child_process'
import { writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const profile = `${tmpdir()}/resume-pdf-chrome`
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9334', `--user-data-dir=${profile}`, 'about:blank'])
const sleep = ms => new Promise(r => setTimeout(r, ms))

try {
  let tabs
  for (let i = 0; i < 40 && !tabs; i++) { await sleep(250); tabs = await fetch('http://127.0.0.1:9334/json').then(r => r.json()).catch(() => null) }
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl)
  await new Promise(r => (ws.onopen = r))
  let id = 0
  const pending = {}
  ws.onmessage = m => { const d = JSON.parse(m.data); d.id && pending[d.id](d) }
  const cmd = (method, params = {}) => new Promise(r => { pending[++id] = r; ws.send(JSON.stringify({ id, method, params })) })

  await cmd('Page.enable')
  await cmd('Page.addScriptToEvaluateOnNewDocument', { source: 'sessionStorage.seen = 1' }) // skip the intro
  await cmd('Page.navigate', { url: 'http://localhost:8123/' })
  const evaluate = async expression => (await cmd('Runtime.evaluate', { expression, returnByValue: true })).result?.result?.value
  // wait for the desktop, open the resume, wait for its page to render
  const ready = async (expr, what) => { for (let i = 0; i < 60; i++) { if (await evaluate(expr)) return; await sleep(250) } throw new Error(`timed out waiting for ${what}`) }
  await ready("!!document.querySelector('.ico')", 'desktop icons')
  await evaluate("[...document.querySelectorAll('.ico')].find(b => b.textContent.includes('Resume')).dispatchEvent(new MouseEvent('dblclick', { bubbles: true })), true")
  await ready("!!document.querySelector('.page')", 'resume page')
  await sleep(500)
  const { result, error } = await cmd('Page.printToPDF', { paperWidth: 8.27, paperHeight: 11.69, printBackground: true, preferCSSPageSize: true })
  if (error) throw new Error(error.message)
  writeFileSync('public/resume.pdf', Buffer.from(result.data, 'base64'))
  console.log('wrote public/resume.pdf')
} finally {
  await new Promise(r => { chrome.once('exit', r); chrome.kill() })
  rmSync(profile, { recursive: true, force: true })
}
process.exit()
