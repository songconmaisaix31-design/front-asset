import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const rawRoot = process.env.CAPTURE_RAW_ROOT;
const chrome = process.env.CHROME_EXECUTABLE;
const require = createRequire(import.meta.url);
if (!rawRoot || !chrome || !process.env.PLAYWRIGHT_PACKAGE) throw new Error('Set CAPTURE_RAW_ROOT, CHROME_EXECUTABLE, and PLAYWRIGHT_PACKAGE before collection.');
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE);
const now = () => new Date().toISOString();
const digest = async p => createHash('sha256').update(await (await import('node:fs/promises')).readFile(p)).digest('hex');
const tidy = s => String(s).replace(/C:\\Users\\[^\\/]+/gi, '<redacted-home>').replace(/cookie/gi, 'cookie');

async function evidence(page, dir, id) {
  await page.screenshot({ path: join(dir, `${id}.png`), fullPage: false });
  const dom = await page.evaluate(() => ({ title: document.title, url: location.href, readyState: document.readyState, text: document.body?.innerText?.slice(0, 5000), canvas: [...document.querySelectorAll('canvas')].map((x, i) => ({ i, width: x.width, height: x.height, rect: x.getBoundingClientRect().toJSON() })), body: document.body?.getBoundingClientRect().toJSON() }));
  await writeFile(join(dir, `${id}.dom.json`), JSON.stringify(dom, null, 2));
  const css = await page.evaluate(() => [...document.querySelectorAll('canvas, main, #app, #root, [role="main"]')].slice(0, 8).map((el, i) => { const r=el.getBoundingClientRect(), c=getComputedStyle(el); return {i, selector:el.id ? `#${el.id}` : el.tagName.toLowerCase(), rect:{x:r.x,y:r.y,width:r.width,height:r.height}, style:{display:c.display,position:c.position,width:c.width,height:c.height,backgroundColor:c.backgroundColor,opacity:c.opacity,transform:c.transform}}; }));
  await writeFile(join(dir, `${id}.css.json`), JSON.stringify(css, null, 2));
  return { dom, screenshot: await digest(join(dir, `${id}.png`)) };
}

async function runStarAtlas() {
  const dir = join(rawRoot, 'star-atlas', 'attempt-03-enter'); await mkdir(dir, {recursive:true});
  const browser = await chromium.launch({ executablePath: chrome, headless: true, args: ['--disable-gpu=false'] });
  const context = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:1, recordVideo:{dir, size:{width:1440,height:900}} });
  const page = await context.newPage(); const errors=[]; const resources=[];
  page.on('console', m => { if (m.type()==='error') errors.push({type:'console', text:tidy(m.text())}); });
  page.on('pageerror', e => errors.push({type:'pageerror', text:tidy(e.message)}));
  page.on('response', r => { if (r.status() >= 400) resources.push({status:r.status(), url:r.url().split('?')[0]}); });
  const started=now(); let navError=null;
  try { await page.goto('https://experience.staratlas.com/', {waitUntil:'domcontentloaded', timeout:60000}); await page.waitForTimeout(12000); } catch(e) { navError=tidy(e.message); }
  const entry = await evidence(page, dir, 'entry');
  let entered = 'not-found';
  try { await page.getByText('PLAY NOW', { exact: true }).click({timeout:5000}); entered='clicked'; await page.waitForTimeout(15000); } catch (e) { entered=`not-clicked: ${tidy(e.message).slice(0,200)}`; }
  const moved = await evidence(page, dir, 'after-enter');
  const recording = page.video(); await context.close(); const finalVideo = recording ? await recording.path() : null; await browser.close();
  await writeFile(join(dir, 'session.json'), JSON.stringify({source:'https://experience.staratlas.com/', started, ended:now(), context_id:'R2-MOT-star-atlas', page_id:'R2-MOT-star-atlas-page-02', viewport:'1440x900', dpr:1, navError, entered, errors, resources, entry, moved, video:finalVideo && {path:finalVideo,sha256:await digest(finalVideo)}},null,2));
}

async function runGround() {
  const dir = join(rawRoot, 'ground', 'attempt-01'); await mkdir(dir,{recursive:true});
  const browser = await chromium.launch({executablePath:chrome,headless:true,args:['--disable-gpu=false']});
  const context = await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,recordVideo:{dir,size:{width:1440,height:900}}});
  const page=await context.newPage(); const errors=[]; page.on('console',m=>{if(m.type()==='error')errors.push(tidy(m.text()))}); page.on('pageerror',e=>errors.push(tidy(e.message)));
  const started=now(); await page.goto('https://stellarium-web.org/',{waitUntil:'domcontentloaded',timeout:60000}); await page.waitForTimeout(15000);
  const initial=await evidence(page,dir,'ground-initial');
  const canvas=page.locator('canvas').first(); const box=await canvas.boundingBox(); let action='no-canvas';
  if(box){ await page.mouse.move(box.x+box.width/2,box.y+box.height*0.72); await page.mouse.down(); await page.mouse.move(box.x+box.width/2,box.y+box.height*0.22,{steps:18}); await page.mouse.up(); action='drag-upward-pointer'; await page.waitForTimeout(3000); }
  const sky=await evidence(page,dir,'sky-after-upward-drag');
  const recording=page.video(); await context.close(); const finalVideo=recording?await recording.path():null; await browser.close();
  await writeFile(join(dir,'session.json'),JSON.stringify({source:'https://stellarium-web.org/',started,ended:now(),context_id:'R2-MOT-ground',page_id:'R2-MOT-ground-page-01',viewport:'1440x900',dpr:1,action,errors,initial,sky,video:finalVideo&&{path:finalVideo,sha256:await digest(finalVideo)}},null,2));
}

if (process.env.CAPTURE_MODE !== 'ground') await runStarAtlas();
if (process.env.CAPTURE_MODE !== 'star') await runGround();
