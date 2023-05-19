// *管理用户数据相关

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})

    const getUseInfo = async (data) => {
      const res = await loginAPI(data)
      userInfo.value = res.result
    }

    // 清楚用户信息
    const clearUserInfo = () => {
      userInfo.value = {}
    }
    return {
      userInfo,
      getUseInfo,
      clearUserInfo
    }
  },
  {
    persist: true
  }
)
