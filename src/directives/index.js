import { useIntersectionObserver } from '@vueuse/core'

// 图片懒加载 插件
export const lazyPlugin = {
  install(app) {
    app.directive('img-lazy', {
      // el: 指令绑定的那个元素 img
      // binding: binding.value  指令等于号后面绑定的表达式的值  图片url
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            el.src = binding.value
            stop()
          }
        })
      }
    })
  }
}
