import gulp from 'gulp';
import sass from 'gulp-sass';
import watch from 'gulp-watch';
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import pump from 'pump';
import htmlreplace from 'gulp-html-replace';

const devSCSS = () => {
    gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('css'));
};

const devJS = () => {
    gulp.src('src/js/app.js')
            .pipe(babel({
                presets: ['env'],
            }))
            .pipe(gulp.dest('js'));
};

const devTemplates = () => {
    gulp.src('src/templates/**/')
        .pipe(gulp.dest('templates'));
};

const buildSCSS = () => {
    gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('css'));
};

const buildJS = () => {
    console.log('building javascript');
    gulp.src('src/js/app.js')
        .pipe(babel({
            presets: ['env'],
        }))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
};

const buildTemplates = () => {
    gulp.src('src/templates/**/')
        .pipe(htmlreplace({ js: "{% do assets.addJs('theme://js/app.min.js', 100) %}"}))
        .pipe(gulp.dest('templates'));
};

const buildDevFiles = ()=>{
    devSCSS();
    devJS();
    devTemplates();
};

gulp.task('watch', ()=>{
    buildDevFiles();

    watch('src/scss/**/*.scss', {verbose: true}, function(){
        devSCSS();
    });

    watch('src/js/**/*.js', {verbose: true}, function(){
        devJS();
    });

    watch('src/templates/**/', {verbose: true}, function(){
        devTemplates();
    });
});

gulp.task('build:dev', buildDevFiles);

gulp.task('build:dist', () => {
   buildSCSS();
   buildJS();
   buildTemplates();
});

gulp.task('js:build', (cb)=>{
    pump([
        gulp.src('src/templates/base.html.twig'),
        htmlreplace({ js: "{% do assets.addJs('theme://js/app.min.js', 100) %}"}),
        gulp.dest('templates'),

        gulp.src('src/js/app.js'),
        babel({
            presets: ['env']
        }),
        uglify(),
        gulp.dest('js')
    ],
    cb);
});

gulp.task('css:dev', ()=>{
    return gulp.src(['grids-responsive*-min.css', 'pure-min.css'], {cwd: 'node_modules/purecss/build/'}).pipe(gulp.dest('css/purecss/'));
});
