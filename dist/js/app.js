/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(5);

	var _img_data = __webpack_require__(2);

	var _img_data2 = _interopRequireDefault(_img_data);

	var _background = __webpack_require__(10);

	var _background2 = _interopRequireDefault(_background);

	var _loading = __webpack_require__(4);

	var _loading2 = _interopRequireDefault(_loading);

	var _run = __webpack_require__(8);

	var _run2 = _interopRequireDefault(_run);

	var _road = __webpack_require__(9);

	var _road2 = _interopRequireDefault(_road);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//获取DOM


	//跑男


	//背景
	/**
	 * Created by chenxingyu on 2017/3/21.
	 */

	//commonjs
	var canvas = document.querySelector('#canvas');

	//公路

	//加载


	//图片对象

	var context = canvas.getContext('2d');

	var width = 640;
	var height = document.documentElement.clientHeight;

	//设置画布宽高
	canvas.width = width;
	canvas.height = height;

	//记录canvas的一些信息
	var canvasObj = {
	    canvas: canvas,
	    context: context,
	    canWidth: width,
	    canHeight: height,
	    lastTime: null, //记录最后一次的时间
	    deltaTime: null //增量时间
	};

	//加载进度页
	var loading = new _loading2.default(canvasObj);
	//初始化
	loading.init(_img_data2.default.index.loading);

	//进度绘制
	loading.loopDraw(function loadEndCallback() {
	    //清除定时器
	    window.cancelAnimFrame(loading.animFrameTimer);

	    //初始化增量时间 , 最后一次时间
	    canvasObj.lastTime = Date.now();
	    canvasObj.deltaTime = 0;

	    //游戏初始化
	    gameInit();
	});

	//实例化
	var gameRun = new _run2.default(canvasObj);
	var gameRoad = new _road2.default(canvasObj);
	var gameBackGround = new _background2.default(canvasObj);

	//初始化游戏
	var gameInit = function gameInit() {
	    //初始化公路
	    gameRoad.init(_img_data2.default.game.road);
	    //初始化跑男
	    gameRun.init(_img_data2.default.game.guy);
	    //初始化背景
	    gameBackGround.init(_img_data2.default.game.bg);

	    //游戏循环绘制
	    gameLoop();
	};

	//游戏循环
	var gameLoop = function gameLoop() {
	    window.requestAnimFrame(gameLoop);

	    var nowTime = Date.now(); //当前时间
	    canvasObj.deltaTime = nowTime - canvasObj.lastTime; //deltaTime ，增量时间 ， 每两帧的时间间隔 ， 保证游戏画面流畅
	    canvasObj.lastTime = nowTime; //记录最后一次的时间

	    //清除画布
	    context.clearRect(0, 0, canvasObj.canWidth, canvasObj.canHeight);

	    //绘制背景
	    gameBackGround.draw();

	    //绘制公路
	    gameRoad.draw();

	    //绘制跑男
	    gameRun.draw();
	};

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by chenxingyu on 2017/3/21.
	 */
	exports.default = {
	    index: {
	        loading: './dist/img/loading.png'
	    },
	    game: {
	        guy: './dist/img/guy.png',
	        bg: './dist/img/bg.png',
	        road: './dist/img/road.png',
	        music: './dist/img/music.png',
	        prize: './dist/img/prize.png',
	        progress1: './dist/img/progress1.png',
	        progress2: './dist/img/progress2.png',
	        rule: './dist/img/rule.png',
	        run: './dist/img/run.png',
	        startBtn: './dist/img/start_btn.png',
	        time: './dist/img/time.png',
	        title: './dist/img/title.png'
	    }

	};

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by chenxingyu on 2017/3/21.
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _img_data = __webpack_require__(2);

	var _img_data2 = _interopRequireDefault(_img_data);

	var _utils = __webpack_require__(7);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Loading = function () {
	    function Loading(canvasObj) {
	        _classCallCheck(this, Loading);

	        this.img = new Image();
	        this.imgTimer = 0; //增量时间
	        this.imgIndex = 0; //当前显示的图片index
	        this.animFrameTimer = null; //定时器

	        this.deltaTime = null;
	        this.lastTime = null;

	        //保存canvas对象
	        this.canvasObj = canvasObj || {};
	    }

	    //初始化


	    _createClass(Loading, [{
	        key: 'init',
	        value: function init(src) {
	            if (typeof src !== 'string') {
	                throw Error('请确保 src 为字符串');
	            }

	            //设置图片
	            this.img.src = src;

	            this.lastTime = Date.now();
	            this.deltaTime = 0;

	            //进度初始化
	            this.progressInit();
	        }

	        //加载图片

	    }, {
	        key: 'loadImg',
	        value: function loadImg(obj) {
	            var _this = this;

	            var img = void 0;
	            var key = void 0;
	            for (key in obj) {
	                img = new Image();
	                img.src = obj[key];

	                //图片加载完成
	                img.onload = function (obj) {
	                    //加载完成数 + 1
	                    _this.completeNum = _this.completeNum + 1;
	                    //计算当前的百分比
	                    _this.ratio = ((_this.completeNum / _this.imgLen).toFixed(2) * 100).toFixed(0);
	                };
	            }
	        }
	    }, {
	        key: 'progressInit',


	        //进度初始化
	        value: function progressInit() {
	            //获取index对象的数组
	            var imgIndexKeys = Object.keys(_img_data2.default.index);
	            //获取game对象的数组
	            var imgGameKeys = Object.keys(_img_data2.default.game);
	            //图片长度
	            this.imgLen = imgIndexKeys.length + imgGameKeys.length;
	            //加载完成数
	            this.completeNum = 0;
	            //加载百分比
	            this.ratio = 0;

	            //加载图片
	            this.loadImg(_img_data2.default.index);
	            this.loadImg(_img_data2.default.game);
	        }

	        //加载进度

	    }, {
	        key: 'loadingProgress',
	        value: function loadingProgress() {
	            //进度加载结束回调函数
	            var loadProEnd = this.loadEndCallback || function () {};

	            //绘制
	            this.drawProgressRatio(this.ratio);

	            //如果没有图片了
	            if (this.completeNum === this.imgLen) {
	                console.log('loadProEnd');
	                loadProEnd();
	            }
	        }

	        //绘制进度比例

	    }, {
	        key: 'drawProgressRatio',
	        value: function drawProgressRatio(ratio) {
	            var context = this.canvasObj.context;

	            context.save();
	            context.font = '22px verdana';
	            context.fillText(ratio + '%', 300, 500);
	            //返回之前保存过的路径状态和属性
	            context.restore();
	        }

	        //循环绘制

	    }, {
	        key: 'loopDraw',
	        value: function loopDraw(loadEndCallback) {
	            var _this2 = this;

	            //保存加载完成回调函数
	            if (this.loadEndCallback === undefined) {
	                this.loadEndCallback = loadEndCallback ? loadEndCallback : '';
	            }

	            //递归
	            this.animFrameTimer = window.requestAnimFrame(function () {
	                _this2.loopDraw();
	            });

	            var nowTime = Date.now(); //当前时间
	            this.deltaTime = nowTime - this.lastTime; //deltaTime ，增量时间 ，每两帧的时间间隔 ， 保证游戏画面流畅
	            this.lastTime = nowTime; //记录最后一次的时间

	            var canvasObj = this.canvasObj;
	            var context = canvasObj.context;
	            //清除画布
	            context.clearRect(0, 0, canvasObj.canWidth, canvasObj.canHeight);

	            //绘制加载进度
	            this.loadingProgress();

	            //绘制图片
	            this.drawImg();
	        }

	        //绘制

	    }, {
	        key: 'drawImg',
	        value: function drawImg() {
	            var canvasObj = this.canvasObj;
	            var context = canvasObj.context;
	            //获取增量时间
	            this.imgTimer = this.imgTimer + this.deltaTime;
	            //延迟时间
	            var delayTime = 200;
	            //控制动画绘制的快慢
	            if (this.imgTimer > delayTime) {
	                this.imgIndex = (this.imgIndex + 1) % 3;
	                //求余数 , 可以一直循环
	                this.imgTimer = this.imgTimer % delayTime;
	            }

	            var width = 275;
	            var height = 354;

	            //保存当前环境的状态
	            context.save();
	            //便宜画布
	            context.translate((canvasObj.canWidth - width) / 2, 150);
	            context.drawImage(this.img, width * this.imgIndex, 0, width, height, 0, 0, width, height);
	            //返回之前保存过的路径状态和属性
	            context.restore();
	        }
	    }]);

	    return Loading;
	}();

	exports.default = Loading;

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Created by chenxingyu on 2017/3/21.
	 */
	"use strict";

	window.requestAnimFrame = function () {
	    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback, element) {
	        return window.setTimeout(callback, 1000 / 60);
	    };
	}();

	window.cancelAnimFrame = function () {
	    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || clearTimeout;
	}();

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by chenxingyu on 2017/3/22.
	 */
	exports.default = {
	    indexOf: function indexOf(arr, obj) {
	        var i = arr.length;
	        while (i--) {
	            if (arr[i] === obj) {
	                return i;
	            }
	        }
	        return -1;
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Created by chenxingyu on 2017/3/15.
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Run = function () {
	    function Run(canvasObj) {
	        _classCallCheck(this, Run);

	        this.timer = 0;
	        this.index = 0; //保存index ， 用来切换动画
	        this.img = new Image();

	        //保存canvas对象
	        this.canvasObj = canvasObj || {};
	    }

	    //初始化


	    _createClass(Run, [{
	        key: 'init',
	        value: function init(src) {
	            if (typeof src !== 'string') {
	                throw Error('请确保 src 为字符串');
	            }

	            //设置图片
	            this.img.src = src;
	        }

	        //绘制

	    }, {
	        key: 'draw',
	        value: function draw() {
	            var canvasObj = this.canvasObj;
	            var context = canvasObj.context;
	            //获取增量时间
	            this.timer = this.timer + canvasObj.deltaTime;

	            //延迟时间
	            var delayTime = 200;
	            if (this.timer > delayTime) {
	                //获取当前的index
	                this.index = (this.index + 1) % 8;

	                //求余数循环
	                this.timer = this.timer % delayTime;
	            }

	            var width = 176;
	            var height = 377;

	            //保存当前环境的状态
	            context.save();
	            //偏移
	            context.translate((canvasObj.canWidth - width) / 2, canvasObj.canHeight - height - 150);
	            //绘制图片
	            context.drawImage(this.img, this.index * width, 0, width, height, 0, 0, width, height);
	            //返回之前保存过的路径状态和属性
	            context.restore();
	        }
	    }]);

	    return Run;
	}();

	exports.default = Run;

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Created by chenxingyu on 2017/3/15.
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Road = function () {
	    function Road(canvasObj) {
	        _classCallCheck(this, Road);

	        this.timer = 0;
	        this.index = 0; //保存index ， 用来切换动画
	        this.img = new Image();

	        //保存canvas对象
	        this.canvasObj = canvasObj || {};
	    }

	    //初始化


	    _createClass(Road, [{
	        key: 'init',
	        value: function init(src) {
	            if (typeof src !== 'string') {
	                throw Error('请确保 src 为字符串');
	            }

	            //设置图片
	            this.img.src = src;
	        }

	        //绘制

	    }, {
	        key: 'draw',
	        value: function draw() {
	            var canvasObj = this.canvasObj;
	            var context = canvasObj.context;

	            //获取定时器时间
	            this.timer = this.timer + canvasObj.deltaTime;

	            //延迟时间
	            var delayTime = 400;
	            if (this.timer > delayTime) {
	                //获取当前的index
	                this.index = (this.index + 1) % 6;

	                //求余数循环
	                this.timer = this.timer % delayTime;
	            }

	            var width = 640;
	            var height = 780;

	            //保存当前环境的状态
	            context.save();
	            //偏移
	            context.translate(0, canvasObj.canHeight - height);
	            //绘制图片
	            context.drawImage(this.img, this.index * width, 0, width, height, 0, 0, width, height);
	            //返回之前保存过的路径状态和属性
	            context.restore();
	        }
	    }]);

	    return Road;
	}();

	exports.default = Road;

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Created by chenxingyu on 2017/3/21.
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BackGround = function () {
	    function BackGround(canvasObj) {
	        _classCallCheck(this, BackGround);

	        this.img = new Image();

	        this.canvasObj = canvasObj || {};
	    }

	    //初始化


	    _createClass(BackGround, [{
	        key: 'init',
	        value: function init(src) {
	            if (typeof src !== 'string') {
	                throw Error('请确保 src 为字符串');
	            }

	            this.img.src = src;
	        }

	        //绘制

	    }, {
	        key: 'draw',
	        value: function draw() {
	            var canvasObj = this.canvasObj;
	            canvasObj.context.drawImage(this.img, 0, 0, canvasObj.canWidth, canvasObj.canHeight);
	        }
	    }]);

	    return BackGround;
	}();

	exports.default = BackGround;

/***/ }
/******/ ]);