const gulp = require('gulp');

const terser = require('gulp-terser');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const prettyError = require('gulp-prettyerror');

gulp.task('scripts', function () {
  return gulp
    .src('./js/*.js') 
    .pipe(terser()) 
    .pipe(rename({ extname: '.min.js' })) 
    .pipe(gulp.dest('./build/js')); 
});

gulp.task('watch', function () {
  gulp.watch('./js/*.js', gulp.series('lint', 'scripts', 'reload'));
  gulp.watch('./sass/*.scss', gulp.series('sass', 'reload'));
  gulp.watch('./html/*.css', gulp.series('reload'));
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});


gulp.task('sass', function () {
  return gulp
    .src('./sass/styles.scss')
    .pipe(prettyError())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./build/css'));
});

//style sass file. if there are changes, run the style task

gulp.task('reload', function (done) {
  browserSync.reload();
  done();
});

gulp.task('lint', function () {
  return gulp
    .src(['./js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});

gulp.task('default', gulp.parallel('scripts', 'sass', 'watch', 'browser-sync'))