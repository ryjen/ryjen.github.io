var Themer = (function() {

  var themer = {}

  var currTheme = localStorage.getItem('theme')

  function isLight() {
    return currTheme === 'light'
  }

  function toggleName() {
    return isLight() ? "shadowize" : "enlighten"
  }

  function toggle() {
    newTheme = isLight() ? 'dark' : 'light'
    localStorage.setItem('theme', newTheme)
    $('body').removeClass(currTheme).addClass(newTheme)
    currTheme = newTheme
    $('#themer').html(toggleName())
  }

  themer.toggle = toggle

  themer.start = function() {
    if (!currTheme) {
      currTheme = 'light'
    }
    button = $("#themer")
    button.click(toggle)
    button.html(toggleName())
    $('body').addClass(currTheme)
  }

  return themer
})()