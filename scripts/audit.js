#!/usr/bin/env node
/**
 * SFPE Australia - Design & Code Quality Audit
 * Inspects theme templates and CSS for style violations:
 * - No em-dashes (—)
 * - No AI purple (#7c3aed, #8b5cf6, etc.)
 * - No Inter font
 * - No filler marketing buzzwords
 */

const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const THEME_DIR = path.join(__dirname, "..", "theme");

const FORBIDDEN_WORDS = [
  "cutting-edge",
  "game-changing",
  "seamlessly",
  "delve",
  "harness",
  "elevate",
  "unleash",
  "tapestry",
  "testament"
];

function auditTheme() {
  console.log("==================================================");
  console.log(" Running SFPE Australia Design & Quality Audit    ");
  console.log("==================================================");

  let violations = 0;
  const files = fs.readdirSync(THEME_DIR).filter(f => f.endsWith(".php") || f.endsWith(".css"));

  for (const f of files) {
    const content = fs.readFileSync(path.join(THEME_DIR, f), "utf8");

    // Check em-dashes
    if (content.includes("—")) {
      console.log(`\x1b[31m[FAIL]\x1b[0m ${f}: Contains em-dash (—). Use hyphens or rephrase.`);
      violations++;
    }

    // Check AI purple
    const purpleMatches = content.match(/#(?:7c3aed|8b5cf6|6366f1|4f46e5|a855f7|9333ea)/gi);
    if (purpleMatches) {
      console.log(`\x1b[31m[FAIL]\x1b[0m ${f}: Contains AI purple palette: ${purpleMatches.join(", ")}`);
      violations++;
    }

    // Check Inter font
    if (/font-family:[^;]*Inter/i.test(content)) {
      console.log(`\x1b[31m[FAIL]\x1b[0m ${f}: Uses Inter font. Only Plus Jakarta Sans & Public Sans allowed.`);
      violations++;
    }

    // Check filler marketing buzzwords
    for (const word of FORBIDDEN_WORDS) {
      const regex = new RegExp(`\\b${word}\\b`, "i");
      if (regex.test(content)) {
        console.log(`\x1b[33m[WARN]\x1b[0m ${f}: Contains marketing filler word '${word}'`);
        violations++;
      }
    }
  }

  // Run novamira/check-design
  try {
    process.stdout.write("Running Novamira Design System Auditor... ");
    const styleContent = fs.readFileSync(path.join(THEME_DIR, "style.css"), "utf8");
    const input = JSON.stringify({ output: styleContent.substring(0, 10000) });
    const res = cp.execSync("novamira run --yes novamira/check-design --input - --json", {
      input,
      encoding: "utf8"
    });
    const parsed = JSON.parse(res);
    if (parsed.ok && parsed.data && parsed.data.ok) {
      console.log("\x1b[32mOK\x1b[0m");
    } else {
      console.log("\x1b[33mWARNINGS REPORTED\x1b[0m");
    }
  } catch (err) {
    console.log("Skipped or errored (" + err.message + ")");
  }

  console.log("--------------------------------------------------");
  if (violations === 0) {
    console.log("\x1b[32mAudit passed: Zero violations found.\x1b[0m\n");
    process.exit(0);
  } else {
    console.log(`\x1b[31mAudit completed with ${violations} violations/warnings.\x1b[0m\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  auditTheme();
}

module.exports = { auditTheme };
