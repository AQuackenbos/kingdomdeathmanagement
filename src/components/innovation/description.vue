<template>
    <div class="content inno-fields">
        <div v-if="innovation.flavor" class="flavor" v-html="innovation.flavor" />
        <div v-if="innovation.provides">
            <b-button expanded @click.prevent class="yellow-box is-static" type="is-dark" v-for="p in innovation.provides" :key="p"><strong>{{ p }}</strong></b-button>
        </div>
        <div v-if="innovation.increaseLimit">
            <b-button expanded @click.prevent class="brown-box is-static" type="is-dark"><strong>+1 Survival Limit</strong></b-button>
        </div>
        <div v-if="innovation.departingSurvival">
            <strong>Departing Survivors</strong> gain +1 survival.
        </div>
        <div v-if="innovation.description" v-html="innovation.description" />
        <div v-if="innovation.actions">
            <Action v-for="a in innovation.actions" :key="a.name" :action="a" />
        </div>
        <div v-if="innovation.build">
            <div class="box build" v-for="b in innovation.build" :key="b.name">
                <div class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <b-button type="is-white" class="circle-icon" size="is-small" rounded @click.prevent v-for="n in getRange(b.cost)" :key="n">
                                <b-icon icon="asterisk" size="is-small" />
                            </b-button>
                            <strong>Build</strong>
                        </div>
                        <div class="level-item">
                            {{ b.name }}
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="content">
                            <div class="field" v-for="r in b.resources" :key="r.material">
                                <div class="control">
                                    <div class="tags has-addons">
                                        <span class="tag is-dark">{{ r.qty }}x</span>
                                        <span class="tag is-black">{{ r.material }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.brown-box {
    background: #9c6833 !important;
}

.yellow-box {
    background: #d0c007 !important;
}

.button.circle-icon {
    padding: 0.5em 1em;
}

.button.is-static {
    color: #FFF !important;
}

.innovation {
    border: 1px solid #aaa;
    
    .box.build {
        width: 100%;
        background: #17af4c;
        color: #fff;
        
        .button {
            margin-right: .25em;
        }
        
        strong {
            color: #fff;
        }
        
        .field {
          margin-bottom: .25em;
          .tag {
            margin-bottom: 0;
          }
        }
    }

    .flavor {
        font-style: italic;
    }

    .inno-fields {
        width: 100%;
    }

    p.small {
        font-size: 0.75em;
    }

    .field.is-grouped {
        margin-top: 1em;
        
        .field.is-small {
            width: 5.5em !important;
            .input {
                cursor: default !important;
                border: 1px solid black;
                text-align: center;
                font-weight: bold;
                font-size: 1.5em;
            }
        }
    }
}
</style>

<script>
import Action from '@/components/innovation/action'

export default {
    name: 'InnovationDescription',
    props: ['innovation'],
    components: {
        Action
    },
    methods: {
        getRange(n) {
            return [...Array(n).keys()]
        }
    }
}
</script>