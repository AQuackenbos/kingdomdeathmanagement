<template>
    <div class="column" v-if="!loading && user && campaign">
        <h1 class="title">{{ campaign.name }}</h1>
        ((Current year))<br />
        (List Quarries)<br />
        (List Locations)<br />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/firebase'

export default {
    name: 'Settlement',
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