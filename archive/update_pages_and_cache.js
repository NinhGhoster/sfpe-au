// update_pages_and_cache.js
// Creates the About page, ensures correct templates, and clears W3 Total Cache
const cp = require("child_process");

function runPhp(code, description) {
  process.stdout.write(`Executing: ${description}... `);
  const input = JSON.stringify({ code });
  const result = cp.execSync("novamira run --yes novamira/execute-php --input - --json", {
    input,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024
  });
  const parsed = JSON.parse(result);
  if (!parsed.ok || !parsed.data.success) {
    console.log("FAILED");
    console.error(parsed);
    throw new Error(`Failed to execute PHP for: ${description}`);
  }
  console.log("OK");
  return parsed.data.return_value;
}

const updateScript = `
// 1. Ensure About page exists with template page-about.php
$about = get_page_by_path('about', OBJECT, 'page');
$about_data = array(
    'post_title'   => 'About',
    'post_name'    => 'about',
    'post_status'  => 'publish',
    'post_type'    => 'page',
    'post_content' => '',
);
if ($about) {
    $about_data['ID'] = $about->ID;
    $about_id = wp_update_post($about_data);
} else {
    $about_id = wp_insert_post($about_data);
}
update_post_meta($about_id, '_wp_page_template', 'page-about.php');

// 2. Ensure all other pages have correct templates
$templates = array(
    'home'           => 'front-page.php',
    'webinars'       => 'page-webinars.php',
    'working-groups' => 'page-working-groups.php',
    'cpd-hub'        => 'page-cpd-hub.php',
    'contact'        => 'page-contact.php',
);

foreach ($templates as $slug => $tmpl) {
    $p = get_page_by_path($slug, OBJECT, 'page');
    if ($p) {
        update_post_meta($p->ID, '_wp_page_template', $tmpl);
    }
}

// Ensure Front Page is home
$home = get_page_by_path('home', OBJECT, 'page');
if ($home) {
    update_option('show_on_front', 'page');
    update_option('page_on_front', $home->ID);
}

// 3. Flush Rewrite Rules
flush_rewrite_rules(false);

// 4. Flush W3 Total Cache if active
if (function_exists('w3tc_flush_all')) {
    w3tc_flush_all();
}

return array(
    'about_id' => $about_id,
    'pages'    => wp_list_pluck(get_pages(), 'post_title', 'post_name'),
);
`;

const res = runPhp(updateScript, "Create About page and flush cache");
console.log("Result:", res);
