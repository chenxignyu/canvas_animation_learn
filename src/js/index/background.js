/**
 * Created by chenxingyu on 2017/3/21.
 */
"use strict";

export default class BackGround{
    constructor(canvasObj){
        this.img = new Image();

        this.canvasObj = canvasObj || {};
    }

    //初始化
    init(src) {
        if (typeof src !== 'string') {
            throw Error('请确保 src 为字符串');
        }

        this.img.src = src;
    }

    //绘制
    draw(){
        let canvasObj = this.canvasObj;
        canvasObj.context.drawImage(this.img, 0, 0, canvasObj.canWidth, canvasObj.canHeight);
    }
}
