import axios from '@/utils/http'

export const getCategoryAPI = () => {
  return axios.get('/home/category/head')
}
