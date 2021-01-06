import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default Vue.mixin({
  computed: {
    ...mapGetters([
      'showLoading',
      'loadingText',
      'campaign',
      'currentCampaignId',
      'isBinding',
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'setLoading',
      'setLoadingText',
      'bindCampaign'
    ]),
    
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    
    normalize(str) {
      return str.trim().toLowerCase()  
    },
    
    parseBlock(text) {
      if(!text) return ''
      
      return text
        .replaceAll('[A]', '<span class="bl-action"></span>')
        .replaceAll('[M]', '<span class="bl-movement"></span>')
        .replaceAll('[E]', '<span class="bl-endeavor"></span>')
        .replaceAll('[S]', '<span class="bl-story-event"></span>')
        .replaceAll("\n" , '<br />')
        .replaceAll(/\{[0-9]+\}/g, m => {
          let am = parseInt(m.replaceAll('{','').replaceAll('}',''))
          return `<span class="armor-block"><span class="bl-armor"></span><span class="amount">${am}</span></span>`
        })
    }
  },
  created() {
    if(this.$store && this.currentCampaignId && !this.campaign?.id) {
      this.bindCampaign(this.currentCampaignId)
    }
  }
})