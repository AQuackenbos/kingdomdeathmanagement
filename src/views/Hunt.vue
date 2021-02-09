<template>
  <div class="column" v-if="!showLoading && user && campaign">
    <router-view></router-view>
  </div>
</template>

<script>
// import { db } from '@/firebase'

export default {
  name: 'Hunt',
  created: async function() {
    document.title = "KDM | Hunt Helper"
    if(this.currentCampaignId && (this.$route.path === '/hunt' || this.$route.path === '/hunt/')) {
      this.$router.push('/hunt/survivor')
      /**
      db.collection(`campaigns/${this.currentCampaignId}/hunts`).where('active','==',true).get().then(r => {
        if(r.empty) {
          this.$router.push('/hunt/setup')
        } else {
          this.$router.push(`/hunt/${r.docs[0].data().state}`)
        }
      })
      **/
    }
  }
}
</script>