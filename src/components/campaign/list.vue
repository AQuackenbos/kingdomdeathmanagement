<template>
  <div>
  <div class="columns is-multiline">
    <div class="column is-4" v-for="c in campaigns" :key="c.id">
      <div class="card campaign" @click.prevent="selectCampaign(c)">
        <header class="card-header">
          <p class="card-header-title">
            {{ c.name }}
          </p>
        </header>
        <div class="card-content">
          Lantern Year {{ c.year }} <br />
          {{ c.members.length }} Players
        </div>
      </div>
    </div>
  </div>
  <hr />
  <CampaignCreate />
  </div>
</template>

<style scoped lang="scss">
.campaign {
  cursor: pointer;
  
  &:hover {
    box-shadow: inset 0 0 2px #7957d5, inset 0 0 2px #7957d5, inset 0 0 2px #7957d5
  }
}
</style>

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
    ...mapGetters([
      'user'
    ])
  },
  created() {
    let userId = this.user.uid
    this.$bind('campaigns', db.collection('campaigns').where('members', 'array-contains', userId))
  },
  methods: {
    ...mapActions([
      'bindCampaign'
    ]),
    
    selectCampaign(campaign) {
      this.bindCampaign(campaign.id).then(() => {
        this.$router.push({ name: 'Settlement' })
      })
    }
  }
}
</script>