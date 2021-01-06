<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Add Quarry</p>
      <button type="button" class="delete" @click="close" />
    </header>
    <section class="modal-card-body">
      <p class="content">
        Select a Quarry to add to your Settlement's hunt list.
        <b-message type="is-warning">This list contains all valid quarries.</b-message>
      </p>
      <b-field label="Quarry" label-position="on-border">
        <b-select placeholder="Add Quarry" icon="paw" v-model="quarry" required expanded>
          <option v-for="q in validQuarries" :key="q.id" :value="q.id">{{ q.name }}</option>
        </b-select>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="close">Cancel</button>
      <button class="button is-success" @click="select">Add Quarry</button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddQuarry',
  data() {
    return {
      quarry: null
    }
  },
  computed: {
    ...mapGetters([
      'quarries'
    ]),
    
    validQuarries() {
      if(!this.campaign || !this.quarries) return []
      
      return this.quarries.filter(q => {
        return !this.campaign.quarries.includes(q.id)
      })
    }
  },
  methods: {
    select() {
      let q = this.quarry
      this.quarry = null
      this.$emit('add', q)
    },
    
    close() {
      this.quarry = null
      this.$emit('close')
    }
  }
}
</script>