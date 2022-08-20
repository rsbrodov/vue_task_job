import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/UsersView.vue'

const routes = [
  {
    path: '/',
    name: 'users',
    component: UsersView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
