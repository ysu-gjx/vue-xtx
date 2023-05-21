import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/Home/index.vue')
const Layout = () => import('@/views/Layout/index.vue')
const Login = () => import('@/views/Login/index.vue')
const Category = () => import('@/views/Category/index.vue')
const SubCategory = () => import('@/views/SubCategory/index.vue')
const Detail = () => import('@/views/Detail/index.vue')
const CartList = () => import('@/views/CartList/index.vue')
const Checkout = () => import('@/views/Checkout/index.vue')
const Pay = () => import('@/views/Pay/index.vue')
const PayBack = () => import('@/views/Pay/PayBack.vue')
const Member = () => import('@/views/Member/index.vue')
const UserInfo = () => import('@/views/Member/components/UserInfo.vue')
const UserOrder = () => import('@/views/Member/components/UserOrder.vue')

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
      },
      {
        path: 'checkout',
        name: 'checkout',
        component: Checkout
      },
      {
        path: 'pay',
        query: {
          id: { required: true }
        },
        name: 'pay',
        component: Pay
      },
      {
        path: 'member',
        name: 'member',
        component: Member,
        children: [
          {
            path: '',
            name: 'user',
            component: UserInfo
          },
          {
            path: 'order',
            name: 'order',
            component: UserOrder
          }
        ]
      }
    ]
  },
  { path: '/login', name: 'login', component: Login },
  {
    path: '/paycallback',
    name: 'paycallback',
    component: PayBack
  }
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
