if (window.location.hostname == 'arg3.com' || window.location.hostname == 'arg3.net' ||
    window.location.hostname == 'entrobert.com' || window.location.hostname == 'deadcoda.com') {
    window.location.hostname = 'ryan-jennings.net';
};

$('#open-source').githubWidget({
    'user': "ryjen",
    'widget': "repos",
    'title': "",
    'extrainfo': "true",
    'limit': 0,
    'footer': "auto"
});
