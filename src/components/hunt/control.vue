<template>
  <div class="columns is-multiline" v-if="!showLoading && survivor && grid">
    <div class="column is-12" ref="actions">
      <b-message type="is-info">
        <b-button 
          class="mx-2" 
          type="is-success" 
          icon-left="plus-square" 
          @click="actionFullHeal"
        >
          Full Heal Survivor
        </b-button>
        <b-button 
          class="mx-2" 
          type="is-info" 
          icon-left="recycle" 
          @click="actionResetRound"
        >
          Reset Round
        </b-button>
        <b-button 
          class="mx-2" 
          type="is-primary" 
          icon-left="question-circle" 
          @click="actionManageTokens"
        >
          Manage Tokens
        </b-button>
        <b-button 
          class="mx-2" 
          type="is-danger" 
          icon-left="certificate" 
          @click="actionTakeDamage"
        >
          Take Damage
        </b-button>
        <b-button 
          class="mx-2" 
          type="is-warning" 
          icon-left="dice-d20" 
          @click="actionUseReroll" 
          v-if="survivor.lifetime.reroll.available && !survivor.lifetime.reroll.used"
        >
          Use Lifetime Reroll
        </b-button>
        <b-button 
          class="mx-2" 
          type="is-black" 
          icon-left="skull" 
          @click="actionKillSurvivor"
        >
          Kill Survivor
        </b-button>
      </b-message>
      <b-modal
        v-model="showManageTokens"
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal
        trap-focus
        has-modal-card
      >
        <template #default="props">
          <ManageTokens
            @close="props.close"
            @done="saveTokens"
          />
        </template>
      </b-modal>
      <b-modal
        v-model="showTakeDamage"
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal
        trap-focus
        has-modal-card
      >
        <template #default="props">
          <TakeDamage
            :hitLocations="hitLocations.concat(['brain'])"
            @close="props.close"
            @done="takeDamage"
          />
        </template>
      </b-modal>
    </div>
    <div class="column is-12">
      <div class="is-flex is-justify-content-space-between mt-0">
        <div class="action">
          <div class="divider mt-0 mb-1">Action</div>
          <span class="bl-action is-size-1 is-clickable" :class="survivor.hunt.actions.action ? '' : 'disabled'" @click="toggleHuntActions('action')"></span>
        </div>
        <div class="is-flex is-flex-wrap-wrap is-justify-content-space-between mt-0">
          <div class="other" v-if="hasOtherTokens">
            <div class="divider mt-0 mb-1">Special Tokens</div>
            <ul>
              <li v-for="(t,tidx) in survivor.hunt.tokens.other" :key="tidx">
                <span class="tags has-addons">
                  <span class="tag is-primary">{{ t.amount }}x</span>
                  <span class="tag is-dark">{{ t.name }}</span>
                </span>
              </li>
            </ul>
          </div>
          <div v-if="hasOtherTokens" class="divider is-vertical"></div>
          <div class="bleeding">
            <div class="divider mt-0 mb-1">Bleed</div>
            <b-icon 
              v-for="n in 5"
              :key="n"
              icon="tint" 
              size="is-large" 
              :type="survivor.hunt.special.bleed >= n ? 'is-danger' : 'is-light'" 
              class="mr-2 p-5 token is-clickable"
              :class="{ 'disabled': survivor.hunt.special.bleed < n }"
              @click.native="setBleedTokens(n)"
            />
          </div>
          <div class="divider is-vertical" v-if="hasStatTokens"></div>
          <div v-for="s in statKeys" :key="s" :class="s">
            <div v-if="survivor.hunt.tokens[s].plus > 0 || survivor.hunt.tokens[s].minus > 0" class="stat-token mt-2 mr-1 p-1">
              <div class="divider mt-0 mb-1">{{ capitalize(s) }}</div>
              <div class="is-flex is-justify-content-center">
                <span v-if="survivor.hunt.tokens[s].plus > 0">
                  <b-icon
                    icon="plus-circle"
                    size="is-medium"
                    type="is-success"
                    v-for="n in survivor.hunt.tokens[s].plus"
                    :key="n"
                  />
                </span>
                <span v-if="survivor.hunt.tokens[s].minus > 0">
                  <b-icon
                    icon="minus-circle"
                    size="is-medium"
                    type="is-danger"
                    v-for="n in survivor.hunt.tokens[s].minus"
                    :key="n"
                  />
                </span>
              </div>
              <div class="divider is-vertical"></div>
            </div>
          </div>
        </div>
        <div class="movement">
          <div class="divider mt-0 mb-1">Movement</div>
          <span class="bl-movement is-size-1 is-clickable" :class="survivor.hunt.actions.movement ? '' : 'disabled'" @click="toggleHuntActions('movement')"></span>
        </div>
      </div>
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
            <div v-if="!survivor.lifetime.cannot.survival" class="field mt-2 is-flex is-flex-wrap-wrap is-expanded is-justify-content-left">
              <div v-for="a in survivalAbilities" :key="a" class="mr-2">
                <b-tooltip type="is-dark" position="is-top" size="is-small" :active="!survivor.hunt.abilities[a]">
                  <b-button v-if="survivor.survival.abilities[a]" size="is-small" type="is-info" :disabled="!survivor.hunt.abilities[a]">{{ capitalize(a) }}</b-button>
                  <template #content>
                    Each survival ability can be used once per round.
                  </template>
                </b-tooltip>
              </div>
            </div>
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
        <div class="column is-12 armor" ref="armor">
          <div class="columns">
            <div class="column is-2" v-for="l in ['brain'].concat(hitLocations)" :class="l" :key="l">
              <p class="control">
                <span :class="'bl-' + translate[l]" v-if="l !== 'brain'"></span>
                {{ capitalize(l) }}
              </p>
              <div class="large-armor-block">
                <span class="bl-armor"></span>
                <b-input 
                  v-model="survivor.defenses[l].value"
                  class="amount" 
                  size="is-large" 
                  @change.native="saveField(`defenses.${l}.value`, 'armor')"
                />
              </div>
              <p class="control">
                <button
                  v-if="l !== 'head'"
                  class="button is-small kdm-box mt-1"
                  :class="{ 'is-warning': survivor.defenses[l].light, 'mr-2': l !== 'brain' }"
                  @click.prevent="survivor.defenses[l].light = !survivor.defenses[l].light , saveField(`defenses.${l}.light`, 'armor')"
                />
                <b-tooltip type="is-dark" position="is-bottom">
                  <button
                    v-if="l !== 'brain'"
                    class="button is-small kdm-box thick-border mt-1"
                    :class="{ 'is-danger': survivor.defenses[l].heavy }"
                    @click.prevent="survivor.defenses[l].heavy = !survivor.defenses[l].heavy , saveField(`defenses.${l}.heavy`, 'armor')"
                  />
                  <template #content>
                    Taking a Heavy Injury knocks you down.
                  </template>
                </b-tooltip>
                <span class="tag is-warning mt-2" v-if="l === 'brain' && survivor.defenses[l].value > 2">Insane</span>
                <b-tooltip
                  type="is-light"
                  position="is-bottom"
                >
                  <span class="tag is-danger mt-2 is-clickable" v-if="l !== 'brain'">Add Injury</span>
                  <template #content>
                    Add a Severe Injury to this Hit Location
                  </template>
                </b-tooltip>
                <span v-if="l !== 'brain'">
                  <span v-for="(si,siidx) in survivor.defenses[l].severe" :key="siidx">
                    {{ si }}
                  </span>
                  <br />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="column is-6 cu courage" ref="courage">
          <b-field grouped label="Courage" label-position="" class="ml-3">
            <p class="control mr-1" v-for="n in createRange(9)" :key="n">
              <b-tooltip type="is-light" position="is-bottom" v-if="n === 2 || n === 8" size="is-small">
                <button class="button is-small kdm-box thick-border"
                  :class="{
                    'is-dark': survivor.mentality.courage.level > n
                  }"
                  @click.prevent="setCourageLevel(n+1)"></button>
                <template #content>
                  <span v-html="tooltips.courage[n]" />
                </template>
              </b-tooltip>
              <button class="button is-small kdm-box"
                :class="{
                  'is-dark': survivor.mentality.courage.level > n
                }"
                @click.prevent="setCourageLevel(n+1)"
                v-else></button>
            </p>
          </b-field>
          <div class="buttons is-centered">
            <b-tooltip 
              position="is-right" 
              style="width:100%" 
              type="is-dark"
              multilined
              :active="survivor.mentality.courage.abilities[a].granted" 
              :label="survivor.mentality.courage.abilities[a].description" 
              v-for="a in ['stalwart','prepared','matchmaker']" 
              :key="a"
            >
              <b-button 
                size="is-small" 
                style="width:100%" 
                rounded 
                :style="{ color: survivor.mentality.courage.abilities[a].granted ? '' : '#ddd' }" 
                :class="{ 'is-info': survivor.mentality.courage.abilities[a].granted }" 
                @click.prevent="toggleAbility('courage',a)"
              >
                {{ survivor.mentality.courage.abilities[a].name }}
              </b-button>
            </b-tooltip>
          </div>
        </div>
        <div class="column is-6 cu understanding" ref="understanding">
          <b-field grouped label="Understanding" label-position="" class="ml-3">
            <p class="control mr-1" v-for="n in createRange(9)" :key="n">
              <b-tooltip type="is-light" position="is-bottom" v-if="n === 2 || n === 8" size="is-small">
                <button class="button is-small kdm-box thick-border"
                  :class="{
                    'is-dark': survivor.mentality.understanding.level > n
                  }"
                  @click.prevent="setUnderstandingLevel(n+1)"></button>
                <template #content>
                  <span v-html="tooltips.understanding[n]" />
                </template>
              </b-tooltip>
              <button class="button is-small kdm-box"
                :class="{
                  'is-dark': survivor.mentality.understanding.level > n
                }"
                @click.prevent="setUnderstandingLevel(n+1)"
                v-else></button>
            </p>
          </b-field>
          <div class="buttons is-centered">
            <b-tooltip 
              position="is-left" 
              style="width:100%" 
              type="is-dark" 
              multilined
              :active="survivor.mentality.understanding.abilities[a].granted" 
              :label="survivor.mentality.understanding.abilities[a].description" 
              v-for="a in ['analyze','explore','tinker']" 
              :key="a"
            >
              <b-button 
                size="is-small" 
                style="width:100%" 
                rounded 
                :style="{ color: survivor.mentality.understanding.abilities[a].granted ? '' : '#ddd' }" 
                :class="{ 'is-info': survivor.mentality.understanding.abilities[a].granted }" 
                @click.prevent="toggleAbility('understanding',a)"
              >
                {{ survivor.mentality.understanding.abilities[a].name }}
              </b-button>
            </b-tooltip>
          </div>
        </div>
        <div class="column is-12">
          <b-field grouped label="Weapon Expertise" ref="wp" class="wp">
            <b-input 
              v-model="survivor.weapon.selected" 
              placeholder="Weapon Type" 
              icon="shield-alt" @change.native="saveField('weapon.selected', 'wp')" 
              expanded 
            />
            <p class="control" v-for="n in createRange(8)" :key="n">
              <b-tooltip type="is-light" position="is-bottom" v-if="n === 2 || n === 7" >
                <button class="button is-small kdm-box thick-border"
                  :class="{
                    'is-dark': survivor.weapon.proficiency > n
                  }"
                  @click.prevent="setWeaponProficiency(n+1)"></button>
                <template #content>
                  <span v-html="tooltips.wp[n]" />
                </template>
              </b-tooltip>
              <button class="button is-small kdm-box"
                :class="{
                  'is-dark': survivor.weapon.proficiency > n
                }"
                @click.prevent="setWeaponProficiency(n+1)"
                v-else></button>
            </p>
          </b-field>
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
    <div class="column is-3" v-for="t in tagLists" :key="t.id" :ref="t.ref" :class="t.id">
      <h2 class="subtitle">{{ t.label }}</h2>
      <b-taginput
        v-model="survivor.abilities[t.id]"
        :placeholder="'Add ' + t.label"
        :maxtags="t.max"
        :type="t.type"
        :remove-on-keys="[]"
        @input="saveListField(`abilities.${t.id}`,t.ref)"
      />
      <p class="control mt-1 is-size-7" v-if="t.id === 'fightingArts'">
        <b-checkbox 
          type="is-danger" 
          v-model="survivor.lifetime.cannot.fightingArts" 
          @change.native="saveField('lifetime.cannot.fightingArts','fa')"
        >
          Cannot Use Fighting Arts
        </b-checkbox>
      </p>
      <p class="control mt-1 is-size-7" v-if="t.id === 'abilities'">
        <b-checkbox 
          type="is-success" 
          v-model="survivor.lifetime.reroll.available" 
          @change.native="saveField('lifetime.reroll.available', 'ab')"
        >
          Lifetime Reroll Available
        </b-checkbox>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
