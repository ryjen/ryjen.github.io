
$(function() {

  if ($("#main #intro").length) {
    particlesJS.load('background', '/assets/particles.json', function() {
      console.log('callback - particles.js config loaded');
    });
  }

});
