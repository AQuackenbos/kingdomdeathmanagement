<template>
  <div class="column survivor-panel">
    <b-message v-if="showBonuses" type="is-success" has-icon :closable="false">
      <h1 class="subtitle is-size-6">If you have any of the following, all survivors gain the corresponding bonuses:</h1>
      <ul>
        <li><span class="has-text-weight-bold">Graves</span>: +1 understanding</li>
        <li><span class="has-text-weight-bold">Survival of the Fittest</span>: +1 Strength, +1 Evasion</li>
        <li><span class="has-text-weight-bold">Accept Darkness</span>: +2 to Brain Trauma rolls</li>
        <li><span class="has-text-weight-bold">Barbaric</span>: +1 Strength</li>
        <li><span class="has-text-weight-bold">Romantic</span>: When born, Draw 3 random Fighting Arts and Choose 1 to learn.</li>
      </ul>
    </b-message>
    <div class="columns is-multiline" v-if="survivor">
      <div class="column is-6">
        <b-field label="Name" label-position="on-border" ref="name">
          <template #message>When you name your survivor, gain +1 survival</template>
          <b-input v-model="survivor.lifetime.name" expanded @change.native="saveField('lifetime.name', 'name')" />
        </b-field>
        <b-field grouped ref="parents">
          <b-field>
            <b-select placeholder="Gender" icon="transgender" v-model="survivor.lifetime.gender" @change.native="saveField('lifetime.gender', 'parents')">
              <option value="M">Male</option>
              <option value="F">Female</option>
            </b-select>
          </b-field>
          <b-field label="Father" label-position="on-border" expanded>
            <b-input v-model="survivor.lifetime.father" @change.native="saveField('lifetime.father', 'parents')"/>
          </b-field>
          <b-field label="Mother" label-position="on-border" expanded>
            <b-input v-model="survivor.lifetime.mother" @change.native="saveField('lifetime.mother', 'parents')"/>
          </b-field>
        </b-field>
        <b-field grouped ref="life">
          <b-field label="Born" label-position="on-border">
            <b-input v-model="survivor.lifetime.born" class="year-input" maxlength="2" style="width:4em" @change.native="saveField('lifetime.born', 'life')"/>
          </b-field>
          <b-field label="Died" label-position="on-border">
            <b-input v-model="survivor.lifetime.died" class="year-input" maxlength="2" style="width:4em" @change.native="saveField('lifetime.died', 'life')"/>
          </b-field>
          <b-field label="Cause of Death" label-position="on-border" expanded>
            <b-input v-model="survivor.lifetime.cause" :disabled="dead" icon="skull" @change.native="saveField('lifetime.cause', 'life')"/>
          </b-field>
        </b-field>
        <b-field ref="cannot">
          <b-checkbox type="is-danger" v-model="survivor.lifetime.cannot.hunt" @input="saveField('lifetime.cannot.hunt', 'cannot')" style="margin-right:3em">
            Cannot Depart on Hunts
          </b-checkbox>
          <b-checkbox type="is-danger" v-model="survivor.lifetime.cannot.survival" @input="saveField('lifetime.cannot.survival', 'cannot')">
            Cannot Spend Survival
          </b-checkbox>
        </b-field>
      </div>
      <div class="column is-6">
        <b-field grouped ref="survival">
          <b-field label="Survival" label-position="on-border">
            <b-input v-model="survivor.survival.amount" class="year-input" style="width:5em" @change.native="saveField('survival.amount', 'survival')"/>
          </b-field>
          <b-field label="Max" label-position="on-border">
            <b-input :value="campaign.survival.max" class="year-input" style="width:3.5em" disabled />
          </b-field>
          <div class="block">
            <b-checkbox
              type="is-light"
              size="is-small"
              :false-value="false"
              style="text-transform: capitalize"
              v-model="survivor.survival.abilities[a]"
              v-for="a in ['dodge','encourage','surge','dash','endure']"
              :key="a"
              @input="saveField(`survival.abilities.${a}`, 'survival')"
              >
              {{ a }}
            </b-checkbox>
          </div>
        </b-field>
        <b-field grouped label="Experience" ref="xp">
          <p class="control" v-for="n in createRange(16)" :key="n">
            <b-tooltip type="is-light" position="is-bottom" v-if="n === 1 || n === 5 || n === 9 || n === 14 || n === 15" size="is-small">
              <button class="button is-small kdm-box thick-border"
                :class="{
                  'is-dark': survivor.lifetime.experience > n ,
                  'extra-thick': n === 15
                }"
                @click.prevent="setExperience(n+1)"></button>
              <template #content>
                <span v-html="tooltips.xp[n]" />
              </template>
            </b-tooltip>
            <button class="button is-small kdm-box"
              :class="{
                'is-dark': survivor.lifetime.experience > n
              }"
              @click.prevent="setExperience(n+1)"
              v-else></button>
          </p>
        </b-field>
        <b-field grouped label="Weapon Expertise" ref="wp" class="wp">
          <b-input v-model="survivor.weapon.selected" placeholder="Weapon Type" icon="shield-alt" @change.native="saveField('weapon.selected', 'wp')" expanded />
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
      <div class="column is-12">
        <hr />
      </div>
      <div class="column is-12 stats" ref="stats">
        <div class="columns">
          <div class="column is-2">
            <b-field label="Movement" label-position="on-border">
              <b-input size="is-large" class="year-input" expanded v-model="survivor.stats.movement.base" @change.native="saveField('stats.movement.base', 'stats')" />
            </b-field>
          </div>
          <div class="column is-2">
            <b-field label="Accuracy" label-position="on-border">
              <b-input size="is-large" class="year-input" expanded v-model="survivor.stats.accuracy.base" @change.native="saveField('stats.accuracy.base', 'stats')" />
            </b-field>
          </div>
          <div class="column is-2">
            <b-field label="Strength" label-position="on-border">
              <b-input size="is-large" class="year-input" expanded v-model="survivor.stats.strength.base" @change.native="saveField('stats.strength.base', 'stats')" />
            </b-field>
          </div>
          <div class="column is-2">
            <b-field label="Evasion" label-position="on-border">
              <b-input size="is-large" class="year-input" expanded v-model="survivor.stats.evasion.base" @change.native="saveField('stats.evasion.base', 'stats')" />
            </b-field>
          </div>
          <div class="column is-2">
            <b-field label="Luck" label-position="on-border">
              <b-input size="is-large" class="year-input" expanded v-model="survivor.stats.luck.base" @change.native="saveField('stats.luck.base', 'stats')" />
            </b-field>
          </div>
          <div class="column is-2">
            <b-field label="Speed" label-position="on-border">
              <b-input size="is-large" class="year-input" expanded v-model="survivor.stats.speed.base" @change.native="saveField('stats.speed.base', 'stats')" />
            </b-field>
          </div>
        </div>
      </div>
      <div class="column is-12">
        <hr />
      </div>
      <div class="column is-6 cu" ref="courage">
        <b-field grouped label="Courage">
          <p class="control" v-for="n in createRange(9)" :key="n">
            <b-tooltip type="is-light" position="is-bottom" v-if="n === 2 || n === 8" size="is-small">
              <button class="button is-large kdm-box thick-border"
                :class="{
                  'is-dark': survivor.mentality.courage.level > n
                }"
                @click.prevent="setCourageLevel(n+1)"></button>
              <template #content>
                <span v-html="tooltips.courage[n]" />
              </template>
            </b-tooltip>
            <button class="button is-large kdm-box"
              :class="{
                'is-dark': survivor.mentality.courage.level > n
              }"
              @click.prevent="setCourageLevel(n+1)"
              v-else></button>
          </p>
        </b-field>
        <div class="buttons is-centered">
          <b-tooltip position="is-bottom" type="is-dark" :label="survivor.mentality.courage.abilities[a].description" v-for="a in ['stalwart','prepared','matchmaker']" :key="a">
            <b-button size="is-medium" rounded :class="{ 'is-dark': survivor.mentality.courage.abilities[a].granted }" @click.prevent="toggleAbility('courage',a)">
              {{ survivor.mentality.courage.abilities[a].name }}
            </b-button>
          </b-tooltip>
        </div>
      </div>
      <div class="column is-6 cu" ref="understanding">
        <b-field grouped label="Understanding">
          <p class="control" v-for="n in createRange(9)" :key="n">
            <b-tooltip type="is-light" position="is-bottom" v-if="n === 2 || n === 8" size="is-small">
              <button class="button is-large kdm-box thick-border"
                :class="{
                  'is-dark': survivor.mentality.understanding.level > n
                }"
                @click.prevent="setUnderstandingLevel(n+1)"></button>
              <template #content>
                <span v-html="tooltips.understanding[n]" />
              </template>
            </b-tooltip>
            <button class="button is-large kdm-box"
              :class="{
                'is-dark': survivor.mentality.understanding.level > n
              }"
              @click.prevent="setUnderstandingLevel(n+1)"
              v-else></button>
          </p>
        </b-field>
        <div class="buttons is-centered">
          <b-tooltip position="is-bottom" type="is-dark" :label="survivor.mentality.understanding.abilities[a].description" v-for="a in ['analyze','explore','tinker']" :key="a">
            <b-button size="is-medium" rounded :class="{ 'is-dark': survivor.mentality.understanding.abilities[a].granted }" @click.prevent="toggleAbility('understanding',a)">
              {{ survivor.mentality.understanding.abilities[a].name }}
            </b-button>
          </b-tooltip>
        </div>
      </div>
      <div class="column is-12">
        <hr />
      </div>
      <div class="column is-3">
        <b-field label="Fighting Arts" ref="fa">
          <template #message>
            <span>Maximum of 3</span>
            <b-field>
              <b-checkbox type="is-danger" v-model="survivor.lifetime.cannot.fightingArts" @change.native="saveField('lifetime.cannot.fightingArts','fa')">Cannot Use Fighting Arts</b-checkbox>
            </b-field>
          </template>
          <b-taginput v-model="survivor.abilities.fightingArts" placeholder="Add Fighting Art" maxtags="3" type="is-info" @input="saveField('abilities.fightingArts','fa')"/>
        </b-field>
      </div>
      <div class="column is-3">
        <b-field label="Disorders" ref="do">
          <template #message>
            <span>Maximum of 3</span>
          </template>
          <b-taginput v-model="survivor.abilities.disorders" placeholder="Add Disorder" maxtags="3" type="is-info" @input="saveField('abilities.disorders','do')"/>
        </b-field>
      </div>
      <div class="column is-3">
        <b-field label="Abilities" ref="ab">
          <template #message>
            <b-field grouped label="Lifetime Reroll">
              <b-checkbox type="is-success" v-model="survivor.lifetime.reroll.available" @change.native="saveField('lifetime.reroll.available', 'ab')">Available</b-checkbox>
              <b-checkbox type="is-danger" v-model="survivor.lifetime.reroll.used" @change.native="saveField('lifetime.reroll.used', 'ab')">Used</b-checkbox>
            </b-field>
          </template>
          <b-taginput v-model="survivor.abilities.abilities" placeholder="Add Ability" type="is-info" @input="saveField('abilities.abilities','ab')"/>
        </b-field>
      </div>
      <div class="column is-3">
        <b-field label="Impairments" ref="im">
          <template #message>
            <b-field type="is-danger">
              <p class="control">
                <span class="button is-static" style="color:black !important">Must Skip Hunt LY</span>
              </p>
              <b-input v-model="survivor.survival.skipHunt" placeholder="-" class="year-input" @change.native="saveField('survival.skipHunt', 'im')" expanded />
            </b-field>
          </template>
          <b-taginput v-model="survivor.abilities.impairments" placeholder="Add Impairment" type="is-info" @input="saveField('abilities.impairments','im')"/>
        </b-field>
      </div>
      <div class="column is-12">
        <h1 class="title">Severe Injuries</h1>
        <div class="content" v-if="injuries.length === 0">
          None.
        </div>
        <div class="content" v-else>
          LOTS LOL
        </div>
      </div>
    </div>
    <div class="field" v-if="survivor">
      <b-message type="is-danger" has-icon>
        <span class="">Deleting a survivor is PERMANENT and cannot be undone.</span><br />
        <b-button type="is-danger" @click.prevent="deleteSurvivor" icon-left="times-circle">Delete Survivor</b-button>
      </b-message>
    </div>
    <div v-else>
      NO_SURVIVOR
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";

