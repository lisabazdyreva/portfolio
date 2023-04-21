const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");

const uglify = require("gulp-uglify-es").default;
const browser = require("browser-sync").create();

const clean = require("gulp-clean");

function styles() {
  return src("app/src/scss/*.scss")
    .pipe(autoprefixer({ overrideBrowsersList: ["last 10 version"] }))
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(dest("app/src/css"))
    .pipe(browser.stream());
}

function scripts() {
  return src(["app/src/js/*.js", "!app/src/js/main.min.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/src/js"))
    .pipe(browser.stream());
}

function watching() {
  watch(["app/src/scss/*.scss"], styles);
  watch(["app/src/js/*.js", "!app/src/js/main.min.js"], scripts);
  watch(["app/*.html"]).on("change", browser.reload);
}

function browserSync() {
  browser.init({
    server: {
      baseDir: "app/",
    },
  });
}

function cleanDist() {
  return src("dist").pipe(clean());
}

function building() {
  return src(
    ["app/src/css/style.min.css", "app/src/js/main.min.js", "app/*.html"],
    { base: "app" }
  ).pipe(dest("dist"));
}

exports.styles = styles;
exports.scripts = scripts;

exports.watching = watching;
exports.browsersync = browserSync;

exports.default = parallel(styles, scripts, browserSync, watching);
exports.build = series(cleanDist, building);
