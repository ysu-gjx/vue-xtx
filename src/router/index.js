import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home/index.vue'
const Layout = () => import('@/views/Layout/index.vue')
const Login = () => import('@/views/Login/index.vue')
const Category = () => import('@/views/Category/index.vue')
const SubCategory = () => import('@/views/SubCategory/index.vue')
const Detail = () => import('@/views/Detail/index.vue')
const CartList = () => import('@/views/CartList/index.vue')

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
      },
      {
        path: 'detail/:id',
        name: 'detail',
        component: Detail
      },
      {
        path: 'cartlist',
        name: 'cart-list',
        component: CartList
      }
    ]
  },
  { path: '/login', name: 'login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // 路由滚动行为定制
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
