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
		encourage: false,
		endure: false,
		surge: false,
		value: 1,
		born: '',
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
}

const SurvivorInfo = Vue.component('survivor-info', {
	name: 'SurvivorInfo',
	template: '#survivor-info',
	data() {
		return {
			survivors: []
		}
	},
	created() {
		this.$bus.$on('survivor_list_retrieved', this.updateSurvivors);
	},
	computed: {
		percentMale: function() {
			return ((this.countMale / this.countAlive) * 100).toFixed(2);
		},
		percentFemale: function() {
			return ((this.countFemale / this.countAlive) * 100).toFixed(2);
		},
		countMale: function() {
			let flt = this.survivors.filter(s => (s.gender === 'M' && (s.survival.died === '' || s.survival.died === undefined)));
			return flt.length;
		},
		countFemale: function() {
			let flt = this.survivors.filter(s => (s.gender === 'F' && (s.survival.died === '' || s.survival.died === undefined)));
			return flt.length;
		},
		countRetired: function() {
			let flt = this.survivors.filter(s => (s.xp.box16 === true));
			return flt.length;
		},
		countAlive: function() {
			let flt = this.survivors.filter(s => (s.survival.died === '' || s.survival.died === undefined));
			return flt.length;
		},
		countDead: function() {
			let flt = this.survivors.filter(s => (s.survival.died !== '' || s.survival.died !== undefined));
			return flt.length;
		},
		maleStyle: function() {
			return 'test1';
		},
		femaleStyle: function() {
			return 'test';
		}
	},
	methods: {
		updateSurvivors: function(s) {
			this.survivors = s;
		}
	}
});

const SurvivorList = Vue.component('survivor-list',{
	name: 'SurvivorList',
	template: '#survivor-list',
	data () {
		return { 
			survivors: [],
			emptySurvivor: emptySurvivor,
			sse: null
		};
	},
	created() {
		this.$bus.$on('add_survivor', this.addSurvivor);
		this.$bus.$on('remove_survivor', this.removeSurvivor);
		this.$bus.$on('slist_send_update', this.sendSurvivorUpdate);
		this.requestUpdate();
		/**
		let self = this;
		this.sse = new EventSource('/api.php');
		this.sse.addEventListener('get_survivor_updates',function(e){
			console.log('UPDATING NOW');
			let data = JSON.parse(e.data);
			self.survivors = data.survivors;
		},false);
		**/
	},
	beforeDestroy () {
		this.$bus.$off('add_survivor');
	},
	methods: {
		requestUpdate: function() {
			if(this.$refs.updateButton) {
				this.$refs.updateButton.classList.add('is-loading');
			}
			fetch('/api/survivor/', {
				method: 'GET',
				headers: {
				  'Accept': 'application/json'
				},
				credentials: 'same-origin'
			})
			.then( r => r.json() )
			.then( r => {
				this.survivors = r.survivors;
				this.$bus.$emit('survivor_list_retrieved', this.survivors);
				
				let id = this.$route.params == undefined ? undefined : this.$route.params.id;
				if(id != undefined) {
					if(id === "new")
					{
						this.newSurvivor();
						return;
					}
					this.$bus.$emit('update_survivor', this.survivors.find( s => s.id == id ));
				}
				else {
					this.$bus.$emit('update_survivor', this.survivors[0]);
				}
				if(this.$refs.updateButton) {
					this.$refs.updateButton.classList.remove('is-loading');
				}
			})
			.catch(e => {
				console.dir(e.message);
			});
		},
		sendSurvivorUpdate(id) {
			if(id === 'new') {
				this.newSurvivor();
				return;
			}
			this.$bus.$emit('update_survivor', this.survivors.find( s => s.id == id ));
		},
		newSurvivor: function() {
			this.$bus.$emit('update_survivor', Object.assign({},this.emptySurvivor));
		},
		chooseSurvivor: function(survivor) {
			this.survivors.map(s => { s.active = false; });
			survivor.active = true;
			this.$bus.$emit('update_survivor', survivor);
		},
		
		addSurvivor: function(survivor) {
			this.survivors.push(survivor);
		},
		
		removeSurvivor: function(survivorId) {
			this.survivors = this.survivors.filter(el => (el.id != survivorId));
			this.$bus.$emit('update_survivor', this.survivors[0]);
		}
	}
});

const Survivor = Vue.component('survivor', {
	name: 'Survivor',
	template: '#survivor',
	data () {
		return {
			survivor: emptySurvivor,
			requireSave: false,
			savetimer: -1
		}
	},
	created () {
		this.$bus.$on('update_survivor', this.updateSurvivor)
	},
	beforeDestroy () {
		this.$bus.$off('update_survivor');
	},
	watch: {
		survivor: {
            handler: function(to, from) {
				if(from && to.id != from.id) {
					if(from.id === -1) {
						if(from.name === ''){
							return;
						}
						clearTimeout(this.savetimer);
						this.saveSurvivor(from);
					}
					return;
				}
				let self = this;
				clearTimeout(this.savetimer);
				this.savetimer = setTimeout(function() {
					self.saveSurvivor(to);
				},1000);
            },
            deep: true
        }
	},
	methods: {
		updateSurvivor(s) {
			this.survivor = s;
		},
		
		deleteSurvivor() {
			if(confirm('Are you sure you want to delete '+this.survivor.name+'?  This CANNOT be undone!'))
			{
				clearTimeout(this.savetimer);
				this.$refs.deleteButton.classList.add('is-loading');
				fetch('/api/survivor/', {	
					method: 'DELETE',				
					headers: {
					  'Accept': 'application/json',
					  'Content-type': 'application/x-www-form-urlencoded'
					},
					credentials: 'same-origin',
					body: 'id='+this.survivor.id
				})
				.then( r => r.json() )
				.then( r => {
					this.$bus.$emit('remove_survivor', this.survivor.id);
					this.$refs.deleteButton.classList.remove('is-loading');
				})
				.catch(e => {
					console.dir(e.message);
				});
			}
		},
		
		saveSurvivor(target) {
			if(target == undefined) {
				target = this.survivor;
			}
			fetch('/api/survivor/', {	
				method: 'POST',				
				headers: {
				  'Accept': 'application/json',
				  'Content-type': 'application/x-www-form-urlencoded'
				},
				credentials: 'same-origin',
				body: 'data='+JSON.stringify(target)
			})
			.then( r => r.json() )
			.then( r => {
				this.requireSave = false;
				if(r.newSurvivor) {
					this.survivor.id = r.newSurvivor.id;
					this.$bus.$emit('add_survivor', r.newSurvivor);
				}							
				if(this.$refs.saveButton){
					this.$refs.saveButton.classList.remove('is-loading');
				}
				if(this.$refs.createButton){
					this.$refs.createButton.classList.remove('is-loading');
				}
			})
			.catch(e => {
				console.dir(e.message);
			});
		}
	}
});

const SurvivorPage = Vue.component('survivor-page', {
	name: 'SurvivorPage',
	template: '#survivor-page',
	components: {
		'survivor-list': SurvivorList,
		'survivor': Survivor
	},
	watch: {
		'$route' (to, from) {
			let id = to.params.id;
			if(id != undefined) {
				if(id === 'new') {
					this.$bus.$emit('slist_send_update', 'new');
					return;
				}
				this.$bus.$emit('slist_send_update', id);
			}
		}
	}
});

const SurvivorDefault = Vue.component('survivor-default', {
	name: 'SurvivorDefault',
	template: '#survivor-default',
	components: {
		'survivor-list': SurvivorList,
		'survivor-info': SurvivorInfo
	}
});