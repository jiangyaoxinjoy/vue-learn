// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { CellSwipe , MessageBox } from 'mint-ui';
import '../static/css/mintui-style.css'
Vue.component(CellSwipe.name, CellSwipe);
Vue.prototype.$messagebox = MessageBox;

//导入轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'
//使用轮播图插件
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = true;//打开vue devtool
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
