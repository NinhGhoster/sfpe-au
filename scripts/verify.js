#!/usr/bin/env node
/**
 * SFPE Australia - Live Verification Script
 * Validates that all public pages return HTTP 200, contain the correct brand terminology,
 * and have zero traces of deprecated labels or header branding errors.
 */

const https = require("https");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PAGES = [
  { path: "/", name: "Homepage" },
  { path: "/about/", name: "About Us" },
  { path: "/webinars/", name: "Webinars" },
  { path: "/working-groups/", name: "Working Groups" },
  { path: "/cpd-hub/", name: "CPD Hub" },
  { path: "/contact/", name: "Contact & Join" }
];

const BASE_URL = "https://sfpe.xo.je";
const COOKIE_FILE = path.join(os.tmpdir(), "novamira_cookies.json");
const BROWSER_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function getCookie() {
  try {
    if (fs.existsSync(COOKIE_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(COOKIE_FILE, "utf8"));
      return parsed[BASE_URL] || "__test=7b0d3f9873861de78dc92d218c825e09";
    }
  } catch {}
  return "__test=7b0d3f9873861de78dc92d218c825e09";
}

function fetchPage(urlPath, cookie) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const req = https.get(
      BASE_URL + urlPath,
      {
        headers: {
          "User-Agent": BROWSER_UA,
          "Cookie": cookie
        }
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          resolve({
            status: res.statusCode,
            body,
            latencyMs: Date.now() - startTime
          });
        });
      }
    );
    req.on("error", reject);
  });
}

async function verifyAll() {
  console.log("==================================================");
  console.log(" Verifying Live SFPE Australia Website Status     ");
  console.log(" Target: " + BASE_URL);
  console.log("==================================================");

  const cookie = getCookie();
  let allPassed = true;

  for (const page of PAGES) {
    try {
      const res = await fetchPage(page.path, cookie);
      const isHttp200 = res.status === 200;
      const hasCorrectSubtitle = res.body.includes("Society of Fire Protection Engineers");
      const hasWrongInHeader = res.body.includes('brand-subtitle">Fire Safety Engineering<');
      const hasTopBar = res.body.includes("Australian Chapter");

      const passed = isHttp200 && hasCorrectSubtitle && !hasWrongInHeader && hasTopBar;
      if (!passed) allPassed = false;

      const statusTag = passed ? "\x1b[32mPASS\x1b[0m" : "\x1b[31mFAIL\x1b[0m";
      console.log(`[${statusTag}] ${page.name.padEnd(16)} (${page.path.padEnd(16)}) -> HTTP ${res.status} (${res.latencyMs}ms)`);
      if (!isHttp200) console.log(`       - Error: Expected HTTP 200, got ${res.status}`);
      if (!hasCorrectSubtitle) console.log(`       - Error: Missing 'Society of Fire Protection Engineers' subtitle`);
      if (hasWrongInHeader) console.log(`       - Error: Found deprecated 'Fire Safety Engineering' subtitle in header!`);
      if (!hasTopBar) console.log(`       - Error: Missing 'Australian Chapter' in top bar`);
    } catch (err) {
      allPassed = false;
      console.log(`[\x1b[31mERROR\x1b[0m] ${page.name.padEnd(16)} (${page.path}) -> ${err.message}`);
    }
  }

  console.log("--------------------------------------------------");
  if (allPassed) {
    console.log("\x1b[32mAll 6 public pages verified successfully with zero errors.\x1b[0m\n");
    process.exit(0);
  } else {
    console.log("\x1b[31mVerification failed on one or more pages.\x1b[0m\n");
    process.exit(1);
  }
}

if (require.main === module) {
  verifyAll();
}

module.exports = { verifyAll };
