<template>
    <div class="column" v-if="!loading && user && campaign">
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
                        <b-menu-item :class="{ 'is-primary': s.lifetime.died === null, 'is-danger': s.lifetime.died !== null }" v-for="s in shownSurvivors" :key="s.id" @click.prevent="setSurvivor(s.id)" :active="currentSurvivor && s.id === currentSurvivor.id">
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
                                <b-button type="is-success is-light" icon-left="user-plus" @click.prevent="addSurvivor" expanded>New Survivor</b-button>
                            </template>
                        </b-menu-item>
                    </b-menu-list>
                </b-menu>
            </div>
            <div class="column survivor-panel" v-if="currentSurvivor === null">
                <p>Select or Add a Survivor to load their information.</p>
            </div>
            <div class="column survivor-panel" v-else>
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
                <div class="columns is-multiline">
                    <div class="column is-6">
                        <b-field label="Name" label-position="on-border" ref="name">
                            <template #message>When you name your survivor, gain +1 survival</template>
                            <b-input v-model="currentSurvivor.lifetime.name" expanded @change.native="saveField('lifetime.name', 'name')" />
                        </b-field>
                        <b-field grouped ref="parents">
                            <b-field>
                                <b-select placeholder="Gender" icon="transgender" v-model="currentSurvivor.lifetime.gender" @change.native="saveField('lifetime.gender', 'parents')">
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </b-select>
                            </b-field>
                            <b-field label="Father" label-position="on-border" expanded>
                                <b-input v-model="currentSurvivor.lifetime.father" @change.native="saveField('lifetime.father', 'parents')"/>
                            </b-field>
                            <b-field label="Mother" label-position="on-border" expanded>
                                <b-input v-model="currentSurvivor.lifetime.mother" @change.native="saveField('lifetime.mother', 'parents')"/>
                            </b-field>
                        </b-field>
                        <b-field grouped ref="life">
                            <b-field label="Born" label-position="on-border">
                                <b-input v-model="currentSurvivor.lifetime.born" class="year-input" maxlength="2" style="width:4em" @change.native="saveField('lifetime.born', 'life')"/>
                            </b-field>
                            <b-field label="Died" label-position="on-border">
                                <b-input v-model="currentSurvivor.lifetime.died" class="year-input" maxlength="2" style="width:4em" @change.native="saveField('lifetime.died', 'life')"/>
                            </b-field>
                            <b-field label="Cause of Death" label-position="on-border" expanded>
                                <b-input v-model="currentSurvivor.lifetime.cause" :disabled="dead" icon="skull" @change.native="saveField('lifetime.cause', 'life')"/>
                            </b-field>
                        </b-field>
                        <b-field ref="cannot">
                            <b-checkbox type="is-danger" v-model="currentSurvivor.lifetime.cannot.hunt" @input="saveField('lifetime.cannot.hunt', 'cannot')" style="margin-right:3em">
                                Cannot Depart on Hunts
                            </b-checkbox>
                            <b-checkbox type="is-danger" v-model="currentSurvivor.lifetime.cannot.survival" @input="saveField('lifetime.cannot.survival', 'cannot')">
                                Cannot Spend Survival
                            </b-checkbox>
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <b-field grouped ref="survival">
                            <b-field label="Survival" label-position="on-border">
                                <b-input v-model="currentSurvivor.survival.amount" class="year-input" style="width:5em" @change.native="saveField('survival.amount', 'survival')"/>
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
                                    v-model="currentSurvivor.survival.abilities[a]"
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
                                <b-tooltip type="is-light" position="is-bottom" v-if="n === 1 || n === 5 || n === 9 || n === 14 || n === 15" size="is-small" multilined>
                                    <button class="button is-small kdm-box thick-border"
                                        :class="{
                                            'is-dark': currentSurvivor.lifetime.experience > n ,
                                            'extra-thick': n === 15
                                        }"
                                        @click.prevent="setExperience(n+1)"></button>
                                    <template #content>
                                        <span v-html="tooltips.xp[n]" />
                                    </template>
                                </b-tooltip>
                                <button class="button is-small kdm-box"
                                    :class="{
                                        'is-dark': currentSurvivor.lifetime.experience > n
                                    }"
                                    @click.prevent="setExperience(n+1)"
                                    v-else></button>
                            </p>
                        </b-field>
                        <b-field grouped label="Weapon Expertise" ref="wp" class="wp">
                            <b-input v-model="currentSurvivor.weapon.selected" placeholder="Weapon Type" icon="shield-alt" @change.native="saveField('weapon.selected', 'wp')" expanded />
                            <p class="control" v-for="n in createRange(8)" :key="n">
                                <b-tooltip type="is-light" position="is-bottom" v-if="n === 2 || n === 7" >
                                    <button class="button is-small kdm-box thick-border"
                                        :class="{
                                            'is-dark': currentSurvivor.weapon.proficiency > n
                                        }"
                                        @click.prevent="setWeaponProficiency(n+1)"></button>
                                    <template #content>
                                        <span v-html="tooltips.wp[n]" />
                                    </template>
                                </b-tooltip>
                                <button class="button is-small kdm-box"
                                    :class="{
                                        'is-dark': currentSurvivor.weapon.proficiency > n
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
                                    <b-input size="is-large" class="year-input" expanded v-model="currentSurvivor.stats.movement.base" @change.native="saveField('stats.movement.base', 'stats')" />
                                </b-field>
                            </div>
                            <div class="column is-2">
                                <b-field label="Accuracy" label-position="on-border">
                                    <b-input size="is-large" class="year-input" expanded v-model="currentSurvivor.stats.accuracy.base" @change.native="saveField('stats.accuracy.base', 'stats')" />
                                </b-field>
                            </div>
                            <div class="column is-2">
                                <b-field label="Strength" label-position="on-border">
                                    <b-input size="is-large" class="year-input" expanded v-model="currentSurvivor.stats.strength.base" @change.native="saveField('stats.strength.base', 'stats')" />
                                </b-field>
                            </div>
                            <div class="column is-2">
                                <b-field label="Evasion" label-position="on-border">
                                    <b-input size="is-large" class="year-input" expanded v-model="currentSurvivor.stats.evasion.base" @change.native="saveField('stats.evasion.base', 'stats')" />
                                </b-field>
                            </div>
                            <div class="column is-2">
                                <b-field label="Luck" label-position="on-border">
                                    <b-input size="is-large" class="year-input" expanded v-model="currentSurvivor.stats.luck.base" @change.native="saveField('stats.luck.base', 'stats')" />
                                </b-field>
                            </div>
                            <div class="column is-2">
                                <b-field label="Speed" label-position="on-border">
                                    <b-input size="is-large" class="year-input" expanded v-model="currentSurvivor.stats.speed.base" @change.native="saveField('stats.speed.base', 'stats')" />
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
                                <b-tooltip type="is-light" position="is-bottom" v-if="n === 2 || n === 8" size="is-small" multilined>
                                    <button class="button is-large kdm-box thick-border"
                                        :class="{
                                            'is-dark': currentSurvivor.mentality.courage.level > n
                                        }"
                                        @click.prevent="setCourageLevel(n+1)"></button>
                                    <template #content>
                                        <span v-html="tooltips.courage[n]" />
                                    </template>
                                </b-tooltip>
                                <button class="button is-large kdm-box"
                                    :class="{
                                        'is-dark': currentSurvivor.mentality.courage.level > n
                                    }"
                                    @click.prevent="setCourageLevel(n+1)"
                                    v-else></button>
                            </p>
                        </b-field>
                        <div class="buttons is-centered">
                            <b-tooltip position="is-bottom" type="is-dark" :label="currentSurvivor.mentality.courage.abilities[a].description" v-for="a in ['stalwart','prepared','matchmaker']" :key="a">
                                <b-button size="is-medium" rounded :class="{ 'is-dark': currentSurvivor.mentality.courage.abilities[a].granted }" @click.prevent="toggleAbility('courage',a)">
                                    {{ currentSurvivor.mentality.courage.abilities[a].name }}
                                </b-button>
                            </b-tooltip>
                        </div>
                    </div>
                    <div class="column is-6 cu">
                        <b-field grouped label="Understanding">
                            <p class="control" v-for="n in createRange(9)" :key="n">
                                <b-tooltip type="is-light" position="is-bottom" v-if="n === 2 || n === 8" size="is-small" multilined>
                                    <button class="button is-large kdm-box thick-border"
                                        :class="{
                                            'is-dark': currentSurvivor.mentality.understanding.level > n
                                        }"
                                        @click.prevent="setUnderstandingLevel(n+1)"></button>
                                    <template #content>
                                        <span v-html="tooltips.understanding[n]" />
                                    </template>
                                </b-tooltip>
                                <button class="button is-large kdm-box"
                                    :class="{
                                        'is-dark': currentSurvivor.mentality.understanding.level > n
                                    }"
                                    @click.prevent="setUnderstandingLevel(n+1)"
                                    v-else></button>
                            </p>
                        </b-field>
                        <div class="buttons is-centered">
                            <b-tooltip position="is-bottom" type="is-dark" :label="currentSurvivor.mentality.understanding.abilities[a].description" v-for="a in ['analyze','explore','tinker']" :key="a">
                                <b-button size="is-medium" rounded :class="{ 'is-dark': currentSurvivor.mentality.understanding.abilities[a].granted }" @click.prevent="toggleAbility('understanding',a)">
                                    {{ currentSurvivor.mentality.understanding.abilities[a].name }}
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
                                    <b-checkbox type="is-danger" v-model="currentSurvivor.lifetime.cannot.fightingArts" @change.native="saveField('lifetime.cannot.fightingArts','fa')">Cannot Use Fighting Arts</b-checkbox>
                                </b-field>
                            </template>
                            <b-taginput v-model="currentSurvivor.abilities.fightingArts" placeholder="Add Fighting Art" maxtags="3" type="is-info" @input="saveField('abilities.fightingArts','fa')"/>
                        </b-field>
                    </div>
                    <div class="column is-3">
                        <b-field label="Disorders" ref="do">
                            <template #message>
                                <span>Maximum of 3</span>
                            </template>
                            <b-taginput v-model="currentSurvivor.abilities.disorders" placeholder="Add Disorder" maxtags="3" type="is-info" @input="saveField('abilities.disorders','do')"/>
                        </b-field>
                    </div>
                    <div class="column is-3">
                        <b-field label="Abilities" ref="ab">
                            <template #message>
                                <b-field grouped label="Lifetime Reroll">
                                    <b-checkbox type="is-success" v-model="currentSurvivor.lifetime.reroll.available" @change.native="saveField('lifetime.reroll.available', 'ab')">Available</b-checkbox>
                                    <b-checkbox type="is-danger" v-model="currentSurvivor.lifetime.reroll.used" @change.native="saveField('lifetime.reroll.used', 'ab')">Used</b-checkbox>
                                </b-field>
                            </template>
                            <b-taginput v-model="currentSurvivor.abilities.abilities" placeholder="Add Ability" type="is-info" @input="saveField('abilities.abilities','ab')"/>
                        </b-field>
                    </div>
                    <div class="column is-3">
                        <b-field label="Impairments" ref="im">
                            <template #message>
                                <b-field type="is-danger">
                                    <p class="control">
                                        <span class="button is-static" style="color:black !important">Must Skip Hunt LY</span>
                                    </p>
                                    <b-input v-model="currentSurvivor.survival.skipHunt" placeholder="-" class="year-input" @change.native="saveField('survival.skipHunt', 'im')" expanded />
                                </b-field>
                            </template>
                            <b-taginput v-model="currentSurvivor.abilities.impairments" placeholder="Add Impairment" type="is-info" @input="saveField('abilities.impairments','im')"/>
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
                <div class="field">
                    <b-message type="is-danger" has-icon>
                        <span class="">Deleting a survivor is PERMANENT and cannot be undone.</span><br />
                        <b-button type="is-danger" @click.prevent="deleteSurvivor" icon-left="times-circle">Delete Survivor</b-button>
                    </b-message>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

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
.survivor-list {
    text-align: left;
}

