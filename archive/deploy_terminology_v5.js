// Deploys SFPE Australia v5 theme: Terminology, Brand Naming & Logical Consistency Overhaul
// Corrects subtitle to "Society of Fire Protection Engineers"
// Refines global-local discipline bridge (Fire Protection Engineering vs Australian Practice)
const cp = require("child_process");

function runPhp(code, desc) {
  process.stdout.write(`Executing: ${desc}... `);
  const input = JSON.stringify({ code });
  try {
    const res = cp.execSync("novamira run --yes novamira/execute-php --input - --json", {
      input,
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024
    });
    const parsed = JSON.parse(res);
    if (parsed.ok && parsed.data && parsed.data.success) {
      console.log("OK");
      return parsed.data.return_value;
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
// 1. STYLE.CSS (Version 5.0.0)
// -------------------------------------------------------------
const styleCss = `/*
Theme Name: SFPE Australia
Theme URI: https://sfpe.xo.je
Description: Official theme for the Australian Chapter of the Society of Fire Protection Engineers (SFPE).
Author: Ninh
Author URI: https://sfpe.xo.je
Version: 5.0.0
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
  
  --container-max: 1400px;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  font-size: clamp(16px, 0.95rem + 0.2vw, 18px);
  line-height: 1.65;
  color: var(--color-ink);
  background-color: var(--color-bg-canvas);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
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
  padding: 0 clamp(20px, 3.5vw, 48px);
}

.container-narrow {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 clamp(20px, 3.5vw, 48px);
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
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.top-bar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.top-bar-tagline {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.top-bar-badge {
  background-color: var(--color-crimson);
  color: #FFFFFF;
  padding: 2px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.top-bar-text {
  font-size: 13px;
  color: #CBD5E1;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: clamp(14px, 1.4vw, 20px) 0;
  position: relative;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 14px;
  color: #FFFFFF;
  text-decoration: none;
}

.brand-logo-img {
  height: clamp(44px, 3.4vw, 54px);
  width: auto;
  display: block;
  border-radius: 6px;
  background-color: #FFFFFF;
  padding: 5px 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
}

.brand-text-block {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: clamp(18px, 1.5vw, 22px);
  font-weight: 800;
  letter-spacing: -0.4px;
  color: #FFFFFF;
  line-height: 1.15;
}

.brand-subtitle {
  font-size: 11.5px;
  color: #94A3B8;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: clamp(16px, 1.8vw, 32px);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: clamp(8px, 1vw, 20px);
  align-items: center;
}

.nav-link {
  color: #E2E8F0;
  font-size: clamp(14.5px, 1vw, 16px);
  font-weight: 600;
  padding: 8px 14px;
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
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  white-space: nowrap;
}

.btn-primary {
  background-color: var(--color-blue);
  color: #FFFFFF;
  border: 1px solid transparent;
  box-shadow: 0 2px 6px rgba(0, 114, 187, 0.3);
}

.btn-primary:hover {
  background-color: var(--color-blue-hover);
  color: #FFFFFF;
  box-shadow: 0 4px 12px rgba(0, 114, 187, 0.4);
}

.btn-secondary {
  background-color: rgba(255, 255, 255, 0.12);
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.22);
  color: #FFFFFF;
  border-color: rgba(255, 255, 255, 0.4);
}

.btn-crimson {
  background-color: var(--color-crimson);
  color: #FFFFFF;
  border: 1px solid transparent;
}

.btn-crimson:hover {
  background-color: var(--color-crimson-hover);
  color: #FFFFFF;
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
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
  font-size: 24px;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

.mobile-toggle:hover {
  background: rgba(255, 255, 255, 0.18);
}

/* Two-Column Hero Section with Australian Landscape */
.hero-section {
  position: relative;
  background-color: var(--color-navy);
  background-image: linear-gradient(135deg, rgba(7, 13, 30, 0.88) 0%, rgba(11, 19, 43, 0.85) 100%), url('images/hero-australia-bg.jpg');
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  color: #FFFFFF;
  padding: clamp(72px, 8vw, 120px) 0 clamp(80px, 9vw, 130px);
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.85fr;
  gap: clamp(40px, 4.5vw, 80px);
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(211, 34, 40, 0.22);
  border: 1px solid rgba(211, 34, 40, 0.5);
  color: #FECACA;
  padding: 7px 16px;
  border-radius: var(--radius-full);
  font-size: clamp(12px, 0.9vw, 14px);
  font-weight: 700;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.hero-title {
  font-size: clamp(36px, 4vw, 58px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -1.2px;
  color: #FFFFFF;
  margin-bottom: 24px;
}

.hero-title span {
  color: #60A5FA;
}

.hero-lead {
  font-size: clamp(17px, 1.3vw, 21px);
  line-height: 1.65;
  color: #E2E8F0;
  margin-bottom: clamp(28px, 3vw, 40px);
  max-width: 720px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero-card {
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-lg);
  padding: clamp(28px, 3vw, 44px);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}

.hero-card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: clamp(20px, 2vw, 28px);
}

.hero-card-icon {
  width: 50px;
  height: 50px;
  background-color: var(--color-blue);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #FFFFFF;
  flex-shrink: 0;
}

.hero-card-title {
  color: #FFFFFF;
  font-size: clamp(18px, 1.3vw, 21px);
  font-weight: 700;
}

.hero-card-subtitle {
  font-size: clamp(12px, 0.9vw, 13px);
  color: #94A3B8;
  font-weight: 500;
}

.hero-card-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 1.8vw, 22px);
}

.hero-card-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  font-size: clamp(14px, 0.95vw, 15.5px);
  color: #E2E8F0;
  line-height: 1.55;
}

.hero-card-bullet {
  color: var(--color-crimson);
  font-weight: 800;
  font-size: 20px;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 2px;
}

.hero-card-item strong {
  color: #FFFFFF;
  display: block;
  font-size: clamp(15px, 1vw, 16.5px);
  margin-bottom: 3px;
  font-weight: 700;
}

/* Key Figures / Stat Bar */
.stat-bar {
  background-color: var(--color-navy-dark);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: #FFFFFF;
  padding: clamp(28px, 3vw, 40px) 0;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(20px, 2.5vw, 40px);
  text-align: center;
}

.stat-item {
  padding: 0 clamp(12px, 1.5vw, 24px);
  border-right: 1px solid rgba(255, 255, 255, 0.12);
}

.stat-item:last-child {
  border-right: none;
}

.stat-number {
  font-size: clamp(38px, 3.4vw, 54px);
  font-weight: 800;
  color: #60A5FA;
  line-height: 1.05;
  margin-bottom: 8px;
  font-family: var(--font-heading);
}

.stat-label {
  font-size: clamp(13.5px, 0.95vw, 15px);
  color: #94A3B8;
  font-weight: 600;
  letter-spacing: 0.2px;
}

/* Sections Common */
.section {
  padding: clamp(72px, 7vw, 110px) 0;
}

.section-alt {
  background-color: var(--color-surface);
}

.section-header {
  max-width: 820px;
  margin: 0 auto clamp(44px, 4.5vw, 64px);
  text-align: center;
}

.section-tag {
  color: var(--color-blue);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  margin-bottom: 12px;
  display: block;
}

.section-title {
  font-size: clamp(30px, 2.7vw, 44px);
  letter-spacing: -0.8px;
  margin-bottom: 16px;
  color: var(--color-ink);
  line-height: 1.2;
}

.section-desc {
  font-size: clamp(16px, 1.15vw, 19px);
  color: var(--color-ink-muted);
  line-height: 1.65;
}

/* Pillars Grid (AFRAN Model) */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(24px, 2.4vw, 36px);
}

.pillar-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: clamp(28px, 2.8vw, 42px);
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
  width: 52px;
  height: 52px;
  background-color: var(--color-blue-soft);
  color: var(--color-blue);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 22px;
  flex-shrink: 0;
}

.pillar-title {
  font-size: clamp(20px, 1.4vw, 24px);
  margin-bottom: 12px;
  color: var(--color-ink);
}

.pillar-text {
  font-size: clamp(14.5px, 0.95vw, 16px);
  color: var(--color-ink-muted);
  line-height: 1.65;
}

/* Webinar Cards & Grid */
.webinar-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(24px, 2.4vw, 36px);
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
  padding: 18px 24px;
  background-color: var(--color-surface-alt);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.webinar-session-badge {
  font-family: var(--font-heading);
  font-size: 12.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-crimson);
}

.webinar-partner-pill {
  font-size: 12.5px;
  font-weight: 600;
  background-color: #FFFFFF;
  border: 1px solid var(--color-border);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  color: var(--color-ink-muted);
}

.webinar-card-body {
  padding: clamp(24px, 2.2vw, 32px);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.webinar-title {
  font-size: clamp(18px, 1.25vw, 21px);
  margin-bottom: 14px;
  line-height: 1.35;
  color: var(--color-ink);
}

.webinar-desc {
  font-size: clamp(14px, 0.95vw, 15.5px);
  color: var(--color-ink-muted);
  margin-bottom: 20px;
  line-height: 1.6;
  flex-grow: 1;
}

.webinar-specs {
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 13.5px;
}

.webinar-spec-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.webinar-spec-label {
  color: var(--color-ink-subtle);
  font-weight: 500;
  flex-shrink: 0;
}

.webinar-spec-value {
  color: var(--color-ink);
  font-weight: 600;
  text-align: right;
}

.webinar-card-footer {
  padding: 18px 24px;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  background-color: #FFFFFF;
  flex-wrap: wrap;
}

.webinar-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
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
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(20px, 1.8vw, 28px);
}

.wg-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: clamp(24px, 2.2vw, 32px);
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
  font-size: 11.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  background-color: var(--color-blue-soft);
  color: var(--color-blue);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  margin-bottom: 16px;
}

.wg-title {
  font-size: clamp(18px, 1.25vw, 21px);
  margin-bottom: 12px;
  color: var(--color-ink);
  line-height: 1.3;
}

.wg-desc {
  font-size: clamp(13.5px, 0.9vw, 15px);
  color: var(--color-ink-muted);
  line-height: 1.6;
  margin-bottom: 22px;
  flex-grow: 1;
}

.wg-leadership {
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13.5px;
}

.wg-person {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.wg-role {
  color: var(--color-ink-subtle);
  font-weight: 500;
}

.wg-name {
  color: var(--color-ink);
  font-weight: 700;
}

/* Executive Committee Directory Grid */
.exec-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 28px;
}

.exec-card {
  background-color: var(--color-surface-alt);
  padding: 16px 20px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.exec-name {
  color: var(--color-ink);
  display: block;
  font-size: 15.5px;
  font-weight: 700;
  margin-bottom: 3px;
}

.exec-role {
  font-size: 13px;
  color: var(--color-ink-subtle);
  font-weight: 500;
}

/* Partner Alliances Strip */
.partner-strip {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: clamp(48px, 4.5vw, 64px) 0;
  text-align: center;
}

.partner-strip-title {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: var(--color-ink-subtle);
  margin-bottom: 26px;
}

.partner-pills-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(10px, 1.2vw, 16px);
  flex-wrap: wrap;
}

.partner-pill-badge {
  background-color: var(--color-bg-canvas);
  border: 1px solid var(--color-border);
  padding: clamp(8px, 1vw, 12px) clamp(16px, 1.5vw, 24px);
  border-radius: var(--radius-md);
  font-size: clamp(13px, 0.95vw, 15px);
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
  padding: clamp(40px, 4vw, 64px);
  margin-top: clamp(48px, 5vw, 72px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 36px;
}

.callout-content h3 {
  color: #FFFFFF;
  font-size: clamp(24px, 2.2vw, 34px);
  margin-bottom: 12px;
}

.callout-content p {
  color: #CBD5E1;
  font-size: clamp(15px, 1.1vw, 18px);
  max-width: 680px;
  line-height: 1.6;
}

/* CPD Hub & Resource Cards */
.resource-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(24px, 2.4vw, 36px);
}

.resource-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: clamp(26px, 2.4vw, 36px);
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
  width: 48px;
  height: 48px;
  background-color: var(--color-blue-soft);
  color: var(--color-blue);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 18px;
  flex-shrink: 0;
}

.resource-title {
  font-size: clamp(18px, 1.25vw, 21px);
  margin-bottom: 10px;
  color: var(--color-ink);
}

.resource-desc {
  font-size: clamp(14px, 0.95vw, 15.5px);
  color: var(--color-ink-muted);
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
}

.resource-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-blue);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* Forms */
.form-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: clamp(28px, 3.5vw, 48px);
  box-shadow: var(--shadow-md);
  max-width: 720px;
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
  padding: 13px 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--color-ink);
  background-color: #FFFFFF;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--color-blue);
  box-shadow: 0 0 0 3px rgba(0, 114, 187, 0.15);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.alert {
  padding: 14px 18px;
  border-radius: var(--radius-sm);
  margin-bottom: 24px;
  font-size: 14.5px;
  line-height: 1.55;
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
  padding: clamp(60px, 6vw, 90px) 0 36px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: clamp(32px, 3.5vw, 56px);
  margin-bottom: 50px;
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
  font-size: 14.5px;
}

.footer-links a {
  color: #94A3B8;
  padding: 2px 0;
  display: inline-block;
}

.footer-links a:hover {
  color: #FFFFFF;
}

.footer-bottom {
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13.5px;
}

/* Responsive Media Queries */
@media (max-width: 1080px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 44px;
  }
  .wg-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .pillars-grid, .webinar-grid, .resource-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
}

@media (max-width: 960px) {
  .mobile-toggle {
    display: flex;
  }
  .main-nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    width: 100%;
    background-color: var(--color-navy);
    flex-direction: column;
    padding: 20px 24px 28px;
    border-bottom: 2px solid var(--color-blue);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    z-index: 999;
    gap: 16px;
  }
  .main-nav.open {
    display: flex;
  }
  .nav-links {
    flex-direction: column;
    width: 100%;
    align-items: stretch;
    gap: 4px;
  }
  .nav-link {
    font-size: 16px;
    padding: 12px 14px;
    border-radius: var(--radius-sm);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  .main-nav .btn {
    width: 100%;
    padding: 14px;
    font-size: 15px;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .stat-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
  .stat-item {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--radius-md);
    background: rgba(255, 255, 255, 0.04);
    padding: 18px 12px;
  }
  .stat-item:last-child {
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .stat-number {
    font-size: 32px;
    margin-bottom: 4px;
  }
  .stat-label {
    font-size: 13px;
  }

  .webinar-grid, .pillars-grid, .resource-grid, .wg-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .exec-grid {
    grid-template-columns: 1fr;
  }

  .webinar-spec-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
  }
  .webinar-spec-value {
    text-align: left;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }
  .hero-actions .btn {
    width: 100%;
    text-align: center;
  }

  .callout-box {
    flex-direction: column;
    text-align: center;
    gap: 24px;
    padding: 32px 20px;
  }
  .callout-box .btn {
    width: 100%;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }

  .hero-card {
    padding: 24px 20px;
  }
}

@media (max-width: 480px) {
  .brand-subtitle {
    display: none;
  }
  .top-bar-badge {
    font-size: 10px;
    padding: 2px 7px;
  }
  .partner-pill-badge {
    width: 100%;
    text-align: center;
  }
}
`;

writeThemeFile("style.css", styleCss);

// -------------------------------------------------------------
// 2. HEADER.PHP (Accurate SFPE Brand & Status)
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
        <span class="top-bar-text">The Society of Fire Protection Engineers (SFPE)</span>
      </div>
      <div>
        <a href="https://www.linkedin.com/company/sfpe-au/" target="_blank" rel="noopener" style="color: #CBD5E1; font-size: 13px; display: inline-flex; align-items: center; gap: 4px; padding: 4px 0;">
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
        <span class="brand-subtitle">Society of Fire Protection Engineers</span>
      </div>
    </a>

    <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle navigation" aria-expanded="false">&#9776;</button>

    <nav class="main-nav" id="main-nav">
      <ul class="nav-links">
        <li><a href="<?php echo esc_url(home_url('/')); ?>" class="nav-link <?php echo is_front_page() ? 'active' : ''; ?>">Home</a></li>
        <li><a href="<?php echo esc_url(home_url('/about/')); ?>" class="nav-link <?php echo is_page('about') ? 'active' : ''; ?>">About</a></li>
        <li><a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="nav-link <?php echo is_page('webinars') ? 'active' : ''; ?>">Webinars</a></li>
        <li><a href="<?php echo esc_url(home_url('/working-groups/')); ?>" class="nav-link <?php echo is_page('working-groups') ? 'active' : ''; ?>">Working Groups</a></li>
        <li><a href="<?php echo esc_url(home_url('/cpd-hub/')); ?>" class="nav-link <?php echo is_page('cpd-hub') ? 'active' : ''; ?>">CPD Hub</a></li>
        <li><a href="<?php echo esc_url(home_url('/contact/')); ?>" class="nav-link <?php echo is_page('contact') ? 'active' : ''; ?>">Contact &amp; Join</a></li>
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
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
});
</script>
`;

writeThemeFile("header.php", headerPhp);

// -------------------------------------------------------------
// 3. FOOTER.PHP (Consistent Professional Nomenclature)
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
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 18px;">
          <img src="<?php echo esc_url(get_template_directory_uri() . '/images/sfpe-australia-logo.png'); ?>" alt="SFPE Australia Chapter Logo" style="height: 42px; width: auto; background-color: #FFFFFF; padding: 4px 8px; border-radius: 4px;">
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: 19px; font-weight: 800; color: #FFFFFF; line-height: 1.15;">SFPE Australia</span>
            <span style="font-size: 11px; color: #94A3B8; text-transform: uppercase; font-weight: 600;">Society of Fire Protection Engineers</span>
          </div>
        </div>
        <p style="font-size: 14px; line-height: 1.65; color: #94A3B8; margin-bottom: 18px;">
          The official Australian chapter of the Society of Fire Protection Engineers, connecting domestic performance-based engineering practice with international fire protection research, handbooks, and science.
        </p>
        <p style="font-size: 14px;">
          <a href="https://www.linkedin.com/company/sfpe-au/" target="_blank" rel="noopener" style="color: #60A5FA; display: inline-flex; align-items: center; gap: 6px;">
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
        Advancing fire protection and safety engineering through international research and local practice.
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
// 4. FRONT-PAGE.PHP (Logical Terminology & Positioning)
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
        <span>International Fire Protection Engineering</span>
        <span>&bull;</span>
        <span>Australian Practice</span>
      </div>
      <h1 class="hero-title">
        Connecting Australian practice with <span>international fire protection engineering.</span>
      </h1>
      <p class="hero-lead">
        The Australian Chapter of the Society of Fire Protection Engineers (SFPE) bridges domestic performance-based engineering with world-leading fire science: delivering technical seminars with Australian discussants, international handbook insights, and cross-disciplinary forums.
      </p>
      <div class="hero-actions">
        <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-primary">
          Explore 2026/2027 Program
        </a>
        <a href="<?php echo esc_url(home_url('/about/')); ?>" class="btn btn-secondary">
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
              <strong>Global Fire Protection Science</strong>
              Direct access to SFPE Foundation research, SFPE Handbook authors, and worldwide technical conferences.
            </div>
          </li>
          <li class="hero-card-item">
            <span class="hero-card-bullet">&bull;</span>
            <div>
              <strong>Domestic Industry Collaboration</strong>
              Co-badged technical seminars alongside the Society of Fire Safety (SFS), AIDGC, and overseas SFPE chapters.
            </div>
          </li>
          <li class="hero-card-item">
            <span class="hero-card-bullet">&bull;</span>
            <div>
              <strong>The Discussant Model</strong>
              Pairing international researchers with Australian fire engineering leaders to translate global science into NCC/BCA performance solutions.
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
      <div class="stat-number">6</div>
      <div class="stat-label">Technical Webinars</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">4</div>
      <div class="stat-label">Working Groups</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">100%</div>
      <div class="stat-label">Engineers Australia CPD</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">SFPE</div>
      <div class="stat-label">Official Chapter</div>
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
        SFPE Australia operates at the intersection of international research, higher education, consulting practice, and regulation to advance fire protection outcomes across Australia.
      </p>
    </div>

    <div class="pillars-grid">
      <div class="pillar-card">
        <div class="pillar-icon">&#129309;</div>
        <h3 class="pillar-title">Connects Communities</h3>
        <p class="pillar-text">
          Bringing together university researchers (UQ, RMIT), consulting practitioners, building certifiers, and fire authorities to strengthen national fire safety and protection engineering capabilities.
        </p>
      </div>

      <div class="pillar-card">
        <div class="pillar-icon">&#127758;</div>
        <h3 class="pillar-title">Disseminates Global Science</h3>
        <p class="pillar-text">
          Providing direct access to peer-reviewed literature from the Society of Fire Protection Engineers, the SFPE Foundation, and updates to the SFPE Handbook of Fire Protection Engineering.
        </p>
      </div>

      <div class="pillar-card">
        <div class="pillar-icon">&#9878;</div>
        <h3 class="pillar-title">The Discussant Model</h3>
        <p class="pillar-text">
          Pairing international authors with Australian specialists to evaluate how overseas methodologies apply under the National Construction Code (NCC / Building Code of Australia).
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Featured Webinar Program -->
<section class="section section-alt">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Technical Program</span>
      <h2 class="section-title">Upcoming Webinar Series</h2>
      <p class="section-desc">
        Delivering 6 specialized technical seminars over 12 months in partnership with international chapters and domestic engineering societies.
      </p>
    </div>

    <div class="webinar-grid">
      <!-- Session 1: SFPE UK -->
      <div class="webinar-card">
        <div class="webinar-card-header">
          <span class="webinar-session-badge">Session 1 &bull; Late 2026</span>
          <span class="webinar-partner-pill">SFPE UK Chapter</span>
        </div>
        <div class="webinar-card-body">
          <h3 class="webinar-title">UK &amp; Australia Joint Technical Dialogue</h3>
          <p class="webinar-desc">
            International perspectives on structural fire engineering, high-rise facade testing, and professional competency frameworks across UK and Australian practice.
          </p>
          <div class="webinar-specs">
            <div class="webinar-spec-row">
              <span class="webinar-spec-label">Format:</span>
              <span class="webinar-spec-value">Joint Chapter Dialogue</span>
            </div>
            <div class="webinar-spec-row">
              <span class="webinar-spec-label">Partnership:</span>
              <span class="webinar-spec-value">SFPE UK Chapter</span>
            </div>
          </div>
        </div>
        <div class="webinar-card-footer">
          <span class="webinar-status">Confirmed Partner</span>
          <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-outline-dark" style="font-size: 13px; padding: 7px 14px;">Details &rarr;</a>
        </div>
      </div>

      <!-- Session 2: AIDGC -->
      <div class="webinar-card">
        <div class="webinar-card-header">
          <span class="webinar-session-badge">Session 2 &bull; Early 2027</span>
          <span class="webinar-partner-pill">AIDGC</span>
        </div>
        <div class="webinar-card-body">
          <h3 class="webinar-title">Fire Engineering &amp; Dangerous Goods Crossover</h3>
          <p class="webinar-desc">
            Bridging performance fire design and dangerous goods consultancy: storage risks, chemical warehouses, and flammability classifications.
          </p>
          <div class="webinar-specs">
            <div class="webinar-spec-row">
              <span class="webinar-spec-label">Presenter:</span>
              <span class="webinar-spec-value">Sean Page (Pres. AIDGC)</span>
            </div>
            <div class="webinar-spec-row">
              <span class="webinar-spec-label">Topic:</span>
              <span class="webinar-spec-value">Hazardous Materials</span>
            </div>
          </div>
        </div>
        <div class="webinar-card-footer">
          <span class="webinar-status">In Development</span>
          <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-outline-dark" style="font-size: 13px; padding: 7px 14px;">Details &rarr;</a>
        </div>
      </div>

      <!-- Session 3: Trans-Tasman -->
      <div class="webinar-card">
        <div class="webinar-card-header">
          <span class="webinar-session-badge">Session 3 &bull; Early 2027</span>
          <span class="webinar-partner-pill">SFPE New Zealand</span>
        </div>
        <div class="webinar-card-body">
          <h3 class="webinar-title">Trans-Tasman Performance Design Practices</h3>
          <p class="webinar-desc">
            Comparative analysis of New Zealand C/VM2 verification methods versus Australian NCC Performance Solutions in complex buildings.
          </p>
          <div class="webinar-specs">
            <div class="webinar-spec-row">
              <span class="webinar-spec-label">Partnership:</span>
              <span class="webinar-spec-value">SFPE New Zealand</span>
            </div>
            <div class="webinar-spec-row">
              <span class="webinar-spec-label">Scope:</span>
              <span class="webinar-spec-value">Verification Methods</span>
            </div>
          </div>
        </div>
        <div class="webinar-card-footer">
          <span class="webinar-status">Confirmed Partner</span>
          <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-outline-dark" style="font-size: 13px; padding: 7px 14px;">Details &rarr;</a>
        </div>
      </div>
    </div>

    <div style="text-align: center; margin-top: clamp(36px, 4vw, 56px);">
      <a href="<?php echo esc_url(home_url('/webinars/')); ?>" class="btn btn-primary">
        View All 6 Pipeline Sessions &rarr;
      </a>
    </div>
  </div>
</section>

<!-- The Four Working Groups -->
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
            <span class="wg-role">Contributing:</span>
            <span class="wg-name">Jonathan R. Barnett</span>
          </div>
        </div>
      </div>

      <div class="wg-card">
        <span class="wg-badge">Digital Reach</span>
        <h3 class="wg-title">Digital &amp; Membership</h3>
        <p class="wg-desc">
          Oversees online infrastructure, member communications, and access pathways for SFPE Global Handbook discounts and international research literature.
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
        <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn btn-primary">
          Express Your Interest
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Partner Alliances Strip -->
<div class="partner-strip">
  <div class="container">
    <div class="partner-strip-title">Collaborating with Domestic &amp; Global Engineering Bodies</div>
    <div class="partner-pills-row">
      <span class="partner-pill-badge">SFPE Global</span>
      <span class="partner-pill-badge">Society of Fire Safety (SFS)</span>
      <span class="partner-pill-badge">AIDGC (Dangerous Goods)</span>
      <span class="partner-pill-badge">IFE Australia Branch</span>
      <span class="partner-pill-badge">SFPE New Zealand Chapter</span>
      <span class="partner-pill-badge">UQ SFPE Student Chapter</span>
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

<section class="section" style="padding-top: clamp(48px, 5vw, 72px); background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container-narrow">
    <span class="section-tag">Institutional Profile</span>
    <h1 class="section-title" style="margin-bottom: 16px;">About SFPE Australia</h1>
    <p class="section-desc" style="font-size: clamp(17px, 1.25vw, 20px); line-height: 1.65; color: var(--color-ink-muted);">
      SFPE Australia is the official Australian Chapter of the Society of Fire Protection Engineers (SFPE): advancing the science and practice through international collaboration, academic research, and domestic partnership.
    </p>
  </div>
</section>

<section class="section">
  <div class="container-narrow">
    <!-- Mission & Charter -->
    <div style="background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: clamp(28px, 3.2vw, 44px); margin-bottom: 40px; box-shadow: var(--shadow-sm);">
      <h2 style="font-size: clamp(22px, 1.8vw, 28px); color: var(--color-ink); margin-bottom: 16px;">Our Mission &amp; Approach</h2>
      <p style="font-size: 15.5px; color: var(--color-ink-muted); line-height: 1.7; margin-bottom: 26px;">
        As the local branch of the world leading professional society for fire protection engineering, SFPE Australia serves as a dedicated knowledge bridge:
      </p>
      
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; gap: 14px; align-items: flex-start;">
          <span style="color: var(--color-crimson); font-weight: 800; font-size: 22px; line-height: 1; flex-shrink: 0; margin-top: 2px;">&bull;</span>
          <div>
            <strong style="color: var(--color-ink); display: block; font-size: 16.5px; margin-bottom: 4px;">Domestic in Partnership</strong>
            <span style="font-size: 14.5px; color: var(--color-ink-muted); line-height: 1.65;">
              Collaborating constructively alongside Australian bodies including the Society of Fire Safety (SFS), Engineers Australia, and AIDGC to deliver co-badged technical education.
            </span>
          </div>
        </div>
        
        <div style="display: flex; gap: 14px; align-items: flex-start;">
          <span style="color: var(--color-blue); font-weight: 800; font-size: 22px; line-height: 1; flex-shrink: 0; margin-top: 2px;">&bull;</span>
          <div>
            <strong style="color: var(--color-ink); display: block; font-size: 16.5px; margin-bottom: 4px;">International Knowledge Exchange</strong>
            <span style="font-size: 14.5px; color: var(--color-ink-muted); line-height: 1.65;">
              Connected directly to SFPE chapters worldwide, international research foundations (UL FSRI, NFPA FPRF), and SFPE Handbook contributing authors.
            </span>
          </div>
        </div>

        <div style="display: flex; gap: 14px; align-items: flex-start;">
          <span style="color: var(--color-success); font-weight: 800; font-size: 22px; line-height: 1; flex-shrink: 0; margin-top: 2px;">&bull;</span>
          <div>
            <strong style="color: var(--color-ink); display: block; font-size: 16.5px; margin-bottom: 4px;">The Discussant Model</strong>
            <span style="font-size: 14.5px; color: var(--color-ink-muted); line-height: 1.65;">
              Pairing world-leading international researchers with Australian fire engineering discussants to critically evaluate how global science applies under the National Construction Code (NCC/BCA).
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Chapter Executive & Committee Directory -->
    <div style="background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: clamp(28px, 3.2vw, 44px); margin-bottom: 40px; box-shadow: var(--shadow-sm);">
      <h2 style="font-size: clamp(22px, 1.8vw, 28px); color: var(--color-ink); margin-bottom: 14px;">Executive Committee &amp; Leadership</h2>
      <p style="font-size: 15px; color: var(--color-ink-muted); line-height: 1.65; margin-bottom: 26px;">
        SFPE Australia is governed by an executive committee representing fire safety consultancies, research institutions, and certified practitioners:
      </p>

      <div class="exec-grid">
        <div class="exec-card">
          <strong class="exec-name">Dr. Jonathan R. Barnett</strong>
          <span class="exec-role">President / Chapter Chair &bull; Basic Expert</span>
        </div>
        <div class="exec-card">
          <strong class="exec-name">Dr. Frank Mendham</strong>
          <span class="exec-role">Vice President &bull; Mendham Consultants</span>
        </div>
        <div class="exec-card">
          <strong class="exec-name">Dan Rathnayaka</strong>
          <span class="exec-role">Technical Program Chair &bull; Arup</span>
        </div>
        <div class="exec-card">
          <strong class="exec-name">Michael Beecroft</strong>
          <span class="exec-role">Partnerships &amp; Industry Liaison Chair</span>
        </div>
        <div class="exec-card">
          <strong class="exec-name">Dr. Amer Magrabi</strong>
          <span class="exec-role">Digital &amp; Membership Chair &bull; Lote Consulting</span>
        </div>
        <div class="exec-card">
          <strong class="exec-name">Prof. David Lange</strong>
          <span class="exec-role">Secretary &bull; The University of Queensland (UQ)</span>
        </div>
      </div>

      <div style="border-top: 1px solid var(--color-border); padding-top: 20px;">
        <span style="font-size: 14px; font-weight: 700; color: var(--color-ink); display: block; margin-bottom: 12px;">Contributing Committee Members:</span>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          <span class="partner-pill-badge">Pelle Zetterstrom (KBR)</span>
          <span class="partner-pill-badge">MC Hui (RED Fire Engineers)</span>
          <span class="partner-pill-badge">Tobias Salomonsson</span>
          <span class="partner-pill-badge">Simon Krishnan</span>
          <span class="partner-pill-badge">Aaron Nicholson (RED Fire Engineers)</span>
          <span class="partner-pill-badge">Derya Horasan (SciFire)</span>
          <span class="partner-pill-badge">Alex Glennon</span>
        </div>
      </div>
    </div>

    <!-- Universities & Research Alliances -->
    <div style="background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: clamp(28px, 3.2vw, 44px); box-shadow: var(--shadow-sm);">
      <h2 style="font-size: clamp(22px, 1.8vw, 28px); color: var(--color-ink); margin-bottom: 14px;">Higher Education &amp; Research Alliances</h2>
      <p style="font-size: 15px; color: var(--color-ink-muted); line-height: 1.65; margin-bottom: 20px;">
        Strong ties with university fire engineering faculties form the backbone of our technical mission:
      </p>
      <div style="display: flex; flex-direction: column; gap: 14px; font-size: 15px; color: var(--color-ink-muted);">
        <p>
          &bull; <strong>The University of Queensland (UQ) Fire Safety Engineering:</strong> Supporting student engagement, research seminars, and the UQ SFPE Student Chapter.
        </p>
        <p>
          &bull; <strong>RMIT University:</strong> Collaboration with faculty researchers exploring timber fire dynamics and testing methodologies.
        </p>
        <p>
          &bull; <strong>SFPE Foundation:</strong> Channeling global research grants and academic awards to Australian students and practitioners.
        </p>
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
`;

writeThemeFile("page-about.php", pageAboutPhp);

// -------------------------------------------------------------
// 6. PAGE-WEBINARS.PHP (Technical Pipeline & EA CPD Guidance)
// -------------------------------------------------------------
const pageWebinarsPhp = `<?php
/**
 * Template Name: Webinars Page
 */
get_header(); ?>

<section class="section" style="padding-top: clamp(48px, 5vw, 72px); background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <span class="section-tag">Technical Education &amp; CPD</span>
    <h1 class="section-title" style="margin-bottom: 16px;">Webinar Program &amp; Technical Pipeline</h1>
    <p class="section-desc" style="max-width: 840px; margin-bottom: 28px;">
      Targeting 6 high-caliber technical seminars over the next 12 months. Our format pairs leading international researchers with Australian discussants to translate global fire protection engineering science into local National Construction Code (NCC/BCA) practice.
    </p>

    <div style="background-color: var(--color-surface-alt); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 22px 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 18px;">
      <div>
        <strong style="color: var(--color-ink); display: block; font-size: 16px;">Continuing Professional Development (CPD)</strong>
        <span style="font-size: 14.5px; color: var(--color-ink-muted);">Webinar attendance qualifies directly for self-reported CPD hours with Engineers Australia (EA) under Type II: Technical Presentations and Seminars.</span>
      </div>
      <a href="#register-interest" class="btn btn-primary" style="font-size: 14px; padding: 10px 20px;">Register for Session Alerts</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 36px; flex-wrap: wrap; gap: 12px;">
      <div>
        <h2 style="font-size: clamp(24px, 2vw, 30px); color: var(--color-ink);">Confirmed 12-Month Pipeline</h2>
        <p style="font-size: 15.5px; color: var(--color-ink-muted);">Curated by the Technical Program Working Group (Dan Rathnayaka, Chair).</p>
      </div>
      <span style="font-size: 14px; color: var(--color-ink-subtle); font-weight: 600;">6 Sessions in Development</span>
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
              <a href="<?php the_permalink(); ?>" class="btn btn-outline-dark" style="font-size: 13px; padding: 7px 14px;">View Details</a>
            </div>
          </div>
        <?php endwhile; wp_reset_postdata(); ?>
      <?php else : ?>
        <p>Webinars pipeline is being populated by the technical committee.</p>
      <?php endif; ?>
    </div>

    <!-- The Discussant Model Explanation -->
    <div style="margin-top: clamp(48px, 5vw, 72px); background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: clamp(28px, 3.2vw, 44px); box-shadow: var(--shadow-sm);">
      <h3 style="font-size: clamp(22px, 1.8vw, 28px); color: var(--color-ink); margin-bottom: 14px;">The Discussant Model Explained</h3>
      <p style="font-size: 15.5px; color: var(--color-ink-muted); line-height: 1.65; margin-bottom: 18px;">
        Unlike webinars that simply present overseas research, every SFPE Australia technical session follows a structured dual-speaker format:
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
        <div style="background-color: var(--color-surface-alt); padding: 20px; border-radius: var(--radius-md);">
          <strong style="color: var(--color-blue); display: block; font-size: 16px; margin-bottom: 6px;">1. International Presenter</strong>
          <p style="font-size: 14px; color: var(--color-ink-muted); line-height: 1.6;">
            A leading academic, handbook author, or technical committee chair presents original research, experimental data, and testing findings.
          </p>
        </div>
        <div style="background-color: var(--color-surface-alt); padding: 20px; border-radius: var(--radius-md);">
          <strong style="color: var(--color-crimson); display: block; font-size: 16px; margin-bottom: 6px;">2. Australian Discussant</strong>
          <p style="font-size: 14px; color: var(--color-ink-muted); line-height: 1.6;">
            An experienced Australian consulting engineer evaluates practical applications, National Construction Code (NCC/BCA) performance implications, and fire brigade operational considerations.
          </p>
        </div>
      </div>
    </div>

    <!-- Alert Registration Form -->
    <div id="register-interest" style="margin-top: clamp(48px, 5vw, 72px); scroll-margin-top: 100px;">
      <div class="form-card">
        <h3 style="font-size: clamp(22px, 1.8vw, 26px); color: var(--color-ink); margin-bottom: 8px; text-align: center;">Register for Webinar Notifications</h3>
        <p style="font-size: 15px; color: var(--color-ink-muted); text-align: center; margin-bottom: 26px;">
          Receive direct calendar invites and registration links as each session date is announced.
        </p>

        <form method="POST" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
          <?php wp_nonce_field('sfpe_contact_action', 'sfpe_contact_nonce'); ?>
          <input type="hidden" name="interest_area" value="Webinar Notifications">

          <div class="form-group">
            <label class="form-label" for="webinar_name">Full Name *</label>
            <input type="text" id="webinar_name" name="full_name" class="form-input" required placeholder="Alex Glennon">
          </div>

          <div class="form-group">
            <label class="form-label" for="webinar_email">Email Address *</label>
            <input type="email" id="webinar_email" name="email" class="form-input" required placeholder="alex@example.com.au">
          </div>

          <div class="form-group">
            <label class="form-label" for="webinar_org">Organization / Practice</label>
            <input type="text" id="webinar_org" name="organization" class="form-input" placeholder="Fire Consultancy, Authority, or University">
          </div>

          <div class="form-group">
            <label class="form-label" for="message">Topics of Specific Interest (Optional)</label>
            <textarea id="message" name="message" class="form-textarea" placeholder="Let us know if you are interested in a particular session (e.g. Dangerous Goods, SFPE Handbook chapters, Data Centers, Timber) or have an international speaker suggestion..."></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 15px;">
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
// 7. PAGE-WORKING-GROUPS.PHP (Accurate Charters & Roles)
// -------------------------------------------------------------
const pageWorkingGroupsPhp = `<?php
/**
 * Template Name: Working Groups Page
 */
get_header(); ?>

<section class="section" style="padding-top: clamp(48px, 5vw, 72px); background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <span class="section-tag">Governance &amp; Committees</span>
    <h1 class="section-title" style="margin-bottom: 16px;">Working Groups &amp; Committees</h1>
    <p class="section-desc" style="max-width: 840px;">
      SFPE Australia is organized into four dedicated working groups supporting technical innovation, cross-body alliances, digital reach, and chapter governance.
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
    <div style="text-align: center; margin-top: clamp(40px, 4.5vw, 64px);">
      <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn btn-primary" style="padding: 14px 32px; font-size: 16px;">
        Volunteer with a Working Group &rarr;
      </a>
    </div>
  </div>
</section>

<?php get_footer(); ?>
`;

writeThemeFile("page-working-groups.php", pageWorkingGroupsPhp);

// -------------------------------------------------------------
// 8. PAGE-CPD-HUB.PHP (Accurate Professional Bodies & CPD)
// -------------------------------------------------------------
const pageCpdHubPhp = `<?php
/**
 * Template Name: CPD Hub Page
 */
get_header(); ?>

<section class="section" style="padding-top: clamp(48px, 5vw, 72px); background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <span class="section-tag">Continuing Professional Development</span>
    <h1 class="section-title" style="margin-bottom: 16px;">Central CPD &amp; Calendar Hub</h1>
    <p class="section-desc" style="max-width: 840px;">
      A centralized repository connecting fire safety and protection engineers in Australia to accredited CPD calendars across domestic partners, dangerous goods associations, and international research institutions.
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
          Joint technical society under Engineers Australia. Regional technical presentations, state chapter seminars, and national fire safety conferences.
        </p>
        <a href="https://www.engineersaustralia.org.au/communities/technical-societies/society-fire-safety" target="_blank" rel="noopener" class="resource-link">
          Visit SFS Calendar &rarr;
        </a>
      </div>

      <!-- AIDGC -->
      <div class="resource-card">
        <div class="resource-icon">&#9888;</div>
        <h3 class="resource-title">AIDGC (Dangerous Goods)</h3>
        <p class="resource-desc">
          Australasian Institute of Dangerous Goods Consultants. Features specialist seminars on flammable liquids, gas storages, chemical warehouses, and hazardous areas.
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
          IFE Australia Branch provides regular technical lectures, exams, and professional development bridging operational fire service personnel and engineering practitioners.
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
          Worldwide fire protection engineering live webinars, symposia, standard committees, and the SFPE Foundation research repository.
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
          Scientific webinars from the UL Fire Safety Research Institute and NFPA Research Foundation covering fire dynamics, battery energy storage systems (BESS), and material flammability.
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
          CPD management portal for Chartered Professional Engineer (CPEng) and National Engineering Register (NER) compliance. SFPE Australia webinars qualify directly under technical professional development.
        </p>
        <a href="https://www.engineersaustralia.org.au/training-and-events" target="_blank" rel="noopener" class="resource-link">
          EA CPD Management Portal &rarr;
        </a>
      </div>
    </div>

    <!-- Self-Reporting Guide -->
    <div style="margin-top: clamp(48px, 5vw, 72px); background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: clamp(28px, 3.2vw, 44px); box-shadow: var(--shadow-sm);">
      <h2 style="font-size: clamp(22px, 1.8vw, 28px); color: var(--color-ink); margin-bottom: 14px;">Engineers Australia CPD Self-Reporting Guidance</h2>
      <p style="font-size: 15.5px; color: var(--color-ink-muted); line-height: 1.65; margin-bottom: 22px;">
        SFPE Australia technical seminars qualify directly toward your 150-hour Engineers Australia CPD requirement over three years.
      </p>
      <div style="background-color: var(--color-surface-alt); border-radius: var(--radius-md); padding: clamp(18px, 2vw, 24px); font-size: 15px; color: var(--color-ink);">
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
// 9. PAGE-CONTACT.PHP (Accurate Interest Options)
// -------------------------------------------------------------
const pageContactPhp = `<?php
/**
 * Template Name: Contact & Get Involved Page
 */
get_header(); ?>

<section class="section" style="padding-top: clamp(48px, 5vw, 72px); background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container-narrow" style="text-align: center;">
    <span class="section-tag">Participation &amp; Community</span>
    <h1 class="section-title" style="margin-bottom: 16px;">Get Involved with SFPE Australia</h1>
    <p class="section-desc" style="margin: 0 auto;">
      Whether you want to volunteer for a working group, suggest an international webinar presenter, or access SFPE Handbook resources, we welcome your involvement.
    </p>
  </div>
</section>

<section class="section">
  <div class="container-narrow">
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
          <input type="text" id="organization" name="organization" class="form-input" placeholder="Fire Consultancy, Authority, or Academic Body">
        </div>

        <div class="form-group">
          <label class="form-label" for="interest_area">How would you like to get involved? *</label>
          <select id="interest_area" name="interest_area" class="form-select">
            <option value="Join Working Group: Technical Program">Join Working Group: Technical Program</option>
            <option value="Join Working Group: Partnerships & Events">Join Working Group: Partnerships &amp; Events</option>
            <option value="Join Working Group: Digital & Membership">Join Working Group: Digital &amp; Membership</option>
            <option value="Join Working Group: Sponsorship & Development">Join Working Group: Sponsorship &amp; Development</option>
            <option value="Propose an International Presenter or Topic">Propose an International Presenter or Topic</option>
            <option value="SFPE Handbook Discount & Member Access">SFPE Handbook Discount &amp; Member Access</option>
            <option value="General Chapter Inquiry">General Chapter Inquiry</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="message">Message *</label>
          <textarea id="message" name="message" class="form-textarea" required placeholder="Tell us how you would like to participate or what you need assistance with..."></textarea>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 16px;">
          Send Message to Committee
        </button>
      </form>

      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--color-border); text-align: center; font-size: 13.5px; color: var(--color-ink-muted);">
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
  <div class="container-narrow">
    <?php while (have_posts()) : the_post(); 
      $session = get_post_meta(get_the_ID(), '_webinar_session_number', true) ?: 'Upcoming Session';
      $partner = get_post_meta(get_the_ID(), '_webinar_partner', true) ?: 'SFPE Alliance';
      $speaker = get_post_meta(get_the_ID(), '_webinar_speaker', true) ?: 'International Presenter';
      $discussant = get_post_meta(get_the_ID(), '_webinar_discussant', true) ?: 'Australian Discussant';
      $status = get_post_meta(get_the_ID(), '_webinar_status', true) ?: 'In Pipeline';
    ?>
      <div style="margin-bottom: 24px;">
        <a href="<?php echo esc_url(home_url('/webinars/')); ?>" style="color: var(--color-blue); font-size: 14px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
          &larr; Back to Webinar Pipeline
        </a>
      </div>

      <div style="background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: clamp(28px, 3.5vw, 44px); box-shadow: var(--shadow-sm); margin-bottom: 32px;">
        <div style="display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap;">
          <span class="webinar-session-badge"><?php echo esc_html($session); ?></span>
          <span class="webinar-partner-pill"><?php echo esc_html($partner); ?></span>
        </div>

        <h1 class="section-title" style="margin-bottom: 20px;"><?php the_title(); ?></h1>

        <div style="background-color: var(--color-surface-alt); border-radius: var(--radius-md); padding: 18px 20px; margin-bottom: 26px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; font-size: 14px;">
            <div>
              <span style="color: var(--color-ink-subtle); display: block; font-size: 12px; text-transform: uppercase;">International Presenter:</span>
              <strong style="color: var(--color-ink); font-size: 15px;"><?php echo esc_html($speaker); ?></strong>
            </div>
            <div>
              <span style="color: var(--color-ink-subtle); display: block; font-size: 12px; text-transform: uppercase;">Australian Discussant:</span>
              <strong style="color: var(--color-ink); font-size: 15px;"><?php echo esc_html($discussant); ?></strong>
            </div>
            <div>
              <span style="color: var(--color-ink-subtle); display: block; font-size: 12px; text-transform: uppercase;">Status:</span>
              <span class="webinar-status" style="margin-top: 2px;"><?php echo esc_html($status); ?></span>
            </div>
          </div>
        </div>

        <div style="font-size: 16px; line-height: 1.7; color: var(--color-ink-muted);">
          <?php the_content(); ?>
        </div>
      </div>
    <?php endwhile; ?>
  </div>
</main>
<?php get_footer(); ?>
`;

writeThemeFile("single-webinar.php", singleWebinarPhp);

// -------------------------------------------------------------
// 11. BUMP FUNCTIONS.PHP STYLESHEET VERSION TO 5.0.0
// -------------------------------------------------------------
const bumpCode = `
  $theme_dir = get_theme_root() . '/sfpe-theme';
  $fn = file_get_contents($theme_dir . '/functions.php');
  $fn = preg_replace("/('sfpe-style',\\s*get_stylesheet_uri\\(\\),\\s*array\\([^)]*\\),\\s*)'[^']+'/", "\\$1'5.0.0'", $fn);
  file_put_contents($theme_dir . '/functions.php', $fn);
  return str_contains($fn, "'5.0.0'");
`;
runPhp(bumpCode, "Bump stylesheet cache version to 5.0.0 in functions.php");

console.log("All SFPE Australia v5 theme files written successfully!");
