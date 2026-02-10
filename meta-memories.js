// Meta Memories Photo Gallery - Injected after React app renders
(function() {
  'use strict';

  // Sample photos data - replace images and descriptions with your own
  var photos = [
    {
      src: '/memories/photo1.jpg',
      title: 'Team Celebration',
      year: '2024',
      description: 'Celebrating a major milestone with the incredible talent acquisition team. These moments of shared success are what make the journey worthwhile.'
    },
    {
      src: '/memories/photo2.jpg',
      title: 'Collaboration in Action',
      year: '2023',
      description: 'Cross-functional collaboration at its best — partnering with hiring managers and leadership to align on strategic talent priorities.'
    },
    {
      src: '/memories/photo3.jpg',
      title: 'Strategy Session',
      year: '2023',
      description: 'Leading a data-driven strategy session with the recruiting leadership team, mapping out the next quarter\'s talent acquisition roadmap.'
    },
    {
      src: '/memories/photo4.jpg',
      title: 'Team Building Day',
      year: '2022',
      description: 'Building bonds beyond the office — a team building event that strengthened our collaboration and brought out everyone\'s creative side.'
    },
    {
      src: '/memories/photo5.jpg',
      title: 'Knowledge Sharing',
      year: '2022',
      description: 'Sharing recruiting best practices and innovative sourcing techniques during one of our regular knowledge transfer sessions.'
    },
    {
      src: '/memories/photo6.jpg',
      title: 'Growing Together',
      year: '2021',
      description: 'Mentoring and developing the next generation of recruiting professionals — investing in people is always the best strategy.'
    }
  ];

  function injectStyles() {
    var style = document.createElement('style');
    style.textContent = [
      '#meta-memories { padding: 6rem 0; background: linear-gradient(180deg, rgba(255,248,240,0.5) 0%, rgba(255,255,255,1) 50%, rgba(255,248,240,0.5) 100%); }',
      '#meta-memories .mm-container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }',
      '#meta-memories .mm-label { display: block; text-align: center; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #c0392b; margin-bottom: 1rem; font-family: "Source Sans 3", sans-serif; }',
      '#meta-memories .mm-title { text-align: center; font-size: clamp(1.875rem, 4vw, 3rem); font-weight: 700; margin-bottom: 1rem; font-family: "Libre Baskerville", serif; color: #34322D; }',
      '#meta-memories .mm-title span { background: linear-gradient(135deg, #c0392b, #e67e22, #f39c12); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }',
      '#meta-memories .mm-subtitle { text-align: center; font-size: 1.125rem; color: rgba(52,50,45,0.7); max-width: 42rem; margin: 0 auto 1.5rem; font-family: "Source Sans 3", sans-serif; }',
      '#meta-memories .mm-line { width: 6rem; height: 3px; margin: 0 auto 3rem; background: linear-gradient(90deg, #c0392b, #e67e22, #f39c12); border-radius: 2px; }',
      '#meta-memories .mm-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }',
      '@media (max-width: 1023px) { #meta-memories .mm-grid { grid-template-columns: repeat(2, 1fr); } }',
      '@media (max-width: 639px) { #meta-memories .mm-grid { grid-template-columns: 1fr; } }',
      '#meta-memories .mm-card { background: white; border-radius: 1rem; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04); transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer; }',
      '#meta-memories .mm-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.12); }',
      '#meta-memories .mm-card-img { position: relative; width: 100%; padding-top: 66.67%; overflow: hidden; }',
      '#meta-memories .mm-card-img img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }',
      '#meta-memories .mm-card:hover .mm-card-img img { transform: scale(1.05); }',
      '#meta-memories .mm-card-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }',
      '#meta-memories .mm-card:hover .mm-card-overlay { opacity: 1; }',
      '#meta-memories .mm-card-overlay span { color: white; font-size: 0.875rem; font-weight: 600; padding: 0.5rem 1.25rem; border: 2px solid white; border-radius: 2rem; font-family: "Source Sans 3", sans-serif; }',
      '#meta-memories .mm-card-body { padding: 1.25rem; }',
      '#meta-memories .mm-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }',
      '#meta-memories .mm-card-header h3 { font-size: 1.25rem; font-weight: 700; color: #34322D; font-family: "Libre Baskerville", serif; margin: 0; }',
      '#meta-memories .mm-card-header .mm-year { font-size: 0.75rem; font-weight: 600; color: rgba(52,50,45,0.5); padding: 0.25rem 0.75rem; background: rgba(52,50,45,0.05); border-radius: 1rem; font-family: "Source Sans 3", sans-serif; }',
      '#meta-memories .mm-card-body p { font-size: 0.875rem; color: rgba(52,50,45,0.7); line-height: 1.6; margin: 0; font-family: "Source Sans 3", sans-serif; }',
      /* Lightbox styles */
      '#mm-lightbox { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.9); display: none; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }',
      '#mm-lightbox.active { display: flex; opacity: 1; }',
      '#mm-lightbox .mm-lb-close { position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none; color: white; font-size: 2rem; cursor: pointer; width: 3rem; height: 3rem; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; z-index: 10; }',
      '#mm-lightbox .mm-lb-close:hover { background: rgba(255,255,255,0.15); }',
      '#mm-lightbox .mm-lb-nav { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.1); border: none; color: white; font-size: 1.5rem; cursor: pointer; width: 3rem; height: 3rem; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; z-index: 10; }',
      '#mm-lightbox .mm-lb-nav:hover { background: rgba(255,255,255,0.25); }',
      '#mm-lightbox .mm-lb-prev { left: 1.5rem; }',
      '#mm-lightbox .mm-lb-next { right: 1.5rem; }',
      '#mm-lightbox .mm-lb-content { max-width: 900px; width: 90%; text-align: center; }',
      '#mm-lightbox .mm-lb-content img { max-width: 100%; max-height: 70vh; border-radius: 0.75rem; object-fit: contain; }',
      '#mm-lightbox .mm-lb-caption { color: white; margin-top: 1.5rem; }',
      '#mm-lightbox .mm-lb-caption h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 0.5rem; font-family: "Libre Baskerville", serif; }',
      '#mm-lightbox .mm-lb-caption p { font-size: 1rem; color: rgba(255,255,255,0.8); margin: 0; font-family: "Source Sans 3", sans-serif; }'
    ].join('\n');
    document.head.appendChild(style);
  }

  function createSection() {
    var section = document.createElement('section');
    section.id = 'meta-memories';

    var html = '<div class="mm-container">';
    html += '<span class="mm-label">Meta Memories</span>';
    html += '<h2 class="mm-title">Moments That <span>Matter</span></h2>';
    html += '<p class="mm-subtitle">A collection of cherished moments from my journey — celebrating teamwork, milestones, and the people who made it all possible.</p>';
    html += '<div class="mm-line"></div>';
    html += '<div class="mm-grid">';

    for (var i = 0; i < photos.length; i++) {
      var p = photos[i];
      html += '<div class="mm-card" data-index="' + i + '">';
      html += '<div class="mm-card-img">';
      html += '<img src="' + p.src + '" alt="' + p.title + '" loading="lazy" />';
      html += '<div class="mm-card-overlay"><span>Click to view</span></div>';
      html += '</div>';
      html += '<div class="mm-card-body">';
      html += '<div class="mm-card-header">';
      html += '<h3>' + p.title + '</h3>';
      html += '<span class="mm-year">' + p.year + '</span>';
      html += '</div>';
      html += '<p>' + p.description + '</p>';
      html += '</div>';
      html += '</div>';
    }

    html += '</div></div>';
    section.innerHTML = html;
    return section;
  }

  function createLightbox() {
    var lb = document.createElement('div');
    lb.id = 'mm-lightbox';
    lb.innerHTML = '<button class="mm-lb-close" aria-label="Close">&times;</button>' +
      '<button class="mm-lb-nav mm-lb-prev" aria-label="Previous">&#8249;</button>' +
      '<button class="mm-lb-nav mm-lb-next" aria-label="Next">&#8250;</button>' +
      '<div class="mm-lb-content">' +
      '<img src="" alt="" />' +
      '<div class="mm-lb-caption"><h3></h3><p></p></div>' +
      '</div>';
    document.body.appendChild(lb);

    var currentIndex = 0;

    function showPhoto(index) {
      currentIndex = ((index % photos.length) + photos.length) % photos.length;
      var p = photos[currentIndex];
      lb.querySelector('.mm-lb-content img').src = p.src;
      lb.querySelector('.mm-lb-content img').alt = p.title;
      lb.querySelector('.mm-lb-caption h3').textContent = p.title + ' — ' + p.year;
      lb.querySelector('.mm-lb-caption p').textContent = p.description;
    }

    function open(index) {
      showPhoto(index);
      lb.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lb.classList.remove('active');
      document.body.style.overflow = '';
    }

    lb.querySelector('.mm-lb-close').addEventListener('click', close);
    lb.querySelector('.mm-lb-prev').addEventListener('click', function() { showPhoto(currentIndex - 1); });
    lb.querySelector('.mm-lb-next').addEventListener('click', function() { showPhoto(currentIndex + 1); });
    lb.addEventListener('click', function(e) { if (e.target === lb) close(); });

    document.addEventListener('keydown', function(e) {
      if (!lb.classList.contains('active')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
      if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
    });

    return open;
  }

  function init() {
    // Wait for the React app to render
    var contactSection = document.getElementById('contact');
    if (!contactSection) {
      setTimeout(init, 200);
      return;
    }

    injectStyles();

    // Insert Meta Memories section before the Contact section
    var section = createSection();
    contactSection.parentNode.insertBefore(section, contactSection);

    // Create lightbox
    var openLightbox = createLightbox();

    // Attach click handlers to cards
    var cards = section.querySelectorAll('.mm-card');
    for (var i = 0; i < cards.length; i++) {
      (function(index) {
        cards[index].addEventListener('click', function() {
          openLightbox(index);
        });
      })(i);
    }

    // Animate cards on scroll
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '-50px' });

    cards.forEach(function(card, index) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease ' + (index * 0.1) + 's, transform 0.6s ease ' + (index * 0.1) + 's';
      observer.observe(card);
    });
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 500); });
  } else {
    setTimeout(init, 500);
  }
})();
