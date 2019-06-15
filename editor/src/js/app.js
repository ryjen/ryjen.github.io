const authToken = "8E75C69C881A472F3F563835D6A89";

$(function() {
  $("#post-submit").click(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "https://jenkins.micrantha.com/generic-webhook-trigger/invoke",
      data: {
        content: $("post-content").text(),
        file_name: $("post-file-name").text()
      },
      dataType: "json",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-Auth-Token', authToken);
      }),
      success: function(result) {
        alert("Posted.");
      },
      failure: function(result) {
        alert("An error occured posting.");
      }
    });
  });
});

