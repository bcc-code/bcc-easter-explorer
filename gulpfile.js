const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const mode = require('gulp-mode')();
const { src, series, parallel, dest, watch } = require('gulp');

const htmlPath = 'src/*.html';
const jsPath = 'src/assets/js/scripts.js';
const jsHelpers = 'src/assets/js/helpers/*.js';
const jsPlugins = 'src/assets/js/third-party/**/*.js';
const cssPath = 'src/assets/scss/**/*.scss';

function copyHtml() {
    return src('src/*.html').pipe(gulp.dest('dist'));
}

function imgTask() {
    return src('src/images/*').pipe(imagemin()).pipe(gulp.dest('dist/images'));
}

function jsonTask() {
    return src('src/assets/data/**/*').pipe(gulp.dest('dist/assets/data'));
}

function audioTask() {
    return src('src/audio/*').pipe(gulp.dest('dist/audio'));
}

function jsTask() {
    return src([jsPlugins, jsHelpers, jsPath])
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/assets/js'))
        .pipe(mode.development(browserSync.stream()));
}

function scssTask() {

    var plugin = [
        autoprefixer(),
        cssnano()
    ]

    return src(cssPath)
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(sass())
        .pipe(postcss(plugin))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/assets/css'))
        .pipe(mode.development(browserSync.stream()));
}

function watchTask() {
    browserSync.create();
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });

    watch([htmlPath], { interval: 1000 }, copyHtml).on('change', browserSync.reload);
    watch([cssPath, jsPath], { interval: 1000 }, parallel(scssTask, jsonTask, jsTask));
}

exports.copyHtml = copyHtml;
exports.imgTask = imgTask;
exports.audioTask = audioTask;
exports.jsTask = jsTask;
exports.jsonTask = jsonTask;
exports.scssTask = scssTask;

var isProduction = mode.production();
if (isProduction) {
    exports.default = series(parallel(copyHtml, imgTask, audioTask, jsonTask, jsTask, scssTask));
}
else {
    exports.default = series(parallel(copyHtml, imgTask, audioTask, jsonTask, jsTask, scssTask), watchTask);
}