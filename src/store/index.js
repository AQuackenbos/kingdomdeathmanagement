import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import createPersistedState from 'vuex-persistedstate'
import { db } from '@/firebase'

Vue.use(Vuex);

let state = {
  isBinding: false,
  user: null,
  users: [],
  pubUser: null,
  showLoading: true,
  currentCampaignId: null,
  campaign: null,
  innovations: [],
  innovated: [],
  keywords: [],
  survivors: [],
  resources: [],
  gear: [],
  grids: [],
  hunt: {},
  timeline: [],
  showdowns: [],
  quarries: [],
  armorSets: [],
  locations: []
}

let getters = () => {
  let keys = Object.keys(state)
  let getters = {}
  keys.forEach((k) => {
    getters[k] = (state) => state[k]
  })
  return getters
}

export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: state,
  getters: getters(),
  mutations: {
    ...vuexfireMutations,
      
    SET_USER(state, data) {
      state.user = data
    },
    
    SET_LOADING(state, data) {
      state.showLoading = data
    },
    
    SET_PUBUSER(state, data) {
      state.pubUser = data
    },
    
    SET_CAMPAIGN_ID(state, data) {
      state.currentCampaignId = data
    }
  },
  actions: {
    setUser({ commit, dispatch }, user) {
      if(user) {
        commit("SET_USER", user)
        dispatch('bindUsers')
        dispatch('bindPubUser')
        dispatch('bindKeywords')
        dispatch('bindInnovations')
        dispatch('bindQuarries')
        dispatch('bindShowdowns')
        dispatch('bindLocations')
        dispatch('bindArmorSets')
      }
    },
    
    setLoading({ commit }, loading) {
      if(loading !== null) {
        commit("SET_LOADING", loading)
      }
    },
    
    setCampaignId({ commit }, id) {
      commit("SET_CAMPAIGN_ID", id)
    },
    
    clearUser: firestoreAction(({ unbindFirestoreRef, commit }) => {
      commit("SET_USER", null)
      window.sessionStorage.clear()
      unbindFirestoreRef('pubUser')
      // TODO add unbind refs here
    }),
    
    bindUsers: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('users', db.collection('users'))
    }),
    
    bindPubUser: firestoreAction(({ state, bindFirestoreRef }) => {
      return bindFirestoreRef('pubUser', db.collection('users').doc(state.user.uid))
    }),
    
    bindCampaign: firestoreAction(async ({ bindFirestoreRef, dispatch, state }, campaignId) => {
      if(state.isBinding) {
        //
        return
      }
      state.isBinding = true
      dispatch('setLoading', true)
      dispatch('setCampaignId', campaignId)
      let c = await bindFirestoreRef('campaign', db.collection('campaigns').doc(campaignId)).then(() => {
        dispatch('bindSurvivors', campaignId)
        dispatch('bindInnovated', campaignId)
        dispatch('bindTimeline', campaignId)
        dispatch('bindResources', campaignId)
        dispatch('bindGear', campaignId)
        dispatch('bindGrids', campaignId)
        state.isBinding = false
      })
      dispatch('setLoading', false)
      return c
    }),
    
    bindSurvivors: firestoreAction(({ bindFirestoreRef }, campaignId) => {
      return bindFirestoreRef('survivors', db.collection(`campaigns/${campaignId}/survivors`))
    }),
    
    bindInnovated: firestoreAction(({ bindFirestoreRef }, campaignId) => {
      return bindFirestoreRef('innovated', db.collection(`campaigns/${campaignId}/innovations`))
    }),
    
    bindTimeline: firestoreAction(({ bindFirestoreRef }, campaignId) => {
      return bindFirestoreRef('timeline', db.collection(`campaigns/${campaignId}/timeline`))
    }),
    
    bindResources: firestoreAction(({ bindFirestoreRef }, campaignId) => {
      return bindFirestoreRef('resources', db.collection(`campaigns/${campaignId}/resources`))
    }),
    
    bindGear: firestoreAction(({ bindFirestoreRef }, campaignId) => {
      return bindFirestoreRef('gear', db.collection(`campaigns/${campaignId}/gear`))
    }),
    
    bindGrids: firestoreAction(({ bindFirestoreRef }, campaignId) => {
      return bindFirestoreRef('grids', db.collection(`campaigns/${campaignId}/grids`))
    }),
    
    bindInnovations: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('innovations', db.collection('innovations'))
    }),
    
    bindKeywords: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('keywords', db.collection('keywords'))
    }),
    
    bindQuarries: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('quarries', db.collection('quarries'))
    }),
    
    bindShowdowns: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('showdowns', db.collection('showdowns'))
    }),
    
    bindArmorSets: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('armorSets', db.collection('armor_sets'))
    }),
    
    bindLocations: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('locations', db.collection('locations'))
    }),
  }
});