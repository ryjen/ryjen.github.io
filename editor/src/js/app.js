const authToken = "8E75C69C881A472F3F563835D6A89";

const validFileName = /[a-z\-]+/;

function showMessage(msg, type = "success") {

  var msgs = $("#messages .container");

  var err = msgs.append(document.createElement("div"))
    .addClass(type).addClass("message").text(msg);

  $("#messages").fadeIn().delay(2000).fadeOut(function() {
    err.remove();
  });
}

$(function() {

  $("#post-submit").click(function(e) {
    e.preventDefault();

    if (!validFileName.test($("#post-file").val())) {
      showMessage("invalid file name", "error");
      return;
    }

    $.ajax({
      type: "POST",
      url: "https://jenkins.micrantha.com/webhook/invoke",
      crossDomain: true,
      data: JSON.stringify({
        content: btoa($("#post").text()),
        file_name: $("#post-file").val()
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      headers: {
        'Authorization': "Bearer " + authToken
      },
      success: function(result) {
        console.log(result);
        showMessage("Posted.");
      },
      failure: function(result) {
        console.log(result);
        showMessage("An error occured posting.", "error");
      }
    });
  });
});

