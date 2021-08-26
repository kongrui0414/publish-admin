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
