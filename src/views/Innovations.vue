<template>
  <div class="column is-12" v-if="!showLoading && user && campaign">
  <div class="columns is-multiline">
  <div class="column is-12">
    <h1 class="title">
    Innovations Researched
    <b-field label="Sort by" label-position="on-border" class="is-pulled-right" style="margin-top:.25em">
      <b-select icon="sort" v-model="sortBy">
        <option value="year">Lantern Year Innovated</option>
        <option value="name">Innovation Name</option>
      </b-select>
    </b-field>
    </h1>
  </div>
  <div class="column is-12" v-if="researched.length === 0">
    Your settlement has not gained any innovations yet.
  </div>
  <div class="column is-3" v-for="i in researched" :key="i.id">
    <article class="panel innovation" v-if="i.innovation" :class="category[i.innovation.category]" :id="i.id">
    <div class="panel-heading">
      <b-tooltip label="Lantern Year Innovated" position="is-top" type="is-dark" class="is-pulled-left">
      <b-button rounded type="is-dark" size="is-small" class="is-pulled-left">
        <strong>{{ i.year }}</strong>
      </b-button>
      </b-tooltip>
      <b-tooltip :label="capitalize(i.innovation.category)" type="is-dark" position="is-top">
      <b-icon :icon="icon[i.innovation.category]" size="is-small" />
      </b-tooltip>
      <span style="margin-left:.5em" class="is-size-6">{{ i.innovation.name }}</span>
      <b-dropdown aria-role="list" position="is-bottom-left" class="is-pulled-right">
      <b-button slot="trigger" :type="category[i.innovation.category]"><b-icon icon="ellipsis-h" /></b-button>
      <b-dropdown-item aria-role="listItem" @click="returnToDeck(i)"><b-icon icon="trash-alt" size="is-small" type="is-danger" />Return to Deck</b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="panel-block">
      <InnovationDesc
      :innovation="i.innovation"
      />
    </div>
    <div class="panel-block" v-if="i.innovation.consequences">
      <p>Added <strong>{{ i.innovation.consequences.length }}</strong> innovations to the deck.</p>
    </div>
    </article>
    <article v-else>WARNING: No Innovation Found for {{ i.id }}</article>
  </div>
  <div class="column is-12">
    <hr />
  </div>
  <div class="column is-12" v-if="!showDeck">
    <b-button @click.prevent="showDeck = true" type="is-info" expanded>Show Innovation Deck</b-button>
  </div>
  <div class="column is-12" v-else>
    <div class="columns is-multiline">
    <div class="column is-12" v-if="showDeck">
      <h1 class="title">In Deck</h1>
    </div>
    <div class="column is-3" v-for="i in deck" :key="i.id">
      <article class="panel" :class="category[i.innovation.category]">
      <div class="panel-heading">
      <b-tooltip :label="capitalize(i.innovation.category)" type="is-dark" position="is-top">
      <b-icon :icon="icon[i.innovation.category]" size="is-small" />
      </b-tooltip>
        <span class="is-size-6">{{ i.innovation.name }}</span>
        <b-dropdown aria-role="list" position="is-bottom-left" class="is-pulled-right">
        <b-button slot="trigger" :type="category[i.innovation.category]"><b-icon icon="ellipsis-h" /></b-button>
        <b-dropdown-item aria-role="listItem" @click="researchInnovation(i)"><b-icon icon="plus-square" size="is-small" type="is-success" />Research</b-dropdown-item>
        <b-dropdown-item aria-role="listItem" @click="removeFromDeck(i)"><b-icon icon="trash-alt" size="is-small" type="is-danger" />Remove</b-dropdown-item>
        </b-dropdown>
      </div>
      </article>
    </div>
    <div class="column is-12">
      <b-button @click="promptAdd" type="is-warning" icon-left="exclamation-circle">Add Any Innovation To Deck</b-button>
      <b-modal
        v-model="showAddInnovation"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal>
        <template #default="props">
        <InnovationAdd 
          :innovations="innovations"
          :campaign="campaign"
          @close="props.close"
          @add="addToDeck"
        />
        </template>
      </b-modal>
    </div>
    </div>
  </div>
  </div>
  </div>
</template>

<style lang="scss">
div.dropdown-trigger {
  margin-top: -.25em
}

