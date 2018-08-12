
function solidNav() {
  $('#header').addClass('solid');
  $('#brand img').attr('src', '/image/logo-light.svg');
}

function transNav() {
  $('#header').removeClass('solid');
  $('#brand img').attr('src', '/image/logo.svg');
}

$(function() {

  switch(window.location.pathname) {
    case '/post/':
      $("#header .blog").addClass("active");
      break;
    case '/music/':
      $("#header .music").addClass("active");
      break;
    case '/doodles/':
      $("#header .doodles").addClass("active");
      break;
    case '/things/':
      $("#header .things").addClass("active");
      break;
  }

  $("#menu-toggle").click(function() {
    if ( $("#header nav").is(':visible')) {
      // going to hide
      transNav();
    } else {
      solidNav();
    }
    $("#header nav").slideToggle();
  });

  // Transition effect for navbar 
  $(window).scroll(function() {
    // checks if window is scrolled more than 500px, adds/removes solid class
    if($(this).scrollTop() > 20) { 
      solidNav();
    } else {
      transNav();
    }
  });

  if ($(window).scrollTop() > 20) {
    solidNav();
  }

});
