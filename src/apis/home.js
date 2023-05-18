import axios from '@/utils/http'

// 获取banner
export const getBannerAPI = () => {
  return axios.get('/home/banner')
}
