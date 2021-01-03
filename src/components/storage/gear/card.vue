<template>
  <div class="box gear-card">
    <div class="armor" v-if="item.type === 'armor' || item.grants.armor">
      <div class="armor-block">
        <span class="bl-armor is-size-4"></span>
        <span class="amount">{{ item.armor.amount }}</span>
        <span class="armor-loc" :class="iconTranslation[l]" v-for="l in item.armor.locations" :key="l"></span>
      </div>
    </div>
    <div class="weapon" v-if="item.type === 'weapon' || item.grants.attack">
      <div class="weapon-holder">
        <span class="bl-action" style="color:black;background:white;border-radius:5em"></span>
        <hr />
        <span>{{ item.weapon.speed }}</span>
        <div class="weapon-inner">
          <div class="top">{{ item.weapon.accuracy }}</div>
          <div class="bot">{{ item.weapon.strength }}</div>
        </div>
      </div>
    </div>
    <div class="top-text">
      <h1 class="is-size-5">{{ item.name }}</h1>
      <p class="is-size-7">{{ classifications }}</p>
    </div>
    <div class="center-image">
        <div v-if="item.type === 'armor' || item.grants.armor">
          <div v-if="item.armor.locations.length > 0">
            <span class="is-size-1" :class="iconTranslation[l]" v-for="l in item.armor.locations" :key="l"></span>
          </div>
          <div v-else>
            <span class="is-size-1" :class="iconTranslation['armor']"></span>
          </div>
        </div>
        <div v-else-if="item.type === 'weapon' || item.grants.attack">
          <span class="is-size-1" :class="iconTranslation['weapon']"></span>
        </div>
        <div v-else-if="item.type === 'item'">
          <span class="is-size-1" :class="iconTranslation['item']"></span>
        </div>
        <div v-else>
          <span class="is-size-1 bl-random"></span>
        </div>
    </div>
    <div class="bottom-text">
      <div v-if="item.affinities.length > 0">
        <div class="affinity" v-for="(a,aidx) in item.affinities" :key="aidx">
          <b-icon icon="square-full" :style="{ color: a.toLowerCase() }" size="is-medium" />
        </div>
      </div>
      <div class="is-size-6 keywords" v-if="item.keywords.length > 0">
        <span v-for="(k,kidx) in item.keywords" :key="kidx">
          <b-tooltip v-if="keywordTooltip(k)"
            type="is-dark"
            multilined>
            <strong>{{ k }}</strong>
            <template #content>
              <div class="is-size-7">
                <strong>{{ keywordTooltip(k).name }}</strong><br />
                {{ keywordTooltip(k).description }}
              </div>
            </template>
          </b-tooltip>
          <strong v-else>{{ k }}</strong>
          <span v-if="(kidx+1) !== item.keywords.length">, </span>
        </span>
      </div>
      <div class="is-size-7 description" v-if="item.description" v-html="parsedDescription" />
      <div class="is-size-7 action" v-if="item.action">
        <span class="bl-action"></span>: <span v-html="parsedAction" />
      </div>
      <div class="is-size-7 unlock" v-if="(item.unlock.requires && item.unlock.requires.length > 0) || item.unlock.description">
        <section class="field" :class="{ 'is-grouped': item.unlock.sizing !== 2 }" style="width:100%">
          <p class="left" :class="{ 'sm': item.unlock.sizing === 0, 'lg': item.unlock.sizing === 1, 'fl': item.unlock.sizing === 2 }">
            <b-icon
              v-for="(r,ridx) in item.unlock.requires.map(r => r.toLowerCase())" :key="ridx"
              :icon="r.includes('connection') ? 'puzzle-piece' : 'square-full'"
              size="is-small"
              :type="r.includes('red') ? 'is-danger' : r.includes('blue') ? 'is-info' : 'is-success'"
            />
          </p>
          <p class="right" :class="{ 'sm': item.unlock.sizing === 1, 'lg': item.unlock.sizing === 0, 'fl': item.unlock.sizing === 2 }" v-html="parsedUnlock" />
        </section>
      </div>
    </div>
    <div class="connection-container" :class="p" v-for="p in ['top','bottom','left','right']" :key="p">
      <div class="connection" :class="p">
        <span class="bl-milestone" v-if="item.connections[p]" :style="{ color: item.connections[p] }"></span>
      </div>
    </div>
    <div class="remove-container" v-if="showRemove" @click.prevent="remove">
      <b-button type="is-dark" size="is-small">
        <b-icon icon="times" type="is-danger" />
      </b-button>
    </div>
    <div class="qty-container" v-if="showQty">
      <span class="tag is-dark">x{{ item.qty }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gear-card {
    border: 1px solid black;
    position: relative;
    background: #f8f8f8;
    
    word-break: break-word; 
    
    .tooltip-content {
      strong {
        color: white;
      }
    }
    
    .remove-container {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 15;
    }
    
    .qty-container {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 15;
    }
    
    .affinity {
      display: inline-block;
      
      &:not(:last-child) {
        margin-right: .25em;
      }
      
    }
    
    .unlock {
      .left,.right {
        padding: .25em;
      }
    
      .left {
        background: #fff;
        border-radius: .5em 0 0 .5em;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        
        &.sm {
          width: 20%;
        }
        
        &.lg {
          width: 35%;
        }
        
        &.fl {
          width: 100%;
          border-radius: .5em .5em 0 0;
        }
      }
      
      .right {
        border-radius: 0 .5em .5em 0;
        text-align: left;
        background: #eee;
        padding: .25em .75em;
        
        &.sm {
          width: 65%;
        }
        
        &.lg {
          width: 80%;
        }
        
        &.fl {
          width: 100%;
          border-radius: 0 0 .5em .5em;
        }
      }
    }
    
    .armor, .weapon {
      position: absolute;
      top: .5em;
      left: .5em;
      z-index: 10;
      
      .armor-loc {
        vertical-align: text-top;
      }
      
      .weapon-holder {
        border-radius: 2em;
        background: #aaa;
        color: white;
        text-align: center;
        font-weight: bold;
        padding: .1em;
        padding-bottom: .25em;
        
        hr {
          margin: 0.1em auto;
          width: 80%;
          height: 1px;
        }
        
        .weapon-inner {
          
          div {
            background: #888;
          }
          
          .top {
            border-radius: 2em 2em 0em 0em;
            margin-bottom: 2px;
            position: relative;
            
            &:after {
              content: "+";
              -webkit-text-stroke: .75px #888;
              text-stroke: .75px #888;
              position: absolute;
              bottom: -.5em;
              right: -.5em;
            }
          }
          
          .bot {
            border-radius: 0em 0em 2em 2em;
          }
        }
      }
    }
    
    .top-text, .bottom-text {
      width: 100%;
      text-align: center;
      margin: 0 auto;
    }
    
    .connection-container {
      position: absolute;
      overflow: hidden;
      z-index: 5;
      
      &.left, &.right {
        height: 100%;
        width: 1.5rem;
        top: 0;
      }
      
      &.top, &.bottom {
        width: 100%;
        height: 1.5rem;
        left: 0;
      }
      
      &.left {
        left: 0;
      }
      
      &.right {
        right: 0;
      }
      
      &.top {
        top: 0;
      }
      
      &.bottom {
        bottom: 0;
      }
      
      .connection {
        position: absolute;
        font-size: 3em;
        
        &.left {
          top: calc(50% - .75em);
          left: -.45em;
        }
        
        &.right {
          top: calc(50% - .75em);
          right: -.45em;
        }
        
        &.top {
          top: -.8em;
          left: calc(50% - .5em);
        }
        
        &.bottom {
          bottom: -.75em;
          left: calc(50% - .5em);
        }
      }
    }
}
</style>

<script>
import { mapGetters } from 'vuex'
import { defaultGearItem } from '@/util'

export default {
  name: 'GearCard',
  props: {
    item: {
      type: Object,
      default: () => Object.assign({}, defaultGearItem)
    },
    showRemove: {
      type: Boolean,
      default: false
    },
    showQty: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'keywords'
    ]),
  
    parsedDescription() {
      return this.parseBlock(this.item.description)
    },
    
    parsedAction() {
      return this.parseBlock(this.item.action)
    },
    
    parsedUnlock() {
      return this.parseBlock(this.item.unlock.description)
    },
    
    classifications() {
      return [
        this.item.type,
        ...this.item.classifications
      ].join(', ')
    },
    
    iconTranslation() {
      return {
        'weapon': 'bl-nemesis-event',
        'armor': 'bl-armor',
        'item': 'bl-lantern',
        'all': 'bl-armor',
        'head': 'bl-head',
        'body': 'bl-body',
        'arms': 'bl-arms',
        'legs': 'bl-legs',
        'waist': 'bl-waist'
      }
    }
  },
  methods: {
    keywordTooltip(kw) {
      if(!kw) return false
      return this.keywords.find(k => kw.trim().toLowerCase().startsWith(k.name.toLowerCase())) || false
    },
    
    remove() {
      this.$emit('remove')
    }
  }
}
</script>