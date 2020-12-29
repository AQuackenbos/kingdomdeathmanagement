<template>
  <div class="column is-12" v-if="!loading && user && campaign && grid">
    <h1 class="title">Grid Builder</h1>
    <hr />
    <section class="section">
      <h1 class="subtitle is-clickable" @click.prevent="promptName">{{ grid.name }}</h1>
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-3 is-align-items-center">
          <div class="tile is-child">
            <b-button type="is-success" @click.prevent="saveGrid" expanded v-if="requireSave">Save Grid</b-button>
            <b-switch v-model="showMinis" class="my-1">Use Compact Cards</b-switch>
          </div>
          <div class="tile is-child">
            <div class="subtitle">Stats and Unlocks</div>
            <hr />
          </div>
          <div class="tile is-child">
            <div class="subtitle">Set Bonuses</div>
            <hr />
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
import draggable from 'vuedraggable'

export default {
  name: 'GearGrid',
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
    
    gridItems: {
      get() {
        return this.grid.items.map(i => {
          if(
            i === null ||
            (typeof i === 'object' && !i.id) 
          ) return {}
          
          return this.gear.find(g => g.id === i)
        })
      },
      set(v) {
        this.grid.items = v.map(i => {
          if(
            i === null ||
            (typeof i === 'object' && !i.id)
          ) return {}
          
          if(typeof i === 'string') return i
          return i.id
        })
      }
    },
    
    requireSave() {
      return !((this.grid.items.length == this.originalItems.length) && this.grid.items.every((element, index) => {
        return element === this.originalItems[index]; 
      }))
    },
  },
  created() {
    this.$bind('campaign', db.collection('campaigns').doc(this.currentCampaign))
    this.$bind('armorSets', db.collection('armor_sets'))
    this.$bind('gear', db.collection(`campaigns/${this.currentCampaign}/gear`))
    this.$bind('grid', db.collection(`campaigns/${this.currentCampaign}/grids`).doc(this.$route.params.id)).then(g => {
      this.originalItems = g.items
    })
  },
  methods: {
    attachGridValues(item, slot) {
      if(!item.id) return item
      item.calculated = {
        connections: {
          red: 0,
          blue: 0,
          green: 0
        }
      }
      
      let neighbors = { top: {}, left: {}, right: {}, bottom: {} }
      
      const dir = ['top', 'left', 'right', 'bottom']
      const revDir = Object.assign([],dir).reverse()
      const slotOffset = [-3, -1, 1, 3]
      
      //console.log('slot '+slot)
      for(const d in [...Array(4).keys()]) {
        neighbors[dir[d]] = this.gridItems[slot + slotOffset[d]]
        if(!neighbors[dir[d]]) continue
        
        //console.log(dir[d]+' neighbor '+neighbors[dir[d]].name)
        
        if(item.connections.[dir[d]] === neighbors[dir[d]]?.connections?.[revDir[d]]) {
          if(item.connections[dir[d]] === null) continue
          item.calculated.connections[item.connections[dir[d]]]++
          
          
          let identifier = Math.min(slot, (slot + slotOffset[d])) + '_' + Math.max(slot, (slot + slotOffset[d]))
          this.grid.boxes[item.connections[dir[d]]].push(identifier)
          
          //console.log('slot '+slot+' added '+item.connections[dir[d]]+' from '+dir[d]+' ident ' + identifier)
        }
      }
      
      return item
    },
    
    affinities() {
      
      let retObj = { red: 0, blue: 0, green: 0 }
      if(!this.grid.boxes) {
        this.grid.boxes = {
          red: [],
          blue: [],
          green: []
        }
      }
      let items = this.extendedGridItems();
      ['red','blue','green'].forEach(c => {
        retObj[c] = this.grid.boxes[c].filter((v,i,s) => s.indexOf(v) === i && v !== null).length
        retObj[c] += items.map(gi => gi?.affinities?.filter(a => a.trim().toLowerCase() === c) || []).map(f => f.length).reduce((a,b) => a + b, 0)
      })
      
      
      return retObj
    },
  
    pickGear(slot) {
      this.targetSlot = slot
      this.showGearPicker = true
    },
    
    selectGear(gear, slot) {
      this.grid.items[slot] = gear.id
      this.gridItems = this.grid.items
    },
    
    saveGrid() {
      db.collection(`campaigns/${this.currentCampaign}/grids`).doc(this.grid.id).update({
        name: this.grid.name,
        items: this.grid.items
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
    
    extendedGridItems() {
      this.grid.boxes = {
        red: [],
        blue: [],
        green: []
      }
      
      return this.gridItems.map((i,idx) => this.attachGridValues(i,idx)) 
    },
    
    bonusTexts() {
      let text = []
      let affinities = this.affinities()
      
      let items = this.extendedGridItems()
      items.forEach(i => {
        if(i.description?.length) text.push(...i.description.split("\n"))
        if(i.action?.length) text.push('[A]:' + i.action)
        
        console.log(i.unlock)
        if(i.unlock?.requires?.length) {
          let requirements = {
            connection: { red: 0, blue: 0, green: 0 },
            affinity: { red: 0, blue: 0, green: 0 }
          }
          
          i.unlock.requires.map(r => r.toLowerCase().trim()).forEach(r => {
            let [color, type] = r.split(' ')
            requirements[type][color]++
          })
          
          console.log('Testing -- ', affinities, i.calculated.connections, requirements)
          if(
            affinities.red >= requirements.affinity.red &&
            affinities.blue >= requirements.affinity.blue &&
            affinities.green >= requirements.affinity.green &&
            i.calculated.connections.red >= requirements.connection.red &&
            i.calculated.connections.blue >= requirements.connection.blue &&
            i.calculated.connections.green >= requirements.connection.green
          ) text.push(i.unlock.description)
        }
      })
      
      return text.map(this.parseBlock)
    },
    
    
    parseBlock(text) {
      if(!text) return ''
      
      return text
        .replaceAll('[A]', '<span class="bl-action"></span>')
        .replaceAll('[M]', '<span class="bl-movement"></span>')
        .replaceAll('[E]', '<span class="bl-endeavor"></span>')
        .replaceAll('[S]', '<span class="bl-story-event"></span>')
        .replaceAll("\n" , '<br />')
        .replaceAll(/\{[0-9]+\}/g, m => {
          let am = parseInt(m.replaceAll('{','').replaceAll('}',''))
          return `<span class="armor-block"><span class="bl-armor"></span><span class="amount">${am}</span></span>`
        })
    }
    /** ----------------------------------------------------------------------  **/
  }
}
</script>