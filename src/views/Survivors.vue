<template>
  <div class="column" v-if="!showLoading && user && campaign">
    <div class="columns">
      <div class="column is-one-quarter survivor-list">
        <b-field grouped>
          <b-field>
            <b-switch v-model="hideDead" type="is-info">Hide Dead</b-switch>
          </b-field>
          <b-field>
            <b-switch v-model="showBonuses" type="is-info">Show Bonuses</b-switch>
          </b-field>
        </b-field>
        <b-menu>
          <b-menu-list label="Survivors">
            <b-menu-item 
              :class="{ 'is-primary': !dead(s), 'is-danger': dead(s), 'is-warning': s.lifetime.retired !== false}" 
              v-for="s in shownSurvivors" 
              :key="s.id" 
              @click.prevent="gotoSurvivor(s.id)" 
              :active="$route.params !== null && s.id === $route.params.id"
            >
              <template #label>
                <span v-if="s.lifetime.gender === 'M'"><b-icon size="is-small" icon="mars" /></span>
                <span v-else-if="s.lifetime.gender === 'F'"><b-icon size="is-small" icon="venus" /></span>
                <span v-else><b-icon size="is-small" icon="genderless" /></span>
                {{ s.lifetime.name }}
              </template>
            </b-menu-item>
          </b-menu-list>
          <b-menu-list label="">
            <b-menu-item>
              <template #label>
                <b-button type="is-info is-light" icon-left="user-plus" @click.prevent="addSurvivor" expanded>New Survivor</b-button>
              </template>
            </b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
      <transition appear name="slide" mode="out-in">
        <router-view :showBonuses="showBonuses" ref="survivorPanel" :key="$route.path"></router-view>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.survivor-list {
  text-align: left;
}
.menu-list a.is-active {
  /** background-color: #; **/
}

.menu-list {
  li {
    &.is-primary {
      background-color: #ebf7eb;
    }
    
    &.is-danger {
      background-color: #ffd5d5;
    }
    
    &::v-deep {
      a.is-active {
        background-color: #6c96d6;
      }
    }
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/firebase'
import { survivor as defaultSurvivor } from '@/kdm'

export default {
  name: 'Survivors',
  data: () => ({
    currentSurvivor: null,
    hideDead: false,
    showBonuses: false
  }),
  computed: {
    ...mapGetters([
      'survivors'
    ]),
    
    shownSurvivors() {
      return this.survivors.filter(s => {
        if(!this.hideDead) return true
        if(s.lifetime.died === null || s.lifetime.died === '') return true
        return false
      }).sort((a,b) => {
        if((a.lifetime.died === null || a.lifetime.died === '') && (b.lifetime.died !== null && b.lifetime.died !== ''))
          return -1
        if((b.lifetime.died === null || b.lifetime.died === '') && (a.lifetime.died !== null && a.lifetime.died !== ''))
          return 1
          
        let aName = a.lifetime.name?.toUpperCase()
        let bName = b.lifetime.name?.toUpperCase()
        
        if(aName > bName)
          return 1
        if(bName > aName)
          return -1
          
        return 0
      })
    },
  },
  methods: {
    gotoSurvivor(id) {
      if(this.$route.params.id === id) return
      this.$router.push(`/survivors/${id}`)
    },
    
    addSurvivor() {
      this.setLoading(true)
      let emptySurvivor = defaultSurvivor
      let survivorRef = db.collection(`campaigns/${this.campaign.id}/survivors`).doc()
      survivorRef.set(emptySurvivor).then(() => this.$router.push(`/survivors/${survivorRef.id}`))
      this.setLoading(false)
    },
    
    dead(survivor) {
      return (
        survivor.lifetime.died !== null &&
        survivor.lifetime.died !== ''
      )
    }
  }
}
</script>