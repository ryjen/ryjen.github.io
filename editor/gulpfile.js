
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');

gulp.task('css', function(){
  var cssSrc = gulp.src('src/css/*.css')
  
  var sasSrc = gulp.src('src/css/*.scss')
    .pipe(sass({ "bundleExec": true}).on('error', sass.logError))
    
  return merge(cssSrc, sasSrc)
    .pipe(minifyCSS())
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('public/css'))
});

gulp.task('js', function(){
  return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'))
});

gulp.task('default', [ 'css', 'js' ]);