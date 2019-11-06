import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:'/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: () => import('@/views/goods/index.vue')
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: () => import('@/views/goodsDetail/index.vue')
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: () => import('@/views/ratings/index.vue')
    },
    {
      path: '/seller',
      name: 'seller',
      component: () => import('@/views/seller/index.vue')
    },
  ]
})
