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
    }
  },
  actions: {
    setUser({ commit, dispatch }, user) {
      if(user) {
        commit("SET_USER", user)
        dispatch('loadInnovations')
        dispatch('loadKeywords')
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
      window.sessionStorage.clear();
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
    }
  }
});