[class^="bl-"], [class*=" bl-"] {
  &.disabled {
    color: #ddd;
  }
}

.stat-token {
  border: 1px solid #ddd;
  border-radius: 1em;
}

.token {
  border-radius: 3em;
  border: .3em solid black;
  
  &.disabled {
    border: .3em dotted gray;
  }
}

.large-armor-block {
  position: relative;
  
  .bl-armor {
    vertical-align: bottom;
    color: white;
    font-size: 3em;
    
    &::before {
      color: white;
      -webkit-text-stroke: 4px black;
    }
  }
  
  .amount {
    position: absolute;
    top: -.2em;
    left: .4em;
    font-size: 2em;
    color: black;
    z-index: 5;
    
    &::v-deep {
      .input {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }
    }
  }
}

::v-deep {  
  .wp p.control {
    margin-top: 0.5em;
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
  
  .taginput-container {
    .tag {
      width: 100%;
    }
  }
}

.courage {
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 5%;
    right: -2%;
    height: 90%;
    border-right: 1px solid black;
  }
}

.column {
  position: relative;
  
  &.brain {
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 10%;
      right: 0;
      height: 80%;
      padding-left: 1em;
      border-right: 1px solid black;
    }
  }
  
  .columns {
    .armor:before {
      content: "";
      position: absolute;
      height: 97%;
      width: 96.5%;
      background-color: #eee;
      opacity: 0.15;
      left: 2.5%;
      top: 4.5%;
    }
  }
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
import ManageTokens from '@/components/hunt/control/tokens'
import TakeDamage from '@/components/hunt/control/damage'

