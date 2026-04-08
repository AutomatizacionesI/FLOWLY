// ============================================================
// synara.ai — JavaScript Interactions
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================================
  // 1. AÑO DINÁMICO EN FOOTER
  // ============================================================
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  // ============================================================
  // 2. MOBILE MENU TOGGLE
  // ============================================================
  const menuToggle = document.getElementById('menuToggle');
  const mainNav    = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Cerrar al hacer click en un link
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', function (e) {
      if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        mainNav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }


  // ============================================================
  // 3. HEADER: EFECTO SCROLL
  // ============================================================
  const header = document.getElementById('header');

  if (header) {
    const onScroll = debounce(() => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, 10);
    window.addEventListener('scroll', onScroll, { passive: true });
  }


  // ============================================================
  // 4. SMOOTH SCROLL PARA ANCLAS
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 70;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  // ============================================================
  // 5. ANIMATE ON SCROLL (IntersectionObserver)
  // ============================================================
  const animElements = document.querySelectorAll('.animate-on-scroll');

  if (animElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('visible'), Number(delay));
        observer.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    // Añadir delays escalonados a elementos en grillas
    document.querySelectorAll('.services-grid .service-card, .solutions-grid .solution-card, .stats-grid .stat-card').forEach((el, i) => {
      el.dataset.delay = i * 80;
    });

    animElements.forEach(el => observer.observe(el));
  }


  // ============================================================
  // 6. TIMELINE: ANIMAR LÍNEA AL SCROLL
  // ============================================================
  const timelineFill = document.getElementById('timelineFill');
  const timeline     = document.getElementById('methodologyTimeline');

  if (timelineFill && timeline) {
    const tlObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineFill.classList.add('animated');
          tlObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    tlObserver.observe(timeline);
  }


  // ============================================================
  // 7. COUNTER ANIMATION PARA STATS
  // ============================================================
  const statValues = document.querySelectorAll('.stat-value[data-target]');

  if (statValues.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '%';
        animateCounter(el, target, suffix);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    statValues.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el, target, suffix) {
    const duration  = 1600;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutCubic(progress);
      const value    = Math.round(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }


  // ============================================================
  // 8. PARALLAX EN HERO
  // ============================================================
  const heroSection = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');

  if (heroSection && heroContent && !prefersReduced) {
    const onHeroScroll = () => {
      const scrollY     = window.pageYOffset;
      const heroHeight  = heroSection.offsetHeight;
      if (scrollY > heroHeight) return;

      const progress = scrollY / heroHeight;
      heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
      heroContent.style.opacity   = 1 - progress * 0.6;
    };

    window.addEventListener('scroll', onHeroScroll, { passive: true });
  }


  // ============================================================
  // 9. CURSOR GLOW (solo desktop)
  // ============================================================
  const cursorGlow = document.getElementById('cursorGlow');

  if (cursorGlow && window.innerWidth > 1024 && !prefersReduced) {
    let mouseX = 0, mouseY = 0;
    let glowX  = 0, glowY  = 0;
    let raf;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top  = glowY + 'px';
      raf = requestAnimationFrame(updateGlow);
    }

    raf = requestAnimationFrame(updateGlow);

    // Pausar cuando el mouse sale de la ventana
    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
      cancelAnimationFrame(raf);
    });
    document.addEventListener('mouseenter', () => {
      cursorGlow.style.opacity = '1';
      raf = requestAnimationFrame(updateGlow);
    });
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }


  // ============================================================
  // 10. CONSOLE BRANDING
  // ============================================================
  console.log(
    '%c🌀 synara.ai',
    'background: linear-gradient(135deg, #7C3AED, #06B6D4); color: white; padding: 8px 16px; border-radius: 6px; font-size: 16px; font-weight: bold;'
  );
  console.log(
    '%cAutomatización Inteligente para empresas que escalan.',
    'color: #8B5CF6; font-size: 12px;'
  );
  console.log('%c✉ hola@synara.ai', 'color: #94A3B8; font-size: 11px;');

});


// ============================================================
// UTILIDADES
// ============================================================
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
