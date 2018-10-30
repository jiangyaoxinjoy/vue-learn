import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('../components/Home');
const List = () => import('../components/List');
const Collect = () => import('../components/Collect');
const Add = () => import('../components/Add');
const Detail = () => import('../components/Detail');

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/home',
      component: Home,
      meta: {
        keepAlive: true,
        title:"首页"
      }
    }, // 路由元信息 this.$route.meta.keepAlive
    {path:'/list',component: List,meta: {keepAlive: true,title:"列表"}},
    {path:'/collect',component: Collect,meta:{title:"收藏"}},
    {path:'/add',component: Add,meta:{title:"添加"}},
    // {bid:1}路径参数，要求必须有，可以随机
    {path:'/detail/:bid',component: Detail,name:'detail',meta:{title:"详情"}},
    {path:'*',redirect:'/home'}
  ]
})
