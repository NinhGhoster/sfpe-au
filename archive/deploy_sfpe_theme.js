// deploy_sfpe_theme.js
// Creates and deploys the complete SFPE Australia custom WordPress theme to sfpe.xo.je
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

// 1. STYLE.CSS
const styleCss = `/*
Theme Name: SFPE Australia
Theme URI: https://sfpe.xo.je
Description: Official theme for the Australian Chapter of the Society of Fire Protection Engineers (SFPE).
Author: Ninh
Author URI: https://sfpe.xo.je
Version: 1.0.0
Text Domain: sfpe-australia
*/

:root {
  --color-bg-dark: #0B132B;
  --color-bg-navy: #111D4A;
  --color-bg-canvas: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-surface-alt: #F1F5F9;
  --color-ink: #0F172A;
  --color-ink-muted: #475569;
  --color-ink-subtle: #64748B;
  --color-accent: #D96527;
  --color-accent-hover: #BF531B;
  --color-accent-soft: #FFEDD5;
  --color-accent-dark: #7C2D12;
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
  --container-max: 1200px;
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
  color: var(--color-accent);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--color-accent-hover);
}

.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 24px;
}

/* Header & Navigation */
.site-header {
  background-color: var(--color-bg-dark);
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

.top-bar-tagline strong {
  color: #F8FAFC;
}

.top-bar-badge {
  background-color: var(--color-accent);
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
  gap: 14px;
  color: #FFFFFF;
  text-decoration: none;
}

.brand-emblem {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, var(--color-accent) 0%, #EA580C 100%);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-weight: 800;
  font-size: 20px;
  box-shadow: 0 4px 12px rgba(217, 101, 39, 0.35);
}

.brand-text-block {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #FFFFFF;
}

.brand-subtitle {
  font-size: 12px;
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
  gap: 20px;
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
  background-color: var(--color-accent);
  color: #FFFFFF;
  box-shadow: 0 2px 4px rgba(217, 101, 39, 0.2);
}

.btn-primary:hover {
  background-color: var(--color-accent-hover);
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

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, var(--color-bg-dark) 0%, #172554 100%);
  color: #FFFFFF;
  padding: 80px 0 90px;
  position: relative;
  overflow: hidden;
}

.hero-section::after {
  content: '';
  position: absolute;
  top: -20%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(217, 101, 39, 0.15) 0%, rgba(217, 101, 39, 0) 70%);
  pointer-events: none;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 48px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(217, 101, 39, 0.2);
  border: 1px solid rgba(217, 101, 39, 0.4);
  color: #FED7AA;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 24px;
}

.hero-title {
  font-size: 44px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -1px;
  color: #FFFFFF;
  margin-bottom: 24px;
}

.hero-title span {
  color: #FDBA74;
}

.hero-lead {
  font-size: 18px;
  line-height: 1.6;
  color: #CBD5E1;
  margin-bottom: 32px;
  max-width: 620px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero-card {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-lg);
  padding: 32px;
  backdrop-filter: blur(8px);
}

.hero-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.hero-card-icon {
  width: 40px;
  height: 40px;
  background-color: var(--color-accent);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.hero-card-title {
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 700;
}

.hero-card-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero-card-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  font-size: 14px;
  color: #E2E8F0;
}

.hero-card-item strong {
  color: #FFFFFF;
  display: block;
  font-size: 15px;
}

/* Stat bar */
.stat-bar {
  background-color: #0F172A;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: #FFFFFF;
  padding: 24px 0;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  text-align: center;
}

.stat-item {
  padding: 0 12px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-item:last-child {
  border-right: none;
}

.stat-number {
  font-size: 28px;
  font-weight: 800;
  color: var(--color-accent);
  line-height: 1;
  margin-bottom: 6px;
  font-family: var(--font-heading);
}

.stat-label {
  font-size: 13px;
  color: #94A3B8;
  font-weight: 500;
}

/* Section Common */
.section {
  padding: 80px 0;
}

.section-alt {
  background-color: var(--color-surface);
}

.section-header {
  max-width: 720px;
  margin: 0 auto 56px;
  text-align: center;
}

.section-tag {
  color: var(--color-accent);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
  display: block;
}

.section-title {
  font-size: 32px;
  letter-spacing: -0.5px;
  margin-bottom: 16px;
  color: var(--color-ink);
}

.section-desc {
  font-size: 17px;
  color: var(--color-ink-muted);
  line-height: 1.6;
}

/* Pillars Grid */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.pillar-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.pillar-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: #CBD5E1;
}

.pillar-icon {
  width: 48px;
  height: 48px;
  background-color: var(--color-accent-soft);
  color: var(--color-accent-dark);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 20px;
}

.pillar-title {
  font-size: 20px;
  margin-bottom: 12px;
  color: var(--color-ink);
}

.pillar-text {
  font-size: 15px;
  color: var(--color-ink-muted);
  line-height: 1.6;
}

/* Webinar Cards & Grid */
.webinar-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.webinar-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.webinar-card:hover {
  box-shadow: var(--shadow-md);
  border-color: #CBD5E1;
}

.webinar-card-header {
  padding: 20px 24px;
  background-color: var(--color-surface-alt);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.webinar-session-badge {
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-accent);
}

.webinar-partner-pill {
  font-size: 12px;
  font-weight: 600;
  background-color: #FFFFFF;
  border: 1px solid var(--color-border);
  padding: 3px 10px;
  border-radius: var(--radius-full);
  color: var(--color-ink-muted);
}

.webinar-card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.webinar-title {
  font-size: 18px;
  margin-bottom: 14px;
  line-height: 1.35;
  color: var(--color-ink);
}

.webinar-desc {
  font-size: 14px;
  color: var(--color-ink-muted);
  margin-bottom: 20px;
  line-height: 1.6;
  flex-grow: 1;
}

.webinar-specs {
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-sm);
  padding: 14px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  text-align: right;
}

.webinar-card-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
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
  width: 8px;
  height: 8px;
  background-color: var(--color-success);
  border-radius: 50%;
}

/* Working Groups Grid */
.wg-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

.wg-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
}

.wg-badge {
  align-self: flex-start;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: var(--color-accent-soft);
  color: var(--color-accent-dark);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  margin-bottom: 16px;
}

.wg-title {
  font-size: 22px;
  margin-bottom: 12px;
  color: var(--color-ink);
}

.wg-desc {
  font-size: 15px;
  color: var(--color-ink-muted);
  line-height: 1.6;
  margin-bottom: 24px;
}

.wg-leadership {
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
}

.wg-person {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.wg-role {
  color: var(--color-ink-subtle);
  font-weight: 500;
}

.wg-name {
  color: var(--color-ink);
  font-weight: 700;
}

/* CPD Hub & Resource Cards */
.resource-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.resource-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 28px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
}

.resource-card:hover {
  border-color: #CBD5E1;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.resource-icon {
  width: 44px;
  height: 44px;
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--color-ink);
  margin-bottom: 16px;
}

.resource-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: var(--color-ink);
}

.resource-desc {
  font-size: 14px;
  color: var(--color-ink-muted);
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
}

.resource-link {
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* Forms */
.form-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 40px;
  box-shadow: var(--shadow-md);
  max-width: 640px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-ink);
  margin-bottom: 8px;
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--color-ink);
  background-color: #FFFFFF;
  transition: border-color 0.2s ease;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(217, 101, 39, 0.15);
}

.form-textarea {
  min-height: 130px;
  resize: vertical;
}

.alert {
  padding: 14px 18px;
  border-radius: var(--radius-sm);
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 1.5;
}

.alert-success {
  background-color: var(--color-success-bg);
  color: var(--color-success);
  border: 1px solid #86EFAC;
}

/* Callout Box */
.callout-box {
  background: linear-gradient(135deg, var(--color-bg-dark) 0%, #1E293B 100%);
  color: #FFFFFF;
  border-radius: var(--radius-lg);
  padding: 48px;
  margin-top: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
}

.callout-content h3 {
  color: #FFFFFF;
  font-size: 26px;
  margin-bottom: 12px;
}

.callout-content p {
  color: #CBD5E1;
  font-size: 16px;
  max-width: 600px;
}

/* Footer */
.site-footer {
  background-color: var(--color-bg-dark);
  color: #94A3B8;
  padding: 64px 0 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.footer-col-title {
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 14px;
}

.footer-links a {
  color: #94A3B8;
}

.footer-links a:hover {
  color: #FFFFFF;
}

.footer-bottom {
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

/* Responsive */
@media (max-width: 992px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
  .pillars-grid, .webinar-grid, .resource-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .wg-grid {
    grid-template-columns: 1fr;
  }
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .callout-box {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .stat-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .stat-item:nth-child(2) {
    border-right: none;
  }
  .pillars-grid, .webinar-grid, .resource-grid {
    grid-template-columns: 1fr;
  }
  .footer-grid {
    grid-template-columns: 1fr;
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
    background-color: var(--color-bg-dark);
    flex-direction: column;
    padding: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .main-nav.open {
    display: flex;
  }
  .nav-links {
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
  }
  .hero-title {
    font-size: 32px;
  }
  .hero-section {
    padding: 50px 0 60px;
  }
}
`;

