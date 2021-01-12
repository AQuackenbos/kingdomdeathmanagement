<template>
    <div>
      <div class="columns is-multiline">
        <div class="column is-12">
          <h1 class="title">Gear Up Survivor</h1>
          <p class="is-size-6">Test</p>
          <hr />
          <section class="section">
            <div class="columns is-multiline add-member">
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
                  <b-field>
                    <span class="tag is-danger is-light" v-if="currentSurvivor.lifetime.cannot.survival">Cannot Spend Survival</span>
                    <span class="tag is-danger is-light" v-if="currentSurvivor.lifetime.cannot.fightingArts">Cannot Use Fighting Arts</span>
                    <span class="tag is-danger is-light" v-if="currentSurvivor.lifetime.reroll.used">Lifetime Reroll Used</span>
                    <span class="tag is-success is-light" v-else-if="currentSurvivor.lifetime.reroll.available">Lifetime Reroll Available</span>
                  </b-field>
                  <b-field grouped>
                    <b-field class="is-flex is-align-items-center" expanded>
                      <strong>{{ currentSurvivor.lifetime.name }}</strong>
                    </b-field>
                    <b-field>
                      <b-select icon="transgender" :value="currentSurvivor.lifetime.gender" size="is-small" disabled>
                        <option value="M">M</option>
                        <option value="F">F</option>
                      </b-select>
                    </b-field>
                    <b-field label="SRV" label-position="on-border">
                      <b-input size="is-small" class="stat-box" :value="currentSurvivor.survival.amount" disabled />
                    </b-field>
                  </b-field>
                  <b-field label="XP" label-position="on-border" expanded>
                    <b-slider :min="0" :max="16" ticks indicator :value="currentSurvivor.lifetime.experience" disabled/>
                  </b-field>
                  <div class="level">
                    <b-field v-for="s in ['movement','accuracy','strength','evasion','luck','speed']" :key="s" :label="shortname[s]" label-position="on-border" class="level-item">
                      <b-input size="is-small" class="stat-box" :value="currentSurvivor.stats[s].base" disabled />
                    </b-field>
                  </div>
                  <b-field grouped v-if="currentSurvivor.weapon.selected">
                    <b-field label="Weapon Proficiency" label-position="on-border" class="is-flex is-align-items-center">
                      <strong>{{ currentSurvivor.weapon.selected }}</strong>
                    </b-field>
                    <b-field expanded>
                      <b-slider :min="0" :max="8" ticks indicator :value="currentSurvivor.weapon.proficiency" disabled/>
                    </b-field>
                  </b-field>
                  <b-field grouped>
                    <b-field label="Courage" label-position="on-border" expanded>
                      <b-slider :min="0" :max="9" ticks indicator :value="currentSurvivor.mentality.courage.level" disabled/>
                    </b-field>
                    <b-field label="Understanding" label-position="on-border" expanded>
                      <b-slider :min="0" :max="9" ticks indicator :value="currentSurvivor.mentality.understanding.level" disabled/>
                    </b-field>
                  </b-field>
                  <b-field grouped>
                    <b-field expanded>
                      <div v-for="a in ['matchmaker','prepared','stalwart']" :key="a">
                        <span v-if="currentSurvivor.mentality.courage.abilities[a].granted" class="is-size-7"><b-icon size="is-small" icon="check" class="mr-1" />{{ capitalize(a) }}</span>
                      </div>
                    </b-field>
                    <div class="divider is-vertical"></div>
                    <b-field expanded>
                      <div v-for="a in ['analyze','explore','tinker']" :key="a">
                        <span v-if="currentSurvivor.mentality.understanding.abilities[a].granted" class="is-size-7"><b-icon size="is-small" icon="check" class="mr-1" />{{ capitalize(a) }}</span>
                      </div>
                    </b-field>
                  </b-field>
                  <div class="level">
                    <div class="level-item">
                      <ul>
                        <li class="subtitle">Fighting Arts</li>
                        <li v-for="(a,aidx) in currentSurvivor.abilities.fightingArts" :key="aidx" class="is-size-7">{{ a }}</li>
                      </ul>
                    </div>
                    <div class="level-item">
                      <ul>
                        <li class="subtitle">Disorders</li>
                        <li v-for="(a,aidx) in currentSurvivor.abilities.disorders" :key="aidx" class="is-size-7">{{ a }}</li>
                      </ul>
                    </div>
                    <div class="level-item">
                      <ul>
                        <li class="subtitle">Abilities</li>
                        <li v-for="(a,aidx) in currentSurvivor.abilities.abilities" :key="aidx" class="is-size-7">{{ a }}</li>
                      </ul>
                    </div>
                  </div>
                  <div class="level">
                    <div class="level-item">
                      <ul>
                        <li class="subtitle">Impairments</li>
                        <li v-for="(a,aidx) in currentSurvivor.abilities.impairments" :key="aidx" class="is-size-7">{{ a }}</li>
                      </ul>
                    </div>
                    <div class="level-item">
                      <ul>
                        <li class="subtitle">Severe Injuries</li>
                        <li class="is-size-7">(WIP)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <b-icon icon="male" size="is-large" style="color:#ddd" class="mt-6" />
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
                  <b-icon icon="th" size="is-large" style="color:#ddd" class="mt-6" />
                </div>
              </div>
              <div class="column is-2">
                <b-menu>
                  <b-menu-list label="Grids">
                    <b-menu-item 
                      v-for="g in validGrids" 
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
              <div class="column is-8 is-offset-2" v-if="currentSurvivor && grid">
                <div class="divider">Equipped Stats</div>
                <div class="level">
                  <b-field v-for="s in ['movement','accuracy','strength','evasion','luck','speed']" :key="s" :label="capitalize(s)" label-position="on-border" class="level-item">
                    <b-input size="is-medium" class="stat-box" :value="parseInt(currentSurvivor.stats[s].base) + parseInt(bonuses().stats[s])" disabled />
                  </b-field>
                </div>
                <b-button type="is-success" expanded @click="showCombinedSurvivor()">Load Survivor Sheet</b-button>
              </div>
            </div>
          </section>
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
import GridsMixin from '@/mixins/grids'

export default {
  name: 'SurvivorSetup',
  mixins: [GridsMixin],
  data: () => ({
    currentSurvivor: null,
    grid: null,
  }),
  computed: {
    ...mapGetters([
      'grids',
      'survivors'
    ]),
    
    validSurvivors() {
      return this.survivors.filter(s => 
        s.lifetime.died === null && 
        !s.lifetime.cannot.hunt && 
        s.survival.skipHunt !== this.campaign?.year
      )
    },
    
    validGrids() {
      return this.grids //
    }
  },
  methods: {
    pickSurvivor(survivor) {
      this.currentSurvivor = survivor
    },
    
    pickGrid(grid) {
      this.grid = grid
    },
    
    showCombinedSurvivor() {
      this.$router.push(`/hunt/control/survivor/${this.currentSurvivor.id}/grid/${this.grid.id}`)
    }
  }
}
</script>