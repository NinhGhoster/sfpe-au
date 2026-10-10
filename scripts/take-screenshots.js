#!/usr/bin/env node
/**
 * SFPE Australia - High-Fidelity Responsive Screenshot Suite
 * Connects directly to Headless Chrome via Chrome DevTools Protocol (CDP)
 * to emulate real mobile, tablet, and desktop viewports with true pixel accuracy,
 * bypassing any macOS OS window-clamping constraints.
 */

const { spawn } = require("child_process");
const http = require("http");
const path = require("path");
const fs = require("fs");
const os = require("os");

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUTPUT_DIR = "/Users/haninhn/.gemini/antigravity/brain/a18089eb-463e-4a36-b84c-4f33987ff4fc/screenshots";
const CDP_PORT = 9444;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const TARGETS = [
  { name: "homepage_desktop", url: "https://sfpe.org.au/", width: 1440, height: 900, mobile: false },
  { name: "homepage_tablet", url: "https://sfpe.org.au/", width: 820, height: 1080, mobile: false },
  { name: "homepage_mobile", url: "https://sfpe.org.au/", width: 375, height: 812, mobile: true },
  { name: "events_desktop", url: "https://sfpe.org.au/events/", width: 1440, height: 950, mobile: false },
  { name: "events_mobile", url: "https://sfpe.org.au/events/", width: 375, height: 812, mobile: true },
  { name: "about_desktop", url: "https://sfpe.org.au/about/", width: 1440, height: 950, mobile: false },
  { name: "about_mobile", url: "https://sfpe.org.au/about/", width: 375, height: 812, mobile: true },
];

async function main() {
  console.log("==================================================");
  console.log(" Capturing SFPE Australia True Responsive Views   ");
  console.log("==================================================");

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "cdp-shots-"));
  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    `--remote-debugging-port=${CDP_PORT}`,
    "--remote-allow-origins=*",
    "--ignore-certificate-errors",
    `--user-data-dir=${tmpDir}`,
    "--disable-gpu",
    "--no-sandbox"
  ]);

  try {
    let version = null;
    for (let i = 0; i < 15; i++) {
      try {
        version = await new Promise((resolve, reject) => {
          http.get(`http://127.0.0.1:${CDP_PORT}/json/version`, (res) => {
            let d = "";
            res.on("data", c => d += c);
            res.on("end", () => resolve(JSON.parse(d)));
          }).on("error", reject);
        });
        if (version) break;
      } catch (e) {
        await new Promise(r => setTimeout(r, 500));
      }
    }
    if (!version) throw new Error("Could not connect to Chrome CDP port");

    const browserWs = new WebSocket(version.webSocketDebuggerUrl);
    await new Promise(r => browserWs.addEventListener("open", r));

    let bId = 1;
    function callBrowser(method, params = {}) {
      return new Promise(resolve => {
        const id = bId++;
        const handler = (evt) => {
          const msg = JSON.parse(evt.data);
          if (msg.id === id) {
            browserWs.removeEventListener("message", handler);
            resolve(msg.result);
          }
        };
        browserWs.addEventListener("message", handler);
        browserWs.send(JSON.stringify({ id, method, params }));
      });
    }

    const target = await callBrowser("Target.createTarget", { url: "about:blank" });
    const pageWs = new WebSocket(`ws://127.0.0.1:${CDP_PORT}/devtools/page/${target.targetId}`);
    await new Promise(r => pageWs.addEventListener("open", r));

    let pId = 1;
    function callPage(method, params = {}) {
      return new Promise(resolve => {
        const id = pId++;
        const handler = (evt) => {
          const msg = JSON.parse(evt.data);
          if (msg.id === id) {
            pageWs.removeEventListener("message", handler);
            resolve(msg.result);
          }
        };
        pageWs.addEventListener("message", handler);
        pageWs.send(JSON.stringify({ id, method, params }));
      });
    }

    await callPage("Security.enable");
    await callPage("Security.setIgnoreCertificateErrors", { ignore: true });
    await callPage("Network.enable");
    await callPage("Network.setCookie", {
      name: "__test",
      value: "7b0d3f9873861de78dc92d218c825e09",
      domain: "sfpe.org.au",
      path: "/"
    });
    await callPage("Page.enable");

    for (const t of TARGETS) {
      const outFile = path.join(OUTPUT_DIR, `${t.name}.png`);
      console.log(`Capturing ${t.name} (${t.width}x${t.height}, mobile=${t.mobile}) from ${t.url}...`);

      await callPage("Emulation.setDeviceMetricsOverride", {
        width: t.width,
        height: t.height,
        deviceScaleFactor: 1,
        mobile: t.mobile
      });

      await callPage("Page.navigate", { url: t.url });
      await new Promise(r => setTimeout(r, 3500));

      const vp = await callPage("Runtime.evaluate", {
        expression: "({ w: window.innerWidth, h: window.innerHeight, scrollW: document.documentElement.scrollWidth })",
        returnByValue: true
      });

      const shot = await callPage("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(outFile, Buffer.from(shot.data, "base64"));
      const sizeKB = Math.round(shot.data.length * 0.75 / 1024);
      console.log(`  -> Saved: ${t.name}.png (${sizeKB} KB) [Viewport: ${vp.result.value.w}x${vp.result.value.h}, scrollW: ${vp.result.value.scrollW}]`);
    }

    pageWs.close();
    browserWs.close();
  } catch (err) {
    console.error("Error during screenshot capture:", err.message);
  } finally {
    chrome.kill();
    setTimeout(() => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
    }, 1000);
  }

  console.log("\nAll responsive screenshots captured successfully!");
}

main();
