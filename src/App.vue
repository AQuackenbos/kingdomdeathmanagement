<template>
  <div id="app">
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
// @ is an alias to /src
import Navigation from '@/components/navigation.vue'

export default {
  components: {
    Navigation
  }
}
</script>