writeThemeFile("style.css", styleCss);

// 2. FUNCTIONS.PHP
const functionsPhp = `<?php
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
        '1.0.0'
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

        // Recipient email specified by user: haninh1997@gmail.com
        $to = 'haninh1997@gmail.com';
        $subject = '[SFPE Australia] New Inquiry: ' . $topic . ' from ' . $name;
        $body = "New submission via SFPE Australia Website (sfpe.xo.je):\\n\\n";
        $body .= "Name: " . $name . "\\n";
        $body .= "Email: " . $email . "\\n";
        $body .= "Organization: " . $organization . "\\n";
        $body .= "Interest Area: " . $topic . "\\n\\n";
        $body .= "Message:\\n" . $message . "\\n\\n";
        $body .= "---\\nSubmitted on: " . current_time('mysql');

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
`;

writeThemeFile("functions.php", functionsPhp);

// 3. HEADER.PHP
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
        <span class="top-bar-badge">Official Chapter</span>
        <span>The window between Australian practice & international fire safety research</span>
      </div>
      <div>
        <a href="<?php echo esc_url(home_url('/contact/')); ?>" style="color: #CBD5E1; font-size: 13px;">Member Enquiries</a>
      </div>
    </div>
  </div>

  <div class="container nav-container">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="brand-link">
      <div class="brand-emblem">SF</div>
      <div class="brand-text-block">
        <span class="brand-title">SFPE Australia</span>
        <span class="brand-subtitle">Society of Fire Protection Engineers</span>
      </div>
    </a>

    <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle navigation">&#9776;</button>

    <nav class="main-nav" id="main-nav">
      <ul class="nav-links">
        <li><a href="<?php echo esc_url(home_url('/')); ?>" class="nav-link <?php echo is_front_page() ? 'active' : ''; ?>">Home</a></li>
        <li><a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="nav-link <?php echo is_page('webinars') ? 'active' : ''; ?>">Webinars & Events</a></li>
        <li><a href="<?php echo esc_url(home_url('/working-groups/')); ?>" class="nav-link <?php echo is_page('working-groups') ? 'active' : ''; ?>">Working Groups</a></li>
        <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>" class="nav-link <?php echo is_page('cpd-hub') ? 'active' : ''; ?>">CPD & Partner Hub</a></li>
        <li><a href="<?php echo esc_url(home_url('/contact/')); ?>" class="nav-link <?php echo is_page('contact') ? 'active' : ''; ?>">Get Involved</a></li>
      </ul>
      <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-primary">Upcoming Webinars</a>
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

