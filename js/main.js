//Core Libraries
import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router'

//Setup
Vue.use(Vuex);
Vue.use(VueRouter);

import store from './store'

//Components
//* Main
import Navigation from './components/navigation.vue'
import Root from './components/root.vue'
//* Settlement
import Settlement_Main from './components/settlement/main.vue'
import Settlement_Sidebar from './components/settlement/sidebar.vue'
//** Settlement Views
import Settlement_Survivors from './components/settlement/survivors.vue'
import Settlement_Timeline from './components/settlement/timeline.vue'
import Settlement_Locations from './components/settlement/locations.vue'
import Settlement_Options from './components/settlement/options.vue'
import Settlement_Resources from './components/settlement/resources.vue'
import Settlement_Quarries from './components/settlement/quarries.vue'
//* Survivor
import Survivor_Main from './components/survivor/main.vue'
import Survivor_Sidebar from './components/survivor/sidebar.vue'
//* Item Reference
import Item_Main from './components/item/main.vue'
import Item_Sidebar from './components/item/sidebar.vue'


const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
	$bus: {
		get: function() {
			return EventBus;
		}
	}
});

Vue.component('navigation', Navigation);

const router = new VueRouter({
	mode: 'history',
	routes: [{
		path: '/',
		name: 'home',
		redirect: { name: 'settlement' }
	},{
		path: '/settlement',
		component: Root,
		children: [{
			path: '',
			name: 'settlement',			
			components: {
				default: Settlement_Main,
				sidebar: Settlement_Sidebar
			}
		},{
			path: 'survivors',
			name: 'settlement.survivors',			
			components: {
				default: Settlement_Survivors,
				sidebar: Settlement_Sidebar
			}
		},{
			path: 'timeline',
			name: 'settlement.timeline',			
			components: {
				default: Settlement_Timeline,
				sidebar: Settlement_Sidebar
			}
		},{
			path: 'locations',
			name: 'settlement.locations',			
			components: {
				default: Settlement_Locations,
				sidebar: Settlement_Sidebar
			}
		},{
			path: 'choices',
			name: 'settlement.choices',			
			components: {
				default: Settlement_Options,
				sidebar: Settlement_Sidebar
			}
		},{
			path: 'resources',
			name: 'settlement.resources',			
			components: {
				default: Settlement_Resources,
				sidebar: Settlement_Sidebar
			}
		},{
			path: 'quarries',
			name: 'settlement.quarries',
			components: {
				default: Settlement_Quarries,
				sidebar: Settlement_Sidebar
			}
		}]
	},{
		path: '/survivor',
		component: Root,
		children: [{
			path: ':id',
			name: 'survivor',
			components: {
				default: Survivor_Main,
				sidebar: Survivor_Sidebar
			}
		}]
	},{
		path: '/item',
		component: Root,
		children: [{
			path: ':id',
			name: 'item',
			components: {
				default: Item_Main,
				sidebar: Item_Sidebar
			}
		}]
	}]
});

var app = new Vue({
	el: "#app",
	router,
	store,
	created() {
		this.$store.dispatch('initialize');
	}
});