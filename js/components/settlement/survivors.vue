<template>
	<div class="column">
		<h2 class="title is-2">Survivors</h2>
		<div class="columns is-multiline">
			<div class="column is-4">
				<canvas id="aliveChart"></canvas>
			</div>
			<div class="column is-4">
				<canvas id="retiredChart"></canvas>
			</div>
			<div class="column is-4">
				<canvas id="deadChart"></canvas>
			</div>
			<div class="column is-4 chart-info">
				<h3 class="title">{{ this.filterList(this.survivors, { alive: true, retired: false }).length }}</h3>
				<p>Average Age: {{ this.averageAge(this.filterList(this.survivors, { alive: true, retired: false })) }}</p>
			</div>
			<div class="column is-4 chart-info">
				<h3 class="title">{{ this.filterList(this.survivors, { alive: true, retired: true }).length }}</h3>
				<p>Average Age: {{ this.averageAge(this.filterList(this.survivors, { alive: true, retired: true })) }}</p>
			</div>
			<div class="column is-4 chart-info">
				<h3 class="title">{{ this.filterList(this.survivors, { alive: false }).length }}</h3>
				<p>Average Age: {{ this.averageAge(this.filterList(this.survivors, { alive: false })) }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import Chart from 'chart.js';

export default {
	name: 'survivor-info',
	data() {
		return {
			chartsInit: false,
			aliveCtx: 'aliveChart',
			retiredCtx: 'retiredChart',
			deadCtx: 'deadChart',
			aliveChart: null,
			retiredChart: null,
			deadChart: null
		}
	},
	updated() {
		this.updateCharts();
	},
	mounted() {
		this.updateCharts();
	},
	methods: {
		initializeCharts: function () {
			if(this.chartsInit === true)
				return;
			
			if(!document.getElementById(this.aliveCtx))
				return;
			
			let chartOpts = {
				legend: {
					display: false
				},
				title: {
					display: true,
					position: 'bottom'
				}
			};
			
			this.aliveChart = new Chart(this.aliveCtx, {
				type: 'pie',
				data: { datasets: [], labels: [] },
				options: chartOpts
			});
			this.retiredChart = new Chart(this.retiredCtx, {
				type: 'pie',
				data: { datasets: [], labels: [] },
				options: chartOpts
			});
			this.deadChart = new Chart(this.deadCtx, {
				type: 'pie',
				data: { datasets: [], labels: [] },
				options: chartOpts
			});
			
			this.chartsInit = true;
		},
		
		updateCharts: function() {
			if(this.chartsInit === false)
				this.initializeCharts();
				
			let aliveData = {
				labels: ["Male","Female"],
				datasets: [{
					label: "Living Survivors",
					data: [ 
						this.filterList(this.survivors, { alive: true, retired: false, gender: 'M' }).length,
						this.filterList(this.survivors, { alive: true, retired: false, gender: 'F' }).length
					],
					backgroundColor: [
						'blue',
						'red'
					]
				}],
			};
			this.aliveChart.options.title.text = 'Living Survivors';
			this.aliveChart.data = aliveData;
			this.aliveChart.update();
			
			let retiredData = {
				labels: ["Male","Female"],
				datasets: [{
					label: "Retired Survivors",
					data: [ 
						this.filterList(this.survivors, { alive: true, retired: true, gender: 'M' }).length,
						this.filterList(this.survivors, { alive: true, retired: true, gender: 'F' }).length
					],
					backgroundColor: [
						'blue',
						'red'
					]
				}],
			};
			this.retiredChart.options.title.text = 'Retired Survivors';
			this.retiredChart.data = retiredData;
			this.retiredChart.update();
			
			let deadData = {
				labels: ["Male","Female"],
				datasets: [{
					label: "Deaths",
					data: [ 
						this.filterList(this.survivors, { alive: false, gender: 'M' }).length,
						this.filterList(this.survivors, { alive: false, gender: 'F' }).length
					],
					backgroundColor: [
						'blue',
						'red'
					]
				}],
			};
			this.deadChart.options.title.text = 'Deaths';
			this.deadChart.data = deadData;
			this.deadChart.update();
			
		},
		
		filterList: function(list, flags) {
			let retList = list;
			
			if(!(retList instanceof Array) || retList === undefined || flags === undefined) {
				return retList;
			}
			
			if('retired' in flags) {
				retList = retList.filter( s => s.xp.box16 === flags.retired );
			}
			
			if('alive' in flags) {
				if(flags.alive === true)
					retList = retList.filter(s => (s.survival.died === '' || s.survival.died === undefined));
				else
					retList = retList.filter(s => (s.survival.died !== '' && s.survival.died !== undefined));
			}
			
			if('gender' in flags) {
				retList = retList.filter(s => s.gender === flags.gender);
			}
			
			return retList;
		},
		
		averageAge: function(list) {
			if(!(list instanceof Array) || list === undefined) {
				return 0;
			}
			
			let settl = this.settlement;
			let avg = (
				list.reduce( ( combined, current ) => {
					let currYear = parseInt(settl.lantern_year,10);
					let diedYear = parseInt(current.survival.died,10);
					let compYear = Math.min(diedYear, currYear);
					if(isNaN(diedYear))
					{
						compYear = currYear;
					}
					return combined + (compYear - parseInt(current.survival.born,10))
				}, 0)
				/ list.length
			).toFixed(1);
			
			if(isNaN(avg))
				return '-';
				
			return avg;
		}
	},
	computed: {
		settlement() {
			return this.$store.state.kdm.settlement;
		},
		survivors () {
			return this.$store.state.kdm.survivors;
		}
	}
}
</script>