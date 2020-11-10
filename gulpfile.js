
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');
var order = require('gulp-order');
var uglify = require('gulp-uglify');
var del = require('del');
var imagemin = require('gulp-imagemin');

const isProduction = process.env.NODE_ENV == 'production'

gulp.task('clean', function() {
  return del([
    'static/css/**/*',
    'static/js/**/*'
  ]);
});

gulp.task('css', function(){

  var cssSrc = gulp.src([
    'src/css/*.css',
  ])
  
  var sasSrc = gulp.src('src/css/*.scss')
    .pipe(sass({errLogToConsole: true}))
    
  var sources = merge(cssSrc, sasSrc)

  if (!isProduction) {
    sources = sources.pipe(sourcemaps.init())
  }
  
  sources = sources.pipe(minifyCSS())
    .pipe(concat('app.min.css'))

  if (!isProduction) {
    sources = sources.pipe(sourcemaps.write('maps'))
  }
    
  return sources.pipe(gulp.dest('static/css'))
});

gulp.task('js', function(){

  var sources = gulp.src([
      'src/js/*.js',
    ])
    .pipe(order([
      'gallery.js',
      'theme_switch.js',
      'app.js',
    ]))

  if (!isProduction) {
    sources = sources.pipe(sourcemaps.init())
  }
  
  sources = sources.pipe(uglify())
    .pipe(concat('app.min.js'))

  if (!isProduction) {
    sources = sources.pipe(sourcemaps.write('maps'))
  }
  return sources.pipe(gulp.dest('static/js'))
});

gulp.task('img', function() {
  var sources = gulp.src([
    'src/img/**',
  ])

  sources = sources.pipe(imagemin())

  return sources.pipe(gulp.dest('static/image'))
});

gulp.task('watch', function() {
    gulp.watch('src/css/*.scss', ['css']);
    gulp.watch('src/js/*.js', ['js']);
});

gulp.task('default', gulp.series('clean', gulp.parallel('css', 'js', 'img')));

