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

    // Test 1: Standard Motion Check
    console.log("\n[Test 1] Standard Motion Check:");
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
    if (Math.abs(deltaX) > 5) {
      console.log("✓ PASS: Animation is actively gliding continuously!");
    } else {
      console.error("✗ FAIL: Animation did not move!");
    }

    // Test 2: prefers-reduced-motion Emulation
    console.log("\n[Test 2] prefers-reduced-motion: reduce Emulation:");
    await callPage("Emulation.setEmulatedMedia", {
      media: "screen",
      features: [{ name: "prefers-reduced-motion", value: "reduce" }]
    });
    await new Promise(r => setTimeout(r, 500));

    const test2 = await callPage("Runtime.evaluate", {
      expression: `(() => {
        const el = document.querySelector('.alliance-marquee-group');
        const cs = window.getComputedStyle(el);
        return {
          animationName: cs.animationName,
          animationDuration: cs.animationDuration,
          animationPlayState: cs.animationPlayState,
          animation: cs.animation
        };
      })()`,
      returnByValue: true
    });
    console.log("Reduced-motion CSS Computed State:", test2.result.value);

    // Track movement under reduced motion
    const rmPos1 = await callPage("Runtime.evaluate", {
      expression: `document.querySelector('.alliance-marquee-group').getBoundingClientRect().x`,
      returnByValue: true
    });
    await new Promise(r => setTimeout(r, 1500));
    const rmPos2 = await callPage("Runtime.evaluate", {
      expression: `document.querySelector('.alliance-marquee-group').getBoundingClientRect().x`,
      returnByValue: true
    });
    const rmDeltaX = rmPos2.result.value - rmPos1.result.value;
    console.log(`Initial X: ${rmPos1.result.value.toFixed(2)}px | After 1.5s X: ${rmPos2.result.value.toFixed(2)}px | Delta: ${rmDeltaX.toFixed(2)}px`);
    if (Math.abs(rmDeltaX) > 5) {
      console.log("✓ PASS: Animation continues gliding even under macOS 'Reduce Motion' system setting!");
    } else {
      console.error("✗ FAIL: Animation was stopped under reduced motion!");
    }

  } finally {
    chrome.kill("SIGTERM");
  }
}

main().catch(err => {
  console.error("Verification error:", err);
  process.exit(1);
});
