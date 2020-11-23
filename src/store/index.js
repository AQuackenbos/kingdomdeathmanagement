import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
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
    }
  },
  actions: {
    setUser({ commit }, user) {
      if(user) {
        commit("SET_USER", user)
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
    }
  }
});