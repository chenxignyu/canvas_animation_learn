/**
 * Created by chenxingyu on 2017/2/7.
 */
const gulp = require('gulp');
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
const watchHandle = () => {
    //执行任务
    gulp.run('webpackDev');
    gulp.run('copyImg');

    //监听 src 下的 js
    watch("./src/js/**/*",['webpackDev']);
    //监听 src 下的 img
    watch("src/img/**/*", function (file){
        //执行任务
        gulp.run('copyImg');
    });
};

//build 处理程序
const buildHandle = () => {
    gulp.run('webpackBuild');
    gulp.run('copyImg');
};

//监听任务
gulp.task('watch', ['clean'] , watchHandle);
gulp.task('w', ['clean'] , watchHandle);

//打包任务
gulp.task('build', ['clean'] , buildHandle);
gulp.task('b', ['clean'] , buildHandle);
