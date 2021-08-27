/*
基于 axios 封装的请求模块
 */
// 创建axios实例，复制了一个axios
import axios from 'axios'
// 创建了一个axios实例，复制了一个axios
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' // 请求的基础路径
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    console.log(config)
    // 可以允许定制统一业务功能处理
    // 统一设置token
    const user = JSON.parse(window.localStorage.getItem('user'))
    // 如果有登录用户信息，统一设置token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  })
// 响应拦截器

// 导出请求方法
export default request

// 谁要使用谁就加载 request 模块
// import request from 'request.js'
// request.xxx
// request({
//   method: ,
//   url: ''
// })
