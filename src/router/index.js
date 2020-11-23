import Vue from 'vue'
import VueRouter from 'vue-router'

import { firebase } from '@/firebase'

//import Root from '@/views/Root.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/survivors',
    name: 'Survivors',
    
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(user => {
      if(user)
        next()
      else
        next('/')
    })
  } else {
    next()
  }
})

export default router