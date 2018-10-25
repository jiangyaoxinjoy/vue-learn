const path = require('path');
const utils = require('./utils');
// const webpack = require('webpack'); //引入的webpack,使用lodash
const rulesConfig = require("./webpack.rules.js");
const pluginsConfig = require("./webpack.plugins.js");

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
// console.log(path.resolve(__dirname,'dist')); //物理地址拼接
// console.log(path.resolve('../dist'));

//webpack必须采用commonjs写法
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: utils.entries(),
    output: {       //webpack如何输出
        // path: path.resolve(__dirname, 'dist'), //定位，输出文件的目标路径
        path: resolve('dist'), //必须是一个绝对路径
        filename:'./static/js/[name].[hash].js',
    },
    module: {       //模块的相关配置
        rules: rulesConfig
    },
    resolve: { //解析模块的可选项
        // modules: [ ]//模块的查找目录 配置其他的css等文件
        extensions: [".js", ".json", ".jsx",".less", ".css"],  //用到文件的扩展名
        alias: { //模快别名列表
            utils: path.resolve(__dirname,'src/utils')
        }
    },
    plugins: pluginsConfig.concat(utils.htmlPlugin()),//插进的引用, 压缩，分离美化
    devServer: {
        contentBase: path.resolve(__dirname, "./dist"), // 本地服务器在哪个目录搭建页面，一般我们在当前目录即可；
        host: "localhost",
        port: "8090",
        inline: true, //用来支持dev-server自动刷新的配置
        open: true, // 开启浏览器
        hot: true   // 开启热更新,好像没有用了，用一个hot插件代替。
    },
    optimization: {
        splitChunks: {
            cacheGroups:{
                // 比如你要单独把jq之类的官方库文件打包到一起，就可以使用这个缓存组，如想具体到库文件（jq）为例，就可把test写到具体目录下
                vendor: {
                    test: /node_modules/,
                    name: "vendor",
                    priority: 10,
                    enforce: true
                },
                // 这里定义的是在分离前被引用过两次的文件，将其一同打包到common.js中，最小为30K
                common: {
                    name: "common",
                    minChunks: 2,
                    minSize: 30000
                }

            },
            chunks:"all",
            minSize: 40000
        }
    }
}
