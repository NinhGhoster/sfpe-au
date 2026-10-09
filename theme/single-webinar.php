<?php
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
        <a href="<?php echo esc_url(home_url('/events/')); ?>" style="color: var(--color-blue); font-size: 14px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
          &larr; Back to Events Calendar
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
