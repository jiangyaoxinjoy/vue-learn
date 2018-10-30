# vue-learn
`test1`
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

##vue知识点
###指令：
- v-text 取代{{}} v-cloak 解决闪烁(块)问题，后期都可以不采用，
使用v-cloak要加样式。
- v-once 只绑定一次，数据变化不会导致视图刷新。
- v-model 数据双向绑定
- v-html 将html字符串转换成html
- v-for 循环(数组，对象，字符串，数字)
        
        
        <div v-for="(value,index) in/of arr"></div>
             
###v-model
- 如果checkbox和select是多选，提供一个value属性，然后v-model绑定一个数组，这个数组就是选中的value值，checked和selected属性的不需要。
- 修饰符 .number .lazy
- 按键修饰符 .enter .ctrl .keyCode

`test2`
``` base
chrome浏览器安装Vue Devtools 扩展，帮助调试vue

把一个对象转换成json的方法
在控制台用JSON.stringify(vm.products)输出该对象，
然后复制粘贴到json文件里，Code -> Reformat Code 调整数据格式。
```    
###created 钩子函数
- 是一个函数
- this指向vm实例。
- 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
- 专门用来发送ajax请求。
###mounted
- 一个对象
- 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。

###filter 
- 过滤器方法的this指向是window
- val | toFixed(2)  
- 过滤器对象，里面可以放N个过滤器方法.
- toFixed(2)自定义的一个过滤器方法，可以不传参，如果参数，则方法中的第二个参数才是传参，以此类推。第一个参数是val
###methods
- 方法不会缓存。
- 实例中某一个数据变动了，就会调用方法重新计算，性能不够好。

###computed
- 一个对象。
- 和Object.defineProperty类似，有get和set方法。
- get和set中this指向vm实例。(不能只写set，可以只写get)
- 默认调用get方法。
- computed计算属性，是属性不是方法。
- 方法不会缓存，而computed属性会根据依赖的(归vue管理的)数据进行缓存。性能比方法好。
- 依赖的数据发生变化，computed也会响应式变化。
- 不支持异步。依赖的值变化了算出一个新的值。
- 复杂的逻辑都应该放在这个属性里，放在html中难以维护。

    
`test3`

###watch 观察者
- 一个对象。
- 支持异步。 观察某个值变化，变化了再调用一个方法。
- 只有值变化的时候才会触发。
- 可以设置中间状态。
- 只观察一个数据的变化，如果这个数据是依赖其他数据进行计算的(比如购物车的总价)，就不能响应式改变(要改变就要为每一个依赖的数据添加观察者)，这个时候用computed比较方便。
- 异步方法或者开销较大的操作，应该放在watch。
- 默认只监控一层的数据变化，watch的属性名和被观察的数据的名字一样。
    - 默认只监控一层的数据变化。比如数组套对象，里面对象变化不能监控，因为对象的引用地址没变。
- 深度监控.   
###修饰符
- 阻止事件冒泡@event.stop


    stoppropagation(W3C标准，不支持IE)，cancelBubble=true(不符合W3C，只支持IE)，阻止事件冒泡
- 事件捕获模式@event.capture   

    
    xxx.addEventlistener('event', fn)
    
- @event.capture.stop
    
    .stop阻止事件传播，往下和往上都可以阻止

    
    preventDefault，returnValue=false
    
- @event.once


    和jquery的once功能一样，只绑定一次

- @event.self
    判断事件源，只绑定自己

   
    e.srcElement && e.target === ''判断事件源绑定事件
- @event.prevent

    阻止默认行为，比如a标签的跳转
    
###v-bind 动态绑定属性 简写 :
- <img :src="" :width="" :class/>
- :class和:style具体看（test3 v-bind）
- :class绑定的样式和class绑定的不冲突

##实现单页开发的方式
- 浏览器自带的历史管理方法 history.go(-1)
- history.pushState('','','/d')，可以产生历史管理，但要服务端的支持。(可以在控制台尝试)，可能会导致404.
- 通过hash记录跳转路径(页面没有刷新)，可以产生历史管理。
 >开发时使用hash方式，上线的话使用history。
 
 ###directives
 - 自定义指令
 
 
 `test4`
 ###vue的生命周期（1）
 - test4.1.lifecycle.html
 
 ####this.$
 - this.$watch 监控
 - this.$ data vm上的数据
 - this.$el 当前挂载的元素
 - this.$set 后加的属性，实现响应式变化
 - this.$options vm上的所有属性。
 - this.$nextTick 异步方法，等待dom渲染完成后执行。
 - this.refs 所有ref的集合，获取真实的dom。原来操作dom。
 ###component（1）
 - html中组件命名可以用'-'。
 - js中用驼峰命名法。
 - 组件的data是函数类型。return一个对象实例作为组件的数据
 
 `test5`
 
 ###slot
 - 定制模板
 - slot内容属于父级模板，slot上的方法写在父级。
 
###component （2）
- 子组件调用父组件的方法
        
        <component @tochild="父组件fn"></component>
        //子组件methods里调用下面
        this.$emit('tochild','参数')
- 父组件给子组件传递数据
        
        <component :m="data数据" a="字符串"></component>     
-  父组件调用子组件方法  
        通过ref调用子组件方法。
        
        ref如果放在组件上获取的是组件的实例，并不是组件的dom元素
        
        
        <loading ref="load"></loading>
        //this.refs.load拿到整个loading组件，就可以调用组件内的方法。
        mounted(){
            this.refs.load.fn() //调用子组件方法
            this.$refs.load.$el  //操作子组件dom
        }
- keep-alive
   
    - vue自定义的标签，把组件放在里面可以缓存，不会销毁。   
    
    - 缓存了就不会再走一遍钩子函数了
 ###vue的生命周期（2）    
 - mounted 异步方法，数据变化后，dom的渲染是异步的。
    - 在mounted方法中要获取真实的dom，要在this.$nextTick()方法中获取。
    
 ### component （3）
 - 组件可以循环，v-for。
 
 ###eventBus(不用了)
 - 使用极简项目（vuex取代了）
 - 发布订阅模式
 - 同级或者隔级组件数据传递
 - 多个组件的情况下比较混乱
 - 创建一个第三方实例，通过第三方实例进行交互。
 
        let EventBus = new Vue;
        //组件1中监听事件
        EventBus.$on('changeRed', val => {});
        //组件2中调用事件
        EventBus.$emit('changeRed',val)
###vue-route   
- 访问不同的路径返回不同的结果。
- 单页面应用（spa single page application）
- 不属于vue的一部分，vue把它抽取出来了。vue是一个渐进式框架。
- 前端跳转的单页模式有hash模式(#/xxx),h5d1history.pushState('','','/adad').
- 开发时使用hash模式，不会导致404模式，上线用h5.
- hash模式不支持SEO。
- 路由切换组件会销毁。用keep-alive缓存。

###带参数的路由/:x
- 复用相同的路由，通过参数加载不同内容。组件不会销毁。
- 用watch监控参数，获取ajax数据

`test6`

###webpack的一些内容。
###vue路由和插件

`test7`

###vue-book 用vue-cli搭建一个项目
- 路由加载的组件就不会出现{{}}闪烁的问题了。
- 分页面缓存 路由元信息

`test8`
##用vuex构建项目
   
  
                 
        
        
        
    
       
        