import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import createPersistedState from 'vuex-persistedstate'
import { db } from '@/firebase'

Vue.use(Vuex);

let state = {
  error: false,
  errorText: '',
  isBinding: false,
  user: null,
  users: [],
  pubUser: null,
  showLoading: true,
  loadingText: null,
  currentCampaignId: null,
  campaign: null,
  innovations: [],
  innovated: [],
  keywords: [],
  survivors: [],
  resources: [],
  gear: [],
  grids: [],
  timeline: [],
  showdowns: [],
  quarries: [],
  armorSets: [],
  locations: [],
  hunts: []
}

const nonPersistedKeys = [
  'error',
  'errorText'
]

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
      storage: window.sessionStorage,
      paths: Object.keys(state).filter(k => !nonPersistedKeys.includes(k))
    })
  ],
  state: state,
  getters: getters(),
  mutations: {
    ...vuexfireMutations,
    
    FLAG_ERROR(state, data) {
      state.error = true
      state.errorText = data.message
    },
    
    CLEAR_BINDING(state) {
      state.isBinding = false
    },
    
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
    },
    
    SET_LOADING_TEXT(state, data) {
      state.loadingText = data
    }
  },
  actions: {
    initFlag({ commit }) {
      commit("CLEAR_BINDING")  
    },
    
    error({ commit }, text) {
      commit("FLAG_ERROR", text)
    },
    
    setUser({ commit, dispatch }, user) {
      if(user) {
        commit("SET_USER", user)
        dispatch('bindUsers').then(() => {
          Promise.all([
            dispatch('bindPubUser'),
            dispatch('bindKeywords'),
            dispatch('bindInnovations'),
            dispatch('bindQuarries'),
            dispatch('bindShowdowns'),
            dispatch('bindLocations'),
            dispatch('bindArmorSets')
          ]).then(() => {
            dispatch('setLoading', false)
          })
        }).catch(e => {
          dispatch('error', e)
        })
      }
    },
    
    setLoading({ commit, state }, loading) {
      if(state.isBinding) return
      if(loading !== null) {
        commit("SET_LOADING", loading)
      }
    },
    
    setLoadingText({ commit }, text) {
      commit("SET_LOADING_TEXT", text)  
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
      if(state.isBinding) return
      dispatch('setLoading', true)
      state.isBinding = true
      state.loadingText = 'Loading Campaign'
      dispatch('setCampaignId', campaignId)
      let c = await bindFirestoreRef('campaign', db.collection('campaigns').doc(campaignId)).then(async () => {
        state.loadingText = 'Loading Survivors'
        Promise.all([
          dispatch('bindSurvivors', campaignId).then(() => state.loadingText = 'Loading Innovations'),
          dispatch('bindInnovated', campaignId).then(() => state.loadingText = 'Loading Timeline'),
          dispatch('bindTimeline', campaignId).then(() => state.loadingText = 'Loading Resources'),
          dispatch('bindResources', campaignId).then(() => state.loadingText = 'Loading Gear'),
          dispatch('bindGear', campaignId).then(() => state.loadingText = 'Loading Gear Grids'),
          dispatch('bindGrids', campaignId).then(() => state.loadingText = 'Loading Hunts'),
          dispatch('bindHunts', campaignId).then(() => state.loadingText = 'Finished!')
        ]).finally(() => {
          state.isBinding = false
          state.loadingText = ''
          dispatch('setLoading', false)
        })
      }).catch(e => {
        dispatch('error', e)
      })
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
    
    bindHunts: firestoreAction(({ bindFirestoreRef }, campaignId) => {
      return bindFirestoreRef('hunts', db.collection(`campaigns/${campaignId}/hunts`))
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
    })
  }
});