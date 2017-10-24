exports.config = {
    // See http://brunch.io/#documentation for docs.
    files : {
        javascripts :
            { joinTo : { 'javascripts/app.js' : /^app/, 'javascripts/vendor.js' : /^(bower_components|vendor)/} },
        stylesheets : { joinTo : 'css/app.css' }
    },

    paths : {
        // Where to compile files to
        public : "static",
        watched : [ "app", "vendor" ]
    },

    npm : { enabled : false },

    modules : { wrapper : false, definition : false },

    // Configure your plugins
    plugins : {
        babel : {
            // Do not use ES6 compiler in vendor code
            ignore : [ /^(web\/static\/vendor)/]
        },
        sass : { allowCache : true },
        uglify : { magle : false, compress : true },
        cleancss : { keepSpecialComments : 0, removeEmpty : true }
    }
};
