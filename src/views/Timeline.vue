<template>
    <div class="column" v-if="!loading && user && campaign">
        <div class="columns">
            <div class="column is-12">
                <h1 class="title">Lantern Year {{ campaign.year }}</h1>
            </div>
        </div>
        <div class="columns header">
            <div class="column is-1">Year</div>
            <div class="column is-2">Story and Special Events</div>
            <div class="column is-2">Settlement Event</div>
            <div class="column is-2">Special Showdown</div>
            <div class="column is-2">Innovated</div>
            <div class="column is-2">Quarry</div>
            <div class="column is-1">Success</div>
        </div>
        <div class="columns timeline-row" 
            :class="{ current: ly.year === campaign.year }" 
            v-for="ly in timeline" 
            :key="ly.id" 
            style="position:relative"
            @mouseover="activeRow = ly.id"
            @focus="activeRow = ly.id"
            :ref="'year' + ly.id"
        >
            <div class="column is-1">
                <b-button v-if="campaign.year !== ly.year && activeRow === ly.id" rounded type="is-info" icon-left="calendar-check" @click.prevent="changeYear(ly.year)">{{ ly.year }}</b-button>
                <span v-else>{{ly.year}}</span>
            </div>
            <div class="column is-2">
                <div v-for="(se,idx) in ly.storyEvents" :key="idx">
                    <img class="special-icon small icon-story" src="images/story.png"/>
                    {{ se }}
                </div>
                <span v-if="activeRow === ly.id">
                    <b-button type="is-success" icon-right="plus" @click.prevent="addStoryEvent(ly.id)" />
                </span>
            </div>
            <div class="column is-2">
                <div v-for="(se,idx) in ly.settlementEvents" :key="idx">
                    <img class="special-icon small icon-settlement" src="images/settlement.png"/>
                    {{ se }}
                </div>
                <span v-if="activeRow === ly.id">
                    <b-button type="is-success" icon-right="plus" @click.prevent="addSettlementEvent(ly.id)" />
                </span>
            </div>
            <div class="column is-2">
                <div v-for="(sd,idx) in ly.showdowns" :key="idx">
                    <img class="special-icon small icon-nemesis" src="images/nemesis.png"/>
                    {{ sd.name }}
                    <span v-if="sd.level > 0">
                    - Lvl {{ sd.level }}
                    </span>
                </div>
                <span v-if="activeRow === ly.id">
                    <b-button type="is-success" icon-right="plus" @click.prevent="addShowdown(ly.id)" />
                </span>
            </div>
            <div class="column is-2">
                <div v-for="i in innovationsByYear[ly.id]" :key="i.id">
                    <b-icon icon="flask" custom-size="xs" />
                    <span v-if="i.innovation">{{ i.innovation.name }}</span>
                    <span v-else>{{ i.id }}</span>
                </div>
            </div>
            <div class="column is-2">
                <span v-if="ly.quarry">
                    <img class="special-icon small icon-nemesis" src="images/nemesis.png"/>
                    {{ ly.quarry }}
                </span>
                <span v-else-if="activeRow === ly.id">
                    <b-field>
                        <b-select placeholder="Quarry" v-model="selectingQuarry">
                            <option v-for="q in quarries" :key="q.id" :value="q.name">{{ q.name }}</option>
                        </b-select>
                        <b-button type="is-success" icon-right="plus" @click.prevent="confirmQuarry(ly.id)" />
                    </b-field>
                </span>
            </div>
            <div class="column is-1">
                <b-checkbox v-model="ly.successful" type="is-info" @input="flagSuccess(ly.id, $event)"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header .is-2,
.header .is-3,
.timeline-row .is-2, 
.timeline-row .is-3 {
  text-align: left
}

.header {
  font-weight: bold
}

.header, .timeline-row {
    border-bottom: 1px solid #dbdbdb;
    min-height: 4em;
}

.timeline-row:hover {
    box-shadow: inset 0 0 2px #7957d5, inset 0 0 2px #7957d5, inset 0 0 2px #7957d5
}

.timeline-row:nth-child(even) {
    background: #f3f3f3;
}

.timeline-row.current {
    border: 1px solid black
}

.special-icon {
    display: inline-block;
    vertical-align: top;
}

.special-icon.small {
    width: 20px;
    height: 20px;
}
</style>

<script>
import { mapGetters } from 'vuex'
import { firebase, db } from '@/firebase'

