<?php
/**
 * SFPE Australia Footer
 */
?>
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <img src="<?php echo esc_url(get_template_directory_uri() . '/images/sfpe-australia-logo.png'); ?>" alt="SFPE Australia Chapter Logo" class="footer-brand-logo" width="750" height="465">
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: 16px; font-weight: 800; color: #FFFFFF; line-height: 1.15;">SFPE Australia</span>
            <span class="brand-subtitle" style="font-size: 10.5px; color: #94A3B8; text-transform: uppercase; font-weight: 600;">Society of Fire Protection Engineers</span>
          </div>
        </div>
        <p style="font-size: 12.5px; line-height: 1.5; color: #94A3B8; margin-bottom: 10px;">
          The official Australian chapter of the Society of Fire Protection Engineers, connecting domestic performance-based engineering practice with international fire protection research, handbooks, and science.
        </p>
        <p style="font-size: 12.5px;">
          <a href="https://www.linkedin.com/company/sfpe-au/" target="_blank" rel="noopener" style="color: #60A5FA; display: inline-flex; align-items: center; gap: 6px;">
            Follow our activities on LinkedIn &rarr;
          </a>
        </p>
      </div>

      <div>
        <h4 class="footer-col-title">Navigation</h4>
        <ul class="footer-links">
          <li><a href="<?php echo esc_url(home_url('/about/')); ?>">About the Chapter</a></li>
          <li><a href="<?php echo esc_url(home_url('/events/')); ?>">Events &amp; Webinars</a></li>
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
          <li><a href="<?php echo esc_url(home_url('/events/')); ?>">Speaker Proposal</a></li>
          <li><a href="<?php echo esc_url(home_url('/contact/')); ?>">Handbook Discount Access</a></li>
          <li><a href="<?php echo esc_url(home_url('/contact/')); ?>">Contact Committee</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div>
        &copy; <?php echo date('Y'); ?> SFPE Australia Chapter. Affiliated with <a href="https://www.sfpe.org/" target="_blank" rel="noopener" style="color: #60A5FA; text-decoration: underline;">the Society of Fire Protection Engineers</a>.
      </div>
    </div>
  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
