import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
import Publish from '@/views/publish/'
import Image from '@/views/image/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'layout', // 如果有默认子路由，就不要给父路由起名
    component: Layout,
    children: [
      {
        path: '', // path为空会作为默认子路由渲染
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      },
      {
        path: '/image',
        name: 'image',
        component: Image
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫：所有页面导航都会经过这里
// to:
// from:
// next: 放行的方法
router.beforeEach((to, from, next) => {
  // 如果访问的不是login页面，要检验登录状态
  // 没有登录就跳转到登录，已登录就允许通过
  
  const user = JSON.parse(window.localStorage.getItem('user'))
  
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      // 没有登录跳转到登录页
      next('/login')
    }
  } else {
    // 允许通过
    next()
  }
})

export default router
