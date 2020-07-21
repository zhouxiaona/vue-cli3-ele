import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router =  new Router({
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
    {
      path: '/other',
      name: 'other',
      component: () => import('@/views/other/index.vue')
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    console.log('-to-', to)
    console.log('-from-', from)
    console.log('-savedPosition-', savedPosition)
  }
})

router.beforeEach((to, from, next) => {
  // console.log('-to-', to)
  // console.log('-from-', from)
  // console.log('-next-', next)
  next()
})

export default router;
