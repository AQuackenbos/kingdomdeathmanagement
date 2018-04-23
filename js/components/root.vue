<template>
	<div>
		<navigation/>
		<div class="columns">
			<transition appear name="fade" mode="out-in">
				<router-view name="sidebar"></router-view>
			</transition>
			<transition appear name="slide" mode="out-in">
				<router-view :key="$route.fullPath"></router-view>
			</transition>
		</div>
	</div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.slide-enter-active {
  transition: all .1s ease;
}
.slide-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(1000px);
}
</style>