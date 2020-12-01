<template>
  <main id="app" class="">
    <b-loading :is-full-page="true" :can-cancel="false" v-model="loading"/>
    <Navigation/>
    <div class="container">
      <div class="columns">
        <transition appear name="fade" mode="out-in">
          <router-view :key="$route.fullPath"></router-view>
        </transition>
      </div>
    </div>
  </main>
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

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import Navigation from '@/components/navigation.vue'

export default {
  computed: {
    ...mapGetters({
      loading: 'loading'
    })
  },
  components: {
    Navigation
  }
}
</script>