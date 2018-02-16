import gulp from 'gulp';
import sass from 'gulp-sass';
import watch from 'gulp-watch';
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import pump from 'pump';

gulp.task('watch', ()=>{
    watch('scss/**/*.scss', {verbose: true}, function(){
        gulp.src('scss/main.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(gulp.dest('css'))
    });

    watch('src-js/*.js', {verbose: true}, function(){
        gulp.src('src-js/app.js')
               .pipe(babel({
                   presets: ['env'],
               }))
               .pipe(gulp.dest('js'));
    });
})

gulp.task('js:build', (cb)=>{
    pump([
        gulp.src('src-js/app.js'),
        babel({
            presets: ['env']
        }),
        uglify(),
        gulp.dest('js')
    ],
    cb)
});

gulp.task('css:dev', ()=>{
    return gulp.src(['grids-responsive*-min.css', 'pure-min.css'], {cwd: 'node_modules/purecss/build/'}).pipe(gulp.dest('css/purecss/'));
});
