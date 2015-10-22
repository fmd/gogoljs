"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine = function Engine(canvasId) {
  _classCallCheck(this, Engine);

  this.canvas = document.getElementById(canvasId);
};

exports.Engine = Engine;