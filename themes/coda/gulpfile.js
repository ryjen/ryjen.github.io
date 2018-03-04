
var gulp = require('gulp');
var scss = require('gulp-scss');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');
var order = require("gulp-order");

gulp.task('css', function(){
  var cssSrc = gulp.src('src/css/*.css')
    .pipe(order([
        "normalize.css",
        "skeleton.css",
        "main.css",
        "coda.css",
        "print.css"
    ]))
  
  var sasSrc = gulp.src('src/css/*.scss')
    .pipe(scss({ "bundleExec": true}))
    
  return merge(cssSrc, sasSrc)
    .pipe(minifyCSS())
    .pipe(concat('coda.min.css'))
    .pipe(gulp.dest('static/css'))
});

gulp.task('js', function(){
  return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('coda.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('static/js'))
});

gulp.task('default', [ 'css', 'js' ]);