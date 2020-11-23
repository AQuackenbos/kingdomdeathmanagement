<template>
  <b-navbar transparent v-if="!loading && user && currentCampaign">
    <template slot="brand">
        <b-navbar-item tag="router-link" :to="{name: 'Home'}">
            <img src="/images/lantern.png" alt="Kingdom Death Management"/>
        </b-navbar-item>
    </template>
    <template slot="start">
        <b-navbar-item tag="router-link" :to="{name: 'Settlement'}">
            <b-icon icon="landmark" class="mr-2" /> Settlement
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{name: 'Timeline'}">
            <b-icon icon="stream" class="mr-2" /> Timeline
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{name: 'Survivors'}">
            <b-icon icon="user-injured" class="mr-2" /> Survivors
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{name: 'Storage'}">
            <b-icon icon="box-open" class="mr-2" /> Storage
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{name: 'Innovations'}">
            <b-icon icon="book" class="mr-2" /> Innovations
        </b-navbar-item>
    </template>
    <template slot="end">
        <b-navbar-item tag="div">
            <div class="buttons">
                <b-button type="is-danger is-light" @click.prevent="logout">Logout</b-button>
            </div>
        </b-navbar-item>
    </template>
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
  </b-navbar>
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