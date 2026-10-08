// deploy_sfpe_redesign.js
// Deploys the streamlined, less wordy SFPE Australia redesign to sfpe.xo.je
const cp = require("child_process");
const fs = require("fs");
const path = require("path");

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

function writeThemeFile(filename, content) {
  const code = `
    $theme_dir = get_theme_root() . '/sfpe-theme';
    if (!is_dir($theme_dir)) {
      mkdir($theme_dir, 0755, true);
    }
    $file = $theme_dir . '/' . ${JSON.stringify(filename)};
    $dir = dirname($file);
    if (!is_dir($dir)) {
      mkdir($dir, 0755, true);
    }
    file_put_contents($file, base64_decode(${JSON.stringify(Buffer.from(content).toString("base64"))}));
    return file_exists($file);
  `;
  runPhp(code, `Write theme file ${filename}`);
}

// -------------------------------------------------------------
// 1. STYLE.CSS
// -------------------------------------------------------------
const styleCss = `/*
Theme Name: SFPE Australia
Theme URI: https://sfpe.xo.je
Description: Streamlined official theme for the Australian Chapter of the Society of Fire Protection Engineers (SFPE).
Author: Ninh
Author URI: https://sfpe.xo.je
Version: 2.0.0
Text Domain: sfpe-australia
*/

:root {
  /* Brand Colors aligned with SFPE Global & SFPE Australia */
  --color-navy: #0B132B;
  --color-navy-light: #162544;
  --color-blue: #0072BB;
  --color-blue-hover: #005a96;
  --color-blue-soft: #E0F2FE;
  --color-crimson: #D32228;
  --color-crimson-hover: #B51B20;
  --color-crimson-soft: #FEE2E2;
  
  --color-bg-canvas: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-surface-alt: #F1F5F9;
  
  --color-ink: #0F172A;
  --color-ink-muted: #475569;
  --color-ink-subtle: #64748B;
  
  --color-border: #E2E8F0;
  --color-border-dark: #1E293B;
  --color-success: #15803D;
  --color-success-bg: #DCFCE7;
  
  --font-heading: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-body: 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.03);
  
  --container-max: 1080px;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-ink);
  background-color: var(--color-bg-canvas);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  color: var(--color-ink);
  line-height: 1.25;
  font-weight: 700;
}

a {
  color: var(--color-blue);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--color-blue-hover);
}

.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 24px;
}

/* Header & Navigation */
.site-header {
  background-color: var(--color-navy);
  color: #FFFFFF;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.top-bar {
  background-color: rgba(0, 0, 0, 0.25);
  font-size: 13px;
  color: #94A3B8;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.top-bar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-bar-tagline {
  display: flex;
  align-items: center;
  gap: 8px;
}

.top-bar-badge {
  background-color: var(--color-crimson);
  color: #FFFFFF;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #FFFFFF;
  text-decoration: none;
}

.brand-emblem-svg {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
}

.brand-text-block {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #FFFFFF;
  line-height: 1.1;
}

.brand-subtitle {
  font-size: 11px;
  color: #94A3B8;
  font-weight: 500;
  letter-spacing: 0.2px;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 18px;
  align-items: center;
}

.nav-link {
  color: #E2E8F0;
  font-size: 15px;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.nav-link:hover, .nav-link.active {
  color: #FFFFFF;
  background-color: rgba(255, 255, 255, 0.1);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-crimson);
  color: #FFFFFF;
  box-shadow: 0 2px 4px rgba(211, 34, 40, 0.2);
}

.btn-primary:hover {
  background-color: var(--color-crimson-hover);
  color: #FFFFFF;
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: transparent;
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  border-color: rgba(255, 255, 255, 0.5);
}

.btn-outline-dark {
  background-color: transparent;
  color: var(--color-ink);
  border: 1px solid var(--color-border);
}

.btn-outline-dark:hover {
  background-color: var(--color-surface-alt);
  color: var(--color-ink);
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  color: #FFFFFF;
  font-size: 24px;
  cursor: pointer;
}

/* Streamlined Hero */
.hero-streamlined {
  background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-light) 100%);
  color: #FFFFFF;
  padding: 72px 0 68px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-streamlined::after {
  content: '';
  position: absolute;
  top: -30%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 114, 187, 0.18) 0%, rgba(211, 34, 40, 0.08) 50%, rgba(11, 19, 43, 0) 70%);
  pointer-events: none;
}

.hero-streamlined-inner {
  max-width: 760px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-badge-clean {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #E2E8F0;
  padding: 5px 14px;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
}

.hero-streamlined-title {
  font-size: 42px;
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.8px;
  color: #FFFFFF;
  margin-bottom: 18px;
}

.hero-streamlined-lead {
  font-size: 18px;
  line-height: 1.55;
  color: #CBD5E1;
  margin-bottom: 28px;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

.hero-streamlined-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

/* Sections & Clean Single-Heading Pattern */
.section {
  padding: 64px 0;
}

.section-alt {
  background-color: var(--color-surface);
}

.section-label {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-blue);
  margin-bottom: 6px;
  display: block;
}

.section-heading {
  font-size: 28px;
  letter-spacing: -0.4px;
  color: var(--color-ink);
  margin-bottom: 28px;
}

/* Compact Events Strip */
.compact-events-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.compact-events-list {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.compact-event-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.15s ease;
  gap: 16px;
  text-decoration: none;
  color: inherit;
}

.compact-event-row:last-child {
  border-bottom: none;
}

.compact-event-row:hover {
  background-color: var(--color-surface-alt);
}

.compact-event-left {
  display: flex;
  align-items: center;
  gap: 18px;
  min-width: 0;
}

.compact-event-date {
  background-color: var(--color-blue-soft);
  color: var(--color-blue);
  font-weight: 700;
  font-size: 12px;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  white-space: nowrap;
  text-align: center;
}

.compact-event-meta {
  min-width: 0;
}

.compact-event-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-ink);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.compact-event-sub {
  font-size: 13px;
  color: var(--color-ink-muted);
}

.compact-event-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.compact-event-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  background-color: var(--color-surface-alt);
  color: var(--color-ink-muted);
  border: 1px solid var(--color-border);
}

.compact-event-arrow {
  color: var(--color-blue);
  font-weight: 700;
  font-size: 18px;
}

/* 3 Navigation Tiles */
.nav-tiles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.nav-tile-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.nav-tile-card:hover {
  transform: translateY(-3px);
  border-color: #CBD5E1;
  box-shadow: var(--shadow-md);
}

.nav-tile-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background-color: var(--color-blue-soft);
  color: var(--color-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 16px;
}

.nav-tile-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-ink);
  margin-bottom: 8px;
}

.nav-tile-desc {
  font-size: 14px;
  color: var(--color-ink-muted);
  line-height: 1.5;
  margin-bottom: 16px;
  flex-grow: 1;
}

.nav-tile-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-blue);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* Partner Logo Wall / Strip */
.partner-strip {
  border-top: 1px solid var(--color-border);
  padding: 48px 0;
  text-align: center;
}

.partner-strip-title {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-ink-subtle);
  margin-bottom: 24px;
}

.partner-pills-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.partner-pill-badge {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 8px 18px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.15s ease;
}

.partner-pill-badge:hover {
  border-color: #94A3B8;
  color: var(--color-blue);
}

/* Webinar Detail Page & Grid */
.webinar-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.webinar-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
}

.webinar-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.webinar-session-badge {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-crimson);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.webinar-partner-pill {
  font-size: 12px;
  font-weight: 600;
  background-color: var(--color-surface-alt);
  padding: 3px 10px;
  border-radius: var(--radius-full);
  color: var(--color-ink-muted);
}

.webinar-title {
  font-size: 18px;
  margin-bottom: 10px;
  line-height: 1.35;
  color: var(--color-ink);
}

.webinar-desc {
  font-size: 14px;
  color: var(--color-ink-muted);
  line-height: 1.5;
  margin-bottom: 16px;
  flex-grow: 1;
}

.webinar-specs {
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
}

.webinar-spec-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.webinar-spec-label {
  color: var(--color-ink-subtle);
  font-weight: 500;
}

.webinar-spec-value {
  color: var(--color-ink);
  font-weight: 600;
}

.webinar-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  border-top: 1px solid var(--color-border);
}

.webinar-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-success);
}

.webinar-status::before {
  content: '';
  width: 7px;
  height: 7px;
  background-color: var(--color-success);
  border-radius: 50%;
}

/* Working Groups Grid */
.wg-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.wg-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 28px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
}

.wg-badge {
  align-self: flex-start;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: var(--color-blue-soft);
  color: var(--color-blue);
  padding: 3px 10px;
  border-radius: var(--radius-full);
  margin-bottom: 12px;
}

.wg-title {
  font-size: 20px;
  margin-bottom: 8px;
  color: var(--color-ink);
}

.wg-desc {
  font-size: 14px;
  color: var(--color-ink-muted);
  line-height: 1.5;
  margin-bottom: 20px;
  flex-grow: 1;
}

.wg-leadership {
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.wg-person {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.wg-role {
  color: var(--color-ink-subtle);
  font-weight: 500;
}

.wg-name {
  color: var(--color-ink);
  font-weight: 700;
}

/* CPD Resource Cards */
.resource-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.resource-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
}

.resource-card:hover {
  border-color: #CBD5E1;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.resource-title {
  font-size: 17px;
  margin-bottom: 8px;
  color: var(--color-ink);
}

.resource-desc {
  font-size: 13px;
  color: var(--color-ink-muted);
  line-height: 1.5;
  margin-bottom: 16px;
  flex-grow: 1;
}

.resource-link {
  font-size: 13px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* Forms */
.form-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 36px;
  box-shadow: var(--shadow-md);
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 18px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink);
  margin-bottom: 6px;
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--color-ink);
  background-color: #FFFFFF;
  transition: border-color 0.2s ease;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--color-blue);
  box-shadow: 0 0 0 3px rgba(0, 114, 187, 0.15);
}

.form-textarea {
  min-height: 110px;
  resize: vertical;
}

.alert {
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.5;
}

.alert-success {
  background-color: var(--color-success-bg);
  color: var(--color-success);
  border: 1px solid #86EFAC;
}

/* Footer */
.site-footer {
  background-color: var(--color-navy);
  color: #94A3B8;
  padding: 56px 0 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-col-title {
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 16px;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
}

.footer-links a {
  color: #94A3B8;
}

.footer-links a:hover {
  color: #FFFFFF;
}

.footer-bottom {
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

/* Responsive */
@media (max-width: 900px) {
  .nav-tiles-grid, .resource-grid {
    grid-template-columns: 1fr;
  }
  .webinar-grid, .wg-grid {
    grid-template-columns: 1fr;
  }
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-streamlined-title {
    font-size: 30px;
  }
  .hero-streamlined-lead {
    font-size: 16px;
  }
  .compact-event-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .compact-event-right {
    width: 100%;
    justify-content: space-between;
  }
  .mobile-toggle {
    display: block;
  }
  .main-nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: var(--color-navy);
    flex-direction: column;
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .main-nav.open {
    display: flex;
  }
  .nav-links {
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    gap: 12px;
  }
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}
`;

