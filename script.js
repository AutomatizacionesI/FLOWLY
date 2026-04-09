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
  // 11. INDUSTRY TABS
  // ============================================================
  const industryPanels      = document.getElementById('industryPanels');
  const industryTabs        = document.querySelectorAll('.industry-tab');
  window.activeIndustry     = 'finanzas';

  window.renderIndustryPanel = function renderIndustryPanel(industry) {
    if (!industryPanels) return;
    const lang = window.currentLang || 'es';
    const data = synaraTranslations[lang] && synaraTranslations[lang].industries
      ? synaraTranslations[lang].industries[industry]
      : null;
    if (!data) return;

    const featuresHTML = data.features
      .map(f => `<li>${f}</li>`)
      .join('');

    const metricsHTML = data.metrics
      .map((m, i) => `
        <div class="industry-metric${i === data.metrics.length - 1 ? ' industry-metric--full' : ''}">
          <span class="industry-metric-value">${m.value}</span>
          <span class="industry-metric-label">${m.label}</span>
        </div>`)
      .join('');

    industryPanels.innerHTML = `
      <div class="industry-panel active" role="tabpanel">
        <div class="industry-panel-left">
          <h3>${data.title}</h3>
          <p>${data.desc}</p>
          <ul class="industry-checklist">${featuresHTML}</ul>
        </div>
        <div class="industry-metrics">${metricsHTML}</div>
      </div>`;
  }

  if (industryTabs.length > 0) {
    window.renderIndustryPanel(window.activeIndustry);

    industryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        industryTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        window.activeIndustry = tab.dataset.tab;
        window.renderIndustryPanel(window.activeIndustry);
      });
    });
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

// ==== TRANSLATION SYSTEM ====
window.currentLang = localStorage.getItem('synaraLang') || 'es';

