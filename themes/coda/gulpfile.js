var gulp = require("gulp");
var sass = require("gulp-sass");
var minifyCSS = require("gulp-csso");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var merge = require("merge-stream");
var order = require("gulp-order");
var uglify = require("gulp-uglify");
var bust = require("gulp-buster");
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var imgmin = require("gulp-imagemin");
var del = require("del");

const isProduction = process.env.NODE_ENV == "production";

gulp.task("clean", function() {
  return del([
    "static/css/**/*",
    "static/js/**/*",
    "static/font/**/*",
    "static/image/**/*"
  ]);
});

gulp.task("css", function() {
  var cssSrc = gulp.src([
    "node_modules/skeleton-css/css/*.css",
    "src/css/*.css",
  ]);

  var sasSrc = gulp
    .src([
      "src/css/*.scss",
    ])
    .pipe(sass({ errLogToConsole: true }));

  var sources = merge(cssSrc, sasSrc).pipe(
    order([
      "normalize.css",
      "skeleton.css",
      "main.css",
      "coda.scss",
      "print.css"
    ])
  );

  if (!isProduction) {
    sources = sources.pipe(sourcemaps.init());
  }

  sources = sources
    .pipe(postcss([ autoprefixer() ]))
    .pipe(minifyCSS()).pipe(concat("theme.min.css"));

  if (!isProduction) {
    sources = sources.pipe(sourcemaps.write("maps"));
  }

  return sources
    .pipe(gulp.dest("static/css"))
    .pipe(bust({ fileName: "hash.json" }))
    .pipe(gulp.dest("data/css"));
});

gulp.task("js", function() {

  gulp.src([
    "node_modules/@fortawesome/fontawesome-free/js/brands.js",
    "node_modules/@fortawesome/fontawesome-free/js/solid.js",
    "node_modules/@fortawesome/fontawesome-free/js/regular.js",
    "node_modules/@fortawesome/fontawesome-free/js/fontawesome.js",
    "node_modules/jquery/dist/jquery.slim.js"
  ])
    .pipe(order(["jquery.slim.js"]))
    .pipe(uglify())
    .pipe(concat("vendor.min.js"))
    .pipe(gulp.dest("static/js"));

  var sources = gulp
    .src([
      "src/js/*.js",
    ])

  if (!isProduction) {
    sources = sources.pipe(sourcemaps.init());
  }

  sources = sources.pipe(uglify()).pipe(concat("theme.min.js"));

  if (!isProduction) {
    sources = sources.pipe(sourcemaps.write("maps"));
  }

  return sources
    .pipe(gulp.dest("static/js"))
    .pipe(bust({ fileName: "hash.json" }))
    .pipe(gulp.dest("data/js"));
});

gulp.task("image", function() {
  return gulp.src("src/image/**/*").pipe(imgmin()).pipe(gulp.dest("static/image"));
});

gulp.task("font", function() {
  return gulp
    .src(["node_modules/@fortawesome/fontawesome-free/webfonts/**/*"])
    .pipe(gulp.dest("static/fonts"));
});

gulp.task("watch", function() {
  gulp.watch("src/css/**/*", ["css"]);
  gulp.watch("src/js/**/*", ["js"]);
  gulp.watch("src/image/**/*", ["image"]);
  gulp.watch("src/fonts/**/*", ["font"]);
});

gulp.task(
  "default",
  gulp.series("clean", gulp.parallel("css", "js", "image", "font"))
);
