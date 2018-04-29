<template>
	<div class="column location-panel is-centered" v-if="currLocation.location_id !== 0">
		<h1 class="title">{{ currLocation.name }}</h1>
		<table class="table is-bordered is-striped is-hoverable is-fullwidth" v-if="locationItems.length > 0">
			<thead>
				<tr>
					<th>Item</th>
					<th>Recipe</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in locationItems" :key="item.item_id">					
					<th>
						<router-link :to="{ name: 'item', params: { id: item.item_id }}">
							{{item.name}}
						</router-link>
						<div v-if="item.recipe && item.recipe.requires" style="font-weight:normal;text-align:right"><em>Req: {{ item.recipe.requires.join(', ') }}</em></div>
					</th>
					<td>
						<ul v-if="item.recipe && item.recipe.materials">
							<li v-for="mat in item.recipe.materials" :key="mat.name">
								{{mat.amount.toString().replace('!','')}} x {{mat.name}}
								<div v-if="mat.amount.toString().indexOf('!') !== -1"><strong>OR</strong></div>
							</li>
						</ul>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'location-view',
	data () {
		return {
			currLocation: { location_id: 0, name: "Loading" },
			locationItems: []
		}
	},
	computed: {
		items () {
			return this.$store.state.kdm.references.items;
		},
		locations () {
			return this.$store.state.kdm.references.locations;
		}
	},
	mounted () {
		setTimeout(this.updateLocation,250);
	},
	beforeRouteUpdate (to, from, next) {
		this.updateLocation();
		next();
	},
	methods: {
		updateLocation() {
			let cL = this.locations.find(loc => loc.location_id === parseInt(this.$route.params.id,10));
			if (cL !== undefined) this.currLocation = cL;
			this.updateLocationItems();
		},
		updateLocationItems() {
			let self = this;
			this.locationItems = this.items
					.filter( i => i.location === self.currLocation.name )
					.sort((a,b) => a.name.localeCompare(b.name));
		}
	}
}
</script>