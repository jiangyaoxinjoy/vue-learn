// 发布emit订阅 on 模式
//{失恋： ['哭','购物','吃']}

function Girl() {
    this._events = {};
} //{失恋: [cry]}
Girl.prototype.on = function (eventName, callback) {
    if(this._events[eventName]) { //已经绑定事件，不是第一次
        this._events[eventName].push(callback); //{失恋: [cry,shopping,eat]}
    }else{
        this._events[eventName] = [callback]
    }
};
//...args 除了第一个，剩余的参数
Girl.prototype.emit = function (eventName,...args) {
    if(this._events[eventName]) {
        // this._events[eventName].forEach( cb => cb.apply(this,args));
        //...args这里把数组展开
        this._events[eventName].forEach( cb => cb(...args));
    }
};
let girl = new Girl();
let cry = (who) => {
    console.log(who+'哭');
};
let shopping = (who) => {
    console.log(who+'购物');
};
let eat = (who) => {
    console.log(who+'吃');
};
girl.on('失恋',cry);
girl.on('失恋',shopping);
girl.on('失恋',eat);

girl.emit('失恋','我','你');