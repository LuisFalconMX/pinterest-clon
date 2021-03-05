const gulp = require('gulp');
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer');

gulp.task('compile:css', () => {
  return gulp
    .src('./src/styles/index.css')
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(gulp.dest('./dist'))
});
