<template>
  <div class="column is-12" v-if="!loading && user && campaign && grid">
    <h1 class="title">Grid Builder</h1>
    <hr />
    <section class="section">
      <h1 class="title is-size-4 is-clickable" @click.prevent="promptName">{{ grid.name }}</h1>
      <div class="tile is-ancestor is-flex-wrap-wrap">
        <div class="tile is-vertical is-3 is-align-items-center">
          <b-switch v-model="showMinis" class="my-1">Use Compact Cards</b-switch>
          <hr />
          <div class="tile is-child">
            <div class="subtitle">Calculated Stats</div>
            <div class="divider">ARMOR</div>
            <div class="armor-description level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">
                    <span class="bl-head"></span>
                  </p>
                  <p class="contet armor-block">
                    <span class="bl-armor"></span>
                    <span class="amount">{{ armors().head }}</span>
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">
                    <span class="bl-arms"></span>
                  </p>
                  <p class="contet armor-block">
                    <span class="bl-armor"></span>
                    <span class="amount">{{ armors().arms }}</span>
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">
                    <span class="bl-body"></span>
                  </p>
                  <p class="contet armor-block">
                    <span class="bl-armor"></span>
                    <span class="amount">{{ armors().body }}</span>
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">
                    <span class="bl-waist"></span>
                  </p>
                  <p class="contet armor-block">
                    <span class="bl-armor"></span>
                    <span class="amount">{{ armors().waist }}</span>
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">
                    <span class="bl-legs"></span>
                  </p>
                  <p class="contet armor-block">
                    <span class="bl-armor"></span>
                    <span class="amount">{{ armors().legs }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="divider">BONUSES</div>
            <div class="level">
              <b-field v-for="s in Object.keys(bonuses().stats)" :key="s" :label="shortname[s]" label-position="on-border" class="level-item">
                <b-input size="is-small" class="stat-box" :value="bonuses().stats[s]" disabled />
              </b-field>
            </div>
            <ul>
              <li v-for="(t,tidx) in bonuses().text" :key="tidx" v-html="t" class="is-size-7" />
            </ul>
            <div class="divider">AFFINITIES</div>
            <span v-for="c in ['red','blue','green']" :key="c">
              <b-icon icon="square-full" :style="{ color: c }" v-for="n in affinities()[c]" :key="n" />
            </span>
            <div class="divider">SET BONUSES</div>
              <ul>
                <li v-for="asp in armorSetProgress().filter(a => a.progress >= a.piecesRequired)" :key="asp.id" class="is-size-7">
                  <p class="header"><strong>{{ asp.name }}</strong></p>
                  <hr style="width:75%;text-align:center;margin:.5em auto"/>
                  <div class="content">
                    <p v-for="(b,bidx) in asp.bonuses" :key="bidx">
                      <span v-if="b.type === 'armor'">
                        Add +<span class="armor-block"><span class="bl-armor"></span><span class="amount">{{ b.amount }}</span></span> to all hit locations.
                      </span>
                      <span v-else-if="b.type === 'ability'">
                        <strong>{{ b.name }}</strong>: <span v-html="parseBlock(b.description)" />
                      </span>
                      <span v-else v-html="b.description" />
                    </p>
                  </div>
                </li>
              </ul>
            <b-collapse :open="false" position="is-top" aria-id="incomplete-sets">
              <a slot="trigger" slot-scope="props" aria-controls="incomplete-sets" class="is-size-7">
                <b-icon :icon="!props.open ? 'caret-down' : 'caret-up'" size="is-small"></b-icon>
                Show Incomplete Sets
              </a>
              <ul>
                <li v-for="asp in armorSetProgress().filter(a => a.progress < a.piecesRequired)" :key="asp.id" class="is-size-7">
                  {{ asp.progress }} / {{ asp.piecesRequired }} {{ asp.name }}
                </li>
              </ul>
            </b-collapse>
          </div>
        </div>
        <draggable 
          class="tile is-parent is-9 is-flex-wrap-wrap"
          v-model="gridItems"
          group="gridItems"
          :move="handleMove" 
          @end="handleDragEnd"
        >
          <div class="tile is-child is-4 is-clickable" v-for="(gi,gidx) in gridItems" :key="gidx">
            <div class="box empty-slot" v-if="gi && !gi.id" @click="pickGear(gidx)">
              <b-icon icon="plus-square" size="is-medium" style="color:#ccc" />
            </div>
            <GearMini :item="gi" :campaign="campaign" :showRemove="true" @remove="removeItem(gidx)" v-else-if="showMinis" />
            <GearCard :item="gi" :campaign="campaign" :showRemove="true" @remove="removeItem(gidx)" v-else />
          </div>
        </draggable>
        <div class="tile is-parent is-12">
          <b-button type="is-success" @click.prevent="saveGrid" expanded v-if="requireSave">Save Grid</b-button>
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

.field.is-floating-label {
  &.level-item {
    margin-bottom: 0;
  }

  &::v-deep {
    .label {
      overflow: visible;
    }
  }
}

.stat-box {
  width: 2.5em;
  &::v-deep {
    input {
      text-align: center;
      font-weight: bold;
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
import GridsMixin from '@/mixins/grids'
import draggable from 'vuedraggable'

export default {
  name: 'GearGrid',
  mixins: [GridsMixin],
  data() {
    return {
      campaign: null,
      armorSets: [],
      gear: [],
      grid: null,
      originalItems: [],
      showMinis: true,
      showGearPicker: false,
      targetSlot: 0
    }
  },
  components: {
    GearCard,
    GearMini,
    GearPicker,
    draggable
  },
  computed: {
    ...mapGetters([
      'loading',
      'user',
      'currentCampaign'
    ]),
    
    requireSave() {
      return !((this.grid.items.length == this.originalItems.length) && this.grid.items.every((element, index) => {
        return element === this.originalItems[index]; 
      }))
    },
    
    shortname() {
      return {
        'movement': 'MOV',
        'accuracy': 'ACC',
        'strength': 'STR',
        'evasion': 'EVA',
        'luck': 'LCK',
        'speed': 'SPE'
      }
    }
  },
  created() {
    this.$bind('campaign', db.collection('campaigns').doc(this.currentCampaign))
    this.$bind('gear', db.collection(`campaigns/${this.currentCampaign}/gear`))
    this.$bind('grid', db.collection(`campaigns/${this.currentCampaign}/grids`).doc(this.$route.params.id)).then(g => {
      this.originalItems = g.items
    })
  },
  methods: {
    pickGear(slot) {
      this.targetSlot = slot
      this.showGearPicker = true
    },
    
    selectGear(gear, slot) {
      this.grid.items[slot] = gear.id
      this.gridItems = this.grid.items
    },
    
    updatePreviews() {
      this.grid.previews = this.gridItems.map(i => {
        if(
          i === null ||
          (typeof i === 'object' && !i.id)
        ) return ''
        
        if(typeof i === 'string') return i
        
        if(i.type === 'armor') {
          return i.armor.locations[0]
        }
        
        return i.type
      })
    },
  
    saveGrid() {
      this.updatePreviews()
      db.collection(`campaigns/${this.currentCampaign}/grids`).doc(this.grid.id).update({
        name: this.grid.name,
        items: this.grid.items,
        previews: this.grid.previews
      }).then(() => {
        this.originalItems = this.grid.items
      })
    },
    
    /** VueDraggable Swap Hack **/
    handleDragEnd() {
      if(this.futureIndex === -1 || this.movingIndex === -1) return
    
      this.futureItem = this.grid.items[this.futureIndex]
      this.movingItem = this.grid.items[this.movingIndex]
      const _items = Object.assign([], this.grid.items)
      _items[this.futureIndex] = this.movingItem
      _items[this.movingIndex] = this.futureItem

      this.futureIndex = -1
      this.movingIndex = -1

      this.grid.items = _items
      this.gridItems = this.grid.items
    },
    
    handleMove(e) {
      const { index, futureIndex } = e.draggedContext
      this.movingIndex = index
      this.futureIndex = futureIndex
      return false // disable sort
    },
    
    removeItem(idx) {
      this.grid.items[idx] = {}
      this.gridItems = this.grid.items
    },
    
    promptName() {
      this.$buefy.dialog.prompt({
        message: "Change Grid Name",
        inputAttrs: {
          value: this.grid.name,
          required: true
        },
        required: true,
        trapFocus: true,
        onConfirm: (val) => {
          this.grid.name = val
          this.saveGrid()
        }
      })
    },
  }
}
</script>