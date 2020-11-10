
var App = (function () {
  // modules
  var app = {};

  app.start = function() {
    Gallery.start();
    Themer.start();
  };

  return app;
})();

$(document).ready(function () {
  App.start();
});

