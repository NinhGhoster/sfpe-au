// deploy_professional_v3.js
// Deploys the elevated, professional public-facing SFPE Australia child theme
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
Description: Professional, public-facing theme for the Australian Chapter of the Society of Fire Protection Engineers (SFPE).
Author: Ninh
Author URI: https://sfpe.xo.je
Version: 3.0.0
Text Domain: sfpe-australia
*/

:root {
  --color-navy: #0B132B;
  --color-navy-dark: #070D1E;
  --color-blue: #0072BB;
  --color-blue-hover: #005A96;
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
  
  --container-max: 1140px;
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

/* Header & Top Bar */
.site-header {
  background-color: var(--color-navy);
  color: #FFFFFF;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.top-bar {
  background-color: rgba(0, 0, 0, 0.35);
  font-size: 13px;
  color: #94A3B8;
  padding: 7px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.top-bar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-bar-tagline {
  display: flex;
  align-items: center;
  gap: 10px;
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
  padding: 14px 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 14px;
  color: #FFFFFF;
  text-decoration: none;
}

.brand-logo-img {
  height: 48px;
  width: auto;
  display: block;
  border-radius: 4px;
  background-color: #FFFFFF;
  padding: 4px 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.brand-text-block {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.4px;
  color: #FFFFFF;
  line-height: 1.15;
}

.brand-subtitle {
  font-size: 11px;
  color: #94A3B8;
  font-weight: 500;
  letter-spacing: 0.3px;
  text-transform: uppercase;
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
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.nav-link:hover, .nav-link.active {
  color: #FFFFFF;
  background-color: rgba(255, 255, 255, 0.12);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 600;
  padding: 11px 20px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-crimson);
  color: #FFFFFF;
  box-shadow: 0 2px 4px rgba(211, 34, 40, 0.25);
}

.btn-primary:hover {
  background-color: var(--color-crimson-hover);
  color: #FFFFFF;
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
  border-color: rgba(255, 255, 255, 0.6);
}

.btn-outline-dark {
  background-color: transparent;
  color: var(--color-ink);
  border: 1px solid var(--color-border);
}

.btn-outline-dark:hover {
  background-color: var(--color-surface-alt);
  color: var(--color-ink);
  border-color: #CBD5E1;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  color: #FFFFFF;
  font-size: 26px;
  cursor: pointer;
}

/* Two-Column Hero Section with Australian Landscape */
.hero-section {
  position: relative;
  background-color: var(--color-navy);
  background-image: linear-gradient(135deg, rgba(7, 13, 30, 0.90) 0%, rgba(11, 19, 43, 0.88) 100%), url('images/hero-australia-bg.jpg');
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  color: #FFFFFF;
  padding: 80px 0 88px;
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 48px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(211, 34, 40, 0.2);
  border: 1px solid rgba(211, 34, 40, 0.45);
  color: #FECACA;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 22px;
}

.hero-title {
  font-size: 44px;
  font-weight: 800;
  line-height: 1.16;
  letter-spacing: -1px;
  color: #FFFFFF;
  margin-bottom: 22px;
}

.hero-title span {
  color: #60A5FA;
}

.hero-lead {
  font-size: 18px;
  line-height: 1.6;
  color: #E2E8F0;
  margin-bottom: 32px;
  max-width: 620px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero-card {
  background-color: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-lg);
  padding: 32px;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.hero-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
}

.hero-card-icon {
  width: 44px;
  height: 44px;
  background-color: var(--color-blue);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #FFFFFF;
}

.hero-card-title {
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 700;
}

.hero-card-subtitle {
  font-size: 12px;
  color: #94A3B8;
  font-weight: 500;
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
  line-height: 1.5;
}

.hero-card-bullet {
  color: var(--color-crimson);
  font-weight: 800;
  font-size: 18px;
  line-height: 1;
}

.hero-card-item strong {
  color: #FFFFFF;
  display: block;
  font-size: 15px;
  margin-bottom: 2px;
}

/* Key Figures / Stat Bar */
.stat-bar {
  background-color: var(--color-navy-dark);
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
  padding: 0 16px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-item:last-child {
  border-right: none;
}

.stat-number {
  font-size: 32px;
  font-weight: 800;
  color: #60A5FA;
  line-height: 1;
  margin-bottom: 6px;
  font-family: var(--font-heading);
}

.stat-label {
  font-size: 13px;
  color: #94A3B8;
  font-weight: 600;
  letter-spacing: 0.2px;
}

/* Sections Common */
.section {
  padding: 72px 0;
}

.section-alt {
  background-color: var(--color-surface);
}

.section-header {
  max-width: 680px;
  margin: 0 auto 52px;
  text-align: center;
}

.section-tag {
  color: var(--color-blue);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-bottom: 10px;
  display: block;
}

.section-title {
  font-size: 32px;
  letter-spacing: -0.5px;
  margin-bottom: 14px;
  color: var(--color-ink);
}

.section-desc {
  font-size: 16px;
  color: var(--color-ink-muted);
  line-height: 1.6;
}

/* Pillars Grid (AFRAN Model) */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.pillar-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}

.pillar-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: #CBD5E1;
}

.pillar-icon {
  width: 48px;
  height: 48px;
  background-color: var(--color-blue-soft);
  color: var(--color-blue);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 20px;
}

.pillar-title {
  font-size: 19px;
  margin-bottom: 10px;
  color: var(--color-ink);
}

.pillar-text {
  font-size: 14px;
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
  transform: translateY(-2px);
}

.webinar-card-header {
  padding: 18px 22px;
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
  color: var(--color-crimson);
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
  font-size: 17px;
  margin-bottom: 12px;
  line-height: 1.35;
  color: var(--color-ink);
}

.webinar-desc {
  font-size: 14px;
  color: var(--color-ink-muted);
  margin-bottom: 18px;
  line-height: 1.55;
  flex-grow: 1;
}

.webinar-specs {
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  margin-bottom: 18px;
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
  text-align: right;
}

.webinar-card-footer {
  padding: 16px 22px;
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
  width: 7px;
  height: 7px;
  background-color: var(--color-success);
  border-radius: 50%;
}

/* Working Groups Grid */
.wg-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.wg-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 26px 22px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
}

.wg-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: #CBD5E1;
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
  margin-bottom: 14px;
}