span.b-tooltip.is-pulled-left {
  margin-top: -.4em
}

</style>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/firebase'
import InnovationAdd from '@/components/innovation/add'
import InnovationDesc from '@/components/innovation/description'

export default {
  name: 'Innovations',
  data: () => ({
    showDeck: false,
    showAddInnovation: false,
    sortBy: 'year'
  }),
  components: {
    InnovationAdd,
    InnovationDesc
  },
  computed: {
    ...mapGetters([
      'innovations',
      'innovated'
    ]),
    
    category() {
      return {
      'starting': 'is-black',
      'science': 'is-info',
      'home': 'is-danger',
      'education': 'is-success',
      'faith': 'is-light',
      'art': 'is-warning',
      'music': 'is-primary',
      'other': 'is-white'
      }
    },
    
    icon() {
      return {
      'starting': 'seedling',
      'science': 'flask',
      'home': 'home',
      'education': 'book-open',
      'faith': 'cross',
      'art': 'theater-masks',
      'music': 'music',
      'other': 'star'
      }
    },
    
    
    researched() {
     return this.innovated.filter(i => i.innovated)
      .map(i => {
        i.innovation = this.innovations.find(a => a.id === i.id)
        return i
      })
      .sort((a,b) => {
        if(a[this.sortBy] > b[this.sortBy])
          return 1
        if(b[this.sortBy] > a[this.sortBy])
          return -1
        return 0
      })
    },
    
    deck() {
     return this.innovated.filter(i => i.deck)
      .map(i => {
        i.innovation = this.innovations.find(a => a.id === i.id)
        return i
      })
    }
  },
  methods: {
    innovatedThisYear() {
      return this.innovated.filter(ci => ci.year === this.campaign.year).length > 0
    },
    
    returnToDeck(i) {
      this.$buefy.dialog.confirm({
        message: "Are you sure?  This is a relatively rare event.  <br /><em>This will NOT remove any consequences of this Innovation from the deck.</em>",
        trapFocus: true,
        closeOnConfirm: true,
        onConfirm: () => {
          this.setLoading(true)
          db.collection(`campaigns/${this.campaign.id}/innovations`).doc(i.id).update({
            deck: true,
            innovated: false,
            year: null
          }).then(() => this.setLoading(false))
        }
      })
    },
    
    
    removeFromDeck(i) {
      this.$buefy.dialog.confirm({
        message: "Are you sure?  Removing Innovations from the deck is very rare.",
        trapFocus: true,
        closeOnConfirm: true,
        onConfirm: () => {
          this.setLoading(true)
          db.collection(`campaigns/${this.campaign.id}/innovations`).doc(i.id).delete().then(() => this.setLoading(false))
        }
      })
    },
    
    addToDeck(id) {
      this.showAddInnovation = false
      db.collection(`campaigns/${this.campaign.id}/innovations`).doc(id).set({
        deck: true,
        innovated: false,
        year: null
      }).then(() => this.$buefy.toast.open({ message: `Added card to Innovation deck.` }))
    },
    
    promptAdd() {
      this.$buefy.dialog.confirm({
        message: 'This is pretty rare.  Are you sure?',
        trapFocus: true,
        closeOnConfirm: true,
        onConfirm: () => {
          this.showAddInnovation = true
        }
      })
    },
    
    researchInnovation(i) {
      let innovation = this.innovations.find(inno => i.id === inno.id)
      let confirmMsg = `Research <strong>${innovation.name}</strong>?`
      if(this.innovatedThisYear()) {
        confirmMsg = `Research <strong>${innovation.name}</strong>? <br /><em>You have already Innovated this year.  Make sure this is on purpose.</em>`
      }
      
      this.$buefy.dialog.confirm({
        message: confirmMsg,
        trapFocus: true,
        closeOnConfirm: true,
        onConfirm: () => {
          this.setLoading(true)
          db.collection(`campaigns/${this.campaign.id}/innovations`).doc(i.id).update({
            deck: false,
            innovated: true,
            year: this.campaign.year
          }).then(() => this.setLoading(false))
          
          if(innovation.consequences?.length) {
            innovation.consequences.forEach(c => {
              this.addToDeck(c)
            })
          }
          return
        }
      })
    }
  }
}
</script>