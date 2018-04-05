<template>
	<div class="column settlement-panel is-centered">
		<h2 class="title is-2">Resources</h2>
		<ul id="resource-list">
			<li v-for="r in settlement.resources" :key="r.id">
				<div class="field has-addons">
					<div class="control">
						<input class="input resource-name" type="text" v-model="r.name" placeholder="Item name"/>
					</div>
					<p class="control">
						<a class="button is-static resource-type">
							{{ r.type }}
						</a>
					</p>
					<div class="control">
						<input class="input resource-qty" type="text" v-model="r.qty" placeholder="Qty"/>
					</div>
					<p class="control">
						<a class="button is-danger resource-delete" @click="removeResource(r.id)">Remove</a>
					</p>
				</div>
			</li>
		</ul>
		<a class="button is-success" @click="addResource">+ Add Resource</a>
	</div>
</template>

<script>
export default {
	name: 'settlement-resources',
	data() {
		return {}
	},
	methods: {
		addResource: function() {
			this.$store.commit('addBlankResource');
			console.log(this.settlement.resources.length);
			this.$forceUpdate();
		},
		removeResource: function(id) {
			this.$store.commit('removeResource', id);
			this.$forceUpdate();
		}
	},
	computed: {
		settlement() {
			this.$store.commit('initializeResources');
			return this.$store.state.kdm.settlement;
		}
	}
}
</script>