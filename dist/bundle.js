(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine = (function () {
  function Engine() {
    _classCallCheck(this, Engine);

    this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    console.log('ok2');
  }

  _createClass(Engine, [{
    key: "version",
    get: function get() {
      return 'v0.1.0';
    }
  }]);

  return Engine;
})();

module.exports = Engine;

},{}],2:[function(require,module,exports){
'use strict';

var _exports = module.exports = {};

_exports.Engine = require('./engine');
_exports.Scene = require('./scene');

},{"./engine":1,"./scene":3}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Scene = (function () {
  function Scene() {
    _classCallCheck(this, Scene);
  }

  _createClass(Scene, [{
    key: 'name',
    get: function get() {
      return 'Basic Scene';
    }
  }]);

  return Scene;
})();

module.exports = Scene;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvdmFyL3d3dy9wcm9qZWN0cy9qcy9nb2dvbGpzL3NyYy9lbmdpbmUuanMiLCIvdmFyL3d3dy9wcm9qZWN0cy9qcy9nb2dvbGpzL3NyYy9pbmRleC5qcyIsIi92YXIvd3d3L3Byb2plY3RzL2pzL2dvZ29sanMvc3JjL3NjZW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0lDQU0sTUFBTTtBQUNDLFdBRFAsTUFBTSxHQUNJOzBCQURWLE1BQU07O0FBRVIsUUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNoRixXQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQ3BCOztlQUpHLE1BQU07O1NBTUMsZUFBRztBQUNaLGFBQU8sUUFBUSxDQUFBO0tBQ2hCOzs7U0FSRyxNQUFNOzs7QUFXWixNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQTs7Ozs7QUNYdkIsSUFBSSxRQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7O0FBRWxDLFFBQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3JDLFFBQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUNIN0IsS0FBSztBQUNFLFdBRFAsS0FBSyxHQUNLOzBCQURWLEtBQUs7R0FHUjs7ZUFIRyxLQUFLOztTQUtELGVBQUc7QUFDVCxhQUFPLGFBQWEsQ0FBQTtLQUNyQjs7O1NBUEcsS0FBSzs7O0FBVVgsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgRW5naW5lIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5nbCA9IGNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2xcIikgfHwgY2FudmFzLmdldENvbnRleHQoXCJleHBlcmltZW50YWwtd2ViZ2xcIik7XG4gICAgY29uc29sZS5sb2coJ29rMicpO1xuICB9XG5cbiAgZ2V0IHZlcnNpb24oKSB7XG4gICAgcmV0dXJuICd2MC4xLjAnXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbmdpbmVcbiIsInZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuZXhwb3J0cy5FbmdpbmUgPSByZXF1aXJlKCcuL2VuZ2luZScpO1xuZXhwb3J0cy5TY2VuZSA9IHJlcXVpcmUoJy4vc2NlbmUnKTsiLCJjbGFzcyBTY2VuZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gJ0Jhc2ljIFNjZW5lJ1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2NlbmUiXX0=
