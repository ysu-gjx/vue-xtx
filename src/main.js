import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router/index'

import { lazyPlugin } from '@/directives'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia).use(lazyPlugin).use(router).mount('#app')
