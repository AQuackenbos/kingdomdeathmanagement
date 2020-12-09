<template>
  <div class="tile is-ancestor gear-sheet">
    <b-button type="is-info" icon-left="plus-square" class="corner-button" rounded @click.prevent="showAddGear = true">Add New Gear</b-button>
    <b-modal
      v-model="showAddGear"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal>
      <template #default="props">
        <GearAdd 
          :gear="gear"
          :campaign="campaign"
          @close="props.close"
          @add="addGear"
        />
      </template>
    </b-modal>
    <div class="tile is-vertical" v-for="(cg,idx) in [categoriesLeft,categoriesRight]" :key="idx">
      <div class="tile is-parent" v-for="c in cg" :key="c.name" :ref="c.name" style="position:relative">
        <div class="tile is-child box"> {{ c.name }} </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gear-sheet {
  .corner-button {
    position: fixed;
    bottom: 2em;
    right: 2em;
  }
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import { db } from '@/firebase'
import GearAdd from '@/components/storage/gear/add'
db;
export default {
  name: 'Gear',
  props: ['campaign'],
  data() {
    return {
      gear: [],
      showAddGear: false
    }
  },
  components: {
    GearAdd
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      currentCampaign: 'currentCampaign'
    }),
    
    categories() {
      return [{name:'cat left'},{name:'cat right'}]
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
    ])
  }
}
</script>