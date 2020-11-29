<template>
    <div class="column" v-if="!loading && user && campaign">
        <div class="columns">
            <div class="column is-one-quarter survivor-list">
                <b-message type="is-warning" has-icon v-if="isDirty">
                    You must save these changes to the database for them to persist automatically. <br />
                    <b-button icon-left="cloud" @click.prevent="saveToFirestore">Save</b-button>
                </b-message>
                <div class="field">
                    <b-switch :value="hideDead" type="is-info">Hide Dead</b-switch>
                </div>
                <b-menu>
                    <b-menu-list label="Survivors">
                        <b-menu-item v-for="s in shownSurvivors" :key="s.id" @click.prevent="setSurvivor(s.id)" :active="currentSurvivor && s.id === currentSurvivor.id">
                            <template #label>
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
                <div class="columns">
                    <div class="column is-6">
                        <b-field label="Name" label-position="on-border">
                            <template #message>When you name your survivor, gain +1 survival</template>
                            <b-input v-model="currentSurvivor.lifetime.name" expanded />
                        </b-field>
                        <b-field grouped>
                            <b-field>
                                <b-select placeholder="Gender" icon="transgender" v-model="currentSurvivor.lifetime.gender">
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </b-select>
                            </b-field>
                            <b-field label="Father" label-position="on-border" expanded>
                                <b-input v-model="currentSurvivor.lifetime.father" />
                            </b-field>
                            <b-field label="Mother" label-position="on-border" expanded>
                                <b-input v-model="currentSurvivor.lifetime.mother" />
                            </b-field>
                        </b-field>
                        <b-field grouped>
                            <b-field label="Born" label-position="on-border">
                                <b-input v-model="currentSurvivor.lifetime.born" maxlength="2" style="width:4em"/>
                            </b-field>
                            <b-field label="Died" label-position="on-border">
                                <b-input v-model="currentSurvivor.lifetime.died" maxlength="2" style="width:4em"/>
                            </b-field>
                            <b-field label="Cause of Death" label-position="on-border" expanded>
                                <b-input v-model="currentSurvivor.lifetime.cause" icon="skull" />
                            </b-field>
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <b-field grouped label="Experience">
                            <p class="control" v-for="n in createRange(16)" :key="n">
                                <b-tooltip type="is-light" position="is-bottom" v-if="n === 1 || n === 5 || n === 9 || n === 14 || n === 15"  multilined>
                                    <button class="button is-small kdm-box thick-border"
                                        :class="{ 
                                            'is-dark': currentSurvivor.lifetime.experience > n ,
                                            'extra-thick': n === 15
                                        }"
                                        @click.prevent="setExperience(n+1)"></button>
                                    <template #content>
                                        <span v-html="xpLabel(n)" />
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
.field.is-grouped > .control:not(:last-child) {
    margin-right: 0.25em;
}
.survivor-list {
    text-align: left;
}

.survivor-panel {
    margin-top: 1em;
    text-align: left;
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}

.kdm-box {
    height: 2em;
    width: 2em;
    padding: 0;
    &.thick-border {
        border: .4em solid black;
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
            hideDead: true,
            isDirty: false,
            loadingSections: {
                name: false
            }
        }
    },
    computed: {
        ...mapGetters({
            loading: 'loading',
            user: 'user',
            currentCampaign: 'currentCampaign'
        }),
        
        shownSurvivors() {
            return this.survivors
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
        
        xpLabel(xp) {
            switch(xp) {
                case 1: 
                case 5: 
                case 9: 
                case 14: return '<img class="special-icon small icon-story" src="images/story.png"/><span class="has-text-weight-bold">Age</span>'
                case 15: return 'Retired'
            }
            
            return ''
        },
        
        setExperience(xp) {
            this.currentSurvivor.lifetime.experience = xp
        },
        
        createRange(size) {
            return [...Array(size).keys()]
        },
        
        saveToFirestore() {
            let survivor = this.currentSurvivor
            this.setLoading(true)
            db.collection(`campaigns/${this.currentCampaign}/survivors`).doc(survivor.id).update(survivor)
                .then(() => {
                    this.isDirty = false
                    this.setLoading(false)
                })
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