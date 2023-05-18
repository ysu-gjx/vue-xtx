import axios from '@/utils/http'

/**
 *
 * @description 获取banner
 * @param {*} distributionSite  1表示首页轮播图 2表示分类商品页，默认是1
 * @returns
 */
export const getBannerAPI = (params = {}) => {
  // distributionSite 默认是1
  const { distributionSite = '1' } = params
  return axios.get('/home/banner', {
    params: {
      distributionSite
    }
  })
}

// 获取新鲜好物
export const getNewAPI = () => {
  return axios.get('/home/new')
}

// 获取人气推荐
export const getHotAPI = () => {
  return axios.get('/home/hot')
}

// 获取产品列表数据
export const getGoodsAPI = () => {
  return axios.get('/home/goods')
}
