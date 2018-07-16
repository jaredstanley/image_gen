/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _seed = 0;
var blendModeArr = ["source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
exports.createNewPoint = function (p1, p2, iter) {
  // console.log(this);
  var p = {};
  var xx = (p1.x + p2.x) / 2;
  var yy = (p1.y + p2.y) / 2;
  var rnd = this.getRandom() + this.getRandom() + this.getRandom() + this.getRandom() + this.getRandom() + this.getRandom() - 3 / 3;
  rnd *= Math.min(Math.pow(rnd, rnd), rnd * 3.5);
  // console.log(iter, rnd);
  var ang = rnd * (2 * Math.PI);

  var x = xx + rnd * Math.cos(ang);
  var y = yy + rnd * Math.sin(ang);
  p.x = x;
  p.y = y;
  return p;
};

exports.debug = function (arr, clr, ctx) {
  clr = "white";
  ctx.save();
  arr.forEach(function (e, i) {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = clr;
    // ctx.lineWidth=1;
    // ctx.globalAlpha=0.34;
    ctx.beginPath();
    ctx.arc(e.x, e.y, 2, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.restore();
};

exports.getRandom = function () {
  return Math.random();
  return (newOne() - 1) / 2147483646;
};

exports.initSeed = function (s) {
  _seed = s % 2147483647;
  if (_seed <= 0) _seed += 2147483646;
};

function newOne() {

  return _seed = _seed * 16807 % 2147483647;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _shape = __webpack_require__(2);

var _shape2 = _interopRequireDefault(_shape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _App = {
  seed: 243,
  init: function init() {
    _utils2.default.initSeed(this.seed);
    // console.log(`Hello ${name}, how are you ${time}?`);
    // this.PRNG.initSeed(this.seed);
    console.log("iniiiit");
    this.canvas = document.getElementById('c');
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.centerw = this.w / 2;
    this.centerh = this.h / 2;
    this.ctx = _App.canvas.getContext("2d");
    //
    this.ctx.beginPath();
    // this.ctx.arc(this.centerw-100, this.centerh-50, 175, 0, Math.PI * 2, true);
    // this.ctx.arc(this.centerw+120, this.centerh+20, 45, 0, Math.PI * 2, true);
    // this.ctx.fillStyle="rgb(44,44,44)";
    // this.ctx.fillStyle="rgb(144,144,144)";
    // this.ctx.fillRect(0,0,this.w, this.h);
    //
    this.ctx.imageSmoothingEnabled = true;
    // this.ctx.globalCompositeOperation = "color-dodge";
    // this.ctx.globalCompositeOperation = "overlay";
    //
    this.ctx.fillStyle = "rgb(46,32,22)";
    this.ctx.globalCompositeOperation = "color-dodge";
    this.colorsArr = ["rgba(215,155,0, 0.01)", "rgba(255,0,30, 0.01)", "rgba(33,228,52, 0.008)", "rgba(99,43,225, 0.006)", "rgba(238,69,64, 0.006)"];

    // this.ctx.fillStyle="rgb(44,44,144)";
    // this.ctx.globalCompositeOperation = "lighter";
    // this.colorsArr =["rgba(255,255,0, 0.01)","rgba(255,0,0, 0.01)"];
    //
    // this.ctx.fillStyle="rgb(44,44,44)";
    // this.ctx.globalCompositeOperation = "hard-light";
    // this.colorsArr =["rgba(0,255,0, 0.01)","rgba(0,0,230, 0.0123)","rgba(233,0,0, 0.010)"];
    //
    this.ctx.fillStyle = "rgb(222,222,222)";
    this.ctx.globalCompositeOperation = "hard-light";
    this.colorsArr = ["rgba(0,155,122, 0.021)", "rgba(113,111,130, 0.001)", "rgba(99,43,210, 0.006),rgba(215,155,0, 0.01)"];
    // //
    this.ctx.fillStyle = "rgb(255,144,10)";
    this.ctx.globalCompositeOperation = "color-burn";
    this.colorsArr = ["rgba(10,10,0, 0.006)", "rgba(0,111,0, 0.0106)", "rgba(99,43,0, 0.008)", "rgba(0,111,111, 0.0059)"];
    // //
    this.ctx.fillStyle = "rgb(235,10,10)";
    this.ctx.globalCompositeOperation = "lighter";
    this.colorsArr = ["rgba(220,220,220, 0.006)", "rgba(110,111,0, 0.01)", "rgba(199,43,10, 0.008)", "rgba(0,111,211, 0.0059)"];
    // //
    // //
    this.ctx.fillStyle = "rgb(245,168,228)";
    this.ctx.globalCompositeOperation = "darken";
    this.colorsArr = ["rgba(220,0,220, 0.026)", "rgba(110,151,0, 0.01)", "rgba(199,43,10, 0.008)", "rgba(0,111,211, 0.0059)"];
    // //
    this.ctx.fillStyle = "rgb(111,68,28)";
    this.ctx.globalCompositeOperation = "lighter";
    this.colorsArr = ["rgba(220,0,220, 0.026)", "rgba(110,151,0, 0.01)", "rgba(199,43,10, 0.008)", "rgba(0,111,211, 0.0059)"];

    this.ctx.fillRect(0, 0, this.w, this.h);
    this.createShape();

    // this.drawShape();
  },
  createShape: function createShape() {
    console.log("createShape");
    for (var j = 0; j < this.colorsArr.length; j++) {
      if (j == 0) {
        // this.ctx.arc(this.centerw, this.centerh, 185, 0, Math.PI * 2, true);
        // this.ctx.clip();

      }
      var _nm = "n" + j;
      // console.log(nm);
      var _nm = new _shape2.default(_App, this.colorsArr[j]);
      // console.log(nm);
      for (var k = 0; k < 20; k++) {
        for (var i = 0; i < 3; i++) {
          _nm.generateLayer(i);
        }
        for (var s in _nm.shapes) {
          _nm.drawShape(_nm.shapes[s]);
          // utils.debug(nm.baseShape, nm.color, this.ctx);
        }
      }
    }
  }
};
_App.init();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//static class variables (internal)
//global (to this module)
var maxPoints = 10000;

function createBaseShape(s) {
  console.log("createBaseShape");
  // console.log(this.shapes["shapeArr_0"]);
  for (var i = 0; i < 4; i++) {
    // if(this.totalPoints<this.maxPoints){
    s.subdivisions++;
    // console.log(i,subdivisions, s.shapes);
    s.shapes["shapeArr_" + s.subdivisions] = s.subDivide(s.shapes["shapeArr_" + i], i);
    // this.totalPoints+=shapes["shapeArr_"+this.subdivisions].length;
    // }else{
    // console.log(this.totalPoints,"hey we're jammed up w a ton of points so gonna chill rn");
    // }
  }
  s.baseShape = s.shapes["shapeArr_" + s.subdivisions].slice();
  s.shapes = {};
  s.subdivisions = 0;
}
// new

var Shape = function () {
  function Shape(app, color) {
    _classCallCheck(this, Shape);

    this.subdivisions = 0;
    this.totalPoints = 0;
    this.app = app;
    this.color = color;
    this.shapes = { shapeArr_0: [] };
    this.createStartingPoints();
    createBaseShape(this);
  }

  _createClass(Shape, [{
    key: "createStartingPoints",
    value: function createStartingPoints() {
      var num_pts = 9;
      var ang = 0;
      var rad = this.app.w * 0.25;
      var step = 2 * Math.PI / num_pts;
      for (var i = 0; i < num_pts; i++) {
        var _x = this.app.centerw + Math.cos(ang) * rad * _utils2.default.getRandom();
        var _y = this.app.centerh + Math.sin(ang) * rad;
        ang += step;
        this.shapes.shapeArr_0.push({ x: _x, y: _y });
      }
    }
  }, {
    key: "subDivide",
    value: function subDivide(arr) {
      // console.log("subdivide", arr);
      var tmparr = arr.slice();
      var newArr = [];
      for (var i = 0; i < tmparr.length; i++) {
        if (i == 0) {
          //*|* first one
          newArr.push(tmparr[i]);
        } else {
          //*|* main loop
          var newPt = _utils2.default.createNewPoint(tmparr[i], tmparr[i - 1]);
          //push new point, then push older existing point
          newArr.push(newPt);
          newArr.push(arr[i]);
        }
      }
      //*|* last one! Wrap back to connect to the first point at the end of the loop
      var newPt = _utils2.default.createNewPoint(arr[arr.length - 1], arr[0], 1);
      newArr.push(newPt);

      return newArr;
    }
  }, {
    key: "generateLayer",
    value: function generateLayer(pos) {
      console.log("generateLayer");
      var tmparr = this.baseShape.slice();

      for (var i = 0; i < 3; i++) {
        tmparr = this.subDivide(tmparr);
      }

      this.shapes["shapeArr_" + pos] = tmparr.slice();
    }
  }, {
    key: "drawShape",
    value: function drawShape(_arr) {
      this.app.ctx.fillStyle = this.color;
      // this.app.ctx.fillStyle="rgba(155,10,10,0.013324)";

      // this.app.ctx.fillStyle= "rgba(150,"+Math.round(Math.random()*255)+",255,0.025)";

      this.app.ctx.beginPath();
      this.app.ctx.moveTo(_arr[0].x, _arr[0].y);
      for (var i = 1; i < _arr.length; i++) {
        var itm = _arr[i];
        this.app.ctx.lineTo(itm.x, itm.y);
      }
      this.app.ctx.fill();
    }
  }]);

  return Shape;
}();

exports.default = Shape;

/***/ })
/******/ ]);