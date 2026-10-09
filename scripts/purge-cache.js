#!/usr/bin/env node
/**
 * SFPE Australia - Cache Purge Script
 * Flushes the server-side page cache (wp-content/cache/page_enhanced)
 * and triggers WordPress object cache purge.
 */

const cp = require("child_process");

function purgeCache() {
  process.stdout.write("Purging server-side WordPress page cache... ");

  const code = `
    function rrmdir($dir) {
      if (is_dir($dir)) {
        $objects = scandir($dir);
        foreach ($objects as $object) {
          if ($object != "." && $object != "..") {
            if (is_dir($dir . DIRECTORY_SEPARATOR . $object) && !is_link($dir . "/" . $object))
              rrmdir($dir . DIRECTORY_SEPARATOR . $object);
            else
              unlink($dir . DIRECTORY_SEPARATOR . $object);
          }
        }
        reset($objects);
        rmdir($dir);
      }
    }

    $cache_dir = WP_CONTENT_DIR . "/cache/page_enhanced";
    if (is_dir($cache_dir)) {
      rrmdir($cache_dir);
    }
    
    if (function_exists("wp_cache_flush")) {
      wp_cache_flush();
    }
    
    return !is_dir($cache_dir);
  `;

  const input = JSON.stringify({ code });
  try {
    const res = cp.execSync("novamira run --yes novamira/execute-php --input - --json", {
      input,
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
      env: { ...process.env, NODE_TLS_REJECT_UNAUTHORIZED: "0" }
    });
    const parsed = JSON.parse(res);
    if (parsed.ok && parsed.data && parsed.data.success) {
      console.log("OK (cache cleared)");
      return true;
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

if (require.main === module) {
  purgeCache();
}

module.exports = { purgeCache };
