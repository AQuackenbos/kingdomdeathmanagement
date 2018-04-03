<template>
	<div class="column">
		<h2 class="title is-2">Survivor Counts</h2>
		<div class="columns">
			<div class="column is-half">
				<ul>
					<li>Total: {{ survivors.length }}</li>
					<li>Alive: {{ countAlive }}</li>
					<li>Male: {{ countMale }}</li>
					<li>Female: {{ countFemale }}</li>
				</ul>
			</div>
			<div class="column is-half">
				<div class="bar" style="width: 100%; height: 100%;">
					<div class="male" v-bind:style="{ width: percentMale + '%' }">&#9794;<br />{{ percentMale }}%</div>
					<div class="female" v-bind:style="{ width: percentFemale + '%' }"> &#9792;<br />{{ percentFemale }}%</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'survivor.info',
	data() {
		return {}
	},
	computed: {
		survivors () {
			return this.$store.state.kdm.settlement.survivors;
		},
		percentMale: function() {
			return ((this.countMale / this.countAlive) * 100).toFixed(2);
		},
		percentFemale: function() {
			return ((this.countFemale / this.countAlive) * 100).toFixed(2);
		},
		countMale: function() {
			let flt = this.survivors.filter(s => (s.gender === 'M' && (s.survival.died === '' || s.survival.died === undefined)));
			return flt.length;
		},
		countFemale: function() {
			let flt = this.survivors.filter(s => (s.gender === 'F' && (s.survival.died === '' || s.survival.died === undefined)));
			return flt.length;
		},
		countRetired: function() {
			let flt = this.survivors.filter(s => (s.xp.box16 === true));
			return flt.length;
		},
		countAlive: function() {
			let flt = this.survivors.filter(s => (s.survival.died === '' || s.survival.died === undefined));
			return flt.length;
		},
		countDead: function() {
			let flt = this.survivors.filter(s => (s.survival.died !== '' || s.survival.died !== undefined));
			return flt.length;
		},
		maleStyle: function() {
			return 'test1';
		},
		femaleStyle: function() {
			return 'test';
		}
	},
	methods: {
		updateSurvivors: function(s) {
			this.survivors = s;
		}
	}
}
</script>