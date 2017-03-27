/**
 * Created by chenxingyu on 2017/2/7.
 */
const gulp = require('gulp');
//同步执行任务
const gulpSequence = require('gulp-sequence');
const watch = require('gulp-watch');
const clean = require('gulp-clean');
const webpack = require('webpack');
let webpackConfig = require("./webpack.config");

//监听js处理
gulp.task('webpackDev',function(){
    //执行webpack任务
    webpack(webpackConfig, function(err, stats) {
        console.info(stats.toString());
    });
});

//打包js
gulp.task('webpackBuild',function(){
    //添加压缩js代码
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
    //执行webpack任务
    webpack(webpackConfig, function(err, stats) {
        console.info(stats.toString());
    });
});

//拷贝图片
gulp.task('copyImg', function(){
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img'))
});

//清除任务
gulp.task('clean', function (){
    return gulp.src('./dist')
        .pipe(clean({force: true}));
});

//watch 处理程序
const watchHandle = (callback) => {

    //监听 src 下的 js
    watch("./src/js/**/*",['webpackDev']);
    //监听 src 下的 img
    watch("src/img/**/*", function (file){
        //执行任务
        gulp.start('copyImg');
    });


    //同步执行任务
    gulpSequence('clean', ['webpackDev','copyImg'])(callback);
};

//build 处理程序
const buildHandle = (callback) => {
    //同步执行任务
    gulpSequence('clean', ['webpackBuild','copyImg'])(callback);
};

//监听任务
gulp.task('watch' , watchHandle);
gulp.task('w' , watchHandle);

//打包任务
gulp.task('build', buildHandle);
gulp.task('b', buildHandle);