// 4. FOOTER.PHP
const footerPhp = `<?php
/**
 * SFPE Australia Footer
 */
?>
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <div class="brand-emblem" style="width: 36px; height: 36px; font-size: 16px;">SF</div>
          <span style="font-size: 18px; font-weight: 800; color: #FFFFFF;">SFPE Australia</span>
        </div>
        <p style="font-size: 14px; line-height: 1.6; margin-bottom: 20px; color: #94A3B8;">
          SFPE Australia is the window between Australian practice and international fire safety engineering research and practice. Connecting domestic practitioners with global knowledge.
        </p>
        <p style="font-size: 13px; color: #64748B;">
          Independent Chapter affiliated with the Society of Fire Protection Engineers (SFPE Global).
        </p>
      </div>

      <div>
        <h4 class="footer-col-title">Working Groups</h4>
        <ul class="footer-links">
          <li><a href="<?php echo esc_url(home_url('/working-groups/')); ?>">Technical Program</a></li>
          <li><a href="<?php echo esc_url(home_url('/working-groups/')); ?>">Partnerships & Events</a></li>
          <li><a href="<?php echo esc_url(home_url('/working-groups/')); ?>">Digital & Membership</a></li>
          <li><a href="<?php echo esc_url(home_url('/working-groups/')); ?>">Sponsorship & Development</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-col-title">CPD & Partners</h4>
        <ul class="footer-links">
          <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>">Society of Fire Safety (SFS)</a></li>
          <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>">AIDGC Dangerous Goods</a></li>
          <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>">SFPE New Zealand Chapter</a></li>
          <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>">SFPE UK Chapter</a></li>
          <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>">Engineers Australia CPD</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-col-title">Connect & Join</h4>
        <ul class="footer-links">
          <li><a href="<?php echo esc_url(home_url('/contact/')); ?>">Join a Working Group</a></li>
          <li><a href="<?php echo esc_url(home_url('/webinars/')); ?>">Webinar Registrations</a></li>
          <li><a href="<?php echo esc_url(home_url('/contact/')); ?>">SFPE Handbook Discounts</a></li>
          <li><a href="mailto:haninh1997@gmail.com">haninh1997@gmail.com</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div>
        &copy; <?php echo date('Y'); ?> SFPE Australia Chapter. All rights reserved.
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

// 5. INDEX.PHP (Fallback)
const indexPhp = `<?php
get_header(); ?>
<main class="section">
  <div class="container">
    <h1><?php the_title(); ?></h1>
    <div style="margin-top: 24px;">
      <?php
      if (have_posts()) :
        while (have_posts()) : the_post();
          the_content();
        endwhile;
      endif;
      ?>
    </div>
  </div>
</main>
<?php get_footer(); ?>
`;

writeThemeFile("index.php", indexPhp);

// 6. FRONT-PAGE.PHP (Home Page)
const frontPagePhp = `<?php
/**
 * Template Name: Front Page (Home)
 */
get_header(); ?>

<!-- Hero Section -->
<section class="hero-section">
  <div class="container hero-grid">
    <div>
      <div class="hero-eyebrow">
        <span>Global Fire Safety Science</span>
        <span>&bull;</span>
        <span>Australian Practice</span>
      </div>
      <h1 class="hero-title">
        The window between Australian practice and <span>international fire safety engineering.</span>
      </h1>
      <p class="hero-lead">
        SFPE Australia connects practitioners, researchers, and regulatory authorities with global fire safety innovations, providing direct access to international research and Australianized technical webinars.
      </p>
      <div class="hero-actions">
        <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-primary" style="padding: 12px 24px; font-size: 15px;">
          Explore Webinar Program
        </a>
        <a href="<?php echo esc_url(home_url('/working-groups/')); ?>" class="btn btn-secondary" style="padding: 12px 24px; font-size: 15px;">
          Join a Working Group
        </a>
      </div>
    </div>

    <div>
      <div class="hero-card">
        <div class="hero-card-header">
          <div class="hero-card-icon">&#128269;</div>
          <div>
            <div class="hero-card-title">Chapter Charter & Positioning</div>
            <div style="font-size: 13px; color: #94A3B8;">Agreed September 2026</div>
          </div>
        </div>
        <ul class="hero-card-list">
          <li class="hero-card-item">
            <span style="color: var(--color-accent); font-weight: 700;">&bull;</span>
            <div>
              <strong>Domestic in Partnership</strong>
              Working constructively alongside the Society of Fire Safety (SFS), AIDGC, and Engineers Australia.
            </div>
          </li>
          <li class="hero-card-item">
            <span style="color: var(--color-accent); font-weight: 700;">&bull;</span>
            <div>
              <strong>International Owned by SFPE</strong>
              Directly connected to SFPE chapters worldwide, bringing global research directly to Australia.
            </div>
          </li>
          <li class="hero-card-item">
            <span style="color: var(--color-accent); font-weight: 700;">&bull;</span>
            <div>
              <strong>The Discussant Model</strong>
              Pairing world-leading international speakers with Australian specialists to ground insights in local practice.
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Stat Bar -->
<section class="stat-bar">
  <div class="container stat-grid">
    <div class="stat-item">
      <div class="stat-number">6</div>
      <div class="stat-label">Webinar Sessions Targeted</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">4</div>
      <div class="stat-label">Active Working Groups</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">100%</div>
      <div class="stat-label">Self-Reportable EA CPD</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">Global</div>
      <div class="stat-label">SFPE Chapter Alliances (UK, NZ, USA)</div>
    </div>
  </div>
</section>

