<template>
  <div class="tile is-ancestor grid-sheet">
    <div class="tile is-child">
    <h1 class="title">TEMP SHIT LUL</h1><br />
    <ul>
      <li v-for="g in grids" :key="g.id">
        <router-link :to="'/grids/edit/' + g.id">{{ g.name }}</router-link>
      </li>
    </ul>
    </div>
    <b-button type="is-info" icon-left="plus-square" class="corner-button" rounded @click.prevent="createGridPrompt">Create Grid</b-button>
    <b-modal
      v-model="showGridBuilder"
      has-modal-card
      trap-focus
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-modal
    >
      <template #default="props">
        <GridEdit
          :gear="gear"
          :campaign="campaign"
          :grid="currentlyEditing"
          @close="props.close"
        />
      </template>
    </b-modal>
  </div>
</template>

<style lang="scss" scoped>
.corner-button {
  position: fixed;
  bottom: 2em;
  right: 2em;
  z-index: 10;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import merge from 'deepmerge'
import { db } from '@/firebase'
import { emptyGearGrid } from '@/util'

export default {
  name: 'GearGrids',
  props: ['campaign'],
  data() {
    return {
      showGridBuilder: false,
      gear: [],
      grids: []
    }
  },
  computed: {
    ...mapGetters([
      'currentCampaign',
      'loading'
    ])
  },
  created() {
    this.$bind('gear', db.collection(`campaigns/${this.currentCampaign}/gear`))
    this.$bind('grids', db.collection(`campaigns/${this.currentCampaign}/grids`))
  },
  methods: {
    ...mapActions([
      'setLoading'
    ]),
    
    createGridPrompt() {
      this.$buefy.dialog.prompt({
        message: 'Name Gear Grid: ',
        inputAttrs: {
          placeholder: "Your name of choice",
          required: true
        },
        required: true,
        trapFocus: true,
        confirmText: 'Name and Edit',
        onConfirm: (val) => {
          let newGrid = merge(emptyGearGrid, { name: val })
          db.collection(`campaigns/${this.currentCampaign}/grids`).add(newGrid)
            .then(g => {
              this.$router.push({ path: '/grids/edit' + g.id })
            })
        }
      })
    },
  }
}
</script>