//写起来是方法，用起来是属性 使用:{{$store.getters.val}}
const getters = {
  count: (state) => state.cartList.reduce( (total,next) => total + next.bookCount,0),
  total: state => state.cartList.reduce( (prev,next) => prev + next.bookCount * next.bookPrice,0)
};
export default getters;
