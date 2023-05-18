import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home/index.vue'
import About from '@/components/about.vue'
const Layout = () => import('@/views/Layout/index.vue')
const Login = () => import('@/views/Login/index.vue')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: '/about', component: About }
    ]
  },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
