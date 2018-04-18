<template>
	<div class="column item-panel is-centered">
		<h2 class="title is-2">{{ this.item.name }}</h2>
	</div>
</template>

<script>
export default {
	name: 'item-info',
	data() {
		return {}
	},
	beforeRouteUpdate (to, from, next) {
		let itemId = to.params.id;
		this.$store.commit('setActiveItem',itemId);
		next();
	},
	computed: {
		item() {
			return this.$store.state.kdm.activeItem;
		}
	}
}
</script>