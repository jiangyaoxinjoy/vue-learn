const {Class} = require('./Class.js');
//辅组函数，获取数组里某个元素的索引 index
var _indexOf = function(array,key){
  if (array === null) return -1
  var i = 0, length = array.length
  for (; i < length; i++) if (array[i] === item) return i
  return -1
}

var Event = Class.extend({
  //添加监听
  on:function(key,listener){
    //this.__events存储所有的处理函数
    if (!this.__events) {
      this.__events = {}
    }
    if (!this.__events[key]) {
      this.__events[key] = []
    }
    if (_indexOf(this.__events,listener) === -1 && typeof listener === 'function') {
      this.__events[key].push(listener)
    }
    return this
  },
  //触发一个事件，也就是通知
  fire:function(key){

    if (!this.__events || !this.__events[key]) return

    var args = Array.prototype.slice.call(arguments, 1) || []

    var listeners = this.__events[key]
    var i = 0
    var l = listeners.length

    for (i; i < l; i++) {
      listeners[i].apply(this,args)
    }
    return this
  },
  //取消监听
  off:function(key,listener){

    if (!key && !listener) {
      this.__events = {}
    }
    //不传监听函数，就去掉当前key下面的所有的监听函数
    if (key && !listener) {
      delete this.__events[key]
    }

    if (key && listener) {
      var listeners = this.__events[key]
      var index = _indexOf(listeners, listener)

      (index > -1) && listeners.splice(index, 1)
    }

    return this;
  }
})
module.exports = {
  Base : Class.extend(Event,{
    init:function(config){
      //自动保存配置项
      this.__config = config
      this.bind()
      this.render()
    },
    //可以使用get来获取配置项
    get:function(key){
      return this.__config[key]
    },
    //可以使用set来设置配置项
    set:function(key,value){
      this.__config[key] = value
    },
    bind:function(){
    },
    render:function() {

    },
    //定义销毁的方法，一些收尾工作都应该在这里
    destroy:function(){
      this.off()
    }
  })
}
