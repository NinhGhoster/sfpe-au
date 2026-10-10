<?php
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
        <a href="<?php echo esc_url(home_url('/events/')); ?>" class="btn btn-primary">
          Explore Events &amp; Calendar
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
      <div class="stat-label">Events &amp; Webinars</div>
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
      <span class="section-tag">Chapter Calendar &amp; Programs</span>
      <h2 class="section-title">Upcoming Events &amp; Technical Programs</h2>
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
          <a href="<?php echo esc_url(home_url('/events/')); ?>" class="btn btn-outline-dark" style="font-size: 13px; padding: 7px 14px;">Details &rarr;</a>
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
          <a href="<?php echo esc_url(home_url('/events/')); ?>" class="btn btn-outline-dark" style="font-size: 13px; padding: 7px 14px;">Details &rarr;</a>
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
          <a href="<?php echo esc_url(home_url('/events/')); ?>" class="btn btn-outline-dark" style="font-size: 13px; padding: 7px 14px;">Details &rarr;</a>
        </div>
      </div>
    </div>

    <div style="text-align: center; margin-top: clamp(20px, 2.5vw, 32px);">
      <a href="<?php echo esc_url(home_url('/events/')); ?>" class="btn btn-primary">
        View Events Calendar &amp; Pipeline &rarr;
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
