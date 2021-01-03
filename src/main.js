import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import { store } from '@/store'
import { firestorePlugin } from 'vuefire'
import { firebase } from '@/firebase'
import '@/mixins/global'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);
Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(Buefy,{
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas",
  customIconPacks: {
    fas: {
      sizes: {
        default: "lg",
        "is-small": "1x",
        "is-medium": "2x",
        "is-large": "3x"
      },
      iconPrefix: ""
    }
  }
})

Vue.use(firestorePlugin)

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
