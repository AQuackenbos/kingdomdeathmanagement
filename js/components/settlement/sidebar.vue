<template>
	<div class="column is-one-quarter is-hidden-touch menu-panel">
		<aside class="menu">
			<!--
			<ul class="menu-list">
				<li>
					<a class="button is-info" @click="requestUpdate" ref="updateButton">Force Refresh from Server</a>
				</li>
				
			</ul>
			-->
			<p class="menu-label">Settlement</p>
			<ul class="menu-list settlement">	
				<li><router-link :to="{ name: 'settlement' }">Settlement Information</router-link></li>
				<li><router-link :to="{ name: 'settlement.survivors' }">Survivor Information</router-link></li>
				<li><router-link :to="{ name: 'settlement.resources' }">Resources &amp; Gear</router-link></li>
				<li><router-link :to="{ name: 'settlement.timeline' }">Timeline</router-link></li>
				<li><router-link :to="{ name: 'settlement.locations' }">Locations</router-link></li>
				<li><router-link :to="{ name: 'settlement.choices' }">Choices</router-link></li>
			</ul>
		</aside>
	</div>
</template>