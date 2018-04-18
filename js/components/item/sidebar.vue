<template>
	<div class="column is-one-quarter is-hidden-touch menu-panel">
		<aside class="menu">
			<p class="menu-label">Items by Location</p>
			<ul class="menu-list">
				<li v-for="location in locations">
					<a>{{location.name}}</a>
					<ul class="menu-list">	
						<li v-for="item in getItemsForLocation(location)">
							<router-link :to="{ name: 'item', params: { id: item.item_id }}">
								{{item.name}}
							</router-link>
						</li>
					</ul>
				</li>
			</ul>
		</aside>
	</div>
</template>

<script>
export default {
	name: 'item-sidebar',
	data () {
		return {}
	},
	computed: {
		items () {
			return this.$store.state.kdm.references.items;
		},
		locations () {
			return this.$store.state.kdm.references.locations;
		}
	},
	mounted() {
		this.requestUpdate();
	},
	methods: {
		getItemsForLocation(loc) {
			return this.items.filter( i => i.location === loc.name );
		},
		requestUpdate: function() {
			this.$store.dispatch('loadLocations',this.$route.params.id);
			this.$store.dispatch('loadItems',this.$route.params.id);
			return;
		}
	}
}
</script>