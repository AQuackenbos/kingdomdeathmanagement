<template>
	<div class="column settlement-panel is-centered">
		<h2 class="title is-2">Resources and Gear</h2>
		<div class="box">
			<div class="content">
				<em>Key Resource Summary: </em>
				<span class="tags has-addons">
					<span class="tag is-dark">{{ this.getTypeSum('Bone') }}</span>
					<span class="tag bone">Bone</span>
				</span>
				<span class="tags has-addons">
					<span class="tag is-dark">{{ this.getTypeSum('Hide') }}</span> 
					<span class="tag hide">Hide</span>
				</span>
				<span class="tags has-addons">
					<span class="tag is-dark">{{ this.getTypeSum('Organ') }}</span>
					<span class="tag organ">Organ</span>
				</span>
			</div>
		</div>
		<ul id="resource-list">
			<li v-for="r in resources" :key="r.id">
				<div class="field has-addons">
					<div class="control">
						<select v-model="r.type" @change="updateResource(r)" :style="getStyles(r)">
							<option>None</option>
							<option>Hide</option>
							<option>Bone</option>
							<option>Organ</option>
							<option>Herb</option>
							<option>Scrap</option>
							<option>Gear</option>
							<option>Endeavor</option>
						</select>
					</div>
					<div class="control">
						<input class="input resource-name" type="text" v-model="r.name" @change="updateResource(r)" placeholder="Item name"/>
					</div>
					<div class="control">
						<input class="input resource-qty" type="number" v-model="r.qty" @change="updateResource(r)" placeholder="Qty"/>
					</div>
					<p class="control">
						<a class="button is-danger resource-delete" @click="removeResource(r.id)"><i class="fas fa-2x fa-minus-circle"></i></a>
					</p>
				</div>
			</li>
		</ul>
		<div class="field"><a class="icon is-large has-text-success" @click="addResource"><i class="fas fa-3x fa-plus-circle"></i></a></div>
	</div>
</template>

<style scoped>
	select {
		background: transparent;
		text-align: center;
		border: none;
		font-size: 14px;
		height: 36px;
		padding: 5px;
		width: 100px;
		border-radius: 5px;
		background-color: #fff; 
	}
	.tags.has-addons {
		display: inline-block;
	}
	
	.bone {
		margin-left: -5px;
		background-color: #d8d8d8;
	}
	
	.organ {
		margin-left: -5px;
		background-color: #ff7979;
	}
	
	.hide {
		margin-left: -5px;
		background-color: #ef911e;
	}
	
	div.field { margin-bottom: 8px; justify-content: center; text-align: center }
	.resource-name { width: 400px; border-bottom: 1px solid #999; margin-left: 5px; margin-right: 5px; }
	.resource-qty { width: 75px; border: 1px solid #CCC; }
</style>

<script>
export default {
	name: 'settlement-resources',
	data() {
		return {
			savetimer: -1
		}
	},
	methods: {
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
				case 'Herb':
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
					}
			}
			
			return {};
		},
		addResource: function() {
			this.$store.commit('addBlankResource');
		},
		removeResource: function(id) {
			clearTimeout(this.savetimer);
			this.$store.commit('removeResource', id);
			
			let self = this;
			clearTimeout(this.savetimer);
			this.savetimer = setTimeout(function() {
				self.saveResources();
			}, 1000);
		},
		updateResource: function(resource) {
			if(resource.type === '') {
				this.$store.dispatch('lookupResourceType', resource);
			}
		
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
			return this.resources
				.filter(r => r.type === type)
				.reduce((t,c) => t + parseInt(c.qty), 0);
		}
	},
	computed: {
		resources() {
			return this.$store.state.kdm.settlement.resources;
		}
	}
}
</script>