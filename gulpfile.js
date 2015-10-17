var gulp = require('gulp');
var tape = require('gulp-tape');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

var watchify = require('watchify');
var babelify = require('babelify');
var browserify = require('browserify');

var source = require('vinyl-source-stream');
var tapColorize = require('tap-colorize');

function watch_compile(b) {
  b.transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));
}

gulp.task('watch', function () {
  var b = watchify(browserify({
    entries: 'src/index.js',
    debug: true
  }));

  b.on('update', function(){
    watch_compile(b);
  });

  watch_compile(b);
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