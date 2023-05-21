// 支付相关接口
import axios from '@/utils/http'

// 获取订单信息
export const getOrderAPI = (orderId) => {
  const url = `/member/order/${orderId}`
  return axios.get(url)
}
