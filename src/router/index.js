import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/components/home'

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

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 页面滚动行为
  scrollBehavior (/* to, from, savedPosition */) {
    return {
      x: 0,
      y: 0
    }
  }
})

router.beforeEach((to) => {
  document.title = to.meta.title
})

export default router
