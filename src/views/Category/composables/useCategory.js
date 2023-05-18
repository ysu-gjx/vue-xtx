import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { getTopCategoryAPI } from '@/apis/category'

export function useCategory() {
  const route = useRoute()
  const categoryData = ref({})

  const getCategory = async (id = route.params.id) => {
    const res = await getTopCategoryAPI(id)
    categoryData.value = res.result
  }

  onMounted(() => {
    getCategory()
  })

  /**
   * 监听路由变化
   * to 是目标路由
   */
  onBeforeRouteUpdate((to) => {
    // 存在问题，需要使用最新的路由参数请求最新的分类数据
    getCategory(to.params.id)
  })

  return {
    categoryData
  }
}