export default {
  name: 'ControlSurvivor',
  mixins: [GridsMixin, SurvivorMixin],
  components: {
    GearCard,
    ManageTokens,
    TakeDamage
  },
  data: () => ({
    showManageTokens: false,
    showTakeDamage: false,
    tagLists: [
      {
        label: 'Fighting Arts',
        id: 'fightingArts',
        ref: 'fa',
        type: 'is-info',
        max: 3
      },
      {
        label: 'Disorders',
        id: 'disorders',
        ref: 'do',
        type: 'is-dark',
        max: 3
      },
      {
        label: 'Abilities',
        id: 'abilities',
        ref: 'ab',
        type: 'is-success'
      },
      {
        label: 'Impairments',
        id: 'impairments',
        ref: 'im',
        type: 'is-warning'
      }
    ]
  }),
  computed: {
    ...mapGetters([
      'grids',
      'survivors'
    ]),
    
    hasStatTokens() {
      return this.statKeys.some(s => {
        return this.survivor?.hunt?.tokens?.[s].plus > 0
          || this.survivor?.hunt?.tokens?.[s].minus > 0
      })
    },
    
    hasOtherTokens() {
      return this.survivor?.hunt?.tokens?.other?.length > 0
    },
    
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
      
      this.setArmorMaxValues()
    },
    
    setArmorMaxValues() {
      if(!this.grid || !this.survivor) return
      
      this.hitLocations.forEach(hl => {
        this.survivor.defenses[hl].max = this.armors()[hl]
      })
    },
    
    // ---
    
    actionFullHeal() {
      this.$buefy.dialog.confirm({
        message: 'This will reset all armor values to the values your gear grid reaches.  It is most often used at the start of a hunt.  Use it now?',
        onConfirm: () => this._fullHeal()
      })
    },
    
    _fullHeal() {
      this.hitLocations.forEach(hl => {
        this.survivor.defenses[hl].value = this.survivor.defenses[hl].max
      })
      
      this.saveField('defenses', 'actions')
    },
    
    actionResetRound() {
      this.$buefy.dialog.confirm({
        message: 'Reset to start of round?  This will reactivate all Survival abilities and reset your available Actions.',
        onConfirm: () => this._resetRound()
      })
    },
    
    _resetRound() {
      this.survivalAbilities.forEach(sa => {
        this.survivor.hunt.abilities[sa] = this.survivor.survival.abilities[sa]
      })
      
      this.survivor.hunt.actions.action = 1
      this.survivor.hunt.actions.movement = 1
      
      this.saveField('hunt', 'actions')
    },
    
    actionManageTokens() {
      this.showManageTokens = true
    },
    
    saveTokens(tokens) {
      console.log(tokens)
    },
    
    actionTakeDamage() {
      this.showTakeDamage = true
    },
    
    takeDamage(hits) {
      console.log(hits)
    },
    
    actionUseReroll() {
      if(!this.survivor.lifetime.reroll.available || this.survivor.lifetime.reroll.used) {
        this.$buefy.dialog.alert({
          message: 'You do not have a reroll to use.'
        })
        return
      }
    
      this.$buefy.dialog.confirm({
        message: 'Confirm that you would like to use up your Survivor\'s lifetime reroll.',
        onConfirm: () => {
          this.survivor.lifetime.reroll.used = true
          this.saveField('lifetime.reroll.used', 'actions')
        }
      })
    },
    
    actionKillSurvivor() {
      this.$buefy.dialog.confirm({
        message: 'ARE YOU SURE?  This will KILL the Survivor.  You will be asked for a cause of death.',
        onConfirm: () => {
          this.$buefy.dialog.prompt({
            message: 'Cause of Death?',
            trapFocus: true,
            onConfirm: (val) => {
              this.survivor.lifetime.died = this.campaign.year
              this.survivor.lifetime.case = val
              this.saveField('lifetime', 'actions')
            }
          })
        }
      })
    },
    
    setBleedTokens(count) {
      if(this.survivor.hunt.special.bleed === count)
        count--
        
      this.survivor.hunt.special.bleed = count
      this.saveField('hunt.special.bleed', 'actions')
    },
    
    toggleHuntActions(type) {
      if(this.survivor.hunt.actions[type] === undefined) return
      
      this.survivor.hunt.actions[type] = !this.survivor.hunt.actions[type]
      this.saveField(`hunt.actions.${type}`, 'actions')
    },
    
    // ---
    
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