<!-- Strategic Pillars -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Distinctive Identity</span>
      <h2 class="section-title">Why SFPE Australia Exists</h2>
      <p class="section-desc">
        Australian fire safety engineering benefits from multiple perspectives. SFPE Australia provides a collaborative, international gateway designed for modern fire safety practitioners.
      </p>
    </div>

    <div class="pillars-grid">
      <div class="pillar-card">
        <div class="pillar-icon">&#127760;</div>
        <h3 class="pillar-title">International Research Ownership</h3>
        <p class="pillar-text">
          Many Australian engineers have international training or operate on cross-border projects. SFPE Australia owns the international connection, linking members directly to UL FSRI, NFPA FPRF, and global handbook updates.
        </p>
      </div>

      <div class="pillar-card">
        <div class="pillar-icon">&#129309;</div>
        <h3 class="pillar-title">Partnership, Not Competition</h3>
        <p class="pillar-text">
          We do not mirror or compete with the Society of Fire Safety (SFS). All domestic activities are conducted collaboratively with co-badged events alongside SFS, AIDGC, and international SFPE sister chapters.
        </p>
      </div>

      <div class="pillar-card">
        <div class="pillar-icon">&#127919;</div>
        <h3 class="pillar-title">Australianized Technical Content</h3>
        <p class="pillar-text">
          Overseas presentations can sometimes feel disconnected from our Building Code of Australia (BCA/NCC) framework. Our dual-presenter model ensures every international paper is critically reviewed for local application.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Upcoming Webinars Section -->
<section class="section section-alt">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">2026 / 2027 Program</span>
      <h2 class="section-title">Webinar Pipeline Spotlight</h2>
      <p class="section-desc">
        Targeting 6 high-impact technical sessions over 12 months. Each session features an international subject expert paired with an Australian discussant.
      </p>
    </div>

    <?php
    $webinars_query = new WP_Query(array(
        'post_type'      => 'webinar',
        'posts_per_page' => 3,
        'orderby'        => 'menu_order title',
        'order'          => 'ASC',
    ));
    ?>

    <div class="webinar-grid">
      <?php if ($webinars_query->have_posts()) : ?>
        <?php while ($webinars_query->have_posts()) : $webinars_query->the_post(); 
          $session = get_post_meta(get_the_ID(), '_webinar_session_number', true) ?: 'Upcoming Session';
          $partner = get_post_meta(get_the_ID(), '_webinar_partner', true) ?: 'SFPE Alliance';
          $speaker = get_post_meta(get_the_ID(), '_webinar_speaker', true) ?: 'International Presenter';
          $discussant = get_post_meta(get_the_ID(), '_webinar_discussant', true) ?: 'Australian Discussant';
          $status = get_post_meta(get_the_ID(), '_webinar_status', true) ?: 'In Pipeline';
        ?>
          <div class="webinar-card">
            <div class="webinar-card-header">
              <span class="webinar-session-badge"><?php echo esc_html($session); ?></span>
              <span class="webinar-partner-pill"><?php echo esc_html($partner); ?></span>
            </div>
            <div class="webinar-card-body">
              <h3 class="webinar-title"><?php the_title(); ?></h3>
              <div class="webinar-desc"><?php echo esc_html(wp_trim_words(get_the_excerpt() ?: get_the_content(), 22)); ?></div>
              <div class="webinar-specs">
                <div class="webinar-spec-row">
                  <span class="webinar-spec-label">Presenter:</span>
                  <span class="webinar-spec-value"><?php echo esc_html($speaker); ?></span>
                </div>
                <div class="webinar-spec-row">
                  <span class="webinar-spec-label">Discussant:</span>
                  <span class="webinar-spec-value"><?php echo esc_html($discussant); ?></span>
                </div>
              </div>
            </div>
            <div class="webinar-card-footer">
              <span class="webinar-status"><?php echo esc_html($status); ?></span>
              <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-outline-dark" style="font-size: 13px; padding: 6px 12px;">View Details</a>
            </div>
          </div>
        <?php endwhile; wp_reset_postdata(); ?>
      <?php endif; ?>
    </div>

    <div style="text-align: center; margin-top: 48px;">
      <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-primary" style="padding: 12px 28px; font-size: 15px;">
        View All 6 Pipeline Sessions &amp; CPD Information &rarr;
      </a>
    </div>
  </div>
</section>

<!-- Working Groups Teaser -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Chapter Governance</span>
      <h2 class="section-title">The Four Working Groups</h2>
      <p class="section-desc">
        Established at our September meeting to drive technical excellence, industry partnerships, digital communication, and chapter sustainability.
      </p>
    </div>

    <div class="wg-grid">
      <div class="wg-card">
        <span class="wg-badge">Core Operations</span>
        <h3 class="wg-title">Technical Program</h3>
        <p class="wg-desc">
          Coordinates the 6-part annual webinar pipeline, identifies cutting-edge international research topics, and pairs global speakers with Australian discussants.
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
        </div>
      </div>

      <div class="wg-card">
        <span class="wg-badge">Industry Liaison</span>
        <h3 class="wg-title">Partnerships &amp; Events</h3>
        <p class="wg-desc">
          Manages collaborative alliances with SFS, IFE, AIDGC, and international SFPE sister chapters to deliver co-badged events and dangerous goods crossovers.
        </p>
        <div class="wg-leadership">
          <div class="wg-person">
            <span class="wg-role">Chair:</span>
            <span class="wg-name">Michael Beecroft</span>
          </div>
          <div class="wg-person">
            <span class="wg-role">Liaison:</span>
            <span class="wg-name">Jonathan R. Barnett</span>
          </div>
        </div>
      </div>

      <div class="wg-card">
        <span class="wg-badge">Member Engagement</span>
        <h3 class="wg-title">Digital &amp; Membership</h3>
        <p class="wg-desc">
          Manages website infrastructure, technical updates, member inquiries, and facilitates member access to SFPE Handbook international discounts.
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

      <div class="wg-card">
        <span class="wg-badge">Strategic Growth</span>
        <h3 class="wg-title">Sponsorship &amp; Development</h3>
        <p class="wg-desc">
          Formulates sponsorship prospectuses, policy frameworks, cyber and officers liability insurance models, and ensures long-term grassroots stability.
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

    <!-- Callout Box -->
    <div class="callout-box">
      <div class="callout-content">
        <h3>Get Involved in SFPE Australia</h3>
        <p>
          We are a grassroots community of fire safety practitioners, researchers, and consultants. Volunteer with one of our working groups or suggest an international webinar topic.
        </p>
      </div>
      <div>
        <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn btn-primary" style="padding: 12px 24px; font-size: 15px;">
          Express Your Interest
        </a>
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
`;

writeThemeFile("page-home.php", frontPagePhp);
writeThemeFile("front-page.php", frontPagePhp);

// 7. PAGE-WEBINARS.PHP (Webinars & Events Page)
const pageWebinarsPhp = `<?php
/**
 * Template Name: Webinars Page
 */
