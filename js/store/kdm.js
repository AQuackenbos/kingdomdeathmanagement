// initial state
//import emptySurvivor from './data/emptysurvivor.js'
const emptySurvivor = {};

const state = {
	settlement: { 
		survivors: {}
	},
	activeSurvivor: null,
	emptySurvivor: emptySurvivor
}

// getters
const getters = {
	getSurvivors: (state) => state.settlement.survivors
}

// actions
const actions = {
	initialize ({ commit }) {
		console.log('initing');
		store.commit('loadSettlement', { survivors: {} });
		store.dispatch('loadSurvivors');
	},
	
	loadSurvivors ({ commit }) {
		console.log('loading survivors');
		fetch('/api/survivor/', {
			method: 'GET',
			headers: {
			  'Accept': 'application/json'
			},
			credentials: 'same-origin'
		})
		.then( r => r.json() )
		.then( r => {
			store.commit('loadSurvivors', r.survivors);
		})
		.catch(e => {
			console.dir(e.message);
		});
	}
}

// mutations
const mutations = {
	loadSettlement (state, settlement) {
		console.log('settl load');
		state.settlement = settlement;
	},

	loadSurvivors (state, survivors) {
		console.log('mass load');
		state.settlement.survivors = survivors;
	},
	
	getSurvivor (state, id) {
		console.log('loading surv');
		const surv = state.settlement.survivors.find(s => s.id === id)
		state.activeSurvivor = surv;
	},
	
}

export default {
	state,
	getters,
	actions,
	mutations
}