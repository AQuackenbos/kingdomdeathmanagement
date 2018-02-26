const GearsetInfo = Vue.component('gearset-info', {
	name: 'GearsetInfo',
	template: '#gearset-info'
});

const GearsetDefault = Vue.component('gearset-default', {
	name: 'GearsetDefault',
	template: '#gearset-default',
	components: {
		//'gearset-list': GearsetList,
		'gearset-info': GearsetInfo
	}
});