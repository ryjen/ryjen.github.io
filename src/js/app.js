
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

  if (window.location.hostname != 'coda.life' && window.location.hostname != 'www.coda.life') {
    var parts = window.location.hostname.split('.')
    document.title = parts.length > 3 ? parts[2] : parts.length > 2 ? parts[1] : parts[0]
    var items = $("#intro .brand, #brand .brand")
    items.css({ opacity: 0 })
    items.text(document.title)
    items.fadeIn('slow', function() {
      items.css({opacity: 1}) 
    })
  }

});

