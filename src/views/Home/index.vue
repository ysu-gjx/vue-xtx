<script setup>
import HomeBanner from './components/HomeBanner.vue';
import HomeCategory from './components/HomeCategory.vue';
import HomeHot from './components/HomeHot.vue';
import HomeNew from './components/HomeNew.vue';
import HomeProduct from './components/HomeProduct.vue';
import HomePanel from './components/HomePanel.vue';
</script>
<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <HomeProduct />
  <HomePanel title="新鲜好物" sub-title="新鲜好物 商品多多">
    <div>woshi 新鲜好物</div>
  </HomePanel>
  <HomePanel title="人气推荐" sub-title="人气推荐 商品多多">
    <div>我是人气推荐按</div>
  </HomePanel>
</template>
<style lang="" scoped>

</style>