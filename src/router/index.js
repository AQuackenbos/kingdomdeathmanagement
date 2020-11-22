import Vue from 'vue'
import VueRouter from 'vue-router'

import { firebase, db, auth } from '@/firebase'

//import Root from '@/views/Root.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