writeThemeFile("style.css", styleCss);

// -------------------------------------------------------------
// 2. HEADER.PHP
// -------------------------------------------------------------
const headerPhp = `<?php
/**
 * SFPE Australia Header
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
  <div class="top-bar">
    <div class="container top-bar-content">
      <div class="top-bar-tagline">
        <span class="top-bar-badge">Australian Chapter</span>
        <span>Society of Fire Protection Engineers</span>
      </div>
      <div>
        <a href="https://www.linkedin.com/company/sfpe-au/" target="_blank" rel="noopener" style="color: #CBD5E1; font-size: 13px; display: inline-flex; align-items: center; gap: 4px;">
          LinkedIn &rarr;
        </a>
      </div>
    </div>
  </div>

  <div class="container nav-container">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="brand-link">
      <svg class="brand-emblem-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="#0B132B"/>
        <!-- Flame Triangle (SFPE Red) -->
        <path d="M20 7L31 28H9L20 7Z" fill="#D32228"/>
        <!-- Stylized Inner Flame (White) -->
        <path d="M20 14C20 14 17 20 17 23C17 25 18.5 26.5 20 26.5C21.5 26.5 23 25 23 23C23 20 20 14 20 14Z" fill="#FFFFFF"/>
        <!-- Sweeping Dynamic Arc (Royal Blue) -->
        <path d="M7 32C13 35 27 35 33 32" stroke="#0072BB" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
      <div class="brand-text-block">
        <span class="brand-title">SFPE Australia</span>
        <span class="brand-subtitle">Fire Safety Engineering</span>
      </div>
    </a>

    <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle navigation">&#9776;</button>

    <nav class="main-nav" id="main-nav">
      <ul class="nav-links">
        <li><a href="<?php echo esc_url(home_url('/')); ?>" class="nav-link <?php echo is_front_page() ? 'active' : ''; ?>">Home</a></li>
        <li><a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="nav-link <?php echo is_page('webinars') ? 'active' : ''; ?>">Events</a></li>
        <li><a href="<?php echo esc_url(home_url('/working-groups/')); ?>" class="nav-link <?php echo is_page('working-groups') ? 'active' : ''; ?>">Groups</a></li>
        <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>" class="nav-link <?php echo is_page('cpd-hub') ? 'active' : ''; ?>">CPD</a></li>
        <li><a href="<?php echo esc_url(home_url('/about/')); ?>" class="nav-link <?php echo is_page('about') ? 'active' : ''; ?>">About</a></li>
        <li><a href="<?php echo esc_url(home_url('/contact/')); ?>" class="nav-link <?php echo is_page('contact') ? 'active' : ''; ?>">Get Involved</a></li>
      </ul>
      <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-primary" style="font-size: 13px; padding: 8px 14px;">Upcoming Events</a>
    </nav>
  </div>
</header>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('open');
    });
  }
});
</script>
`;

