<template>
  <div>
    Campaigns:
    <div v-for="c in campaigns" :key="c.id">
      {{ c.name }}
    </div>
    <hr />
    <CampaignCreate />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { db } from '@/firebase'
import CampaignCreate from '@/components/campaign/create'

export default {
  name: 'CampaignList',
  components: {
    CampaignCreate
  },
  data() {
    return {
      campaigns: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  created() {
    let userId = this.user.id
    this.$bind('campaigns', db.collection('campaigns').where('members', 'array-contains', userId))
  },
  methods: {
    ...mapActions([
      'setCurrentCampaign'
    ])
  }
}
</script>