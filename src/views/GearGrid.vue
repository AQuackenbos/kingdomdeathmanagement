<template>
  <div class="column is-12" v-if="!loading && user && campaign && grid">
    <h1 class="title">Grid Builder</h1>
    <hr />
    <section class="section">
      <h1 class="subtitle">{{ grid.name }}</h1>
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-3 is-align-items-center">
          <b-button type="is-success" @click.prevent="saveGrid" expanded>Save Grid</b-button>
          <b-switch v-model="showMinis" class="my-1">Use Compact Cards</b-switch>
          
          <div class="subtitle">(Bonus list)</div>
        </div>
        <div class="tile is-parent is-9 is-flex-wrap-wrap">
          <div class="tile is-child is-4" v-for="(gi,gidx) in grid.items" :key="gidx">
            <div class="box empty-slot is-clickable" v-if="gi === null" @click="pickGear(gidx)">
              <b-icon icon="plus-square" size="is-medium" style="color:#ccc" />
            </div>
            <GearMini :item="gear.find(g => g.id === gi)" :campaign="campaign" v-else-if="showMinis" />
            <GearCard :item="gear.find(g => g.id === gi)" :campaign="campaign" v-else />
          </div>
        </div>
      </div>
    </section>
    <b-modal
      v-model="showGearPicker"
      has-modal-card
      trap-focus
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-modal
    >
      <template #default="props">
        <GearPicker
          :gear="gear"
          :campaign="campaign"
          :gridSlot="targetSlot"
          @close="props.close"
          @select="selectGear"
        />
      </template>
    </b-modal>
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
import { db } from '@/firebase'
import GearMini from '@/components/storage/gear/mini'
import GearCard from '@/components/storage/gear/card'
import GearPicker from '@/components/storage/gear/picker'

export default {
  name: 'GearGrid',
  data() {
    return {
      campaign: null,
      gear: [],
      grid: null,
      showMinis: true,
      showGearPicker: false,
      targetSlot: 0
    }
  },
  components: {
    GearCard,
    GearMini,
    GearPicker
  },
  computed: {
    ...mapGetters([
      'loading',
      'user',
      'currentCampaign'
    ])
  },
  created() {
    this.$bind('campaign', db.collection('campaigns').doc(this.currentCampaign))
    this.$bind('gear', db.collection(`campaigns/${this.currentCampaign}/gear`))
    this.$bind('grid', db.collection(`campaigns/${this.currentCampaign}/grids`).doc(this.$route.params.id))
  },
  methods: {
    gridItems() {
      return this.grid.items.map(i => {
        if(i === null) return null;
        return this.gear.find(g => g.id === i)
      })
    },
    
    pickGear(slot) {
      this.targetSlot = slot
      this.showGearPicker = true
    },
    
    selectGear(gear, slot) {
      this.grid.items[slot] = gear.id
    },
    
    saveGrid() {
      db.collection(`campaigns/${this.currentCampaign}/grids`).doc(this.grid.id).update({
        name: this.grid.name,
        items: this.grid.items
      })
    }
  }
}
</script>