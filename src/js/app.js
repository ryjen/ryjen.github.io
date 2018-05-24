var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

$(function() {
    var gallery = $("#doodle-gallery");
    if (gallery.length) {
        gallery.tile();
        $(window).resize(function() {
            waitForFinalEvent(function() {
                $("#doodle-gallery").tile();
            });
        });
    }
});

