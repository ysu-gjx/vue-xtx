<script setup>
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutNav from './components/LayoutNav.vue';
</script>
<template>
  <div>
    <layout-nav />
    <LayoutHeader />
    <router-view></router-view>
    <LayoutFooter />
  </div>
</template>
<style lang="scss" scoped></style>