<template>
  <div>
    <Mheader>列表</Mheader>
    <div class="content">
      <ul>
        <router-link
          to="/home" v-for="(book,index) in bookList"
          tag="li"
          :key="index"
          :to="{path:'/detail',params:{bid:book.bookId},name:'detail'}"
        >
          <mt-cell-swipe
            title=""
            :right="[
        {
          content: '删除',
          style: { background: 'salmon', color: '#fff',height:'45px',marginTop:'50px',borderRadius: '15px'},
          handler: function(){ delBook(book) }
        }
      ]">
            <img :src="book.bookCover" alt="book.bookInfo">
            <div>
              <h4>{{book.bookName}}</h4>
              <p>{{book.bookInfo}}</p>
              <b>{{book.bookPrice}}</b>
            </div>
          </mt-cell-swipe>
        </router-link>

      </ul>
    </div>
  </div>
</template>

<script>
  import Mheader from '../base/Mhaeder';
  import {getBooks, removeBook} from "../api";

  export default {
    name: "List",
    data() {
      return {
        bookList: []
      }
    },
    components: {
      Mheader
    },
    created() {
      this.getBookList();
    },
    methods: {
      async getBookList() {
        this.bookList = await getBooks();
      },
      delBook(book) {
        console.log(book);
        this.$messagebox.confirm("确定要删除:" + book.bookName, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          return removeBook(book.bookId);
        }).then((res) => {
          this.bookList = this.bookList.filter(item => item !== book);
          this.$messagebox({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$messagebox({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>
<style scoped lang="less">
  .content {
    padding: 10px;
    .mint-cell-value {

      img {
        width: 140px;
        height: 140px;
      }
      h4 {
        margin-top: 5px;
        font-size: 25px;
        height: 25px;
        margin-bottom: 20px;
        overflow: hidden; /*自动隐藏文字*/
        text-overflow: ellipsis; /*文字隐藏后添加省略号*/
        white-space: nowrap; /*强制不换行*/
      }
      p {
        color: #2a2a2a;
        height: 55px;
        line-height: 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      b {
        color: salmon;
        height: 20px;
        line-height: 20px;
      }
    }
  }

</style>
