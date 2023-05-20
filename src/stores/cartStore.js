import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'
import { addToCartAPI, findNewCartListAPI, delCartAPI, mergeCartAPI } from '@/apis/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore()
    // *1. 定义state cartList
    const cartList = ref([])
    const isLogin = computed(() => userStore.userInfo.token)

    // * 获取最新购物车列表 action
    const updateNewList = async () => {
      const res = await findNewCartListAPI()
      cartList.value = res.result
    }
    // *2. 定义action  -> 添加到购物车
    const addToCart = async (goods) => {
      /**
       * * 登录后流程   核心就是保持后端数据和本地一致，
       * *1.调用添加购物车接口
       * *2.调用获取购物车列表接口
       * *3.用接口购物车覆盖本地购物车列表
       */
      const { skuId, count } = goods
      if (isLogin.value) {
        await addToCartAPI({ skuId, count })
        updateNewList()
      } else {
        // 判断添加商品是否已在购物车
        const c = cartList.value.find((item) => item.skuId === goods.skuId)
        if (c) {
          c.count += goods.count
        } else {
          cartList.value.push(goods)
        }
      }
    }

    /**
     * @description 根据 skuId 删除
     * @param {String} skuId
     */
    const delCart = async (skuId) => {
      if (isLogin.value) {
        await delCartAPI([skuId])
        updateNewList()
      } else {
        /**
         * *思路
         * *1. 找到对应的商品 下标  findIndex --> splice
         * *2. 直接过滤的方式  filter
         */
        // const index = cartList.value.findIndex(item => item.skuId === skuId)
        // cartList.value.splice(index, 1)

        cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
      }
    }

    // 退出登录清空本地购物车
    const clearCart = () => {
      cartList.value = []
    }

    // 登录的合并购物车操作
    const mergeCart = async () => {
      const list = []
      cartList.value.forEach((goods) => {
        const { skuId, selected, count } = goods
        list.push({
          skuId,
          selected,
          count
        })
      })
      await mergeCartAPI(list)
      updateNewList()
    }

    // 单选功能
    const singleCheck = (skuId, selected) => {
      const cur = cartList.value.find((item) => item.skuId === skuId)
      cur.selected = selected
    }

    // 全选功能
    const checkAll = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }

    // getters 总数量
    const totalCount = computed(() => cartList.value.reduce((acc, cur) => acc + cur.count, 0))
    // getters 总价
    const totalPrice = computed(() =>
      cartList.value.reduce((acc, cur) => acc + cur.count * cur.price, 0)
    )
    // 已选择的数量
    const selectedCount = computed(() =>
      cartList.value.filter((t) => t.selected).reduce((acc, cur) => acc + cur.count, 0)
    )
    // 已选择的价格和
    const selectedPrice = computed(() =>
      cartList.value.filter((t) => t.selected).reduce((acc, cur) => acc + cur.count * cur.price, 0)
    )
    // getter 是否全选
    const isCheckAll = computed(() => cartList.value.every((item) => item.selected))

    return {
      cartList,
      totalPrice,
      totalCount,
      isCheckAll,
      selectedCount,
      selectedPrice,
      addToCart,
      delCart,
      singleCheck,
      checkAll,
      clearCart,
      updateNewList,
      mergeCart
    }
  },
  { persist: true }
)
