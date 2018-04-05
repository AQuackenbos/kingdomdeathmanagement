// initial state
const emptySurvivor = {
	ability_impair: {
		skip_hunt: false,
		text: ''
	},
	accuracy: 0,
	active: false,
	born: '',
	died: '',
	arms: {
		armor: 0,
		heavy_injury: false,
		light_injury: false
	},
	body: {
		armor: 0,
		heavy_injury: false,
		light_injury: false
	},
	brain: {
		insanity: 0,
		light_injury: false
	},
	courage: {
		box1: false,
		box2: false,
		box3: false,
		box4: false,
		box5: false,
		box6: false,
		box7: false,
		box8: false,
		box9: false,
		matchmaker: false,
		prepared: false,
		stalwart: false
	},
	disorders: {
		disorder_1: '',
		disorder_2: '',
		disorder_3: ''
	},
	evasion: 0,
	father: '',
	fighting_arts: {
		art_1: '',
		art_2: '',
		art_3: '',
		cannot: false
	},
	gender: 'M',
	head: {
		armor: 0,
		heavy_injury: false,
	},
	id: -1,
	legs: {
		armor: 0,
		heavy_injury: false,
		light_injury: false
	},
	luck: 0,
	mother: '',
	movement: 5,
	name: '',
	per_lifetime: {
		text: '',
		used: false
	},
	speed: 0,
	strength: 0,
	survival: {
		cannot: false,
		dash: false,
		dodge: true,
		encourage: true,
		endure: false,
		surge: false,
		value: 1,
		born: 5,
		died: ''
	},
	understanding: {
		analyze: false,
		box1: false,
		box2: false,
		box3: false,
		box4: false,
		box5: false,
		box6: false,
		box7: false,
		box8: false,
		box9: false,
		explore: false,
		tinker: false
	},
	waist: {
		armor: 0,
		heavy_injury: false,
		light_injury: false,
	},
	weapon_proficiency: {
		box1: false,
		box2: false,
		box3: false,
		box4: false,
		box5: false,
		box6: false,
		box7: false,
		box8: false,
		type: '',
	},
	xp: {
		box1: false,
		box2: false,
		box3: false,
		box4: false,
		box5: false,
		box6: false,
		box7: false,
		box8: false,
		box9: false,
		box10: false,
		box11: false,
		box12: false,
		box13: false,
		box14: false,
		box15: false,
		box16: false,
	}
};

const state = {
	settlement: {},
	survivors: {},
	activeSurvivor: emptySurvivor,
	emptySurvivor: emptySurvivor
}

// getters
const getters = {
	getSettlement: (state) => state.settlement,
	getSurvivors: (state) => state.survivors,
	getActiveSurvivor: (state) => state.activeSurvivor,
	getEmptySurvivor: (state) => state.emptySurvivor
}

// actions
const actions = {
	initialize ({ commit, dispatch }) {
		fetch('/api/settlement/', {	
			method: 'GET',				
			headers: {
				'Accept': 'application/json'
			},
			credentials: 'same-origin'
		})
		.then( r => r.json() )
		.then( r => {
			let settlement = r.settlement;
			settlement.name = r.name;
			settlement.description = r.description;
			commit('loadSettlement', settlement);
			dispatch('loadSurvivors');
		})
		.catch(e => {
			console.dir(e.message);
		});
	},
	
	loadSurvivors ({ commit }, activeSurvivorId) {
		fetch('/api/survivor/', {
			method: 'GET',
			headers: {
			  'Accept': 'application/json'
			},
			credentials: 'same-origin'
		})
		.then( r => r.json() )
		.then( r => {
			commit('loadSurvivors', r.survivors);
			
			if(activeSurvivorId)
				commit('setActiveSurvivor', activeSurvivorId);
		})
		.catch(e => {
			console.dir(e.message);
		});
	},
	
	saveSurvivor({ commit, dispatch }, savedSurvivor) {
		fetch('/api/survivor/', {	
			method: 'POST',				
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			credentials: 'same-origin',
			body: 'data='+JSON.stringify(savedSurvivor)
		})
		.then( r => r.json() )
		.then( r => {
			if(savedSurvivor.id === -1) {
				r.newSurvivor.id = r.survivorId; //don't ask, seriously
				dispatch('loadSurvivors', r.survivorId);
			}
		})
		.catch(e => {
			console.dir(e.message);
		});
	},
	
	deleteSurvivor({ commit, dispatch }, deleteId) {		
		fetch('/api/survivor/', {	
			method: 'DELETE',				
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			credentials: 'same-origin',
			body: 'id='+deleteId
		})
		.then( r => r.json() )
		.then( r => {
			dispatch('loadSurvivors', 'new');
		})
		.catch(e => {
			console.dir(e.message);
		});
	}
}

// mutations
const mutations = {
	loadSettlement (state, settlement) {
		state.settlement = settlement;
	},

	loadSurvivors (state, survivors) {
		state.survivors = survivors;
	},
	
	setActiveSurvivor (state, id) {
		if(typeof id === 'object')
		{
			state.activeSurvivor = id;
			return;
		}
		
		if(id === "new")
		{
			state.activeSurvivor = state.emptySurvivor;
			return;
		}
		
		const surv = state.survivors.find(s => s.id === parseInt(id))
		if(surv !== undefined)
		{
			state.activeSurvivor = surv;
		}
	},
	
	initializeResources (state) {
		if(!(state.settlement.resources instanceof Array))
			state.settlement.resources = [];
	},
	
	addBlankResource (state) {
		console.log('adding resource');
		var nextId = state.settlement.resources.reduce( (prev, curr) => (prev.id > curr.id) ? prev : curr , { id: 0 } ).id + 1;
		console.log('with id '+nextId);
		state.settlement.resources.push( { id: nextId, name: '', qty: 0 } );
	},
	
	removeResource(state, resourceId) {
		state.settlement.resources = state.settlement.resources.filter( (r) => r.id !== resourceId );
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}