get_header(); ?>

<section class="section" style="padding-top: 50px; background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <span class="section-tag">Technical Education &amp; CPD</span>
    <h1 class="section-title" style="font-size: 40px; margin-bottom: 20px;">Webinar Program &amp; Pipeline</h1>
    <p class="section-desc" style="max-width: 800px; margin-bottom: 32px;">
      Targeting 6 high-caliber technical seminars over the next 12 months. Our format pairs leading international researchers with Australian discussants to translate global fire engineering science into local Building Code of Australia (BCA/NCC) context.
    </p>

    <div style="background-color: var(--color-surface-alt); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
      <div>
        <strong style="color: var(--color-ink); display: block; font-size: 15px;">Continuing Professional Development (CPD)</strong>
        <span style="font-size: 14px; color: var(--color-ink-muted);">Members can self-report webinar attendance to Engineers Australia (EA) / NER. No formal accreditation barriers.</span>
      </div>
      <a href="#register-interest" class="btn btn-primary" style="font-size: 13px;">Register for Session Alerts</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 32px;">
      <div>
        <h2 style="font-size: 26px; color: var(--color-ink);">Confirmed 12-Month Pipeline</h2>
        <p style="font-size: 15px; color: var(--color-ink-muted);">Managed dynamically by the Technical Program Working Group (Dan Rathnayaka, Chair).</p>
      </div>
      <span style="font-size: 13px; color: var(--color-ink-subtle); font-weight: 600;">6 Sessions in Development</span>
    </div>

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
          $date_info = get_post_meta(get_the_ID(), '_webinar_date_display', true) ?: 'Late 2026 / Early 2027';
        ?>
          <div class="webinar-card">
            <div class="webinar-card-header">
              <span class="webinar-session-badge"><?php echo esc_html($session); ?></span>
              <span class="webinar-partner-pill"><?php echo esc_html($partner); ?></span>
            </div>
            <div class="webinar-card-body">
              <h3 class="webinar-title"><?php the_title(); ?></h3>
              <div class="webinar-desc"><?php the_content(); ?></div>
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
            </div>
            <div class="webinar-card-footer">
              <span class="webinar-status"><?php echo esc_html($status); ?></span>
              <a href="#register-interest" class="btn btn-outline-dark" style="font-size: 13px; padding: 6px 12px;">Get Notified</a>
            </div>
          </div>
        <?php endwhile; wp_reset_postdata(); ?>
      <?php endif; ?>
    </div>

    <!-- Expression of Interest Form Anchor -->
    <div id="register-interest" style="margin-top: 80px;">
      <div class="form-card">
        <h3 style="font-size: 24px; margin-bottom: 12px; text-align: center; color: var(--color-ink);">
          Receive Webinar Invitations &amp; Updates
        </h3>
        <p style="font-size: 15px; color: var(--color-ink-muted); text-align: center; margin-bottom: 28px;">
          Register your email to receive direct invitations and CPD confirmation details as each webinar date is locked in.
        </p>

        <?php if (isset($_GET['submitted'])) : ?>
          <div class="alert alert-success">
            Thank you for registering. Your details have been received, and you will be notified when session dates open for registration.
          </div>
        <?php endif; ?>

        <form method="POST" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
          <?php wp_nonce_field('sfpe_contact_action', 'sfpe_contact_nonce'); ?>
          <input type="hidden" name="interest_area" value="Webinar Pipeline Registration">

          <div class="form-group">
            <label class="form-label" for="full_name">Full Name *</label>
            <input type="text" id="full_name" name="full_name" class="form-input" required placeholder="e.g. Jane Smith">
          </div>

          <div class="form-group">
            <label class="form-label" for="email">Email Address *</label>
            <input type="email" id="email" name="email" class="form-input" required placeholder="jane.smith@example.com">
          </div>

          <div class="form-group">
            <label class="form-label" for="organization">Organization / Practice</label>
            <input type="text" id="organization" name="organization" class="form-input" placeholder="e.g. Engineering Practice or University">
          </div>

          <div class="form-group">
            <label class="form-label" for="message">Topics of Specific Interest (Optional)</label>
            <textarea id="message" name="message" class="form-textarea" placeholder="Let us know if you are interested in a particular session (e.g. Dangerous Goods, SFPE Handbook chapters, Data Centers, Timber) or have an international speaker suggestion..."></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 15px;">
            Subscribe to Webinar Notifications
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
`;

writeThemeFile("page-webinars.php", pageWebinarsPhp);

// 8. PAGE-WORKING-GROUPS.PHP
const pageWorkingGroupsPhp = `<?php
/**
 * Template Name: Working Groups Page
 */
get_header(); ?>

