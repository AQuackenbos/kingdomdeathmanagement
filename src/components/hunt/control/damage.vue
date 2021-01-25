<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Take Damage</p>
    </header>
    <section class="modal-card-body">
      <div v-if="hits.length === 0" class="content">Add Hits Below</div>
      <b-field v-for="(h,hidx) in hits" :key="hidx" grouped>
        <b-field>
          <b-button icon-left="times" @click="remove(hidx)" size="is-small" type="is-danger" />
        </b-field>
        <b-field expanded>
          <b-dropdown v-model="h.location" aria-role="list" position="is-bottom-right" size="is-small">
            <button class="button is-dark is-small" type="button" slot="trigger">
              <template v-if="h.location">
                <div style="margin-right:.5em">
                  <span :class="'bl-' + h.location" style="margin-right:.25em"></span>
                  <span>{{ h.location.charAt(0).toUpperCase() + h.location.slice(1) }}</span>
                </div>
              </template>
              <template v-else>
                <span>Select Hit Location</span>
              </template>
            </button>
            <b-dropdown-item aria-role="listitem" v-for="l in hitLocations" :key="l" :value="l" >
              <div class="media">
                <div class="media-left">
                  <span :class="l === 'brain' ? '' : 'bl-' + l"></span>
                </div>
                <div class="media-content">
                  {{ l.charAt(0).toUpperCase() + l.slice(1) }}
                </div>
              </div>
            </b-dropdown-item>
          </b-dropdown>
        </b-field>
        <b-field label="Damage" label-position="on-border">
          <b-numberinput controls-position="compact" v-model="h.amount" size="is-small" type="is-info" />
        </b-field>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <div class="buttons">
        <button class="button" type="button" @click="close">Cancel</button>
        <button class="button is-warning" @click="add">Add Hit</button>
        <button class="button is-danger" @click="done">Take Damage</button>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.modal-card {
  height: 100%;
}
</style>

<script>
export default {
  name: 'TakeDamage',
  props: {
    hitLocations: Array
  },
  data: () => ({
    hits: [{ location: null, amount: 0 }]
  }),
  methods: {
    add() {
      this.hits.push({ location: null, amount: 0})
    },
    
    remove(idx) {
      this.hits.splice(idx,1)
    },
    
    close() {
      this.$emit('close')
    },
    
    done() {
      this.$emit('done', this.hits)
      this.$emit('close')
    }
  }
}
</script>