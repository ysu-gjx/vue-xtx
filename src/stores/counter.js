import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'https://mock.apifox.cn/m1/826150-0-default/pet/1'
var config = {
  method: 'get',
  url: 'https://apifox.com/home/category/head',
  headers: {
    'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
  }
}

export const useCounterStore = defineStore('counter', () => {
  // 定义数据 state
  const count = ref(0)

  // 定义修改方法
  const increment = () => {
    count.value++
  }

  // getter
  const doubleCount = computed(() => count.value * 2)

  // action  同步和异步
  const list = ref([])

  const getList = async () => {
    const res = await axios.get(API_URL)
  }

  return {
    count,
    doubleCount,
    increment,
    list,
    getList
  }
})
