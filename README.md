## canvas_animation_learn
html5 canvas 简单动画学习

## 安装依赖包

```bash

cnpm install webpack gulp --save

cnpm install gulp-watch gulp-clean --save-dev

# babel
cnpm install --save-dev babel-loader babel-core babel-preset-env

```

## 创建.babelrc配置文件
``` json
{
  "presets": ["env"]
}
```

## 运行 gulp、webpack
``` bash
#监听文件
gulp watch

# 打包文件
gulp build

```
