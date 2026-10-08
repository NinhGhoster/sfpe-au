<?php
get_header(); ?>
<main class="section">
  <div class="container">
    <h1><?php the_title(); ?></h1>
    <div style="margin-top: 24px;">
      <?php
      if (have_posts()) :
        while (have_posts()) : the_post();
          the_content();
        endwhile;
      endif;
      ?>
    </div>
  </div>
</main>
<?php get_footer(); ?>
