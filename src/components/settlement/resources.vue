<template>
	<div class="column settlement-panel is-centered">
		<div class="columns is-multiline">
			<div class="column is-12">
				<h2 class="title is-2">Resources and Gear</h2>
				<div class="box">
					<div class="content summary-tags">
						<em>Key Resource Summary: </em>
						<br />
						<label class="label big">Endeavors:</label>
						<input type="number" id="endeavor-count" v-model="endeavorcount" @change="updateEndeavorCount"/>
						<br />
						<span class="tags has-addons">
							<span class="tag is-dark">{{ this.getTypeSum('Bone') }}</span>
							<span class="tag bone end-tag">Bone</span>
						</span>
						<span class="tags has-addons">
							<span class="tag is-dark">{{ this.getTypeSum('Hide') }}</span> 
							<span class="tag hide end-tag">Hide</span>
						</span>
						<span class="tags has-addons">
							<span class="tag is-dark">{{ this.getTypeSum('Organ') }}</span>
							<span class="tag organ end-tag">Organ</span>
						</span>
						<span class="tags has-addons">
							<span class="tag is-dark">{{ this.getTypeSum('???') }}</span>
							<span class="tag wildcard end-tag">???</span>
						</span>
					</div>
				</div>
			</div>
			<div class="column is-4" v-for="type in getTypes()">
				<h3 class="subtitle">{{type}}</h3>
				<ul class="resource-list">
					<li v-for="r in getResourcesOfType(type)" :key="r.id">
						<div class="field has-addons">
							<div class="control">
								<select v-model="r.type" @change="updateResource(r)" :style="getStyles(r)">
									<option v-for="t in getTypes()">{{t}}</option>
								</select>
							</div>
							<div class="control">
								<input class="input resource-name" type="text" v-model="r.name" @change="updateResource(r)" placeholder="Item name"/>
							</div>
							<div class="control">
								<input class="input resource-qty" type="number" v-model="r.qty" @change="updateResource(r)" placeholder="Qty"/>
							</div>
						</div>
					</li>
				</ul>
				<div class="field"><a class="icon is-large has-text-success" @click="addResource(type)"><i class="fas fa-3x fa-plus-circle"></i></a></div>
			</div>
		</div>
	</div>
</template>

<style type="text/css" scoped>
	select {
		background: transparent;
		text-align: center;
		border: none;
		font-size: 14px;
		height: 36px;
		padding: 5px;
		width: 50px;
		border-radius: 5px;
		background-color: #fff; 
	}
	.tags.has-addons {
		display: inline-block;
	}
	
	.summary-tags .end-tag {
		margin-left: -5px;
	}
	
	.bone {
		background-color: #d8d8d8;
	}
	
	.organ {
		background-color: #ff7979;
	}
	
	.hide {
		background-color: #ef911e;
	}
	
	.wildcard {
		background-color: #aaaaaa;
	}
	
	div.field { margin-bottom: 8px; justify-content: center; text-align: center }
	.resource-name { /*width: 400px;*/ border-bottom: 1px solid #999; margin-left: 5px; margin-right: 5px; }
	.resource-qty { width: 45px; border: 1px solid #CCC; }
	
	.box { margin-bottom: 1rem }
	
	input[type=number] {
		-webkit-appearance: initial;
	}
	
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: initial;
	}
	
	#endeavor-count {
		width: 100px;
		font-size: 1.15rem;
		font-weight: bold;
	}
	
</style>

<script>
export default {
	name: 'settlement-resources',
	data() {
		return {
			savetimer: -1,
			endeavortimer: -1,
			endeavorcount: -1
		}
	},
	beforeRouteEnter: function (to, from, next) {
		next(vm => {
			vm.getEndeavorCount();
		});
	},
	mounted() {
		let self = this;
		this.endeavortimer = setInterval(() => {
			this.getEndeavorCount();
			if(self.endeavorcount > -1)
				clearInterval(self.endeavortimer);
		}, 100);
	},
	methods: {
		alphaResourceSort: function(ascending) {
			return function(a, b) { 
				if(a.name === null || a.name === '') {
					return 1;
				}
				else if(b.name === null || b.name === '') {
					return -1;
				}
				else if(a.name === b.name) {
					return 0;
				}
				else if(ascending) {
					return a.name < b.name ? -1 : 1;
				}
				else if(!ascending) {
					return a.name < b.name ? 1 : -1;
				}
			};
		},
		getStyles: function(resource) {
			switch(resource.type) {
				case 'Endeavor':
					return {
						fontWeight: 'bold'
					};
				case 'Bone':
					return {
						backgroundColor: '#d8d8d8'
					};
				case 'Organ':
					return {
						backgroundColor: '#ff7979'
					};
				case 'Hide':
					return {
						backgroundColor: '#ef911e'
					};
				case 'Consumable':
					return {
						backgroundColor: '#70d870'
					};
				case 'Scrap':
					return {
						backgroundColor: '#737373'
					};
				case 'Gear':
					return {
						backgroundColor: '#9aaffb'
					};
				case '???':
					return {
						backgroundColor: '#aaaaaa'
					};
			}
			
			return {};
		},
		addResource: function(type) {
			this.$store.commit('addBlankResource', type);
		},
		removeResource: function(id) {
			if(confirm('Are you sure you want to delete this resource? This CANNOT be undone!'))
			{
				clearTimeout(this.savetimer);
				this.$store.commit('removeResource', id);
				
				let self = this;
				clearTimeout(this.savetimer);
				this.savetimer = setTimeout(function() {
					self.saveResources();
				}, 1000);
			}
		},
		updateResource: function(resource) {		
			let self = this;
			clearTimeout(this.savetimer);
			this.savetimer = setTimeout(function() {
				self.saveResources();
			}, 1000);
		},
		saveResources: function() {
			clearTimeout(this.savetimer);
			this.$store.dispatch('saveResources', this.resources);
		},
		getTypeSum: function(type) {
			return this.getResourcesOfType(type)
				.reduce((t,c) => t + parseInt(c.qty), 0);
		},
		getTypes: function() {
			return [
				'Hide',
				'Bone',
				'Organ',
				'Consumable',
				'???',
				'Scrap',
				'Gear'
			];
		},
		getResourcesOfType: function(type) {
			return this.resources
				.filter(r => (r.type === '' ? type === 'None' : r.type === type))
				.sort(this.alphaResourceSort(true));
		},
		updateEndeavorCount: function() {
			let eCount = this.endeavorcount;
			let eResource = this.resources.find(r => r.type === 'Endeavor');
			if(!eResource) {
				this.$store.commit('addBlankResource','Endeavor');
				this.updateEndeavorCount();
				return;
			}
			
			eResource.name = 'Endeavors';
			eResource.qty = eCount;
			
			this.updateResource(eResource);
		},
		getEndeavorCount: function() {
			let eResource = this.resources.find(r => r.type === 'Endeavor');
			if(!eResource) {
				return -1;
			}
			
			this.endeavorcount = eResource.qty;
		}
	},
	computed: {
		resources() {
			return this.$store.state.kdm.settlement.resources;
		}
	}
}
</script>