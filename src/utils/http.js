import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

// 基础配置 baseURL timeout
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 拦截请求
instance.interceptors.request.use(
  (config) => {
    // *1. 从pinia获取token数据
    const userStore = useUserStore()
    // *2. 按照后端的要求拼接token数据
    const token = userStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => Promise.reject(e)
)

// 拦截响应
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (e) => {
    ElMessage({
      type: 'warning',
      message: e.response.data.message
    })
    return Promise.reject(e)
  }
)

export default instance
