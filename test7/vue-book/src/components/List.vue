<template>
  <div>
    <Mheader>列表</Mheader>
    <div class="content" ref="scroll" @scroll="loadMore">
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
            <img v-lazy="book.bookCover" alt="book.bookInfo">
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
  import Mheader from '../../../../test8/vue-book/src/base/Mhaeder';
  import {paging, removeBook} from "../../../../test8/vue-book/src/api";

  export default {
    name: "List",
    data() {
      return {
        bookList: [],
        offset: 0,
        hasMore: true,
        timer: null,
      }
    },
    components: {
      Mheader
    },
    created() {
      this.getBookList();
    },
    methods: {
      loadMore() {
        //节流函数
        //触发
        clearTimeout(this.timer);
        this.timer = setTimeout( () => {
          let {scrollTop,clientHeight,scrollHeight} = this.$refs.scroll;
          if(scrollTop + clientHeight + 20 > scrollHeight) {
            this.getBookList();
          }
        },50);
      },
      async getBookList() {
        if (this.hasMore) {
          //解构返回对象。
          let {hasMore, books} = await paging(this.offset);
          // console.log(this.offset);
          this.hasMore = hasMore;
          this.bookList = [...this.bookList, ...books];
          this.offset = this.bookList.length; //维护偏移量
        }

      },
      delBook(book) {
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
    },
    mounted() {
      //因为在页面添加太多绑定事件，看起来很麻烦，所以下拉刷新的方法用事件监听操作dom的写法。
      let scroll = this.$refs.scroll;
      let top = scroll.offsetTop;
      let disY = 0;
      let start = (e) => {
        if(scroll.offsetTop != top || scroll.scrollTop != 0) return;
        let startY = e.touches[0].pageY; //手指点击的位置
        let move = (e) => {
          let curY = e.touches[0].pageY;
          disY = curY - startY; //拉动距离
          if(disY > 0) {
            if(disY <= 50) {
              scroll.style.top = disY + top +'px';
            } else{
              disY = 50;
              scroll.style.top = 50 + top +'px';
            }

          }else{
            scroll.removeEventListener('touchmove',move);
            scroll.removeEventListener('touchend',end);
          }
        };
        let end = (e) => {
          let timer = setInterval( () => {
            if(disY > 0) {
              disY --;
              scroll.style.top = disY + top +'px';
            }else{
              clearInterval(timer);
              disY = 0;
              scroll.style.top = top +'px';
              scroll.removeEventListener('touchmove',move);
              scroll.removeEventListener('touchend',end);
              console.log('刷新');
              this.bookList = [];
              this.offset = 0;
              this.hasMore = true;
              this.getBookList();
              return;
            }
          },5);
        };
        scroll.addEventListener('touchmove',move);
        scroll.addEventListener('touchend',end);
      }
      scroll.addEventListener('touchstart', start);
    }
  }
</script>
<style scoped lang="less">
  .content {
    padding: 10px;
    .mint-cell-value {

      img {
        /*width: 140px;*/
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
