<?php
/**
 * Template Name: Events Page
 */
get_header(); ?>

<section class="section" style="padding-top: clamp(48px, 5vw, 72px); background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <span class="section-tag">Chapter Calendar &amp; Technical Programs</span>
    <h1 class="section-title" style="margin-bottom: 16px;">Chapter Events &amp; Technical Pipeline</h1>
    <p class="section-desc" style="max-width: 860px; margin-bottom: 28px;">
      Official events calendar for the Australian Chapter of the Society of Fire Protection Engineers. Explore our upcoming seminar pipeline, joint society sessions with SFS and AIDGC, and trans-Tasman technical forums.
    </p>

    <div style="background-color: var(--color-surface-alt); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 22px 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 18px;">
      <div>
        <strong style="color: var(--color-ink); display: block; font-size: 16px;">Continuing Professional Development (CPD)</strong>
        <span style="font-size: 14.5px; color: var(--color-ink-muted);">All SFPE Australia technical sessions qualify for self-reported CPD hours with Engineers Australia (EA) under Type II: Presentations and Seminars.</span>
      </div>
      <a href="#pipeline-schedule" class="btn btn-primary" style="font-size: 14px; padding: 10px 20px;">View 12-Month Pipeline</a>
    </div>
  </div>
</section>

<!-- Interactive Calendar Section -->
<section class="section" style="padding-bottom: clamp(32px, 3.5vw, 48px);">
  <div class="container">
    <div class="calendar-actions-bar">
      <div>
        <h2 style="font-size: clamp(20px, 1.6vw, 24px); color: var(--color-ink); margin-bottom: 4px;">Official Chapter Calendar</h2>
        <span style="font-size: 13.5px; color: var(--color-ink-subtle);">Times shown in Australian Eastern Time (AEST/AEDT, Melbourne).</span>
      </div>
      <div class="calendar-actions-group">
        <a href="https://calendar.google.com/calendar/render?cid=dcc7f5705aadfb7ee6005d2bece1f873f5320485858565a7ff263c1c45d2ef33%40group.calendar.google.com" target="_blank" rel="noopener" class="calendar-btn calendar-btn-primary" title="Add SFPE Australia Calendar to Google Calendar">
          &#43; Add to Google Calendar
        </a>
        <a href="https://calendar.google.com/calendar/ical/dcc7f5705aadfb7ee6005d2bece1f873f5320485858565a7ff263c1c45d2ef33%40group.calendar.google.com/public/basic.ics" class="calendar-btn calendar-btn-secondary" title="Download iCalendar file to sync with Outlook or Apple Calendar">
          &#128197; Subscribe via iCal (.ics)
        </a>
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
    <div style="margin-top: clamp(48px, 5vw, 72px); background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: clamp(28px, 3.2vw, 44px); box-shadow: var(--shadow-sm);">
      <h3 style="font-size: clamp(22px, 1.8vw, 28px); color: var(--color-ink); margin-bottom: 14px;">The Discussant Model Explained</h3>
      <p style="font-size: 15.5px; color: var(--color-ink-muted); line-height: 1.65; margin-bottom: 18px;">
        Unlike standard webinars that simply stream international content, each SFPE Australia session employs a structured dual-speaker format:
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
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

<?php get_footer(); ?>
