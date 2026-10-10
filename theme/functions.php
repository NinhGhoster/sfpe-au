<?php
/**
 * SFPE Australia Theme Functions
 */

if (!defined('ABSPATH')) {
    exit;
}

// Theme Setup
function sfpe_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    
    register_nav_menus(array(
        'primary' => __('Primary Navigation', 'sfpe-australia'),
        'footer'  => __('Footer Navigation', 'sfpe-australia'),
    ));
}
add_action('after_setup_theme', 'sfpe_setup');

// Enqueue Google Fonts and Main Stylesheet
function sfpe_scripts() {
    wp_enqueue_style(
        'sfpe-fonts',
        'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Public+Sans:wght@400;500;600;700&display=swap',
        array(),
        null
    );
    wp_enqueue_style(
        'sfpe-style',
        get_stylesheet_uri(),
        array('sfpe-fonts'),
        wp_get_theme()->get('Version') ?: '5.4.8'
    );
}
add_action('wp_enqueue_scripts', 'sfpe_scripts');

// Register Custom Post Type: Webinar
function sfpe_register_webinar_cpt() {
    $labels = array(
        'name'               => _x('Webinars & Seminars', 'post type general name', 'sfpe-australia'),
        'singular_name'      => _x('Webinar', 'post type singular name', 'sfpe-australia'),
        'menu_name'          => _x('Webinars', 'admin menu', 'sfpe-australia'),
        'name_admin_bar'     => _x('Webinar', 'add new on admin bar', 'sfpe-australia'),
        'add_new'            => _x('Add New Webinar', 'webinar', 'sfpe-australia'),
        'add_new_item'       => __('Add New Webinar', 'sfpe-australia'),
        'new_item'           => __('New Webinar', 'sfpe-australia'),
        'edit_item'          => __('Edit Webinar', 'sfpe-australia'),
        'view_item'          => __('View Webinar', 'sfpe-australia'),
        'all_items'          => __('All Webinars', 'sfpe-australia'),
        'search_items'       => __('Search Webinars', 'sfpe-australia'),
        'not_found'          => __('No webinars found.', 'sfpe-australia'),
        'not_found_in_trash' => __('No webinars found in Trash.', 'sfpe-australia'),
    );

    $args = array(
        'labels'             => $labels,
        'description'        => __('SFPE Australia technical webinars and seminars.', 'sfpe-australia'),
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'webinars-list'),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-video-alt3',
        'supports'           => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
        'show_in_rest'       => true,
    );

    register_post_type('webinar', $args);
}
add_action('init', 'sfpe_register_webinar_cpt');

// Webinar Admin Columns
function sfpe_webinar_columns($columns) {
    $new_columns = array();
    $new_columns['cb'] = $columns['cb'];
    $new_columns['title'] = __('Title', 'sfpe-australia');
    $new_columns['session_num'] = __('Session #', 'sfpe-australia');
    $new_columns['partner'] = __('Partner Organization', 'sfpe-australia');
    $new_columns['speaker'] = __('Presenter / Discussant', 'sfpe-australia');
    $new_columns['status'] = __('Status', 'sfpe-australia');
    $new_columns['date'] = __('Date Added', 'sfpe-australia');
    return $new_columns;
}
add_filter('manage_webinar_posts_columns', 'sfpe_webinar_columns');

function sfpe_webinar_custom_column($column, $post_id) {
    switch ($column) {
        case 'session_num':
            echo esc_html(get_post_meta($post_id, '_webinar_session_number', true) ?: '-');
            break;
        case 'partner':
            echo esc_html(get_post_meta($post_id, '_webinar_partner', true) ?: '-');
            break;
        case 'speaker':
            $speaker = get_post_meta($post_id, '_webinar_speaker', true);
            $discussant = get_post_meta($post_id, '_webinar_discussant', true);
            echo esc_html($speaker ?: '-') . '<br><small style="color:#64748B;">Discussant: ' . esc_html($discussant ?: '-') . '</small>';
            break;
        case 'status':
            $status = get_post_meta($post_id, '_webinar_status', true) ?: 'In Pipeline';
            echo '<span style="font-weight:600; color:#15803D;">' . esc_html($status) . '</span>';
            break;
    }
}
add_action('manage_webinar_posts_custom_column', 'sfpe_webinar_custom_column', 10, 2);

// Handle Contact Form Submissions
function sfpe_handle_contact_submission() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['sfpe_contact_nonce'])) {
        if (!wp_verify_nonce($_POST['sfpe_contact_nonce'], 'sfpe_contact_action')) {
            wp_die('Security check failed.');
        }

        $name = sanitize_text_field($_POST['full_name'] ?? '');
        $email = sanitize_email($_POST['email'] ?? '');
        $organization = sanitize_text_field($_POST['organization'] ?? '');
        $topic = sanitize_text_field($_POST['interest_area'] ?? 'General Enquiry');
        $message = sanitize_textarea_field($_POST['message'] ?? '');

        // Committee notification recipient
        $to = get_option('admin_email');
        $subject = '[SFPE Australia] New Inquiry: ' . $topic . ' from ' . $name;
        $body = "New submission via SFPE Australia Website (sfpe.org.au):\n\n";
        $body .= "Name: " . $name . "\n";
        $body .= "Email: " . $email . "\n";
        $body .= "Organization: " . $organization . "\n";
        $body .= "Interest Area: " . $topic . "\n\n";
        $body .= "Message:\n" . $message . "\n\n";
        $body .= "---\nSubmitted on: " . current_time('mysql');

        $headers = array('Content-Type: text/plain; charset=UTF-8', 'Reply-To: ' . $email);
        @wp_mail($to, $subject, $body, $headers);

        // Also persist submission in WordPress options as backup
        $submissions = get_option('sfpe_contact_submissions', array());
        $submissions[] = array(
            'date'         => current_time('mysql'),
            'name'         => $name,
            'email'        => $email,
            'organization' => $organization,
            'topic'        => $topic,
            'message'      => $message,
        );
        update_option('sfpe_contact_submissions', $submissions);

        // Redirect back with success flag
        $redirect_url = add_query_arg('submitted', '1', wp_get_referer() ?: home_url('/contact/'));
        wp_safe_redirect($redirect_url);
        exit;
    }
}
add_action('init', 'sfpe_handle_contact_submission');

// Remove core SVG filters and unused block styles that introduce unapproved gradients
remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');
add_action('wp_enqueue_scripts', function() {
    wp_dequeue_style('global-styles');
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
}, 100);

remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
remove_action('wp_footer', 'wp_enqueue_global_styles', 1);
remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');
add_action('wp_print_styles', function() {
    wp_dequeue_style('global-styles');
    wp_deregister_style('global-styles');
}, 100);
