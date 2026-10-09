# SFPE Australia — Official Chapter Platform

[![Status: Active](https://img.shields.io/badge/Status-Active-success.svg)](#)
[![Theme: v5.1.0](https://img.shields.io/badge/Theme-v5.1.0-0072BB.svg)](#)
[![Website: Live](https://img.shields.io/badge/Website-sfpe.xo.je-0B132B.svg)](https://sfpe.xo.je/)

Official repository for **SFPE Australia**, the Australian Chapter of **The Society of Fire Protection Engineers (SFPE)**.

**Live Staging Site**: [https://sfpe.xo.je/](https://sfpe.xo.je/)

---

## Strategic Mission

> *"SFPE Australia is the window between Australian practice and international fire safety engineering research and practice."*

SFPE Australia bridges domestic fire safety engineering (under Australia's performance-based National Construction Code / BCA) with world-leading international fire protection engineering science, handbook revisions, and experimental testing data.

### Key Capabilities & Programs
- **Events & Google Calendar**: Interactive chapter calendar featuring 1-click Google Calendar addition and direct iCal synchronization alongside the 6-part annual technical webinar series.
- **The Discussant Model**: Every international seminar pairs global researchers and handbook authors with senior Australian discussants who contextualize global science for local compliance.
- **Higher Education & Research Alliances**: Official academic ties with The University of Queensland (UQ), RMIT University, and the SFPE Foundation.
- **Engineers Australia CPD**: Technical sessions align with Engineers Australia Type II & Type III Continuing Professional Development requirements.
- **4 Active Working Groups**: Technical Program, Partnerships & Alliances, Digital & Membership, and Sponsorship & Development.
- **Domestic & International Alliances**: Collaborative ties with the Society of Fire Safety (SFS), AIDGC, IFE Australia, SFPE New Zealand, and SFPE UK.

---

## Technology Stack

- **Platform**: WordPress (Custom Theme: `sfpe-theme` v5.1.0)
- **Styling**: Vanilla CSS3 with fluid typography (`clamp()`), CSS Custom Properties, and responsive grid layouts (1400px maximum container width).
- **Typography Stack**:
  - Headings: `Plus Jakarta Sans`
  - Body: `Public Sans`
- **Automation & CLI**: Node.js scripts powered by `@novamira/cli` for zero-FTP deployment, cache invalidation, and end-to-end verification.

---

## Repository Structure

```
SFPE/
├── AGENTS.md               # Definitive guidelines for AI coding assistants
├── README.md               # High-level overview & setup instructions
├── package.json            # NPM scripts for deployment, audit, and verification
├── .gitignore              # Version control ignore list
├── theme/                  # Standalone WordPress theme source files
│   ├── style.css           # Responsive styles with fluid typography (v5.1.0)
│   ├── functions.php       # Post types, enqueue scripts, custom meta
│   ├── header.php          # Header, brand mark, and mobile navigation
│   ├── footer.php          # Global footer and directory links
│   ├── front-page.php      # Main homepage template
│   ├── page-about.php      # About Us & leadership directory
│   ├── page-events.php     # Google Calendar embed & 6-session pipeline
│   ├── page-webinars.php   # Events alias for backward compatibility
│   ├── single-webinar.php  # Single webinar session detail template
│   ├── page-working-groups.php # 4 working groups with terms & mandates
│   ├── page-cpd-hub.php    # CPD guidance and partner resource hub
│   ├── page-contact.php    # Join and inquiry form
│   └── images/             # Theme assets and branding (logos, banner)
├── assets/                 # High-resolution branding and photography
├── scripts/                # Deployment and verification automation
│   ├── deploy.js           # Pushes theme/ to remote WordPress and purges cache
│   ├── purge-cache.js      # Flushes static page cache & object cache
│   ├── verify.js           # Tests all 6 live URLs for HTTP 200 and branding
│   ├── audit.js            # Lints theme files for design violations
│   └── seed-site.js        # Seeds database pages and webinar custom posts
├── docs/                   # Architecture notes and meeting records
│   ├── ARCHITECTURE.md     # Theme architecture and technical specifications
│   └── MINUTES.md          # Founding meeting minutes (08 Sept 2026)
└── archive/                # Historical deployment scripts
```

---

## Quick Start & Commands

### Prerequisites
- Node.js >= 18
- `@novamira/cli` installed globally (`npm install -g @novamira/cli`)

### Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run deploy` | Deploys all files from `theme/` to the remote WordPress instance and flushes the cache. |
| `npm run verify` | Tests all 6 public URLs, checking for HTTP 200, correct brand subtitles, and zero errors. |
| `npm run purge-cache` | Clears remote page cache (`page_enhanced`) and flushes WordPress object cache. |
| `npm run audit` | Lints theme files for design rules (zero em-dashes, no AI-purple, no Inter font, no filler copy). |
| `npm run seed` | Seeds database pages, sets permalinks, and inserts the 6 pipeline webinars. |

---

## Working Groups & Leadership

| Working Group | Chair | Mandate |
| :--- | :--- | :--- |
| **Technical Program** | **Dan Rathnayaka** | 6-part annual webinar pipeline, handbook updates, battery storage, and discussant pairings. |
| **Partnerships & Alliances** | **Michael Beecroft** | Inter-society liaison with SFS (Engineers Australia), AIDGC, IFE, SFPE NZ, and SFPE UK. |
| **Digital & Membership** | **Dr. Amer Magrabi** | Digital presence, knowledge dissemination, and member access to SFPE resources. |
| **Sponsorship & Development** | **Dr. Frank Mendham** | Sustainable chapter funding, research scholarships, and corporate sponsorship governance. |

---

## Contributing & Agent Guidelines

For coding guidelines, strict branding terminology rules, and design constraints, consult [AGENTS.md](AGENTS.md).
