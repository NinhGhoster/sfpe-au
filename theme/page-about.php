<?php
/**
 * Template Name: About Page
 */
get_header(); ?>

<section class="section" style="padding-top: clamp(20px, 2.2vw, 32px); padding-bottom: clamp(16px, 1.8vw, 24px); background-color: var(--color-surface); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <span class="section-tag">Institutional Profile</span>
    <h1 class="section-title" style="margin-bottom: 14px;">About SFPE Australia</h1>
    <p class="section-desc" style="font-size: clamp(17px, 1.2vw, 20px); line-height: 1.65; color: var(--color-ink-muted); max-width: 980px;">
      SFPE Australia is the official Australian Chapter of the Society of Fire Protection Engineers (SFPE): advancing the science and practice through international collaboration, academic research, and domestic partnership.
    </p>
  </div>
</section>

<section class="section">
  <div class="container">
    <!-- Mission & Charter -->
    <div class="content-card">
      <h2 style="font-size: clamp(22px, 1.8vw, 28px); color: var(--color-ink); margin-bottom: 16px;">Our Mission &amp; Approach</h2>
      <p style="font-size: 15.5px; color: var(--color-ink-muted); line-height: 1.7; margin-bottom: 24px;">
        As the local branch of the world leading professional society for fire protection engineering, SFPE Australia serves as a dedicated knowledge bridge:
      </p>
      
      <div style="display: flex; flex-direction: column; gap: 18px;">
        <div style="display: flex; gap: 14px; align-items: flex-start;">
          <span style="color: var(--color-crimson); font-weight: 800; font-size: 22px; line-height: 1; flex-shrink: 0; margin-top: 2px;">&bull;</span>
          <div>
            <strong style="color: var(--color-ink); display: block; font-size: 16.5px; margin-bottom: 4px;">Domestic in Partnership</strong>
            <span style="font-size: 14.5px; color: var(--color-ink-muted); line-height: 1.65;">
              Collaborating constructively alongside Australian bodies including the Society of Fire Safety (SFS), Engineers Australia, and AIDGC to deliver co-badged technical education.
            </span>
          </div>
        </div>
        
        <div style="display: flex; gap: 14px; align-items: flex-start;">
          <span style="color: var(--color-blue); font-weight: 800; font-size: 22px; line-height: 1; flex-shrink: 0; margin-top: 2px;">&bull;</span>
          <div>
            <strong style="color: var(--color-ink); display: block; font-size: 16.5px; margin-bottom: 4px;">International Knowledge Exchange</strong>
            <span style="font-size: 14.5px; color: var(--color-ink-muted); line-height: 1.65;">
              Connected directly to SFPE chapters worldwide, international research foundations (UL FSRI, NFPA FPRF), and SFPE Handbook contributing authors.
            </span>
          </div>
        </div>

        <div style="display: flex; gap: 14px; align-items: flex-start;">
          <span style="color: var(--color-success); font-weight: 800; font-size: 22px; line-height: 1; flex-shrink: 0; margin-top: 2px;">&bull;</span>
          <div>
            <strong style="color: var(--color-ink); display: block; font-size: 16.5px; margin-bottom: 4px;">The Discussant Model</strong>
            <span style="font-size: 14.5px; color: var(--color-ink-muted); line-height: 1.65;">
              Pairing world-leading international researchers with Australian fire engineering discussants to critically evaluate how global science applies under the National Construction Code (NCC/BCA).
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Chapter Executive & Committee Directory -->
    <div class="content-card">
      <h2 style="font-size: clamp(22px, 1.8vw, 28px); color: var(--color-ink); margin-bottom: 12px;">Executive Committee &amp; Leadership</h2>
      <p style="font-size: 15px; color: var(--color-ink-muted); line-height: 1.65; margin-bottom: 24px;">
        SFPE Australia is governed by an executive committee representing fire safety consultancies, research institutions, and certified practitioners:
      </p>

      <div class="exec-grid">
        <div class="exec-card">
          <div class="exec-headshot">
            <img src="<?php echo esc_url(get_template_directory_uri() . '/images/headshot-placeholder.svg'); ?>" alt="Dr Jonathan Barnett Headshot" class="headshot-photo" width="120" height="120">
          </div>
          <div class="exec-details">
            <div class="exec-header-text">
              <strong class="exec-name">Dr Jonathan Barnett</strong>
              <span class="exec-role">President / Chapter Chair &bull; Basic Expert</span>
            </div>
            <div class="exec-links">
              <a href="https://basic.expert/team/dr-jonathan-barnett/" target="_blank" rel="noopener" class="exec-link-item" title="Personal Profile">&#127760; Profile</a>
              <a href="mailto:jonathan.barnett@basic.expert" class="exec-link-item" title="Email">&#9993; Email</a>
              <a href="https://www.linkedin.com/in/jonathan-barnett-0470213/" target="_blank" rel="noopener" class="exec-link-item" title="LinkedIn">&#128279; LinkedIn</a>
            </div>
          </div>
        </div>

        <div class="exec-card">
          <div class="exec-headshot">
            <img src="<?php echo esc_url(get_template_directory_uri() . '/images/headshot-placeholder.svg'); ?>" alt="Dr Frank Mendham Headshot" class="headshot-photo" width="120" height="120">
          </div>
          <div class="exec-details">
            <div class="exec-header-text">
              <strong class="exec-name">Dr Frank Mendham</strong>
              <span class="exec-role">Vice President &bull; Mendham Consultants</span>
            </div>
            <div class="exec-links">
              <a href="https://mendhamconsult.com/about-us/" target="_blank" rel="noopener" class="exec-link-item" title="Personal Profile">&#127760; Profile</a>
              <a href="mailto:frank@mendhamconsult.com" class="exec-link-item" title="Email">&#9993; Email</a>
              <a href="https://www.linkedin.com/in/frank-mendham-phd-43940120/" target="_blank" rel="noopener" class="exec-link-item" title="LinkedIn">&#128279; LinkedIn</a>
            </div>
          </div>
        </div>

        <div class="exec-card">
          <div class="exec-headshot">
            <img src="<?php echo esc_url(get_template_directory_uri() . '/images/headshot-placeholder.svg'); ?>" alt="Dr Dan Rathnayaka Headshot" class="headshot-photo" width="120" height="120">
          </div>
          <div class="exec-details">
            <div class="exec-header-text">
              <strong class="exec-name">Dr Dan Rathnayaka</strong>
              <span class="exec-role">Technical Program Chair &bull; Arup</span>
            </div>
            <div class="exec-links">
              <a href="https://www.linkedin.com/in/dan-rathnayaka-2b22572a/" target="_blank" rel="noopener" class="exec-link-item" title="Personal Profile">&#127760; Profile</a>
              <a href="mailto:dan.rathnayaka@arup.com" class="exec-link-item" title="Email">&#9993; Email</a>
              <a href="https://www.linkedin.com/in/dan-rathnayaka-2b22572a/" target="_blank" rel="noopener" class="exec-link-item" title="LinkedIn">&#128279; LinkedIn</a>
            </div>
          </div>
        </div>

        <div class="exec-card">
          <div class="exec-headshot">
            <img src="<?php echo esc_url(get_template_directory_uri() . '/images/headshot-placeholder.svg'); ?>" alt="Michael Beecroft Headshot" class="headshot-photo" width="120" height="120">
          </div>
          <div class="exec-details">
            <div class="exec-header-text">
              <strong class="exec-name">Michael Beecroft</strong>
              <span class="exec-role">Partnerships &amp; Industry Liaison Chair</span>
            </div>
            <div class="exec-links">
              <a href="https://www.linkedin.com/in/michael-beecroft-7a288636/" target="_blank" rel="noopener" class="exec-link-item" title="Personal Profile">&#127760; Profile</a>
              <a href="mailto:michael.beecroft@bigpond.com" class="exec-link-item" title="Email">&#9993; Email</a>
              <a href="https://www.linkedin.com/in/michael-beecroft-7a288636/" target="_blank" rel="noopener" class="exec-link-item" title="LinkedIn">&#128279; LinkedIn</a>
            </div>
          </div>
        </div>

        <div class="exec-card">
          <div class="exec-headshot">
            <img src="<?php echo esc_url(get_template_directory_uri() . '/images/headshot-placeholder.svg'); ?>" alt="Dr Amer Magrabi Headshot" class="headshot-photo" width="120" height="120">
          </div>
          <div class="exec-details">
            <div class="exec-header-text">
              <strong class="exec-name">Dr Amer Magrabi</strong>
              <span class="exec-role">Digital &amp; Membership Chair &bull; Lote Consulting</span>
            </div>
            <div class="exec-links">
              <a href="https://loteconsulting.com/team/amer-magrabi/" target="_blank" rel="noopener" class="exec-link-item" title="Personal Profile">&#127760; Profile</a>
              <a href="mailto:amer@loteconsulting.com" class="exec-link-item" title="Email">&#9993; Email</a>
              <a href="https://www.linkedin.com/in/amermagrabi/" target="_blank" rel="noopener" class="exec-link-item" title="LinkedIn">&#128279; LinkedIn</a>
            </div>
          </div>
        </div>

        <div class="exec-card">
          <div class="exec-headshot">
            <img src="<?php echo esc_url(get_template_directory_uri() . '/images/headshot-placeholder.svg'); ?>" alt="Prof David Lange Headshot" class="headshot-photo" width="120" height="120">
          </div>
          <div class="exec-details">
            <div class="exec-header-text">
              <strong class="exec-name">Prof David Lange</strong>
              <span class="exec-role">Secretary &bull; The University of Queensland (UQ)</span>
            </div>
            <div class="exec-links">
              <a href="https://civil.uq.edu.au/profile/1725/david-lange" target="_blank" rel="noopener" class="exec-link-item" title="Academic Profile">&#127760; Profile</a>
              <a href="mailto:d.lange@uq.edu.au" class="exec-link-item" title="Email">&#9993; Email</a>
              <a href="https://www.linkedin.com/in/david-lange-38a49015/" target="_blank" rel="noopener" class="exec-link-item" title="LinkedIn">&#128279; LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      <div style="border-top: 1px solid var(--color-border); padding-top: 16px;">
        <span style="font-size: 15px; font-weight: 700; color: var(--color-ink); display: block; margin-bottom: 12px;">Contributing Committee Members:</span>
        <div class="contrib-grid">
          <div class="contrib-card">
            <div class="contrib-headshot">
              <img src="<?php echo esc_url(get_template_directory_uri() . '/images/headshot-placeholder.svg'); ?>" alt="Pelle Zetterstrom Headshot" class="headshot-photo" width="80" height="80">
            </div>
            <div class="contrib-details">
              <div class="contrib-header-text">
                <strong class="contrib-name">Pelle Zetterstrom</strong>
                <span class="contrib-org">Senior Fire Engineer &bull; KBR</span>
              </div>
              <div class="contrib-links">
                <a href="https://www.linkedin.com/in/pellezetterstrom/" target="_blank" rel="noopener" class="exec-link-item">&#127760; Profile</a>
                <a href="mailto:pelle.zetterstrom@kbr.com" class="exec-link-item">&#9993; Email</a>
              </div>
            </div>
          </div>

          <div class="contrib-card">
            <div class="contrib-headshot">
              <img src="<?php echo esc_url(get_template_directory_uri() . '/images/headshot-placeholder.svg'); ?>" alt="MC Hui Headshot" class="headshot-photo" width="80" height="80">
            </div>
            <div class="contrib-details">
              <div class="contrib-header-text">
                <strong class="contrib-name">MC Hui</strong>
                <span class="contrib-org">Technical Director &bull; RED Fire Engineers</span>
              </div>
              <div class="contrib-links">
                <a href="https://redfireengineers.com.au/team/" target="_blank" rel="noopener" class="exec-link-item">&#127760; Profile</a>
                <a href="mailto:mc@redfireengineers.com.au" class="exec-link-item">&#9993; Email</a>
                <a href="https://www.linkedin.com/in/mc-hui-a9217036/" target="_blank" rel="noopener" class="exec-link-item">&#128279; LinkedIn</a>
              </div>
            </div>
          </div>

          <div class="contrib-card">
            <div class="contrib-headshot">
              <img src="<?php echo esc_url(get_template_directory_uri() . '/images/headshot-placeholder.svg'); ?>" alt="Aaron Nicholson Headshot" class="headshot-photo" width="80" height="80">
            </div>
            <div class="contrib-details">
              <div class="contrib-header-text">
                <strong class="contrib-name">Aaron Nicholson</strong>
                <span class="contrib-org">Director &bull; RED Fire Engineers</span>
              </div>
              <div class="contrib-links">
                <a href="https://www.linkedin.com/in/aaron-nicholson-red/" target="_blank" rel="noopener" class="exec-link-item">&#127760; Profile</a>
                <a href="mailto:aaron.nicholson@redfireengineers.com.au" class="exec-link-item">&#9993; Email</a>
              </div>
            </div>
          </div>

          <div class="contrib-card">
            <div class="contrib-headshot">
              <img src="<?php echo esc_url(get_template_directory_uri() . '/images/headshot-placeholder.svg'); ?>" alt="Tobias Salomonsson Headshot" class="headshot-photo" width="80" height="80">
            </div>
            <div class="contrib-details">
              <div class="contrib-header-text">
                <strong class="contrib-name">Tobias Salomonsson</strong>
                <span class="contrib-org">Senior Fire Engineer &bull; RED Fire Engineers</span>
              </div>
              <div class="contrib-links">
                <a href="https://www.linkedin.com/in/tobias-salomonsson/" target="_blank" rel="noopener" class="exec-link-item">&#127760; Profile</a>
                <a href="mailto:tobias@redfireengineers.com.au" class="exec-link-item">&#9993; Email</a>
              </div>
            </div>
          </div>

          <div class="contrib-card">
            <div class="contrib-headshot">
              <img src="<?php echo esc_url(get_template_directory_uri() . '/images/headshot-placeholder.svg'); ?>" alt="Simon P Krishnan Headshot" class="headshot-photo" width="80" height="80">
            </div>
            <div class="contrib-details">
              <div class="contrib-header-text">
                <strong class="contrib-name">Simon P Krishnan</strong>
                <span class="contrib-org">Director &bull; Astrix Fire Safety Certification</span>
              </div>
              <div class="contrib-links">
                <a href="https://www.linkedin.com/in/simon-krishnan/" target="_blank" rel="noopener" class="exec-link-item">&#127760; Profile</a>
                <a href="mailto:simonk@astrixfiresafetycertification.com" class="exec-link-item">&#9993; Email</a>
              </div>
            </div>
          </div>

          <div class="contrib-card">
            <div class="contrib-headshot">
              <img src="<?php echo esc_url(get_template_directory_uri() . '/images/headshot-placeholder.svg'); ?>" alt="Derya Horasan Headshot" class="headshot-photo" width="80" height="80">
            </div>
            <div class="contrib-details">
              <div class="contrib-header-text">
                <strong class="contrib-name">Derya Horasan</strong>
                <span class="contrib-org">Director &bull; SciFire</span>
              </div>
              <div class="contrib-links">
                <a href="https://www.linkedin.com/in/derya-horasan/" target="_blank" rel="noopener" class="exec-link-item">&#127760; Profile</a>
                <a href="mailto:derya.horasan@scifire.com.au" class="exec-link-item">&#9993; Email</a>
              </div>
            </div>
          </div>

          <div class="contrib-card">
            <div class="contrib-headshot">
              <img src="<?php echo esc_url(get_template_directory_uri() . '/images/headshot-placeholder.svg'); ?>" alt="Ninh Ghoster Headshot" class="headshot-photo" width="80" height="80">
            </div>
            <div class="contrib-details">
              <div class="contrib-header-text">
                <strong class="contrib-name">Ninh Ghoster</strong>
                <span class="contrib-org">Ph.D. Researcher &bull; Université de Corse (SPE Lab)</span>
              </div>
              <div class="contrib-links">
                <a href="https://spe.universita.corsica/" target="_blank" rel="noopener" class="exec-link-item">&#127760; Profile</a>
                <a href="mailto:nguyen_h@univ-corse.fr" class="exec-link-item">&#9993; Email</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Universities, Research Labs & Industry Partners (Motion Running Track) -->
    <div class="content-card" style="padding-left: 0; padding-right: 0; overflow: hidden;">
      <div style="padding: 0 24px 16px;">
        <h2 style="font-size: clamp(22px, 1.8vw, 28px); color: var(--color-ink); margin-bottom: 10px;">Higher Education &amp; Research Alliances</h2>
        <p style="font-size: 15px; color: var(--color-ink-muted); line-height: 1.65; max-width: 900px;">
          Strong partnerships with leading universities, international research laboratories, and chartered industry practices form the technical foundation of our mission. Hover over any institution to explore their research programs:
        </p>
      </div>

      <?php
      $alliance_cards = [
        [
          'title'    => 'The University of Queensland',
          'subtitle' => 'UQ Fire Safety Engineering',
          'desc'     => 'Supporting student engagement, advanced postgraduate fire engineering research, and the active UQ SFPE Student Chapter.',
          'url'      => 'https://civil.uq.edu.au/fire',
          'label'    => 'Visit UQ Fire Engineering',
          'logo'     => get_template_directory_uri() . '/images/uq-logo.svg',
          'logo_h'   => '58px'
        ],
        [
          'title'    => 'RMIT University',
          'subtitle' => 'School of Engineering',
          'desc'     => 'Collaborating on mass timber fire dynamics, structural response under severe fire conditions, and material combustibility testing.',
          'url'      => 'https://www.rmit.edu.au/',
          'label'    => 'Visit RMIT University',
          'logo'     => get_template_directory_uri() . '/images/rmit-logo.svg',
          'logo_h'   => '52px'
        ],
        [
          'title'    => 'SFPE Foundation',
          'subtitle' => 'Global Research & Education',
          'desc'     => 'Facilitating international fire safety research grants, academic symposiums, and global student research awards.',
          'url'      => 'https://www.sfpe.org/foundation/home',
          'label'    => 'Visit SFPE Foundation',
          'logo'     => get_template_directory_uri() . '/images/sfpe-foundation-logo.png',
          'logo_h'   => '48px'
        ],
        [
          'title'    => 'Université de Corse',
          'subtitle' => 'CNRS SPE UMR 6134 Fire Dynamics Lab',
          'desc'     => 'Leading experimental and numerical research into wildfire propagation, physical fire models, and ember transport mechanisms.',
          'url'      => 'https://spe.universita.corsica/',
          'label'    => 'Visit SPE Lab Corsica',
          'logo'     => get_template_directory_uri() . '/images/spe-corsica-logo.png',
          'logo_h'   => '52px'
        ],
        [
          'title'    => 'FLARE Wildfire Research',
          'subtitle' => 'Atmospheric & Landscape Fire',
          'desc'     => 'Advancing bushfire behavior models, environmental risk dynamics, and extreme fire event science across Australasia.',
          'url'      => 'https://www.flarewildfire.com/',
          'label'    => 'Visit FLARE Research',
          'logo'     => get_template_directory_uri() . '/images/flare-logo.svg',
          'logo_h'   => '44px'
        ],
        [
          'title'    => 'BASIC Expert',
          'subtitle' => 'Forensic & Structural Fire Engineering',
          'desc'     => 'Specialising in forensic fire investigations, combustible cladding risk assessment, and expert engineering testimony.',
          'url'      => 'https://basic.expert',
          'label'    => 'Visit Basic Expert',
          'logo'     => get_template_directory_uri() . '/images/basic-expert-logo.png',
          'logo_h'   => '40px'
        ],
        [
          'title'    => 'Mendham Consultants',
          'subtitle' => 'Industrial Fire & Dangerous Goods',
          'desc'     => 'Advising on hazardous materials, Battery Energy Storage Systems (BESS), process safety, and reliability engineering.',
          'url'      => 'https://mendhamconsult.com',
          'label'    => 'Visit Mendham Consultants',
          'logo'     => get_template_directory_uri() . '/images/mendham-logo.png',
          'logo_h'   => '42px'
        ],
        [
          'title'    => 'Arup',
          'subtitle' => 'Global Fire Safety Practice',
          'desc'     => 'Delivering innovative performance-based fire engineering, CFD smoke modelling, and structural fire protection designs.',
          'url'      => 'https://www.arup.com',
          'label'    => 'Visit Arup Fire Practice',
          'logo'     => get_template_directory_uri() . '/images/arup-logo.svg',
          'logo_h'   => '34px'
        ],
        [
          'title'    => 'Lote Consulting',
          'subtitle' => 'Integrated Fire & Risk Engineering',
          'desc'     => 'Providing performance-based engineering solutions, complex infrastructure reviews, and lithium-ion hazard mitigation.',
          'url'      => 'https://loteconsulting.com',
          'label'    => 'Visit Lote Consulting',
          'logo'     => get_template_directory_uri() . '/images/lote-logo.png',
          'logo_h'   => '38px'
        ],
        [
          'title'    => 'RED Fire Engineers',
          'subtitle' => 'Performance Fire Safety Consultancy',
          'desc'     => 'National consultancy specialising in BCA performance solutions, facade risk assessments, and fire resistance design.',
          'url'      => 'https://redfireengineers.com.au',
          'label'    => 'Visit RED Fire Engineers',
          'logo'     => get_template_directory_uri() . '/images/red-logo.png',
          'logo_h'   => '44px'
        ],
        [
          'title'    => 'KBR',
          'subtitle' => 'Infrastructure & Defence Engineering',
          'desc'     => 'Executing critical infrastructure fire protection, complex transport interchange safety, and multidisciplinary design.',
          'url'      => 'https://www.kbr.com',
          'label'    => 'Visit KBR',
          'logo'     => get_template_directory_uri() . '/images/kbr-logo.svg',
          'logo_h'   => '38px'
        ],
        [
          'title'    => 'Astrix Fire Safety Certification',
          'subtitle' => 'Building Compliance & Certifications',
          'desc'     => 'Expert independent certification for fire safety installations, performance solution verification, and NCC compliance.',
          'url'      => 'https://astrixfiresafetycertification.com',
          'label'    => 'Visit Astrix Certification',
          'logo'     => get_template_directory_uri() . '/images/astrix-logo.png',
          'logo_h'   => '32px'
        ],
      ];
      ?>

      <div class="alliance-marquee-wrap">
        <div class="alliance-marquee-track">
          <div class="alliance-marquee-group">
            <?php foreach ($alliance_cards as $card): ?>
              <a href="<?php echo esc_url($card['url']); ?>" target="_blank" rel="noopener" class="alliance-card">
                <div class="alliance-logo-wrap">
                  <img src="<?php echo esc_url($card['logo']); ?>" alt="<?php echo esc_attr($card['title']); ?> Logo" class="alliance-logo-img" style="max-height: <?php echo esc_attr($card['logo_h']); ?>;">
                </div>
                <h3 class="alliance-title"><?php echo esc_html($card['title']); ?></h3>
                <span class="alliance-subtitle"><?php echo esc_html($card['subtitle']); ?></span>
                <p class="alliance-desc"><?php echo esc_html($card['desc']); ?></p>
                <span class="alliance-link-label"><?php echo esc_html($card['label']); ?> &rarr;</span>
              </a>
            <?php endforeach; ?>
          </div>
          <div class="alliance-marquee-group" aria-hidden="true">
            <?php foreach ($alliance_cards as $card): ?>
              <a href="<?php echo esc_url($card['url']); ?>" target="_blank" rel="noopener" class="alliance-card" tabindex="-1">
                <div class="alliance-logo-wrap">
                  <img src="<?php echo esc_url($card['logo']); ?>" alt="<?php echo esc_attr($card['title']); ?> Logo" class="alliance-logo-img" style="max-height: <?php echo esc_attr($card['logo_h']); ?>;">
                </div>
                <h3 class="alliance-title"><?php echo esc_html($card['title']); ?></h3>
                <span class="alliance-subtitle"><?php echo esc_html($card['subtitle']); ?></span>
                <p class="alliance-desc"><?php echo esc_html($card['desc']); ?></p>
                <span class="alliance-link-label"><?php echo esc_html($card['label']); ?> &rarr;</span>
              </a>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
