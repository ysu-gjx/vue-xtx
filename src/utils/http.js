import axios from 'axios'

// 基础配置 baseURL timeout
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 拦截请求
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (e) => Promise.reject(e)
)

// 拦截响应
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (e) => Promise.reject(e)
)

export default instance
