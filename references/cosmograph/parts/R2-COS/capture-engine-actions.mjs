import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { inflateSync } from 'node:zlib';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const output = process.env.CAPTURE_OUTPUT_DIR;
if (!output || !process.env.CHROME_EXECUTABLE) throw new Error('Required environment variables are absent.');
await mkdir(output, { recursive: true });
const url = 'https://cosmosgl.github.io/graph/?path=/story/examples-get-started--actions';
const viewport = { width: 1280, height: 720 };
const started = Date.now();
const offsets = () => Number(((Date.now() - started) / 1000).toFixed(3));
const events = [];
const errors = [];
const backgroundPointFromPng = (png, bounds) => {
  let offset = 8; let width; let height; let bpp; const compressed = [];
  while (offset < png.length) {
    const len = png.readUInt32BE(offset); const type = png.toString('ascii', offset + 4, offset + 8); const data = png.subarray(offset + 8, offset + 8 + len); offset += len + 12;
    if (type === 'IHDR') { width = data.readUInt32BE(0); height = data.readUInt32BE(4); bpp = data[9] === 6 ? 4 : data[9] === 2 ? 3 : 0; if (data[8] !== 8 || !bpp) throw new Error('Unexpected screenshot PNG format.'); }
    if (type === 'IDAT') compressed.push(data);
    if (type === 'IEND') break;
  }
  const raw = inflateSync(Buffer.concat(compressed)); const stride = width * bpp; const pixels = Buffer.alloc(height * stride); let source = 0;
  for (let y = 0; y < height; y++) { const filter = raw[source++]; const row = pixels.subarray(y * stride, (y + 1) * stride); for (let x = 0; x < stride; x++) { const a = x >= bpp ? row[x - bpp] : 0; const b = y ? pixels[(y - 1) * stride + x] : 0; const c = y && x >= bpp ? pixels[(y - 1) * stride + x - bpp] : 0; const value = raw[source++]; if (filter === 0) row[x] = value; else if (filter === 1) row[x] = (value + a) & 255; else if (filter === 2) row[x] = (value + b) & 255; else if (filter === 3) row[x] = (value + Math.floor((a + b) / 2)) & 255; else if (filter === 4) { const p = a + b - c; const pa = Math.abs(p - a); const pb = Math.abs(p - b); const pc = Math.abs(p - c); row[x] = (value + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 255; } else throw new Error('Unknown PNG filter.'); } }
  const isBackground = (x, y) => { const i = y * stride + x * bpp; return pixels[i] === 45 && pixels[i + 1] === 49 && pixels[i + 2] === 58; };
  const isNodeColor = (x, y) => { const i = y * stride + x * bpp; return pixels[i] >= 35 && pixels[i] <= 110 && pixels[i + 1] >= 45 && pixels[i + 1] <= 130 && pixels[i + 2] >= 75 && pixels[i + 2] <= 220; };
  let best = null;
  for (let y = Math.round(bounds.y + 70); y < Math.round(bounds.y + bounds.height - 25); y += 3) for (let x = Math.round(bounds.x + bounds.width * 0.52); x < Math.round(bounds.x + bounds.width - 25); x += 3) { if (!isBackground(x, y)) continue; let score = 0; for (let dy = -25; dy <= 25; dy += 2) for (let dx = -25; dx <= 25; dx += 2) if (isNodeColor(x + dx, y + dy)) score++; if (!best || score < best.score) best = { x, y, score }; }
  if (best) return { x: best.x, y: best.y };
  throw new Error('No exact background pixel found for a non-node click.');
};
const pointFromPng = (png, bounds, avoid = null) => {
  let offset = 8; let width; let height; let bpp; const compressed = [];
  while (offset < png.length) { const len = png.readUInt32BE(offset); const type = png.toString('ascii', offset + 4, offset + 8); const data = png.subarray(offset + 8, offset + 8 + len); offset += len + 12; if (type === 'IHDR') { width = data.readUInt32BE(0); height = data.readUInt32BE(4); bpp = data[9] === 6 ? 4 : data[9] === 2 ? 3 : 0; if (data[8] !== 8 || !bpp) throw new Error('Unexpected screenshot PNG format.'); } if (type === 'IDAT') compressed.push(data); if (type === 'IEND') break; }
  const raw = inflateSync(Buffer.concat(compressed)); const stride = width * bpp; const pixels = Buffer.alloc(height * stride); let source = 0;
  for (let y = 0; y < height; y++) { const filter = raw[source++]; const row = pixels.subarray(y * stride, (y + 1) * stride); for (let x = 0; x < stride; x++) { const a = x >= bpp ? row[x - bpp] : 0; const b = y ? pixels[(y - 1) * stride + x] : 0; const c = y && x >= bpp ? pixels[(y - 1) * stride + x - bpp] : 0; const v = raw[source++]; row[x] = filter === 0 ? v : filter === 1 ? (v + a) & 255 : filter === 2 ? (v + b) & 255 : filter === 3 ? (v + Math.floor((a + b) / 2)) & 255 : (() => { const p = a + b - c; const pa = Math.abs(p - a); const pb = Math.abs(p - b); const pc = Math.abs(p - c); return (v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 255 })(); } }
  const blue = (x, y) => { const i = y * stride + x * bpp; return pixels[i] >= 35 && pixels[i] <= 110 && pixels[i + 1] >= 45 && pixels[i + 1] <= 130 && pixels[i + 2] >= 75 && pixels[i + 2] <= 220; };
  for (let y = Math.round(bounds.y + 70); y < Math.round(bounds.y + bounds.height - 20); y += 2) for (let x = Math.round(bounds.x + bounds.width * 0.54); x < Math.round(bounds.x + bounds.width - 20); x += 2) { if (avoid && Math.hypot(x - avoid.x, y - avoid.y) < 100) continue; if (!blue(x, y)) continue; let nearby = 0; for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) if (blue(x + dx, y + dy)) nearby++; if (nearby >= 30) return { x, y }; }
  throw new Error('No rendered node-color cluster found for point click.');
};
let context;
try {
  context = await chromium.launchPersistentContext(join(output, 'R2-COS-engine-actions-profile'), {
    executablePath: process.env.CHROME_EXECUTABLE, headless: true, viewport,
    recordVideo: { dir: join(output, 'video'), size: viewport }, ignoreHTTPSErrors: false,
  });
  const page = context.pages()[0] ?? await context.newPage();
  page.on('console', message => events.push({ offset_seconds: offsets(), type: 'console', text: message.text().slice(0, 500) }));
  page.on('pageerror', error => errors.push({ kind: 'pageerror', message: error.message.slice(0, 500) }));
  page.on('requestfailed', request => errors.push({ kind: 'requestfailed', url: request.url().replace(/[?#].*$/, ''), error: request.failure()?.errorText ?? 'unknown' }));
  const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('#storybook-preview-iframe', { timeout: 30000 });
  const iframe = page.locator('#storybook-preview-iframe');
  let frame;
  for (let waited = 0; waited < 30 && !frame; waited += 1) {
    frame = page.frames().find(f => /iframe\.html.*examples-get-started--actions/.test(f.url()));
    if (!frame) await page.waitForTimeout(1000);
  }
  if (!frame) throw new Error('Official Actions preview iframe was absent.');
  await frame.locator('canvas').first().waitFor({ state: 'visible', timeout: 120000 });
  await frame.waitForTimeout(5000);
  const canvas = frame.locator('canvas').first();
  const localBox = await canvas.boundingBox({ timeout: 1000 });
  const iframeBox = await iframe.boundingBox();
  if (!localBox || !iframeBox) throw new Error('Canvas/iframe bounds were unavailable after readiness.');
  const capture = async (state, action = null) => {
    const captureId = `r2-cos-engine-actions-${state}`;
    const meta = await frame.evaluate(({ captureId, state, action }) => {
      const canvas = document.querySelector('canvas');
      const graph = canvas?.parentElement ?? document.body;
      const r = graph.getBoundingClientRect(); const c = canvas?.getBoundingClientRect(); const cs = getComputedStyle(graph);
      const clean = document.documentElement.cloneNode(true); clean.querySelectorAll('script, noscript').forEach(n => n.remove());
      return { capture_id: captureId, state, captured_at: new Date().toISOString(), action,
        viewport: { width: innerWidth, height: innerHeight, devicePixelRatio }, visible_text: document.body.innerText,
        graph: { canvas_count: document.querySelectorAll('canvas').length, canvas_rect: c ? { x:c.x,y:c.y,width:c.width,height:c.height } : null,
          container_selector: 'canvas.parentElement', container_rect: {x:r.x,y:r.y,width:r.width,height:r.height},
          webgl: Boolean(canvas?.getContext('webgl2') || canvas?.getContext('webgl')),
          computed_css: { display:cs.display, position:cs.position, width:cs.width, height:cs.height, backgroundColor:cs.backgroundColor, overflow:cs.overflow } },
        cleaned_dom: '<!doctype html>\n' + clean.outerHTML };
    }, { captureId, state, action });
    await page.screenshot({ path: join(output, `${state}.png`) });
    const cleaned = meta.cleaned_dom; delete meta.cleaned_dom;
    await writeFile(join(output, `${state}.observation.json`), JSON.stringify({ ...meta, video_offset_seconds: offsets(), events: [...events] }, null, 2));
    await writeFile(join(output, `${state}.cleaned.html`), cleaned);
  };
  await capture('default');
  // Locate a rendered point-color cluster in the screenshot; this reads pixels only.
  const p1 = pointFromPng(await page.screenshot(), iframeBox);
  await page.mouse.move(p1.x, p1.y); await page.waitForTimeout(1500);
  events.push({ offset_seconds: offsets(), type: 'action', name: 'hover-node-candidate-1', point: p1 }); await capture('hover-node-1', events.at(-1));
  await page.mouse.click(p1.x, p1.y); await page.waitForTimeout(2500);
  events.push({ offset_seconds: offsets(), type: 'action', name: 'click-node-1', point: p1 }); await capture('selected-node-1', events.at(-1));
  const firstIndex = events.find(e => e.type === 'console' && /Clicked point index:/.test(e.text));
  if (!firstIndex) throw new Error('Candidate 1 produced no official onPointClick callback; selection is not claimed.');
  const away = { x: Math.round(iframeBox.x + 930), y: Math.round(iframeBox.y + 350) };
  await page.mouse.move(away.x, away.y); await page.waitForTimeout(1500);
  events.push({ offset_seconds: offsets(), type: 'action', name: 'move-away-after-selection', point: away }); await capture('selection-persists-away', events.at(-1));
  const p2 = pointFromPng(await page.screenshot(), iframeBox, p1);
  await page.mouse.move(p2.x, p2.y); await page.waitForTimeout(1000); await page.mouse.click(p2.x, p2.y); await page.waitForTimeout(2500);
  events.push({ offset_seconds: offsets(), type: 'action', name: 'click-node-2', point: p2 }); await capture('selected-node-2', events.at(-1));
  const pointCallbacks = events.filter(e => e.type === 'console' && /Clicked point index:/.test(e.text));
  if (pointCallbacks.length < 2 || pointCallbacks[0].text === pointCallbacks.at(-1).text) throw new Error('Candidate 2 produced no distinct official onPointClick callback; second selection is not claimed.');
  await frame.getByText('Pause', { exact: true }).click(); await page.waitForTimeout(500);
  events.push({ offset_seconds: offsets(), type: 'action', name: 'pause-example-before-background-pick' });
  const blank = backgroundPointFromPng(await page.screenshot(), iframeBox);
  await page.mouse.click(blank.x, blank.y); await page.waitForTimeout(1800);
  events.push({ offset_seconds: offsets(), type: 'action', name: 'click-blank-canvas', point: blank }); await capture('blank-clears-selection', events.at(-1));
  if (!events.some(e => e.type === 'console' && /Clicked background/.test(e.text))) throw new Error('Blank candidate produced no official onBackgroundClick callback; clearing is not claimed.');
  const raw = response ? await response.text().catch(() => '') : '';
  await writeFile(join(output, 'raw-response.html'), raw);
  await writeFile(join(output, 'browser-dom.html'), await page.content());
  await writeFile(join(output, 'run-observation.json'), JSON.stringify({ capture_id: 'r2-cos-engine-actions-run', source_url: url, final_url: page.url(), preview_url: frame.url(), profile_name: 'R2-COS-engine-actions-profile', viewport: { ...viewport, devicePixelRatio: 1 }, actions: events, errors }, null, 2));
  await page.waitForTimeout(3000);
} catch (error) {
  await writeFile(join(output, 'run-error.json'), JSON.stringify({ capture_id: 'r2-cos-engine-actions-run', error: String(error.message ?? error), actions: events, errors }, null, 2));
  throw error;
} finally {
  await context?.close();
}
