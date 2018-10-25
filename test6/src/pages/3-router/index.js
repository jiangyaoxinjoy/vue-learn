import Vue from 'vue';
import App from './index.vue';
import router from './router/index.js';

import notify from './plugin/notify.js';
Vue.use(notify, {
	delay:  2000
}); //使用插件，调用install方法。

// console.log(router)
new Vue({
	router,
	render: (h) => h(App)
}).$mount('#app')
