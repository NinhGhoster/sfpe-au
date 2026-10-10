<?php
/**
 * Template Name: Working Groups Page
 */
get_header(); ?>

<section class="section" style="padding-top: clamp(20px, 2.2vw, 32px); padding-bottom: clamp(16px, 1.8vw, 24px); background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
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
            <span class="wg-name"><a href="mailto:dan.rathnayaka@arup.com" style="color: inherit; text-decoration: underline;">Dan Rathnayaka</a></span>
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
            <span class="wg-name"><a href="mailto:michael.beecroft@bigpond.com" style="color: inherit; text-decoration: underline;">Michael Beecroft</a></span>
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
            <span class="wg-name"><a href="mailto:amer@loteconsulting.com" style="color: inherit; text-decoration: underline;">Amer Magrabi</a></span>
          </div>
          <div class="wg-person">
            <span class="wg-role">Systems Lead:</span>
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
            <span class="wg-name"><a href="mailto:frank@mendhamconsult.com" style="color: inherit; text-decoration: underline;">Frank Mendham</a></span>
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
