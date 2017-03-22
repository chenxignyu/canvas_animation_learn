/**
 * Created by chenxingyu on 2017/3/21.
 */
"use strict";

import imgData from '../data/img_data';

import utils from '../core/utils';

export default class Loading {
    constructor(canvasObj) {
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
    init(src) {
        if (typeof src !== 'string') {
            throw Error('请确保 src 为字符串');
        }

        //设置图片
        this.img.src = src;

        //初始化增量时间
        this.lastTime = Date.now();
        this.deltaTime = 0;

        //进度初始化
        this.progressInit();
    }

    //加载图片
    loadImg(obj) {
        let img;
        let key;
        for (key in obj) {
            img = new Image();
            img.src = obj[key];

            //图片上传完成设置百分比
            this.imgOnLoadSetRatio(img);
        }
    };

    //图片上传完成设置百分比
    imgOnLoadSetRatio(img){
        //图片加载完成
        img.onload = (obj) => {
            //加载完成数 + 1
            this.completeNum = this.completeNum + 1;
            //计算当前的百分比
            this.ratio = ((this.completeNum / this.imgLen ).toFixed(2) * 100).toFixed(0);
        };
    }

    //进度初始化
    progressInit(){
        //获取index对象的数组
        let imgIndexKeys = Object.keys(imgData.index);
        //获取game对象的数组
        let imgGameKeys = Object.keys(imgData.game);
        //图片长度
        this.imgLen = imgIndexKeys.length + imgGameKeys.length;
        //加载完成数
        this.completeNum = 0;
        //加载百分比
        this.ratio = 0;

        //加载图片
        this.loadImg(imgData.index);
        this.loadImg(imgData.game);

    }

    //加载进度
    loadingProgress() {
        //进度加载结束回调函数
        let loadProEnd = this.loadEndCallback || function () {};

        //绘制进度比例
        this.drawProgressRatio(this.ratio);

        //如果没有图片了
        if (this.completeNum === this.imgLen) {
            setTimeout(function(){
                console.log('loadProEnd');
                loadProEnd();
            },200);
        }
    }

    //绘制进度比例
    drawProgressRatio(ratio) {
        let context = this.canvasObj.context;

        context.save();
        context.font = '22px verdana';
        context.fillText(ratio + '%', 300, 500);
        //返回之前保存过的路径状态和属性
        context.restore();
    }

    //循环绘制
    loopDraw(loadEndCallback) {
        //保存加载完成回调函数
        if (this.loadEndCallback === undefined) {
            this.loadEndCallback = loadEndCallback ? loadEndCallback : '';
        }

        //递归
        this.animFrameTimer = window.requestAnimFrame(() => {
            this.loopDraw();
        });

        let nowTime = Date.now();  //当前时间
        this.deltaTime = nowTime - this.lastTime;   //deltaTime ，增量时间 ，每两帧的时间间隔 ， 保证游戏画面流畅
        this.lastTime = nowTime;  //记录最后一次的时间

        let canvasObj = this.canvasObj;
        let context = canvasObj.context;
        //清除画布
        context.clearRect(0, 0, canvasObj.canWidth, canvasObj.canHeight);

        //绘制加载进度
        this.loadingProgress();

        //绘制图片
        this.drawImg();
    }

    //绘制
    drawImg() {
        let canvasObj = this.canvasObj;
        let context = canvasObj.context;
        //获取增量时间
        this.imgTimer = this.imgTimer + this.deltaTime;
        //延迟时间
        let delayTime = 200;
        //控制动画绘制的快慢
        if (this.imgTimer > delayTime) {
            this.imgIndex = (this.imgIndex + 1) % 3;
            //求余数 , 可以一直循环
            this.imgTimer = this.imgTimer % delayTime;
        }

        let width = 275;
        let height = 354;

        //保存当前环境的状态
        context.save();
        //便宜画布
        context.translate((canvasObj.canWidth - width) / 2, 150);
        context.drawImage(this.img, width * this.imgIndex, 0, width, height, 0, 0, width, height);
        //返回之前保存过的路径状态和属性
        context.restore();

    }
}