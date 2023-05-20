// 购物车相关接口函数
import axios from '@/utils/http'

/**
 *
 * @param {string} skuId
 * @param {Number} count
 * @returns
 */
export const addToCartAPI = ({ skuId, count }) => {
  const url = '/member/cart'
  return axios.post(url, { skuId, count })
}

/**
 * 获取购物车列表数据
 * @returns
 */
export const findNewCartListAPI = () => {
  const url = '/member/cart'
  return axios.get(url)
}

/**
 * 购物车删除  skuId
 * @param {Array} ids 要删除的购物车里商品的skuId集合
 * @returns
 */
export const delCartAPI = (ids) => {
  const url = '/member/cart'
  return axios.delete(url, { data: { ids } })
}

/**
 *
 * @param {Array} list [{skuId,selected,count}]
 * @returns
 */
export const mergeCartAPI = (list) => {
  const url = '/member/cart/merge'
  return axios.post(url, list)
}
