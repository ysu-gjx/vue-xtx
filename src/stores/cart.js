import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    // *1. 定义state cartList
    const cartList = ref([])

    // *2. 定义action  -> 添加到购物车
    const addToCart = (goods) => {
      // 判断添加商品是否已在购物车
      const c = cartList.value.find((item) => item.skuId === goods.skuId)
      if (c) {
        c.count += goods.count
      } else {
        cartList.value.push(goods)
      }
    }

    /**
     * @description 根据 skuId 删除
     * @param {String} skuId
     */
    const delCart = (skuId) => {
      /**
       * *思路
       * *1. 找到对应的商品 下标  findIndex --> splice
       * *2. 直接过滤的方式  filter
       */
      // const index = cartList.value.findIndex(item => item.skuId === skuId)
      // cartList.value.splice(index, 1)
      console.log(skuId)
      cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
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
      checkAll
    }
  },
  { persist: true }
)