<section class="section" style="padding-top: 50px; background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <span class="section-tag">Governance &amp; Leadership</span>
    <h1 class="section-title" style="font-size: 40px; margin-bottom: 20px;">Working Groups &amp; Committees</h1>
    <p class="section-desc" style="max-width: 800px;">
      SFPE Australia is organized into four working groups established at the September 2026 meeting. Each group has dedicated responsibilities to support technical innovation, cross-body alliances, digital reach, and chapter governance.
    </p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="wg-grid">
      <!-- 1. Technical Program -->
      <div class="wg-card">
        <span class="wg-badge">Group 1 &bull; Technical Program</span>
        <h2 class="wg-title">Technical Program Working Group</h2>
        <p class="wg-desc">
          Coordinates the annual webinar schedule, curates topics from international research literature and SFPE handbook updates, identifies international presenters, and pairs each with an Australian discussant to localize technical value.
        </p>
        <div style="margin-bottom: 24px; font-size: 14px; color: var(--color-ink-muted);">
          <strong style="color: var(--color-ink); display: block; margin-bottom: 6px;">Key Focus Areas:</strong>
          <ul style="padding-left: 20px; line-height: 1.6;">
            <li>6-in-12-months technical webinar pipeline delivery</li>
            <li>Handbook chapter revisions and standards dissemination</li>
            <li>Emerging topics: data centers, mass timber, property protection</li>
          </ul>
        </div>
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
            <span class="wg-role">Contributing Members:</span>
            <span class="wg-name">Simon Krishnan, Amer Magrabi</span>
          </div>
        </div>
      </div>

      <!-- 2. Partnerships & Events -->
      <div class="wg-card">
        <span class="wg-badge">Group 2 &bull; Industry Liaison</span>
        <h2 class="wg-title">Partnerships &amp; Events Working Group</h2>
        <p class="wg-desc">
          Fosters collaborative domestic and international relationships. Leads liaison with the Society of Fire Safety (SFS), the Institution of Fire Engineers (IFE), AIDGC, and overseas SFPE chapters (UK, New Zealand).
        </p>
        <div style="margin-bottom: 24px; font-size: 14px; color: var(--color-ink-muted);">
          <strong style="color: var(--color-ink); display: block; margin-bottom: 6px;">Key Focus Areas:</strong>
          <ul style="padding-left: 20px; line-height: 1.6;">
            <li>Co-badging seminars with SFS and Dangerous Goods consultants</li>
            <li>Trans-Tasman cooperation with SFPE New Zealand</li>
            <li>Post-conference dialogue with SFPE UK Chapter</li>
          </ul>
        </div>
        <div class="wg-leadership">
          <div class="wg-person">
            <span class="wg-role">Chair:</span>
            <span class="wg-name">Michael Beecroft</span>
          </div>
          <div class="wg-person">
            <span class="wg-role">Contributing:</span>
            <span class="wg-name">Jonathan R. Barnett (IFE &amp; Dangerous Goods Liaison)</span>
          </div>
        </div>
      </div>

      <!-- 3. Digital & Membership -->
      <div class="wg-card">
        <span class="wg-badge">Group 3 &bull; Digital &amp; Communications</span>
        <h2 class="wg-title">Digital &amp; Membership Working Group</h2>
        <p class="wg-desc">
          Builds and maintains the chapter digital infrastructure, coordinates member announcements, and resolves member access issues for SFPE Global Handbook discounts and research resources.
        </p>
        <div style="margin-bottom: 24px; font-size: 14px; color: var(--color-ink-muted);">
          <strong style="color: var(--color-ink); display: block; margin-bottom: 6px;">Key Focus Areas:</strong>
          <ul style="padding-left: 20px; line-height: 1.6;">
            <li>Website launch, maintenance, and calendar repository updates</li>
            <li>Direct member communications and seminar registration tracking</li>
            <li>Facilitating member discounts on SFPE Handbook publications</li>
          </ul>
        </div>
        <div class="wg-leadership">
          <div class="wg-person">
            <span class="wg-role">Chair:</span>
            <span class="wg-name">Amer Magrabi</span>
          </div>
          <div class="wg-person">
            <span class="wg-role">Website &amp; Systems Lead:</span>
            <span class="wg-name">Ninh</span>
          </div>
        </div>
      </div>

      <!-- 4. Sponsorship & Development -->
      <div class="wg-card">
        <span class="wg-badge">Group 4 &bull; Growth &amp; Governance</span>
        <h2 class="wg-title">Sponsorship &amp; Development Working Group</h2>
        <p class="wg-desc">
          Develops the formal sponsorship prospectus, establishes corporate partner policies, and investigates chapter governance, public liability, cyber insurance, and officers liability.
        </p>
        <div style="margin-bottom: 24px; font-size: 14px; color: var(--color-ink-muted);">
          <strong style="color: var(--color-ink); display: block; margin-bottom: 6px;">Key Focus Areas:</strong>
          <ul style="padding-left: 20px; line-height: 1.6;">
            <li>Sponsorship prospectus development and outreach guidelines</li>
            <li>Insurance and liability frameworks for in-person events</li>
            <li>Long-term financial sustainability on a grassroots model</li>
          </ul>
        </div>
        <div class="wg-leadership">
          <div class="wg-person">
            <span class="wg-role">Chair:</span>
            <span class="wg-name">Frank Mendham</span>
          </div>
          <div class="wg-person">
            <span class="wg-role">Assisting:</span>
            <span class="wg-name">Derya Horasan</span>
          </div>
          <div class="wg-person">
            <span class="wg-role">Governance Support:</span>
            <span class="wg-name">Pelle Zetterstrom</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Founding Contributors Recognition -->
    <div style="margin-top: 64px; background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 36px;">
      <h3 style="font-size: 20px; margin-bottom: 12px; color: var(--color-ink);">Founding Committee &amp; Meeting Participants</h3>
      <p style="font-size: 14px; color: var(--color-ink-muted); margin-bottom: 20px; line-height: 1.6;">
        Acknowledging the fire safety engineering leaders and practitioners who established the chapter charter during the September 2026 monthly meeting:
      </p>
      <div style="display: flex; flex-wrap: wrap; gap: 10px;">
        <span class="webinar-partner-pill">Alex Glennon</span>
        <span class="webinar-partner-pill">Michael Beecroft</span>
        <span class="webinar-partner-pill">Amer Magrabi</span>
        <span class="webinar-partner-pill">Prof. David Lange (UQ)</span>
        <span class="webinar-partner-pill">Tobias Salomonsson</span>
        <span class="webinar-partner-pill">Aaron Nicholson (Red Fire Engineers)</span>
        <span class="webinar-partner-pill">Dan Rathnayaka</span>
        <span class="webinar-partner-pill">Frank Mendham (Mendham Consultants)</span>
        <span class="webinar-partner-pill">Dr Jonathan R. Barnett</span>
        <span class="webinar-partner-pill">Hui MC</span>
        <span class="webinar-partner-pill">Pelle Zetterstrom</span>
        <span class="webinar-partner-pill">Simon Krishnan</span>
        <span class="webinar-partner-pill">Derya Horasan (SciFire)</span>
        <span class="webinar-partner-pill">Ninh</span>
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
`;

writeThemeFile("page-working-groups.php", pageWorkingGroupsPhp);

// 9. PAGE-CPD-HUB.PHP (Pelle's Central CPD Repository)
const pageCpdHubPhp = `<?php
/**
 * Template Name: CPD Hub Page
 */
