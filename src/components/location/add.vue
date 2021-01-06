<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Add Location</p>
      <button type="button" class="delete" @click="close" />
    </header>
    <section class="modal-card-body">
      <p class="content">
        Select a Location to add to your Settlement's Locations list.
        <b-message type="is-warning">This list contains all valid locations available.</b-message>
      </p>
      <b-field label="Location" label-position="on-border">
        <b-select placeholder="Add Location" icon="location-arrow" v-model="location" required expanded>
          <option v-for="l in validLocations" :key="l.id" :value="l.id">{{ l.name }}</option>
        </b-select>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="close">Cancel</button>
      <button class="button is-success" @click="select">Add Location</button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddLocation',
  data() {
    return {
      location: null
    }
  },
  computed: {
    ...mapGetters([
      'locations'
    ]),
    
    validLocations() {
      if(!this.campaign || !this.locations) return []
      
      return this.locations.filter(l => {
        return !this.campaign.locations.includes(l.id)
      })
    }
  },
  methods: {
    select() {
      let l = this.location
      this.location = null
      this.$emit('add', l)
    },
    
    close() {
      this.location = null
      this.$emit('close')
    }
  }
}
</script>