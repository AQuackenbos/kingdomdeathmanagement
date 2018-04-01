//Core Libraries
import Vue from 'vue'
import VueRouter from 'vue-router'

//Setup
Vue.use(VueRouter);

//Components
//* Main
import Navigation from './components/navigation.vue'
//* Settlement
import Settlement from './components/settlement.vue'
import Settlement_Main from './components/settlement/main.vue'
import Settlement_Sidebar from './components/settlement/sidebar.vue'
//** Settlement Views
import Settlement_Locations from './components/settlement/locations.vue'
import Settlement_Timeline from './components/settlement/timeline.vue'
import Settlement_Options from './components/settlement/options.vue'
import Settlement_Resources from './components/settlement/resources.vue'
//* Survivor
import Survivor from './components/survivor.vue'
import Survivor_Main from './components/survivor/main.vue'
import Survivor_Sidebar from './components/survivor/sidebar.vue'
//** Survivor Views
import Survivor_New from './components/survivor/new.vue'


const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
	$bus: {
		get: function() {
			return EventBus;
		}
	}
});

const router = new VueRouter({
	mode: 'history',
	routes: [{
		path: '/',
		name: 'home',
		redirect: { name: 'settlement.main' }
	},{
		path: '/settlement',
		name: 'settlement',
		component: Settlement,
		children: [{
			path: '',
			name: 'settlement.main',			
			components: {
				default: Settlement_Main,
				sidebar: Settlement_Sidebar
			}
		},{
			path: '/timeline',
			name: 'settlement.timeline',			
			components: {
				default: Settlement_Timeline,
				sidebar: Settlement_Sidebar
			}
		}]
	},{
		path: '/survivor',
		name: 'survivor',
		component: Survivor,
		children: [{
			path: '',
			alias: 'new',
			name: 'survivor.new',
			components: {
				default: Survivor_New,
				sidebar: Survivor_Sidebar
			}
		},{
			path: ':id',
			name: 'survivor.specific',
			components: {
				default: Survivor_Main,
				sidebar: Survivor_Sidebar
			}
		}]
	}]
});

var app = new Vue({
	el: "#app",
	router
});