get_header(); ?>

<section class="section" style="padding-top: 50px; background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <span class="section-tag">Continuing Professional Development</span>
    <h1 class="section-title" style="font-size: 40px; margin-bottom: 20px;">Central CPD &amp; Calendar Hub</h1>
    <p class="section-desc" style="max-width: 800px;">
      As envisioned in our chapter meetings, SFPE Australia serves as a central repository linking fire safety engineers to accredited CPD calendars across domestic partners, dangerous goods associations, and international research bodies.
    </p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="resource-grid">
      <!-- SFS -->
      <div class="resource-card">
        <div class="resource-icon">&#128218;</div>
        <h3 class="resource-title">Society of Fire Safety (SFS)</h3>
        <p class="resource-desc">
          Australia's primary technical society under Engineers Australia. Organizes regional technical seminars, state chapter presentations, and national conferences.
        </p>
        <a href="https://www.engineersaustralia.org.au/communities/technical-societies/society-fire-safety" target="_blank" rel="noopener" class="resource-link">
          Visit SFS Calendar &rarr;
        </a>
      </div>

      <!-- AIDGC -->
      <div class="resource-card">
        <div class="resource-icon">&#9888;</div>
        <h3 class="resource-title">AIDGC Dangerous Goods</h3>
        <p class="resource-desc">
          Australasian Institute of Dangerous Goods Consultants. Features critical CPD on flammable liquids, gas storages, chemical warehouses, and explosive risks.
        </p>
        <a href="https://aidgc.org.au" target="_blank" rel="noopener" class="resource-link">
          Explore AIDGC Events &rarr;
        </a>
      </div>

      <!-- IFE Australia -->
      <div class="resource-card">
        <div class="resource-icon">&#128658;</div>
        <h3 class="resource-title">Institution of Fire Engineers (IFE)</h3>
        <p class="resource-desc">
          IFE Australia Branch provides regular technical lectures, exams, and professional development seminars bridging operational firefighting and engineering.
        </p>
        <a href="https://ife.org.au" target="_blank" rel="noopener" class="resource-link">
          View IFE Australia Events &rarr;
        </a>
      </div>

      <!-- SFPE International -->
      <div class="resource-card">
        <div class="resource-icon">&#127758;</div>
        <h3 class="resource-title">SFPE Global Webinars &amp; Research</h3>
        <p class="resource-desc">
          The worldwide home of fire protection engineering. Extensive monthly live webinars, conference proceedings, technical guides, and the SFPE Foundation research hub.
        </p>
        <a href="https://www.sfpe.org/events/webinars" target="_blank" rel="noopener" class="resource-link">
          SFPE Global Event Portal &rarr;
        </a>
      </div>

      <!-- UL FSRI & NFPA -->
      <div class="resource-card">
        <div class="resource-icon">&#128300;</div>
        <h3 class="resource-title">UL FSRI &amp; NFPA Research</h3>
        <p class="resource-desc">
          Underwriters Laboratories Fire Safety Research Institute and NFPA Fire Protection Research Foundation offer leading research webinars on modern fire dynamics and materials.
        </p>
        <a href="https://fsri.org" target="_blank" rel="noopener" class="resource-link">
          UL FSRI Research Hub &rarr;
        </a>
      </div>

      <!-- Engineers Australia -->
      <div class="resource-card">
        <div class="resource-icon">&#128220;</div>
        <h3 class="resource-title">Engineers Australia (EA) CPD</h3>
        <p class="resource-desc">
          CPD portal for chartered status (CPEng / NER). SFPE Australia webinars qualify directly under technical professional development for self-reporting.
        </p>
        <a href="https://www.engineersaustralia.org.au/training-and-events" target="_blank" rel="noopener" class="resource-link">
          EA CPD Management Portal &rarr;
        </a>
      </div>
    </div>

    <!-- Self-Reporting Guide -->
    <div style="margin-top: 56px; background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 36px;">
      <h2 style="font-size: 24px; color: var(--color-ink); margin-bottom: 16px;">Engineers Australia CPD Self-Reporting Guidance</h2>
      <p style="font-size: 15px; color: var(--color-ink-muted); line-height: 1.6; margin-bottom: 20px;">
        As confirmed in our chapter meetings, there is no formal accreditation barrier preventing members from counting SFPE Australia technical webinars toward their annual 150-hour Engineers Australia CPD requirement over three years.
      </p>
      <div style="background-color: var(--color-surface-alt); border-radius: var(--radius-md); padding: 20px; font-size: 14px; color: var(--color-ink);">
        <strong>How to log attendance:</strong>
        <ol style="margin-top: 10px; padding-left: 20px; line-height: 1.8;">
          <li>Retain your webinar confirmation or registration email.</li>
          <li>Log onto the Engineers Australia Member Portal and record the session under <em>Type II: Technical Presentations, Seminars and Conventions</em>.</li>
          <li>Assign 1.0 to 1.5 hours per webinar session under your Fire Safety Engineering area of practice.</li>
        </ol>
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
`;

writeThemeFile("page-cpd-hub.php", pageCpdHubPhp);

// 10. PAGE-CONTACT.PHP (Get Involved & Contact)
const pageContactPhp = `<?php
/**
 * Template Name: Contact & Get Involved Page
 */
