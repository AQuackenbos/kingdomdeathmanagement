<template>
	<div>
		<navigation/>
		<div class="columns">
			<router-view name="sidebar"></router-view>
			<router-view></router-view>
		</div>
	</div>
</template>