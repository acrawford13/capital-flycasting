import { src, dest, task, parallel, series } from 'gulp';
import sass from 'gulp-sass';
import watch from 'gulp-watch';
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import htmlreplace from 'gulp-html-replace';
import rename from 'gulp-rename';

const defaultDest = '';

const getConsoleArg = key => process.argv.find(value => value.match(key)).split(':')[1];

const devSCSS = ({ savePath }) => src('src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(dest(`${savePath}/css`));

const devJS = ({ savePath }) => src('src/js/app.js')
    .pipe(babel({
        presets: ['env'],
    }))
    .pipe(dest(`${savePath}/js`));

const devTemplates = ({ savePath }) => src('src/templates/**/')
    .pipe(dest(`${savePath}/templates`));

const buildSCSS = () => src('src/scss/main.scss')
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(dest('css'));

const buildJS = () => src('src/js/app.js')
    .pipe(babel({
        presets: ['env'],
    }))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('js'));

const buildTemplates = () => src('src/templates/**/')
    .pipe(htmlreplace({
        js: '{% do assets.addJs(\'theme://js/app.min.js\', 100) %}',
        keepBlockTags: false
    }))
    .pipe(dest('templates'));


task('build:dev', ()=>{
    const savePath = getConsoleArg('dest') || defaultDest;
    devSCSS({ savePath });
    devJS({ savePath });
    devTemplates({ savePath });
});

const buildDev = task('build:dev');

task('watch', parallel([buildDev], function watching(){
    const savePath = getConsoleArg('dest') || defaultDest;
    watch('src/scss/**/*.scss', {verbose: true}, function(){
        devSCSS({ savePath });
    });

    watch('src/js/**/*.js', {verbose: true}, function(){
        devJS({ savePath });
    });

    watch('src/templates/**/', {verbose: true}, function(){
        devTemplates({ savePath });
    });
}));

task('build', parallel(
    buildSCSS,
    buildJS,
    buildTemplates
));

const build = task('build');

task('build:export', series(build, ()=> {
    src('./js/**', { base: '.' }).pipe(dest('export'));
    src('./css/**', { base: '.' }).pipe(dest('export'));
    src('./images/**', { base: '.' }).pipe(dest('export'));
    src('./blueprints/**', { base: '.' }).pipe(dest('export'));
    src('./templates/**', { base: '.' }).pipe(dest('export'));
    src('blueprints.yaml').pipe(dest('export'));
    src('capitalflycasting.yaml').pipe(dest('export'));
}));