import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home/index.vue'
const Layout = () => import('@/views/Layout/index.vue')
const Login = () => import('@/views/Login/index.vue')
const Category = () => import('@/views/Category/index.vue')
const SubCategory = () => import('@/views/SubCategory/index.vue')

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      { path: '', name: 'home', component: Home },
      {
        path: 'category/:id',
        name: 'category',
        component: Category
      },
      {
        path: 'category/sub/:id',
        name: 'sub-category',
        component: SubCategory
      }
    ]
  },
  { path: '/login', name: 'login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
