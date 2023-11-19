/* eslint-disable no-console */
/* eslint-env node */

const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlreplace = require('gulp-html-replace');
const rename = require('gulp-rename');

const basePath = './';

function devSCSS(cb) {
    src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(dest(`${basePath}css`));
    cb();
}

function devJS(cb) {
    src('src/js/app.js')
        .pipe(
            babel({
                presets: ['env']
            })
        )
        .pipe(dest(`${basePath}js`));
    cb();
}

function devTemplates(cb) {
    src('src/templates/**/*').pipe(dest(`${basePath}templates`));
    cb();
}

function buildSCSS(cb) {
    src('src/scss/main.scss')
        .pipe(autoprefixer())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(dest('css'));
    cb();
}

function buildJS(cb) {
    src('src/js/app.js')
        .pipe(
            babel({
                presets: ['env']
            })
        )
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('js'));
    cb();
}

function buildTemplates(cb) {
    src('src/templates/**/')
        .pipe(
            htmlreplace({
                js: '{% do assets.addJs(\'theme://js/app.min.js\', 100) %}',
                keepBlockTags: false
            })
        )
        .pipe(dest('templates'));
    cb();
}

const buildDev = series(devSCSS, devJS, devTemplates);

function devBuildTasks(cb) {
    watch('src/scss/**/*.scss', devSCSS);
    watch('src/js/**/*.js', devJS),
    watch('src/templates/**/*', devTemplates);
    cb();
}

const build = series(buildSCSS, buildJS, buildTemplates);

function buildExport(cb) {
    src('./js/**', { base: '.' }).pipe(dest(`${basePath}export`));
    src('./css/**', { base: '.' }).pipe(dest(`${basePath}export`));
    src('./images/**', { base: '.' }).pipe(dest(`${basePath}export`));
    src('./blueprints/**', { base: '.' }).pipe(dest(`${basePath}export`));
    src('./templates/**', { base: '.' }).pipe(dest(`${basePath}export`));
    src('blueprints.yaml').pipe(dest(`${basePath}export`));
    src('capitalflycasting.yaml').pipe(dest(`${basePath}export`));
    cb();
}



exports['build:dev'] = buildDev;
exports.build = build;
exports['build:export'] = series(build, buildExport);
exports.watch = series(buildDev, devBuildTasks);