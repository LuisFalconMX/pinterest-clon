const gulp = require('gulp')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const sugarss = require('sugarss')
const pug = require('gulp-pug')
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

gulp.task('compile:css', () => {
  return gulp
    .src('./src/styles/index.sss')
    .pipe(postcss([
      autoprefixer(),
    ],
    { parser: sugarss }
    ))
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('compile:pug', () => {
  return gulp
    .src('./src/views/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  });

  gulp.watch('./src/styles/**/*.css', gulp.series(['compile:css'])).on('change', reload);
  gulp.watch('./src/views/**/*.pug', gulp.series(['compile:pug'])).on('change', reload);
});