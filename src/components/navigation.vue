<template>
  <b-navbar transparent v-if="!showLoading && user && campaign">
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
        <b-navbar-item tag="router-link" :to="{name: 'Hunt'}">
          <b-icon icon="mountain" class="mr-2" /> Hunt
        </b-navbar-item>
    </template>
    <template slot="end">
        <b-dropdown
          position="is-bottom-left"
          append-to-body
          trap-focus
          aria-role="menu"
          v-if="user"
        >
          <b-button size="is-small" type="is-info" class="is-light navbar-item mr-1 mt-1" slot="trigger" role="button" icon-left="user-circle">
            {{ user.displayName }}
          </b-button>
          <b-dropdown-item custom aria-role="menuitem">
            Logged in as: <br /> {{ user.email }}
          </b-dropdown-item>
          <b-dropdown-item custom aria-role="menuitem">
            Display Name: <br /> {{ pubUser.displayName }}
          </b-dropdown-item>
          <hr class="dropdown-divider" />
          <b-dropdown-item aria-role="menuitem">
            <router-link to="/" class="is-info">
              <span class="bl-lantern is-size-3 mx-1"></span>
              Change Campaign
            </router-link>
          </b-dropdown-item>
          <hr class="dropdown-divider" />
          <b-dropdown-item aria-role="menuitem" @click="promptUpdate">
            <b-icon icon="edit" />
            Update Display Name
          </b-dropdown-item>
          <b-dropdown-item aria-role="menuitem" @click="logout">
            <b-icon icon="sign-out-alt" />
            Logout
          </b-dropdown-item>
        </b-dropdown>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { db, firebase } from '@/firebase'

export default {
  name: 'Navigation',
  computed: {
    ...mapGetters([
      'user',
      'pubUser'
    ])
  },
  methods: {
    ...mapActions([
      'clearUser'
    ]),
    
    logout() {
      firebase.auth().signOut().then(() => {
        this.clearUser()
      }).catch(err => console.log(err))
    },
    
    promptUpdate() {
      this.$buefy.dialog.prompt({
        message: 'Change your Display Name',
        inputAttrs: {
          placeholder: "Your name of choice",
          required: true
        },
        required: true,
        trapFocus: true,
        confirmText: 'Update',
        onConfirm: (val) => this.updateName(val)
      })
    },
    
    updateName(name) {
      this.pubUser.displayName = name
      db.collection('users').doc(this.user.uid).update({
        displayName: name
      })
    }
  }
}
</script>