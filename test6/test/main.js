//node_modules模块下的文件不需要加 ./
//自己写的文件模块要加 ./

//一个export是一个对象，所有在另一个文件中要将内容解构出来才能使用{}。
//import 拥有声明功能。
//import 具有提升效果
//两种写法
//1.
// console.log(str2);
// import {str,str2} from './a.js';
// console.log(str);

//2.
import * as b from './a.js';
console.log(b)

//export default
//默认导出 c代表default后的结果。
import c from './b.js';
console.log(c)