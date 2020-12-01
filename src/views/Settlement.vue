<template>
    <div class="column" v-if="!loading && user && campaign">
        <h1 class="title can-update" @click="updateTitle">{{ campaign.name }}</h1>
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
                    <li><b-button type="is-info" size="is-small" icon-left="user-plus" @click="invitePlayer">Invite Player</b-button></li>
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
                    <h2 class="title can-update" @click="updateSurvival('max')">{{ campaign.survival.max }}</h2>
                    <h1 class="subtitle">Departing</h1>
                    <h2 class="title can-update" @click="updateSurvival('departing')">{{ campaign.survival.departing }}</h2>
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
                    <li><b-button type="is-info" size="is-small" icon-left="folder-plus" @click="addQuarry">Add Quarry</b-button></li>
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
                    <li><b-button type="is-info" size="is-small" icon-left="map-marker-alt" @click="addLocation">Add Location</b-button></li>
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
                  <p class="content can-update" v-if="campaign.bonuses.arriving" @click="updateBonuses('arriving')">{{ campaign.bonuses.arriving }}</p>
                  <p class="can-update" @click="updateBonuses('arriving')" v-else>None</p>
                </div>
                <div class="column is-4">
                  <h2 class="subtitle">When Departing</h2>
                  <p class="content can-update" v-if="campaign.bonuses.departing" @click="updateBonuses('departing')">{{ campaign.bonuses.departing }}</p>
                  <p class="can-update" @click="updateBonuses('departing')" v-else>None</p>
                </div>
                <div class="column is-4">
                  <h2 class="subtitle">Other</h2>
                  <p class="content can-update" v-if="campaign.bonuses.other" @click="updateBonuses('other')">{{ campaign.bonuses.other }}</p>
                  <p class="can-update" @click="updateBonuses('other')" v-else>None</p>
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
                <div class="column is-3" v-for="p in ['new_life','death','society','conviction']" :key="p">
                  <h2 class="title is-size-5">{{ campaign.principles[p].name }}</h2>
                  <hr />
                  <h1 class="is-size-5" v-if="campaign.principles[p].selected">
                    {{ campaign.principles[p].selected }}
                  </h1>
                  <h1 class="is-size-7" v-else>
                    <span class="can-update" @click="selectPrinciple(p, campaign.principles[p].choices[0])">{{ campaign.principles[p].choices[0] }}</span>
                    <div class="divider">OR</div>
                    <span class="can-update" @click="selectPrinciple(p, campaign.principles[p].choices[1])">{{ campaign.principles[p].choices[1] }}</span>
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

.can-update {
  cursor: pointer;
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
import { mapGetters, mapActions } from 'vuex'
import { db } from '@/firebase'

export default {
    name: 'Settlement',
    data() {
      return {
        campaign: null,
        survivors: [],
        quarries: [],
        locations: [],
        users: [],
        showAddQuarry: false,
        showAddLocation: false
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
      ...mapActions([
        'setLoading'
      ]),
    
      updateField(f, v) {
        let currVal = f.split('.').reduce((o,i) => o[i], this.campaign)
        if(currVal === v) return
        
        this.setLoading(true)
        
        let updatePacket = {}
        updatePacket[f] = v
        
        db.collection('campaigns').doc(this.currentCampaign).update(updatePacket).then(() => this.setLoading(false))
      },
      
      updateTitle() {
        this.$buefy.dialog.prompt({
          message: 'Change Settlement Name',
          trapFocus: true,
          inputAttrs: {
            value: this.campaign.name
          },
          onConfirm: (val) => this.updateField('name', val)
        })
      },
      
      updateSurvival(type) {
        this.$buefy.dialog.prompt({
          message: `Update Survival (${type})`,
          trapFocus: true,
          inputAttrs: {
            type: 'number',
            value: this.campaign.survival[type]
          },
          onConfirm: (val) => this.updateField(`survival.${type}`, parseInt(val))
        })
      },
      
      updateBonuses(type) {
        this.$buefy.dialog.prompt({
          message: `Update Bonuses (${type})`,
          trapFocus: true,
          inputAttrs: {
            value: this.campaign.bonuses[type]
          },
          onConfirm: (val) => this.updateField(`bonuses.${type}`, val)
        })
      },
      
      selectPrinciple(principle, selection) {
        let principleObj = this.campaign.principles[principle]
        this.$buefy.dialog.confirm({
          title: 'Select Principle',
          message: `Confirm selecting <span class="has-text-weight-bold">${selection}</span> for the principle <span class="has-text-weight-bold">${principleObj.name}</span>?`,
          type: 'is-info',
          onConfirm: () => this.updateField(`principles.${principle}.selected`, selection)
        })
      },
      
      addQuarry() {
      
      },
      
      addLocation() {
      
      },
      
      invitePlayer() {
      
      }
    }
}
</script>