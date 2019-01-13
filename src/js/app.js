
function initDoodles() {

  var width = ($(window).width()/4)*2;
  var height = width * 0.68571428571;

  $("#doodle-gallery").simplecarousel({
    next: $('.next'),
    prev: $('.prev'),
    slidespeed: 700,
    height: height,
    width: width,
  });
}

$(function() {

  $(window).resize(function() {
    initDoodles();
  });

  initDoodles();

  var items = $("#intro .brand, #brand .brand")
  
  if (window.location.hostname != 'coda.life' && window.location.hostname != 'www.coda.life') {

    if (window.location.hostname == 'ryanjennin.gs' || window.location.hostname == 'www.ryanjennin.gs') {
      document.title = 'ryan jennings'
    } else {
      var parts = window.location.hostname.split('.')
      document.title = parts.length > 3 ? parts[2] : parts.length > 2 ? parts[1] : parts[0]
    }
    items.text(document.title)
  }

  items.fadeIn(900, function() { items.css({opacity: 1}) })

});

