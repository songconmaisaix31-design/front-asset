import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const output = process.env.CAPTURE_OUTPUT_DIR;
if (!output || !process.env.CHROME_EXECUTABLE) throw new Error('Required environment variables are absent.');
await mkdir(output, { recursive: true });
const url = 'https://cosmosgl.github.io/graph/?path=/story/examples-get-started--actions';
const errors = [];
let context;
try {
  context = await chromium.launchPersistentContext(join(output, 'R2-COS-engine-discovery-profile'), {
    executablePath: process.env.CHROME_EXECUTABLE, headless: true, viewport: { width: 1280, height: 720 },
    recordVideo: { dir: join(output, 'video'), size: { width: 1280, height: 720 } }, ignoreHTTPSErrors: false,
  });
  const page = context.pages()[0] ?? await context.newPage();
  page.on('pageerror', e => errors.push({ kind: 'pageerror', message: e.message.slice(0, 500) }));
  page.on('requestfailed', r => errors.push({ kind: 'requestfailed', url: r.url().replace(/[?#].*$/, ''), error: r.failure()?.errorText ?? 'unknown' }));
  const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(75000);
  const frames = page.frames();
  const frameInfo = [];
  for (const frame of frames) {
    const text = await frame.locator('body').innerText().catch(() => '');
    frameInfo.push({ url: frame.url(), text: text.slice(0, 10000), canvas_count: await frame.locator('canvas').count().catch(() => 0) });
  }
  await page.screenshot({ path: join(output, 'discover-actions-page.png') });
  const preview = frames.find(f => /iframe\.html/.test(f.url()) && f !== page.mainFrame()) ?? page.mainFrame();
  const previewCanvas = await preview.locator('canvas').first().boundingBox({ timeout: 1000 }).catch(() => null);
  await writeFile(join(output, 'discover-actions-dom.html'), await page.content());
  await writeFile(join(output, 'discover-actions.json'), JSON.stringify({ capture_id: 'r2-cos-engine-actions-discover', url, final_url: page.url(), status: response?.status() ?? null, viewport: { width: 1280, height: 720, devicePixelRatio: 1 }, preview_url: preview.url(), preview_canvas: previewCanvas, frame_info: frameInfo, errors }, null, 2));
  await page.waitForTimeout(3000);
} finally {
  await context?.close();
}
