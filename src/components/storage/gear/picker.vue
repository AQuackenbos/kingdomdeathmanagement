<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Add Gear to Grid</p>
    </header>
    <section class="modal-card-body">
      <div class="is-clickable gear-selector my-1" v-for="item in filteredGear" :key="item.key"  :class="{ 'is-selected': selected.id === item.id }" @click="selectItem(item)">
        <GearCard :campaign="campaign" :item="item" :showQty="true"/>
      </div>
    </section>
    <footer class="modal-card-foot">
      <div class="buttons">
        <button class="button" type="button" @click="close">Cancel</button>
        <button class="button is-success" v-if="selected.id !== null" @click="select">Pick {{ selected.name }}</button>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.gear-selector {
  &.is-selected {
    .gear-card {
      background: #d0ffc5;
    }
  }
}
</style>

<script>
import GearCard from '@/components/storage/gear/card'

export default {
  name: 'GearPicker',
  props: ['gridSlot'],
  data() {
    return {
      selected: { id: null },
      filter: null
    }
  },
  components: {
    GearCard
  },
  computed: {
    filteredGear() {
      let f = this.filter?.trim().toLowerCase()
      let available = this.gear.filter(g => g.qty > 0)
      
      if(f) {
        return available.filter(g => {
          return (
            g.name?.toLowerCase().includes(f) ||
            g.description?.toLowerCase().includes(f) ||
            g.action?.toLowerCase().includes(f) ||
            g.unlock?.description.includes(f) ||
            g.armor.locations.map(l => l.toLowerCase().trim()).filter(l => l.includes(f)).length > 0 ||
            g.classifications.map(c => c.toLowerCase().trim()).filter(c => c.includes(f)).length > 0 ||
            g.keywords.map(k => k.toLowerCase().trim()).filter(k => k.includes(f)).length > 0
          )
        })
      }
      
      return available
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    
    selectItem(item) {
      this.selected = item
    },
    
    select() {
      if(!this.selected) return
      this.$emit('select', this.selected, this.gridSlot)
      this.$emit('close')
      this.selected = { id: null }
    }
  }
}
</script>