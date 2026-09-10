import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const playwrightModule = process.env.PLAYWRIGHT_MODULE;
if (!playwrightModule || !process.env.CAPTURE_OUTPUT_DIR || !process.env.CHROME_EXECUTABLE) throw new Error('Set PLAYWRIGHT_MODULE, CAPTURE_OUTPUT_DIR and CHROME_EXECUTABLE to existing task-local tools/paths.');
const { chromium } = require(playwrightModule);

const output = process.env.CAPTURE_OUTPUT_DIR;
const url = 'https://run.cosmograph.app/public/ca9fd1ad-fe83-4238-8b69-b707c633aef0';
const viewport = { width: 1280, height: 720 };
await mkdir(output, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME_EXECUTABLE,
  headless: true,
});
const context = await browser.newContext({
  viewport,
  recordVideo: { dir: join(output, 'video'), size: viewport },
});
const page = await context.newPage();
const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.getByText('points', { exact: true }).waitFor({ state: 'visible', timeout: 90000 });
await page.waitForFunction(() => document.querySelectorAll('canvas').length > 0, null, { timeout: 30000 });
await page.waitForTimeout(3000);

const rawHtml = response ? await response.text() : null;
const captureId = 'cap-02-ai-model-atlas-20260910-default';
const metadata = await page.evaluate(({ captureId }) => {
  const rect = (element) => {
    const r = element.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  };
  const canvas = document.querySelector('canvas');
  const container = canvas?.parentElement ?? document.querySelector('[role="main"]') ?? document.body;
  const style = getComputedStyle(container);
  const sanitizedResources = performance.getEntriesByType('resource').map((entry) => {
    try {
      const resourceUrl = new URL(entry.name);
      resourceUrl.search = '';
      resourceUrl.hash = '';
      return { url: resourceUrl.href, initiatorType: entry.initiatorType };
    } catch {
      return null;
    }
  }).filter(Boolean);
  const clone = document.documentElement.cloneNode(true);
  clone.querySelectorAll('script, iframe, noscript').forEach((node) => node.remove());
  return {
    capture_id: captureId,
    captured_at: new Date().toISOString(),
    url: location.href,
    title: document.title,
    viewport: { width: innerWidth, height: innerHeight, devicePixelRatio },
    graph: {
      canvas_count: document.querySelectorAll('canvas').length,
      canvas_rect: canvas ? rect(canvas) : null,
      container_selector: canvas ? 'canvas.parentElement' : '[role="main"]',
      container_rect: rect(container),
      computed_css: {
        display: style.display, position: style.position, width: style.width,
        height: style.height, backgroundColor: style.backgroundColor,
        overflow: style.overflow, zIndex: style.zIndex,
      },
    },
    accessible_graph_text: document.querySelector('[role="main"]')?.innerText ?? document.body.innerText,
    sanitized_resources: [...new Map(sanitizedResources.map((item) => [item.url, item])).values()],
    cleaned_html: '<!doctype html>\n' + clone.outerHTML,
  };
}, { captureId });

await page.screenshot({ path: join(output, 'ai-model-atlas-playwright-default.png') });
await writeFile(join(output, 'ai-model-atlas-raw-response.html'), rawHtml ?? '', 'utf8');
await writeFile(join(output, 'ai-model-atlas-browser-dom.html'), await page.content(), 'utf8');
await writeFile(join(output, 'ai-model-atlas-cleaned.html'), metadata.cleaned_html, 'utf8');
delete metadata.cleaned_html;
await writeFile(join(output, 'ai-model-atlas-default-observation.json'), JSON.stringify(metadata, null, 2), 'utf8');

const canvasBox = await page.locator('canvas').first().boundingBox().catch(() => null);
if (canvasBox) {
  await page.mouse.click(canvasBox.x + canvasBox.width * 0.56, canvasBox.y + canvasBox.height * 0.50);
  await page.waitForTimeout(3000);
  await page.screenshot({ path: join(output, 'ai-model-atlas-select-attempt.png') });
  await page.mouse.wheel(0, -720);
  await page.waitForTimeout(3000);
  await page.screenshot({ path: join(output, 'ai-model-atlas-zoom-attempt.png') });
}
await page.waitForTimeout(9000);
await context.close();
await browser.close();
