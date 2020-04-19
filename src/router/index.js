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
  }
]

const router = new VueRouter({
  routes
})

export default router
