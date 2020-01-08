var pl = true;
if ($(window).width() > 1000) {
  pl = false;
}

$(document).ready(function() {
  $("#owl-people").owlCarousel({
    autoPlay: 3000,
    loop: true,
    autoplay: pl,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    margin: 10,
    stagePadding: 10,
    dots: true,
    responsive: { 0: { items: 1 }, 768: { items: 2 }, 1000: { items: 3 } }
  });
});
$(document).ready(function() {
  $("#owl-calendar").owlCarousel({
    autoPlay: 2500,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    margin: 10,
    stagePadding: 10,
    responsive: { 0: { items: 1 }, 768: { items: 1 }, 1000: { items: 1 } }
  });
});
$(document).ready(function() {
  $(".dropdown-button").dropdown({ hover: true, belowOrigin: true });
});
$(document).ready(function() {
  $(".modal").modal();
});
$(document).ready(function() {
  $("#owl-header").owlCarousel({
    autoPlay: 3000,
    loop: true,
    autoHeight: true,
    nav: false,
    autoplay: true,
    autoplayTimeout: 6000,
    responsive: { 0: { items: 1 }, 768: { items: 1 }, 1000: { items: 1 } }
  });
});