.wg-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: var(--color-ink);
}

.wg-desc {
  font-size: 13px;
  color: var(--color-ink-muted);
  line-height: 1.55;
  margin-bottom: 20px;
  flex-grow: 1;
}

.wg-leadership {
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
}

.wg-person {
  display: flex;
  justify-content: space-between;
}

.wg-role {
  color: var(--color-ink-subtle);
  font-weight: 500;
}

.wg-name {
  color: var(--color-ink);
  font-weight: 700;
}

/* Partner Alliances Strip */
.partner-strip {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 40px 0;
  text-align: center;
}

.partner-strip-title {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--color-ink-subtle);
  margin-bottom: 22px;
}

.partner-pills-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.partner-pill-badge {
  background-color: var(--color-bg-canvas);
  border: 1px solid var(--color-border);
  padding: 8px 18px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink);
  transition: all 0.15s ease;
}

.partner-pill-badge:hover {
  border-color: #94A3B8;
  color: var(--color-blue);
  background-color: #FFFFFF;
}

/* Callout Box */
.callout-box {
  background: linear-gradient(135deg, var(--color-navy) 0%, #162544 100%);
  color: #FFFFFF;
  border-radius: var(--radius-lg);
  padding: 44px;
  margin-top: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
}

.callout-content h3 {
  color: #FFFFFF;
  font-size: 24px;
  margin-bottom: 10px;
}

.callout-content p {
  color: #CBD5E1;
  font-size: 15px;
  max-width: 620px;
}

/* CPD Hub & Resource Cards */
.resource-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.resource-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 26px;
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
  background-color: var(--color-blue-soft);
  color: var(--color-blue);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 16px;
}

.resource-title {
  font-size: 17px;
  margin-bottom: 8px;
  color: var(--color-ink);
}

.resource-desc {
  font-size: 13px;
  color: var(--color-ink-muted);
  line-height: 1.55;
  margin-bottom: 18px;
  flex-grow: 1;
}

.resource-link {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-blue);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* Forms */
.form-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 38px;
  box-shadow: var(--shadow-md);
  max-width: 620px;
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
  padding: 11px 13px;
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
  padding: 60px 0 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 44px;
  margin-bottom: 44px;
}

