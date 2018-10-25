'use strict'
const path = require('path')
// const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
var glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//src文件夹下的pages文件夹
var PAGE_PATH = path.resolve(__dirname, '../src/pages')
//相应的merge处理
var merge = require('webpack-merge')

exports.entries = function() {
  var entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
  var map = {}
  entryFiles.forEach((filePath) => {
    // \src\pages\index\index.js
      // var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
      var filename = filePath.substring(0, filePath.lastIndexOf('\/'));
      filename = filename.substring(filename.lastIndexOf('\/') + 1);
      map[filename] = filePath;
  })
  // map['vendors'] = 'babel-polyfill';
  // console.log(map)
  return map
}


exports.htmlPlugin = function() {
  let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
  let arr = []
  entryHtml.forEach((filePath) => {
      // let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
      var filename = filePath.substring(0, filePath.lastIndexOf('\/'));
      console.log('filename:'+ filename);
      filename = filename.substring(filename.lastIndexOf('\/') + 1);
      console.log('filename2:'+ filename);
      let conf = {
          // 模板来源
          template: filePath,
          // 文件名称
          filename: filename + '.html',
          // favicon: 'path/to/my_favicon.ico',
          // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
          chunks: ['manifest', 'vendor', filename], //主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
          inject: true //默认值，script标签位于html文件的 body 底部
      }
      if (process.env.NODE_ENV === 'production') {
          conf = merge(conf, {
              minify: { //压缩
                  removeComments: true, // 移除属性的引号
                  collapseWhitespace: true,
                  removeAttributeQuotes: true
              },
              chunksSortMode: 'dependency'
          })
      }
      arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}

exports.assetsPath = function (_path) {
  const assetsSubDirectory = 'static';

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
