<template>
  <div class="column is-12 is-centered" v-if="!loading">
    <div v-if="user">
      Logged in.
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
import { mapGetters, mapActions } from 'vuex'
import { firebase } from '@/firebase'

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      user: 'user',
      loading: 'loading'
    })
  },
  methods: {
    ...mapActions([
      'setUser',
      'clearUser'
    ]),
    
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider).then((result) => {
        console.log('calling setter -- ', result)
        this.setUser(result.user)
      }).catch(err => console.log(err))
    }
  }
}
</script>
