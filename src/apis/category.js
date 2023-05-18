import axios from '@/utils/http'

// 获取二级分类列表
export const getTopCategoryAPI = (id) => {
  return axios.get(`/category`, {
    params: { id }
  })
}