writeThemeFile("header.php", headerPhp);

// -------------------------------------------------------------
// 3. FOOTER.PHP
// -------------------------------------------------------------
const footerPhp = `<?php
/**
 * SFPE Australia Footer
 */
?>
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
          <svg class="brand-emblem-svg" style="width: 30px; height: 30px;" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#162544"/>
            <path d="M20 7L31 28H9L20 7Z" fill="#D32228"/>
            <path d="M20 14C20 14 17 20 17 23C17 25 18.5 26.5 20 26.5C21.5 26.5 23 25 23 23C23 20 20 14 20 14Z" fill="#FFFFFF"/>
            <path d="M7 32C13 35 27 35 33 32" stroke="#0072BB" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
          <span style="font-size: 17px; font-weight: 800; color: #FFFFFF;">SFPE Australia</span>
        </div>
        <p style="font-size: 13px; line-height: 1.6; color: #94A3B8; margin-bottom: 16px;">
          The window between Australian practice and international fire safety engineering research and practice.
        </p>
        <p style="font-size: 13px;">
          <a href="https://www.linkedin.com/company/sfpe-au/" target="_blank" rel="noopener" style="color: #60A5FA;">
            Follow on LinkedIn &rarr;
          </a>
        </p>
      </div>

      <div>
        <h4 class="footer-col-title">Navigation</h4>
        <ul class="footer-links">
          <li><a href="<?php echo esc_url(home_url('/webinars/')); ?>">Webinar Program</a></li>
          <li><a href="<?php echo esc_url(home_url('/working-groups/')); ?>">Working Groups</a></li>
          <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>">CPD Calendar Hub</a></li>
          <li><a href="<?php echo esc_url(home_url('/about/')); ?>">About the Chapter</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-col-title">Alliances</h4>
        <ul class="footer-links">
          <li><a href="https://www.sfpe.org" target="_blank" rel="noopener">SFPE Global</a></li>
          <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>">Society of Fire Safety (SFS)</a></li>
          <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>">AIDGC Dangerous Goods</a></li>
          <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>">SFPE New Zealand</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-col-title">Contact</h4>
        <ul class="footer-links">
          <li><a href="<?php echo esc_url(home_url('/contact/')); ?>">Get Involved</a></li>
          <li><a href="<?php echo esc_url(home_url('/contact/')); ?>">Handbook Discounts</a></li>
          <li><a href="mailto:haninh1997@gmail.com">haninh1997@gmail.com</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div>
        &copy; <?php echo date('Y'); ?> SFPE Australia Chapter. Affiliated with SFPE Global.
      </div>
      <div>
        Built for the Australian fire engineering community.
      </div>
    </div>
  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
`;

writeThemeFile("footer.php", footerPhp);

