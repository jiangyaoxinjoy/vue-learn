import  modal from './notify.vue';
let notify = { //此对象需要拥有一个install的方法

};


/**
 * [install description] 插件应该有一个公开方法 install。
 * @param  {[type]} Vue     [这个方法的第一个参数是 Vue 构造器，]
 * @param  {[type]} options [第二个参数是一个可选的选项对象,默认值3秒]
 * @return {[type]}         [description]
 */
notify.install = function(Vue, options= {delay:3000}) {
	//1.Vue构造函数上添加方法
	Vue.say = function(){
		console.log('eeee');
	}

	//2.注册全局组件
	Vue.component('test',modal);

    /**
	 * 3.Vue原型上添加方法
	 * this.$notify('xxxx',{delay:1000})
	 * 这里传的opt优先级最高，覆盖前面的options。
     */
	Vue.prototype.$notigy = function (message,opt={}) {
		if(notify.el) return;

        //用自己调用插件是传递过来的属性覆盖掉默认值。
		options = {...options, ...opt}

        //返回的是一个Vue的构造函数的子类，参数是一个包含组件选项的对象。
		let V = Vue.extend( modal);

		//创建实例。
		let vm = new V;
		vm.msg = message;

		//创建挂载实例的元素
		let oDiv = document.createElement('div');
		vm.$mount(oDiv);

		//vm实例会在生命周期里创建vm.$el替换掉oDiv.
		document.body.appendChild(vm.$el); //把当前实例的真实对象放进页面

		//vm.$el暂存在notify.el上，防止多次触发。
		notify.el = vm.$el;

		//移除dom元素
		setTimeout( () => {
			document.body.removeChild(vm.$el); //删除实例上的元素。
            notify.el = null;
		},options.delay);
    }
};

//导出包含install的notify对象，使用Vue.use就会调用install方法。
export default notify;
