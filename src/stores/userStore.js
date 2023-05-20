// *管理用户数据相关

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { useCartStore } from './cartStore'

export const useUserStore = defineStore(
  'user',
  () => {
    const cartStore = useCartStore()
    const userInfo = ref({})

    // 登录获取并保存用户信息
    const getUseInfo = async (data) => {
      const res = await loginAPI(data)
      userInfo.value = res.result

      // *合并购物车
      cartStore.mergeCart()
    }

    // 清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {}
      cartStore.clearCart()
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
