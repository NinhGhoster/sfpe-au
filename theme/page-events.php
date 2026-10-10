<?php
/**
 * Template Name: Events Page
 */
get_header(); ?>

<section class="section" style="padding-top: clamp(20px, 2.2vw, 32px); padding-bottom: clamp(16px, 1.8vw, 24px); background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <span class="section-tag">Chapter Calendar &amp; Technical Programs</span>
    <h1 class="section-title" style="margin-bottom: 12px;">Chapter Events &amp; Technical Pipeline</h1>
    <p class="section-desc" style="max-width: 860px; margin-bottom: 20px;">
      Official events calendar for the Australian Chapter of the Society of Fire Protection Engineers. Explore our upcoming seminar pipeline, joint society sessions with SFS and AIDGC, and trans-Tasman technical forums.
    </p>

    <div class="cpd-banner">
      <div class="cpd-banner-content">
        <strong style="color: var(--color-ink); display: block; font-size: 16px;">Continuing Professional Development (CPD)</strong>
        <span style="font-size: 14.5px; color: var(--color-ink-muted);">All SFPE Australia technical sessions qualify for self-reported CPD hours with Engineers Australia (EA) under Type II: Presentations and Seminars.</span>
      </div>
      <a href="#pipeline-schedule" class="btn btn-primary" style="font-size: 14px; padding: 10px 20px;">View 12-Month Pipeline</a>
    </div>
  </div>
</section>

