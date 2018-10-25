const webpack = require("webpack");
const path = require('path');
const glob = require("glob");
//消除冗余的css
const purifyCssWebpack = require("purifycss-webpack");
// html模板
const htmlWebpackPlugin = require("html-webpack-plugin");
// 清除目录等
const cleanWebpackPlugin = require("clean-webpack-plugin");
//4.x之前用以压缩
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
// 分离css
const extractTextPlugin = require("extract-text-webpack-plugin");
//静态资源输出
const copyWebpackPlugin = require("copy-webpack-plugin");
// vue-loader在15之后需要在webpack.config.js中当插件引入
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = [
        // new CleanWebpackPlugin(['dist']),
        // new ExtractTextPlugin('[name].css'),  //[name] 默认  也可以自定义name  声明使用
        // new CopyWebpackPlugin([  //src下其他的文件直接复制到dist目录下
        //     { from:'src/assets/favicon.ico',to: 'favicon.ico' }
        // ]),
        // new webpack.ProvidePlugin({  //引用框架 jquery  lodash工具库是很多组件会复用的，省去了import
        //     '_': 'lodash'  //引用webpack
        // }),
        // new webpack.ProvidePlugin({
        //   $: 'jquery',
        //   jQuery: 'jquery'
        // })

        new webpack.HotModuleReplacementPlugin(),
        // 调用之前先清除
        // new cleanWebpackPlugin(["dist"]),
        new cleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),   //根目录
            verbose:  true,   //开启在控制台输出信息
        }),

        // 4.x之前可用uglifyjs-webpack-plugin用以压缩文件，4.x可用--mode更改模式为production来压缩文件
        // new uglifyjsWebpackPlugin(),
        new copyWebpackPlugin([
            { from:'src/assets/favicon.ico',to: 'favicon.ico' },
            { from:'static',to: './static' }
        ]),
        // 分离css插件参数为提取出去的路径
        new extractTextPlugin('./static/css/[name].css'),
        // 消除冗余的css代码
        // new purifyCssWebpack({
        //     // glob为扫描模块，使用其同步方法
        //     paths: glob.sync(path.join(__dirname, "src/pages/*/*.html"))
        // }),
        // 全局暴露统一入口
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: 'jquery'
        }),
        new VueLoaderPlugin()
]
