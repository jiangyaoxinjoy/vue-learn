<template>
  <div class="detail">
    <Mheader :back="true">详情页{{bid}}</Mheader>
    <div class="content">
      <ul>
        <li>
          <label for="bookName">书的名称:</label>
          <input type="text" v-model="book.bookName" id="bookName">
        </li>
        <li>
          <label for="bookInfo">书的信息:</label>
          <input type="text" v-model="book.bookInfo" id="bookInfo">
        </li>
        <li>
          <label for="bookPrice">书的价格:</label>
          <input type="text" v-model.number="book.bookPrice" id="bookPrice">
        </li>
        <li class="btn">
          <button @click="update">确认修改</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {findOneBook,updateBook} from "../api";
  import Mheader from '../base/Mhaeder'
  export default {
    name: "Detail",
    data() {
      return {
        book: {}
      }
    },
    computed: {
      bid() {
        return this.$route.params.bid
      }
    },
    components: {
      Mheader
    },
    created() { //获取书的详情
      this.getData();
    },
    methods: {
      async getData() { //通过id找到这本书的信息。
        this.book = await findOneBook(this.bid);
        //对象转数组，数组长度为0就跳转到list页面
        Object.keys(this.book).length > 0 ? void 0: this.$router.push('/list');
      },
      async update() {
        await updateBook(this.bid,this.book);
        //后台代码响应res.end后才会执行下面的代码,不然会一直卡住
        this.$router.push('/list');
      }
    },
    watch: {
      bid() {
        this.getData();
      }
    }
  }
</script>

<style scoped lang="less">
  .detail {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    z-index: 10;
    ul{
      /*margin: 0 10px;*/
      /*width: 100%;*/
      padding: 0 10px;
      overflow: hidden;
      /*display: flex;*/
      /*flex-direction: column;*/
      li{
        width: 100%;
      }
      label{
        display: block;
        font-size: 25px;
        font-weight: bold;
        margin: 10px 0;
      }
      input{
        height: 50px;
        width: 100%;
        font-size: 18px;
        padding: 10px;
      }
      .btn{
        text-align: center;
        button{
          background: dodgerblue;
          color: #fff;
          height:45px;
          margin-top: 10px;
          border-radius: 5px;
          padding: 0 20px;
          border: navajowhite;
        }
      }

    }
  }
</style>
// book?id=3 {book}
