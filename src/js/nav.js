
$(function() {
  // TODO: alt this crap
  path = window.location.pathname

  if (path.indexOf("/poems") !== -1) {
    $("#header .poems").addClass("active");
  } else if (path.indexOf("/post") !== -1) {
    $("#header .blog").addClass("active");
  } else if (path.indexOf("/music") !== -1) {
      $("#header .music").addClass("active");
  } else if (path.indexOf("/doodles") !== -1) {
    $("#header .doodles").addClass("active");
  } else if (path.indexOf("/things") !== -1) { 
    $("#header .things").addClass("active");
  }

  $("#menu-toggle").click(function() {
    $("#header nav").slideToggle('slow');
  });
});
