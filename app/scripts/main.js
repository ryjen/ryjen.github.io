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

$('a[data-toggle="tab"]').click(function(e) {
    e.preventDefault();

    var tabId = $(this).attr('href');

    $('.tab-pane').each(function(i, t) {
        $(this).removeClass('active');
        $(this).fadeOut();
    });

    $('.tabs[role="tablist"] li').each(function(i, t) {
        $(this).removeClass('active');
    });

    $(tabId).fadeIn();
    $(tabId).addClass('active');
    $(this).parent().addClass('active');
});
