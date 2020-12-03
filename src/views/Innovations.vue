<template>
    <div class="column is-12" v-if="!loading && user && campaign">
      <div class="columns is-multiline">
        <div class="column is-12">
          <h1 class="title">Innovations Researched</h1>
        </div>
        <div class="column is-3" v-for="i in researched" :key="i.id">
          <article class="panel" :class="category[i.innovation.category]">
            <p class="panel-heading">
              {{ i.innovation.name }}
            </p>
            <div class="panel-block">
              Innovated in &nbsp; <span class="has-text-weight-bold">Lantern Year {{ i.year }}</span>
            </div>
            <div class="panel-block">
              (Desc)
            </div>
            <div class="panel-block">
              <p>Adds <strong>{{ i.innovation.consequences.length }}</strong> innovations to the deck.</p>
            </div>
          </article>
        </div>
        <div class="column is-12">
          <h1 class="title">In Deck</h1>
        </div>
        <div class="column is-3" v-for="i in deck" :key="i.id">
          <article class="panel" :class="category[i.innovation.category]">
            <p class="panel-heading">
              {{ i.innovation.name }}
            </p>
            <div class="panel-block">
              (Desc)
            </div>
            <div class="panel-block">
              <p>Adds <strong>{{ i.innovation.consequences.length }}</strong> innovations to the deck.</p>
            </div>
          </article>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/firebase'

export default {
    name: 'Innovations',
    data() {
        return {
            campaign: null,
            innovations: [],
            campaignInnovations: []
        }
    },
    computed: {
        ...mapGetters({
            loading: 'loading',
            user: 'user',
            currentCampaign: 'currentCampaign'
        }),
        
        category() {
          return {
            'starting': 'is-black',
            'science': 'is-link',
            'home': 'is-danger',
            'education': 'is-success',
            'faith': 'is-light',
            'art': 'is-warning',
            'music': 'is-primary',
            'other': 'is-info'
          }
        },
        
        researched() {
         return this.campaignInnovations.filter(i => i.innovated)
          .map(i => {
            i.innovation = this.innovations.find(a => a.id === i.id)
            return i
          })
        },
        
        deck() {
         return this.campaignInnovations.filter(i => i.deck)
          .map(i => {
            i.innovation = this.innovations.find(a => a.id === i.id)
            return i
          })
        }
    },
    created() {
        this.$bind('campaign', db.collection('campaigns').doc(this.currentCampaign))
        this.$bind('campaignInnovations', db.collection(`campaigns/${this.currentCampaign}/innovations`))
        this.$bind('innovations', db.collection('innovations'))
    },
    methods: {
      
    }
}
</script>