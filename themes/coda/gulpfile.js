
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');
var order = require("gulp-order");
var uglify = require("gulp-uglify");
var bust = require("gulp-buster");
var del = require("del");

gulp.task('clean', function() {
  del(['static/css/**/*'])
  del(['static/js/**/*'])
  del(['static/font/**/*'])
  del(['static/image/**/*'])
});

gulp.task('css', function(){

  var cssSrc = gulp.src([
      'src/css/*.css',
      'node_modules/skeleton-css/css/*.css',
      'node_modules/font-awesome/css/font-awesome.css',
    ])
  
  var sasSrc = gulp.src([
      'src/css/*.scss',
    ])
    .pipe(sass({errLogToConsole: true}))
    
  return merge(cssSrc, sasSrc)
    .pipe(order([
        "normalize.css",
        "skeleton.css",
        "main.css",
        "coda.css",
        "print.css"
    ]))
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(concat('theme.min.css'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('static/css'))
    .pipe(bust({ fileName: 'hash.json' }))
    .pipe(gulp.dest('data/css'))
});

gulp.task('js', function(){

  return gulp.src([
      'src/js/*.js',
      'node_modules/particles.js/particles.js',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/highlightjs/highlight.pack.js',
     ])
    .pipe(order([
      'modernizr.js',
      'highlight.pack.js',
      'jquery.js',
    ]))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('theme.min.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('static/js'))
    .pipe(bust({ fileName: 'hash.json'}))
    .pipe(gulp.dest('data/js'))
});

gulp.task('image', function() {
  return gulp.src('src/image/**/*')
      .pipe(gulp.dest('static/image'))
})

gulp.task('font', function() {
  return gulp.src([
      'node_modules/font-awesome/fonts/**/*',
    ])
    .pipe(gulp.dest('static/fonts'))
})

gulp.task('watch', function() {
    gulp.watch('src/css/**/*', ['css']);
    gulp.watch('src/js/**/*', ['js']);
    gulp.watch('src/image/**/*', ['image']);
    gulp.watch('src/fonts/**/*', ['font']);
});

gulp.task('default', [ 'clean', 'css', 'js', 'image', 'font' ]);