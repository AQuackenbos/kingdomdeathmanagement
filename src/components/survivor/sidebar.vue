<template>
	<div class="column is-one-quarter is-hidden-touch menu-panel">
		<aside class="menu">
			<ul class="menu-list">
				<li>
					<a class="button is-info" @click="requestUpdate">Force Refresh from Server</a>
				</li>
				<li>
					<router-link class="button new-survivor is-success" :to="{name: 'survivor', params: { id: 'new' }}">Add New Survivor</router-link>
				</li>
			</ul>
			<p class="menu-label">Current Party</p>
			<transition-group name="list" tag="ul" class="menu-list survivors">	
				<li v-for="survivor in partySurvivors" :key="survivor.id">
					<router-link :to="{ name: 'survivor', params: { id: survivor.id }}">
						<span class="chkbx circle" style="background:#F00;border:none;" v-if="survivor.survival.died != '' && survivor.survival.died != null"></span>
						<span class="chkbx circle" style="background:#ffc800;border:none;" v-else-if="survivor.xp.box16 == true"></span>
						<span class="chkbx circle" style="background:#0F0;border:none;" v-else></span>
						<span class="gender" v-if="survivor.gender === 'M'">&#9794;</span>
						<span class="gender" v-else>&#9792;</span>
						<span class="name">{{ survivor.name }}</span>
					</router-link>
				</li>
			</transition-group>
			<p class="menu-label">Survivors</p>
			<transition-group name="list" tag="ul" class="menu-list survivors">	
				<li v-for="survivor in nonpartySurvivors" :key="survivor.id">
					<router-link :to="{ name: 'survivor', params: { id: survivor.id }}">
						<span class="chkbx circle" style="background:#F00;border:none;" v-if="survivor.survival.died != '' && survivor.survival.died != null"></span>
						<span class="chkbx circle" style="background:#ffc800;border:none;" v-else-if="survivor.xp.box16 == true"></span>
						<span class="chkbx circle" style="background:#0F0;border:none;" v-else></span>
						<span class="gender" v-if="survivor.gender === 'M'">&#9794;</span>
						<span class="gender" v-else>&#9792;</span>
						<span class="name">{{ survivor.name }}</span>
					</router-link>
				</li>
			</transition-group>
		</aside>
	</div>
</template>

<style>
.list-complete-enter, .list-complete-leave-to {
  transition: all 1s;
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  transition: all 1s;
  position: absolute;
}
</style>

<script>
export default {
	name: 'survivor-sidebar',
	data () {
		return {}
	},
	computed: {
		survivors () {
			return this.$store.state.kdm.survivors;
		},
		partySurvivors() {
			return this.$store.state.kdm.survivors.filter(s => (s.party && s.party === true));
		},
		nonpartySurvivors() {
			return this.$store.state.kdm.survivors.filter(s => ((!s.party) || s.party === false));
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