<!-- Interactive Calendar Section -->
<section class="section" style="padding-bottom: clamp(20px, 2.2vw, 30px);">
  <div class="container">
    <div class="calendar-actions-bar">
      <div>
        <h2 style="font-size: clamp(20px, 1.6vw, 24px); color: var(--color-ink); margin-bottom: 4px;">Official Chapter Calendar</h2>
        <span style="font-size: 13.5px; color: var(--color-ink-subtle);">Times shown in Australian Eastern Time (AEST/AEDT, Melbourne).</span>
      </div>
      <div class="calendar-actions-group">
        <!-- Multi-Calendar Dropdown -->
        <div class="calendar-dropdown-wrap" id="calDropdownWrap">
          <button type="button" class="calendar-dropdown-btn" id="calDropdownBtn" aria-haspopup="true" aria-expanded="false">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Add to Calendar
            <span class="calendar-dropdown-chevron">&#9662;</span>
          </button>
          <div class="calendar-dropdown-menu" id="calDropdownMenu" role="menu">
            <a href="https://calendar.google.com/calendar/render?cid=dcc7f5705aadfb7ee6005d2bece1f873f5320485858565a7ff263c1c45d2ef33%40group.calendar.google.com" target="_blank" rel="noopener" class="calendar-dropdown-item" role="menuitem">
              <span class="calendar-dropdown-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </span>
              <span class="calendar-dropdown-details">
                <span class="calendar-dropdown-title">Google Calendar</span>
                <span class="calendar-dropdown-desc">Web, Android &amp; Google Workspace</span>
              </span>
            </a>
            <a href="webcal://calendar.google.com/calendar/ical/dcc7f5705aadfb7ee6005d2bece1f873f5320485858565a7ff263c1c45d2ef33%40group.calendar.google.com/public/basic.ics" class="calendar-dropdown-item" role="menuitem">
              <span class="calendar-dropdown-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0F172A"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.71-.93 2.73 1.01.08 2.02-.48 2.64-1.23z"/></svg>
              </span>
              <span class="calendar-dropdown-details">
                <span class="calendar-dropdown-title">Apple Calendar</span>
                <span class="calendar-dropdown-desc">Mac, iPhone &amp; iPad auto-sync</span>
              </span>
            </a>
            <a href="https://outlook.office.com/calendar/0/addcalendar?url=https%3A%2F%2Fcalendar.google.com%2Fcalendar%2Fical%2Fdcc7f5705aadfb7ee6005d2bece1f873f5320485858565a7ff263c1c45d2ef33%40group.calendar.google.com%2Fpublic%2Fbasic.ics&name=SFPE%20Australia%20Events" target="_blank" rel="noopener" class="calendar-dropdown-item" role="menuitem">
              <span class="calendar-dropdown-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="9" height="9" fill="#F25022"/><rect x="13" y="2" width="9" height="9" fill="#7FBA00"/><rect x="2" y="13" width="9" height="9" fill="#00A4EF"/><rect x="13" y="13" width="9" height="9" fill="#FFB900"/></svg>
              </span>
              <span class="calendar-dropdown-details">
                <span class="calendar-dropdown-title">Outlook 365 (Web)</span>
                <span class="calendar-dropdown-desc">Corporate &amp; university accounts</span>
              </span>
            </a>
            <a href="https://outlook.live.com/calendar/0/addcalendar?url=https%3A%2F%2Fcalendar.google.com%2Fcalendar%2Fical%2Fdcc7f5705aadfb7ee6005d2bece1f873f5320485858565a7ff263c1c45d2ef33%40group.calendar.google.com%2Fpublic%2Fbasic.ics&name=SFPE%20Australia%20Events" target="_blank" rel="noopener" class="calendar-dropdown-item" role="menuitem">
              <span class="calendar-dropdown-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="9" height="9" fill="#F25022"/><rect x="13" y="2" width="9" height="9" fill="#7FBA00"/><rect x="2" y="13" width="9" height="9" fill="#00A4EF"/><rect x="13" y="13" width="9" height="9" fill="#FFB900"/></svg>
              </span>
              <span class="calendar-dropdown-details">
                <span class="calendar-dropdown-title">Outlook.com (Personal)</span>
                <span class="calendar-dropdown-desc">Personal Microsoft &amp; Live accounts</span>
              </span>
            </a>
            <div class="calendar-dropdown-divider"></div>
            <a href="https://calendar.google.com/calendar/ical/dcc7f5705aadfb7ee6005d2bece1f873f5320485858565a7ff263c1c45d2ef33%40group.calendar.google.com/public/basic.ics" class="calendar-dropdown-item" role="menuitem">
              <span class="calendar-dropdown-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B45309" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </span>
              <span class="calendar-dropdown-details">
                <span class="calendar-dropdown-title">iCalendar File (.ics)</span>
                <span class="calendar-dropdown-desc">Universal file for any calendar client</span>
              </span>
            </a>
            <button type="button" class="calendar-dropdown-item calendar-dropdown-copy-btn" id="copyFeedBtn" data-feed-url="https://calendar.google.com/calendar/ical/dcc7f5705aadfb7ee6005d2bece1f873f5320485858565a7ff263c1c45d2ef33%40group.calendar.google.com/public/basic.ics" role="menuitem">
              <span class="calendar-dropdown-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0072BB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </span>
              <span class="calendar-dropdown-details">
                <span class="calendar-dropdown-title">Copy Feed URL</span>
                <span class="calendar-dropdown-desc">Copy iCal subscription URL</span>
              </span>
            </button>
          </div>
        </div>

        <a href="https://calendar.google.com/calendar/embed?src=dcc7f5705aadfb7ee6005d2bece1f873f5320485858565a7ff263c1c45d2ef33%40group.calendar.google.com&ctz=Australia%2FMelbourne" target="_blank" rel="noopener" class="calendar-btn calendar-btn-secondary" title="Open Calendar in Full Window">
          &#8599; Open Web View
        </a>
      </div>
    </div>

    <div class="calendar-embed-container">
      <iframe src="https://calendar.google.com/calendar/embed?src=dcc7f5705aadfb7ee6005d2bece1f873f5320485858565a7ff263c1c45d2ef33%40group.calendar.google.com&ctz=Australia%2FMelbourne" style="border: 0" width="100%" height="600" frameborder="0" scrolling="no"></iframe>
    </div>
  </div>
</section>

