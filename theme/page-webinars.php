<?php
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
