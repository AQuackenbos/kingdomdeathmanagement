<template>
  <div class="tile is-ancestor grid-sheet">
    <div class="tile is-parent is-flex-wrap-wrap">
      <router-link v-for="g in grids" :key="g.id" :to="'/grids/edit/' + g.id" tag="div" class="tile is-child is-3 is-clickable">
        <div class="content">
          <div class="tile is-parent is-flex-wrap-wrap is-justify-content-center">
            <div class="tile is-4 is-justify-content-center" v-for="(p,pidx) in g.previews" :key="pidx">
              <div class="box preview-card">
                <span :class="'bl-' + translate[p]"></span>
              </div>
            </div>
          </div>
          <p>{{ g.name }}</p>
        </div>
      </router-link>
    </div>
    <b-button type="is-info" icon-left="plus-square" class="corner-button" rounded @click.prevent="createGridPrompt">Create Grid</b-button>
  </div>
</template>

<style lang="scss" scoped>
.corner-button {
  position: fixed;
  bottom: 2em;
  right: 2em;
  z-index: 10;
}

.preview-card {
  height: 5em;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #999;
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
      gear: [],
      grids: []
    }
  },
  computed: {
    ...mapGetters([
      'currentCampaign',
      'loading'
    ]),
    
    translate() {
      return {
        'weapon': 'nemesis-event',
        'shield': 'armor',
        'body': 'body',
        'waist': 'waist',
        'head': 'head',
        'arms': 'arms',
        'legs': 'legs',
        'item': 'lantern'
      }
    }
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