// -------------------------------------------------------------
// 4. FRONT-PAGE.PHP (Streamlined Homepage - 75% fewer words)
// -------------------------------------------------------------
const frontPagePhp = `<?php
/**
 * Template Name: Front Page (Home)
 */
get_header(); ?>

<!-- Clean, Concise Hero -->
<section class="hero-streamlined">
  <div class="container hero-streamlined-inner">
    <div class="hero-badge-clean">
      Official Australian Chapter &bull; Established 2026
    </div>
    <h1 class="hero-streamlined-title">
      Connecting Australian fire safety engineering with the world.
    </h1>
    <p class="hero-streamlined-lead">
      The Australian chapter of the Society of Fire Protection Engineers bridges local performance-based engineering practice with international fire science and research.
    </p>
    <div class="hero-streamlined-actions">
      <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-primary" style="padding: 12px 24px; font-size: 15px;">
        View Upcoming Events &rarr;
      </a>
      <a href="<?php echo esc_url(home_url('/about/')); ?>" class="btn btn-secondary" style="padding: 12px 24px; font-size: 15px;">
        About the Chapter
      </a>
    </div>
  </div>
</section>

<!-- Upcoming Events Strip -->
<section class="section section-alt">
  <div class="container">
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 20px;">
      <div>
        <span class="section-label">Webinar Program</span>
        <h2 class="section-heading" style="margin-bottom: 0;">Next in the 12-Month Pipeline</h2>
      </div>
      <a href="<?php echo esc_url(home_url('/webinars/')); ?>" style="font-size: 14px; font-weight: 600; color: var(--color-blue);">
        View all 6 sessions &rarr;
      </a>
    </div>

    <?php
    $upcoming_query = new WP_Query(array(
        'post_type'      => 'webinar',
        'posts_per_page' => 3,
        'orderby'        => 'menu_order title',
        'order'          => 'ASC',
    ));
    ?>

    <div class="compact-events-card">
      <ul class="compact-events-list">
        <?php if ($upcoming_query->have_posts()) : ?>
          <?php while ($upcoming_query->have_posts()) : $upcoming_query->the_post(); 
            $partner = get_post_meta(get_the_ID(), '_webinar_partner', true) ?: 'SFPE Alliance';
            $speaker = get_post_meta(get_the_ID(), '_webinar_speaker', true) ?: 'International Presenter';
            $discussant = get_post_meta(get_the_ID(), '_webinar_discussant', true) ?: 'Australian Discussant';
            $date_info = get_post_meta(get_the_ID(), '_webinar_date_display', true) ?: '2027';
            // Make short timeline label
            $short_date = (strpos($date_info, 'Late 2026') !== false) ? 'Late 2026' : ((strpos($date_info, 'Early 2027') !== false) ? 'Early 2027' : '2027');
          ?>
            <li>
              <a href="<?php the_permalink(); ?>" class="compact-event-row">
                <div class="compact-event-left">
                  <span class="compact-event-date"><?php echo esc_html($short_date); ?></span>
                  <div class="compact-event-meta">
                    <div class="compact-event-title"><?php the_title(); ?></div>
                    <div class="compact-event-sub"><?php echo esc_html($speaker); ?> &bull; Discussant: <?php echo esc_html($discussant); ?></div>
                  </div>
                </div>
                <div class="compact-event-right">
                  <span class="compact-event-badge"><?php echo esc_html($partner); ?></span>
                  <span class="compact-event-arrow">&rarr;</span>
                </div>
              </a>
            </li>
          <?php endwhile; wp_reset_postdata(); ?>
        <?php else : ?>
          <li style="padding: 24px; text-align: center; color: var(--color-ink-muted);">
            Webinar program announcements coming soon.
          </li>
        <?php endif; ?>
      </ul>
    </div>
  </div>
</section>

<!-- 3 Navigation Tiles -->
<section class="section">
  <div class="container">
    <div style="text-align: center; max-width: 600px; margin: 0 auto 36px;">
      <span class="section-label">Chapter Pillars</span>
      <h2 class="section-heading" style="margin-bottom: 0;">Explore SFPE Australia</h2>
    </div>

    <div class="nav-tiles-grid">
      <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="nav-tile-card">
        <div class="nav-tile-icon">&#127908;</div>
        <h3 class="nav-tile-title">Technical Webinars</h3>
        <p class="nav-tile-desc">
          6-part international series featuring global fire science leaders paired with local discussants.
        </p>
        <span class="nav-tile-link">View Pipeline &rarr;</span>
      </a>

      <a href="<?php echo esc_url(home_url('/working-groups/')); ?>" class="nav-tile-card">
        <div class="nav-tile-icon">&#128101;</div>
        <h3 class="nav-tile-title">Working Groups</h3>
        <p class="nav-tile-desc">
          Four committees driving our technical program, industry partnerships, digital reach, and sponsorship.
        </p>
        <span class="nav-tile-link">Meet the Chairs &rarr;</span>
      </a>

      <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="nav-tile-card">
        <div class="nav-tile-icon">&#9993;</div>
        <h3 class="nav-tile-title">Get Involved</h3>
        <p class="nav-tile-desc">
          Volunteer with a committee, propose an international topic, or enquire about handbook discounts.
        </p>
        <span class="nav-tile-link">Join Chapter &rarr;</span>
      </a>
    </div>
  </div>
</section>

<!-- Partner Logo Strip -->
<div class="partner-strip">
  <div class="container">
    <div class="partner-strip-title">Collaborating with Domestic &amp; Global Fire Engineering Bodies</div>
    <div class="partner-pills-row">
      <span class="partner-pill-badge">SFPE Global</span>
      <span class="partner-pill-badge">Society of Fire Safety (SFS)</span>
      <span class="partner-pill-badge">AIDGC Dangerous Goods</span>
      <span class="partner-pill-badge">IFE Australia</span>
      <span class="partner-pill-badge">SFPE New Zealand</span>
      <span class="partner-pill-badge">SFPE UK</span>
    </div>
  </div>
</div>

<?php get_footer(); ?>
`;

writeThemeFile("front-page.php", frontPagePhp);
writeThemeFile("page-home.php", frontPagePhp);

