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
    component: () => import('../views/Survivors.vue'),
    meta: {
      requiresAuth: true
    },
    children: [{
      path: ':id'
      // TODO Move this to an actual subcomponent lol
    }]
  },
  {
    path: '/settlement',
    name: 'Settlement',
    component: () => import('../views/Settlement.vue'),
    meta: {
        requiresAuth: true
    }
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: () => import('../views/Timeline.vue'),
    meta: {
        requiresAuth: true
    }
  },
  {
    path: '/innovations',
    name: 'Innovations',
    component: () => import('../views/Innovations.vue'),
    meta: {
        requiresAuth: true
    }
  },
  {
    path: '/storage',
    name: 'Storage',
    redirect: '/storage/resources',
    component: () => import('../views/Storage.vue'),
    meta: {
        requiresAuth: true
    },
    children: [{
        name: 'tab-resources',
        path: 'resources',
        component: () => import('../views/Storage.vue')
      },{
        name: 'tab-gear',
        path: 'gear',
        component: () => import('../views/Storage.vue')
      },{
        name: 'tab-grids',
        path: 'grids',
        component: () => import('../views/Storage.vue')
    }]
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