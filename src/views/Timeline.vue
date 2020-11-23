<template>
    <div class="column" v-if="!loading && user && campaign">
        <div class="columns">
            <div class="column is-3">
                test
            </div>
            <div class="column is-9">
                test2
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/firebase'

export default {
    name: 'Timeline',
    data() {
        return {
            campaign: null,
            timeline: []
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
        this.$bind('timeline', db.collection(`campaigns/${this.currentCampaign}/timeline`))
    },
    methods: {
    
    }
}
</script>