##项目用到less

```angularjs
npm i less less-loader  axios vuex bootstrap -D
```

- mock 模拟后台数据
- api 所有的借口
- base 基础组件，可以复用的组件
- components 页面级组件

##写一个功能

###图书功能

- 先写后台服务端，一个接口，返回一些图书
  - 在mock的server.js里写，确保数据正常返回
  - 数据放在book.json里
- 增加api方法，实现前端调取数据的功能
  - 在src目录的api里写方法
- 在应用这个api的组件调用这个方法。 
  - 一般不在基础组件调用，在父级页面调用，因为基础组件可以复用，接口不同。

###路由
- 路由分页面缓存
  - $this.route.meta.keepAlive
- 路由动画     
  - transition
    
       ```angularjs
        npm install --save vue2-animate
        import 'vue2-animate/dist/vue2-animate.min.css';
        name="fade"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut"
       ```

###list页面下拉加载 /page ? offset = 5
- 默认每次五条，前台提供从第几条开始给
- 后台告诉前端是否有更多数据。hasMore:true.
  - listMint.vue是用mintui写的上拉加载更多。
  - scroll使用 节流函数
      ```base
        clearTimeout(this.timer);
        this.timer = setTimeout( () => {
          let {scrollTop,clientHeight,scrollHeight} = this.$refs.scroll;
          console.log(scrollTop)
        },1300);
      ```
###list页面下拉刷新
###图片懒加载
###coding split 代码分割
- 点一个页面加载当前页js，css
- vue-router的官网里找懒加载
- 修改router，将组件改成函数。
###打包上线
- 代码放在 HTTP server.服务器上
    - 路径都是'/'开头，本地路径不支持，http sever支持。
- server.js 写一个静态服务。
- 把dist文件夹内容放入mock文件夹内。
- 启动sever.js。
- http://localhost:3333/index.html浏览器跑这个地址。
- 购买一个阿里服务器，用fileZilla连接服务器，将mock代码传到服务器上。
-打开git cmd ssh 账户名@地址 
  - 地址在阿里服务器上找 
- 然后进入目录启动node server.js
- 通过网址访问xxxx:3333

###全局路由钩子
- 写在main.js里
- router.beforeEach()
