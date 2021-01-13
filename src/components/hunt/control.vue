<template>
  <div class="columns is-multiline" v-if="!showLoading && survivor && grid">
    <div class="column is-12">
      <b-message type="is-info">
        <b-button class="mx-2" type="is-success" icon-left="plus-square">Full Heal Survivor</b-button>
        <b-button class="mx-2" type="is-warning" icon-left="dice-d20">Use Lifetime Reroll</b-button>
        <b-button class="mx-2" type="is-info" icon-left="question-circle">Manage Tokens</b-button>
        <b-button class="mx-2" type="is-danger" icon-left="tint">Bleed Tokens</b-button>
        <b-button class="mx-2" type="is-danger" icon-left="certificate">Take Damage</b-button>
        <b-button class="mx-2" type="is-black" icon-left="skull">Kill Survivor</b-button>
      </b-message>
    </div>
    <div class="column is-12">
      <h2 class="subtitle">{{ survivor.lifetime.name }}</h2>
      <p>[[Tokens]]</p>
    </div>
    <div class="column is-5">
      SURV
    </div>
    <div class="column is-7">
      <div class="tile is-parent is-flex-wrap-wrap">
        <div class="tile is-child is-4 is-clickable" v-for="(gi,gidx) in gridItems" :key="gidx">
          <div class="box empty-slot" v-if="gi && !gi.id">
            <b-icon icon="times-circle" size="is-medium" style="color:#ccc" />
          </div>
          <GearCard :item="gi" :showRemove="true" @remove="removeItem(gidx, true, true)" v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tile {
  &.is-child {
    .box {
      /* Figure it out */
      margin: .5em;
      min-height: 14em;
      
      &.empty-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed #ccc;
      }
    }
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import GridsMixin from '@/mixins/grids'
import SurvivorMixin from '@/mixins/survivor'
import GearCard from '@/components/storage/gear/card'

export default {
  name: 'ControlSurvivor',
  mixins: [GridsMixin, SurvivorMixin],
  components: {
    GearCard
  },
  computed: {
    ...mapGetters([
      'grids',
      'survivors'
    ]),
  },
  watch: {
    '$route.params': {
      immediate: true,
      deep: true,
      handler() {
        this.loadIds()
      }
    }
  },
  methods: {
    loadIds() {
      this.survivor = this.survivors.find(s => s.id === this.$route.params.survivorId)
      this.grid = this.grids.find(g => g.id === this.$route.params.gridId)
    }
  }
}
</script>