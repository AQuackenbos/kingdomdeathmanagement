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
		died: '',
		cod: ''
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

const emptyItem = { item_id: -1, name: "No Item Loaded"}

const state = {
	settlement: { 
		name: '',
		description: '',
		lantern_year: 0,
		resources: [],
		timeline: {},
		locations: [],
		quarries: []
	},
	survivors: [],
	//ref data,
	emptyItem: emptyItem,
	emptySurvivor: emptySurvivor,
	references: {
		keywords: [],
		items: [],
		locations: []
	},
	//active data
	activeItem: emptyItem,
	activeSurvivor: Object.assign({},emptySurvivor)
}

// getters
const getters = {
	getSettlement: (state) => state.settlement,
	getSurvivors: (state) => state.survivors,
	getActiveSurvivor: (state) => state.activeSurvivor,
	getEmptySurvivor: (state) => state.emptySurvivor,
	getKeyword: (state) => (keyword) => {
		return state.references.keywords.find(k => k.keyword.toLowerCase() === keyword.toLowerCase());
	},
	getResourceType: (state) => (resource) => {
		return ''; //@todo
	}
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
			commit('loadSettlement', r.settlement);
			dispatch('loadSurvivors');
			dispatch('loadLocations');
			dispatch('loadItems');
			dispatch('loadKeywords');
		})
		.catch(e => {
			console.dir(e.message);
		});
	},
	
	loadKeywords({ commit }, activeItemId) {
		fetch('/api/keywords/', {
			method: 'GET',				
			headers: {
				'Accept': 'application/json'
			},
			credentials: 'same-origin'
		})
		.then( r => r.json() )
		.then( r => {
			commit('loadKeywords', r.keywords);
		})
		.catch(e => {
			console.dir(e.message);
		});
	},
	
	loadItems({ commit }, activeItemId) {
		fetch('/api/items/', {
			method: 'GET',				
			headers: {
				'Accept': 'application/json'
			},
			credentials: 'same-origin'
		})
		.then( r => r.json() )
		.then( r => {
			commit('loadItems', r.items);
			
			if(activeItemId)
				commit('setActiveItem',activeItemId);
		})
		.catch(e => {
			console.dir(e.message);
		});
	},
	
	loadLocations({ commit }) {
		fetch('/api/locations/', {
			method: 'GET',				
			headers: {
				'Accept': 'application/json'
			},
			credentials: 'same-origin'
		})
		.then( r => r.json() )
		.then( r => {
			commit('loadLocations', r.locations);
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
			
			if(activeSurvivorId !== -1)
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
			let switchSurvivor = -1;
			if(savedSurvivor.id === -1) {
				r.newSurvivor.id = r.survivorId; //don't ask, seriously
				switchSurvivor = r.survivorId;
			}
			dispatch('loadSurvivors', switchSurvivor);
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
	},
	
	saveResources({ commit }, resourceList) {
		fetch('/api/settlement/resources/', {	
			method: 'POST',				
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			credentials: 'same-origin',
			body: 'data='+JSON.stringify(resourceList)
		})
		.then( r => r.json() )
		.then( r => {
			//post-save actions?
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
		state.survivors.splice();
	},
	
	loadItems (state, items) {
		state.references.items = items;
		state.references.items.splice();
	},
	
	loadLocations (state, locations) {
		state.references.locations = locations;
		state.references.locations.splice();
	},
	
	loadKeywords (state, keywords) {
		state.references.keywords = keywords;
		state.references.keywords.splice();
	},
	
	setActiveSurvivor (state, id) {
		if(typeof id === 'object')
		{
			state.activeSurvivor = id;
			return;
		}
		
		if(id === "new")
		{
			state.activeSurvivor = Object.assign({},state.emptySurvivor);
			return;
		}
		
		const surv = state.survivors.find(s => s.id === parseInt(id))
		if(surv !== undefined)
		{
			state.activeSurvivor = surv;
		}
	},
	
	setActiveItem (state, id) {
		if(typeof id === 'object')
		{
			state.activeItem = id;
			return;
		}
		
		if(id === -1 || id === 'main')
		{
			state.activeItem = state.emptyItem;
			return;
		}
		
		const item = state.references.items.find(i => i.item_id === parseInt(id))
		if(item !== undefined)
		{
			state.activeItem = item;
		}
	},
	
	addBlankResource (state, type) {
		var nextId = state.settlement.resources.reduce( (prev, curr) => (prev.id > curr.id) ? prev : curr , { id: 0 } ).id + 1;
		state.settlement.resources.push( { id: nextId, name: '', type: type, qty: 0 } );
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