export default {
    name: 'Timeline',
    data() {
        return {
            campaign: null,
            timeline: [],
            allQuarries: [],
            activeRow: null,
            loadingComponents: {},
            selectingQuarry: null,
            innovations: []
        }
    },
    computed: {
        ...mapGetters({
            loading: 'loading',
            user: 'user',
            currentCampaign: 'currentCampaign'
        }),
        
        quarries() {
            return this.allQuarries.filter(q => {
                return this.campaign.quarries.includes(q.id)
            })
        },
        
        innovationsByYear() {
            if(!this.innovations) return []
        
            let years = this.innovations.map(i => i.year).filter((v,i,s) => s.indexOf(v) === i && v !== null)
            let innos = {}
            years.forEach(y => {
                if(!(y in innos)) innos[y.toString()] = []
                this.innovations.filter(i => i.year === y).forEach(i => {
                    i.innovation = this.allInnovations.find(inno => i.id === inno.id)
                    innos[y.toString()].push(i)
                })
            })
            
            return innos
        }
    },
    created() {
        this.$bind('campaign', db.collection('campaigns').doc(this.currentCampaign))
        this.$bind('timeline', db.collection(`campaigns/${this.currentCampaign}/timeline`).orderBy('year', 'asc'))
        this.$bind('allInnovations', db.collection('innovations'))
        this.$bind('allQuarries', db.collection('quarries'))
        this.$bind('innovations', db.collection(`campaigns/${this.currentCampaign}/innovations`))
    },
    methods: {    
        setYearLoading(year, loading) {
            if(!this.loadingComponents[year] && loading) {
                this.loadingComponents[year] = this.$buefy.loading.open({
                    container: this.$refs['year'+year][0]
                })
                return
            }
            
            if(!loading) {
                this.loadingComponents[year].close()
                delete this.loadingComponents[year]
            }
        },
        
        addStoryEvent(year) {
            this.$buefy.dialog.prompt({
                message: 'Add Story Event to Lantern Year '+year+':',
                inputAttrs: {
                    required: true
                },
                trapFocus: true,
                onConfirm: (ev) => {
                    this.setYearLoading(year, true)
                    db.collection(`campaigns/${this.currentCampaign}/timeline`).doc(year.toString()).update({
                        storyEvents: firebase.firestore.FieldValue.arrayUnion(ev)
                    }).then(() => {
                        this.setYearLoading(year, false)
                    })
                }
            })
        },
        
        addSettlementEvent(year) {
            this.$buefy.dialog.prompt({
                message: 'Add Settlement Event to Lantern Year '+year+':',
                inputAttrs: {
                    required: true
                },
                trapFocus: true,
                onConfirm: (ev) => {
                    this.setYearLoading(year, true)
                    db.collection(`campaigns/${this.currentCampaign}/timeline`).doc(year.toString()).update({
                        settlementEvents: firebase.firestore.FieldValue.arrayUnion(ev)
                    }).then(() => {
                        this.setYearLoading(year, false)
                    })
                }
            })
        },
        
        addShowdown(year) {
            this.$buefy.dialog.prompt({
                message: 'Add Showdown to Lantern Year '+year+': <p class="is-size-7">You can include a level separated by a colon (":").</p>',
                inputAttrs: {
                    required: true
                },
                trapFocus: true,
                onConfirm: (sd) => {
                    this.setYearLoading(year, true)
                    let [name, level] = sd.trim().split(':')
                    if(!level) level = 0
                    
                    db.collection(`campaigns/${this.currentCampaign}/timeline`).doc(year.toString()).update({
                        showdowns: firebase.firestore.FieldValue.arrayUnion({
                            name: name,
                            level: level
                        })
                    }).then(() => {
                        this.setYearLoading(year, false)
                    })
                }
            })
        },
        
        confirmQuarry(year) {
            this.setYearLoading(year, true)
            db.collection(`campaigns/${this.currentCampaign}/timeline`).doc(year.toString()).update({
                quarry: this.selectingQuarry
            }).then(() => {
                this.selectingQuarry = null
                this.setYearLoading(year, false)
            })
        },
        
        flagSuccess(year, ref) {
            this.setYearLoading(year, true)
            db.collection(`campaigns/${this.currentCampaign}/timeline`).doc(year.toString()).update({
                successful: ref
            }).then(() => {
                this.setYearLoading(year, false)
            })
        },
        
        changeYear(year) {
            this.$buefy.dialog.confirm({
                message: 'Change to Lantern Year '+year+'?',
                onConfirm: () => {
                    db.collection('campaigns').doc(this.currentCampaign).update({
                        year: year
                    })
                }
            })
        }
    }
}
</script>