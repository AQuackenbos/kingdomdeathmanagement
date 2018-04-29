<template>
	<div class="column is-one-quarter is-hidden-touch menu-panel">
		<button class="button spoiler-button is-danger" title="Spoiler mode hides locations you have not built, and all Rare Items except those in your Gear List.">
			Spoiler Mode is OFF (not yet implemented)
		</button>
		<aside class="menu">
			<p class="menu-label">Items by Location</p>
			<ul class="menu-list">
				<li v-for="location in locations" :key="location.location_id" @click="setActiveMenu()" class="location-container">
					<router-link :to="{name: 'location', params: { id: location.location_id }}" class="location-link">{{location.name}}</router-link>
					<ul class="menu-list">	
						<li v-for="item in getItemsForLocation(location)" :key="item.item_id">
							<router-link :to="{ name: 'item', params: { id: item.item_id }}">
								{{item.name}}
							</router-link>
						</li>
					</ul>
				</li>
			</ul>
		</aside>
		{{ applyTippyTips() }}
	</div>
</template>

<script>
import tippy from 'tippy.js';

export default {
	name: 'item-sidebar',
	data () {
		return {
			alTimer: -1
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
	mounted() {
		this.requestUpdate();
		this.alTimer = setInterval(() => {
			if(document.querySelector('.active-container') === null) {
				this.setActiveMenu();
			} else {
				clearInterval(this.alTimer);
			}
		},250);
	},
	methods: {
		applyTippyTips() {
			tippy('.spoiler-button',{
				arrow: true
			});
		},
		getItemsForLocation(loc) {
			return this.items
					.filter( i => i.location === loc.name )
					.sort((a,b) => a.name.localeCompare(b.name));
		},
		requestUpdate: function() {
			this.$store.dispatch('loadLocations',this.$route.params.id);
			this.$store.dispatch('loadItems',this.$route.params.id);
			return;
		},
		setActiveMenu() {
			let al = document.querySelector('.active-container');
			if(al) al.classList.remove('active-container');
		
			let r = this.$route.path;
			let start = document.querySelector('[href="'+r+'"]');
			if (start) {
				let container = start.closest('.location-container');
				if(container) container.classList.add('active-container');
			}
		}
	}
}
</script>