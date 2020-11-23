<template>
  <nav class="navbar is-transparent" v-if="!loading && user">
    <div class="navbar-brand">
    <router-link class="navbar-item" :to="{name: 'Home'}">
      <img src="/images/lantern.png" alt="Kingdom Death Management">
    </router-link>
    </div>
    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-start">
      <router-link class="navbar-item" :to="{name: 'Survivors' }">Survivor DB</router-link>
      <!--
        <router-link class="navbar-item" :to="{name: 'settlement'}">Settlement</router-link>
        <router-link class="navbar-item" :to="{name: 'survivor', params: { id: 'new' }}">Survivors</router-link>
        <router-link class="navbar-item" :to="{name: 'item', params: {id: 'main' }}">Items&nbsp;<span class="tags has-addons"><span class="tag is-info">Reference</span><span class="tag is-danger">WIP</span></span></router-link>
        <a class="navbar-item" href="#">Gearsets&nbsp;<span class="tag is-warning">Coming Soon</span></a>
      -->
      </div>
      <div class="navbar-end">
        <a class="navbar-item" @click.prevent="logout">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { firebase } from '@/firebase'

export default {
  name: 'Navigation',
  computed: {
    ...mapGetters({
      user: 'user',
      loading: 'loading'
    })
  },
  
  methods: {
    ...mapActions([
      'clearUser'
    ]),
    
    logout() {
      firebase.auth().signOut().then(() => {
        this.clearUser()
      }).catch(err => console.log(err))
    }
  }
}
</script>