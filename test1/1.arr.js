let arr = [1,3,5,6,9];
arr.b = 100; //b是数组的私有属性
let obj = {school:'zxxx',age:18};
Object.prototype.num = '50'
/**
 * for
 * 不会打印出数组的私有属性
 */
for(let i = 0;i < arr.length;i++) { //编程式
  // console.log(arr[i])
}

//面试：forEach, for, for in, for of的区别
/**
 *forEach
 * 不支持return
 * 不会打印出数组的私有属性
 */
arr.forEach( (element, index, array) => { // 声明式(不关心如何实现)
  // console.log(element)
})

/**
 * for in
 *变量key可以是数组元素，也可以是对象的属性
 * 可以打印出私有属性
 */
for(let key in arr) {
  //console.log(typeof key) //type为string
  // console.log(key)
}

/***
 * for of es6
 * 支持return
 * 只能遍历数组，不能遍历对象
 */
for(let val of arr) {
  // console.log(val)
}
/**
 * for of 扩展
 * Object.keys()方法会返回一个由一个给定对象的自身可枚举属性组成的数组
 * obj[val]对象的属性值.
 * 为什么不是obj.val。因为 '.' 会将val转换成string，[]在括号内val是一个变量
 */
for(let val of Object.keys(obj)) {
  // console.log(obj[val])
}

/**
 *filter
 * 不操作原数组
 * newArr:最终返回结果,过滤后的新数组
 * return回调函数的返回结果：true or false. 如果是true表示这一项放进新的数组中。false就过滤掉
 */
var newArr = [1,2,3,5,9].filter( (item,index,) => {
  return item > 2 && item < 9
})
// console.log(newArr);

/**
 * map 映射
 * 将原有数组[1,2,3]映射成一个新的数组 <li>1</li>,<li>2</li>,<li>3</li>
 * 不操作原数组
 * 返回新数组
 * 回调函数中返回什么这一项就是什么。
 * `<li>${item}</li>`是es6的模板字符串,变量用${}取值。
 */
let arr1 = [1,2,3].map( item => {
  return `<li>${item}</li>`
})
//join() 方法用于把数组中的所有元素放入一个字符串
// console.log(arr1.join());

//includes返回的是Boolean值
// console.log(arr.includes(5));

/**
 *find
 * find,some,every不会改变原数组
 * 返回满足测试条件的第一个值，找到第一个后停止循环,找不到返回undefined
 */

/**
 * every
  * @arr.every(callback[, thisArg])
 * 如果为 every 提供一个 thisArg 参数，在该参数为调用 callback 时的 this 值。
 * 如果省略thisArg参数，则callback 被调用时的 this 值，在非严格模式下为全局对象，在严格模式下传入 undefined。
 * 数组每个元素依次执行callback函数，找到一个使callback返回false的元素后停止迭代数组，并返回false。否则callback返回true。
 * 找不到也返回false。
 * callback 只会为那些已经被赋值的索引调用。不会为那些被删除或从来没被赋值的索引调用。
 */
/**
 * some
 * arr.some(callback[, thisArg])
 * some和every类似。
 * 找到了这样一个值，some 将会立即返回 true。否则，some 返回false。
 */
let res = [1,3,5,6].every( (item,index) => {
  return item > 1;

})
console.log(res)

/**
 * reducer 迭代器
 * 不会改变原数组
 * @param accumulator 累计器
 * @param currentValue 当前值
 * @param index 索引
 * @param arr 原数组
 * @returns {*} 返回叠加后的结构
 */
//=>箭头函数后没有{}，可以省略return。
const reducer = (accumulator, currentValue, index, arr) => accumulator + currentValue;
// console.log(arr.reduce(reducer));
const reducerCount = (accumulator, currentValue,index) => {
  return (accumulator + currentValue.price * currentValue.count)
}
var arr2 = [{price:30,count:2},{price:20,count:2},{price:10,count:2}];

/**
 * reduce(fn,initValue)
 * @param fn 是迭代器
 * @param initValue 可选参数，累加器的初始值
 */
// console.log(arr2.reduce(reducerCount,0))

//reverse()是一个变异方法，直接改变数组。
// arr.reverse()