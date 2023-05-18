import axios from '@/utils/http'

// 根据一级分类 id 获取对应一级分类数据
export const getTopCategoryAPI = (id) => {
  return axios.get(`/category`, {
    params: { id }
  })
}
// 根据二级分类 id  获取对应二级分类列表数据
export const getSubCategoryAPI = (id) => {
  return axios.get(`/category/sub/filter`, {
    params: { id }
  })
}

// 根据  分类id 获取商品列表/category/goods
/**
 *
 * @param {*} data categoryId page  pageSize sortField:[publishTime,orderNum,price,evaluateNum]
 * @returns
 */
export const getGoodsFilterAPI = (data) => {
  // 这个url 好像是临时的  分页查有一个 '/category/goods'
  return axios.post('/category/goods/temporary', data)
}
