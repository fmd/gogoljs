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

function make_bundle(w, d) {
  return function() {
    console.log(d)
    return w.bundle()
      .pipe(source(d))
      .pipe(buffer())
      .pipe(gulp.dest(''))
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(''))
  }
}

function make_watch(s, d) {
  var args = merge(watchify.args, { entries: [s],
                                    debug: true,
                                    fullPaths: true });

  var w = watchify(browserify(args), { poll: true }).transform(babelify)
  var bundle = make_bundle(w, d);
  w.on('update', bundle);
  return bundle();
}

// Watches the example files.
gulp.task('watch', function (done) {
  var files = glob.sync('examples/**/*.js');
  console.log(files);

  files.forEach(function (entry, i, entries) {
    entries.remaining = entries.remaining || entries.length;
    make_watch(entry, ('dist/' + entry).split('.')[0] + '/bundle.js')
  });

  return;
});

// Builds the src/ files into lib/ for release.
gulp.task('build', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib/'));
});

// Runs the tests.
gulp.task('test', ['build'], function() {
  return gulp.src('test/*.js')
    .pipe(tape({
      reporter: colorize()
    }));
});