<template>
	<div class="column is-one-quarter is-hidden-touch menu-panel">
		<aside class="menu">
			<ul class="menu-list">
				<li>
					<a class="button is-info" @click="requestUpdate" ref="updateButton">Force Refresh from Server</a>
				</li>
				<li>
					<router-link class="button is-success" :to="{name: 'survivor', params: { id: 'new' }}">Add New Survivor</router-link>
				</li>
			</ul>
			<p class="menu-label">Survivors</p>
			<ul class="menu-list survivors">	
				<li v-for="survivor in survivors">
					<router-link :to="{ name: 'survivor', params: { id: survivor.id }}">
						<span class="chkbx circle" style="background:#F00;border:none;" v-if="survivor.survival.died != '' && survivor.survival.died != null"></span>
						<span class="chkbx circle" style="background:#ffc800;border:none;" v-else-if="survivor.xp.box16 == true"></span>
						<span class="chkbx circle" style="background:#0F0;border:none;" v-else></span>
						<span class="gender" v-if="survivor.gender === 'M'">&#9794;</span>
						<span class="gender" v-else>&#9792;</span>
						<span class="name">{{ survivor.name }}</span>
					</router-link>
				</li>
			</ul>
		</aside>
	</div>
</template>

<script>
export default {
	name: 'survivor-sidebar',
	data () {
		return {}
	},
	computed: {
		survivors () {
			return this.$store.state.kdm.settlement.survivors;
		}
	},
	mounted() {
		this.requestUpdate();
		/**
		let self = this;
		this.sse = new EventSource('/api.php');
		this.sse.addEventListener('get_survivor_updates',function(e){
			console.log('UPDATING NOW');
			let data = JSON.parse(e.data);
			self.survivors = data.survivors;
		},false);
		**/
	},
	methods: {
		requestUpdate: function() {
			return this.$store.dispatch('loadSurvivors',this.$route.params.id);
		}
	}
}
</script>