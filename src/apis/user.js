// * 封装所有和用户相关的接口函数
import axios from '@/utils/http'

export const loginAPI = (data) => {
  const url = '/login'
  return axios.post(url, data)
}

// *封装猜你喜欢接口
export const getLikeListAPI = ({ limit = 4 }) => {
  return axios.get('/goods/relevant', {
    params: {
      limit
    }
  })
}
