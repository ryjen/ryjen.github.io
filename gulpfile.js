
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');
var order = require('gulp-order');
var uglify = require('gulp-uglify');
var del = require('del');

gulp.task('css', function(){
  del(['static/css/**/*'])

  var cssSrc = gulp.src([
    'src/css/*.css',
  ])
  
  var sasSrc = gulp.src('src/css/*.scss')
    .pipe(sass({errLogToConsole: true}))
    
  return merge(cssSrc, sasSrc)
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(concat('app.min.css'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('static/css'))
});

gulp.task('js', function(){
  del(['static/js/**/*'])

  return gulp.src([
      'src/js/*.js',
    ])
    .pipe(order([
        'simple.carousel.js',
        'app.js',
     ]))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('static/js'))
});


gulp.task('watch', function() {
    gulp.watch('src/css/*.scss', ['css']);
    gulp.watch('src/js/*.js', ['js']);
});

gulp.task('default', [ 'css', 'js' ]);

