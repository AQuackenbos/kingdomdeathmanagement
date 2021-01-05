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
//import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  faBook,
  faBookOpen,
  faBoxOpen,
  faCaretDown,
  faCaretUp,
  faCheck,
  faCheckSquare,
  faCross,
  faDrumstickBite,
  faEdit,
  faEllipsisH,
  faExclamationTriangle,
  faFlask,
  faGenderless,
  faHome,
  faKhanda,
  faLandmark,
  faLocationArrow,
  faMars,
  faMountain,
  faMusic,
  faPaw,
  faPuzzlePiece,
  faSeedling,
  faShieldAlt,
  faSignOutAlt,
  faSkull,
  faSort,
  faSquare,
  faSquareFull,
  faStar,
  faStream,
  faTag,
  faTimes,
  faTh,
  faTheaterMasks,
  faTransgender,
  faTrashAlt,
  faUser,
  faUserInjured,
  faVenus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


library.add(
  faBook,
  faBookOpen,
  faBoxOpen,
  faCaretDown,
  faCaretUp,
  faCheck,
  faCheckSquare,
  faCross,
  faDrumstickBite,
  faEdit,
  faEllipsisH,
  faExclamationTriangle,
  faFlask,
  faGenderless,
  faHome,
  faKhanda,
  faLandmark,
  faLocationArrow,
  faMars,
  faMountain,
  faMusic,
  faPaw,
  faPuzzlePiece,
  faSeedling,
  faShieldAlt,
  faSignOutAlt,
  faSkull,
  faSort,
  faSquare,
  faSquareFull,
  faStar,
  faStream,
  faTag,
  faTimes,
  faTh,
  faTheaterMasks,
  faTransgender,
  faTrashAlt,
  faUser,
  faUserInjured,
  faVenus
);
Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(Buefy, {
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

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

app.$store.dispatch('initFlag')