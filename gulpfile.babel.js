import gulp from 'gulp';
import sass from 'gulp-sass';
import watch from 'gulp-watch';


gulp.task('watch', ()=>{return watch('scss/*.scss').pipe(sass()).pipe(gulp.dest('css'))});
gulp.task('js:dev', ()=>{
    return gulp.src(['node_modules/jquery-parallax.js/parallax.min.js']).pipe(gulp.dest('js'));
});
