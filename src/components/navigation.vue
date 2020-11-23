<template>
  <nav class="navbar is-transparent" v-if="!loading && user && currentCampaign">
    <div class="navbar-brand">
    <router-link class="navbar-item" :to="{name: 'Home'}">
      <img src="/images/lantern.png" alt="Kingdom Death Management">
    </router-link>
    </div>
    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-start">
      <b-button tag="router-link" class="navbar-item" :to="{name: 'Settlement' }" icon-left="landmark">Settlement</b-button>
      <b-button tag="router-link" class="navbar-item" :to="{name: 'Timeline' }" icon-left="stream">Timeline</b-button>
      <b-button tag="router-link" class="navbar-item" :to="{name: 'Survivors' }" icon-left="user-injured">Survivors</b-button>
      <b-button tag="router-link" class="navbar-item" :to="{name: 'Storage' }" icon-left="box-open">Storage</b-button>
      <b-button tag="router-link" class="navbar-item" :to="{name: 'Innovations' }" icon-left="book">Innovations</b-button>
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
      loading: 'loading',
      currentCampaign: 'currentCampaign'
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