import gulp from 'gulp';
import sass from 'gulp-sass';
import watch from 'gulp-watch';
import autoprefixer from 'gulp-autoprefixer'

gulp.task('watch', ()=>{return watch('scss/*.scss')
                                .pipe(sass())
                                .pipe(autoprefixer())
                                .pipe(gulp.dest('css'))});

gulp.task('js:dev', ()=>{
    return gulp.src(['']).pipe(gulp.dest('js'));
});
gulp.task('css:dev', ()=>{
    return gulp.src(['grids-responsive*-min.css', 'pure-min.css'], {cwd: 'node_modules/purecss/build/'}).pipe(gulp.dest('css/purecss/'));
});
