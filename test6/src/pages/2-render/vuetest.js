// 引入的Vue并不是vue.js，而是vue的runtime
// vue = compiler + runtime (compiler可以编译模板)
import Vue from 'vue';

//最后这个js文件都会打包到html里，所以可以直接取html的元素。
// new Vue({
// 	el: "#app"
// })

//runtime-only不支持template compiler.


/*
//1.引入vue.js
// vue.js包含了compiler + runtime，但compiler有6k大小。
import Vue from 'vue/dist/vue.js';
new Vue({
	template: `<div>aaa</div>`
}).$mount('#app');
*/

/*
//2.用render函数
new Vue({
	//render函数的作用是将虚拟的dom渲染成真实的dom
	render: function(createElement) {
		//转换成虚拟dom，一个对象。
		//createElement返回虚拟dom。
		console.log(createElement('h1',[
			'hello',
			createElement('h3','jyx')
		]));
		return createElement('h1',[
			'hello',
			createElement('h3','jyx')
		]);
	}
}).$mount('#app');
*/

import Test from './test.vue'; //文件模块要加 ./
console.log(Test); //一个对象
//通过createElement方法把Test渲染成一个虚拟dom
new Vue({
	render: (h) => h(Test)
}).$mount('#app');
