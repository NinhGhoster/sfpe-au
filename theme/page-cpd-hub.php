<?php
/**
 * Template Name: CPD Hub Page
 */
get_header(); ?>

<section class="section" style="padding-top: clamp(20px, 2.2vw, 32px); padding-bottom: clamp(16px, 1.8vw, 24px); background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
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
    <div class="content-card" style="margin-top: clamp(48px, 5vw, 72px);">
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
