<template>
  <div>
    <Mheader>添加一本书</Mheader>
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
        <li>
          <label for="bookCover">书的封面:</label>
          <input type="text" v-model="book.bookCover" id="bookCover">
          <!--<input type="file" v-model="book.bookCover" id="bookCover">-->
        </li>
        <li class="btn">
          <button @click="add">确认添加</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Mheader from '../../../../test8/vue-book/src/base/Mhaeder';
  import  {addBook} from "../../../../test8/vue-book/src/api";

  export default {
    name: "Add",
    data() {
      return {
        book: {}
      }
    },
    components: {
      Mheader
    },
    methods: {
      async add() {
        await addBook(JSON.stringify(this.book))
        this.$router.push('/list')
      }
    },
    computed: {

    }
  }
</script>

<style scoped lang="less">
  ul {
    padding: 0 10px;
    overflow: hidden;
    li {
      width: 100%;
    }
    label {
      display: block;
      font-size: 25px;
      font-weight: bold;
      margin: 10px 0;
    }
    input {
      height: 50px;
      width: 100%;
      font-size: 18px;
      padding: 10px;
    }
    .btn {
      text-align: center;
      button {
        background: dodgerblue;
        color: #fff;
        height: 45px;
        margin-top: 10px;
        border-radius: 5px;
        padding: 0 20px;
        border: navajowhite;
      }
    }

  }
</style>
