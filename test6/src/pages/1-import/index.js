import '../../styles/index.less';

let str = require('./a');
import str2 from  './b';
console.log(str);
console.log(str2);

let test = b => c => d =>b+c+d;
test(1)(3)(4);
[1,2,3].map( item => {
    console.log(item)
})

//import 引入图片路径，或者使用图片的上线路径。否则路径会错误。
import  img1 from '../../assets/img/plane.png'
let img = new Image();
img.src = img1; //路径错误
console.log(document.querySelector('body').appendChild(img))