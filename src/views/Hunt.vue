<template>
  <div class="column" v-if="!loading && user && campaign">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/firebase'

export default {
  name: 'Hunt',
  data: () => ({
    campaign: null
  }),
  computed: {
    ...mapGetters([
      'loading',
      'user',
      'currentCampaign'
    ])
  },
  created() {
    this.$bind('campaign', db.collection('campaigns').doc(this.currentCampaign))
  }
}
</script>