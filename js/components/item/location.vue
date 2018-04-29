<template>
	<div class="column location-panel is-centered" v-if="currLocation.location_id">
		<h1 class="title">{{ currLocation.name }}</h1>
		<h3 class="subtitle">[Recipes not yet entered in database.]</h3>
		<h2 class="subtitle">Items</h2>
		<ul class="item-list">
			<li v-for="item in getItemsForLocation(currLocation)" :key="item.item_id">
				<router-link :to="{ name: 'item', params: { id: item.item_id }}">
					{{item.name}}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'location-view',
	data () {
		return {}
	},
	computed: {
		items () {
			return this.$store.state.kdm.references.items;
		},
		locations () {
			return this.$store.state.kdm.references.locations;
		},
		currLocation () {
			let cL = this.locations.find(loc => loc.location_id === parseInt(this.$route.params.id,10));
			let defaultLoc = { location_id: 0, name: "Loading" };
			return cL === undefined ? defaultLoc : cL;
		}
	},
	methods: {
		getItemsForLocation(loc) {
			return this.items
					.filter( i => i.location === loc.name )
					.sort((a,b) => a.name.localeCompare(b.name));
		}
	}
}
</script>