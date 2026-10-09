#!/usr/bin/env node
/**
 * SFPE Australia - Production Deployment Pipeline
 * Reads local theme files from ./theme/ and synchronizes them
 * with the remote WordPress environment, then automatically purges the cache.
 */

const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const { purgeCache } = require("./purge-cache");

const THEME_DIR = path.join(__dirname, "..", "theme");

function runPhp(code, desc) {
  process.stdout.write(`Executing: ${desc}... `);
  const input = JSON.stringify({ code });
  try {
    const res = cp.execSync("novamira run --yes novamira/execute-php --input - --json", {
      input,
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
      env: { ...process.env, NODE_TLS_REJECT_UNAUTHORIZED: "0" }
    });
    const parsed = JSON.parse(res);
    if (parsed.ok && parsed.data && parsed.data.success) {
      console.log("OK");
      return parsed.data.return_value;
    } else {
      console.log("FAILED");
      console.error(parsed);
      process.exit(1);
    }
  } catch (err) {
    console.log("ERROR");
    console.error(err.message);
    process.exit(1);
  }
}

function deployTheme() {
  console.log("==========================================");
  console.log(" Deploying SFPE Australia Theme to Remote ");
  console.log("==========================================");

  if (!fs.existsSync(THEME_DIR)) {
    console.error(`Error: Theme directory not found at ${THEME_DIR}`);
    process.exit(1);
  }

  // Collect theme files
  const rootFiles = fs.readdirSync(THEME_DIR).filter((f) => {
    return f.endsWith(".php") || f.endsWith(".css");
  });

  const imagesDir = path.join(THEME_DIR, "images");
  const imageFiles = fs.existsSync(imagesDir) ? fs.readdirSync(imagesDir) : [];

  const payload = {};
  for (const f of rootFiles) {
    payload[f] = fs.readFileSync(path.join(THEME_DIR, f)).toString("base64");
  }

  const imagePayload = {};
  for (const img of imageFiles) {
    imagePayload[img] = fs.readFileSync(path.join(imagesDir, img)).toString("base64");
  }

  console.log(`Found ${rootFiles.length} root template/style files and ${imageFiles.length} image assets.`);

  const code = `
    $theme_dir = get_theme_root() . '/sfpe-theme';
    if (!is_dir($theme_dir)) {
      mkdir($theme_dir, 0755, true);
    }
    $images_dir = $theme_dir . '/images';
    if (!is_dir($images_dir)) {
      mkdir($images_dir, 0755, true);
    }

    $files = json_decode(${JSON.stringify(JSON.stringify(payload))}, true);
    $images = json_decode(${JSON.stringify(JSON.stringify(imagePayload))}, true);
    $written = 0;

    foreach ($files as $name => $b64) {
      $path = $theme_dir . '/' . $name;
      file_put_contents($path, base64_decode($b64));
      if (file_exists($path)) $written++;
    }

    foreach ($images as $name => $b64) {
      $path = $images_dir . '/' . $name;
      file_put_contents($path, base64_decode($b64));
      if (file_exists($path)) $written++;
    }

    // Ensure theme is active
    if (get_stylesheet() !== 'sfpe-theme') {
      switch_theme('sfpe-theme');
    }

    return array(
      'written' => $written,
      'total' => count($files) + count($images),
      'active_theme' => get_stylesheet()
    );
  `;

  const result = runPhp(code, `Deploying ${rootFiles.length + imageFiles.length} theme files to remote`);
  console.log(`Deployment summary: ${result.written}/${result.total} files written. Active theme: ${result.active_theme}`);

  // Purge server cache
  purgeCache();

  console.log("\nDeployment completed successfully!");
}

if (require.main === module) {
  deployTheme();
}

module.exports = { deployTheme };
