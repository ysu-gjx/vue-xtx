import { ref, computed, onUnmounted } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
  let timer = null
  // 响应式的数据
  const time = ref(0)
  // 格式化数据
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))

  // 开始倒计时函数
  const start = (currentTime) => {
    // 核心逻辑 每隔1s 减一
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }

  onUnmounted(() => {
    timer && clearInterval(timer)
  })

  return {
    formatTime,
    start
  }
}
