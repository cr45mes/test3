import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './../components/Home.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: {
      title: '首页'
    },
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        component: () => import('./../views/Welcome.vue'),
        meta: {
          title: '欢迎页'
        }
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('./../views/Login.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
