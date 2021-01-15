<template>
  <div class="columns is-multiline" v-if="!showLoading && survivor && grid">
    <div class="column is-12">
      <b-message type="is-info">
        <b-button class="mx-2" type="is-success" icon-left="plus-square">Full Heal Survivor</b-button>
        <b-button class="mx-2" type="is-info" icon-left="recycle">Reset Round</b-button>
        <b-button class="mx-2" type="is-info" icon-left="question-circle">Manage Tokens</b-button>
        <b-button class="mx-2" type="is-danger" icon-left="tint">Bleed Tokens</b-button>
        <b-button class="mx-2" type="is-danger" icon-left="certificate">Take Damage</b-button>
        <b-button class="mx-2" type="is-warning" icon-left="dice-d20">Use Lifetime Reroll</b-button>
        <b-button class="mx-2" type="is-black" icon-left="skull">Kill Survivor</b-button>
      </b-message>
    </div>
    <div class="column is-12">
      <p>[[Tokens]]</p>
    </div>
    <div class="column is-12 m-0 p-0">
      <hr class="m-1" />
    </div>
    <div class="column is-5 pt-5">
      <div class="columns is-multiline">
        <div class="column is-12">
          <b-field grouped ref="name">
            <b-field>
              <b-icon :icon="genderIcon"/>
            </b-field>
            <b-field label="Name" label-position="on-border" expanded>
              <b-input v-model="survivor.lifetime.name" size="is-small" @change.native="saveField('lifetime.name', 'name')" />
            </b-field>
          </b-field>
        </div>
        <div class="column is-12">
          <b-field grouped label="Experience" label-position="on-border" ref="xp">
            <p class="control" v-for="n in createRange(16)" :key="n">
              <b-tooltip type="is-light" position="is-bottom" v-if="n === 1 || n === 5 || n === 9 || n === 14 || n === 15" size="is-small">
                <button
                  class="button is-small kdm-box thick-border"
                  :class="{
                    'is-dark': survivor.lifetime.experience > n ,
                    'extra-thick': n === 15
                  }"
                  @click.prevent="setExperience(n+1)"
                />
                <template #content>
                  <span v-html="tooltips.xp[n]" />
                </template>
              </b-tooltip>
              <button
                class="button is-small kdm-box"
                :class="{
                  'is-dark': survivor.lifetime.experience > n
                }"
                @click.prevent="setExperience(n+1)"
                v-else 
              />
            </p>
          </b-field>
        </div>
        <div class="column is-12" ref="survival">
          <b-field grouped>
            <b-field label="Survival" label-position="on-border">
              <b-input size="is-medium" v-model="survivor.survival.amount" class="year-input" style="width:3.5em" @change.native="saveField('survival.amount', 'survival')"/>
              <p class="control">
                <b-field label="Max" label-position="on-border">
                  <b-input size="is-medium" :value="campaign.survival.max" class="year-input" style="width:3.5em" disabled />
                </b-field>
              </p>
            </b-field>
            <b-field v-if="!survivor.lifetime.cannot.survival">
              <div v-for="a in survivalAbilities" :key="a" class="mr-2">
                <b-tooltip type="is-dark" position="is-top" size="is-small" :active="!survivor.hunt.abilities[a]">
                  <b-button v-if="survivor.survival.abilities[a]" size="is-small" type="is-info" :disabled="!survivor.hunt.abilities[a]">{{ capitalize(a) }}</b-button>
                  <template #content>
                    Each survival ability can be used once per round.
                  </template>
                </b-tooltip>
              </div>
            </b-field>
            <b-message size="is-small" type="is-danger" style="width:100%" class="cannot-use m-0 p-0" v-else>
              Cannot Use Survival Actions
            </b-message>
          </b-field>
        </div>
      <div class="column is-12 stats" ref="stats">
        <div class="columns">
          <div class="column is-2" v-for="s in statKeys" :key="s">
            <b-field :label="shortname[s]" label-position="on-border">
              <b-tooltip type="is-dark" position="is-top">
                <b-input size="is-large" style="width:5em" class="year-input" expanded disabled :value="totalStats[s]"/>
                <template #content>
                  <span v-html="statBreakdown(s)" />
                </template>
              </b-tooltip>
            </b-field>
            <b-field grouped class="stat-addon">
              <b-field label="Perm." label-position="inside">
                <b-input 
                  size="is-small" 
                  class="year-input" 
                  v-model="survivor.stats[s].base" 
                  @change.native="saveField(`stats.${s}.base`, 'stats')" 
                />
              </b-field>
              <b-field label="Misc." label-position="inside">
                <b-input 
                  size="is-small" 
                  class="year-input" 
                  v-model="survivor.stats[s].other" 
                  @change.native="saveField(`stats.${s}.other`, 'stats')" 
                />
              </b-field>
            </b-field>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="column is-7 p-0">
      <div class="tile is-parent is-flex-wrap-wrap pa-0">
        <div class="tile is-child is-4 is-clickable" v-for="(gi,gidx) in gridItems" :key="gidx">
          <div class="box empty-slot" v-if="gi && !gi.id">
            <b-icon icon="times-circle" size="is-medium" style="color:#ccc" />
          </div>
          <GearCard :item="gi" :showRemove="true" @remove="removeItem(gidx, true, true)" v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.column {
  position: relative;
}

