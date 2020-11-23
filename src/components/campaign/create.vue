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
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { db, firebase } from '@/firebase'
import * as kdm from '@/kdm'

export default {
    name: 'CampaignCreate',
    computed: {
        ...mapGetters({
            user: 'user',
            loading: 'loading'
        })
    },
    methods: {
        ...mapActions([
            'setLoading',
            'setCurrentCampaign'
        ]),
    
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
            this.setLoading(true)
            
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
                survival: 1,
                survivalMax: 1,
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
                principles: [
                    {
                        name: "New Life",
                        choices: ["Protect the Young", "Survival of the Fittest"],
                        selected: null
                    },
                    {
                        name: "Death",
                        choices: ["Cannibalize", "Graves"],
                        selected: null
                    },
                    {
                        name: "Society",
                        choices: ["Collective Toil", "Accept Darkness"],
                        selected: null
                    },
                    {
                        name: "Conviction",
                        choices: ["Barbaric", "Romantic"],
                        selected: null
                    }
                ]
            }
            
            let campaignRef = db.collection('campaigns').doc()
            campaignRef.set(campaign)
            await this.populateCampaign(campaignRef)
            
            this.setLoading(false)
            this.setCurrentCampaign(campaignRef)
            this.$router.push('Settlement')
        },
        
        async populateCampaign(campaign) {
            let timelinePushes = []
            let emptyTimelineSlot = {
                reached: false,
                storyEvents: [],
                settlementEvents: [],
                showdowns: [],
                innovated: false,
                quarry: null,
                successful: false,
            }
            
            for(let year = 0; year < 40; year++) {
                console.log('Queueing timeline push: '+year.toString().padStart(2,'0'))
                timelinePushes.push(campaign.collection('timeline').doc(year.toString().padStart(2,'0')).set(emptyTimelineSlot));
            }
            
            console.log('Pushing all years')
            await Promise.all(timelinePushes)
            
            kdm.quarries.forEach(q => {
                console.log('Adding Quarry: '+q)
                campaign.update({
                    quarries: firebase.firestore.FieldValue.arrayUnion(q)
                })
            })
            
            kdm.locations.forEach(l => {
                console.log('Adding location: '+l)
                campaign.update({
                    locations: firebase.firestore.FieldValue.arrayUnion(l)
                })
            })
            
            kdm.events.forEach(e => {
                console.log('Adding event: '+e.name)
                campaign.collection('timeline').doc(e.year.toString().padStart(2,'0')).update({
                    storyEvents: firebase.firestore.FieldValue.arrayUnion(e.name)
                })
            })
            
            kdm.showdowns.forEach(s => {
                console.log('Adding Showdown: '+s.name+s.level)
                campaign.collection('timeline').doc(s.year.toString().padStart(2,'0')).update({
                    showdowns: firebase.firestore.FieldValue.arrayUnion({ name: s.name, level: s.level })
                })
            })
            
            kdm.innovations.forEach(i => {
                console.log('Adding innovation to deck: '+i.reference)
                campaign.collection('innovations').doc(i.reference).set({
                    innovation: db.collection('innovations').doc(i.reference),
                    deck: i.deck,
                    innovated: i.innovated
                })
            })
        }
    }
}
</script>