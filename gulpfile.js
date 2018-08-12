
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');
var order = require('gulp-order');
var uglify = require('gulp-uglify');
var hash = require('gulp-hash');
var del = require('del');

gulp.task('css', function(){
  del(['static/css/**/*'])

  var cssSrc = gulp.src('src/css/*.css')
  
  var sasSrc = gulp.src('src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    
  return merge(cssSrc, sasSrc)
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(concat('app.min.css'))
    .pipe(hash())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('static/css'))
    .pipe(hash.manifest('hash.json'))
    .pipe(gulp.dest('data/css'))
});

gulp.task('js', function(){
  del(['static/js/**/*'])

  return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(hash())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('static/js'))
    .pipe(hash.manifest('hash.json'))
    .pipe(gulp.dest('data/js'))
});

gulp.task('image', function() {

  del(['static/image/*-[0-9a-e]+.*'])

  return gulp.src([
    'src/image/**/*'
    ])
    .pipe(hash())
    .pipe(gulp.dest('static/image'))
    .pipe(hash.manifest('hash.json'))
    .pipe(gulp.dest('data/image'))
});

gulp.task('watch', function() {
    gulp.watch('src/css/*.scss', ['css']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/image/**/*', ['image']);
});

gulp.task('default', [ 'css', 'js', 'image' ]);

