/**
 * Created by chenxingyu on 2017/3/21.
 */

//commonjs
import './core/common';

//图片对象
import imgData from './data/img_data';

//背景
import BackGround from './index/background';
//加载
import Loading from './index/loading';

//跑男
import Run from './game/run';

//公路
import Road from './game/road';

//获取DOM
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

let width = 640;
let height = document.documentElement.clientHeight;

//设置画布宽高
canvas.width = width;
canvas.height = height;

//记录canvas的一些信息
let canvasObj = {
    canvas : canvas,
    context : context,
    canWidth : width,
    canHeight : height,
    lastTime : null,   //记录最后一次的时间
    deltaTime : null   //增量时间
};

//加载进度页
let loading = new Loading(canvasObj);
//初始化
loading.init(imgData.index.loading);

//进度绘制
loading.loopDraw(function loadEndCallback(){
    //清除定时器
    window.cancelAnimFrame(loading.animFrameTimer);

    //初始化增量时间 , 最后一次时间
    canvasObj.lastTime = Date.now();
    canvasObj.deltaTime = 0;

    //游戏初始化
    gameInit();
});

//实例化
let gameRun = new Run(canvasObj);
let gameRoad = new Road(canvasObj);
let gameBackGround = new BackGround(canvasObj);

//初始化游戏
let gameInit = () => {
    //初始化公路
    gameRoad.init(imgData.game.road);
    //初始化跑男
    gameRun.init(imgData.game.guy);
    //初始化背景
    gameBackGround.init(imgData.game.bg);

    //游戏循环绘制
    gameLoop();
};


//游戏循环
let gameLoop = () => {
    window.requestAnimFrame(gameLoop);

    let nowTime = Date.now();  //当前时间
    canvasObj.deltaTime = nowTime - canvasObj.lastTime;   //deltaTime ，增量时间 ， 每两帧的时间间隔 ， 保证游戏画面流畅
    canvasObj.lastTime = nowTime;  //记录最后一次的时间

    //清除画布
    context.clearRect(0, 0, canvasObj.canWidth, canvasObj.canHeight);

    //绘制背景
    gameBackGround.draw();

    //绘制公路
    gameRoad.draw();

    //绘制跑男
    gameRun.draw();
};

