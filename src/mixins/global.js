import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default Vue.mixin({
  computed: {
    ...mapGetters([
      'showLoading',
      'campaign',
      'currentCampaignId',
      'isBinding',
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'setLoading',
      'bindCampaign'
    ])
  },
  created() {
    if(this.$store && this.currentCampaignId && !this.campaign?.id) {
      this.bindCampaign(this.currentCampaignId)
    }
  }
})