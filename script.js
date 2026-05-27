/* ===== FLIMA — Homenagem a Tia Orora ===== */

document.addEventListener('DOMContentLoaded', () => {
  // ===== Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== Reveal on Scroll (Intersection Observer) =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== Staggered reveal for cards and timeline items =====
  const staggerContainers = document.querySelectorAll('.cards-grid, .timeline-wrapper, .galeria-grid');

  staggerContainers.forEach(container => {
    const children = container.querySelectorAll('.card, .timeline-item, .galeria-item');
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('visible');
            }, index * 150);
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Add reveal class to children
    children.forEach(child => {
      child.classList.add('reveal');
    });

    staggerObserver.observe(container);
  });

  // ===== Parallax on Hero =====
  const hero = document.getElementById('hero');
  const heroImage = document.querySelector('.hero-image-frame');

  if (hero && heroImage) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroHeight = hero.offsetHeight;

      if (scrolled < heroHeight) {
        const parallaxValue = scrolled * 0.15;
        heroImage.style.transform = `translateY(${parallaxValue}px)`;
      }
    }, { passive: true });
  }

  // ===== Timeline line animation =====
  const timelineLine = document.querySelector('.timeline-line');
  if (timelineLine) {
    const timelineSection = document.getElementById('timeline');

    const lineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineLine.style.transition = 'height 2s ease';
          timelineLine.style.height = '100%';
        }
      });
    }, { threshold: 0.1 });

    // Start with 0 height
    timelineLine.style.height = '0%';
    lineObserver.observe(timelineSection);
  }

  // ===== Counter animation for timeline years =====
  const years = document.querySelectorAll('.timeline-year');
  years.forEach(yearEl => {
    const originalText = yearEl.textContent;
    const yearObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          yearEl.style.opacity = '0';
          setTimeout(() => {
            yearEl.style.transition = 'opacity 0.6s ease';
            yearEl.style.opacity = '1';
            yearEl.textContent = originalText;
          }, 300);
          yearObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    yearObserver.observe(yearEl);
  });

  // ===== Floating ornaments on homenagem section =====
  const ornaments = document.querySelectorAll('.homenagem-flor');
  if (ornaments.length) {
    window.addEventListener('scroll', () => {
      const homenagem = document.getElementById('homenagem');
      if (!homenagem) return;
      const rect = homenagem.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        ornaments.forEach((orn, i) => {
          const speed = (i + 1) * 15;
          orn.style.transform = `translate(${Math.sin(progress * 3) * speed}px, ${Math.cos(progress * 2) * speed}px)`;
        });
      }
    }, { passive: true });
  }

  // ===== Add subtle text shadow animation on hero name =====
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    heroName.addEventListener('mouseenter', () => {
      heroName.style.textShadow = '0 0 40px rgba(201, 169, 110, 0.3)';
    });
    heroName.addEventListener('mouseleave', () => {
      heroName.style.textShadow = 'none';
    });
  }
});
