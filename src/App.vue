<script setup>
import { ref, watch, onMounted, provide } from 'vue'
import { useCounterStore } from './stores/counter'
import { storeToRefs } from 'pinia'
import { getCategoryAPI } from '@/apis/testAPI'


const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)
const { increment } = counterStore
const size = 'small'
const zIndex = 3000

onMounted(() => {
  counterStore.getList()
  getCategoryAPI()
})

</script>

<template>
  <el-config-provider :size="size" :z-index="zIndex">
    <el-button type="primary">Primary</el-button>
    <div>
      <button @click="increment">{{ count }}</button>
      <span>{{ doubleCount }}</span>
      <p>
        <router-link to="/">Go to Home</router-link>
        <router-link to="/login">Go to Login</router-link>
      </p>
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>