<template>
  <div class="tile is-ancestor grid-sheet">
    (Grid of Grids)
    <b-button type="is-info" icon-left="plus-square" class="corner-button" rounded @click.prevent="showGridBuilder = true">Create Grid</b-button>
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
import { db } from '@/firebase'
import GridEdit from '@/components/storage/grid/edit'

export default {
  name: 'GearGrids',
  props: ['campaign'],
  components: {
    GridEdit
  },
  data: () => ({
    showGridBuilder: false,
    gear: []
  }),
  computed: {
    ...mapGetters([
      'currentCampaign',
      'loading'
    ])
  },
  created() {
    this.$bind('gear', db.collection(`campaign/${this.currentCampaign}/gear`))
  },
  methods: {
    ...mapActions([
      'setLoading'
    ])
  }
}
</script>