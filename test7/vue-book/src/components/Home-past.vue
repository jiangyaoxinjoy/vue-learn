<template>
<div>
  <Mheader :back="true">首页</Mheader>
  <div class="content">
    <Swiper :swiperSlides="sliders"></Swiper>
    <div class="container">
      <h3>热门图书</h3>
      <ul>
        <li v-for="book in hotBooks" :key="book.bookId">
          <img :src="book.bookCover" alt="book.bookInfo">
          <b>{{book.bookName}}</b>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
  import Mheader from '../../../../test8/vue-book/src/base/Mhaeder';
  import Swiper from '../../../../test8/vue-book/src/base/Swiper';
  import {getSliders,getHotBooks} from "../../../../test8/vue-book/src/api";
  export default {
      name: "Home",
      data() {
          return {
            sliders: [],
            hotBooks: []
          }
      },
      components: {
        Mheader,Swiper
      },

      created() {
        this.getSliderFn();
        this.getBooksFn()
      },
      methods: {
        /*
        //async await promise的语法糖
        async getSliderFn() {
          //data:sliders给data起别名，data这个属性名和return的结果是一致的。
          //就是getSliders()返回了一个对象，对象中对应的data
          let {data:sliders} =  await getSliders();
          this.sliders = sliders;
        },
        async getBooksFn() {
          let {data} = await getHotBooks();
          this.hotBooks = data;
          console.log(data);
        }
        */

        //在api中配置了axios的代码拦截器，直接返回data数据，使代码更加简洁。
        async getSliderFn() {
          this.sliders = await getSliders();
        },
        async getBooksFn() {
          this.hotBooks = await getHotBooks();
        }
      }
  }
</script>

<style scoped lang="less">
.container{
  width: 90%;
  margin: 0 auto;
  h3{
    color: #999;
    padding: 5px 0;
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
    li{
      width: 50%;
      text-align: center;
      margin: 5px 0;
      img{
        width: 100%;
      }
    }
  }
}
</style>
