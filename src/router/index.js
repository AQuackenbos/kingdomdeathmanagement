import Vue from 'vue'
import VueRouter from 'vue-router'

import { firebase } from '@/firebase'

//import Root from '@/views/Root.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/survivors',
    name: 'Survivors',
    component: () => import(/* webpackChunkName: "survivors" */ '../views/Survivors.vue'),
    meta: {
      requiresAuth: true
    },
    children: [{
      path: ':id',
      name: 'Survivors Panel',
      component: () => import(/* webpackChunkName: "survivors" */ '../components/survivor/panel.vue')
    }]
  },
  {
    path: '/settlement',
    name: 'Settlement',
    component: () => import(/* webpackChunkName: "settlement" */ '../views/Settlement.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: () => import(/* webpackChunkName: "timeline" */ '../views/Timeline.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/innovations',
    name: 'Innovations',
    component: () => import(/* webpackChunkName: "innovations" */ '../views/Innovations.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/storage',
    name: 'Storage',
    redirect: '/storage/resources',
    component: () => import(/* webpackChunkName: "storage" */ '../views/Storage.vue'),
    meta: {
      requiresAuth: true
    },
    children: [{
      name: 'tab-resources',
      path: 'resources',
      component: () => import(/* webpackChunkName: "storage" */ '../views/Storage.vue')
    },{
      name: 'tab-gear',
      path: 'gear',
      component: () => import(/* webpackChunkName: "storage" */ '../views/Storage.vue')
    },{
      name: 'tab-grids',
      path: 'grids',
      component: () => import(/* webpackChunkName: "storage" */ '../views/Storage.vue')
    }]
  },
  {
    path: '/grids/edit/:id',
    name: 'GridEdit',
    component: () => import(/* webpackChunkName: "storage" */ '../views/GearGrid.vue')
  },
  {
    path: '/hunt',
    name: 'Hunt',
    component: () => import(/* webpackChunkName: "hunt" */ '../views/Hunt.vue'),
    meta: {
      requiresAuth: true
    },
    children: [{
      name: 'Hunt Setup',
      path: 'setup',
      component: () => import(/* webpackChunkName: "hunt" */ '../components/hunt/setup.vue')
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