<!-- Confirmed Pipeline Sessions -->
<section class="section section-alt" id="pipeline-schedule" style="border-top: 1px solid var(--color-border);">
  <div class="container">
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 36px; flex-wrap: wrap; gap: 12px;">
      <div>
        <span class="section-tag">Technical Curriculum</span>
        <h2 style="font-size: clamp(24px, 2vw, 30px); color: var(--color-ink);">Confirmed 12-Month Webinar Pipeline</h2>
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
    <div class="content-card" style="margin-top: clamp(48px, 5vw, 72px);">
      <h3 style="font-size: clamp(22px, 1.8vw, 28px); color: var(--color-ink); margin-bottom: 14px;">The Discussant Model Explained</h3>
      <p style="font-size: 15.5px; color: var(--color-ink-muted); line-height: 1.65; margin-bottom: 18px;">
        Unlike standard webinars that simply stream international content, each SFPE Australia session employs a structured dual-speaker format:
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 20px;">
        <div style="background-color: var(--color-surface-alt); padding: 20px; border-radius: var(--radius-md);">
          <strong style="color: var(--color-blue); display: block; font-size: 16px; margin-bottom: 6px;">1. International Presenter</strong>
          <p style="font-size: 14px; color: var(--color-ink-muted); line-height: 1.6;">
            A world-leading researcher, SFPE Handbook author, or technical specialist presents original testing findings, engineering formulas, or regulatory updates.
          </p>
        </div>
        <div style="background-color: var(--color-surface-alt); padding: 20px; border-radius: var(--radius-md);">
          <strong style="color: var(--color-crimson); display: block; font-size: 16px; margin-bottom: 6px;">2. Australian Discussant</strong>
          <p style="font-size: 14px; color: var(--color-ink-muted); line-height: 1.6;">
            A senior local practitioner or academic critically translates the presentation into the National Construction Code (NCC/BCA) performance framework and Australian Standards.
          </p>
        </div>
      </div>
    </div>

    <!-- Register Interest CTA -->
    <div id="register-interest" style="margin-top: 40px; background-color: var(--color-navy); color: #FFFFFF; border-radius: var(--radius-lg); padding: clamp(32px, 4vw, 48px); text-align: center;">
      <h3 style="font-size: clamp(22px, 2vw, 28px); color: #FFFFFF; margin-bottom: 12px;">Get Notified of Upcoming Technical Sessions</h3>
      <p style="font-size: 16px; color: #CBD5E1; max-width: 600px; margin: 0 auto 24px; line-height: 1.6;">
        Submit your details through our contact form to receive session registration invitations, abstract notes, and CPD self-reporting guidance.
      </p>
      <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn btn-secondary" style="font-size: 15px; padding: 12px 28px;">
        Register Interest via Contact &rarr;
      </a>
    </div>
  </div>
</section>

<!-- Toast Notification for Copy Feedback -->
<div id="calCopyToast" class="cal-copy-toast" role="status" aria-live="polite">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
  Calendar feed URL copied to clipboard!
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  var dropdownWrap = document.getElementById('calDropdownWrap');
  var dropdownBtn = document.getElementById('calDropdownBtn');
  var copyBtn = document.getElementById('copyFeedBtn');
  var toast = document.getElementById('calCopyToast');

  if (dropdownBtn && dropdownWrap) {
    dropdownBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = dropdownWrap.classList.toggle('open');
      dropdownBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function(e) {
      if (!dropdownWrap.contains(e.target)) {
        dropdownWrap.classList.remove('open');
        dropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && dropdownWrap.classList.contains('open')) {
        dropdownWrap.classList.remove('open');
        dropdownBtn.setAttribute('aria-expanded', 'false');
        dropdownBtn.focus();
      }
    });
  }

  if (copyBtn && toast) {
    copyBtn.addEventListener('click', function() {
      var url = copyBtn.getAttribute('data-feed-url');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(showToast);
      } else {
        var tempInput = document.createElement('input');
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast();
      }
    });

    function showToast() {
      toast.classList.add('show');
      setTimeout(function() {
        toast.classList.remove('show');
      }, 3000);
    }
  }
});
</script>

<?php get_footer(); ?>
