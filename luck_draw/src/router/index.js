import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/home'

// 重写push方法，处理相同路由跳转会报错的问题
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)

const routes = []

routes.push(
  ...[
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home',
        keepAlive: false
      }
    },
    {
      path: '/luckCard',
      name: 'luckCard',
      component: () => import('@/components/luckCard'),
      meta: {
        title: 'Luck card',
        keepAlive: false
      }
    },
    {
      path: '/luckWheel',
      name: 'luckWheel',
      component: () => import('@/components/luckWheel'),
      meta: {
        title: 'Luck wheel',
        keepAlive: false
      }
    },
    {
      path: '/luckCloud',
      name: 'luckCloud',
      component: () => import('@/components/luckCloud'),
      meta: {
        title: 'Luck cloud',
        keepAlive: false
      }
    },
    {
      path: '/luckStar',
      name: 'luckStar',
      component: () => import('@/components/luckStar'),
      meta: {
        title: 'Luck star',
        keepAlive: false
      }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/components/test'),
      meta: {
        title: 'Test',
        keepAlive: false
      }
    }
  ]
)

const router = new VueRouter({
  routes,
  // 页面滚动行为
  scrollBehavior (/* to, from, savedPosition */) {
    return {
      x: 0,
      y: 0
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