const synaraTranslations = {
  es: {
    navServices: 'Servicios',
    navProcess: 'Proceso',
    navSolutions: 'Soluciones',
    navImpact: 'Impacto',
    navContact: 'Contacto',
    btnHeader: 'Diagnóstico Gratuito',
    
    heroBadge: '<span class="hero-badge-dot"></span>Automatización Inteligente',
    heroTitle: 'Transformá tu negocio con<br>\n<span class="highlight">Inteligencia Artificial</span>',
    heroDesc: 'Detectamos los cuellos de botella de tu operación y los eliminamos con RPA, IA y desarrollo a medida. Procesos más rápidos, menos errores, más crecimiento.',
    heroBtn1: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1L13 8L8 15M3 8H13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>\nSolicitar Diagnóstico',
    heroBtn2: 'Ver Cómo Funciona',
    heroTrust: 'Empresas de Uruguay ya automatizan con <strong>synara.ai</strong>',

    clientsLabel: 'Con la confianza de empresas líderes',

    svcBadge: 'Nuestros servicios',
    svcTitle: 'Tecnología que transforma<br>\n<span class="gradient-text">tu operación</span>',
    svcSubtitle: 'Combinamos las herramientas más potentes del mercado para automatizar lo que te frena y potenciar lo que te hace crecer.',
    
    svc1Title: 'Automatización RPA',
    svc1Desc: 'Eliminamos las tareas manuales y repetitivas de tu equipo mediante robots de software que operan 24/7 sin errores ni pausas.',
    svc1F1: '<span class="feature-check" aria-hidden="true">✓</span>Bots para entrada y migración de datos',
    svc1F2: '<span class="feature-check" aria-hidden="true">✓</span>Automatización de reportes y facturación',
    svc1F3: '<span class="feature-check" aria-hidden="true">✓</span>Integración con ERP, CRM y sistemas legacy',
    svc1F4: '<span class="feature-check" aria-hidden="true">✓</span>Monitoreo y alertas en tiempo real',

    svc2Title: 'Inteligencia Artificial',
    svc2Desc: 'Implementamos soluciones de IA que aprenden de tu negocio: desde agentes conversacionales hasta modelos predictivos y clasificación de documentos.',
    svc2F1: '<span class="feature-check" aria-hidden="true">✓</span>Agentes y chatbots con IA generativa',
    svc2F2: '<span class="feature-check" aria-hidden="true">✓</span>Análisis predictivo y machine learning',
    svc2F3: '<span class="feature-check" aria-hidden="true">✓</span>Procesamiento inteligente de documentos',
    svc2F4: '<span class="feature-check" aria-hidden="true">✓</span>Dashboards de BI con insights automáticos',

    svc3Title: 'Desarrollo a Medida',
    svc3Desc: 'Construimos las herramientas exactas que tu operación necesita: plataformas internas, integraciones y sistemas que se adaptan a tu flujo de trabajo.',
    svc3F1: '<span class="feature-check" aria-hidden="true">✓</span>Plataformas web y dashboards personalizados',
    svc3F2: '<span class="feature-check" aria-hidden="true">✓</span>Integraciones vía APIs y webhooks',
    svc3F3: '<span class="feature-check" aria-hidden="true">✓</span>Automatizaciones con n8n, Make y Zapier',
    svc3F4: '<span class="feature-check" aria-hidden="true">✓</span>Entrega iterativa con sprints cortos',

    procBadge: 'Nuestro proceso',
    procTitle: 'De la idea al resultado<br>\n<span class="gradient-text">en semanas, no meses</span>',
    procSubtitle: 'Un proceso probado que minimiza el riesgo y maximiza el impacto desde el primer entregable.',
    
    proc1Tag: 'Análisis · Semana 1',
    proc1Title: 'Diagnóstico',
    proc1Desc: 'Mapeamos tus procesos actuales, identificamos los puntos de mayor fricción y definimos las oportunidades de automatización con mayor ROI potencial.',
    
    proc2Tag: 'MVP · Semana 2–3',
    proc2Title: 'Prototipo Funcional',
    proc2Desc: 'Construimos un prototipo real y funcional del proceso automatizado. Podés verlo en acción antes de comprometer recursos al despliegue completo.',
    
    proc3Tag: 'Despliegue · Semana 4+',
    proc3Title: 'Implementación',
    proc3Desc: 'Desplegamos la solución en producción, capacitamos al equipo y establecemos monitoreo continuo para asegurar la estabilidad y evolución del sistema.',

    solBadge: 'Casos de uso',
    solTitle: 'Soluciones de <span class="gradient-text">alto impacto</span>',
    solSubtitle: 'Aplicaciones concretas que ya transforman la operación de empresas como la tuya.',
    
    sol1Title: 'Finanzas Automáticas',
    sol1Desc: 'Conciliación bancaria, generación de facturas, seguimiento de pagos y reportes financieros automatizados. Tu equipo contable enfocado en lo estratégico.',
    sol2Title: 'Data & Business Intelligence',
    sol2Desc: 'Dashboards en tiempo real con KPIs de negocio, alertas automáticas por desvíos y reportes distribuidos sin intervención humana.',
    sol3Title: 'Ecosistemas de Gestión',
    sol3Desc: 'Conectamos tus herramientas (CRM, ERP, e-commerce, soporte) en un flujo unificado. Datos consistentes, sin duplicados ni fricción entre áreas.',
    sol4Title: 'Asistentes Cognitivos',
    sol4Desc: 'Agentes de IA que atienden consultas, califican leads, procesan solicitudes y derivan casos complejos a tu equipo. Disponibles 24/7.',

    impBadge: 'Ventajas reales',
    impTitle: 'El antes y el después<br>\n<span class="gradient-text">de automatizar</span>',
    impSubtitle: 'Resultados concretos y medibles que nuestros clientes experimentan en las primeras semanas.',
    
    impBeforeTitle: 'Sin synara\n<span>El estado actual de tu operación</span>',
    impBefore1: '<strong>Horas perdidas cada semana</strong>\nTareas manuales y repetitivas que consumen el tiempo de tu equipo más valioso.',
    impBefore2: '<strong>Errores costosos y frecuentes</strong>\nLa intervención humana en procesos repetitivos garantiza inconsistencias y reprocesos.',
    impBefore3: '<strong>Información dispersa y tardía</strong>\nDatos en planillas, correos y sistemas separados que nunca cuentan la misma historia.',
    impBefore4: '<strong>Cuello de botella operativo</strong>\nEl crecimiento del negocio choca contra la capacidad operativa de tu equipo.',

    impAfterTitle: 'Con synara.ai\n<span>Tu operación transformada</span>',
    impAfter1: '<strong>85% del tiempo recuperado</strong>\nTu equipo se enfoca en decisiones estratégicas, no en tareas repetitivas.',
    impAfter2: '<strong>95% de precisión garantizada</strong>\nLos procesos automatizados ejecutan exactamente lo que les indicás, sin variaciones.',
    impAfter3: '<strong>Dashboards en tiempo real</strong>\nToda la información de tu negocio unificada y actualizada automáticamente.',
    impAfter4: '<strong>Escalabilidad ilimitada</strong>\nTus procesos crecen con el negocio sin necesidad de contratar más personal operativo.',

    statTitle: 'Números que <span class="gradient-text">hablan solos</span>',
    stat1: 'Reducción de tiempo<br>en procesos operativos',
    stat2: 'Operación continua<br>sin pausas ni errores',
    stat3: 'Precisión garantizada<br>en ejecución',
    stat4: 'Personalizado<br>a tu negocio',

    indBadge: 'Industrias',
    indTitle: 'Soluciones para <span class="gradient-text">tu sector</span>',
    indSubtitle: 'Automatizamos los procesos más críticos de cada industria con IA adaptada a sus particularidades.',
    industries: {
      finanzas: {
        title: 'Finanzas & Contabilidad',
        desc: 'Automatizamos conciliaciones bancarias, reportes regulatorios y procesos de facturación. Reducimos el trabajo manual del equipo financiero hasta un 80%, liberando tiempo para análisis estratégico.',
        features: ['Conciliación bancaria automática', 'Reportes regulatorios (DGI, BPS)', 'Alertas de anomalías en tiempo real', 'Dashboards de flujo de caja'],
        metrics: [
          { value: '80%', label: 'menos tiempo manual' },
          { value: '99%', label: 'precisión en reportes' },
          { value: '2–3 sem', label: 'tiempo de implementación' }
        ]
      },
      logistica: {
        title: 'Logística & Supply Chain',
        desc: 'Conectamos tus sistemas de transporte, stock y proveedores para eliminar errores de coordinación. Trazabilidad en tiempo real y alertas automáticas ante desvíos.',
        features: ['Seguimiento de envíos en tiempo real', 'Gestión automática de stock', 'Alertas de retraso y desvíos', 'Reportes de entrega automatizados'],
        metrics: [
          { value: '65%', label: 'menos errores operativos' },
          { value: '3x', label: 'velocidad de procesamiento' },
          { value: '1–2 sem', label: 'tiempo de implementación' }
        ]
      },
      retail: {
        title: 'Retail & Comercio',
        desc: 'Automatizamos la gestión de inventario, el procesamiento de pedidos y la atención al cliente. Tus vendedores se enfocan en cerrar ventas, no en tareas administrativas.',
        features: ['Gestión automática de inventario', 'Análisis de ventas y tendencias', 'Automatización de pedidos y restock', 'Atención al cliente con IA 24/7'],
        metrics: [
          { value: '70%', label: 'tareas automatizadas' },
          { value: '+30%', label: 'satisfacción del cliente' },
          { value: '2 sem', label: 'tiempo de implementación' }
        ]
      },
      salud: {
        title: 'Salud & Clínicas',
        desc: 'Simplificamos la gestión de turnos, recordatorios a pacientes y reportes médicos. Menos ausencias, mejor experiencia de paciente y más tiempo para el equipo clínico.',
        features: ['Turnos automáticos y confirmaciones', 'Recordatorios a pacientes por WhatsApp', 'Reportes médicos automatizados', 'Gestión de agenda optimizada'],
        metrics: [
          { value: '90%', label: 'reducción de ausencias' },
          { value: '4hs', label: 'ahorradas por día' },
          { value: '1 sem', label: 'tiempo de implementación' }
        ]
      },
      legal: {
        title: 'Estudios Legales',
        desc: 'Automatizamos la redacción de documentos estándar, el seguimiento de plazos y la facturación. Tu equipo jurídico dedica su tiempo a lo que realmente agrega valor.',
        features: ['Redacción automática de contratos tipo', 'Seguimiento de plazos y vencimientos', 'Clasificación inteligente de documentos', 'Facturación automática de horas'],
        metrics: [
          { value: '75%', label: 'menos trabajo administrativo' },
          { value: '99%', label: 'plazos cumplidos' },
          { value: '2 sem', label: 'tiempo de implementación' }
        ]
      }
    },

    teamBadge: 'El equipo',
    teamTitle: 'Las personas detrás de <span class="gradient-text">la automatización</span>',
    teamSubtitle: 'Más de un año construyendo soluciones de IA y automatización para empresas que quieren escalar.',
    team1Name: 'Facundo Etcheverry',
    team1Role: 'Co-founder · Sistemas & Automatización',
    team1Desc: 'Estudiante avanzado de Licenciatura en Sistemas. Especializado en arquitectura de automatizaciones RPA, integraciones y desarrollo de agentes de IA. Apasionado por construir sistemas que realmente escalan.',
    team2Name: 'Gonzalo Pittaluga',
    team2Role: 'Co-founder · Datos & Estrategia',
    team2Desc: 'Estudiante avanzado de Análisis de Datos para Negocios. Especializado en inteligencia de negocios, dashboards estratégicos y modelos predictivos aplicados al crecimiento empresarial.',
    teamTagline: 'Basados en Uruguay · +1 año en automatización con IA · Disponibles para proyectos en toda la región',

    ctaBadge: '✨ Diagnóstico sin costo',
    ctaTitle: 'Transformá tu operación.<br>Empezá hoy.',
    ctaSubtitle: 'Una sesión de 30 minutos es suficiente para identificar qué proceso de tu negocio tiene mayor potencial de automatización.',
    ctaBtnEmail: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M1 5.5L8 9.5L15 5.5" stroke="currentColor" stroke-width="1.5"/></svg>\nEscribinos por email',
    ctaBtnWa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>\nHablar por WhatsApp',
    ctaTrust1: '<span class="cta-check" aria-hidden="true">✓</span>Sin compromiso',
    ctaTrust2: '<span class="cta-check" aria-hidden="true">✓</span>Respuesta en menos de 24h',
    ctaTrust3: '<span class="cta-check" aria-hidden="true">✓</span>100% personalizado',
    
    footerTagline: 'Automatización inteligente para empresas que escalan. RPA, IA y desarrollo a medida.',
    footerSvcHeader: 'Servicios',
    footerCoHeader: 'Empresa',
    footerCopy: 'Hecho con 💜 en Uruguay',
    footerWaFloat: 'WhatsApp',

    langToggle: 'EN'
  },
  en: {
    navServices: 'Services',
    navProcess: 'Process',
    navSolutions: 'Solutions',
    navImpact: 'Impact',
    navContact: 'Contact',
    btnHeader: 'Free Diagnosis',

    heroBadge: '<span class="hero-badge-dot"></span>Intelligent Automation',
    heroTitle: 'Transform your business with<br>\n<span class="highlight">Artificial Intelligence</span>',
    heroDesc: 'We detect bottlenecks in your operations and eliminate them with RPA, AI, and custom development. Faster processes, fewer errors, more growth.',
    heroBtn1: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1L13 8L8 15M3 8H13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>\nRequest Diagnosis',
    heroBtn2: 'See How It Works',
    heroTrust: 'Uruguayan companies are already automating with <strong>synara.ai</strong>',

    clientsLabel: 'Trusted by leading companies',

    svcBadge: 'Our services',
    svcTitle: 'Technology that transforms<br>\n<span class="gradient-text">your business</span>',
    svcSubtitle: 'We combine the most powerful tools on the market to automate what slows you down and empower what helps you grow.',

    svc1Title: 'RPA Automation',
    svc1Desc: 'We eliminate manual and repetitive tasks from your team using modern software robots that operate 24/7 without errors or pauses.',
    svc1F1: '<span class="feature-check" aria-hidden="true">✓</span>Bots for data entry and migration',
    svc1F2: '<span class="feature-check" aria-hidden="true">✓</span>Automated reporting and invoicing',
    svc1F3: '<span class="feature-check" aria-hidden="true">✓</span>Integration with ERP, CRM, and legacy systems',
    svc1F4: '<span class="feature-check" aria-hidden="true">✓</span>Real-time monitoring and alerts',

    svc2Title: 'Artificial Intelligence',
    svc2Desc: 'We implement AI solutions that learn from your business: from conversational agents to predictive models and document classification.',
    svc2F1: '<span class="feature-check" aria-hidden="true">✓</span>Agents and chatbots with generative AI',
    svc2F2: '<span class="feature-check" aria-hidden="true">✓</span>Predictive analysis and machine learning',
    svc2F3: '<span class="feature-check" aria-hidden="true">✓</span>Intelligent document processing',
    svc2F4: '<span class="feature-check" aria-hidden="true">✓</span>BI dashboards with automatic insights',

    svc3Title: 'Custom Development',
    svc3Desc: 'We build the exact tools your operations need: internal platforms, integrations, and systems adapted to your workflow.',
    svc3F1: '<span class="feature-check" aria-hidden="true">✓</span>Web platforms and custom dashboards',
    svc3F2: '<span class="feature-check" aria-hidden="true">✓</span>API integrations and webhooks',
    svc3F3: '<span class="feature-check" aria-hidden="true">✓</span>Automations with n8n, Make, and Zapier',
    svc3F4: '<span class="feature-check" aria-hidden="true">✓</span>Iterative delivery with short sprints',

    procBadge: 'Our process',
    procTitle: 'From idea to results<br>\n<span class="gradient-text">in weeks, not months</span>',
    procSubtitle: 'A proven process that minimizes risk and maximizes impact right from the first deliverable.',

    proc1Tag: 'Analysis · Week 1',
    proc1Title: 'Diagnosis',
    proc1Desc: 'We map your current processes, identify the points of highest friction, and define automation opportunities with the highest ROI potential.',

    proc2Tag: 'MVP · Week 2–3',
    proc2Title: 'Functional Prototype',
    proc2Desc: 'We build a real, functional prototype of the automated process. You can see it in action before committing resources to full deployment.',

    proc3Tag: 'Deployment · Week 4+',
    proc3Title: 'Implementation',
    proc3Desc: 'We deploy the solution in production, train your team, and establish continuous monitoring to ensure system stability and evolution.',

    solBadge: 'Use cases',
    solTitle: '<span class="gradient-text">High-impact</span> solutions',
    solSubtitle: 'Concrete applications that are already transforming operations of companies like yours.',

    sol1Title: 'Automated Finances',
    sol1Desc: 'Bank reconciliation, invoice generation, payment tracking, and automated financial reports. Your accounting team focused on strategy.',
    sol2Title: 'Data & Business Intelligence',
    sol2Desc: 'Real-time dashboards with business KPIs, automated deviation alerts, and reports distributed without human intervention.',
    sol3Title: 'Management Ecosystems',
    sol3Desc: 'We connect your tools (CRM, ERP, e-commerce, support) into a unified flow. Consistent data, without duplicates or friction between areas.',
    sol4Title: 'Cognitive Assistants',
    sol4Desc: 'AI agents that handle inquiries, qualify leads, process requests, and escalate complex cases to your team. Available 24/7.',

    impBadge: 'Real advantages',
    impTitle: 'The before and after<br>\n<span class="gradient-text">of automation</span>',
    impSubtitle: 'Concrete and measurable results that our clients experience within the first few weeks.',

    impBeforeTitle: 'Without synara\n<span>The current state of your operations</span>',
    impBefore1: '<strong>Hours lost every week</strong>\nManual and repetitive tasks that consume your team\'s most valuable time.',
    impBefore2: '<strong>Frequent and costly errors</strong>\nHuman intervention in repetitive processes guarantees inconsistencies and rework.',
    impBefore3: '<strong>Dispersed and delayed information</strong>\nData in spreadsheets, emails, and separate systems that never tell the same story.',
    impBefore4: '<strong>Operational bottleneck</strong>\nBusiness growth collides with your team\'s operational capacity.',

    impAfterTitle: 'With synara.ai\n<span>Your operations transformed</span>',
    impAfter1: '<strong>85% of time recovered</strong>\nYour team focuses on strategic decisions, not repetitive tasks.',
    impAfter2: '<strong>95% guaranteed precision</strong>\nAutomated processes execute exactly what you tell them, without variations.',
    impAfter3: '<strong>Real-time dashboards</strong>\nAll your business information unified and updated automatically.',
    impAfter4: '<strong>Unlimited scalability</strong>\nYour processes grow with the business without needing to hire more operational staff.',

    statTitle: 'Numbers that <span class="gradient-text">speak for themselves</span>',
    stat1: 'Reduction of time<br>in operational processes',
    stat2: 'Continuous operation<br>without pauses or errors',
    stat3: 'Guaranteed precision<br>in execution',
    stat4: 'Customized<br>to your business',

    indBadge: 'Industries',
    indTitle: 'Solutions for <span class="gradient-text">your sector</span>',
    indSubtitle: 'We automate the most critical processes in each industry with AI adapted to their specific needs.',
    industries: {
      finanzas: {
        title: 'Finance & Accounting',
        desc: 'We automate bank reconciliations, regulatory reports, and invoicing processes. We reduce manual work for finance teams by up to 80%, freeing time for strategic analysis.',
        features: ['Automatic bank reconciliation', 'Regulatory reports (DGI, BPS)', 'Real-time anomaly alerts', 'Cash flow dashboards'],
        metrics: [
          { value: '80%', label: 'less manual work' },
          { value: '99%', label: 'reporting accuracy' },
          { value: '2–3 wks', label: 'implementation time' }
        ]
      },
      logistica: {
        title: 'Logistics & Supply Chain',
        desc: 'We connect your transport, stock, and supplier systems to eliminate coordination errors. Real-time traceability and automatic alerts for any deviations.',
        features: ['Real-time shipment tracking', 'Automatic stock management', 'Delay and deviation alerts', 'Automated delivery reports'],
        metrics: [
          { value: '65%', label: 'fewer operational errors' },
          { value: '3x', label: 'processing speed' },
          { value: '1–2 wks', label: 'implementation time' }
        ]
      },
      retail: {
        title: 'Retail & Commerce',
        desc: 'We automate inventory management, order processing, and customer service. Your sales team focuses on closing deals, not administrative tasks.',
        features: ['Automatic inventory management', 'Sales analytics and trends', 'Order automation and restocking', 'AI-powered customer support 24/7'],
        metrics: [
          { value: '70%', label: 'tasks automated' },
          { value: '+30%', label: 'customer satisfaction' },
          { value: '2 wks', label: 'implementation time' }
        ]
      },
      salud: {
        title: 'Healthcare & Clinics',
        desc: 'We simplify appointment management, patient reminders, and medical reports. Fewer no-shows, better patient experience, and more time for your clinical team.',
        features: ['Automatic appointments and confirmations', 'Patient reminders via WhatsApp', 'Automated medical reports', 'Optimized schedule management'],
        metrics: [
          { value: '90%', label: 'reduction in no-shows' },
          { value: '4hrs', label: 'saved per day' },
          { value: '1 wk', label: 'implementation time' }
        ]
      },
      legal: {
        title: 'Law Firms',
        desc: 'We automate drafting of standard documents, deadline tracking, and billing. Your legal team dedicates their time to what truly adds value.',
        features: ['Automatic drafting of standard contracts', 'Deadline and expiration tracking', 'Smart document classification', 'Automatic hourly billing'],
        metrics: [
          { value: '75%', label: 'less admin work' },
          { value: '99%', label: 'deadlines met' },
          { value: '2 wks', label: 'implementation time' }
        ]
      }
    },

    teamBadge: 'The team',
    teamTitle: 'The people behind <span class="gradient-text">the automation</span>',
    teamSubtitle: 'Over a year building AI and automation solutions for companies that want to scale.',
    team1Name: 'Facundo Etcheverry',
    team1Role: 'Co-founder · Systems & Automation',
    team1Desc: 'Advanced student of Systems Engineering. Specialized in RPA automation architecture, integrations, and AI agent development. Passionate about building systems that truly scale.',
    team2Name: 'Gonzalo Pittaluga',
    team2Role: 'Co-founder · Data & Strategy',
    team2Desc: 'Advanced student of Business Data Analytics. Specialized in business intelligence, strategic dashboards, and predictive models applied to business growth.',
    teamTagline: 'Based in Uruguay · 1+ year in AI automation · Available for projects across the region',

    ctaBadge: '✨ Free Diagnosis',
    ctaTitle: 'Transform your operations.<br>Start today.',
    ctaSubtitle: 'A 30-minute session is enough to identify which business process has the highest automation potential.',
    ctaBtnEmail: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M1 5.5L8 9.5L15 5.5" stroke="currentColor" stroke-width="1.5"/></svg>\nEmail Us',
    ctaBtnWa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>\nChat on WhatsApp',
    ctaTrust1: '<span class="cta-check" aria-hidden="true">✓</span>No commitment',
    ctaTrust2: '<span class="cta-check" aria-hidden="true">✓</span>Response in under 24h',
    ctaTrust3: '<span class="cta-check" aria-hidden="true">✓</span>100% customized',

    footerTagline: 'Intelligent automation for scaling companies. RPA, AI, and custom development.',
    footerSvcHeader: 'Services',
    footerCoHeader: 'Company',
    footerCopy: 'Made with 💜 in Uruguay',
    footerWaFloat: 'WhatsApp',

    langToggle: 'ES'
  }
};

