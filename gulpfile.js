var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps');

var watchify = require('watchify');
var babelify = require('babelify');
var browserify = require('browserify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer')

var merge = require('utils-merge')
var glob = require('glob')

// Makes the bundle, logs errors, and saves to the destination.
function makeBundle(src, watcher, dst) {

  // This must return a function for watcher.on('update').
  return function() {

    // Logs the compilation.
    console.log('Compiling ' + src + ' -> ' + dst)

    // Bundles the example!, which then:
    return watcher.bundle()

      // Logs errors
      .on('error', function(err){
        console.log(err.message);
        this.emit('end');
      })

      // Uses our new bundle as the source for the sourcemaps.
      .pipe(source(dst))
      .pipe(buffer())

      // Creates the sourcemaps.
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('.'))

      // And writes that to the destination too.
      .pipe(gulp.dest(''))
  }
}

// Watchifies the examples and their local import trees for bundling.
function makeWatcher(src, dst) {
  var args = merge(watchify.args, { entries: [src],
                                    debug: true,
                                    fullPaths: true,
                                    extensions: [".es6", ".js"] });

  // The `watcher` watches, compiles from es6, and browserifies the entries given in `args`.
  var watcher = watchify(browserify(args)).transform(babelify)

  // `bundle` becomes a function that will be called on update.
  var bundle = makeBundle(src, watcher, dst);

  // Listens for updates.
  watcher.on('update', bundle);
  return bundle();
}

// Watches the example files.
gulp.task('watch', function (done) {

  // Find all source files in the `examples/` directory.
  var files = glob.sync('examples/**/*.es6');

  // filesWithWatchers will be an array of simple objects that each contain a
  // filename and a boolean that determines whether the file is currenty being watched.
  var filesWithWatchers = [];

  for (var i = 0; i < files.length; i++) {
    filesWithWatchers.push({ file: files[i], watching: false });
  }
  // Loop over all the files in the directory.
  filesWithWatchers.forEach(function (entry, i, entries) {

    // Don't let this loop finish.
    entries.remaining = entries.remaining || entries.length;

    // Get the destination for this bundle.
    var bundleDest = ('dist/' + entry.file).split('.')[0] + '/bundle.js';

    // Make a watcher unless the entry already has one.
    if (!entry.watching) {
      makeWatcher(entry.file, bundleDest);
      entry.watching = true;
    }
  });

  return;
});

// Builds the src/ files into lib/ for release.
gulp.task('build', function () {
    return gulp.src('src/**/*.es6')
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