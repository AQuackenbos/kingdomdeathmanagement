<template>
    <div>
      <div class="content" v-if="!activeHunt">
        <p>There is no Hunt currently ongoing.</p>
        <p><b-button type="is-success" @click="startHunt">Start New Hunt</b-button></p>
      </div>
      <div class="columns is-multiline" v-else>
        <div class="column is-12">
          <h1 class="title">Hunt: Lantern Year {{ activeHunt.year }}</h1>
          <div class="control is-flex is-justify-content-center">
            <div class="buttons">
              <b-button type="is-info" @click.prevent="currentAction = 'add-party'">Add Party Member [ 0 / 6 ]</b-button>
              <b-button>Assign  Quarry</b-button>
              <b-button>Begin Hunt</b-button>
            </div>
          </div>
          <hr />
          <div class="columns is-multiline overview" v-if="currentAction === 'overview'">
            ...OVERVIEW...
          </div>
          <div class="columns is-multiline add-member" v-if="currentAction === 'add-party'">
            <div class="column is-2">
              <b-menu>
                <b-menu-list label="Survivors">
                  <b-menu-item 
                    v-for="s in validSurvivors" 
                    :key="s.id" 
                    @click.prevent="pickSurvivor(s)" 
                  >
                    <template #label>
                      <span v-if="s.lifetime.gender === 'M'"><b-icon size="is-small" icon="mars" /></span>
                      <span v-else-if="s.lifetime.gender === 'F'"><b-icon size="is-small" icon="venus" /></span>
                      <span v-else><b-icon size="is-small" icon="genderless" /></span>
                      {{ s.lifetime.name }}
                    </template>
                  </b-menu-item>
                </b-menu-list>
              </b-menu>
            </div>
            <div class="column is-4">
              <div class="survivor" v-if="currentSurvivor !== null">
                <b-field grouped>
                  <b-field>
                    <strong>{{ currentSurvivor.lifetime.name }}</strong>
                  </b-field>
                  <b-field label="XP" label-position="on-border" expanded>
                      <b-slider :min="0" :max="16" ticks indicator :value="currentSurvivor.lifetime.experience" disabled/>
                  </b-field>
                </b-field>
                <div class="level">
                  <b-field v-for="s in Object.keys(currentSurvivor.stats)" :key="s" :label="shortname[s]" label-position="on-border" class="level-item">
                    <b-input size="is-small" class="stat-box" :value="currentSurvivor.stats[s].base" disabled />
                  </b-field>
                </div>
              </div>
              <div v-else>
                No Survivor Selected
              </div>
            </div>
            <div class="column is-4">
              <div class="gridview" v-if="grid !== null">
                <div class="subtitle">Calculated Stats</div>
                <div class="divider">ARMOR</div>
                <div class="armor-description level">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">
                        <span class="bl-head"></span>
                      </p>
                      <p class="contet armor-block">
                        <span class="bl-armor"></span>
                        <span class="amount">{{ armors().head }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">
                        <span class="bl-arms"></span>
                      </p>
                      <p class="contet armor-block">
                        <span class="bl-armor"></span>
                        <span class="amount">{{ armors().arms }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">
                        <span class="bl-body"></span>
                      </p>
                      <p class="contet armor-block">
                        <span class="bl-armor"></span>
                        <span class="amount">{{ armors().body }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">
                        <span class="bl-waist"></span>
                      </p>
                      <p class="contet armor-block">
                        <span class="bl-armor"></span>
                        <span class="amount">{{ armors().waist }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">
                        <span class="bl-legs"></span>
                      </p>
                      <p class="contet armor-block">
                        <span class="bl-armor"></span>
                        <span class="amount">{{ armors().legs }}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="divider">BONUSES</div>
                <div class="level">
                  <b-field v-for="s in Object.keys(bonuses().stats)" :key="s" :label="shortname[s]" label-position="on-border" class="level-item">
                    <b-input size="is-small" class="stat-box" :value="bonuses().stats[s]" disabled />
                  </b-field>
                </div>
                <ul>
                  <li v-for="(t,tidx) in bonuses().text" :key="tidx" v-html="t" class="is-size-7" />
                </ul>
                <div class="divider">AFFINITIES</div>
                <span v-for="c in ['red','blue','green']" :key="c">
                  <b-icon icon="square-full" :style="{ color: c }" v-for="n in affinities()[c]" :key="n" />
                </span>
                <div class="divider">SET BONUSES</div>
                <ul>
                  <li v-for="asp in armorSetProgress().filter(a => a.progress >= a.piecesRequired)" :key="asp.id" class="is-size-7">
                    <p class="header"><strong>{{ asp.name }}</strong></p>
                    <hr style="width:75%;text-align:center;margin:.5em auto"/>
                    <div class="content">
                      <p v-for="(b,bidx) in asp.bonuses" :key="bidx">
                        <span v-if="b.type === 'armor'">
                          Add +<span class="armor-block"><span class="bl-armor"></span><span class="amount">{{ b.amount }}</span></span> to all hit locations.
                        </span>
                        <span v-else-if="b.type === 'ability'">
                          <strong>{{ b.name }}</strong>: <span v-html="parseBlock(b.description)" />
                        </span>
                        <span v-else v-html="b.description" />
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-else>
                No Grid Selected
              </div>
            </div>
            <div class="column is-2">
              <b-menu>
                <b-menu-list label="Grids">
                  <b-menu-item 
                    v-for="g in grids" 
                    :key="g.id" 
                    @click.prevent="pickGrid(g)" 
                  >
                    <template #label>
                      <div class="tile is-flex-wrap-wrap">
                        <div class="tile is-4 is-justify-content-center" v-for="(p,pidx) in g.previews" :key="pidx">
                          <div class="box preview-card">
                            <span :class="'bl-' + translate[p]"></span>
                          </div>
                        </div>
                      </div>
                      {{ g.name }}
                    </template>
                  </b-menu-item>
                </b-menu-list>
              </b-menu>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<style lang="scss" scoped>
.field.is-floating-label {
  &.level-item {
    margin-bottom: 0;
  }

  &::v-deep {
    .label {
      overflow: visible;
    }
  }
}

.stat-box {
  width: 2.5em;
  &::v-deep {
    input {
      text-align: center;
      font-weight: bold;
    }
  }
}

.preview-card {
  height: 4em;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #999;
}
</style>
<script>
import { mapGetters } from 'vuex'
import { db } from '@/firebase'
import { hunt as defaultHunt } from '@/kdm'
import GridsMixin from '@/mixins/grids'
import merge from 'deepmerge'

export default {
  name: 'HuntSetup',
  mixins: [GridsMixin],
  data: () => ({
    activeHunt: null,
    currentAction: 'overview',
    currentSurvivor: null,
    grid: null
  }),
  computed: {
    ...mapGetters([
      'grids',
      'survivors',
      'hunts'
    ]),
    
    activeHuntId() {
      return this.hunts.find(h => h.active === true)?.id
    },
    
    validSurvivors() {
      return this.survivors.filter(s => 
        s.lifetime.died === null && 
        !s.lifetime.cannot.hunt && 
        s.survival.skipHunt !== this.activeHunt?.year
      )
    }
  },
  watch: {
    activeHuntId: {
      immediate: true,
      handler(id) {
        if(id) this.$bind('activeHunt', db.collection(`campaigns/${this.currentCampaignId}/hunts`).doc(id))
      }
    }
  },
  methods: {
    startHunt() {
      this.$buefy.dialog.confirm({
        message: 'Begin the Hunt for Lantern Year ' + this.campaign.year + '?',
        onConfirm: () => {
          let hunt = merge({ year: this.campaign.year }, defaultHunt)
          db.collection(`campaigns/${this.campaign.id}/hunts`).add(hunt)
        }
      })
    },
    
    pickSurvivor(survivor) {
      this.currentSurvivor = survivor
    },
    
    pickGrid(grid) {
      this.grid = grid
    }
  }
}
</script>