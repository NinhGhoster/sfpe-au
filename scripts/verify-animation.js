#!/usr/bin/env node
const { spawn } = require("child_process");
const http = require("http");
const path = require("path");
const fs = require("fs");
const os = require("os");

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const CDP_PORT = 9449;

async function main() {
  console.log("==================================================");
  console.log(" Verifying Marquee Continuous Animation on Live   ");
  console.log(" Target: https://sfpe.org.au/about/              ");
  console.log("==================================================");

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "cdp-anim-"));
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
    await callPage("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
      mobile: false
    });

    console.log("Navigating to https://sfpe.org.au/about/ ...");
    await callPage("Page.navigate", { url: "https://sfpe.org.au/about/" });
    await new Promise(r => setTimeout(r, 3000));

    // Test 1: Standard Motion Check (mouse NOT hovering)
    console.log("\n[Test 1] Standard Motion Check (mouse outside):");
    const test1 = await callPage("Runtime.evaluate", {
      expression: `(() => {
        const el = document.querySelector('.alliance-marquee-group');
        if (!el) return { found: false };
        const cs = window.getComputedStyle(el);
        return {
          found: true,
          animationName: cs.animationName,
          animationDuration: cs.animationDuration,
          animationPlayState: cs.animationPlayState,
          transform: cs.transform
        };
      })()`,
      returnByValue: true
    });
    console.log("CSS Computed State:", test1.result.value);

    // Track movement over 1.5 seconds
    const pos1 = await callPage("Runtime.evaluate", {
      expression: `document.querySelector('.alliance-marquee-group').getBoundingClientRect().x`,
      returnByValue: true
    });
    await new Promise(r => setTimeout(r, 1500));
    const pos2 = await callPage("Runtime.evaluate", {
      expression: `document.querySelector('.alliance-marquee-group').getBoundingClientRect().x`,
      returnByValue: true
    });
    const deltaX = pos2.result.value - pos1.result.value;
    console.log(`Initial X: ${pos1.result.value.toFixed(2)}px | After 1.5s X: ${pos2.result.value.toFixed(2)}px | Delta: ${deltaX.toFixed(2)}px`);
    if (Math.abs(deltaX) > 2) {
      console.log("✓ PASS: Animation is actively gliding when mouse is outside!");
    } else {
      console.error("✗ FAIL: Animation did not move!");
    }

    // Test 2: Hover Pause Check (mouse pointer inside)
    console.log("\n[Test 2] Hover Pause Check (mouse pointing inside):");
    const wrapRect = await callPage("Runtime.evaluate", {
      expression: `(() => {
        const wrap = document.querySelector('.alliance-marquee-wrap');
        wrap.scrollIntoView({ behavior: 'instant', block: 'center' });
        const rect = wrap.getBoundingClientRect();
        return { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) };
      })()`,
      returnByValue: true
    });

    // Dispatch mouse move into the marquee wrapper
    await callPage("Input.dispatchMouseEvent", {
      type: "mouseMoved",
      x: wrapRect.result.value.x,
      y: wrapRect.result.value.y
    });
    await new Promise(r => setTimeout(r, 300));

    const hoverState = await callPage("Runtime.evaluate", {
      expression: `(() => {
        const el = document.querySelector('.alliance-marquee-group');
        const cs = window.getComputedStyle(el);
        return {
          animationPlayState: cs.animationPlayState
        };
      })()`,
      returnByValue: true
    });
    console.log("Hover CSS Computed State:", hoverState.result.value);

    // Track movement while mouse points in over 1.5 seconds
    const hPos1 = await callPage("Runtime.evaluate", {
      expression: `document.querySelector('.alliance-marquee-group').getBoundingClientRect().x`,
      returnByValue: true
    });
    await new Promise(r => setTimeout(r, 1500));
    const hPos2 = await callPage("Runtime.evaluate", {
      expression: `document.querySelector('.alliance-marquee-group').getBoundingClientRect().x`,
      returnByValue: true
    });
    const hDeltaX = hPos2.result.value - hPos1.result.value;
    console.log(`Hover Initial X: ${hPos1.result.value.toFixed(2)}px | After 1.5s X: ${hPos2.result.value.toFixed(2)}px | Delta: ${hDeltaX.toFixed(2)}px`);
    if (hoverState.result.value.animationPlayState === 'paused' || Math.abs(hDeltaX) < 1) {
      console.log("✓ PASS: Animation STOPS when pointing mouse in!");
    } else {
      console.error("✗ FAIL: Animation did not stop on mouse hover!");
    }

    // Move mouse out
    await callPage("Input.dispatchMouseEvent", {
      type: "mouseMoved",
      x: 0,
      y: 0
    });
    await new Promise(r => setTimeout(r, 300));
    const resumedState = await callPage("Runtime.evaluate", {
      expression: `(() => {
        const el = document.querySelector('.alliance-marquee-group');
        return window.getComputedStyle(el).animationPlayState;
      })()`,
      returnByValue: true
    });
    console.log("Resumed CSS Play State after mouse leaves:", resumedState.result.value);

  } finally {
    chrome.kill("SIGTERM");
  }
}

main().catch(err => {
  console.error("Verification error:", err);
  process.exit(1);
});
