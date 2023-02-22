import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/register',
    name: 'regis',
    component: () => import('@/views/register')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    redirect:'/home',
    children:[,
      {
        path:'home',
        name:'home',
        component:() => import('@/views/home')
      },
      {
        path:'user-info',
        name:'userinfo',
        component:() => import('@/components/home/profile/userinfo')
      },
      {
        path:'user-avatar',
        name:'useravatar',
        component:() => import('@/components/home/profile/uploadimg')
      },
      {
        path:'user-pwd',
        name:'userpassword',
        component:() => import('@/components/home/profile/password')
      },
      {
        path:'art-cate',
        component:() => import('@/components/home/article/articleCatigore')
      },
      {
        path:'art-list',
        component:() => import('@/components/home/article/articList')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

const whiteList = ['/login', '/register']

router.beforeEach((to, from, next) => {
  const token = store.state.myToken
  if (token) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }

  }
})

export default router
