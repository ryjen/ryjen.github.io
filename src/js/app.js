
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

  if (window.location.hostname != 'coda.life') {
    $("#intro .brand, #brand .brand").text(window.location.hostname.split('.')[0])
  }

});

