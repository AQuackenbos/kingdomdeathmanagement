<template>
  <div class="column is-12 is-centered" v-if="!showLoading">
    <div v-if="user">
      <h1 class="title">Select a Campaign</h1>
      <CampaignList />
    </div>
    <div v-else>
      <img alt="Vue logo" src="../assets/lantern.png">
      <h1 class="title">Kingdom Death Management</h1>
      <h2 class="subtitle">Please Login to Continue</h2>
      <button class="button is-primary" @click.prevent="login">Login with Google</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { firebase } from '@/firebase'
import CampaignList from '@/components/campaign/list'


export default {
  name: 'Home',
  components: {
    CampaignList
  },
  methods: {
    ...mapActions([
      'setUser',
      'clearUser'
    ]),
    
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      this.setLoading(true)
      firebase.auth().signInWithRedirect(provider).then((result) => {
        this.setUser(result.user)
      }).catch(err => console.log(err))
    }
  }
}
</script>
