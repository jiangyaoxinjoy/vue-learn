<template>
  <div>
    <Mheader :back="true">首页</Mheader>
    <div class="content">
      <Loading v-if="loading"></Loading>
      <template v-else>
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
      </template>
    </div>
  </div>
</template>

<script>
  import Mheader from '../../../../test8/vue-book/src/base/Mhaeder';
  import Swiper from '../../../../test8/vue-book/src/base/Swiper';
  import {getAll} from "../../../../test8/vue-book/src/api";
  import Loading from '../../../../test8/vue-book/src/base/Loading';

  export default {
    name: "Home",
    data() {
      return {
        sliders: [],
        hotBooks: [],
        loading: true
      }
    },
    components: {
      Mheader, Swiper, Loading
    },

    created() {
      this.getData();
    },
    methods: {
      async getData() {
        let [sliders, books] = await getAll();
        this.sliders = sliders;
        this.hotBooks = books;
        this.loading = false;
        //轮播图和热门图书获取完成
      }
    }
  }
</script>

<style scoped lang="less">
  .wrap {
    height: 100%;
    overflow-y: scroll;
  }

  .container {
    width: 90%;
    margin: 0 auto;
    height: 100%;
    h3 {
      color: #999;
      padding: 5px 0;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 10px;
      height: 100%;
      li {
        width: 50%;
        text-align: center;
        margin: 5px 0;
        img {
          width: 100%;
        }
      }
    }
  }
</style>