// -------------------------------------------------------------
// 5. PAGE-ABOUT.PHP (New Dedicated About Page)
// -------------------------------------------------------------
const pageAboutPhp = `<?php
/**
 * Template Name: About Page
 */
get_header(); ?>

<section class="section" style="padding-top: 50px; background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container" style="max-width: 800px;">
    <span class="section-label">Identity &amp; Charter</span>
    <h1 class="section-heading" style="font-size: 38px; margin-bottom: 16px;">About SFPE Australia</h1>
    <p style="font-size: 18px; line-height: 1.6; color: var(--color-ink-muted);">
      SFPE Australia is the window between Australian practice and international fire safety engineering research and practice.
    </p>
  </div>
</section>

<section class="section">
  <div class="container" style="max-width: 800px;">
    <!-- Strategic Positioning -->
    <div style="background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 36px; margin-bottom: 40px; box-shadow: var(--shadow-sm);">
      <h2 style="font-size: 22px; color: var(--color-ink); margin-bottom: 16px;">Our Positioning &amp; Model</h2>
      <p style="font-size: 15px; color: var(--color-ink-muted); line-height: 1.7; margin-bottom: 20px;">
        Agreed unanimously by chapter members, SFPE Australia operates with a distinctive, collaborative philosophy:
      </p>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 14px; align-items: flex-start;">
          <span style="color: var(--color-crimson); font-weight: 800; font-size: 18px;">&bull;</span>
          <div>
            <strong style="color: var(--color-ink); display: block; font-size: 15px; margin-bottom: 2px;">Domestic in Partnership</strong>
            <span style="font-size: 14px; color: var(--color-ink-muted); line-height: 1.6;">
              We do not compete with or mirror the Society of Fire Safety (SFS). All domestic activities are conducted in partnership with SFS, Engineers Australia, and AIDGC.
            </span>
          </div>
        </div>
        <div style="display: flex; gap: 14px; align-items: flex-start;">
          <span style="color: var(--color-blue); font-weight: 800; font-size: 18px;">&bull;</span>
          <div>
            <strong style="color: var(--color-ink); display: block; font-size: 15px; margin-bottom: 2px;">International Owned by SFPE</strong>
            <span style="font-size: 14px; color: var(--color-ink-muted); line-height: 1.6;">
              We own the international link, providing direct connections to global SFPE chapters (UK, New Zealand, North America), research institutes (UL FSRI, NFPA FPRF), and handbook authors.
            </span>
          </div>
        </div>
        <div style="display: flex; gap: 14px; align-items: flex-start;">
          <span style="color: var(--color-success); font-weight: 800; font-size: 18px;">&bull;</span>
          <div>
            <strong style="color: var(--color-ink); display: block; font-size: 15px; margin-bottom: 2px;">The Discussant Model</strong>
            <span style="font-size: 14px; color: var(--color-ink-muted); line-height: 1.6;">
              Every international presentation is paired with an Australian specialist discussant to translate global fire science into practical National Construction Code (NCC/BCA) performance solutions.
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Chapter Leadership & Contributors -->
    <div style="background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 36px; margin-bottom: 40px; box-shadow: var(--shadow-sm);">
      <h2 style="font-size: 22px; color: var(--color-ink); margin-bottom: 16px;">Founding Committee &amp; Leaders</h2>
      <p style="font-size: 14px; color: var(--color-ink-muted); line-height: 1.6; margin-bottom: 20px;">
        Acknowledging the fire safety engineering leaders and practitioners who established the chapter charter:
      </p>
      <div style="display: flex; flex-wrap: wrap; gap: 10px;">
        <span class="partner-pill-badge">Dr. Jonathan R. Barnett</span>
        <span class="partner-pill-badge">Dr. Frank Mendham</span>
        <span class="partner-pill-badge">Dan Rathnayaka</span>
        <span class="partner-pill-badge">Michael Beecroft</span>
        <span class="partner-pill-badge">Amer Magrabi</span>
        <span class="partner-pill-badge">Prof. David Lange (UQ)</span>
        <span class="partner-pill-badge">Tobias Salomonsson</span>
        <span class="partner-pill-badge">Aaron Nicholson</span>
        <span class="partner-pill-badge">Alex Glennon</span>
        <span class="partner-pill-badge">Hui MC</span>
        <span class="partner-pill-badge">Pelle Zetterstrom</span>
        <span class="partner-pill-badge">Simon Krishnan</span>
        <span class="partner-pill-badge">Derya Horasan</span>
        <span class="partner-pill-badge">Ninh</span>
      </div>
    </div>

    <!-- Actions -->
    <div style="text-align: center;">
      <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-primary" style="padding: 12px 24px;">
        View Webinar Program &rarr;
      </a>
      <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn btn-outline-dark" style="padding: 12px 24px; margin-left: 12px;">
        Get in Touch
      </a>
    </div>
  </div>
</section>

<?php get_footer(); ?>
`;

writeThemeFile("page-about.php", pageAboutPhp);

