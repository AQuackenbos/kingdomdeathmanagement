<template>
  <div class="tile is-ancestor gear-sheet">
    <div class="field corner-control">
      <b-switch v-model="hideOos">Hide Out of Stock</b-switch>
    </div>
    <b-button type="is-info" icon-left="plus-square" class="corner-button" rounded @click.prevent="showAddGear = true">Add New Gear</b-button>
    <b-modal
      v-model="showAddGear"
      has-modal-card
      trap-focus
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-modal
    >
      <template #default="props">
        <GearAdd
          :gear="gear"
          :campaign="campaign"
          :newItem="true"
          @close="props.close"
          @add="addGear"
        />
      </template>
    </b-modal>
    <b-modal
      v-model="showEditGear"
      has-modal-card
      trap-focus
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-modal
    >
      <template #default="props">
        <GearAdd
          v-bind="editGear"
          @close="props.close"
          @save="saveGearEdit"
        />
      </template>
    </b-modal>
    <div class="tile is-vertical" v-for="(cg,idx) in [categoriesLeft,categoriesRight]" :key="idx">
      <div class="tile is-parent" v-for="c in cg" :key="c.name" :ref="c.name">
        <div class="tile is-child box">
          <h1 class="subtitle">{{ c.name }}</h1>
          <hr />
          <div class="tile is-parent">
            <div class="tile is-child is-4" v-for="g in c.gear" :key="g.id" style="padding:.5em">
              <div class="is-size-7 gear-qty" :class="{ 'is-cutoff': g.qty <= 0 }">
                <span class="tags has-addons is-pulled-left">
                  <span class="tag" :class="{ 'is-info': g.qty > 0, 'is-danger': g.qty <= 0 }">Storage</span>
                  <span class="tag is-dark">{{ g.qty - (gridQty[g.id]||0) }}</span>
                </span>
                <span class="tags has-addons is-pulled-right" :class="{ 'is-faded': g.qty <= 0 }">
                  <span class="tag is-primary">Grids</span>
                  <span class="tag is-dark">{{ gridQty[g.id]||0 }}</span>
                </span>
              </div>
              <GearCard :item="g" :campaign="campaign" class="is-scaled is-clickable" :class="{ 'is-faded': g.qty <= 0 }" style="font-size:12px;clear:both" @click.native="openGearEdit(g)"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.corner-control {
  position: fixed;
  z-index: 10;
  bottom: 2em;
  left: 2em;
}

.gear-sheet {
  .corner-button {
    position: fixed;
    bottom: 2em;
    right: 2em;
    z-index: 10;
  }
  
  .gear-qty {
    .tags {
      margin-bottom: -1.1em;
    }
  }
}

.is-faded {
  opacity: 0.3;
}

.is-cutoff {
  overflow-y: hidden;
}

.gear-card {
  &:hover {
    box-shadow: 2px 2px gray;
    border: 1px solid gray;
  }
}

.tile {
  &.is-parent {
    flex-wrap: wrap;
    position: relative;
  }
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import { db } from '@/firebase'
import GearAdd from '@/components/storage/gear/add'
import GearCard from '@/components/storage/gear/card'
import merge from 'deepmerge'

export default {
  name: 'Gear',
  props: ['campaign'],
  data() {
    return {
      gear: [],
      hideOos: false,
      showAddGear: false,
      showEditGear: false,
      editGear: {
        item: null,
        campaign: null,
        gear: [],
        newItem: false,
        mode: 'Edit'
      }
    }
  },
  components: {
    GearAdd,
    GearCard
  },
  created() {
    this.$bind('gear', db.collection(`campaigns/${this.currentCampaign}/gear`))
  },
  computed: {
    ...mapGetters([
      'loading',
      'currentCampaign'
    ]),
    
    gridQty() {
      return {}
    },
    
    categoryNames() {
      return this.gear
        .map(r => r.category.trim().toLowerCase())
        .filter((v,i,s) => s.indexOf(v) === i && v !== null)
        .map(r => r.split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' '))
        .sort()
    },
    
    categories() {
      let categories = []
      let names = this.categoryNames
      names.forEach(n => categories.push({
          name: n,
          gear: this.gear.filter(r => r.category.trim().toLowerCase() === n.trim().toLowerCase() && (this.hideOos ? r.qty > 0 : true))
      }))
      return categories.filter(c => c.gear.length > 0)
    },
    
    categoriesLeft() {
      return this.categories.filter((k,i) => {
        k;
        return !(i%2)
      })
    },
    
    categoriesRight() {
      return this.categories.filter((k,i) => {
        k;
        return i%2
      })
    }
  },
  methods: {
    ...mapActions([
      'setLoading'
    ]),
    
    openGearEdit(g) {
      this.editGear = merge(this.editGear, {
        item: merge({ id: g.id }, g),
        gear: this.gear,
        campaign: this.campaign
      })
      this.showEditGear = true
    },
    
    addGear(g) {
      if(!g.qty) g.qty = 0
      db.collection(`campaigns/${this.currentCampaign}/gear`).doc().set(g)
    },
    
    saveGearEdit(g) {
      let docId = g.id
      delete(g.id)
      if(!g.qty) g.qty = 0
      db.collection(`campaigns/${this.currentCampaign}/gear`).doc(docId).update(g)
    }
  }
}
</script>