var gulp = require('gulp');
var tape = require('gulp-tape');
var babel = require('gulp-babel');
var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps');

var watchify = require('watchify');
var babelify = require('babelify');
var browserify = require('browserify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer')

var colorize = require('tap-colorize');
var merge = require('utils-merge')
var glob = require('glob')

function make_bundle(w) {
  return function() {
    return w.bundle()
      .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(gulp.dest('dist'))
      .pipe(rename('bundle.js'))
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'))
  }
}

gulp.task('watch', function () {
  var files = glob.sync('./src/**/*.js');
  var args = merge(watchify.args, { entries: files,
                                    debug: true,
                                    fullPaths: true });

  var w = watchify(browserify(args), { poll: true }).transform(babelify)
  var bundle = make_bundle(w);
  w.on('update', bundle);
  return bundle();
});

gulp.task('build', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib/'));
});

gulp.task('test', function() {
  return gulp.src('test/*.js')
    .pipe(tape({
      reporter: colorize()
    }));
});