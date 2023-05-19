import axios from '@/utils/http'

/**
 *
 * @param {商品ID} id
 * @returns
 */
export const getGoodsDetailAPI = (id) => {
  const url = '/goods'
  return axios.get(url, { params: { id } })
}

/**
 *
 * @param {String} id  商品ID
 * @param {Number} type 热销类型，1为24小时，2为周榜，3为总榜，默认为1
 * @param {Number} limit 数量限制
 * @returns
 */
export const getHotGoodsAPI = ({ id, type, limit = 3 }) => {
  const url = '/goods/hot'
  return axios.get(url, {
    params: { id, type, limit }
  })
}
