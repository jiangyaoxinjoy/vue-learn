//arrow fn 不具备this和argument
//自己家没有this就找上一级的this
//没有function关键字

//然后更改this指向
//1) call apply bind
//2) var that = this
//3) =>

//如何确定this的指向。 看谁调用，"." 前面是谁this就是谁
// function a(b) {
//   return function (c) {
//     return b+c;
//   }
// }
let bb = function(b) {
  return function (c) {
    return b+c;
  }
}(1);
console.log( bb(2))
//闭包：函数执行有被销毁的作用域，当执行后返回的结构必须是引用数据类型，被外界变量接收
// let a = b => {
//   return c => {
//     return b+c
//   }
// }
// 大于等于两个箭头的叫高阶函数
// let a =b => c=> b+c;
// console.log(a(3)(1))
