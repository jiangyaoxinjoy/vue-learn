import  axios from 'axios';

//axios.defaults.baseURL会将url加到路径前面。上线可删除
axios.defaults.baseURL = 'http://localhost:3333';

//请求拦截器，结果返回的不是res，而是data
axios.interceptors.response.use( res => {
  return res.data;
});

/**
 * 获取轮播图数据
 * @returns {promise 轮播图对象}
 * 调用方法 getSliders().then()
 */
export let getSliders = () => {
  return axios.get('/sliders')
};
/**
 * 获取热门图书接口
 * @returns {AxiosPromise<any>}
 */
export let getHotBooks = () => {
  return axios.get('/hot');
}

/**
 * 获取全部图书
 * @returns {AxiosPromise<any>}
 */
export let getBooks = () => axios.get('/book');

/**
 * 删除一本书
 * @param id 书的id
 * @returns {*}
 */
export let removeBook = (id) => axios.delete(`/book?id=${id}`);

/**
 * 获取某一本书
 * @param id
 * @returns {AxiosPromise}
 */
export let findOneBook = (id) => axios.get(`/book?id=${id}`);

/**
 * 修改图书
 * @param id 图书id
 * @param data 修改后的内容 请求体发送
 * @returns {AxiosPromise<any>}
 */
export let updateBook = (id,data) => {
  return axios.put(`/book?id=${id}`,JSON.stringify(data))
};

/**
 * 添加一本书
 * @param data
 * @returns {AxiosPromise<any>}
 */
export let addBook = (data) => axios.post('/book',data);

export let getAll = () => axios.all([getSliders(),getHotBooks()]);

/**
 * 分页
 * @param offset 根据偏移量返回对应数据 5 =》 5-10；
 * @returns {AxiosPromise<any>}
 */
export let paging = offset =>  axios.get(`/page?offset=${offset}`);
