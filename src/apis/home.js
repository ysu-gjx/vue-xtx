import axios from '@/utils/http'

// 获取banner
export const getBannerAPI = () => {
  return axios.get('/home/banner')
}

// 获取新鲜好物
export const getNewAPI = () => {
  return axios.get('/home/new')
}

// 获取人气推荐
export const getHotAPI = () => {
  return axios.get('/home/hot')
}

export const a = () => {}
