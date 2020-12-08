<template>
  <div class="column is-12" v-if="!loading && user && campaign">
    <h1 class="title">Settlement Storage</h1>
    <section class="section">
      <b-tabs position="is-centered" class="block" size="is-medium" type="is-boxed" expanded>
        <b-tab-item label="Resources" icon="drumstick-bite">
          <Resources
            :campaign="campaign"
          />
        </b-tab-item>
        <b-tab-item label="Gear" icon="khanda">
          <Gear 
            :campaign="campaign"
          />
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/firebase'
import Resources from '@/components/storage/resources'
import Gear from '@/components/storage/gear'


export default {
  name: 'Storage',
  data() {
    return {
      campaign: null
    }
  },
  components: {
    Resources,
    Gear
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      user: 'user',
      currentCampaign: 'currentCampaign'
    })
  },
  created() {
    this.$bind('campaign', db.collection('campaigns').doc(this.currentCampaign))
  },
  methods: {
  
  }
}
</script>