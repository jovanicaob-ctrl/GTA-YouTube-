// Renders the SVG sources in branding/src to the PNG files YouTube asks for.
// Usage: node scripts/render-branding.js   (needs Playwright + Chromium)
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'branding', 'src');
const out = path.join(root, 'branding', 'export');

const jobs = [
  // file, source size, output size, transparent?
  { svg: 'logo.svg', w: 800, h: 800, out: 'logo-800x800.png' },
  { svg: 'banner.svg', w: 2560, h: 1440, out: 'banner-2560x1440.png' },
  { svg: 'watermark.svg', w: 300, h: 300, out: 'watermark-300x300.png', transparent: true },
  { svg: 'thumbnail-template.svg', w: 1280, h: 720, out: 'thumbnail-template-1280x720.png' },
];

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  for (const j of jobs) {
    const page = await browser.newPage({ viewport: { width: j.w, height: j.h }, deviceScaleFactor: 1 });
    const svg = fs.readFileSync(path.join(src, j.svg), 'utf8');
    await page.setContent(
      `<html><body style="margin:0;background:${j.transparent ? 'transparent' : '#000'}">${svg}</body></html>`
    );
    await page.screenshot({ path: path.join(out, j.out), omitBackground: !!j.transparent, type: 'png' });
    await page.close();
    console.log('wrote', j.out);
  }

  // Device preview: how the banner is cropped on TV, desktop and mobile.
  const banner = fs.readFileSync(path.join(src, 'banner.svg'), 'utf8');
  const b64 = Buffer.from(banner).toString('base64');
  const page = await browser.newPage({ viewport: { width: 1280, height: 1040 }, deviceScaleFactor: 1 });
  await page.setContent(`
    <html><body style="margin:0;background:#111;font:600 16px Inter,sans-serif;color:#eee;padding:20px">
      <div>TV (full 2560x1440)</div>
      <div style="position:relative;width:640px;height:360px;background:url(data:image/svg+xml;base64,${b64}) 0 0/640px 360px">
        <div style="position:absolute;left:${507 / 4}px;top:${508 / 4}px;width:${1546 / 4}px;height:${424 / 4}px;outline:2px solid #ff0"></div>
      </div>
      <div style="margin-top:16px">Desktop (2560x423 strip)</div>
      <div style="width:1240px;height:${(423 * 1240) / 2560}px;background:url(data:image/svg+xml;base64,${b64}) 0 ${-((1440 - 423) / 2) * (1240 / 2560)}px/1240px ${1440 * (1240 / 2560)}px"></div>
      <div style="margin-top:16px">Mobile / all devices safe area (1546x423)</div>
      <div style="width:780px;height:${(423 * 780) / 1546}px;background:url(data:image/svg+xml;base64,${b64}) ${-507 * (780 / 1546)}px ${-508 * (780 / 1546)}px/${2560 * (780 / 1546)}px ${1440 * (780 / 1546)}px"></div>
    </body></html>`);
  await page.screenshot({ path: path.join(out, 'banner-device-preview.png'), fullPage: true });
  console.log('wrote banner-device-preview.png');
  await browser.close();
})();
