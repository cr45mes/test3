// axios二次封装
import axios from 'axios'
import config from './../config'
import { ElMessage } from 'element-plus'
import router from './../router'
const TOKEN_INVALID = 'Token认证失败,请重新登陆'
const NET_ERROR = '网络请求异常，请稍后重试'

//创建axios实例对象，添加全局变量
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000
})

//请求拦截
service.interceptors.request.use((req) => {
  //TO-DO
  const headers = req.headers
  if (!headers.Authrization) headers.Authorization = 'Bear jack'
  return req
})

//响应拦截
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data
  if (code === 200) {
    return data
  } else if (code === 40001) {
    ElMessage.error(TOKEN_INVALID)
    setTimeout(() => {
      router.push('./login')
    }, 15000)
    return Promise.reject(TOKEN_INVALID)
  } else {
    ElMessage.error(msg || NET_ERROR)
    return Promise.reject(msg || NET_ERROR)
  }
})
/* 请求核心函数
options 请求配置
*/

function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
  }
  return service(options)
}

// ['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
//   request[item] = (url, data, options) => {
//     return request({
//       url,
//       data,
//       method: item,
//       ...options
//     })
//   }
// })

export default request
