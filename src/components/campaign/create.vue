<template>
    <div class="buttons is-centered">
        <b-button 
            size="is-large"
            icon-left="plus-circle"
            rounded
            type="is-primary is-light"
            @click.prevent="getSettlementName"
        >
            Create New Campaign
        </b-button>
        <b-loading :is-full-page="true" v-model="showProgress" :can-cancel="false">
            <b-progress :value="createProgressPercent" size="is-large" show-value>
                Creating Campaign: {{ createProgressPercent }}% {{ progressLabel }}
            </b-progress>
        </b-loading>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { db, firebase } from '@/firebase'
import * as kdm from '@/kdm'

export default {
    name: 'CampaignCreate',
    data() {
        return {
            createProgressPercent: 0,
            createProgressItems: 0,
            createProgressDone: 0,
            showProgress: false,
            progressLabel: ''
        }
    },
    computed: {
        ...mapGetters({
            user: 'user'
        })
    },
    methods: {
        ...mapActions([
            'setLoading',
            'setCurrentCampaign'
        ]),
        updateProgress(label) {
            this.createProgressDone++
            this.progressLabel = label
            this.createProgressPercent = Math.round( this.createProgressDone / this.createProgressItems )
        },
    
        getSettlementName() {
            this.$buefy.dialog.prompt({
                message: 'Name your Settlement:',
                inputAttrs: {
                    placeholder: 'Settlement Name'
                },
                trapFocus: true,
                onConfirm: (v) => this.createCampaign(v)
            })
        },
        
        async createCampaign(settlementName) {
            this.createProgressPercent = 0
            this.createProgressDone = 0
            this.createProgressItems = (42 + kdm.quarries.length + kdm.locations.length + kdm.events.length + kdm.showdowns.length + kdm.innovations.length);
            
            this.showProgress = true
            
            let campaign = {
                name: settlementName,
                //Key data
                expansions: [],
                members: [ this.user.uid ],
                //Some toggles
                active: true,
                //Additionals
                ended: false,
                ending: {
                    year: null,
                    details: null
                },
                //Empty Ref Arrays
                quarries: [],
                locations: [],
                //Tracking data
                year: 0,
                survival: {
                    departing: 0,
                    max: 1
                },
                bonuses: {
                    departing: '',
                    arriving: '',
                    other: ''
                },
                milestones: [
                    {
                        trigger: "First child is born",
                        consequence: "Principle: New Life"
                    },
                    {
                        trigger: "First time death count is updated",
                        consequence: "Principle: Death"
                    },
                    {
                        trigger: "Settlement has 5 innovations",
                        consequence: "Hooded Knight"
                    },
                    {
                        trigger: "Population reaches 15",
                        consequence: "Principle: Society"
                    },
                    {
                        trigger: "Population reaches 0",
                        consequence: "Game Over"
                    }
                ],
                principles: {
                    "new_life": {
                        name: "New Life",
                        choices: ["Protect the Young", "Survival of the Fittest"],
                        selected: null
                    },
                    "death": {
                        name: "Death",
                        choices: ["Cannibalize", "Graves"],
                        selected: null
                    },
                    "society": {
                        name: "Society",
                        choices: ["Collective Toil", "Accept Darkness"],
                        selected: null
                    },
                    "conviction": {
                        name: "Conviction",
                        choices: ["Barbaric", "Romantic"],
                        selected: null
                    }
                }
            }
            
            let campaignRef = db.collection('campaigns').doc()
            campaignRef.set(campaign).then(() => this.updateProgress('Creating core campaign data'))
            await this.populateCampaign(campaignRef)
            
            this.showProgress = false
            this.setCurrentCampaign(campaignRef.id)
            this.$router.push({ name: 'Settlement' })
        },
        
        async populateCampaign(campaign) {
            let timelinePushes = []
            let emptyTimelineSlot = {
                reached: false,
                storyEvents: [],
                settlementEvents: [],
                showdowns: [],
                innovation: '',
                quarry: null,
                successful: false,
            }
            
            for(let year = 0; year < 40; year++) {
                console.log('Queueing timeline push: '+year.toString())
                let tlSlot = Object.assign({ year: year }, emptyTimelineSlot)
                timelinePushes.push(
                    campaign.collection('timeline').doc(year.toString()).set(tlSlot)
                        .then(() => this.updateProgress('Instantiating timeline'))
                );
            }
            
            console.log('Pushing all years')
            await Promise.all(timelinePushes)
            
            campaign.collection('timeline').doc('0').update({
                quarry: 'White Lion (Prologue)'
            })
            
            campaign.collection('timeline').doc('1').update({
                settlementEvents: firebase.firestore.FieldValue.arrayUnion('First Story')
            })
            
            kdm.quarries.forEach(q => {
                console.log('Adding Quarry: '+q)
                campaign.update({
                    quarries: firebase.firestore.FieldValue.arrayUnion(q)
                }).then(() => this.updateProgress('Adding quarries'))
            })
            
            kdm.locations.forEach(l => {
                console.log('Adding location: '+l)
                campaign.update({
                    locations: firebase.firestore.FieldValue.arrayUnion(l)
                }).then(() => this.updateProgress('Adding locations'))
            })
            
            kdm.events.forEach(e => {
                console.log('Adding event: '+e.name)
                campaign.collection('timeline').doc(e.year.toString()).update({
                    storyEvents: firebase.firestore.FieldValue.arrayUnion(e.name)
                }).then(() => this.updateProgress('Adding default events'))
            })
            
            kdm.showdowns.forEach(s => {
                console.log('Adding Showdown: '+s.name+s.level)
                campaign.collection('timeline').doc(s.year.toString()).update({
                    showdowns: firebase.firestore.FieldValue.arrayUnion({ name: s.name, level: s.level })
                }).then(() => this.updateProgress('Adding default showdowns'))
            })
            
            kdm.innovations.forEach(i => {
                console.log('Adding innovation to deck: '+i.reference)
                campaign.collection('innovations').doc(i.reference).set({
                    innovation: db.collection('innovations').doc(i.reference),
                    deck: i.deck,
                    innovated: i.innovated
                }).then(() => this.updateProgress('Building innovation deck'))
            })
        }
    }
}
</script>