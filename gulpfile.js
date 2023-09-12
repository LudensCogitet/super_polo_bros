var gulp = require("gulp"),
  webserver = require("gulp-webserver"),
  opn = require("opn"),
  concat = require("gulp-concat"),
  minifyCSS = require("gulp-minify-css"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify"),
  jshint = require("gulp-jshint"),
  minifyHTML = require("gulp-minify-html"),
  replaceHTML = require("gulp-html-replace"),
  rimraf = require("gulp-rimraf"),
  ignore = require("gulp-ignore"),
  zip = require("gulp-zip"),
  checkFileSize = require("gulp-check-filesize"),
  watch = require("gulp-watch"),
  serveDir = "./src",
  server = {
    host: "localhost",
    port: "5000",
  },
  distPaths = {
    build: "_build",
    assets_build: "_build/assets",
    js_build_file: "game.min.js",
    css_build_file: "game.min..css",
  },
  sourcePaths = {
    css: ["src/css/*.css"],
    js: [
    "src/js/global.js",
    "src/js/input.js",
    "src/js/physics.js",
    "src/js/gfx.js",
    "src/js/util.js",
    "src/js/sfx.js",
    "src/js/entities.js",
    "src/js/logic.js",
    "src/js/game.js"
  ],
    assets: ["src/assets/**/*.*"],
    mainHtml: ["src/index.html"],
  };

gulp.task("serve", function () {
  console.log("gulp serve");
  gulp.src(serveDir).pipe(
    webserver({
      host: server.host,
      port: server.port,
      fallback: "index.html",
      livereload: false,
      directoryListing: false,
      open: true,
    })
  );
});

gulp.task("openbrowser", function () {
  console.log("gulp openbrowser");

  opn("http://" + server.host + ":" + server.port);
});

gulp.task("buildCSS", function () {
  console.log("gulp buildCSS");

  return gulp
    .src(sourcePaths.css)
    .pipe(concat(distPaths.css_build_file))
    .pipe(minifyCSS())
    .pipe(gulp.dest(distPaths.build));
});

gulp.task("buildJS", function () {
  console.log("gulp buildJS");

  return gulp
    .src(sourcePaths.js)
    .pipe(concat(distPaths.js_build_file))
    .pipe(uglify({mangle: {properties: true}}))
    .pipe(gulp.dest(distPaths.build));
});

gulp.task("buildIndex", function () {
  console.log("gulp buildIndex");

  return gulp
    .src(sourcePaths.mainHtml)
    .pipe(
      replaceHTML({
        css: distPaths.css_build_file,
        js: distPaths.js_build_file,
      })
    )
    .pipe(minifyHTML())
    .pipe(rename("index.html"))
    .pipe(gulp.dest(distPaths.build));
});

gulp.task("moveAssets", function() {
  console.log("gulp moveAssets");
  
  return gulp
    .src(sourcePaths.assets)
    .pipe(gulp.dest(distPaths.assets_build));
});

gulp.task("cleanBuild", function () {
  console.log("gulp cleanBuild");

  return gulp
    .src("./_build/*", { read: false })
    .pipe(ignore(".gitignore"))
    .pipe(rimraf());
});

gulp.task("zipBuild", function () {
  console.log("gulp zipBuild");

  return gulp
    .src("./_build/**/*.*")
    .pipe(zip("game.zip"))
    .pipe(gulp.dest("./_dist"))
    .pipe(
      checkFileSize({
        fileSizeLimit: 16384,
      })
    );
});

gulp.task("watch", function () {
  console.log("gulp watch");

  gulp.watch(
    sourcePaths.css,
    gulp.series(gulp.parallel("buildCSS", "zipBuild"))
  );
  gulp.watch(sourcePaths.js, gulp.series(gulp.parallel("buildJS", "zipBuild")));
  gulp.watch(
    sourcePaths.mainHtml,
    gulp.series(gulp.parallel("buildIndex", "zipBuild"))
  );
});

gulp.task(
  "build",
  gulp.series(gulp.parallel("buildJS", "buildCSS", "buildIndex", "moveAssets", "zipBuild"))
);
gulp.task("default", gulp.series(gulp.parallel("build", "serve", "watch")));
