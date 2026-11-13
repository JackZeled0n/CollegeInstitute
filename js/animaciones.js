/* Animaciones de la página de admisión (GSAP 3.13 + ScrollTrigger + SplitText).
   Si la persona prefiere reducir el movimiento, no se anima nada. */
(function () {
  var root = document.documentElement;

  if (!window.gsap || !window.ScrollTrigger || !window.SplitText) {
    root.classList.remove('anim');
    return;
  }

  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Que la barra de direcciones del celular (que cambia el alto de la ventana) no recalcule todo.
  ScrollTrigger.config({ ignoreMobileResize: true });

  var introPlayed = false;
  var mm = gsap.matchMedia();

  // Un contexto por tamaño: al pasar de móvil a escritorio (o al revés) GSAP revierte
  // todo y lo reconstruye con la posición de scroll real, sin valores viejos.
  mm.add({
    desktop: '(min-width: 601px) and (prefers-reduced-motion: no-preference)',
    mobile: '(max-width: 600px) and (prefers-reduced-motion: no-preference)'
  }, function (context) {
    var reveal = { start: 'top 82%', once: true };
    var split = null;

    /* ---------- Entrada del hero: solo la primera vez ---------- */
    if (!introPlayed) {
      introPlayed = true;
      gsap.set('[data-anim-hide]:not(.hero__title)', { visibility: 'visible' });

      var intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from('.hero__photo', { scale: 1.12, duration: 2.4, ease: 'power2.out' }, 0)
        .from('.crest', { yPercent: -115, duration: 0.9 }, 0.15)
        .from('.hero__nav', { autoAlpha: 0, y: -12, duration: 0.6 }, 0.4)
        .from('.hero__rule', { scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'power2.inOut' }, 0.3)
        .from('.hero__intro > *', { autoAlpha: 0, y: 18, duration: 0.8, stagger: 0.12 }, 0.95);

      // El titular sube línea por línea desde una máscara; se muestra cuando SplitText lo parte.
      split = SplitText.create('.hero__title', {
        type: 'lines',
        mask: 'lines',
        linesClass: 'hero__line',
        autoSplit: true,
        onSplit: function (self) {
          gsap.set('.hero__title', { visibility: 'visible' });
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.15,
            stagger: 0.12,
            ease: 'power4.out',
            delay: intro.time() < 0.5 ? 0.5 - intro.time() : 0
          });
        }
      });
    } else {
      // Al cambiar de tamaño todo se muestra directo, sin repetir la entrada.
      gsap.set('[data-anim-hide]', { visibility: 'visible' });
    }

    /* ---------- Hero al hacer scroll ----------
       Inicio y fin explícitos, recalculados en cada refresh. */
    gsap.fromTo('.hero__photo', { yPercent: 0 }, {
      yPercent: context.conditions.mobile ? 8 : 14,
      ease: 'none',
      immediateRender: false,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    gsap.fromTo('.hero__content', { y: 0, autoAlpha: 1 }, {
      y: -60,
      autoAlpha: 0,
      ease: 'none',
      immediateRender: false,
      scrollTrigger: {
        trigger: '.hero',
        start: '25% top',
        end: '85% top',
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    /* ---------- Antes de empezar ---------- */
    // El bloque se revela de arriba hacia abajo, igual que el marco del formulario.
    gsap.from('.guide', {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 1.2,
      ease: 'power3.inOut',
      clearProps: 'clipPath',
      scrollTrigger: Object.assign({ trigger: '.apply' }, reveal)
    });

    gsap.from('.guide__title, .guide__lead, .steps__item, .guide__help', {
      autoAlpha: 0,
      y: 18,
      duration: 0.7,
      stagger: 0.07,
      delay: 0.35,
      ease: 'power2.out',
      scrollTrigger: Object.assign({ trigger: '.apply' }, reveal)
    });

    // El marco del formulario se revela de arriba hacia abajo; el iframe ya está cargando.
    gsap.from('.form-frame', {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 1.4,
      ease: 'power3.inOut',
      clearProps: 'clipPath',
      scrollTrigger: Object.assign({ trigger: '.apply__form' }, reveal)
    });

    /* ---------- Galería: cada foto se destapa de abajo hacia arriba ---------- */
    gsap.utils.toArray('.gallery__item').forEach(function (item, i) {
      var tl = gsap.timeline({ scrollTrigger: { trigger: '.gallery', start: 'top 85%', once: true }, delay: i * 0.12 });
      tl.from(item, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut' }, 0)
        .from(item.querySelector('img'), { scale: 1.3, duration: 1.6, ease: 'power3.out' }, 0);
    });

    /* ---------- Footer ---------- */
    gsap.from('.footer__brand, .footer__links li', {
      autoAlpha: 0,
      y: 20,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.footer', start: 'top 90%', once: true }
    });

    return function () {
      if (split) split.revert();
    };
  });

  // Si la persona tiene reducido el movimiento, todo se muestra sin animar.
  mm.add('(prefers-reduced-motion: reduce)', function () {
    root.classList.remove('anim');
  });

  // Las fotos cambian alturas al cargar; recalculamos los puntos de scroll.
  window.addEventListener('load', function () {
    ScrollTrigger.refresh();
  });
})();
