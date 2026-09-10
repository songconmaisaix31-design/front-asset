/* MOT-01: isolated, read-only browser capture helper. Raw outputs stay in the ignored main checkout. */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { chromium } = require('C:/Users/DW/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright');

const task = 'MOT-01';
const rawRoot = 'C:/Users/DW/orca/front-asset/.local-captures/MOT-01';
const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const viewport = { width: 1440, height: 900 };
const pages = [
  { id: 'star-atlas', url: 'https://experience.staratlas.com/', selector: 'canvas, main, body' },
  { id: '100000-stars', url: 'https://stars.chromeexperiments.com/', selector: 'canvas, #container, body' },
].filter(spec => !process.argv[2] || spec.id === process.argv[2]);
const now = () => new Date().toISOString();
const safeURL = value => { try { const u = new URL(value); return u.origin + u.pathname; } catch { return value; } };
const sha = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const write = (file, value) => fs.writeFileSync(file, typeof value === 'string' ? value : JSON.stringify(value, null, 2));
const cleanHTML = html => html.replace(/<script[\s\S]*?<\/script>/gi, '<script removed></script>').replace(/\s(?:src|href)="https?:\/\/[^"?]+(?:\?[^\"]*)?"/gi, m => m.replace(/\?[^\"]*/, ''));

(async () => {
  fs.mkdirSync(rawRoot, { recursive: true });
  const browser = await chromium.launch({ executablePath: chrome, headless: true, args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const all = [];
  for (const spec of pages) {
    const dir = path.join(rawRoot, spec.id);
    const videoDir = path.join(dir, 'video');
    fs.mkdirSync(videoDir, { recursive: true });
    const contextId = `${task}-${spec.id}-ctx-01`;
    const pageId = `${task}-${spec.id}-page-01`;
    const context = await browser.newContext({ viewport, recordVideo: { dir: videoDir, size: viewport }, userAgent: 'MOT-01 isolated evidence capture' });
    const page = await context.newPage();
    let documentText = null;
    page.on('response', async response => { if (response.request().isNavigationRequest() && response.frame() === page.mainFrame()) { try { documentText = await response.text(); } catch {} } });
    const started = now();
    let error = null;
    try {
      await page.goto(spec.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(7000);
      // One bounded alternate sampling pass for the legacy Chrome demo: its star dataset
      // loads after DOM readiness, so wait for the documented loading indicator to clear.
      if (spec.id === '100000-stars') await page.locator('#loadtext').waitFor({ state: 'hidden', timeout: 120000 }).catch(() => {});
      const states = [];
      for (const state of ['entry', 'zoom-in', 'zoom-out']) {
        if (state === 'zoom-in') await page.mouse.wheel(0, -900);
        if (state === 'zoom-out') await page.mouse.wheel(0, 1200);
        await page.mouse.move(viewport.width / 2, viewport.height / 2);
        await page.waitForTimeout(3000);
        const prefix = path.join(dir, state);
        await page.screenshot({ path: `${prefix}.png` });
        const dom = await page.content();
        write(`${prefix}.dom.html`, dom);
        const css = await page.locator(spec.selector).first().evaluate(el => {
          const s = getComputedStyle(el); return { selector: el.tagName.toLowerCase() + (el.id ? '#' + el.id : ''), display: s.display, position: s.position, width: s.width, height: s.height, backgroundColor: s.backgroundColor, opacity: s.opacity, transform: s.transform };
        }).catch(e => ({ error: String(e) }));
        write(`${prefix}.css.json`, css);
        states.push({ state, screenshot: `${state}.png`, dom: `${state}.dom.html`, computed_css: `${state}.css.json`, screenshot_sha256: sha(`${prefix}.png`) });
      }
      await page.waitForTimeout(2500);
      if (documentText !== null) { write(path.join(dir, 'document.raw.html'), documentText); write(path.join(dir, 'document.cleaned.html'), cleanHTML(documentText)); }
      const resources = await page.evaluate(() => performance.getEntriesByType('resource').map(e => e.name));
      write(path.join(dir, 'resources.sanitized.json'), [...new Set(resources.map(u => { try { const x = new URL(u); return x.origin + x.pathname; } catch { return u; } }))]);
      all.push({ id: spec.id, source: spec.url, final_url: safeURL(page.url()), started_at: started, completed_at: now(), context_id: contextId, page_id: pageId, viewport, states, document_saved: documentText !== null, error: null });
    } catch (e) {
      error = String(e.stack || e);
      all.push({ id: spec.id, source: spec.url, final_url: safeURL(page.url()), started_at: started, completed_at: now(), context_id: contextId, page_id: pageId, viewport, states: [], document_saved: documentText !== null, error });
    }
    const video = page.video();
    await context.close();
    if (video) { const vpath = await video.path(); const target = path.join(dir, `${spec.id}-motion.webm`); fs.renameSync(vpath, target); all[all.length - 1].video = { file: path.basename(target), sha256: sha(target) }; }
  }
  await browser.close();
  write(path.join(rawRoot, 'capture-result.json'), { task, tool: { playwright: require('C:/Users/DW/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright/package.json').version, chrome_executable: chrome }, actions: ['goto official source', 'wait for live rendering', 'entry screenshot', 'wheel zoom-in screenshot', 'wheel zoom-out screenshot', 'recorded real page interaction'], captures: all });
})().catch(error => { console.error(error); process.exitCode = 1; });
