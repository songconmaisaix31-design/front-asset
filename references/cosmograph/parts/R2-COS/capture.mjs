import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const output = process.env.CAPTURE_OUTPUT_DIR;
const chrome = process.env.CHROME_EXECUTABLE;
if (!output || !chrome) throw new Error('CAPTURE_OUTPUT_DIR and CHROME_EXECUTABLE must name existing paths.');

const url = 'https://run.cosmograph.app/public/ca9fd1ad-fe83-4238-8b69-b707c633aef0';
const viewport = { width: 1280, height: 720 };
// Attempt 1 stopped before state capture due to a local metadata-variable bug;
// this second, independently named profile avoids reusing its cache/session.
const profile = join(output, 'R2-COS-attempt-2-profile');
await mkdir(output, { recursive: true });
const errors = [];
const context = await chromium.launchPersistentContext(profile, {
  executablePath: chrome, headless: true, viewport,
  recordVideo: { dir: join(output, 'video'), size: viewport },
  ignoreHTTPSErrors: false,
});
const page = context.pages()[0] ?? await context.newPage();
page.on('pageerror', error => errors.push({ kind: 'pageerror', message: String(error.message).slice(0, 500) }));
page.on('requestfailed', request => errors.push({ kind: 'requestfailed', url: request.url().replace(/[?#].*$/, ''), error: request.failure()?.errorText ?? 'unknown' }));
const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

const readiness = [];
for (let elapsed = 0; elapsed <= 180; elapsed += 10) {
  if (elapsed) await page.waitForTimeout(10000);
  const state = await page.evaluate(() => ({
    text: document.body.innerText.slice(0, 4000), canvas: document.querySelectorAll('canvas').length,
    canvasRect: (() => { const c = document.querySelector('canvas'); if (!c) return null; const r = c.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; })(),
    readyState: document.readyState,
  }));
  readiness.push({ elapsed_seconds: elapsed, ...state });
  if (state.canvas && /points/i.test(state.text) && !/loading|connecting to database/i.test(state.text)) break;
}
const capture = async (suffix, action = null) => {
  const captureId = `r2-cos-ai-model-atlas-${suffix}`;
  const meta = await page.evaluate(({ captureId, action }) => {
    const rect = el => { const r = el.getBoundingClientRect(); return { x:r.x, y:r.y, width:r.width, height:r.height }; };
    const canvas = document.querySelector('canvas');
    const container = canvas?.parentElement ?? document.querySelector('[role="main"]') ?? document.body;
    const cs = getComputedStyle(container);
    const labels = [...document.querySelectorAll('button, input, [role="button"], [role="dialog"], [aria-label]')].slice(0, 100).map(el => ({ tag: el.tagName, text: (el.innerText || el.getAttribute('aria-label') || '').slice(0, 240), aria_label: el.getAttribute('aria-label'), role: el.getAttribute('role') }));
    const resources = performance.getEntriesByType('resource').map(e => { try { const u = new URL(e.name); return { origin: u.origin, pathname: u.pathname, query_keys: [...u.searchParams.keys()].sort(), initiatorType: e.initiatorType }; } catch { return null; }}).filter(Boolean);
    const clean = document.documentElement.cloneNode(true); clean.querySelectorAll('script, iframe, noscript').forEach(n => n.remove());
    return { capture_id: captureId, captured_at: new Date().toISOString(), url: location.href, title: document.title,
      viewport: { width: innerWidth, height: innerHeight, devicePixelRatio }, action,
      graph: { canvas_count: document.querySelectorAll('canvas').length, canvas_rect: canvas ? rect(canvas) : null, container_selector: canvas ? 'canvas.parentElement' : '[role=main]', container_rect: rect(container), webgl: canvas ? Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl')) : false,
        computed_css: { display:cs.display, position:cs.position, width:cs.width, height:cs.height, backgroundColor:cs.backgroundColor, overflow:cs.overflow, zIndex:cs.zIndex } },
      visible_text: document.body.innerText.slice(0, 8000), labels, sanitized_resources: [...new Map(resources.map(x => [JSON.stringify(x),x])).values()], cleaned_dom: '<!doctype html>\n' + clean.outerHTML };
  }, { captureId, action });
  await page.screenshot({ path: join(output, `${suffix}.png`) });
  const cleaned = meta.cleaned_dom; delete meta.cleaned_dom;
  await writeFile(join(output, `${suffix}.observation.json`), JSON.stringify(meta, null, 2));
  await writeFile(join(output, `${suffix}.cleaned.html`), cleaned);
  return meta;
};

const base = await capture('default');
// A missing canvas is a meaningful loading failure, not a reason to wait again.
const box = await page.locator('canvas').first().boundingBox({ timeout: 1000 }).catch(() => null);
const actions = [];
if (box) {
  const p1 = { x: Math.round(box.x + box.width * 0.50), y: Math.round(box.y + box.height * 0.50) };
  await page.mouse.move(p1.x, p1.y); await page.waitForTimeout(1800);
  actions.push({ type: 'hover', point: p1, at_seconds: 'after default + 1.8' }); await capture('hover-center', actions.at(-1));
  await page.mouse.click(p1.x, p1.y); await page.waitForTimeout(2200);
  actions.push({ type: 'click', point: p1, at_seconds: 'after hover + 2.2' }); await capture('click-center', actions.at(-1));
  const p2 = { x: Math.round(box.x + box.width * 0.62), y: Math.round(box.y + box.height * 0.43) };
  await page.mouse.move(p2.x, p2.y); await page.waitForTimeout(1200); await page.mouse.click(p2.x, p2.y); await page.waitForTimeout(2000);
  actions.push({ type: 'click-second', point: p2, at_seconds: 'after first click + 3.2' }); await capture('click-second', actions.at(-1));
  await page.mouse.wheel(0, -720); await page.waitForTimeout(2200);
  actions.push({ type: 'zoom-in', point: p2, at_seconds: 'after second click + 2.2' }); await capture('zoom', actions.at(-1));
  await page.mouse.move(Math.round(box.x + 5), Math.round(box.y + 5)); await page.mouse.click(Math.round(box.x + 5), Math.round(box.y + 5)); await page.waitForTimeout(1500);
  actions.push({ type: 'blank-edge-click', point: { x: Math.round(box.x + 5), y: Math.round(box.y + 5) }, at_seconds: 'after zoom + 1.5' }); await capture('blank-edge', actions.at(-1));
}
const raw = response ? await response.text().catch(() => '') : '';
await writeFile(join(output, 'raw-response.html'), raw);
await writeFile(join(output, 'browser-dom-final.html'), await page.content());
await writeFile(join(output, 'run-observation.json'), JSON.stringify({ profile_name: 'R2-COS', url, final_url: page.url(), response_status: response?.status() ?? null, readiness, actions, errors, base }, null, 2));
await page.waitForTimeout(4000);
await context.close();
