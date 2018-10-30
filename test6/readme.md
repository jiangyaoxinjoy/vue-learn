##下载webpack
```
npm init -y
cnpm i webpack -D
```
>安装webpack和less最好不要全局安装，可能会导致版本差异。

##模块
- node模块的规范commonjs。前端不支持.
    - module.exports = ; let a = require()
    - webpack可以将node模块打包转义成浏览器可识别的文件。
- cmd seajs amd require。支持前端模块化的库
- umd 兼容出来cmd amd commonjs规范
- es6兼容了模块化 esmodule 可以在浏览器中用。
  - 如何定义模块 -> 一个js就是一个模块
  - 如何导出模块 -> export,export default
  - 如何使用模块 -> import
 - 前端用import后端用require。
```angularjs

import 拥有声明功能
import 具有提升效果
import引入文件模块要加 ./
引入第三方模块(node_modules)里的不用。
```

###path
- const path = require('path')
- path.resolve([from ...], to)
  - 将多个路径解析为一个规范化的绝对路径
  - path.resolve('../dist')

- path.join([path1][, path2][, ...])
   - 地址拼接，可以连接任意多个路径字符串。
   - path.join(__dirname,'../','dist'); '../'表示前面一个路径字符串的上一级

##babel
- es6 -> es5
```
npm install babel-core babel-loader -D
```
### babel-preset-es2015
- 预设es6的语法功能
- es2015已经淘汰了。


        npm uninstall --save-dev babel-preset-es2015
        npm install --save-dev babel-preset-env@next

###.babelrc
- babel预设
- 添加插件plugins：transform-runtime，这个插件可以解析es6的API，解决了babel-polyfill中的全局污染，
它还做了公用方法的抽离。配置：
    - helpers: 默认值为true，表示是否开启内联的babel helpers(即babel或者环境本来存在的某些对象方法函数)如：extends，etc这样的
    在调用模块名字时将被替换名字。

    - polyfill：默认值为true，表示是否把内置的东西(Promise, Set, Map)等转换成非全局污染的。

    - regenerator：默认值为true，是否开启generator函数转换成使用regenerator runtime来避免污染全局域。

    - moduleName：默认值为 babel-runtime，当调用辅助 设置模块（module）名字/路径.
- presets
    - presets属性告诉Babel要转换的源码使用了哪些新的语法特性，presets是一组Plugins的集合。
    - babel-preset-env，它的功能类似于 babel-preset-latest，它会根据目标环境选择不支持的新特性来转译。

    {
      'presets': [
        ['env', {
          'target': {
            'browsers': ['last 2 versions', 'safari >= 7']
          }
        }]
      ]
    }

###babel-presets-stage-x
- 官方预设(preset), 有两种，一个是按年份(babel-preset-es2017)，一个是按阶段(babel-preset-stage-0)。
- 每种预设都依赖于紧随的后期阶段预设，数字越小，阶段越靠后，存在依赖关系。也就是说stage-0是包括stage-1的，以此类推。因此 stage-0包含stage-1/2/3的内容。所以如果我们不知道需要哪个stage-x的话，直接引入stage-0就好了。

###图片路径
- 在css，less中引入图片，如果图片路径不对，可以在他们打包规则中加入publicPath。
- js引入路径需要import或者是一个线上路径。

###html-webpack-plugin插件

###webpack-dev-server
- 开发时展示代码效果
- 内置服务，帮我们启动一个端口号，当代码更新是，可以自动打包。(在内存中打包，不产生实体文件)


    npm i webpack-dev-server -D


###vue-loader vue-template-compiler
- vue-loader 解析.vue文件 
- vue-template-compiler解析vue模板的template
- vue-loader会自动调用vue-template-compiler
- vue-loader在15之后需要在webpack.config.js中当插件引入
    

    ```
      plugins: [
          new VueLoaderPlugin()
      ]
    ```  

###vue的路由和插件

