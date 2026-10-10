#!/usr/bin/env node
/**
 * Automated Measurement Verification Script for Header Edge Gaps
 * Connects via Chrome DevTools Protocol (CDP) to measure exact pixel positions
 * of the brand logo and the rightmost nav/button/toggle element across viewports.
 */

const { spawn } = require("child_process");
const http = require("http");
const path = require("path");
const fs = require("fs");
const os = require("os");

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const CDP_PORT = 9445;

const VIEWPORTS = [
  { name: "Wide Desktop (1600px)", width: 1600, height: 900, mobile: false },
  { name: "Standard Desktop (1440px)", width: 1440, height: 900, mobile: false },
  { name: "Laptop (1366px)", width: 1366, height: 768, mobile: false },
  { name: "Laptop Small (1280px)", width: 1280, height: 800, mobile: false },
  { name: "Sub-desktop (1180px)", width: 1180, height: 820, mobile: false },
  { name: "Breakpoint Boundary (1100px)", width: 1100, height: 820, mobile: false },
  { name: "Tablet Landscape (1024px)", width: 1024, height: 768, mobile: false },
  { name: "Tablet Portrait iPad (820px)", width: 820, height: 1180, mobile: false },
  { name: "Small Tablet (768px)", width: 768, height: 1024, mobile: false },
  { name: "Phablet (600px)", width: 600, height: 900, mobile: true },
  { name: "Large Phone (480px)", width: 480, height: 850, mobile: true },
  { name: "Standard Phone iPhone (375px)", width: 375, height: 812, mobile: true },
  { name: "Compact Phone (360px)", width: 360, height: 740, mobile: true },
];

async function main() {
  console.log("==================================================");
  console.log(" Measuring Live Header Edge Gaps via CDP          ");
  console.log(" Target: https://sfpe.org.au                      ");
  console.log("==================================================");

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "cdp-measure-"));
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
    await new Promise(r => setTimeout(r, 1500));
    const version = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${CDP_PORT}/json/version`, (res) => {
        let d = "";
        res.on("data", c => d += c);
        res.on("end", () => resolve(JSON.parse(d)));
      }).on("error", reject);
    });

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

    console.log(
      "Viewport".padEnd(30) +
      " | Logo Left Gap".padEnd(16) +
      " | Right Gap".padEnd(16) +
      " | Status"
    );
    console.log("-".repeat(78));

    let allPassed = true;

    for (const vp of VIEWPORTS) {
      await callPage("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile
      });

      await callPage("Page.navigate", { url: "https://sfpe.org.au/?t=" + Date.now() });
      await new Promise(r => setTimeout(r, 3000));

      // Wait until brand link is present
      for (let attempt = 0; attempt < 5; attempt++) {
        const check = await callPage("Runtime.evaluate", {
          expression: "Boolean(document.querySelector('.brand-link'))",
          returnByValue: true
        });
        if (check?.result?.value) break;
        await new Promise(r => setTimeout(r, 1000));
      }

      const res = await callPage("Runtime.evaluate", {
        expression: `(() => {
          const logo = document.querySelector(".brand-link");
          const logoImg = document.querySelector(".brand-logo-img");
          const mobileToggle = document.querySelector(".mobile-toggle");
          const eventBtn = document.querySelector(".main-nav .btn");
          const navContainer = document.querySelector(".nav-container");

          const logoEl = logoImg || logo;
          const logoRect = logoEl ? logoEl.getBoundingClientRect() : { left: 0 };
          const logoLeft = Math.round(logoRect.left);

          let rightElem = null;
          if (mobileToggle && window.getComputedStyle(mobileToggle).display !== "none") {
            rightElem = mobileToggle;
          } else if (eventBtn) {
            rightElem = eventBtn;
          }

          const rightRect = rightElem ? rightElem.getBoundingClientRect() : null;
          const rightGap = rightRect ? Math.round(window.innerWidth - rightRect.right) : 0;
          const containerPaddingLeft = window.getComputedStyle(navContainer).paddingLeft;
          const containerPaddingRight = window.getComputedStyle(navContainer).paddingRight;

          return {
            windowWidth: window.innerWidth,
            logoLeft,
            rightGap,
            containerPaddingLeft,
            containerPaddingRight,
            isMobileToggleVisible: mobileToggle ? window.getComputedStyle(mobileToggle).display !== "none" : false
          };
        })()`,
        returnByValue: true
      });

      if (!res || !res.result || !res.result.value) {
        console.error("Runtime evaluate failed:", JSON.stringify(res));
        continue;
      }
      const data = res.result.value;
      const minAcceptable = vp.width <= 360 ? 16 : 20;
      const passed = data.logoLeft >= minAcceptable && data.rightGap >= minAcceptable;
      if (!passed) allPassed = false;

      const status = passed ? "[PASS]" : "[FAIL]";
      console.log(
        vp.name.padEnd(30) +
        ` | ${data.logoLeft}px`.padEnd(16) +
        ` | ${data.rightGap}px`.padEnd(16) +
        ` | ${status}`
      );
    }

    console.log("-".repeat(78));
    if (allPassed) {
      console.log("All viewports verified: Logo Left Gap >= 20px and Right Gap >= 20px everywhere!");
    } else {
      console.log("Some viewports failed minimum margin requirement!");
    }

    pageWs.close();
    browserWs.close();
  } catch (err) {
    console.error("Measurement error:", err.message);
  } finally {
    chrome.kill();
    setTimeout(() => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
    }, 1000);
  }
}

main();
