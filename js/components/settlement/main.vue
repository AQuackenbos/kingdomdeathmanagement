<template>
	<div class="column settlement-panel is-centered">
		<h2 class="title is-2">{{ this.settlement.name }}</h2>
		<p style="text-align:center"><em>{{ this.settlement.description }}</em></p>
		<h3 class="subtitle is-2">Year {{ this.settlement.lantern_year }}</h3>
		<div class="columns is-multiline">
		</div>
	</div>
</template>

<script>
export default {
	name: 'settlement-info',
	data() {
		return {}
	},
	updated() {
	},
	mounted() {
	},
	methods: {
	},
	computed: {
		settlement() {
			return this.$store.state.kdm.settlement;
		}
	}
}
</script>