.tile {
  &.is-child {
    display: flex;
    align-items: center;
    justify-content: center;
  
    .box {
      width: 95%;
      /* Figure it out */
      margin: .5em;
      min-height: 14em;
      
      &.empty-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed #ccc;
      }
    }
  }
}

.field {
  &.is-grouped {
    .control:not(:last-child) {
      margin-right: .68em;
    }
  }
  &.stat-addon {
    &::v-deep {
      .field {
        margin: -.4em .1em !important;
        
        .label {
          overflow: visible;
          font-size: .5rem;
        }
        
        .input {
          width: 3em;
          margin: 0;
          padding: 0;
          text-align: center;
        }
      }
    }
  }
  
  &::v-deep {
    .year-input > input {
      text-align: center;
    }
    
    .kdm-box {
      height: 2em;
      width: 2em;
      padding: 0;
      
      &.thick-border {
        border: .4em solid black;
        &.is-dark {
        border: .3em solid #aaa;
        }
      }
      
      &.extra-thick {
        border: .75em solid black;
      }
    }

    .special-icon {
      display: inline-block;
      vertical-align: top;
      
      &.small {
      width: 20px;
      height: 20px;
      }
    }
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import GridsMixin from '@/mixins/grids'
import SurvivorMixin from '@/mixins/survivor'
import GearCard from '@/components/storage/gear/card'

export default {
  name: 'ControlSurvivor',
  mixins: [GridsMixin, SurvivorMixin],
  components: {
    GearCard
  },
  computed: {
    ...mapGetters([
      'grids',
      'survivors'
    ]),
    
    totalStats() {
      let out = {}
      this.statKeys.forEach(s => {
        out[s] =
          (parseInt(this.survivor.stats[s].base)  || 0) +
          (parseInt(this.survivor.stats[s].other)  || 0) +
          (parseInt(this.bonuses().stats[s])  || 0) +
          (
            (parseInt(this.survivor.hunt?.tokens[s]?.plus) || 0) -
            (parseInt(this.survivor.hunt?.tokens[s]?.minus) || 0)
          )
      })
    
      return out
    }
  },
  watch: {
    '$route.params': {
      immediate: true,
      deep: true,
      handler() {
        this.loadIds()
      }
    }
  },
  methods: {
    loadIds() {
      this.survivor = this.survivors.find(s => s.id === this.$route.params.survivorId)
      this.grid = this.grids.find(g => g.id === this.$route.params.gridId)
    },
    
    statBreakdown(key) {
      return `
      <strong style="color:white">${this.capitalize(key)}</strong>
      <hr style="margin:.2em"/>
      <div style="text-align:right">
        Permanent (Survivor): <strong style="color:white">${(this.survivor.stats[key].base || 0)}</strong><br />
        Miscellaneous/Other: <strong style="color:white">${(this.survivor.stats[key].other || 0)}</strong><br />
        Gear Grid: <strong style="color:white">${(this.bonuses().stats[key] || 0)}</strong><br />
        Tokens: <strong style="color:white">+${(this.survivor.hunt?.tokens[key]?.plus || 0)}, -${(this.survivor.hunt?.tokens[key]?.minus || 0)}</strong>
      </div>
      `
    }
  }
}
</script>