.survivor-panel {
  margin-top: 1em;
  text-align: left;
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  
  &::v-deep {
    .year-input > input {
      text-align: center;
    }

    .stats .input.is-large {
      font-size: 4rem;
      padding-left: calc(0.5em - 1px);
      padding-right: calc(0.5em - 1px);
    }

    .field {
      position: relative
    }

    .field.is-grouped > .control:not(:last-child) {
      margin-right: 0.25em;
    }

    .wp p.control {
      margin-top: 0.5em;
    }


    .cu .buttons span.b-tooltip:not(:last-child) div.tooltip-trigger {
      margin-right: 1em;
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
import { db } from '@/firebase'

export default {
  name: 'SurvivorPanel',
  props: {
    showBonuses: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    survivor: null
  }),
  computed: {
    ...mapGetters([
      'survivors'
    ]),
    
    tooltips() {
      return {
        xp: {
          1: '<span class="bl-story-event mr-1"></span><span class="has-text-weight-bold">Age</span>',
          5: '<span class="bl-story-event mr-1"></span><span class="has-text-weight-bold">Age</span>',
          9: '<span class="bl-story-event mr-1"></span><span class="has-text-weight-bold">Age</span>',
          14: '<span class="bl-story-event mr-1"></span><span class="has-text-weight-bold">Age</span>',
          15: 'Retired'
        },
        
        wp: {
          2: 'Specialist',
          7: 'Master'
        },
        
        courage: {
          2: '<span class="bl-story-event mr-1"></span><span class="has-text-weight-bold">Bold</span>',
          8: '<span class="bl-story-event mr-1"></span><span class="has-text-weight-bold">See the Truth</span>'
        },
        
        understanding: {
          2: '<span class="bl-story-event mr-1"></span><span class="has-text-weight-bold">Insight</span>',
          8: '<span class="bl-story-event mr-1"></span><span class="has-text-weight-bold">White Secret</span>'
        }
      }
    },
    
    injuries() {
      if(!this.survivor) return []
      
      let d = this.survivor.defenses
      
      return [].concat(d.arms.severe, d.body.severe, d.head.severe, d.waist.severe, d.legs.severe)
    },
    
    dead() {
      if(!this.survivor) return false
      
      return !(
      this.survivor.lifetime.died !== null &&
      this.survivor.lifetime.died !== ''
      )
    }
  },
  created() {
    this.loadCurrentSurvivor()
  },
  watch: {
    '$route': 'loadCurrentSurvivor'
  },
  methods: {
    loadCurrentSurvivor() {
      let id = this.$route.params?.id
      if(!id) return
      return this.setSurvivor(id)
    },
    
    deleteSurvivor() {
      this.$buefy.dialog.confirm({
        message: 'Are you sure you want to delete this survivor?',
        onConfirm: () => {
          this.setLoading(true)
          db.collection(`campaigns/${this.campaign.id}/survivors`).doc(this.survivor.id).delete().then(() => {
            this.survivor = null
            this.setLoading(false)
          })
        }
      })
    },
    
    setSurvivor(id) {
      if(this.survivor?.id === id) return
      
      this.survivor = this.survivors.find(s => s?.id === id)
      history.pushState({}, null, '/survivors/'+id)
    },
    
    _setBoxValue(object, field, amount, fullname, ref) {
      if(object[field] === amount) amount -= 1
      object[field] = amount
      this.saveField(fullname, ref)
    },
    
    setWeaponProficiency(wp) {
      this._setBoxValue(this.survivor.weapon, 'proficiency', wp, "weapon.proficiency", "wp")
    },
    
    setUnderstandingLevel(ul) {
      this._setBoxValue(this.survivor.mentality.understanding, 'level', ul, "mentality.understanding.level", "understanding")
    },
    
    setCourageLevel(cl) {
      this._setBoxValue(this.survivor.mentality.courage, 'level', cl, "mentality.courage.level", "courage")
    },
    
    setExperience(xp) {
      this._setBoxValue(this.survivor.lifetime, 'experience', xp, "lifetime.experience", "xp")
    },
    
    createRange(size) {
      return [...Array(size).keys()]
    },
    
    toggleAbility(type, ability) {
      this.survivor.mentality[type].abilities[ability].granted = !this.survivor.mentality[type].abilities[ability].granted
      this.saveField(`mentality.${type}.abilities.${ability}.granted`, "courage")
    },
    
    saveField(field, refName) {
      if(!this.survivor) return
      
      let currVal = field.split('.').reduce((o,i) => o[i], this.survivor)
      
      let updateObj = {}
      
      updateObj[field] = currVal
      
      let loading = this.$buefy.loading.open({ container: this.$refs[refName].$el })
      db.collection(`campaigns/${this.campaign.id}/survivors`).doc(this.survivor.id).update(updateObj)
        .then(() => loading.close())
    },
  }
}
</script>