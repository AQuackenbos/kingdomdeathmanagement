<template>
    <div class="column" v-if="!loading && user && campaign">
        <h1 class="title">{{ campaign.name }}</h1>
        <h2 class="subtitle">Lantern Year {{ campaign.year }}</h2>
        <div class="columns is-multiline">
          <div class="column is-3">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">Members</p>
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
          <div class="column is-3">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">Campaign Survival</p>
              </header>
              <div class="card-content">
                <div class="block">
                    <h1 class="subtitle">Limit</h1>
                    <h2 class="title">{{ campaign.survival.max }}</h2>
                    <h1 class="subtitle">Departing</h1>
                    <h2 class="title">{{ campaign.survival.departing }}</h2>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">Quarries</p>
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
          <div class="column is-3">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">Locations</p>
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
          <div class="column is-6">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">Special Bonuses</p>
              </header>
              <div class="columns card-content">
                <div class="column is-4">
                  <h2 class="subtitle">Upon Arrival</h2>
                  <p class="content" v-if="campaign.bonuses.arriving">{{ campaign.bonuses.arriving }}</p>
                  <p v-else>None</p>
                </div>
                <div class="column is-4">
                  <h2 class="subtitle">When Departing</h2>
                  <p class="content" v-if="campaign.bonuses.departing">{{ campaign.bonuses.departing }}</p>
                  <p v-else>None</p>
                </div>
                <div class="column is-4">
                  <h2 class="subtitle">Other</h2>
                  <p class="content" v-if="campaign.bonuses.other">{{ campaign.bonuses.other }}</p>
                  <p v-else>None</p>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-6">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">Principles</p>
              </header>
              <div class="columns card-content">
                <div class="column is-3" v-for="p in campaign.principles" :key="p.name">
                  <h2 class="title is-size-5">{{ p.name }}</h2>
                  <hr />
                  <h1 class="is-size-5" v-if="p.selected">
                    {{ p.selected }}
                  </h1>
                  <h1 class="is-size-7" v-else>
                    {{ p.choices[0] }} 
                    <div class="divider">OR</div>
                    {{ p.choices[1] }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-12">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">Milestones</p>
              </header>
              <div class="columns card-content">
                <div class="column is-5">
                  <div class="level" v-for="(m,idx) in leftMilestones" :key="idx">
                    <div class="level-left">
                      <div class="level-item">
                        {{ m.trigger }}
                      </div>
                    </div>
                    <div class="level-right">
                      <div class="level-item">
                        <img class="special-icon small icon-story" src="images/story.png"/><span class="has-text-weight-bold">{{ m.consequence }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column is-2">
                  <div class="divider is-vertical content" style="height:100%"></div>
                </div>
                <div class="column is-5">
                  <div class="level" v-for="(m,idx) in rightMilestones" :key="idx">
                    <div class="level-left">
                      <div class="level-item">
                        {{ m.trigger }}
                      </div>
                    </div>
                    <div class="level-right">
                      <div class="level-item">
                        <img class="special-icon small icon-story" src="images/story.png"/><span class="has-text-weight-bold">{{ m.consequence }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";
@import "~@creativebulma/bulma-divider";

.divider {
  &.is-vertical {
    &::before {
      margin-bottom: 0
    }
    
    &::after {
      margin-top: 0
    }
  }
}


.special-icon {
  display: inline-block;
  vertical-align: top;
  
  &.small {
    width: 20px;
    height: 20px;
  }
}
</style>

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
        
        leftMilestones() {
          return this.campaign.milestones.filter((k,i) => {
            k;
            return i%2
          })
        },
        
        rightMilestones() {
          return this.campaign.milestones.filter((k,i) => {
            k;
            return !(i%2)
          })
        },
        
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