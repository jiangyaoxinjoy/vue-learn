# vue-learn
学习vue
## JS数据类型
- number boolean string null undefined
- Object func...
- Symbol(es6)

## {} []
### 数组的变异
操作数组的方法

**能改变原数组:**
* pop
* push
* unshift
* shift
* splice
* reverse
* sort

**不能改变原数组的:**
indexOf lastIndexOf concat slice

## forEach filter map  some every reduce (includes find es6)

##框架和库
- 框架 vue 拥有一个完整的解决方案，我们写好库调用我们的代码
- 库 jquery underscore zepto animate.css 我们调用这些库

## 渐进式(渐进增强)
- vue全家桶 vuejs + vue-router + vuex + axios
- 通过组合完成一个完整的框架

##MVC(backbone) 
单向，不能根据视图修改数据
- model 数据
- view 视图
- controller 控制器

##MVVM(angular,vue)
双向，数据挂载在viewModel上。
- model 数据
- view 视图
- viewModel 视图模型

##vue不支持ie8及以下版本
- 因为Object.defineProperty(es5)没有替代方案
aaaaaa