.wp p.control {
    margin-top: 0.5em;
}

.survivor-panel {
    margin-top: 1em;
    text-align: left;
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}

.cu .buttons span.b-tooltip:not(:last-child) div.tooltip-trigger {
    margin-right: 1em;
}

.menu-list a.is-active {
    background-color: $info;
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
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import { db } from '@/firebase'
import { survivor as defaultSurvivor } from '@/kdm'

/**
@TODO: Set up "Loading Sections" via
    position: relative containers and
    the loadingSections object
**/

export default {
    name: 'Survivors',
    data() {
        return {
            campaign: null,
            survivors: [],
            currentSurvivor: null,
            hideDead: false,
            showBonuses: false
        }
    },
    computed: {
        ...mapGetters({
            loading: 'loading',
            user: 'user',
            currentCampaign: 'currentCampaign'
        }),
        
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
        
        tooltips() {
            return {
                xp: {
                    1: '<img class="special-icon small icon-story" src="images/story.png"/><span class="has-text-weight-bold">Age</span>',
                    5: '<img class="special-icon small icon-story" src="images/story.png"/><span class="has-text-weight-bold">Age</span>',
                    9: '<img class="special-icon small icon-story" src="images/story.png"/><span class="has-text-weight-bold">Age</span>',
                    14: '<img class="special-icon small icon-story" src="images/story.png"/><span class="has-text-weight-bold">Age</span>',
                    15: 'Retired'
                },
                
                wp: {
                    2: 'Specialist',
                    7: 'Master'
                },
                
                courage: {
                    2: '<img class="special-icon small icon-story" src="images/story.png"/><span class="has-text-weight-bold">Bold</span>',
                    8: '<img class="special-icon small icon-story" src="images/story.png"/><span class="has-text-weight-bold">See the Truth</span>'
                },
                
                understanding: {
                    2: '<img class="special-icon small icon-story" src="images/story.png"/><span class="has-text-weight-bold">Insight</span>',
                    8: '<img class="special-icon small icon-story" src="images/story.png"/><span class="has-text-weight-bold">White Secret</span>'
                }
            }
        },
        
        survivor() {
            return this.currentSurvivor
        },
        
        injuries() {
            if(!this.currentSurvivor) return []
            
            let d = this.currentSurvivor.defenses
            
            return d.arms.severe.concat(d.body.severe, d.head.severe, d.waist.severe, d.legs.severe)
        },
        
        dead() {
          if(!this.currentSurvivor) return false
          
          return !(
            this.currentSurvivor.lifetime.died !== null &&
            this.currentSurvivor.lifetime.died !== ''
          )
        }
    },
    created() {
        this.$bind('campaign', db.collection('campaigns').doc(this.currentCampaign))
        this.$bind('survivors', db.collection(`campaigns/${this.currentCampaign}/survivors`))
    },
    methods: {
        ...mapActions([
            'setLoading'
        ]),
        
        _setBoxValue(object, field, amount, fullname, ref) {
            if(object[field] === amount) amount -= 1
            object[field] = amount
            this.saveField(fullname, ref)
        },
        
        setWeaponProficiency(wp) {
            this._setBoxValue(this.currentSurvivor.weapon, 'proficiency', wp, "weapon.proficiency", "wp")
        },
        
        setUnderstandingLevel(ul) {
            this._setBoxValue(this.currentSurvivor.mentality.understanding, 'level', ul, "mentality.understanding.level", "understanding")
        },
        
        setCourageLevel(cl) {
            this._setBoxValue(this.currentSurvivor.mentality.courage, 'level', cl, "mentality.courage.level", "courage")
        },
        
        setExperience(xp) {
            this._setBoxValue(this.currentSurvivor.lifetime, 'experience', xp, "lifetime.experience", "xp")
        },
        
        createRange(size) {
            return [...Array(size).keys()]
        },
        
        toggleAbility(type, ability) {
            this.currentSurvivor.mentality[type].abilities[ability].granted = !this.currentSurvivor.mentality[type].abilities[ability].granted
            this.saveField(`mentality.${type}.abilities.${ability}.granted`, "courage")
        },
        
        saveField(field, refName) {
            if(!this.currentSurvivor) return
            
            let currVal = field.split('.').reduce((o,i) => o[i], this.currentSurvivor)
            
            let updateObj = {}
            
            updateObj[field] = currVal
            
            let loading = this.$buefy.loading.open({ container: this.$refs[refName].$el })
            db.collection(`campaigns/${this.currentCampaign}/survivors`).doc(this.currentSurvivor.id).update(updateObj)
                .then(() => loading.close())
        },
        
        addSurvivor() {
            this.setLoading(true)
            
            let emptySurvivor = defaultSurvivor
            
            let survivorRef = db.collection(`campaigns/${this.currentCampaign}/survivors`).doc()
            survivorRef.set(emptySurvivor).then(() => this.setSurvivor(survivorRef.id))
        },
        
        deleteSurvivor() {
            this.$buefy.dialog.confirm({
                message: 'Are you sure you want to delete this survivor?',
                onConfirm: () => {
                    this.setLoading(true)
                    db.collection(`campaigns/${this.currentCampaign}/survivors`).doc(this.currentSurvivor.id).delete().then(() => {
                        this.currentSurvivor = null
                        this.setLoading(false)
                    })
                }
            })
        },
        
        setSurvivor(id) {
            if(this.currentSurvivor?.id === id) return
            
            this.setLoading(true)
            this.$bind('currentSurvivor', db.collection(`campaigns/${this.currentCampaign}/survivors`).doc(id))
            this.setLoading(false)
        }
    }
}
</script>