get_header(); ?>

<section class="section" style="padding-top: 50px; background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container" style="text-align: center;">
    <span class="section-tag">Participation &amp; Community</span>
    <h1 class="section-title" style="font-size: 40px; margin-bottom: 16px;">Get Involved with SFPE Australia</h1>
    <p class="section-desc" style="max-width: 720px; margin: 0 auto;">
      Whether you want to volunteer for a working group, suggest an international webinar presenter, or access SFPE Handbook resources, we welcome your involvement.
    </p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="form-card">
      <?php if (isset($_GET['submitted'])) : ?>
        <div class="alert alert-success">
          Thank you for reaching out. Your message has been received by the committee (haninh1997@gmail.com) and we will respond to you shortly.
        </div>
      <?php endif; ?>

      <form method="POST" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
        <?php wp_nonce_field('sfpe_contact_action', 'sfpe_contact_nonce'); ?>

        <div class="form-group">
          <label class="form-label" for="full_name">Full Name *</label>
          <input type="text" id="full_name" name="full_name" class="form-input" required placeholder="e.g. Alex Glennon">
        </div>

        <div class="form-group">
          <label class="form-label" for="email">Email Address *</label>
          <input type="email" id="email" name="email" class="form-input" required placeholder="alex@example.com.au">
        </div>

        <div class="form-group">
          <label class="form-label" for="organization">Company / Affiliation</label>
          <input type="text" id="organization" name="organization" class="form-input" placeholder="e.g. Fire Engineering Consultancy or Research Body">
        </div>

        <div class="form-group">
          <label class="form-label" for="interest_area">How would you like to get involved? *</label>
          <select id="interest_area" name="interest_area" class="form-select">
            <option value="Join Working Group: Technical Program">Join Working Group: Technical Program</option>
            <option value="Join Working Group: Partnerships & Events">Join Working Group: Partnerships &amp; Events</option>
            <option value="Join Working Group: Digital & Membership">Join Working Group: Digital &amp; Membership</option>
            <option value="Join Working Group: Sponsorship & Development">Join Working Group: Sponsorship &amp; Development</option>
            <option value="Webinar Speaker or Topic Proposal">Webinar Speaker or Topic Proposal</option>
            <option value="SFPE Handbook Discount Inquiry">SFPE Handbook Discount Inquiry</option>
            <option value="General Chapter Inquiry">General Chapter Inquiry</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="message">Message *</label>
          <textarea id="message" name="message" class="form-textarea" required placeholder="Tell us how you would like to participate or what you need assistance with..."></textarea>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 13px; font-size: 15px;">
          Send Message to Committee
        </button>
      </form>

      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--color-border); text-align: center; font-size: 13px; color: var(--color-ink-muted);">
        Enquiries are directed to the chapter administrator at <strong>haninh1997@gmail.com</strong>.
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
`;

writeThemeFile("page-contact.php", pageContactPhp);

// 11. SINGLE-WEBINAR.PHP
const singleWebinarPhp = `<?php
get_header(); ?>
<main class="section">
  <div class="container" style="max-width: 800px;">
    <?php while (have_posts()) : the_post(); 
      $session = get_post_meta(get_the_ID(), '_webinar_session_number', true) ?: 'Upcoming Session';
      $partner = get_post_meta(get_the_ID(), '_webinar_partner', true) ?: 'SFPE Alliance';
      $speaker = get_post_meta(get_the_ID(), '_webinar_speaker', true) ?: 'International Presenter';
      $discussant = get_post_meta(get_the_ID(), '_webinar_discussant', true) ?: 'Australian Discussant';
      $status = get_post_meta(get_the_ID(), '_webinar_status', true) ?: 'In Pipeline';
    ?>
      <div style="margin-bottom: 24px;">
        <span class="webinar-session-badge"><?php echo esc_html($session); ?></span>
        <span class="webinar-partner-pill" style="margin-left: 12px;"><?php echo esc_html($partner); ?></span>
      </div>
      <h1 style="font-size: 36px; margin-bottom: 24px;"><?php the_title(); ?></h1>
      
      <div class="webinar-specs" style="margin-bottom: 32px;">
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

      <div style="font-size: 16px; line-height: 1.8; color: var(--color-ink-muted); margin-bottom: 40px;">
        <?php the_content(); ?>
      </div>

      <div style="padding-top: 24px; border-top: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center;">
        <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-outline-dark">&larr; Back to Webinar Pipeline</a>
        <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn btn-primary">Register Interest</a>
      </div>
    <?php endwhile; ?>
  </div>
</main>
<?php get_footer(); ?>
`;

writeThemeFile("single-webinar.php", singleWebinarPhp);

console.log("All theme files written successfully!");
