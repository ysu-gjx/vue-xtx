import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

import router from '@/router'

/**
 * * 不能使用下面useRouter, 那个是为了在组合式API中访问this.$router
 * ! import { useRouter } from 'vue-router'
 */

// const router = useRouter()

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
    const userStore = useUserStore()
    ElMessage({
      type: 'warning',
      message: e.response.data.message
    })
    // 401 处理token 失效情况，前往登录页
    if (e.response.status === 401) {
      userStore.clearUserInfo()
      router.push({
        path: '/login'
      })
    }
    return Promise.reject(e)
  }
)

export default instance