// -------------------------------------------------------------
// 6. PAGE-WEBINARS.PHP (Streamlined Webinars Page)
// -------------------------------------------------------------
const pageWebinarsPhp = `<?php
/**
 * Template Name: Webinars Page
 */
get_header(); ?>

<section class="section" style="padding-top: 50px; background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <span class="section-label">CPD &amp; Education</span>
    <h1 class="section-heading" style="font-size: 38px; margin-bottom: 12px;">Webinar Program &amp; Pipeline</h1>
    <p style="max-width: 720px; font-size: 16px; color: var(--color-ink-muted); margin-bottom: 24px;">
      Targeting 6 high-caliber technical seminars over the next 12 months. Each session pairs an international subject expert with an Australian discussant.
    </p>
    <div style="display: inline-flex; align-items: center; gap: 8px; background-color: var(--color-surface-alt); border: 1px solid var(--color-border); padding: 8px 16px; border-radius: var(--radius-sm); font-size: 13px; color: var(--color-ink);">
      <strong style="color: var(--color-blue);">EA CPD:</strong> Attendance is self-reportable to Engineers Australia under technical professional development.
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <?php
    $all_webinars = new WP_Query(array(
        'post_type'      => 'webinar',
        'posts_per_page' => -1,
        'orderby'        => 'menu_order title',
        'order'          => 'ASC',
    ));
    ?>

    <div class="webinar-grid">
      <?php if ($all_webinars->have_posts()) : ?>
        <?php while ($all_webinars->have_posts()) : $all_webinars->the_post(); 
          $session = get_post_meta(get_the_ID(), '_webinar_session_number', true) ?: 'Upcoming Session';
          $partner = get_post_meta(get_the_ID(), '_webinar_partner', true) ?: 'SFPE Alliance';
          $speaker = get_post_meta(get_the_ID(), '_webinar_speaker', true) ?: 'International Presenter';
          $discussant = get_post_meta(get_the_ID(), '_webinar_discussant', true) ?: 'Australian Discussant';
          $status = get_post_meta(get_the_ID(), '_webinar_status', true) ?: 'In Pipeline';
          $date_info = get_post_meta(get_the_ID(), '_webinar_date_display', true) ?: '2026/2027';
        ?>
          <div class="webinar-card">
            <div class="webinar-card-top">
              <span class="webinar-session-badge"><?php echo esc_html($session); ?></span>
              <span class="webinar-partner-pill"><?php echo esc_html($partner); ?></span>
            </div>
            <h2 class="webinar-title">
              <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
            </h2>
            <div class="webinar-desc">
              <?php echo esc_html(wp_trim_words(get_the_excerpt() ?: get_the_content(), 24)); ?>
            </div>
            <div class="webinar-specs">
              <div class="webinar-spec-row">
                <span class="webinar-spec-label">Timeline:</span>
                <span class="webinar-spec-value"><?php echo esc_html($date_info); ?></span>
              </div>
              <div class="webinar-spec-row">
                <span class="webinar-spec-label">Presenter:</span>
                <span class="webinar-spec-value"><?php echo esc_html($speaker); ?></span>
              </div>
              <div class="webinar-spec-row">
                <span class="webinar-spec-label">Discussant:</span>
                <span class="webinar-spec-value"><?php echo esc_html($discussant); ?></span>
              </div>
            </div>
            <div class="webinar-card-footer">
              <span class="webinar-status"><?php echo esc_html($status); ?></span>
              <a href="<?php the_permalink(); ?>" class="btn btn-outline-dark" style="font-size: 13px; padding: 6px 12px;">Details &rarr;</a>
            </div>
          </div>
        <?php endwhile; wp_reset_postdata(); ?>
      <?php endif; ?>
    </div>

    <!-- Alert Subscription Form -->
    <div style="margin-top: 64px;">
      <div class="form-card">
        <h3 style="font-size: 22px; margin-bottom: 8px; text-align: center; color: var(--color-ink);">
          Receive Webinar Invitations
        </h3>
        <p style="font-size: 14px; color: var(--color-ink-muted); text-align: center; margin-bottom: 24px;">
          Register to receive session alerts and calendar invitations as dates are finalized.
        </p>

        <?php if (isset($_GET['submitted'])) : ?>
          <div class="alert alert-success">
            Thank you for registering. You will receive notifications when session registration opens.
          </div>
        <?php endif; ?>

        <form method="POST" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
          <?php wp_nonce_field('sfpe_contact_action', 'sfpe_contact_nonce'); ?>
          <input type="hidden" name="interest_area" value="Webinar Pipeline Registration">

          <div class="form-group">
            <label class="form-label" for="full_name">Full Name *</label>
            <input type="text" id="full_name" name="full_name" class="form-input" required placeholder="Jane Smith">
          </div>

          <div class="form-group">
            <label class="form-label" for="email">Email Address *</label>
            <input type="email" id="email" name="email" class="form-input" required placeholder="jane.smith@example.com">
          </div>

          <div class="form-group">
            <label class="form-label" for="organization">Organization</label>
            <input type="text" id="organization" name="organization" class="form-input" placeholder="Consultancy or Academic Institution">
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 14px;">
            Subscribe for Session Alerts
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
`;

writeThemeFile("page-webinars.php", pageWebinarsPhp);

// -------------------------------------------------------------
// 7. PAGE-WORKING-GROUPS.PHP (Concise Working Groups)
// -------------------------------------------------------------
const pageWorkingGroupsPhp = `<?php
/**
 * Template Name: Working Groups Page
 */
get_header(); ?>

<section class="section" style="padding-top: 50px; background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <span class="section-label">Governance &amp; Operations</span>
    <h1 class="section-heading" style="font-size: 38px; margin-bottom: 12px;">Working Groups</h1>
    <p style="max-width: 720px; font-size: 16px; color: var(--color-ink-muted);">
      Four working groups established by chapter members to advance technical programs, industry liaison, digital platforms, and sponsorship.
    </p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="wg-grid">
      <!-- 1. Technical Program -->
      <div class="wg-card">
        <span class="wg-badge">Group 1 &bull; Technical Program</span>
        <h2 class="wg-title">Technical Program</h2>
        <p class="wg-desc">
          Curates the 6-part annual webinar pipeline, identifies international research topics, and pairs global speakers with Australian discussants.
        </p>
        <div class="wg-leadership">
          <div class="wg-person">
            <span class="wg-role">Chair:</span>
            <span class="wg-name">Dan Rathnayaka</span>
          </div>
          <div class="wg-person">
            <span class="wg-role">Assisting:</span>
            <span class="wg-name">Jonathan R. Barnett</span>
          </div>
          <div class="wg-person">
            <span class="wg-role">Contributing:</span>
            <span class="wg-name">Simon Krishnan, Amer Magrabi</span>
          </div>
        </div>
      </div>

      <!-- 2. Partnerships & Events -->
      <div class="wg-card">
        <span class="wg-badge">Group 2 &bull; Industry Liaison</span>
        <h2 class="wg-title">Partnerships &amp; Events</h2>
        <p class="wg-desc">
          Fosters collaborative alliances with SFS, IFE, AIDGC, and overseas SFPE chapters (UK, New Zealand) to deliver co-badged seminars.
        </p>
        <div class="wg-leadership">
          <div class="wg-person">
            <span class="wg-role">Chair:</span>
            <span class="wg-name">Michael Beecroft</span>
          </div>
          <div class="wg-person">
            <span class="wg-role">Contributing:</span>
            <span class="wg-name">Jonathan R. Barnett</span>
          </div>
        </div>
      </div>

      <!-- 3. Digital & Membership -->
      <div class="wg-card">
        <span class="wg-badge">Group 3 &bull; Digital &amp; Communications</span>
        <h2 class="wg-title">Digital &amp; Membership</h2>
        <p class="wg-desc">
          Manages chapter digital channels, event communications, and assists members with accessing SFPE Handbook international discounts.
        </p>
        <div class="wg-leadership">
          <div class="wg-person">
            <span class="wg-role">Chair:</span>
            <span class="wg-name">Amer Magrabi</span>
          </div>
          <div class="wg-person">
            <span class="wg-role">Digital Lead:</span>
            <span class="wg-name">Ninh</span>
          </div>
        </div>
      </div>

      <!-- 4. Sponsorship & Development -->
      <div class="wg-card">
        <span class="wg-badge">Group 4 &bull; Growth &amp; Governance</span>
        <h2 class="wg-title">Sponsorship &amp; Development</h2>
        <p class="wg-desc">
          Develops chapter sponsorship prospectuses, policy frameworks, and addresses insurance and long-term organizational governance.
        </p>
        <div class="wg-leadership">
          <div class="wg-person">
            <span class="wg-role">Chair:</span>
            <span class="wg-name">Frank Mendham</span>
          </div>
          <div class="wg-person">
            <span class="wg-role">Assisting:</span>
            <span class="wg-name">Derya Horasan &amp; Pelle Zetterstrom</span>
          </div>
        </div>
      </div>
    </div>

    <div style="text-align: center; margin-top: 48px;">
      <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn btn-primary" style="padding: 12px 28px;">
        Join a Working Group &rarr;
      </a>
    </div>
  </div>
</section>

<?php get_footer(); ?>
`;

