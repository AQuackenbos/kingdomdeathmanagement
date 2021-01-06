<template>
    <div class="column" v-if="!showLoading && user && campaign">
        <h1 class="title can-update" @mouseover="showTitleEdit=true" @mouseleave="showTitleEdit=false">
          {{ campaign.name }}
          <span class="is-size-6" @click="updateTitle" v-if="showTitleEdit">
            <b-icon class="is-clickable ml-2" size="is-small" icon="edit"/>
          </span>
        </h1>
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
                    <li><b-button type="is-info" size="is-small" icon-left="user-plus" @click="showAddUser = true">Invite Player</b-button></li>
                  </ul>
                  <b-modal
                    v-model="showAddUser"
                    has-modal-card
                    trap-focus
                    :destroy-on-hide="false"
                    aria-role="dialog"
                    aria-modal>
                    <template #default="props">
                      <UserAdd
                        @close="props.close"
                        @add="addUser"
                      />
                    </template>
                  </b-modal>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">Survival</p>
              </header>
              <div class="card-content">
                <div class="block">
                    <h1 class="subtitle">Limit</h1>
                    <h2 class="title can-update max-survival" @click="updateSurvival">{{ campaign.survival.max }}</h2>
                    <p class="has-text-size-7 is-size-7" style="color:#aaa;margin-bottom:.25em">(+{{ maxSurvivalBonus }} from Innovations)</p>
                    <h1 class="subtitle">Departing</h1>
                    <h2 class="title">{{ departingSurvival }}</h2>
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
                    <li><b-button type="is-info" size="is-small" icon-left="folder-plus" @click="showAddQuarry = true">Add Quarry</b-button></li>
                  </ul>
                  <b-modal
                    v-model="showAddQuarry"
                    has-modal-card
                    trap-focus
                    :destroy-on-hide="false"
                    aria-role="dialog"
                    aria-modal>
                    <template #default="props">
                      <QuarryAdd
                        @close="props.close"
                        @add="addQuarry"
                      />
                    </template>
                  </b-modal>
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
                    <li><b-button type="is-info" size="is-small" icon-left="map-marker-alt" @click="showAddLocation = true">Add Location</b-button></li>
                  </ul>
                  <b-modal
                    v-model="showAddLocation"
                    has-modal-card
                    trap-focus
                    :destroy-on-hide="false"
                    aria-role="dialog"
                    aria-modal>
                    <template #default="props">
                      <LocationAdd
                        @close="props.close"
                        @add="addLocation"
                      />
                    </template>
                  </b-modal>
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
                        <span class="bl-story-event" style="margin-right:.25em"></span>&nbsp;<span class="has-text-weight-bold">{{ m.consequence }}</span>
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
                        <span class="bl-story-event" style="margin-right:.25em"></span>&nbsp;<span class="has-text-weight-bold">{{ m.consequence }}</span>
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

.max-survival {
  margin-bottom: 0;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import { db, firebase } from '@/firebase'
import QuarryAdd from '@/components/quarry/add'
import LocationAdd from '@/components/location/add'
import UserAdd from '@/components/campaign/invite'

export default {
    name: 'Settlement',
    components: {
      QuarryAdd,
      LocationAdd,
      UserAdd
    },
    data() {
      return {
        showAddQuarry: false,
        showAddLocation: false,
        showAddUser: false,
        showTitleEdit: false
      }
    },
    computed: {
      ...mapGetters([
        'user',
        'innovations',
        'innovated',
        'users',
        'quarries',
        'locations'
      ]),
      
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
      },
      
      maxSurvivalBonus() {
        return this.researchedInnovations.filter(i => i.increaseLimit).length
      },
      
      departingSurvival() {
        return this.researchedInnovations.filter(i => i.departingSurvival).length
      },
      
      researchedInnovations() {
        return this.innovations.filter(i => this.innovated.find(inno => inno.id === i.id && inno.innovated))
      }
    },
    methods: {
      ...mapActions([
        'setLoading',
        'bindCampaign'
      ]),
    
      updateField(f, v) {
        let currVal = f.split('.').reduce((o,i) => o[i], this.campaign)
        if(currVal === v) return
        
        this.setLoading(true)
        
        let updatePacket = {}
        updatePacket[f] = v
        
        db.collection('campaigns').doc(this.campaign.id).update(updatePacket).then(() => this.setLoading(false))
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
      
      updateSurvival() {
        this.$buefy.dialog.prompt({
          message: `Update Max Survival`,
          trapFocus: true,
          inputAttrs: {
            type: 'number',
            value: this.campaign.survival.max
          },
          onConfirm: (val) => this.updateField('survival.max', parseInt(val))
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
      
      addQuarry(quarryId) {
        if(!quarryId || quarryId.length === 0) return
        
        this.setLoading(true)
        db.collection('campaigns').doc(this.campaign.id).update({
            quarries: firebase.firestore.FieldValue.arrayUnion(quarryId)
        }).then(() => {
          this.setLoading(false)
          this.showAddQuarry = false
        })
      },
      
      addLocation(locationId) {
        if(!locationId || locationId.length === 0) return
        
        this.setLoading(true)
        db.collection('campaigns').doc(this.campaign.id).update({
            locations: firebase.firestore.FieldValue.arrayUnion(locationId)
        }).then(() => {
          this.setLoading(false)
          this.showAddLocation = false
        })
      },
      
      addUser(userId) {
        if(!userId || userId.length === 0) return
        
        this.setLoading(true)
        db.collection('campaigns').doc(this.campaign.id).update({
            members: firebase.firestore.FieldValue.arrayUnion(userId)
        }).then(() => {
          this.setLoading(false)
          this.showAddUser = false
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
      }
    }
}
</script>