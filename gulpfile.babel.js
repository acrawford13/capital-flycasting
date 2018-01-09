import gulp from 'gulp';
import sass from 'gulp-sass';
import watch from 'gulp-watch';


gulp.task('watch', ()=>{return watch('src/scss/*.scss').pipe(sass()).pipe(gulp.dest('dest'))});
