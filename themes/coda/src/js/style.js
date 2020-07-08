
$(document).ready(function() {
  $("blockquote").each( function(index, value) {
    value.prepend($("<span class=\"quote left\"></span>").get(0))
    value.append($("<span class=\"quote right\"></span>").get(0))
  })
})
