<div id="app" class="container">
	<nav class="navbar is-transparent">
		<div class="navbar-brand">
		<router-link class="navbar-item" :to="{name: 'default'}">
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
				<router-link class="navbar-item" :to="{name: 'survivor-default'}">Survivors</router-link>
				<a class="navbar-item" href="#">Gearsets</a>
				<a class="navbar-item" href="#">Reference Tables</a>
				<a class="navbar-item" href="/logout">Logout</a>
			</div>
		</div>
	</nav>
	<router-view></router-view>
</div>
<?php include 'templates/survivor.html'; ?>
<?php include 'templates/survivor-list.html'; ?>
<?php include 'templates/survivor-page.html'; ?>
<script type="text/javascript" src="/js/setup.js"></script>
<script type="text/javascript" src="/js/components/survivor.js"></script>
<script type="text/javascript" src="/js/app.js"></script>