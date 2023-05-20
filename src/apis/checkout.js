// 结算页面
import axios from '@/utils/http'

// 获取地址等信息，进入结算页面
export const getCheckoutInfoAPI = () => {
  const url = '/member/order/pre'
  return axios.get(url)
}

// 提交结算信息 生成订单号
export const createOrderAPI = (data) => {
  const url = '/member/order'
  return axios.post(url, data)
}
