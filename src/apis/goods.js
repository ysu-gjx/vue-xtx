import axios from '@/utils/http'

export const getGoodsDetailAPI = (id) => {
  const url = '/goods'
  return axios.get(url, { params: { id } })
}
