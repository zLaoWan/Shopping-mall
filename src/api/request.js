// 对axios进行二次封装
import axios from "axios"

// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import 'nprogress/nprogress.css';
import store from "@/store";

// 1.利用axios对象的方法 创建一个axios示例
// 2.requests就是axios 添加了部分配置
const requests = axios.create({
  // 配置对象
  // 基础路径 在发送请求时 路径中会出现api
  baseURL: '/api',
  // 代表请求超时的时间为5s
  timeout: 5000,
});
// 请求拦截器 再发送请求前 请求拦截器可以检测到 可以在发出前做一些事
requests.interceptors.request.use(config=> {
  // 请求头添加一个字段 userTempId
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 携带token带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }

  // 进度条开始动
  nprogress.start()

  // config 配置对象 对象里有一个属性很重要 headers请求头
  return config
});

// 请求拦截器
requests.interceptors.response.use(res=> {
  // 进度条结束
  nprogress.done()

  // 成功的回调 服务器相应数据返回后 拦截器可以检测到 可以做一些事
  return res.data
}, error=> {
  console.log(error)
  // 失败的回调函数
  return Promise.reject(new Error('faile'))
});

// 对外暴露
export default requests;
