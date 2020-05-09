import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/shelf'
  },
  {
    path: '/book',
    component: () => import('../views/book/index.vue'),
    children: [
      {
        path: ':fileName',
        component: () => import('../components/book/BookReader.vue')
      }
    ]
  },
  {
    path: '/bookMall',
    component: () => import('../views/bookMall/index.vue'),
    redirect: '/bookMall/home',
    children: [
      {
        path: 'home',
        component: () => import('../views/bookMall/home')
      },
      {
        path: 'list',
        component: () => import('../views/bookMall/StoreList')
      },
      {
        path: 'detail',
        component: () => import('../views/bookMall/StoreDetail')
      }
    ]
  },
  {
    path: '/shelf',
    component: () => import('../views/shelf/Shelf')
  },
  {
    path: '/directory',
    component: () => import('../views/shelf/Directory')
  },
  {
    path: '/user',
    component: () => import('../views/user/index.vue'),
    redirect: '/user/userCenter',
    children: [
      {
        path: 'userCenter',
        component: () => import('../views/user/UserCenter')
      },
      {
        path: 'login',
        component: () => import('../views/user/Login')
      },
      {
        path: 'register',
        component: () => import('../views/user/Register')
      },
      {
        path: 'editUserInfo',
        component: () => import('../views/user/EditUserInfo')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
