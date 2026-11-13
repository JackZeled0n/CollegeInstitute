/* Se carga en <head>, antes de pintar la página. */
(function () {
  // Protección contra clickjacking: si otro sitio mete esta página en un iframe,
  // la sacamos a la ventana principal. (GitHub Pages no permite el encabezado X-Frame-Options.)
  if (window.top !== window.self) {
    try {
      window.top.location = window.self.location.href;
    } catch (e) {
      document.documentElement.style.display = 'none';
    }
  }

  // Oculta lo que GSAP va a animar solo si hay animaciones; si GSAP no carga, se muestra todo.
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('anim');
    setTimeout(function () {
      if (!window.gsap) document.documentElement.classList.remove('anim');
    }, 3000);
  }
})();
