
$(function() {

	switch(window.location.pathname) {
		case '/post/':
			$("#header .blog").addClass("active");
			break;
		case '/music/':
			$("#header .music").addClass("active");
			break;
		case '/things/':
			$("#header .things").addClass("active");
	}
})