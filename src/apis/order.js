// 会员中心订单页
import axios from '@/utils/http'

/**
 *
 * @param {Number} page 1
 * @param {*} pageSize 10
 * @param {*} orderState 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 * @returns
 */
export const getOrderListAPI = (params) => {
  const url = '/member/order'
  return axios.get(url, {
    params
  })
}
