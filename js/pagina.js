(function () {
  document.getElementById('year').textContent = new Date().getFullYear();

  var frame = document.getElementById('tci-form');
  var wrap = frame.parentElement;
  var top = document.getElementById('form-top');
  var loads = 0;

  // Por si el formulario cargó antes que este script, no dejarlo oculto.
  setTimeout(function () { wrap.setAttribute('data-state', 'ready'); }, 4000);

  frame.addEventListener('load', function () {
    loads++;
    wrap.setAttribute('data-state', 'ready');
    // Google Forms recarga el iframe al pasar de sección o al enviar.
    // Llevamos a la persona al inicio del formulario para que no quede en un espacio en blanco.
    if (loads > 1) {
      top.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  });
})();
