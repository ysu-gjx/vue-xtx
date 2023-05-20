<script setup>
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutFixed from './components/LayoutFixed.vue'

import { useCategoryStore } from '@/stores/categoryStore'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()
onMounted(() => {
  categoryStore.getCategory()
})
</script>
<template>
  <div>
    <LayoutFixed />
    <layout-nav />
    <LayoutHeader />
    <!-- 添加 key 破坏复用机制  强制销毁重建 -->
    <!-- <router-view :key="$route.fullPath"></router-view> -->
    <router-view></router-view>
    <LayoutFooter />
  </div>
</template>
<style lang="scss" scoped></style>