writeThemeFile("page-working-groups.php", pageWorkingGroupsPhp);

// -------------------------------------------------------------
// 8. PAGE-CPD-HUB.PHP (Clean Directory Format)
// -------------------------------------------------------------
const pageCpdHubPhp = `<?php
/**
 * Template Name: CPD Hub Page
 */
get_header(); ?>

<section class="section" style="padding-top: 50px; background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <span class="section-label">Professional Development</span>
    <h1 class="section-heading" style="font-size: 38px; margin-bottom: 12px;">CPD &amp; Partner Hub</h1>
    <p style="max-width: 720px; font-size: 16px; color: var(--color-ink-muted);">
      A central directory linking Australian fire safety engineers to accredited CPD calendars across domestic partner societies and international research bodies.
    </p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="resource-grid">
      <!-- SFS -->
      <div class="resource-card">
        <h2 class="resource-title">Society of Fire Safety (SFS)</h2>
        <p class="resource-desc">
          Engineers Australia primary technical society. Regional seminars, state chapter presentations, and national conferences.
        </p>
        <a href="https://www.engineersaustralia.org.au/communities/technical-societies/society-fire-safety" target="_blank" rel="noopener" class="resource-link">
          Visit SFS Calendar &rarr;
        </a>
      </div>

      <!-- AIDGC -->
      <div class="resource-card">
        <h2 class="resource-title">AIDGC Dangerous Goods</h2>
        <p class="resource-desc">
          Australasian Institute of Dangerous Goods Consultants. CPD on flammable liquids, gas storages, chemical warehouses, and hazardous facilities.
        </p>
        <a href="https://aidgc.org.au" target="_blank" rel="noopener" class="resource-link">
          Visit AIDGC Events &rarr;
        </a>
      </div>

      <!-- IFE Australia -->
      <div class="resource-card">
        <h2 class="resource-title">Institution of Fire Engineers (IFE)</h2>
        <p class="resource-desc">
          IFE Australia Branch lectures, exams, and professional development bridging operational fire service and engineering.
        </p>
        <a href="https://ife.org.au" target="_blank" rel="noopener" class="resource-link">
          Visit IFE Australia &rarr;
        </a>
      </div>

      <!-- SFPE International -->
      <div class="resource-card">
        <h2 class="resource-title">SFPE Global Webinars</h2>
        <p class="resource-desc">
          Worldwide fire protection engineering webinars, symposiums, technical guides, and SFPE Foundation research hub.
        </p>
        <a href="https://www.sfpe.org/events/webinars" target="_blank" rel="noopener" class="resource-link">
          Visit SFPE Global &rarr;
        </a>
      </div>

      <!-- UL FSRI & NFPA -->
      <div class="resource-card">
        <h2 class="resource-title">UL FSRI &amp; NFPA Research</h2>
        <p class="resource-desc">
          Fire Safety Research Institute and NFPA Research Foundation leading webinars on fire dynamics, battery hazards, and materials.
        </p>
        <a href="https://fsri.org" target="_blank" rel="noopener" class="resource-link">
          Visit UL FSRI Hub &rarr;
        </a>
      </div>

      <!-- Engineers Australia -->
      <div class="resource-card">
        <h2 class="resource-title">Engineers Australia CPD</h2>
        <p class="resource-desc">
          CPD logging portal for chartered status (CPEng / NER). SFPE Australia webinars qualify directly under technical development.
        </p>
        <a href="https://www.engineersaustralia.org.au/training-and-events" target="_blank" rel="noopener" class="resource-link">
          Visit EA Portal &rarr;
        </a>
      </div>
    </div>

    <!-- Quick EA Reporting Tip -->
    <div style="margin-top: 48px; background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 28px;">
      <h3 style="font-size: 18px; color: var(--color-ink); margin-bottom: 8px;">Engineers Australia CPD Self-Reporting</h3>
      <p style="font-size: 14px; color: var(--color-ink-muted); line-height: 1.6;">
        Retain your webinar confirmation email and record 1.0 to 1.5 hours per session under <em>Type II: Technical Presentations</em> on your Engineers Australia member portal.
      </p>
    </div>
  </div>
</section>

<?php get_footer(); ?>
`;

