/**
 * Created by chenxingyu on 2017/3/15.
 */
"use strict";

export default class Road{
    constructor(canvasObj) {
        this.timer = 0;
        this.index = 0; //保存index ， 用来切换动画
        this.img = new Image();

        //保存canvas对象
        this.canvasObj = canvasObj || {};
    }

    //初始化
    init(src){
        if (typeof src !== 'string') {
            throw Error('请确保 src 为字符串');
        }

        //设置图片
        this.img.src = src;
    }

    //绘制
    draw(){
        let canvasObj = this.canvasObj;
        let context = canvasObj.context;

        //获取定时器时间
        this.timer = this.timer + canvasObj.deltaTime;

        //延迟时间
        let delayTime = 400;
        if(this.timer > delayTime){
            //获取当前的index
            this.index = (this.index + 1) % 6;

            //求余数循环
            this.timer = this.timer % delayTime;
        }

        let width = 640;
        let height = 780;

        //保存当前环境的状态
        context.save();
        //偏移
        context.translate(0, canvasObj.canHeight - height );
        //绘制图片
        context.drawImage(this.img, this.index * width, 0, width, height, 0, 0, width, height);
        //返回之前保存过的路径状态和属性
        context.restore();
    }
}
