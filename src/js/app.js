
function initDoodles() {

  var width = ($(window).width()/4)*2;
  var height = width * 0.68571428571;

  $("#doodle-gallery").simplecarousel({
    next: $('.next'),
    prev: $('.prev'),
    slidespeed: 700,
    height: height,
    width: width,
  })
}

$(function() {

  $(window).resize(function() {
    initDoodles();
  });

  initDoodles();

  var items = $("#intro .brand, #brand .brand")

  var exclude = ["coda.life", "www.coda.life"]

  var overrides = { 
    "ryanjennin.gs": "ryan jennings", 
    "www.ryanjennin.gs": "ryan jennings", 
    "localhost": "ryan jennings"
  }

  var hostname = window.location.hostname

  if (exclude.indexOf(hostname) == -1) {

    if (overrides[hostname]) {
      document.title = overrides[hostname]
    } else {
      var parts = hostname.split('.')
      document.title = parts.length >= 3 ? parts[2] : parts.length >= 2 ? parts[1] : parts[0]
    }
    items.text(document.title)
  }

  items.fadeIn(900, function() { items.css({opacity: 1}) })

})

