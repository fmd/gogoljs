var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tape = require('gulp-tape');
var tapColorize = require('tap-colorize');

gulp.task('browserify', function () {
  browserify({
    entries: 'main.js',
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('build', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib/'));
});

gulp.task('test', function() {
  return gulp.src('test/*.js')
    .pipe(tape({
      reporter: tapColorize()
    }));
});