writeThemeFile("page-cpd-hub.php", pageCpdHubPhp);

// -------------------------------------------------------------
// 9. PAGE-CONTACT.PHP (Get Involved & Contact)
// -------------------------------------------------------------
const pageContactPhp = `<?php
/**
 * Template Name: Contact & Get Involved Page
 */
get_header(); ?>

<section class="section" style="padding-top: 50px; background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container" style="text-align: center;">
    <span class="section-label">Community</span>
    <h1 class="section-heading" style="font-size: 38px; margin-bottom: 12px;">Get Involved</h1>
    <p style="max-width: 640px; margin: 0 auto; font-size: 16px; color: var(--color-ink-muted);">
      Volunteer with a working group, propose an international speaker, or enquire about chapter initiatives.
    </p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="form-card">
      <?php if (isset($_GET['submitted'])) : ?>
        <div class="alert alert-success">
          Thank you for reaching out. Your message has been received and our committee will respond shortly.
        </div>
      <?php endif; ?>

      <form method="POST" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
        <?php wp_nonce_field('sfpe_contact_action', 'sfpe_contact_nonce'); ?>

        <div class="form-group">
          <label class="form-label" for="full_name">Full Name *</label>
          <input type="text" id="full_name" name="full_name" class="form-input" required placeholder="Alex Glennon">
        </div>

        <div class="form-group">
          <label class="form-label" for="email">Email Address *</label>
          <input type="email" id="email" name="email" class="form-input" required placeholder="alex@example.com.au">
        </div>

        <div class="form-group">
          <label class="form-label" for="organization">Company / Affiliation</label>
          <input type="text" id="organization" name="organization" class="form-input" placeholder="Fire Engineering Consultancy or Research Body">
        </div>

        <div class="form-group">
          <label class="form-label" for="interest_area">How would you like to participate? *</label>
          <select id="interest_area" name="interest_area" class="form-select">
            <option value="Join Working Group: Technical Program">Join Working Group: Technical Program</option>
            <option value="Join Working Group: Partnerships & Events">Join Working Group: Partnerships &amp; Events</option>
            <option value="Join Working Group: Digital & Membership">Join Working Group: Digital &amp; Membership</option>
            <option value="Join Working Group: Sponsorship & Development">Join Working Group: Sponsorship &amp; Development</option>
            <option value="Webinar Speaker or Topic Proposal">Webinar Speaker or Topic Proposal</option>
            <option value="SFPE Handbook Discount Inquiry">SFPE Handbook Discount Inquiry</option>
            <option value="General Inquiry">General Inquiry</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="message">Message *</label>
          <textarea id="message" name="message" class="form-textarea" required placeholder="How would you like to participate or what can we help with?"></textarea>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 14px;">
          Send Message
        </button>
      </form>

      <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--color-border); text-align: center; font-size: 13px; color: var(--color-ink-muted);">
        Enquiries route to chapter administrator at <strong>haninh1997@gmail.com</strong>.
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
`;

writeThemeFile("page-contact.php", pageContactPhp);

// -------------------------------------------------------------
// 10. SINGLE-WEBINAR.PHP
// -------------------------------------------------------------
const singleWebinarPhp = `<?php
get_header(); ?>
<main class="section">
  <div class="container" style="max-width: 760px;">
    <?php while (have_posts()) : the_post(); 
      $session = get_post_meta(get_the_ID(), '_webinar_session_number', true) ?: 'Upcoming Session';
      $partner = get_post_meta(get_the_ID(), '_webinar_partner', true) ?: 'SFPE Alliance';
      $speaker = get_post_meta(get_the_ID(), '_webinar_speaker', true) ?: 'International Presenter';
      $discussant = get_post_meta(get_the_ID(), '_webinar_discussant', true) ?: 'Australian Discussant';
      $status = get_post_meta(get_the_ID(), '_webinar_status', true) ?: 'In Pipeline';
      $date_info = get_post_meta(get_the_ID(), '_webinar_date_display', true) ?: '2026/2027';
    ?>
      <div style="margin-bottom: 20px;">
        <span class="webinar-session-badge"><?php echo esc_html($session); ?></span>
        <span class="webinar-partner-pill" style="margin-left: 10px;"><?php echo esc_html($partner); ?></span>
      </div>
      <h1 style="font-size: 32px; margin-bottom: 20px; line-height: 1.25;"><?php the_title(); ?></h1>
      
      <div class="webinar-specs" style="margin-bottom: 28px;">
        <div class="webinar-spec-row">
          <span class="webinar-spec-label">Target Timeline:</span>
          <span class="webinar-spec-value"><?php echo esc_html($date_info); ?></span>
        </div>
        <div class="webinar-spec-row">
          <span class="webinar-spec-label">International Speaker:</span>
          <span class="webinar-spec-value"><?php echo esc_html($speaker); ?></span>
        </div>
        <div class="webinar-spec-row">
          <span class="webinar-spec-label">Australian Discussant:</span>
          <span class="webinar-spec-value"><?php echo esc_html($discussant); ?></span>
        </div>
        <div class="webinar-spec-row">
          <span class="webinar-spec-label">Status:</span>
          <span class="webinar-spec-value"><?php echo esc_html($status); ?></span>
        </div>
      </div>

      <div style="font-size: 16px; line-height: 1.7; color: var(--color-ink-muted); margin-bottom: 36px;">
        <?php the_content(); ?>
      </div>

      <div style="padding-top: 20px; border-top: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center;">
        <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-outline-dark" style="font-size: 13px;">&larr; All Webinars</a>
        <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn btn-primary" style="font-size: 13px;">Register Interest</a>
      </div>
    <?php endwhile; ?>
  </div>
</main>
<?php get_footer(); ?>
`;

writeThemeFile("single-webinar.php", singleWebinarPhp);

console.log("All streamlined redesign theme files written successfully!");
