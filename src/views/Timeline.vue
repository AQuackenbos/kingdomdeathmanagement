<template>
  <div class="column" v-if="!showLoading && user && campaign">
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
          <span class="bl-story-event" />&nbsp;
          {{ se }}
        </div>
        <span v-if="activeRow === ly.id">
          <b-button type="is-success" icon-right="plus" @click.prevent="addStoryEvent(ly.id)" />
        </span>
      </div>
      <div class="column is-2">
        <div v-for="(se,idx) in ly.settlementEvents" :key="idx">
          <span class="bl-settlement-event" />&nbsp;
          {{ se }}
        </div>
        <span v-if="activeRow === ly.id">
          <b-button type="is-success" icon-right="plus" @click.prevent="addSettlementEvent(ly.id)" />
        </span>
      </div>
      <div class="column is-2">
        <div v-for="(sd,idx) in ly.showdowns" :key="idx">
            <span class="bl-nemesis-event" />&nbsp;
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
        <div v-for="i in innovatedByYear[ly.id]" :key="i.id">
          <b-icon icon="flask" custom-size="xs" />
          <span v-if="i.innovation">{{ i.innovation.name }}</span>
          <span v-else>{{ i.id }}</span>
        </div>
      </div>
      <div class="column is-2">
        <span v-if="ly.quarry">
          <div>
            <span class="bl-nemesis-event" />&nbsp;
            <span>{{ ly.quarry }}</span>
          </div>
          <b-checkbox size="is-small" v-model="ly.successful" type="is-info" @input="flagSuccess(ly.id, $event)">Successful Hunt</b-checkbox>
        </span>
        <span v-else-if="activeRow === ly.id">
          <b-field>
            <b-select placeholder="Quarry" v-model="selectingQuarry">
              <option v-for="q in campaignQuarries" :key="q.id" :value="q.name">{{ q.name }}</option>
            </b-select>
            <b-select placeholder="Lv." v-model="sQLevel">
              <option v-for="n in [1,2,3]" :key="n" :value="n">{{ n }}</option>
            </b-select>
            <b-button type="is-success" icon-right="plus" @click.prevent="confirmQuarry(ly.id)" />
          </b-field>
        </span>
      </div>
      <div class="column is-1">
        <a @click.prevent="showEndeavors(ly.id)" class="bl-endeavor is-size-2" style="color:black" />
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

</style>

<script>
import { mapGetters } from 'vuex'
import { firebase, db } from '@/firebase'

export default {
  name: 'Timeline',
  data() {
    return {
      activeRow: null,
      loadingComponents: {},
      selectingQuarry: null,
      sQLevel: null
    }
  },
  created() {
    document.title = 'KDM | Timeline'
  },
  computed: {
    ...mapGetters([
      'innovated',
      'quarries',
      'timeline',
      'innovations'
    ]),
    
    campaignQuarries() {
      return this.quarries.filter(q => {
        return this.campaign.quarries.includes(q.id)
      })
    },
    
    innovatedByYear() {
      if(!this.innovated) return []
    
      let years = this.innovated.map(i => i.year).filter((v,i,s) => s.indexOf(v) === i && v !== null)
      let innos = {}
      years.forEach(y => {
        if(!(y in innos)) innos[y.toString()] = []
        this.innovated.filter(i => i.year === y).forEach(i => {
          i.innovation = this.innovations.find(inno => i.id === inno.id)
          innos[y.toString()].push(i)
        })
      })
      
      return innos
    }
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
          db.collection(`campaigns/${this.campaign.id}/timeline`).doc(year.toString()).update({
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
          db.collection(`campaigns/${this.campaign.id}/timeline`).doc(year.toString()).update({
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
          
          db.collection(`campaigns/${this.campaign.id}/timeline`).doc(year.toString()).update({
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
      db.collection(`campaigns/${this.campaign.id}/timeline`).doc(year.toString()).update({
        quarry: this.selectingQuarry + ' Lv. ' + this.sQLevel
      }).then(() => {
        this.selectingQuarry = null
        this.sQLevel = null
        this.setYearLoading(year, false)
      })
    },
    
    flagSuccess(year, ref) {
      this.setYearLoading(year, true)
      db.collection(`campaigns/${this.campaign.id}/timeline`).doc(year.toString()).update({
        successful: ref
      }).then(() => {
        this.setYearLoading(year, false)
      })
    },
    
    changeYear(year) {
      this.$buefy.dialog.confirm({
        message: 'Change to Lantern Year '+year+'?',
        onConfirm: () => {
          db.collection('campaigns').doc(this.campaign.id).update({
            year: year
          })
        }
      })
    },
    
    showEndeavors(year) {
      let iconHtml = '<span class="bl-endeavor"></span>'
      let currYear = this.timeline[year]
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