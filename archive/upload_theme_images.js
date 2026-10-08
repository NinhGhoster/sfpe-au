// upload_theme_images.js
const cp = require("child_process");
const fs = require("fs");
const path = require("path");

function runPhp(code, description) {
  process.stdout.write(`Executing: ${description}... `);
  const input = JSON.stringify({ code });
  const result = cp.execSync("novamira run --yes novamira/execute-php --input - --json", {
    input,
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024
  });
  const parsed = JSON.parse(result);
  if (!parsed.ok || !parsed.data.success) {
    console.log("FAILED");
    console.error(parsed);
    throw new Error(`Failed: ${description}`);
  }
  console.log("OK");
  return parsed.data.return_value;
}

function uploadImage(localPath, remoteRelativePath) {
  const data = fs.readFileSync(localPath);
  const base64 = data.toString("base64");
  const code = `
    $theme_dir = get_template_directory();
    $target = $theme_dir . '/' . ${JSON.stringify(remoteRelativePath)};
    $dir = dirname($target);
    if (!is_dir($dir)) {
      mkdir($dir, 0755, true);
    }
    file_put_contents($target, base64_decode(${JSON.stringify(base64)}));
    return array('exists' => file_exists($target), 'size' => filesize($target));
  `;
  const res = runPhp(code, `Upload ${remoteRelativePath}`);
  console.log(`Uploaded ${remoteRelativePath}:`, res);
}

uploadImage("/Users/haninhn/Downloads/SFPE/Australia Chapter_whitebackground.png", "images/sfpe-australia-logo.png");
uploadImage("/Users/haninhn/Downloads/SFPE/hero-australia-bg.jpg", "images/hero-australia-bg.jpg");
