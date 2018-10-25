import Vue from "vue";
import VueRouter from "vue-router";

import Home from '../littlepages/home.vue';
import List from '../littlepages/list.vue';

//Vue.use 注册全局内容，是一种插件的写法
Vue.use(VueRouter);

const routes = [
	{path: '',component: Home},
	{path: '/home',component: Home},
	{path: '/list',component: List}
]
let router = new VueRouter({
		routes
})
export default router;
