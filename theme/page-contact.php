<?php
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
          Thank you for reaching out. Your message has been received by the SFPE Australia executive committee and we will respond to you shortly.
        </div>
      <?php endif; ?>

      <form method="POST" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
        <?php wp_nonce_field('sfpe_contact_action', 'sfpe_contact_nonce'); ?>

        <div class="form-group">
          <label class="form-label" for="full_name">Full Name *</label>
          <input type="text" id="full_name" name="full_name" class="form-input" required placeholder="Ninh Ghoster">
        </div>

        <div class="form-group">
          <label class="form-label" for="email">Email Address *</label>
          <input type="email" id="email" name="email" class="form-input" required placeholder="nguyen_h@univ-corse.fr">
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
        All enquiries are reviewed directly by the SFPE Australia executive committee and relevant working group chairs.
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
