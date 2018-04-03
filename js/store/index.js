import Vue from 'vue'
import Vuex from 'vuex'
import kdm from './kdm'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		kdm
	},
	strict: false
})