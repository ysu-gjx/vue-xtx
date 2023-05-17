<script setup>
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutNav from './components/LayoutNav.vue';
import LayoutFixed from './components/LayoutFixed.vue';

import { useCategoryStore } from '@/stores/category';
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
    <router-view></router-view>
    <LayoutFooter />
  </div>
</template>
<style lang="scss" scoped></style>