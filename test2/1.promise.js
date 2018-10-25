let a = '';
//先买菜再做饭
//一个回调函数的写法。
//手动传一个callback
/*
function  buy(callback) {
    setTimeout( () => {
        a = '蘑菇';
        callback(a)
    },2000);
};
buy(function  cookie(val) {
    console.log(val);
});
*/
//promise有三个状态，成功态，失败态，等待状态。
//resolve, reject都是函数。
//new完后返回一个实例，promise的实例就有一个then方法。
let promise= new Promise( (resolve, reject) => {
    console.log(1)
    setTimeout( () => {
        console.log(4)
        a = '5';
        resolve(a)
        // reject(a)
    },100)
});
console.log(2);
//then方法中有两个参数
promise.then( res => {
    console.log(res);
}, err => {
    console.log(err)
});
console.log(3);

function  buyPack() {
    return new Promise( (resolve, reject) => {
        let i = Math.random()*10;
        if(i < 5) {
            resolve('买')
        }else{
            reject('不买')
        }
    })
}
buyPack().then( res => {
    console.log(res)
}, err => {
    console.log(err)
})