function applySynaraTranslations(lang) {
  const dict = synaraTranslations[lang];
  const els = {
    '#mainNav .nav-link:nth-child(1)': dict.navServices,
    '#mainNav .nav-link:nth-child(2)': dict.navProcess,
    '#mainNav .nav-link:nth-child(3)': dict.navSolutions,
    '#mainNav .nav-link:nth-child(4)': dict.navImpact,
    '#mainNav .nav-link:nth-child(5)': dict.navContact,
    '#lang-toggle': dict.langToggle,
    '.header-cta': dict.btnHeader,
    
    '.hero-badge': dict.heroBadge,
    '.hero-title': dict.heroTitle,
    '.hero-desc': dict.heroDesc,
    '.hero-actions .btn-primary': dict.heroBtn1,
    '.hero-actions .btn-ghost': dict.heroBtn2,
    '.hero-trust-text': dict.heroTrust,

    '.clients-label': dict.clientsLabel,

    '#servicios .section-badge': dict.svcBadge,
    '#servicios .section-title': dict.svcTitle,
    '#servicios .section-subtitle': dict.svcSubtitle,

    '.services-grid .service-card:nth-child(1) .service-title': dict.svc1Title,
    '.services-grid .service-card:nth-child(1) .service-desc': dict.svc1Desc,
    '.services-grid .service-card:nth-child(1) .service-feature:nth-child(1)': dict.svc1F1,
    '.services-grid .service-card:nth-child(1) .service-feature:nth-child(2)': dict.svc1F2,
    '.services-grid .service-card:nth-child(1) .service-feature:nth-child(3)': dict.svc1F3,
    '.services-grid .service-card:nth-child(1) .service-feature:nth-child(4)': dict.svc1F4,

    '.services-grid .service-card:nth-child(2) .service-title': dict.svc2Title,
    '.services-grid .service-card:nth-child(2) .service-desc': dict.svc2Desc,
    '.services-grid .service-card:nth-child(2) .service-feature:nth-child(1)': dict.svc2F1,
    '.services-grid .service-card:nth-child(2) .service-feature:nth-child(2)': dict.svc2F2,
    '.services-grid .service-card:nth-child(2) .service-feature:nth-child(3)': dict.svc2F3,
    '.services-grid .service-card:nth-child(2) .service-feature:nth-child(4)': dict.svc2F4,

    '.services-grid .service-card:nth-child(3) .service-title': dict.svc3Title,
    '.services-grid .service-card:nth-child(3) .service-desc': dict.svc3Desc,
    '.services-grid .service-card:nth-child(3) .service-feature:nth-child(1)': dict.svc3F1,
    '.services-grid .service-card:nth-child(3) .service-feature:nth-child(2)': dict.svc3F2,
    '.services-grid .service-card:nth-child(3) .service-feature:nth-child(3)': dict.svc3F3,
    '.services-grid .service-card:nth-child(3) .service-feature:nth-child(4)': dict.svc3F4,

    '#proceso .section-badge': dict.procBadge,
    '#proceso .section-title': dict.procTitle,
    '#proceso .section-subtitle': dict.procSubtitle,

    '.methodology-step:nth-child(2) .step-tag': dict.proc1Tag,
    '.methodology-step:nth-child(2) .step-title': dict.proc1Title,
    '.methodology-step:nth-child(2) .step-desc': dict.proc1Desc,

    '.methodology-step:nth-child(3) .step-tag': dict.proc2Tag,
    '.methodology-step:nth-child(3) .step-title': dict.proc2Title,
    '.methodology-step:nth-child(3) .step-desc': dict.proc2Desc,

    '.methodology-step:nth-child(4) .step-tag': dict.proc3Tag,
    '.methodology-step:nth-child(4) .step-title': dict.proc3Title,
    '.methodology-step:nth-child(4) .step-desc': dict.proc3Desc,

    '#soluciones .section-badge': dict.solBadge,
    '#soluciones .section-title': dict.solTitle,
    '#soluciones .section-subtitle': dict.solSubtitle,

    '.solutions-grid .solution-card:nth-child(1) .solution-title': dict.sol1Title,
    '.solutions-grid .solution-card:nth-child(1) .solution-desc': dict.sol1Desc,
    '.solutions-grid .solution-card:nth-child(2) .solution-title': dict.sol2Title,
    '.solutions-grid .solution-card:nth-child(2) .solution-desc': dict.sol2Desc,
    '.solutions-grid .solution-card:nth-child(3) .solution-title': dict.sol3Title,
    '.solutions-grid .solution-card:nth-child(3) .solution-desc': dict.sol3Desc,
    '.solutions-grid .solution-card:nth-child(4) .solution-title': dict.sol4Title,
    '.solutions-grid .solution-card:nth-child(4) .solution-desc': dict.sol4Desc,

    '#industrias .section-badge': dict.indBadge,
    '#industrias .section-title': dict.indTitle,
    '#industrias .section-subtitle': dict.indSubtitle,

    '#equipo .section-badge': dict.teamBadge,
    '#equipo .section-title': dict.teamTitle,
    '#equipo .section-subtitle': dict.teamSubtitle,
    '.team-card:nth-child(1) .team-name': dict.team1Name,
    '.team-card:nth-child(1) .team-role': dict.team1Role,
    '.team-card:nth-child(1) .team-desc': dict.team1Desc,
    '.team-card:nth-child(2) .team-name': dict.team2Name,
    '.team-card:nth-child(2) .team-role': dict.team2Role,
    '.team-card:nth-child(2) .team-desc': dict.team2Desc,
    '.team-tagline': dict.teamTagline,

    '#impacto .section-badge': dict.impBadge,
    '#impacto .section-title': dict.impTitle,
    '#impacto .section-subtitle': dict.impSubtitle,

    '.impact-col-header.before .impact-col-title': dict.impBeforeTitle,
    '.impact-item.before:nth-child(1) .impact-item-text': dict.impBefore1,
    '.impact-item.before:nth-child(2) .impact-item-text': dict.impBefore2,
    '.impact-item.before:nth-child(3) .impact-item-text': dict.impBefore3,
    '.impact-item.before:nth-child(4) .impact-item-text': dict.impBefore4,

    '.impact-col-header.after .impact-col-title': dict.impAfterTitle,
    '.impact-item.after:nth-child(1) .impact-item-text': dict.impAfter1,
    '.impact-item.after:nth-child(2) .impact-item-text': dict.impAfter2,
    '.impact-item.after:nth-child(3) .impact-item-text': dict.impAfter3,
    '.impact-item.after:nth-child(4) .impact-item-text': dict.impAfter4,

    '.stats .section-title': dict.statTitle,
    '.stats-grid .stat-card:nth-child(1) .stat-label': dict.stat1,
    '.stats-grid .stat-card:nth-child(2) .stat-label': dict.stat2,
    '.stats-grid .stat-card:nth-child(3) .stat-label': dict.stat3,
    '.stats-grid .stat-card:nth-child(4) .stat-label': dict.stat4,

    '#contacto .cta-badge': dict.ctaBadge,
    '#contacto .cta-title': dict.ctaTitle,
    '#contacto .cta-desc': dict.ctaSubtitle,
    '#contacto .cta-actions .btn-white': dict.ctaBtnEmail,
    '#contacto .cta-actions .btn-whatsapp': dict.ctaBtnWa,
    '#contacto .cta-trust-item:nth-child(1)': dict.ctaTrust1,
    '#contacto .cta-trust-item:nth-child(2)': dict.ctaTrust2,
    '#contacto .cta-trust-item:nth-child(3)': dict.ctaTrust3,

    '.footer-tagline': dict.footerTagline,
    '.footer-grid nav:nth-of-type(1) .footer-col-title': dict.footerSvcHeader,
    '.footer-grid nav:nth-of-type(1) .footer-links li:nth-child(1) a': dict.svc1Title,
    '.footer-grid nav:nth-of-type(1) .footer-links li:nth-child(2) a': dict.svc2Title,
    '.footer-grid nav:nth-of-type(1) .footer-links li:nth-child(3) a': dict.svc3Title,
    '.footer-grid nav:nth-of-type(1) .footer-links li:nth-child(4) a': dict.navSolutions,

    '.footer-grid nav:nth-of-type(2) .footer-col-title': dict.footerCoHeader,
    '.footer-grid nav:nth-of-type(2) .footer-links li:nth-child(1) a': dict.navProcess,
    '.footer-grid nav:nth-of-type(2) .footer-links li:nth-child(2) a': dict.navImpact,
    '.footer-grid nav:nth-of-type(2) .footer-links li:nth-child(3) a': dict.navContact,

    '.footer-bottom .footer-copy:last-child': dict.footerCopy,
    '.whatsapp-float span': dict.footerWaFloat
  };

  for (const [selector, htmlContent] of Object.entries(els)) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = htmlContent;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.currentLang = window.currentLang === 'es' ? 'en' : 'es';
      localStorage.setItem('synaraLang', window.currentLang);
      applySynaraTranslations(window.currentLang);
      if (window.renderIndustryPanel) {
        window.renderIndustryPanel(window.activeIndustry || 'finanzas');
      }
    });
  }
  // Initialize translations on load safely
  if (window.currentLang !== 'es') {
    applySynaraTranslations(window.currentLang);
  }
});
