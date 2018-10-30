// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vue2-animate/dist/vue2-animate.min.css';
import VueLazyload from 'vue-lazyload'
import store from './store';

import { CellSwipe , MessageBox ,Loadmore } from 'mint-ui';
import '../static/css/mintui-style.css'
Vue.component(CellSwipe.name, CellSwipe);
Vue.component(Loadmore.name, Loadmore);
Vue.prototype.$messagebox = MessageBox;
import error from './assets/img/error.png';
import loading from './assets/img/loading.gif'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: error,
  loading: loading,
  attempt: 1
})

//导入轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'
//使用轮播图插件
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = true;//打开vue devtool
/* eslint-disable no-new */

//路由的全局钩子
router.beforeEach( function (to, from, next) {
  // console.log(to);
  document.title = to.meta.title;
  if(to.path === '/collect') { //拦截功能
    // next({path:'/list'}); //跳转功能，比如有权限问题可以去其他页面
    next();
  }else{
    next();
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
