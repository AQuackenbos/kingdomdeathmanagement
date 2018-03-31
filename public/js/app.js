const router = new VueRouter({
	mode: 'history',
	routes: [{
		path: '/',
		name: 'default',
		component: SurvivorDefault
	},{
		path: '/survivor',
		name: 'survivor-default',
		component: SurvivorDefault
	},{
		path: '/survivor/:id',
		name: 'survivor',
		component: SurvivorPage
	},{
		path: '/settlement',
		name: 'settlement-default',
		component: SettlementPage
	},{
		path: '/settlement/:page',
		name: 'settlement',
		component: SettlementPage
	}]
});

var app = new Vue({
	el: "#app",
	router
});
