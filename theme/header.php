<?php
/**
 * SFPE Australia Header
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="192x192" href="<?php echo esc_url(get_template_directory_uri() . '/images/sfpe-favicon-192x192.png'); ?>">
  <link rel="icon" type="image/png" sizes="48x48" href="<?php echo esc_url(get_template_directory_uri() . '/images/sfpe-favicon-48x48.png'); ?>">
  <link rel="icon" type="image/png" sizes="32x32" href="<?php echo esc_url(get_template_directory_uri() . '/images/sfpe-favicon-32x32.png'); ?>">
  <link rel="icon" type="image/png" sizes="16x16" href="<?php echo esc_url(get_template_directory_uri() . '/images/sfpe-favicon-16x16.png'); ?>">
  <link rel="shortcut icon" href="<?php echo esc_url(get_template_directory_uri() . '/favicon.ico'); ?>">
  <link rel="apple-touch-icon" sizes="180x180" href="<?php echo esc_url(get_template_directory_uri() . '/images/sfpe-apple-touch-icon.png'); ?>">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
  <div class="top-bar">
    <div class="container top-bar-content">
      <div class="top-bar-tagline">
        <span class="top-bar-badge">Australian Chapter</span>
        <span class="top-bar-text">The Society of Fire Protection Engineers (SFPE)</span>
      </div>
      <div class="top-bar-linkedin-wrap">
        <a href="https://www.linkedin.com/company/sfpe-au/" target="_blank" rel="noopener" class="top-bar-linkedin-link">
          LinkedIn &rarr;
        </a>
      </div>
    </div>
  </div>

  <div class="container nav-container">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="brand-link">
      <img src="<?php echo esc_url(get_template_directory_uri() . '/images/sfpe-australia-logo.png'); ?>" alt="SFPE Australia Chapter Logo" class="brand-logo-img" width="750" height="465">
      <div class="brand-text-block">
        <span class="brand-title">SFPE Australia</span>
        <span class="brand-subtitle">Society of Fire Protection Engineers</span>
      </div>
    </a>

    <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle navigation" aria-expanded="false">&#9776;</button>

    <nav class="main-nav" id="main-nav">
      <ul class="nav-links">
        <li><a href="<?php echo esc_url(home_url('/')); ?>" class="nav-link <?php echo is_front_page() ? 'active' : ''; ?>">Home</a></li>
        <li><a href="<?php echo esc_url(home_url('/about/')); ?>" class="nav-link <?php echo is_page('about') ? 'active' : ''; ?>">About</a></li>
        <li><a href="<?php echo esc_url(home_url('/events/')); ?>" class="nav-link <?php echo (is_page('events') || is_page('webinars')) ? 'active' : ''; ?>">Events</a></li>
        <li><a href="<?php echo esc_url(home_url('/working-groups/')); ?>" class="nav-link <?php echo is_page('working-groups') ? 'active' : ''; ?>">Working Groups</a></li>
        <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>" class="nav-link <?php echo is_page('cpd-hub') ? 'active' : ''; ?>">CPD Hub</a></li>
        <li><a href="<?php echo esc_url(home_url('/contact/')); ?>" class="nav-link <?php echo is_page('contact') ? 'active' : ''; ?>">Contact &amp; Join</a></li>
      </ul>
      <a href="<?php echo esc_url(home_url('/events/')); ?>" class="btn btn-primary">Events Calendar</a>
    </nav>
  </div>
</header>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
});
</script>
