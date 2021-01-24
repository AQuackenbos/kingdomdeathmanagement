<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Take Damage</p>
    </header>
    <section class="modal-card-body">
      <b-field>
        <b-dropdown v-model="h.location" aria-role="list" position="is-bottom-right" size="is-small">
          <button class="button is-dark is-small" type="button" slot="trigger">
            <template v-if="h.location">
              <div style="margin-right:.5em">
                <span :class="iconTranslation[l]" style="margin-right:.25em"></span>
                <span>{{ l.charAt(0).toUpperCase() + l.slice(1) }}</span>
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
    </section>
    <footer class="modal-card-foot">
      <div class="buttons">
        <button class="button" type="button" @click="close">Cancel</button>
        <button class="button is-warning" @click="done">Add Hit</button>
        <button class="button is-danger" @click="done">Take Damage</button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'TakeDamage',
  props: {
    hitLocations: Array
  },
  data: () => ({
    hits: [{ location: null, amount: null }]
  }),
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>