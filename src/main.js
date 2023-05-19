import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from '@/router/index'

import { lazyPlugin } from '@/directives'
import componentPlugin from '@/components'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia).use(lazyPlugin).use(componentPlugin).use(router).mount('#app')
