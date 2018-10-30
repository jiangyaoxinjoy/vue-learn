import Vue from 'vue';
import Vuex from 'vuex';
import  logger from 'vuex/dist/logger' //一个日志插件
Vue.use(Vuex)

import mutations from './mutations';
import state from './state';
import getters from  './getters';

export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins:[logger()],
  strict: true //严格模式，只能通过mutation来更改state
})
