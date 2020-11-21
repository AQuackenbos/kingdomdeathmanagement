<template>
	<nav class="navbar is-transparent">
		<div class="navbar-brand">
		<router-link class="navbar-item" :to="{name: 'home'}">
			<img src="/images/lantern.png" alt="Kingdom Death Management">
		</router-link>
		<div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
			<span></span>
			<span></span>
			<span></span>
		</div>
		</div>
		<div id="navbarExampleTransparentExample" class="navbar-menu">
			<div class="navbar-start">
				<router-link class="navbar-item" :to="{name: 'settlement'}">Settlement</router-link>
				<router-link class="navbar-item" :to="{name: 'survivor', params: { id: 'new' }}">Survivors</router-link>
				<router-link class="navbar-item" :to="{name: 'item', params: {id: 'main' }}">Items&nbsp;<span class="tags has-addons"><span class="tag is-info">Reference</span><span class="tag is-danger">WIP</span></span></router-link>
				<a class="navbar-item" href="#">Gearsets&nbsp;<span class="tag is-warning">Coming Soon</span></a>
			</div>
			<div class="navbar-end">
				<a class="navbar-item" id="invite" href="/invite">Invite Users</a>
				<a class="navbar-item" id="logout" href="/logout">Logout</a>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'navigation'
}
</script>