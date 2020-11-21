<template>
	<div class="column settlement-panel is-centered">
		<h2 class="title is-2">{{ this.settlement.name }}</h2>
		<p style="text-align:center"><em>{{ this.settlement.description }}</em></p>
		<h3 class="subtitle is-2">
		  <a class="icon has-text-danger" @click="changeYear(-1)" v-if="this.settlement.lantern_year > 0">
		    <i class="fas fa-minus-circle"></i>
		  </a>
		  <span>Year {{ this.settlement.lantern_year }}</span>
		  <a class="icon has-text-success" @click="changeYear(1)">
		    <i class="fas fa-plus-circle"></i>
		  </a>
		</h3>
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
	  changeYear(amount) {
	    let newYear = this.settlement.lantern_year + parseInt(amount,10);
			this.$store.dispatch('saveYear', newYear);
	  }
	},
	computed: {
		settlement() {
			return this.$store.state.kdm.settlement;
		}
	}
}
</script>