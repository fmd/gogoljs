(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/fareeddudhia/vagrant-dev/www/projects/js/gogoljs/examples/square.es6":[function(require,module,exports){
'use strict';

var gogol = require('../src');

var e = new gogol.Engine();

},{"../src":"/Users/fareeddudhia/vagrant-dev/www/projects/js/gogoljs/src/index.es6"}],"/Users/fareeddudhia/vagrant-dev/www/projects/js/gogoljs/src/engine.js":[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Engine = function Engine() {
  _classCallCheck(this, Engine);

  console.log('Initialized Gogol 2222asdasdasdasd.');
};

module.exports = Engine;

},{}],"/Users/fareeddudhia/vagrant-dev/www/projects/js/gogoljs/src/index.es6":[function(require,module,exports){
'use strict';

var _exports = module.exports = {};

_exports.Engine = require('./engine');
_exports.Scene = require('./scene');

},{"./engine":"/Users/fareeddudhia/vagrant-dev/www/projects/js/gogoljs/src/engine.js","./scene":"/Users/fareeddudhia/vagrant-dev/www/projects/js/gogoljs/src/scene.js"}],"/Users/fareeddudhia/vagrant-dev/www/projects/js/gogoljs/src/scene.js":[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Scene = function Scene() {
  _classCallCheck(this, Scene);

  console.log('Added Scene.');
};

module.exports = Scene;

},{}]},{},["/Users/fareeddudhia/vagrant-dev/www/projects/js/gogoljs/examples/square.es6"])


//# sourceMappingURL=bundle.js.map
