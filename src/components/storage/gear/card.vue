<template>
  <div class="box gear-card">
    <div class="armor" v-if="item.type === 'armor' || item.grants.armor">
      <div class="armor-amount">
        <span class="bl-armor is-size-4"></span>
        <span class="amount">{{ item.armor.amount }}</span>
        <span :class="iconTranslation[l]" v-for="l in item.armor.locations" :key="l"></span>
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
      <div class="is-size-6" v-if="item.keywords.length > 0">
        <span v-for="(k,kidx) in item.keywords" :key="kidx">
          <strong>{{ k }}</strong>
          <span v-if="(kidx+1) !== item.keywords.length">, </span>
        </span>
      </div>
      <div class="is-size-7" v-html="item.description" />
    </div>
    <div class="connection" :class="p" v-for="p in ['top','bottom','left','right']" :key="p">
      <span class="bl-milestone" v-if="item.connections[p]" :style="{ color: item.connections[p] }"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gear-card {
    border: 1px solid black;
    position: relative;
    overflow: hidden;
    
    .affinity {
      display: inline-block;
      
      &:not(:last-child) {
        margin-right: .25em;
      }
      
    }
    
    .armor, .weapon {
      position: absolute;
      top: .5em;
      left: .5em;
      
      .armor-amount {
        color: black;
        z-index: 4;
        
        .bl-armor {
          vertical-align: bottom;
        }
        
        .amount {
          position: absolute;
          left: .35em;
          color: white;
          z-index: 5;
        }
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
      width: 90%;
      text-align: center;
      margin: 0 auto;
    }
    
    .connection {
      position: absolute;
      font-size: 3em;
      
      &.left {
        top: calc(50% - .5em);
        left: -.45em;
      }
      
      &.right {
        top: calc(50% - .5em);
        right: -.45em;
      }
      
      &.top {
        top: -.6em;
        left: calc(50% - .5em);
      }
      
      &.bottom {
        bottom: -.9em;
        left: calc(50% - .5em);
      }
    }
}
</style>

<script>
export default {
  name: 'GearCard',
  props: {
    item: {
      type: Object,
      default: () => { return { grants: {}, armor: { locations: [] }, weapon: {}, connections: {}, classifications: [], keywords: [], description: '', bonuses: [], affinities: [] } }
    },
    campaign: Object
  },
  computed: {
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
  }
}
</script>