<template>
    <div class="column" v-if="!loading && user && campaign">
        <h1 class="title">{{ campaign.name }}</h1>
        <h2 class="subtitle">Lantern Year {{ campaign.year }}</h2>
        <div class="columns">
          <div class="column is-4">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">Quarries</p>
              </header>
              <div class="card-content">
                <div class="block">
                  <ul>
                    <li v-for="q in campaignQuarries" :key="q.id">{{ q.name }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">Locations</p>
              </header>
              <div class="card-content">
                <div class="block">
                  <ul>
                    <li v-for="l in campaignLocations" :key="l.id">{{ l.name }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">Members</p>
              </header>
              <div class="card-content">
                <div class="block">
                  <ul>
                    <li v-for="m in members" :key="m.uid">{{ m.displayName }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        (List Quarries)<br />
        (List Locations)<br />
        (Survival Limit/Settlement Bonuses/etc)<br />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/firebase'

export default {
    name: 'Settlement',
    data() {
        return {
            campaign: null,
            survivors: [],
            quarries: [],
            locations: [],
            users: []
        }
    },
    computed: {
        ...mapGetters({
            loading: 'loading',
            user: 'user',
            currentCampaign: 'currentCampaign'
        }),
        
        campaignQuarries() {
          return this.quarries.filter(q => this.campaign.quarries.includes(q.id))
        },
        
        campaignLocations() {
          return this.locations.filter(l => this.campaign.locations.includes(l.id))
        },
        
        members() {
          return this.users.filter(u => this.campaign.members.includes(u.id))
        }
    },
    created() {
        this.$bind('campaign', db.collection('campaigns').doc(this.currentCampaign))
        this.$bind('survivors', db.collection(`campaigns/${this.currentCampaign}/survivors`))
        this.$bind('quarries', db.collection('quarries'))
        this.$bind('users', db.collection('users'))
        this.$bind('locations', db.collection('locations'))
    },
    methods: {
    
    }
}
</script>