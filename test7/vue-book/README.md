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
