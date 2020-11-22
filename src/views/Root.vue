<template>
  <div class="root">
    <Navigation/>
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

<script>
// @ is an alias to /src
import Navigation from '@/components/navigation.vue'

export default {
  name: 'Root',
  components: {
    Navigation
  }
}
</script>
