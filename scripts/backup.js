#!/usr/bin/env node
/**
 * SFPE Australia - WordPress Settings & Database Options Backup Script
 * Pulls all core WordPress settings and non-transient database options
 * from the live WordPress site (https://sfpe.org.au) and archives them in ./backups/.
 */

const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const BACKUP_DIR = path.join(__dirname, "..", "backups");
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

function backupSettings() {
  console.log("==================================================");
  console.log(" Backing Up SFPE Australia WordPress Settings     ");
  console.log(" Source: https://sfpe.org.au                      ");
  console.log("==================================================");

  const phpCode = `
    global $wpdb;

    // 1. Core General, Reading, Writing, Discussion, Permalinks, Locale settings
    $keys = [
      'blogname', 'blogdescription', 'siteurl', 'home', 'admin_email',
      'users_can_register', 'default_role', 'timezone_string', 'gmt_offset',
      'date_format', 'time_format', 'start_of_week', 'WPLANG',
      'permalink_structure', 'show_on_front', 'page_on_front', 'page_for_posts',
      'default_ping_status', 'default_comment_status', 'comment_moderation',
      'comments_notify', 'moderation_notify', 'require_name_email',
      'thumbnail_size_w', 'thumbnail_size_h', 'medium_size_w', 'medium_size_h',
      'large_size_w', 'large_size_h',
      'active_plugins', 'template', 'stylesheet'
    ];

    $core_settings = [];
    foreach ($keys as $k) {
      $core_settings[$k] = get_option($k);
    }

    // 2. All non-transient options in the database
    $rows = $wpdb->get_results(
      "SELECT option_name, option_value FROM {$wpdb->options} " .
      "WHERE option_name NOT LIKE '_transient_%' AND option_name NOT LIKE '_site_transient_%' " .
      "ORDER BY option_name ASC",
      ARRAY_A
    );

    $all_options = [];
    foreach ($rows as $r) {
      $all_options[$r['option_name']] = maybe_unserialize($r['option_value']);
    }

    echo json_encode([
      'backed_up_at'   => current_time('mysql'),
      'site_url'       => get_site_url(),
      'core_settings'  => $core_settings,
      'all_options'    => $all_options,
    ], JSON_PRETTY_PRINT);
  `;

  process.stdout.write("Fetching options from live site via Novamira... ");
  const input = JSON.stringify({ code: phpCode });

  try {
    const res = cp.execSync("novamira run --yes novamira/execute-php --input - --json", {
      input,
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
      env: { ...process.env, NODE_TLS_REJECT_UNAUTHORIZED: "0" }
    });

    const parsed = JSON.parse(res);
    if (!parsed.ok || !parsed.data || !parsed.data.success) {
      console.log("FAILED");
      console.error(parsed);
      process.exit(1);
    }

    console.log("OK");
    const payload = JSON.parse(parsed.data.output);

    // Save core settings
    const corePath = path.join(BACKUP_DIR, "wordpress_settings.json");
    fs.writeFileSync(
      corePath,
      JSON.stringify(
        {
          backed_up_at: payload.backed_up_at,
          site_url: payload.site_url,
          settings: payload.core_settings
        },
        null,
        2
      )
    );

    // Save all options
    const allOptionsPath = path.join(BACKUP_DIR, "all_options.json");
    fs.writeFileSync(allOptionsPath, JSON.stringify(payload.all_options, null, 2));

    console.log(`Saved core settings: ${corePath}`);
    console.log(`Saved all options (${Object.keys(payload.all_options).length} entries): ${allOptionsPath}`);
    console.log("Backup completed successfully!");
    return payload;
  } catch (err) {
    console.log("ERROR");
    console.error(err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  backupSettings();
}

module.exports = { backupSettings };
