#!/usr/bin/env node
const { spawn } = require("child_process");
const http = require("http");
const path = require("path");
const fs = require("fs");
const os = require("os");

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUTPUT_DIR = "/Users/haninhn/.gemini/antigravity/brain/a18089eb-463e-4a36-b84c-4f33987ff4fc/screenshots";
const CDP_PORT = 9448;

async function main() {
  console.log("==================================================");
  console.log(" Verifying Mobile Menu Drawer, Alliances & Footer ");
  console.log("==================================================");

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "cdp-detail-"));
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

    // 1. Mobile Menu Open on /about/
    console.log("Navigating to https://sfpe.org.au/about/ in mobile view (375x812)...");
    await callPage("Emulation.setDeviceMetricsOverride", {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });
    await callPage("Page.navigate", { url: "https://sfpe.org.au/about/" });
    await new Promise(r => setTimeout(r, 3000));

    // Scroll to Executive Leadership section in mobile
    await callPage("Runtime.evaluate", {
      expression: `(() => {
        const sec = document.querySelector('.exec-grid');
        if (sec) sec.scrollIntoView({ block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 600));
    const mobileExecShot = await callPage("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(OUTPUT_DIR, "about_exec_mobile.png"), Buffer.from(mobileExecShot.data, "base64"));
    console.log("Saved: about_exec_mobile.png");

    // Scroll back to top
    await callPage("Runtime.evaluate", { expression: "window.scrollTo(0, 0);" });
    await new Promise(r => setTimeout(r, 400));

    // Click mobile menu toggle
    console.log("Opening mobile drawer...");
    const clickRes = await callPage("Runtime.evaluate", {
      expression: `(() => {
        const btn = document.querySelector('.mobile-toggle');
        if (btn) {
          btn.click();
          return { clicked: true };
        }
        return { clicked: false };
      })()`,
      returnByValue: true
    });
    console.log("Toggle clicked:", clickRes.result.value);
    await new Promise(r => setTimeout(r, 600));

    // Capture drawer
    const drawerShot = await callPage("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(OUTPUT_DIR, "mobile_nav_drawer_open.png"), Buffer.from(drawerShot.data, "base64"));
    console.log("Saved: mobile_nav_drawer_open.png");

    // Check computed styles of active nav link in mobile drawer
    const navStyle = await callPage("Runtime.evaluate", {
      expression: `(() => {
        const activeLink = document.querySelector('.nav-links .nav-link.active');
        if (!activeLink) return null;
        const rect = activeLink.getBoundingClientRect();
        const style = window.getComputedStyle(activeLink);
        const parentRect = activeLink.parentElement.getBoundingClientRect();
        return {
          text: activeLink.textContent.trim(),
          width: rect.width,
          parentWidth: parentRect.width,
          display: style.display,
          bgColor: style.backgroundColor,
          borderLeft: style.borderLeft,
          padding: style.padding
        };
      })()`,
      returnByValue: true
    });
    console.log("Active Nav Link Metrics in Mobile Drawer:", navStyle.result.value);

    // 2. Alliances marquee section on /about/ (Desktop)
    console.log("\nInspecting Alliances marquee on desktop (1440x950)...");
    await callPage("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 950,
      deviceScaleFactor: 1,
      mobile: false
    });
    await callPage("Page.navigate", { url: "https://sfpe.org.au/about/" });
    await new Promise(r => setTimeout(r, 3000));

    // Scroll to Executive Leadership section
    await callPage("Runtime.evaluate", {
      expression: `(() => {
        const sec = document.querySelector('.exec-grid');
        if (sec) sec.scrollIntoView({ block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 800));
    const execShot = await callPage("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(OUTPUT_DIR, "about_exec_section.png"), Buffer.from(execShot.data, "base64"));
    console.log("Saved: about_exec_section.png");

    // Scroll to alliances section
    await callPage("Runtime.evaluate", {
      expression: `(() => {
        const sec = document.querySelector('.alliance-marquee-wrap');
        if (sec) sec.scrollIntoView({ block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 800));

    const allianceShot = await callPage("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(OUTPUT_DIR, "about_alliances_marquee.png"), Buffer.from(allianceShot.data, "base64"));
    console.log("Saved: about_alliances_marquee.png");

    // Check count and names of alliance cards
    const allianceInfo = await callPage("Runtime.evaluate", {
      expression: `(() => {
        const cards = Array.from(document.querySelectorAll('.alliance-card'));
        return {
          totalCards: cards.length,
          titles: Array.from(new Set(cards.map(c => c.querySelector('.alliance-title')?.textContent.trim()))),
          hasFlare: cards.some(c => c.textContent.includes('FLARE')),
          hasCorsica: cards.some(c => c.textContent.includes('CNRS') || c.textContent.includes('Corse'))
        };
      })()`,
      returnByValue: true
    });
    console.log("Alliances Section Details:", allianceInfo.result.value);

    // 3. Footer on /about/
    await callPage("Runtime.evaluate", {
      expression: `(() => {
        window.scrollTo(0, document.body.scrollHeight);
      })()`
    });
    await new Promise(r => setTimeout(r, 800));

    const footerShot = await callPage("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(OUTPUT_DIR, "footer_view.png"), Buffer.from(footerShot.data, "base64"));
    console.log("Saved: footer_view.png");

    const footerDetails = await callPage("Runtime.evaluate", {
      expression: `(() => {
        const ft = document.querySelector('.site-footer');
        const sfpeLink = ft ? ft.querySelector('a[href*="sfpe.org"]') : null;
        return {
          footerHeight: ft ? ft.getBoundingClientRect().height : null,
          hasSlogan: document.body.innerText.includes('Advancing fire protection and safety engineering through international research and local practice.'),
          sfpeHref: sfpeLink ? sfpeLink.href : null,
          sfpeLinkText: sfpeLink ? sfpeLink.textContent : null
        };
      })()`,
      returnByValue: true
    });
    console.log("Footer Details:", footerDetails.result.value);

    // 4. Favicon tags
    const faviconTags = await callPage("Runtime.evaluate", {
      expression: `(() => {
        const icons = Array.from(document.querySelectorAll('link[rel*="icon"]')).map(l => ({
          rel: l.rel,
          href: l.href,
          sizes: l.sizes ? Array.from(l.sizes).join(' ') : ''
        }));
        return icons;
      })()`,
      returnByValue: true
    });
    console.log("\nFavicon Tags in <head>:", faviconTags.result.value);

  } finally {
    chrome.kill("SIGTERM");
  }
}

main().catch(err => {
  console.error("Detail verification error:", err);
  process.exit(1);
});
