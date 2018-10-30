<template>
  <div class="footer-nav">
    <router-link to="/home"><i class="iconfont icon-shouye"></i><span>home</span></router-link>
    <router-link to="/list"><i class="iconfont icon-chazhaobiaodanliebiao"></i><span>list</span></router-link>
    <router-link to="/collect"><i class="iconfont icon-shoucang"></i><span>购物车</span></router-link>
    <router-link to="/add"><i class="iconfont icon-tianjia"></i><span>添加</span></router-link>
  </div>
</template>

<script>
    export default {
        name: "Tab",
        data() {
            return {}
        }
    }
</script>

<style scoped lang="less">
  .footer-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    border-top: 1px solid #cccccc;
    z-index: 10;
    background-color: #fff;
    a{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center; //垂直居中
      align-items: center; //横向居中
      color: dimgray;
      &.router-link-active{
        color: salmon;
      }
    }

  }
</style>
