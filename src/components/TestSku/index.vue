<script setup>
import axios from 'axios'
import SKU from './Sku.vue'
import { ref, onMounted } from 'vue'

const goods = ref({})

const getGoods = async () => {
  // * 1135076  初始化就有无库存的规格
  // * 1369155859933827074 更新之后有无库存项（蓝色-20cm-中国）
  const res = await axios.get(
    'http://pcapi-xiaotuxian-front-devtest.itheima.net/goods?id=1369155859933827074'
  )
  goods.value = res.data.result
}

onMounted(() => getGoods())
const getSku = (sku) => {
  console.log(sku)
}
</script>
<template>
  <Sku v-if="goods.id" :goods="goods" @change="getSku" />
</template>
<style lang="" scoped></style>
