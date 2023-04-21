const { src, dest, watch, parallel } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");

const uglify = require("gulp-uglify-es").default;
const browser = require("browser-sync").create();

function styles() {
  return src("app/src/scss/style.scss")
    .pipe(autoprefixer({ overrideBrowsersList: ["last 10 version"] }))
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(dest("app/src/css"))
    .pipe(browser.stream());
}

function scripts() {
  return src([
    // "app/src/js/main.js",
    "node_modules/swiper/swiper-bundle.js",
    "app/src/js/*.js",
    "!app/js/main.min.js",
  ])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/src/js"))
    .pipe(browser.stream());
}

function watching() {
  watch(["app/src/scss/style.scss"], styles);
  watch(["app/src/js/main.js"], scripts);
  watch(["app/*.html"]).on("change", browser.reload);
}

function browserSync() {
  browser.init({
    server: {
      baseDir: "app/",
    },
  });
}

exports.styles = styles;
exports.scripts = scripts;

exports.watching = watching;
exports.browsersync = browserSync;

exports.default = parallel(styles, scripts, browserSync, watching);
