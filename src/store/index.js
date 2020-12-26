import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { db } from '@/firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    user: null,
    pubUser: null,
    currentCampaign: null,
    loading: true
  },
  getters: {
    user(state) {
      return state.user
    },
    
    currentCampaign(state) {
      return state.currentCampaign
    },
    
    loading(state) {
      return state.loading
    },
    
    innovations(state) {
      return state.innovations
    },
    
    keywords(state) {
      return state.keywords
    },
    
    pubUser(state) {
      return state.pubUser
    }
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data
    },
    
    SET_CAMPAIGN(state, data) {
      state.currentCampaign = data
    },
    
    SET_LOADING(state, data) {
      state.loading = data
    },
    
    SET_INNOVATIONS(state, data) {
      state.innovations = data
    },
    
    SET_KEYWORDS(state, data) {
      state.keywords = data
    },
    
    SET_PUBUSER(state, data) {
      state.pubUser = data
    }
  },
  actions: {
    setUser({ commit, dispatch }, user) {
      if(user) {
        commit("SET_USER", user)
        dispatch('loadInnovations')
        dispatch('loadKeywords')
        dispatch('loadPubUser')
      }
    },
    
    setCurrentCampaign({ commit }, campaign) {
      if(campaign) {
        commit("SET_CAMPAIGN", campaign)
      }
    },
    
    setLoading({ commit }, loading) {
      if(loading !== null) {
        commit("SET_LOADING", loading)
      }
    },
    
    clearUser({ commit }) {
      commit("SET_USER", null)
      window.sessionStorage.clear()
    },
    
    loadInnovations({ commit }) {
      db.collection('innovations').get().then(r => {
        commit("SET_INNOVATIONS", r.docs.map(d => ({ id: d.id, ...d.data() })))
      })
    },
    
    loadKeywords({ commit }) {
      db.collection('keywords').get().then(r => {
        commit("SET_KEYWORDS", r.docs.map(d => ({ id: d.id, ...d.data() })))
      })
    },
    
    loadPubUser({ commit, state }) {
      db.collection('users').doc(state.user.uid).get().then(d => {
        commit("SET_PUBUSER", d.data())
      })
    },
    
    setPubUser({ commit }, pu) {
      commit("SET_PUBUSER", pu)
    }
  }
});