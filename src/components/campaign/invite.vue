<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Invite User</p>
      <button type="button" class="delete" @click="close" />
    </header>
    <section class="modal-card-body">
      <p class="content">
        Invite a user to your campaign.
      </p>
      <p class="note is-size-7 mb-3">
        They must have signed up for your<br />Kingdom Death Management install already.
      </p>
      <b-field label="User" label-position="on-border" expanded>
        <b-select placeholder="User" icon="user-plus" v-model="newUser" required expanded>
          <option v-for="q in validUsers" :key="q.id" :value="q.id">{{ q.displayName }}</option>
        </b-select>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="close">Cancel</button>
      <button class="button is-success" @click="select">Invite User</button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddUser',
  data() {
    return {
      newUser: null
    }
  },
  computed: {
    ...mapGetters([
      'users'
    ]),
    
    validUsers() {
      if(!this.users) return []
      
      return this.users.filter(u => {
        return !this.campaign.members.includes(u.id)
      })
    }
  },
  methods: {
    select() {
      let u = this.newUser
      this.newUser = null
      this.$emit('add', u)
    },
    
    close() {
      this.newUser = null
      this.$emit('close')
    }
  }
}
</script>