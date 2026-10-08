// seed_site.js
// Activates sfpe-theme, seeds pages and 6 webinar posts, and sets up WordPress configuration
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

const seedScript = `
// 1. Activate Theme
switch_theme('sfpe-theme');

// 2. Set Site Title, Tagline and Permalinks
update_option('blogname', 'SFPE Australia');
update_option('blogdescription', 'The window between Australian practice and international fire safety research');
update_option('permalink_structure', '/%postname%/');

// 3. Trash default sample post and sample page
$sample_post = get_page_by_path('hello-world', OBJECT, 'post');
if ($sample_post) {
    wp_trash_post($sample_post->ID);
}
$sample_page = get_page_by_path('sample-page', OBJECT, 'page');
if ($sample_page) {
    wp_trash_post($sample_page->ID);
}

// 4. Helper function to create or update a page
function sfpe_ensure_page($title, $slug, $template) {
    $existing = get_page_by_path($slug, OBJECT, 'page');
    $page_data = array(
        'post_title'   => $title,
        'post_name'    => $slug,
        'post_status'  => 'publish',
        'post_type'    => 'page',
        'post_content' => '',
    );
    if ($existing) {
        $page_data['ID'] = $existing->ID;
        $id = wp_update_post($page_data);
    } else {
        $id = wp_insert_post($page_data);
    }
    if ($template) {
        update_post_meta($id, '_wp_page_template', $template);
    }
    return $id;
}

$home_id = sfpe_ensure_page('Home', 'home', 'page-home.php');
$webinars_id = sfpe_ensure_page('Webinars & Events', 'webinars', 'page-webinars.php');
$wg_id = sfpe_ensure_page('Working Groups', 'working-groups', 'page-working-groups.php');
$cpd_id = sfpe_ensure_page('CPD & Partner Hub', 'cpd-hub', 'page-cpd-hub.php');
$contact_id = sfpe_ensure_page('Get Involved', 'contact', 'page-contact.php');

// Set Front Page
update_option('show_on_front', 'page');
update_option('page_on_front', $home_id);

// 5. Seed the 6 Confirmed Pipeline Webinars
$webinars_data = array(
    array(
        'title'       => 'SFPE UK & Australia Joint Dialogue: Post-October Conference Insights & Global Fire Engineering',
        'slug'        => 'sfpe-uk-australia-joint-dialogue',
        'session_num' => 'Session 1 of 6',
        'partner'     => 'SFPE UK Chapter',
        'speaker'     => 'SFPE UK Technical Leadership',
        'discussant'  => 'Australian Fire Engineering Panel',
        'status'      => 'In Development',
        'date'        => 'Late 2026 (Post-UK October Conference)',
        'excerpt'     => 'Debrief from the UK national conference examining structural fire safety, performance solutions verification, and comparative regulatory insights.',
        'content'     => 'A high-level collaborative session with the SFPE UK Chapter following their national conference. The session explores key international lessons in performance-based fire engineering, structural fire response, and fire dynamics, followed by an Australian panel discussing direct applications to Australian National Construction Code (NCC/BCA) performance solutions.'
    ),
    array(
        'title'       => 'Fire Safety Engineering & Dangerous Goods Crossover',
        'slug'        => 'dangerous-goods-fire-safety-crossover',
        'session_num' => 'Session 2 of 6',
        'partner'     => 'AIDGC Alliance',
        'speaker'     => 'Sean Page, President, AIDGC',
        'discussant'  => 'Specialist Fire Engineering Practitioner',
        'status'      => 'In Development',
        'date'        => 'Early 2027',
        'excerpt'     => 'A joint exploration bridging fire engineering and dangerous goods storage: flammable liquids, toxic gases, and industrial hazard management.',
        'content'     => 'Organized in partnership with the Australasian Institute of Dangerous Goods Consultants (AIDGC), this seminar examines the critical intersection where building fire safety engineering meets dangerous goods regulation. Topics include flammable liquid storage, warehouse containment, battery energy storage systems (BESS), and emergency response planning.'
    ),
    array(
        'title'       => 'Trans-Tasman Perspectives: Australian & New Zealand Fire Engineering Practice',
        'slug'        => 'trans-tasman-fire-engineering-perspectives',
        'session_num' => 'Session 3 of 6',
        'partner'     => 'SFPE New Zealand Chapter',
        'speaker'     => 'SFPE NZ Chapter Executive & Researchers',
        'discussant'  => 'Australian NCC Verification Specialist',
        'status'      => 'In Development',
        'date'        => 'Early 2027',
        'excerpt'     => 'Comparative evaluation of New Zealand C/VM2 verification methods versus Australia NCC BCA performance pathways.',
        'content'     => 'A joint event between SFPE Australia and SFPE New Zealand. The presentation compares the verification frameworks of both nations, examining how New Zealand C/VM2 framework handles fire load densities, tenability criteria, and radiation calculations compared with Australian NCC Part A2.2 and Australian Standards.'
    ),
    array(
        'title'       => 'From Research to Regulation: Australian Practice Meets International Science',
        'slug'        => 'research-to-regulation-australian-practice',
        'session_num' => 'Session 4 of 6',
        'partner'     => 'Society of Fire Safety (SFS)',
        'speaker'     => 'International Fire Science Researcher (FSRI / NFPA)',
        'discussant'  => 'Society of Fire Safety (SFS) Representative',
        'status'      => 'In Development',
        'date'        => 'Mid 2027',
        'excerpt'     => 'Co-badged event with the Society of Fire Safety (SFS) examining recent full-scale experimental fire testing and international CFD validations.',
        'content'     => 'Co-badged with SFS, this session emphasizes the partnership model of SFPE Australia. Presenting recent experimental fire testing and research data from institutions like UL FSRI and NFPA FPRF, paired with SFS discussants analyzing the practical implications for consulting engineers and regulatory certifiers in Australia.'
    ),
    array(
        'title'       => 'What is New in the SFPE Handbook: Inside the 6th Edition Revisions',
        'slug'        => 'sfpe-handbook-revisions-insights',
        'session_num' => 'Session 5 of 6',
        'partner'     => 'SFPE Global Handbook Authors',
        'speaker'     => 'Lead Chapter Authors, SFPE Handbook',
        'discussant'  => 'Australian Academic & Industry Specialist',
        'status'      => 'In Development',
        'date'        => 'Mid 2027',
        'excerpt'     => 'Exclusive briefing by handbook authors on evolving engineering methodologies, smoke control models, and human behavior research.',
        'content'     => 'The SFPE Handbook of Fire Protection Engineering is the definitive global reference. This webinar brings contributing authors together to unpack updated chapters, new smoke plume correlations, updated structural fire models, and revised occupant evacuation algorithms, providing Australian practitioners with early insights into revised methods.'
    ),
    array(
        'title'       => 'Property Protection & High-Hazard Frontiers: Data Centers, Mass Timber & Industrial Assets',
        'slug'        => 'property-protection-data-centers-mass-timber',
        'session_num' => 'Session 6 of 6',
        'partner'     => 'International Property Resilience Panel',
        'speaker'     => 'Global Industrial Risk & Data Center Specialist',
        'discussant'  => 'Australian Timber & Critical Infrastructure Engineer',
        'status'      => 'In Development',
        'date'        => 'Late 2027',
        'excerpt'     => 'Exploring fire engineering beyond minimum life safety compliance: business continuity, high-density energy storage, and mass timber challenges.',
        'content'     => 'Fire safety engineering in building codes primarily targets occupant life safety. However, modern high-value facilities like AI data centers, battery manufacturing hubs, and mass engineered timber structures demand sophisticated property protection and business continuity strategies. This session explores comparative international approaches to asset resilience.'
    ),
);

// Clear existing webinars to avoid duplicates and re-seed cleanly
$existing_webinars = get_posts(array('post_type' => 'webinar', 'posts_per_page' => -1, 'post_status' => 'any'));
foreach ($existing_webinars as $ew) {
    wp_delete_post($ew->ID, true);
}

$order = 1;
foreach ($webinars_data as $w) {
    $webinar_id = wp_insert_post(array(
        'post_title'   => $w['title'],
        'post_name'    => $w['slug'],
        'post_content' => $w['content'],
        'post_excerpt' => $w['excerpt'],
        'post_status'  => 'publish',
        'post_type'    => 'webinar',
        'menu_order'   => $order,
    ));

    update_post_meta($webinar_id, '_webinar_session_number', $w['session_num']);
    update_post_meta($webinar_id, '_webinar_partner', $w['partner']);
    update_post_meta($webinar_id, '_webinar_speaker', $w['speaker']);
    update_post_meta($webinar_id, '_webinar_discussant', $w['discussant']);
    update_post_meta($webinar_id, '_webinar_status', $w['status']);
    update_post_meta($webinar_id, '_webinar_date_display', $w['date']);
    $order++;
}

// 6. Flush Rewrite Rules
flush_rewrite_rules(false);

return array(
    'theme'       => wp_get_theme()->get('Name'),
    'home_id'     => $home_id,
    'pages_count' => count(get_pages()),
    'webinars'    => count(get_posts(array('post_type' => 'webinar', 'posts_per_page' => -1))),
);
`;

const res = runPhp(seedScript, "Activate theme, seed pages, seed 6 webinar posts, and configure front page");
console.log("Seed Result:", res);
