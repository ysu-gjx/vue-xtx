// * 封装所有和用户相关的接口函数
import axios from '@/utils/http'
export const loginAPI = (data) => {
  const url = '/login'
  return axios.post(url, data)
}