.footer-col-title {
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 18px;
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
  padding-top: 26px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .wg-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .webinar-grid, .pillars-grid, .resource-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stat-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .stat-item:nth-child(2) {
    border-right: none;
  }
  .webinar-grid, .pillars-grid, .resource-grid, .wg-grid {
    grid-template-columns: 1fr;
  }
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .callout-box {
    flex-direction: column;
    text-align: center;
  }
  .hero-title {
    font-size: 32px;
  }
  .hero-lead {
    font-size: 16px;
  }
  .hero-section {
    padding: 50px 0 60px;
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
    gap: 12px;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 10px;
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
  <link rel="icon" type="image/png" href="<?php echo esc_url(get_template_directory_uri() . '/images/sfpe-australia-logo.png'); ?>">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
  <div class="top-bar">
    <div class="container top-bar-content">
      <div class="top-bar-tagline">
        <span class="top-bar-badge">Australian Chapter</span>
        <span>Affiliated with the Society of Fire Protection Engineers (SFPE Global)</span>
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
      <img src="<?php echo esc_url(get_template_directory_uri() . '/images/sfpe-australia-logo.png'); ?>" alt="SFPE Australia Chapter Logo" class="brand-logo-img">
      <div class="brand-text-block">
        <span class="brand-title">SFPE Australia</span>
        <span class="brand-subtitle">Fire Safety Engineering</span>
      </div>
    </a>

    <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle navigation">&#9776;</button>

    <nav class="main-nav" id="main-nav">
      <ul class="nav-links">
        <li><a href="<?php echo esc_url(home_url('/')); ?>" class="nav-link <?php echo is_front_page() ? 'active' : ''; ?>">Home</a></li>
        <li><a href="<?php echo esc_url(home_url('/about/')); ?>" class="nav-link <?php echo is_page('about') ? 'active' : ''; ?>">About</a></li>
        <li><a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="nav-link <?php echo is_page('webinars') ? 'active' : ''; ?>">Webinars</a></li>
        <li><a href="<?php echo esc_url(home_url('/working-groups/')); ?>" class="nav-link <?php echo is_page('working-groups') ? 'active' : ''; ?>">Working Groups</a></li>
        <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>" class="nav-link <?php echo is_page('cpd-hub') ? 'active' : ''; ?>">CPD Hub</a></li>
        <li><a href="<?php echo esc_url(home_url('/contact/')); ?>" class="nav-link <?php echo is_page('contact') ? 'active' : ''; ?>">Get Involved</a></li>
      </ul>
      <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-primary" style="font-size: 13px; padding: 9px 16px;">Upcoming Webinars</a>
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
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <img src="<?php echo esc_url(get_template_directory_uri() . '/images/sfpe-australia-logo.png'); ?>" alt="SFPE Australia Chapter Logo" style="height: 38px; width: auto; background-color: #FFFFFF; padding: 3px 6px; border-radius: 4px;">
          <span style="font-size: 18px; font-weight: 800; color: #FFFFFF;">SFPE Australia</span>
        </div>
        <p style="font-size: 13px; line-height: 1.6; color: #94A3B8; margin-bottom: 16px;">
          The official Australian chapter of the Society of Fire Protection Engineers, bridging domestic performance-based engineering practice with international fire science and research.
        </p>
        <p style="font-size: 13px;">
          <a href="https://www.linkedin.com/company/sfpe-au/" target="_blank" rel="noopener" style="color: #60A5FA;">
            Follow our activities on LinkedIn &rarr;
          </a>
        </p>
      </div>

      <div>
        <h4 class="footer-col-title">Navigation</h4>
        <ul class="footer-links">
          <li><a href="<?php echo esc_url(home_url('/about/')); ?>">About the Chapter</a></li>
          <li><a href="<?php echo esc_url(home_url('/webinars/')); ?>">Webinar Program</a></li>
          <li><a href="<?php echo esc_url(home_url('/working-groups/')); ?>">Working Groups</a></li>
          <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>">CPD Calendar Hub</a></li>
          <li><a href="<?php echo esc_url(home_url('/contact/')); ?>">Contact &amp; Join</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-col-title">Industry Alliances</h4>
        <ul class="footer-links">
          <li><a href="https://www.sfpe.org" target="_blank" rel="noopener">SFPE Global Portal</a></li>
          <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>">Society of Fire Safety (SFS)</a></li>
          <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>">AIDGC Dangerous Goods</a></li>
          <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>">SFPE New Zealand Chapter</a></li>
          <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>">Engineers Australia CPD</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-col-title">Connect</h4>
        <ul class="footer-links">
          <li><a href="<?php echo esc_url(home_url('/contact/')); ?>">Join a Working Group</a></li>
          <li><a href="<?php echo esc_url(home_url('/webinars/')); ?>">Speaker Proposal</a></li>
          <li><a href="<?php echo esc_url(home_url('/contact/')); ?>">Handbook Discount Access</a></li>
          <li><a href="mailto:haninh1997@gmail.com">haninh1997@gmail.com</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div>
        &copy; <?php echo date('Y'); ?> SFPE Australia Chapter. Affiliated with the Society of Fire Protection Engineers.
      </div>
      <div>
        Dedicated to advancing fire safety engineering across Australia.
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
// 4. FRONT-PAGE.PHP (Elevated, AFRAN-inspired Professional Homepage)
// -------------------------------------------------------------
const frontPagePhp = `<?php
/**
 * Template Name: Front Page (Home)
 */
get_header(); ?>

<!-- Hero Section with Atmospheric Australian Landscape & Two-Column Grid -->
<section class="hero-section">
  <div class="container hero-grid">
    <div>
      <div class="hero-eyebrow">
        <span>Global Fire Safety Science</span>
        <span>&bull;</span>
        <span>Australian Practice</span>
      </div>
      <h1 class="hero-title">
        Advancing fire safety engineering through <span>global science and local practice.</span>
      </h1>
      <p class="hero-lead">
        SFPE Australia connects practitioners, university researchers, and regulatory authorities with world-leading fire science: delivering Australianized technical seminars, cross-disciplinary forums, and performance-based design insights.
      </p>
      <div class="hero-actions">
        <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-primary" style="padding: 12px 24px; font-size: 15px;">
          Explore 2026/2027 Program
        </a>
        <a href="<?php echo esc_url(home_url('/about/')); ?>" class="btn btn-secondary" style="padding: 12px 24px; font-size: 15px;">
          About the Chapter
        </a>
      </div>
    </div>

    <div>
      <div class="hero-card">
        <div class="hero-card-header">
          <div class="hero-card-icon">&#127760;</div>
          <div>
            <div class="hero-card-title">The International Gateway</div>
            <div class="hero-card-subtitle">Connecting Australia to Global Innovation</div>
          </div>
        </div>
        <ul class="hero-card-list">
          <li class="hero-card-item">
            <span class="hero-card-bullet">&bull;</span>
            <div>
              <strong>Global Research Gateway</strong>
              Direct access to international SFPE research, handbook authors, and global conferences.
            </div>
          </li>
          <li class="hero-card-item">
            <span class="hero-card-bullet">&bull;</span>
            <div>
              <strong>Bilateral Industry Collaboration</strong>
              Co-badged technical seminars alongside SFS, AIDGC, and international sister chapters.
            </div>
          </li>
          <li class="hero-card-item">
            <span class="hero-card-bullet">&bull;</span>
            <div>
              <strong>The Discussant Model</strong>
              Pairing world-leading international researchers with Australian specialists to ground insights in NCC/BCA performance solutions.
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Key Figures / Stat Bar -->
<section class="stat-bar">
  <div class="container stat-grid">
    <div class="stat-item">
      <div class="stat-number">100+</div>
      <div class="stat-label">Global SFPE Chapters</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">6</div>
      <div class="stat-label">Flagship Seminars Targeted</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">4</div>
      <div class="stat-label">Active Working Groups</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">100%</div>
      <div class="stat-label">EA CPD Self-Reportable</div>
    </div>
  </div>
</section>

<!-- Strategic Pillars (AFRAN Model) -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Core Mission</span>
      <h2 class="section-title">Connecting Science to Practice</h2>
      <p class="section-desc">
        SFPE Australia operates at the intersection of international research, higher education, consulting practice, and regulation to advance fire safety outcomes across Australia.
      </p>
    </div>

    <div class="pillars-grid">
      <div class="pillar-card">
        <div class="pillar-icon">&#129309;</div>
        <h3 class="pillar-title">Connects Communities</h3>
        <p class="pillar-text">
          Bringing together university researchers (UQ, RMIT), consulting practitioners, building certifiers, and regulatory authorities to strengthen national fire safety engineering capabilities.
        </p>
      </div>

      <div class="pillar-card">
        <div class="pillar-icon">&#128172;</div>
        <h3 class="pillar-title">Fosters Technical Dialogue</h3>
        <p class="pillar-text">
          Curating high-impact seminars and workshops on pressing engineering frontiers: battery energy storage systems (BESS), mass timber, and high-hazard critical infrastructure.
        </p>
      </div>

      <div class="pillar-card">
        <div class="pillar-icon">&#127919;</div>
        <h3 class="pillar-title">Drives Practical Impact</h3>
        <p class="pillar-text">
          Translating international experimental testing and fire dynamics research into verified engineering methods for National Construction Code (NCC/BCA) performance solutions.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Featured Webinars Spotlight -->
<section class="section section-alt">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Technical Program</span>
      <h2 class="section-title">2026 / 2027 Webinar Pipeline</h2>
      <p class="section-desc">
        Targeting 6 high-caliber technical seminars over the next 12 months. Each session features an international subject expert paired with an Australian discussant.
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
              <div class="webinar-desc"><?php echo esc_html(wp_trim_words(get_the_excerpt() ?: get_the_content(), 20)); ?></div>
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
              <a href="<?php the_permalink(); ?>" class="btn btn-outline-dark" style="font-size: 13px; padding: 6px 12px;">View Details</a>
            </div>
          </div>
        <?php endwhile; wp_reset_postdata(); ?>
      <?php endif; ?>
    </div>

    <div style="text-align: center; margin-top: 48px;">
      <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-primary" style="padding: 12px 28px; font-size: 15px;">
        View All 6 Pipeline Sessions &amp; CPD Details &rarr;
      </a>
    </div>
  </div>
</section>

<!-- Working Groups Overview -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Chapter Organisation</span>
      <h2 class="section-title">The Four Working Groups</h2>
      <p class="section-desc">
        Specialized working groups driving technical excellence, bilateral partnerships, digital communication, and chapter sustainability.
      </p>
    </div>

    <div class="wg-grid">
      <div class="wg-card">
        <span class="wg-badge">Core Operations</span>
        <h3 class="wg-title">Technical Program</h3>
        <p class="wg-desc">
          Coordinates the annual webinar schedule, curates topics from international research literature, and pairs global speakers with Australian discussants.
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
          Manages collaborative alliances with SFS, IFE, AIDGC, and international SFPE sister chapters to deliver co-badged events and technical crossovers.
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
          Manages chapter digital channels, event updates, member communications, and assists members with accessing SFPE Handbook discounts.
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
          Formulates sponsorship prospectuses, policy frameworks, and addresses chapter governance to support long-term initiatives.
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

    <!-- Participation Callout -->
    <div class="callout-box">
      <div class="callout-content">
        <h3>Get Involved in SFPE Australia</h3>
        <p>
          We welcome consulting engineers, university researchers, and students. Volunteer with one of our working groups or suggest an international webinar topic.
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

<!-- Partner Alliances Strip -->
<div class="partner-strip">
  <div class="container">
    <div class="partner-strip-title">Collaborating with Domestic &amp; Global Fire Engineering Bodies</div>
    <div class="partner-pills-row">
      <span class="partner-pill-badge">SFPE Global</span>
      <span class="partner-pill-badge">Society of Fire Safety (SFS)</span>
      <span class="partner-pill-badge">AIDGC Dangerous Goods</span>
      <span class="partner-pill-badge">IFE Australia</span>
      <span class="partner-pill-badge">SFPE New Zealand</span>
      <span class="partner-pill-badge">UQ Student Chapter</span>
    </div>
  </div>
</div>

<?php get_footer(); ?>
`;

writeThemeFile("front-page.php", frontPagePhp);
writeThemeFile("page-home.php", frontPagePhp);

// -------------------------------------------------------------
// 5. PAGE-ABOUT.PHP (Dignified Institutional Profile)
// -------------------------------------------------------------
const pageAboutPhp = `<?php
/**
 * Template Name: About Page
 */
get_header(); ?>

<section class="section" style="padding-top: 50px; background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container" style="max-width: 840px;">
    <span class="section-tag">Institutional Profile</span>
    <h1 class="section-title" style="font-size: 40px; margin-bottom: 16px;">About SFPE Australia</h1>
    <p class="section-desc" style="font-size: 18px; line-height: 1.6; color: var(--color-ink-muted);">
      SFPE Australia is the official Australian Chapter of the Society of Fire Protection Engineers: advancing the science and practice of fire safety engineering across Australia through international collaboration.
    </p>
  </div>
</section>

<section class="section">
  <div class="container" style="max-width: 840px;">
    <!-- Mission & Charter -->
    <div style="background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 36px; margin-bottom: 40px; box-shadow: var(--shadow-sm);">
      <h2 style="font-size: 24px; color: var(--color-ink); margin-bottom: 14px;">Our Mission &amp; Approach</h2>
      <p style="font-size: 15px; color: var(--color-ink-muted); line-height: 1.7; margin-bottom: 24px;">
        As the local branch of the world leading professional society for fire protection engineering, SFPE Australia serves as a dedicated knowledge bridge:
      </p>
      
      <div style="display: flex; flex-direction: column; gap: 18px;">
        <div style="display: flex; gap: 14px; align-items: flex-start;">
          <span style="color: var(--color-crimson); font-weight: 800; font-size: 20px; line-height: 1;">&bull;</span>
          <div>
            <strong style="color: var(--color-ink); display: block; font-size: 16px; margin-bottom: 3px;">Domestic in Partnership</strong>
            <span style="font-size: 14px; color: var(--color-ink-muted); line-height: 1.6;">
              Collaborating constructively alongside Australian bodies including the Society of Fire Safety (SFS), Engineers Australia, and AIDGC to deliver co-badged technical education.
            </span>
          </div>
        </div>
        
        <div style="display: flex; gap: 14px; align-items: flex-start;">
          <span style="color: var(--color-blue); font-weight: 800; font-size: 20px; line-height: 1;">&bull;</span>
          <div>
            <strong style="color: var(--color-ink); display: block; font-size: 16px; margin-bottom: 3px;">International Knowledge Exchange</strong>
            <span style="font-size: 14px; color: var(--color-ink-muted); line-height: 1.6;">
              Connected directly to SFPE chapters worldwide, international research foundations (UL FSRI, NFPA FPRF), and SFPE Handbook contributing authors.
            </span>
          </div>
        </div>

        <div style="display: flex; gap: 14px; align-items: flex-start;">
          <span style="color: var(--color-success); font-weight: 800; font-size: 20px; line-height: 1;">&bull;</span>
          <div>
            <strong style="color: var(--color-ink); display: block; font-size: 16px; margin-bottom: 3px;">The Discussant Model</strong>
            <span style="font-size: 14px; color: var(--color-ink-muted); line-height: 1.6;">
              Pairing world-leading international researchers with Australian fire engineering discussants to critically evaluate how global science applies under the National Construction Code (NCC/BCA).
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Chapter Executive & Committee Directory -->
    <div style="background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 36px; margin-bottom: 40px; box-shadow: var(--shadow-sm);">
      <h2 style="font-size: 24px; color: var(--color-ink); margin-bottom: 12px;">Executive Committee &amp; Leadership</h2>
      <p style="font-size: 14px; color: var(--color-ink-muted); line-height: 1.6; margin-bottom: 24px;">
        SFPE Australia is governed by an executive committee representing fire safety consultancies, research institutions, and certified practitioners:
      </p>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 24px;">
        <div style="background-color: var(--color-surface-alt); padding: 12px 16px; border-radius: var(--radius-sm);">
          <strong style="color: var(--color-ink); display: block; font-size: 14px;">Dr. Jonathan R. Barnett</strong>
          <span style="font-size: 12px; color: var(--color-ink-subtle);">President / Chair &bull; Basic Expert</span>
        </div>
        <div style="background-color: var(--color-surface-alt); padding: 12px 16px; border-radius: var(--radius-sm);">
          <strong style="color: var(--color-ink); display: block; font-size: 14px;">Dr. Frank Mendham</strong>
          <span style="font-size: 12px; color: var(--color-ink-subtle);">Vice President &bull; Mendham Consultants</span>
        </div>
        <div style="background-color: var(--color-surface-alt); padding: 12px 16px; border-radius: var(--radius-sm);">
          <strong style="color: var(--color-ink); display: block; font-size: 14px;">Dan Rathnayaka</strong>
          <span style="font-size: 12px; color: var(--color-ink-subtle);">Technical Program Chair &bull; Arup</span>
        </div>
        <div style="background-color: var(--color-surface-alt); padding: 12px 16px; border-radius: var(--radius-sm);">
          <strong style="color: var(--color-ink); display: block; font-size: 14px;">Michael Beecroft</strong>
          <span style="font-size: 12px; color: var(--color-ink-subtle);">Industry &amp; Partnerships Chair</span>
        </div>
        <div style="background-color: var(--color-surface-alt); padding: 12px 16px; border-radius: var(--radius-sm);">
          <strong style="color: var(--color-ink); display: block; font-size: 14px;">Dr. Amer Magrabi</strong>
          <span style="font-size: 12px; color: var(--color-ink-subtle);">Digital &amp; Membership Chair &bull; Lote Consulting</span>
        </div>
        <div style="background-color: var(--color-surface-alt); padding: 12px 16px; border-radius: var(--radius-sm);">
          <strong style="color: var(--color-ink); display: block; font-size: 14px;">Prof. David Lange</strong>
          <span style="font-size: 12px; color: var(--color-ink-subtle);">Secretary &bull; University of Queensland (UQ)</span>
        </div>
      </div>

      <div style="border-top: 1px solid var(--color-border); padding-top: 16px;">
        <span style="font-size: 13px; font-weight: 600; color: var(--color-ink); display: block; margin-bottom: 8px;">Contributing Committee Members:</span>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          <span class="partner-pill-badge">Pelle Zetterstrom (KBR)</span>
          <span class="partner-pill-badge">MC Hui (RED Fire Engineers)</span>
          <span class="partner-pill-badge">Aaron Nicholson (RED Fire Engineers)</span>
          <span class="partner-pill-badge">Tobias Salomonsson (RED Fire Engineers)</span>
          <span class="partner-pill-badge">Simon P. Krishnan (Astrix)</span>
          <span class="partner-pill-badge">Alex Glennon</span>
          <span class="partner-pill-badge">Derya Horasan (SciFire)</span>
          <span class="partner-pill-badge">Ninh (Web &amp; Systems Lead)</span>
        </div>
      </div>
    </div>

    <!-- Chapter Affiliation Note -->
    <div style="text-align: center;">
      <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-primary" style="padding: 12px 26px;">
        View 2026/2027 Webinar Pipeline &rarr;
      </a>
      <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn btn-outline-dark" style="padding: 12px 26px; margin-left: 12px;">
        Get in Touch
      </a>
    </div>
  </div>
</section>

<?php get_footer(); ?>
`;

writeThemeFile("page-about.php", pageAboutPhp);

// -------------------------------------------------------------
// 6. PAGE-WEBINARS.PHP
// -------------------------------------------------------------
const pageWebinarsPhp = `<?php
/**
 * Template Name: Webinars Page
 */
get_header(); ?>

<section class="section" style="padding-top: 50px; background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <span class="section-tag">Technical Education &amp; CPD</span>
    <h1 class="section-title" style="font-size: 40px; margin-bottom: 16px;">Webinar Program &amp; Pipeline</h1>
    <p class="section-desc" style="max-width: 780px; margin-bottom: 24px;">
      Targeting 6 high-caliber technical seminars over the next 12 months. Our format pairs leading international researchers with Australian discussants to translate global fire engineering science into local Building Code of Australia (BCA/NCC) context.
    </p>

    <div style="background-color: var(--color-surface-alt); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 18px 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
      <div>
        <strong style="color: var(--color-ink); display: block; font-size: 15px;">Continuing Professional Development (CPD)</strong>
        <span style="font-size: 14px; color: var(--color-ink-muted);">Webinar attendance is self-reportable to Engineers Australia (EA) under technical professional development.</span>
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
        <p style="font-size: 15px; color: var(--color-ink-muted);">Curated by the Technical Program Working Group (Dan Rathnayaka, Chair).</p>
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
              <div class="webinar-desc"><?php echo esc_html(wp_trim_words(get_the_excerpt() ?: get_the_content(), 24)); ?></div>
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
              <a href="<?php the_permalink(); ?>" class="btn btn-outline-dark" style="font-size: 13px; padding: 6px 12px;">View Details</a>
            </div>
          </div>
        <?php endwhile; wp_reset_postdata(); ?>
      <?php endif; ?>
    </div>

    <!-- Expression of Interest Form Anchor -->
    <div id="register-interest" style="margin-top: 72px;">
      <div class="form-card">
        <h3 style="font-size: 24px; margin-bottom: 10px; text-align: center; color: var(--color-ink);">
          Receive Webinar Invitations &amp; Updates
        </h3>
        <p style="font-size: 14px; color: var(--color-ink-muted); text-align: center; margin-bottom: 26px;">
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
            <input type="text" id="full_name" name="full_name" class="form-input" required placeholder="Jane Smith">
          </div>

          <div class="form-group">
            <label class="form-label" for="email">Email Address *</label>
            <input type="email" id="email" name="email" class="form-input" required placeholder="jane.smith@example.com">
          </div>

          <div class="form-group">
            <label class="form-label" for="organization">Organization / Practice</label>
            <input type="text" id="organization" name="organization" class="form-input" placeholder="Engineering Practice or University">
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

// -------------------------------------------------------------
// 7. PAGE-WORKING-GROUPS.PHP
// -------------------------------------------------------------
const pageWorkingGroupsPhp = `<?php
/**
 * Template Name: Working Groups Page
 */
get_header(); ?>

<section class="section" style="padding-top: 50px; background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <span class="section-tag">Governance &amp; Committees</span>
    <h1 class="section-title" style="font-size: 40px; margin-bottom: 16px;">Working Groups &amp; Committees</h1>
    <p class="section-desc" style="max-width: 780px;">
      SFPE Australia is organized into four dedicated working groups supporting technical innovation, cross-body alliances, digital reach, and chapter governance.
    </p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="wg-grid" style="grid-template-columns: repeat(2, 1fr); gap: 28px;">
      <!-- 1. Technical Program -->
      <div class="wg-card">
        <span class="wg-badge">Group 1 &bull; Technical Program</span>
        <h2 class="wg-title">Technical Program Working Group</h2>
        <p class="wg-desc">
          Coordinates the annual webinar schedule, curates topics from international research literature and SFPE handbook updates, identifies international presenters, and pairs each with an Australian discussant to localize technical value.
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
        <h2 class="wg-title">Partnerships &amp; Events Working Group</h2>
        <p class="wg-desc">
          Fosters collaborative domestic and international relationships. Leads liaison with the Society of Fire Safety (SFS), the Institution of Fire Engineers (IFE), AIDGC, and overseas SFPE chapters (UK, New Zealand).
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
        <h2 class="wg-title">Digital &amp; Membership Working Group</h2>
        <p class="wg-desc">
          Builds and maintains chapter digital infrastructure, coordinates member announcements, and resolves member access issues for SFPE Global Handbook discounts and international research publications.
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
        <h2 class="wg-title">Sponsorship &amp; Development Working Group</h2>
        <p class="wg-desc">
          Develops the formal sponsorship prospectus, establishes corporate partner policies, and investigates chapter governance, public liability, cyber insurance, and officer liability models.
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

    <!-- Callout -->
    <div style="text-align: center; margin-top: 56px;">
      <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn btn-primary" style="padding: 12px 28px; font-size: 15px;">
        Volunteer with a Working Group &rarr;
      </a>
    </div>
  </div>
</section>

<?php get_footer(); ?>
`;

writeThemeFile("page-working-groups.php", pageWorkingGroupsPhp);

// -------------------------------------------------------------
// 8. PAGE-CPD-HUB.PHP
// -------------------------------------------------------------
const pageCpdHubPhp = `<?php
/**
 * Template Name: CPD Hub Page
 */
get_header(); ?>

<section class="section" style="padding-top: 50px; background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <span class="section-tag">Continuing Professional Development</span>
    <h1 class="section-title" style="font-size: 40px; margin-bottom: 16px;">Central CPD &amp; Calendar Hub</h1>
    <p class="section-desc" style="max-width: 780px;">
      SFPE Australia provides a central repository connecting fire safety engineers to accredited CPD calendars across domestic partners, dangerous goods associations, and international research bodies.
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
          Primary technical society under Engineers Australia. Regional technical seminars, state chapter presentations, and national conferences.
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
          Australasian Institute of Dangerous Goods Consultants. Features CPD on flammable liquids, gas storages, chemical warehouses, and hazardous risks.
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
          Worldwide fire protection engineering live webinars, conference proceedings, technical standards, and the SFPE Foundation research hub.
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
          Underwriters Laboratories Fire Safety Research Institute and NFPA Research Foundation leading webinars on fire dynamics, battery energy storage, and materials.
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
          CPD management portal for chartered status (CPEng / NER). SFPE Australia webinars qualify directly under technical professional development.
        </p>
        <a href="https://www.engineersaustralia.org.au/training-and-events" target="_blank" rel="noopener" class="resource-link">
          EA CPD Management Portal &rarr;
        </a>
      </div>
    </div>

    <!-- Self-Reporting Guide -->
    <div style="margin-top: 56px; background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 36px;">
      <h2 style="font-size: 22px; color: var(--color-ink); margin-bottom: 14px;">Engineers Australia CPD Self-Reporting Guidance</h2>
      <p style="font-size: 14px; color: var(--color-ink-muted); line-height: 1.6; margin-bottom: 20px;">
        SFPE Australia technical seminars qualify directly toward your 150-hour Engineers Australia CPD requirement over three years.
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

// -------------------------------------------------------------
// 9. PAGE-CONTACT.PHP
// -------------------------------------------------------------
const pageContactPhp = `<?php
/**
 * Template Name: Contact & Get Involved Page
 */
get_header(); ?>

<section class="section" style="padding-top: 50px; background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container" style="text-align: center;">
    <span class="section-tag">Participation &amp; Community</span>
    <h1 class="section-title" style="font-size: 40px; margin-bottom: 16px;">Get Involved with SFPE Australia</h1>
    <p class="section-desc" style="max-width: 680px; margin: 0 auto;">
      Whether you want to volunteer for a working group, suggest an international webinar presenter, or access SFPE Handbook resources, we welcome your involvement.
    </p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="form-card">
      <?php if (isset($_GET['submitted'])) : ?>
        <div class="alert alert-success">
          Thank you for reaching out. Your message has been received by our committee (haninh1997@gmail.com) and we will respond to you shortly.
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
          <input type="text" id="organization" name="organization" class="form-input" placeholder="Fire Engineering Consultancy or Academic Body">
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

      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--color-border); text-align: center; font-size: 13px; color: var(--color-ink-muted);">
        Enquiries are directed to the chapter administrator at <strong>haninh1997@gmail.com</strong>.
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
  <div class="container" style="max-width: 800px;">
    <?php while (have_posts()) : the_post(); 
      $session = get_post_meta(get_the_ID(), '_webinar_session_number', true) ?: 'Upcoming Session';
      $partner = get_post_meta(get_the_ID(), '_webinar_partner', true) ?: 'SFPE Alliance';
      $speaker = get_post_meta(get_the_ID(), '_webinar_speaker', true) ?: 'International Presenter';
      $discussant = get_post_meta(get_the_ID(), '_webinar_discussant', true) ?: 'Australian Discussant';
      $status = get_post_meta(get_the_ID(), '_webinar_status', true) ?: 'In Pipeline';
    ?>
      <div style="margin-bottom: 20px;">
        <span class="webinar-session-badge"><?php echo esc_html($session); ?></span>
        <span class="webinar-partner-pill" style="margin-left: 10px;"><?php echo esc_html($partner); ?></span>
      </div>
      <h1 style="font-size: 34px; margin-bottom: 22px; line-height: 1.25;"><?php the_title(); ?></h1>
      
      <div class="webinar-specs" style="margin-bottom: 30px;">
        <div class="webinar-spec-row">
          <span class="webinar-spec-label">International Presenter:</span>
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

console.log("All professional v3 theme files written successfully!");
