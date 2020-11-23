import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import { store } from '@/store'

import { firebase } from '@/firebase'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false


firebase.auth().onAuthStateChanged(user => {
	store.dispatch('setUser', user)
	store.dispatch('setLoading', false)
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
