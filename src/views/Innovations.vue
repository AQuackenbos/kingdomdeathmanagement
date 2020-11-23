<template>
    <div>_INNOVATIONS_</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/firebase'

export default {
    name: 'Innovations',
    data() {
        return {
            campaign: null
        }
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