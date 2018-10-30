<template>
  <div>
    <Mheader>购物车</Mheader>
    <ul class="content">
      <li v-for="b in cartList">
        <img :src="b.bookCover" alt="">
        <div>
          <h3>{{b.bookName}}</h3>
          <p>单价：{{b.bookPrice}}</p>
          <button>-</button>
          {{b.bookCount}}
          <button>+</button>
          <p>小计：{{b.bookCount * b.bookPrice | formatId(2)}}</p>
        </div>
      </li>
      <li class="foot-li">
        <span>共 <b>{{count}}</b> 本书</span>
        <span>总价: {{total | formatId(2)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import Mheader from '../base/Mhaeder'
  import {mapState,mapGetters} from 'vuex'

  export default {
    name: "Collect",
    data() {
      return {}
    },
    components: {
      Mheader
    },
    computed: {
      // val() {} 而cartList: []是一个对象
      //将mapState这个对象展开
      ...mapState(['cartList']),
      /*
      //和下面是等价的
      carts() {
        return this.$store.store.cartList;
      }
      */
        ...mapGetters(['count','total'])
    },
    filters: {
      formatId(val, n) {
        return '￥' + val.toFixed(n)
      }
    }
  }
</script>

<style scoped lang="less">
  .content {
    .foot-li{
     span{
       flex:1;
     }
    }
    li {
      display: flex;
      img {
        height: 140px;
      }
      > div {
        flex: 1;
        overflow: hidden;
        h3 {
          height: 45px;
          line-height: 45px;
          font-size: 20px;
        }
        button {
          -webkit-appearance: none;
          padding: 0 10px;
          height: 30px;
          line-height: 30px;
        }
        p {
          height: 25px;
          line-height: 25px;
          font-size: 18px;
        }
      }
    }
  }
</style>
