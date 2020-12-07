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
            <div class="column is-1">Endeavors</div>
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
                    <div>
                        <img class="special-icon small icon-nemesis" src="images/nemesis.png"/>
                        <span>{{ ly.quarry }}</span>
                    </div>
                    <b-checkbox size="is-small" v-model="ly.successful" type="is-info" @input="flagSuccess(ly.id, $event)">Successful Hunt</b-checkbox>
                </span>
                <span v-else-if="activeRow === ly.id">
                    <b-field>
                        <b-select placeholder="Quarry" v-model="selectingQuarry">
                            <option v-for="q in quarries" :key="q.id" :value="q.name">{{ q.name }}</option>
                        </b-select>
                        <b-select placeholder="Lv." v-model="sQLevel">
                            <option v-for="n in [1,2,3]" :key="n" :value="n">{{ n }}</option>
                        </b-select>
                        <b-button type="is-success" icon-right="plus" @click.prevent="confirmQuarry(ly.id)" />
                    </b-field>
                </span>
            </div>
            <div class="column is-1">
                <b-button rounded type="is-black" icon-right="asterisk" class="circle-icon" @click.prevent="showEndeavors(ly.id)" />
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

button.circle-icon {
    padding: 0.5em 1em;
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
            innovations: [],
            sQLevel: null
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
                quarry: this.selectingQuarry + ' Lv. ' + this.sQLevel
            }).then(() => {
                this.selectingQuarry = null
                this.sQLevel = null
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
        },
        
        showEndeavors(year) {
            let iconHtml = '<button data-v-e945440a="" type="button" class="button is-small circle-icon is-black is-rounded disabled"><span class="icon is-small"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="asterisk" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-asterisk fa-w-16 fa-1x"><path fill="currentColor" d="M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z" class=""></path></svg></span></button>'
            let currYear = this.timeline[year]
            currYear;
            let endeavorsSpent = currYear.endeavors
            
            let alertHtml = ''
            if(endeavorsSpent?.length) {
                alertHtml = endeavorsSpent.map(e => {
                    return '<p class="content">' + iconHtml + ' ' + e + '</p>'
                }).join('<hr />')
            } else {
                alertHtml = '<p>No Endeavors spent this lantern year.</p>'
            }
            
            this.$buefy.dialog.alert({
                title: 'Endeavors Spent',
                message: `${alertHtml}`,
                confirmText: 'OK'
            })
        }
    }
}
</script>