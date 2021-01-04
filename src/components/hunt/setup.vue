<template>
    <div>
      <div class="content" v-if="!activeHuntId">
        <p>There is no Hunt currently ongoing.</p>
        <p><b-button type="is-success">Start New Hunt</b-button></p>
      </div>
      <div class="columns is-multiline" v-else>
        else
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/firebase'

export default {
  name: 'HuntSetup',
  data: () => ({
    activeHunt: null
  }),
  computed: {
    ...mapGetters([
      'grids',
      'survivors',
      'hunts'
    ]),
    
    activeHuntId() {
      return this.hunts.find(h => h.active === true)?.id
    }
  },
  watch: {
    activeHuntId: {
      immediate: true,
      handler(id) {
        if(id) this.$bind('activeHunt', db.collection(`campaigns/${this.currentCampaignId}/hunts`).doc(id))
      }
    }
  }
}
</script>