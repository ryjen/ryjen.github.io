
var Themer = (function() {

  var themer = {};

  var currTheme = localStorage.getItem('theme');

  function isLight() {
    return currTheme === 'light';
  }

  function toggleName() {
    return isLight() ? "shadowize" : "enlighten";
  }

  function toggle() {

    newTheme = isLight() ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);

    $('body').removeClass(currTheme).addClass(newTheme);
    $('#themer').html(toggleName());

    currTheme = newTheme;
  }

  themer.start = function() {
    if (!currTheme) {
      currTheme = 'dark';
    }
    button = $("#themer");
    button.on('click', toggle);
    button.html(toggleName());
    $('body').addClass(currTheme);
  }
  return themer;
})();
    