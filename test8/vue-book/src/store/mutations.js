import  * as Types from  './mutations-types';
const mutations =  { //mutation不支持异步
  [Types.ADD_CART](state,book) { //state默认放入，指的是当前的state
    //如果购物车已经有这本书添加的就是数量。
    let checkBook = state.cartList.find( item => item.bookId === book.bookId);
    if(checkBook) {
      checkBook.bookCount += 1;
      state.cartList = [...state.cartList];
    }else{
      book.bookCount = 1;
      // state.cartList.push(book)
      //两种写法，用新数组替换老数组
      state.cartList = [book,...state.cartList];
      //下面这种写法是错误的。
      // state.cartList[0].bookCount = 1;
    }
  },
  [Types.REMOVE_CART](state,n) {
    state.count -= n;
  },
  [Types.CHANGE_COUNT](state,n) {
    state.count -= n;
  },
  [Types.CLEAR_CART](state,n) {
    state.count -= n;
  }
}
export default  mutations;

//宏 快捷键
