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
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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