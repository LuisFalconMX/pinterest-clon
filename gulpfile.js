const gulp = require('gulp')
const rename = require('gulp-rename')
const clean = require('gulp-clean')
const postcss = require('gulp-postcss')
const postcssEasyImport = require('postcss-easy-import')
const autoprefixer = require('autoprefixer')
const sugarss = require('sugarss')
const pug = require('gulp-pug')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const imagemin = require('gulp-imagemin')

gulp.task('compile:postcss', () => {
  return gulp
    .src('./src/styles/index.sss')
    .pipe(postcss([
      postcssEasyImport(),
      autoprefixer(),
    ],
    { parser: sugarss }
    ))
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('compile:pug', () => {
  return gulp
    .src('./src/views/pages/**/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('compile:images', () => {
  return gulp
    .src('./src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'))
})

gulp.task('create:dist', () => {
  return gulp
    .src('./')
    .pipe(gulp.dest('./dist/'))
})

gulp.task('clean:dist', () => {
  return gulp
    .src('./dist/')
    .pipe(clean())
})

gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  })

  gulp.watch('./src/styles/**/*.sss', gulp.series(['compile:postcss'])).on('change', reload)
  gulp.watch('./src/views/**/*.pug', gulp.series(['compile:pug'])).on('change', reload)
})

gulp.task('dev', gulp.series(['create:dist', 'clean:dist', 'compile:postcss', 'compile:pug', 'compile:images', 'server']))
